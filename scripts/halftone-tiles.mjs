import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

// Project tile thumbnails: diamond halftone in light ink on near-black, so every tile shares one look.
// Usage: node scripts/halftone-tiles.mjs input.jpg output-name
const [source, name] = process.argv.slice(2);
if (!source || !name) throw new Error('Usage: node scripts/halftone-tiles.mjs input.jpg output-name');
const root = path.resolve('public/work');
await mkdir(root, { recursive: true });
const columns = 150, cell = 6, threshold = 0.04;
const { data, info } = await sharp(source).rotate().resize({ width: columns }).flatten({ background: '#0b0b0b' }).greyscale().raw().toBuffer({ resolveWithObject: true });
const width = info.width * cell, height = info.height * cell;
const diamonds = [];
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const lightness = data[y * info.width + x] / 255;
  if (lightness < threshold) continue;
  const radius = (Math.sqrt(lightness) * cell * 0.5).toFixed(2);
  const cx = (x + 0.5) * cell, cy = (y + 0.5) * cell;
  diamonds.push(`M${cx} ${(cy - radius)}l${radius} ${radius}-${radius} ${radius}-${radius}-${radius}Z`);
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#0b0b0b"/><path fill="#f2efe8" fill-opacity=".92" d="${diamonds.join('')}"/></svg>`;
await sharp(Buffer.from(svg)).resize({ width: 900 }).webp({ quality: 88 }).toFile(`${root}/${name}-halftone.webp`);
console.log(`${name}: ${diamonds.length} dots`);
