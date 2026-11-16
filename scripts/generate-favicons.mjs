// Builds every icon from scripts/logo-source.png (the <Ka/> logo on a solid dark background).
// All icons are opaque, so they stay readable inside Google's white circle and on light browser tabs.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'scripts/logo-source.png';
const BACKGROUND = { r: 8, g: 8, b: 8 };
// `fill` is how much of the icon the logo covers. Google crops favicons to a circle, so most sizes keep a margin
// that stops the < and > at the logo's edges from being clipped; the tiny tab icons use more of the space.
const png = async (size, fill = 0.8) => {
  const inner = Math.round(size * fill);
  const logo = await sharp(SOURCE).resize(inner, inner).flatten({ background: BACKGROUND }).png().toBuffer();
  const pad = Math.floor((size - inner) / 2);
  return sharp(logo).extend({ top: pad, bottom: size - inner - pad, left: pad, right: size - inner - pad, background: BACKGROUND }).png({ compressionLevel: 9 }).toBuffer();
};

const outputs = {
  'src/assets/favicon.png': 192,
  'src/assets/favicon-48.png': 48,
  'src/assets/favicon-96.png': 96,
  'src/assets/apple-touch-icon.png': 180,
  'src/assets/icon-512.png': 512
};
for (const [file, size] of Object.entries(outputs)) await writeFile(file, await png(size));

// favicon.ico: 16, 32 and 48 px, each stored as an embedded PNG
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => png(size, size >= 48 ? 0.8 : 0.94)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(size, e); header.writeUInt8(size, e + 1); header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
await writeFile('src/favicon.ico', Buffer.concat([header, ...images]));
console.log('icons written:', Object.keys(outputs).join(', '), '+ src/favicon.ico');
