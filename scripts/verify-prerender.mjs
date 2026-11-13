// Checks the prerendered HTML (what a crawler without JavaScript sees) for every route in dist/portfolio/browser.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist/portfolio/browser';
const read = async f => JSON.parse(await readFile(`src/app/core/data/${f}`, 'utf8'));
const site = await read('site.json');
const projects = (await read('projects.json')).projects.filter(p => !p.hidden);
const services = (await read('services.json')).services;
const faq = await read('faq.json');
const langs = site.arabicLive ? ['en', 'ar'] : ['en'];

const prefix = lang => (lang === 'ar' ? '/ar' : '');
const routes = [];
for (const lang of langs) {
  const px = prefix(lang);
  const home = lang === 'ar' ? site.ar.homeTitle : site.homeTitle;
  routes.push({ lang, path: `${px}/`, file: lang === 'ar' ? 'ar/index.html' : 'index.html', kind: 'home', ld: ['Person', 'WebPage', 'ProfessionalService'], minWords: 0, must: lang === 'en' ? ['Shopify and Angular developer', 'Cairo, Egypt', '4+ years', 'Half of my work is Shopify', 'What I do', 'How I work', 'Hire a Shopify developer', 'Hire an Angular developer', 'How I work', 'We discuss your design and vision first.', 'I build it and connect everything.', 'I help with your content and teach your team.', 'We go live, and I support you for free until it is stable.'] : ['القاهرة', 'نصف عملي', 'ماذا أقدم', 'وظّف مطور Shopify', 'وظّف مطور Angular', 'طريقة عملي', 'نناقش تصميمك ورؤيتك أولاً.', 'أبني المشروع وأربط كل شيء.', 'أساعدك في المحتوى وأعلّمك التقنية.', 'نطلق الموقع، وأدعمك مجاناً حتى يستقر.'], title: home });
  routes.push({ lang, path: `${px}/portfolio`, file: `${px.slice(1)}/portfolio/index.html`.replace(/^\//, ''), kind: 'portfolio', ld: ['CollectionPage', 'ItemList', 'BreadcrumbList'], must: ['Arya'] });
  routes.push({ lang, path: `${px}/services`, file: `${px.slice(1)}/services/index.html`.replace(/^\//, ''), kind: 'services', ld: ['CollectionPage', 'ItemList', 'BreadcrumbList'], must: [] });
  for (const s of services) routes.push({ lang, path: `${px}/services/${s.slug}`, file: `${px.slice(1)}/services/${s.slug}/index.html`.replace(/^\//, ''), kind: 'service', ld: ['Service', 'BreadcrumbList'], minWords: 400, title: s[lang].title, must: [s[lang].h1] });
  routes.push({ lang, path: `${px}/faq`, file: `${px.slice(1)}/faq/index.html`.replace(/^\//, ''), kind: 'faq', ld: ['FAQPage', 'BreadcrumbList'], title: faq[lang].title, must: faq[lang].groups.flatMap(g => g.items.map(i => i.a.slice(0, 30))) });
  for (const p of projects) routes.push({ lang, path: `${px}/work/${p.slug}`, file: `${px.slice(1)}/work/${p.slug}/index.html`.replace(/^\//, ''), kind: 'project', ld: ['CreativeWork', 'BreadcrumbList'], must: [p.title] });
}

const entities = s => s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;| /g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const textOf = html => entities(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
const grab = (html, re) => (html.match(re) || [])[1];

let failures = 0;
const fail = (route, msg) => { failures++; console.log(`  FAIL ${route.path}: ${msg}`); };
const seen = { title: new Map(), description: new Map(), canonical: new Map() };
const dupe = (kind, value, route) => {
  if (seen[kind].has(value)) fail(route, `${kind} duplicates ${seen[kind].get(value)}`);
  else seen[kind].set(value, route.path);
};

for (const route of routes) {
  let html;
  try { html = await readFile(join(DIST, route.file), 'utf8'); } catch { fail(route, `missing file ${route.file}`); continue; }
  const text = textOf(html.slice(html.indexOf('<app-root')));
  const words = text.split(' ').length;
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const title = entities(grab(html, /<title>([^<]*)<\/title>/) || '');
  const desc = entities(grab(html, /<meta name="description" content="([^"]*)"/) || '');
  const canonical = grab(html, /<link rel="canonical" href="([^"]*)"/);
  const lang = grab(html, /<html[^>]*\blang="([^"]*)"/);
  const dir = grab(html, /<html[^>]*\bdir="([^"]*)"/);
  const alternates = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"/g)].map(m => `${m[1]}=${m[2]}`);
  const types = [];

  for (const [, body] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const json = JSON.parse(body);
      for (const node of json['@graph'] ?? [json]) {
        types.push(node['@type']);
        if (node.mainEntity?.['@type']) types.push(node.mainEntity['@type']);
      }
    } catch (e) { fail(route, `invalid JSON-LD (${e.message})`); }
  }

  const expectedUrl = site.url + route.path;
  if (h1s !== 1) fail(route, `expected 1 <h1>, found ${h1s}`);
  if (!title || !desc || !canonical) fail(route, 'missing title/description/canonical');
  if (canonical !== expectedUrl) fail(route, `canonical is ${canonical}, expected ${expectedUrl}`);
  if (lang !== route.lang) fail(route, `html lang is ${lang}, expected ${route.lang}`);
  if (dir !== (route.lang === 'ar' ? 'rtl' : 'ltr')) fail(route, `html dir is ${dir}`);
  if (route.title && title !== route.title) fail(route, `title is "${title}", expected "${route.title}"`);
  if (title.length < 20 || title.length > 75) fail(route, `title length ${title.length}`);
  if (desc.length < 80 || desc.length > 175) fail(route, `description length ${desc.length}`);
  dupe('title', title, route); dupe('description', desc, route); dupe('canonical', canonical, route);
  if (site.arabicLive) {
    const en = site.url + route.path.replace(/^\/ar/, '').replace(/^$/, '/');
    const arp = site.url + (route.path.startsWith('/ar') ? route.path : (route.path === '/' ? '/ar/' : `/ar${route.path}`));
    for (const want of [`en=${en}`, `ar=${arp}`, `x-default=${en}`]) if (!alternates.includes(want)) fail(route, `missing hreflang ${want}`);
  } else if (alternates.length) fail(route, 'hreflang present while Arabic is off');
  for (const phrase of route.must ?? []) if (!text.includes(phrase)) fail(route, `missing text "${phrase}"`);
  for (const type of route.ld) if (!types.includes(type)) fail(route, `missing JSON-LD ${type}`);
  if (route.minWords && words < route.minWords) fail(route, `only ${words} words (need ${route.minWords}+)`);
  if ((html.match(/<img\b(?![^>]*\balt="[^"]+")[^>]*>/g) || []).length) fail(route, 'image without alt text');
  if (/\[CONFIRM|TODO/.test(text)) fail(route, 'placeholder text visible');
  if (route.lang === 'ar' && /<span[^>]*class="letter-span"/.test(html)) fail(route, 'Arabic text split into letters');

  console.log(`${route.path.padEnd(44)} ${route.lang} words=${String(words).padStart(4)} h1=${h1s} jsonld=[${types.join(',')}]`);
}

// ---- Balance rule: every list has the same count for both pillars
const balance = (name, shopify, angular) => {
  if (shopify !== angular) { failures++; console.log(`  FAIL balance: ${name} has ${shopify} Shopify vs ${angular} Angular`); }
  else console.log(`balance ok: ${name} ${shopify}/${angular}`);
};
const shopifyServices = services.filter(x => x.pillar === 'shopify');
const angularServices = services.filter(x => x.pillar === 'angular');
balance('services', shopifyServices.length, angularServices.length);
balance('service pages: included items', shopifyServices.reduce((n, x) => n + x.en.included.length, 0), angularServices.reduce((n, x) => n + x.en.included.length, 0));
balance('service pages: related projects', shopifyServices.reduce((n, x) => n + x.projects.length, 0), angularServices.reduce((n, x) => n + x.projects.length, 0));
const featured = c => projects.filter(p => p.featured && p.category === c && !p.noScreenshot).length;
balance('featured projects', featured('Shopify'), featured('Angular'));
const faqGroups = faq.en.groups;
balance('FAQ questions', faqGroups[1].items.length, faqGroups[2].items.length);
if (faqGroups[0].items.length !== 5) { failures++; console.log(`  FAIL FAQ hiring group has ${faqGroups[0].items.length} questions, expected 5`); }
if (projects.filter(p => p.category === 'Angular').length < 3) { failures++; console.log('  FAIL fewer than 3 Angular projects'); }
for (const lang of langs) if (JSON.stringify(faq[lang].groups.map(g => g.items.length)) !== JSON.stringify(faqGroups.map(g => g.items.length))) { failures++; console.log(`  FAIL FAQ ${lang} counts differ from English`); }

// Home page lists, counted in the prerendered HTML
const homeHtml = await readFile(join(DIST, 'index.html'), 'utf8');
const section = id => { const i = homeHtml.indexOf(`id="${id}"`); const j = homeHtml.indexOf('<section', i + 1); return homeHtml.slice(i, j === -1 ? undefined : j); };
const pillars = id => section(id).split('class="pillar"').slice(1);
for (const [id, tag] of [['services', '<li'], ['skills', '<li'], ['faq-teaser', '<details']]) {
  const [a, b] = pillars(id).map(h => (h.match(new RegExp(tag, 'g')) || []).length);
  balance(`home ${id}`, a, b);
}
// "How I work": exactly four steps, real-text numbers, no free-support duration or [CONFIRM] text
for (const [file, nums] of [['index.html', ['1', '2', '3', '4']], ...(site.arabicLive ? [['ar/index.html', ['١', '٢', '٣', '٤']]] : [])]) {
  const html = await readFile(join(DIST, file), 'utf8');
  const i = html.indexOf('class="content-section how-i-work"'); const j = html.indexOf('</section>', i);
  const block = html.slice(i, j);
  const steps = block.match(/class="how-step"/g) || [];
  const numbers = [...block.matchAll(/class="step-number">([^<]+)</g)].map(m => m[1]);
  if (steps.length !== 4 || numbers.join('') !== nums.join('')) { failures++; console.log(`  FAIL ${file}: how-i-work steps ${steps.length}, numbers ${numbers.join('')}`); }
  if (/\[CONFIRM|يحتاج تأكيدك|\b\d+\s*(days|months|weeks)\b/i.test(block)) { failures++; console.log(`  FAIL ${file}: how-i-work has unconfirmed text`); }
  if (!/<h2[^>]*>(How I work|طريقة عملي)<\/h2>/.test(block)) { failures++; console.log(`  FAIL ${file}: how-i-work heading must be an H2`); }
}
if ((section('hire').match(/cta-band/g) || []).length !== 2) { failures++; console.log('  FAIL home hire section needs two call-to-action blocks'); }
for (const href of ['/services/web-apps-landing-pages']) if (homeHtml.includes(href)) { failures++; console.log(`  FAIL retired link ${href} still on the home page`); }

console.log(failures ? `\n${failures} problem(s)` : `\nAll ${routes.length} routes OK (Arabic ${site.arabicLive ? 'on' : 'off'})`);
process.exit(failures ? 1 : 0);
