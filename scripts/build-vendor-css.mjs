// Bootstrap and Font Awesome ship ~300 KB of CSS of which the site uses a few percent.
// This writes trimmed copies to src/styles/vendor (used by angular.json) containing only the rules
// the templates and components reference. Runs before every build via `prebuild`.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { PurgeCSS } from 'purgecss';

const files = ['src/index.html', 'src/app/**/*.html', 'src/app/**/*.ts'];
await mkdir('src/styles/vendor', { recursive: true });

async function purge(css, options = {}) {
  const [result] = await new PurgeCSS().purge({
    content: files,
    css: [{ raw: css }],
    variables: false, // keep every custom property: Bootstrap reads them at runtime
    ...options
  });
  return result.css;
}

// ---- Bootstrap
const bootstrapSrc = await readFile('node_modules/bootstrap/dist/css/bootstrap.min.css', 'utf8');
const bootstrap = await purge(bootstrapSrc, { safelist: { standard: ['html', 'body'] } });
await writeFile('src/styles/vendor/bootstrap.purged.css', bootstrap);

// ---- Font Awesome: used icon rules only, fonts served from src/assets/fonts/fa (subset by scripts/subset-fa-fonts.py)
const faSrc = await readFile('node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'utf8');
let fa = await purge(faSrc);
fa = fa
  .replaceAll('../webfonts/', '/assets/fonts/fa/')
  .replaceAll('font-display:block', 'font-display:swap');
await writeFile('src/styles/vendor/fontawesome.purged.css', fa);

// Warn when a template uses an icon the committed font subset doesn't contain
const used = [...new Set([...fa.matchAll(/--fa:"\\([0-9a-f]+)"/gi)].map(m => m[1].toLowerCase()))].sort();
await writeFile('scripts/fa-codepoints.txt', used.join('\n') + '\n');
let subset = [];
try { subset = (await readFile('src/assets/fonts/fa/codepoints.txt', 'utf8')).split('\n').filter(Boolean); } catch { /* not generated yet */ }
const missing = used.filter(cp => !subset.includes(cp));
if (missing.length) {
  console.warn(`WARNING: icons missing from the Font Awesome subset (${missing.join(', ')}). Run: npm run vendor:fonts`);
}

const kb = n => (n / 1024).toFixed(0) + ' KB';
console.log(`vendor css: bootstrap ${kb(bootstrapSrc.length)} -> ${kb(bootstrap.length)}, font awesome ${kb(faSrc.length)} -> ${kb(fa.length)} (${used.length} icons)`);
