// Writes responsive WebP variants next to every WebP in src/assets/images (name-480.webp, -800, -1200, -1600 where narrower than the original)
// and src/app/core/data/image-sizes.json with each image's intrinsic size. NgOptimizedImage builds its srcset from these.
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = 'src/assets/images';
const WIDTHS = [480, 800, 1200, 1600];
const sizes = {};

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) { await walk(path); continue; }
    if (!name.endsWith('.webp') || /-\d+\.webp$/.test(name)) continue;

    const { width, height } = await sharp(path).metadata();
    sizes[path.replace(/^src\//, '')] = [width, height];
    for (const w of WIDTHS.filter(w => w < width)) {
      await sharp(path).resize({ width: w }).webp({ quality: 78 }).toFile(path.replace(/\.webp$/, `-${w}.webp`));
    }
  }
}

await walk(ROOT);
await writeFile('src/app/core/data/image-sizes.json', JSON.stringify(sizes, null, 2) + '\n');
console.log(`${Object.keys(sizes).length} images processed`);
