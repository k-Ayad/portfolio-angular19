// Generates src/sitemap.xml and src/llms.txt from the same data the site renders (site.json + projects.json).
// Runs automatically before `npm run build`; lastmod is the build date.
import { readFile, writeFile } from 'node:fs/promises';

const site = JSON.parse(await readFile('src/app/core/data/site.json', 'utf8'));
const projects = JSON.parse(await readFile('src/app/core/data/projects.json', 'utf8')).projects.filter(p => !p.hidden);
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/portfolio', priority: '0.8' },
  ...projects.map(project => ({ path: `/work/${project.slug}`, priority: '0.7' }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${site.url}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const llms = `# ${site.name} – Shopify Developer in ${site.location.city}, ${site.location.country}

> ${site.homeDescription}

${site.name} is a Shopify developer and Senior Frontend Engineer based in ${site.location.city}, ${site.location.country}, with ${site.yearsOfExperience} years of experience. Current role: ${site.currentRole}. Serves clients in ${site.areaServed.join(' and ')}.

## Services
${site.services.map(s => `- ${s}`).join('\n')}

## Skills
${site.knowsAbout.join(', ')}

## Projects
${projects.map(p => `- [${p.title}](${site.url}/work/${p.slug}): ${p.summary}`).join('\n')}

All projects: ${site.url}/portfolio

## Contact
- Email: ${site.email}
- WhatsApp: ${site.telephoneDisplay} (${site.whatsappUrl})
- LinkedIn: ${site.linkedin}
- Facebook: ${site.facebook}
- Website: ${site.url}/
`;

await writeFile('src/sitemap.xml', sitemap);
await writeFile('src/llms.txt', llms);
console.log(`sitemap.xml: ${routes.length} URLs, llms.txt written (lastmod ${today})`);
