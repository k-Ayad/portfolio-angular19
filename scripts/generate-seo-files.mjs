// Generates src/sitemap.xml and src/llms.txt from the same data the site renders
// (site.json, projects.json, services.json, faq.json). Runs automatically before `npm run build`.
// Arabic URLs, hreflang alternates and the Arabic llms.txt lines only appear once site.json has "arabicLive": true.
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const read = async file => JSON.parse(await readFile(`src/app/core/data/${file}`, 'utf8'));
const site = await read('site.json');
const projects = (await read('projects.json')).projects.filter(p => !p.hidden);
const services = (await read('services.json')).services;
const today = new Date().toISOString().slice(0, 10);

// lastmod: the last commit that touched the data behind a page, falling back to today
const lastCommit = (...files) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files.map(f => `src/app/core/data/${f}`)], { encoding: 'utf8' }).trim();
    return out || today;
  } catch { return today; }
};
const lm = {
  home: lastCommit('site.json', 'projects.json', 'services.json', 'faq.json'),
  portfolio: lastCommit('projects.json'),
  project: lastCommit('projects.json'),
  services: lastCommit('services.json'),
  faq: lastCommit('faq.json')
};

// English routes; each has an Arabic twin under /ar when Arabic is live
const routes = [
  { path: '/', priority: '1.0', lastmod: lm.home },
  { path: '/services', priority: '0.9', lastmod: lm.services },
  ...services.map(s => ({ path: `/services/${s.slug}`, priority: '0.8', lastmod: lm.services })),
  { path: '/portfolio', priority: '0.8', lastmod: lm.portfolio },
  ...projects.map(p => ({ path: `/work/${p.slug}`, priority: '0.7', lastmod: lm.project })),
  { path: '/faq', priority: '0.7', lastmod: lm.faq }
];

const ar = path => (path === '/' ? '/ar/' : `/ar${path}`);
const url = path => `${site.url}${path}`;

const entry = (path, route) => {
  const alternates = site.arabicLive
    ? `\n    <xhtml:link rel="alternate" hreflang="en" href="${url(route.path)}"/>\n    <xhtml:link rel="alternate" hreflang="ar" href="${url(ar(route.path))}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url(route.path)}"/>`
    : '';
  return `  <url>
    <loc>${url(path)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <priority>${route.priority}</priority>${alternates}
  </url>`;
};

const urls = routes.flatMap(r => (site.arabicLive ? [entry(r.path, r), entry(ar(r.path), r)] : [entry(r.path, r)]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

const langLine = site.arabicLive ? `\nLanguages: English (${site.url}/) and Arabic (${site.url}/ar/).` : '';
const llms = `# ${site.name} – Shopify Developer in ${site.location.city}, ${site.location.country}

> ${site.homeDescription}

${site.name} is a Shopify developer and Senior Frontend Engineer based in ${site.location.city}, ${site.location.country}, with ${site.yearsOfExperience} years of experience. Current role: ${site.currentRole}. Serves clients in ${site.areaServed.join(' and ')}.${langLine}

## Services
- [Services overview](${site.url}/services): the four services and how they work
${services.map(s => `- [${s.en.nav}](${site.url}/services/${s.slug}): ${s.en.summary}`).join('\n')}

## Skills
${site.knowsAbout.join(', ')}

## Projects
${projects.map(p => `- [${p.title}](${site.url}/work/${p.slug}): ${p.summary}`).join('\n')}

All projects: ${site.url}/portfolio

## FAQ
- [Shopify developer FAQ](${site.url}/faq): cost, process, Liquid, speed optimization and more
${site.arabicLive ? `\n## Arabic (العربية)\n- [الصفحة الرئيسية](${site.url}/ar/): مطور Shopify في القاهرة، مصر\n- [الخدمات](${site.url}/ar/services)\n- [الأسئلة الشائعة](${site.url}/ar/faq)\n` : ''}
## Contact
- Email: ${site.email}
- LinkedIn: ${site.linkedin}
- Facebook: ${site.facebook}
- Website: ${site.url}/
`;

await writeFile('src/sitemap.xml', sitemap);
await writeFile('src/llms.txt', llms);
console.log(`sitemap.xml: ${urls.length} URLs (Arabic ${site.arabicLive ? 'on' : 'off'}), llms.txt written`);
