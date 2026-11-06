// One-off: converts JPG/PNG under src/assets/images to WebP (max 1600px wide) and removes the originals.
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'src/assets/images';

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) { await walk(path); continue; }
    if (!['.jpg', '.jpeg', '.png'].includes(extname(path).toLowerCase())) continue;
    const out = path.replace(/\.(jpe?g|png)$/i, '.webp');
    await sharp(path).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
    await unlink(path);
    console.log(path, '->', out, Math.round((await stat(out)).size / 1024) + 'KB');
  }
}
await walk(ROOT);
