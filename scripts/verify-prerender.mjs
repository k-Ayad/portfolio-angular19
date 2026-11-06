// Checks the prerendered HTML (what a crawler without JavaScript sees) for every route in dist/portfolio/browser.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist/portfolio/browser';
const { projects } = JSON.parse(await readFile('src/app/core/data/projects.json', 'utf8'));
const site = JSON.parse(await readFile('src/app/core/data/site.json', 'utf8'));

const routes = [
  { path: '/', file: 'index.html', must: ['Shopify developer', 'Cairo, Egypt', '4+ years', 'Hechter Paris', 'Shopify store setup', 'Arya'], ld: ['Person', 'ProfessionalService'] },
  { path: '/portfolio', file: 'portfolio/index.html', must: ['All Projects', 'Arya'], ld: ['CollectionPage', 'ItemList', 'BreadcrumbList'] },
  ...projects.map(p => ({
    path: `/work/${p.slug}`,
    file: `work/${p.slug}/index.html`,
    must: [p.title, p.summary.slice(0, 25)],
    ld: ['CreativeWork', 'BreadcrumbList']
  }))
];

const textOf = html => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;|\u00a0/g, ' ').replace(/\s+/g, ' ');
const grab = (html, re) => (html.match(re) || [])[1];

let failures = 0;
const fail = (route, msg) => { failures++; console.log(`  FAIL ${route.path}: ${msg}`); };

for (const route of routes) {
  const html = await readFile(join(DIST, route.file), 'utf8');
  const text = textOf(html.slice(html.indexOf('<app-root')));
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const title = grab(html, /<title>([^<]*)<\/title>/);
  const desc = grab(html, /<meta name="description" content="([^"]*)"/);
  const canonical = grab(html, /<link rel="canonical" href="([^"]*)"/);
  const ogTitle = grab(html, /<meta property="og:title" content="([^"]*)"/);
  const ogUrl = grab(html, /<meta property="og:url" content="([^"]*)"/);
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

  if (h1s !== 1) fail(route, `expected 1 <h1>, found ${h1s}`);
  if (!title || !desc || !canonical || !ogTitle || !ogUrl) fail(route, 'missing title/description/canonical/og tags');
  const expectedUrl = site.url + (route.path === '/' ? '/' : route.path);
  if (canonical !== expectedUrl) fail(route, `canonical is ${canonical}, expected ${expectedUrl}`);
  for (const phrase of route.must) if (!text.includes(phrase)) fail(route, `missing text "${phrase}"`);
  for (const type of route.ld) if (!types.includes(type)) fail(route, `missing JSON-LD ${type}`);
  if ((html.match(/<img\b(?![^>]*\balt="[^"]+")[^>]*>/g) || []).length) fail(route, 'image without alt text');

  console.log(`${route.path.padEnd(28)} text=${String(text.length).padStart(5)}ch h1=${h1s} jsonld=[${types.join(',')}] title="${title}"`);
}

console.log(failures ? `\n${failures} problem(s)` : '\nAll routes OK');
process.exit(failures ? 1 : 0);
