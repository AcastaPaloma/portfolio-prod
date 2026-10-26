import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Colour diamond halftone in the style of lanceyan.com: each dot is a rotated square, coloured from
// the source pixel and sized by its brightness, on a plain black matte. Black reads as transparent
// on the site, so only the diamonds show.
//   still: node scripts/diamond.mjs still input.jpg output-name
//   loop:  node scripts/diamond.mjs loop input.gif output-name   (writes public/animation/<name>.mp4)
const [mode, source, name] = process.argv.slice(2);
const ffmpeg = process.env.PORTFOLIO_FFMPEG || 'ffmpeg';
const cell = 6, saturation = 2.1, threshold = 0.12;
const quantize = value => Math.max(0, Math.min(255, Math.round(value / 24) * 24));

async function diamondSvg(pixels, info) {
  const width = info.width * cell, height = info.height * cell;
  // Stretch each frame's brightness between its 2nd and 98th percentile, so dots span the full size range.
  const luminances = [];
  for (let p = 0; p < pixels.length; p += 3) luminances.push((0.299 * pixels[p] + 0.587 * pixels[p + 1] + 0.114 * pixels[p + 2]) / 255);
  const sorted = [...luminances].sort((a, b) => a - b);
  const low = sorted[Math.floor(sorted.length * 0.02)], high = Math.max(low + 0.05, sorted[Math.floor(sorted.length * 0.98)]);
  const groups = new Map();
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const p = (y * info.width + x) * 3;
    const [red, green, blue] = [pixels[p], pixels[p + 1], pixels[p + 2]];
    const raw = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    const luminance = Math.min(1, Math.max(0, (raw - low) / (high - low)));
    if (luminance < threshold) continue;
    const average = (red + green + blue) / 3;
    const key = [red, green, blue].map(channel => quantize(average + (channel - average) * saturation)).join(',');
    // Brightness drives size with a steep curve, so dim dots shrink away and bright dots stay sharp diamonds.
    const radius = (Math.pow(luminance, 0.9) * cell * 0.5).toFixed(2);
    const cx = (x + 0.5) * cell, cy = (y + 0.5) * cell;
    const diamond = `M${cx} ${(cy - radius)}l${radius} ${radius}-${radius} ${radius}-${radius}-${radius}Z`;
    groups.set(key, (groups.get(key) || '') + diamond);
  }
  const paths = [...groups].map(([rgb, d]) => `<path fill="rgb(${rgb})" d="${d}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#000"/>${paths}</svg>`;
}

if (mode === 'still') {
  const { data, info } = await sharp(source).rotate().resize({ width: 120 }).flatten({ background: '#000' }).raw().toBuffer({ resolveWithObject: true });
  const svg = await diamondSvg(data, info);
  await sharp(Buffer.from(svg)).resize({ width: 900 }).webp({ quality: 90 }).toFile(path.resolve('public/work', `${name}-diamond.webp`));
  console.log(`${name}: ${info.width}×${info.height} cells`);
} else if (mode === 'loop') {
  if (!source || !name) throw new Error('Usage: node scripts/diamond.mjs loop input.gif output-name');
  const output = path.resolve('public/animation');
  const scratch = await mkdtemp(path.join(tmpdir(), 'portfolio-diamond-'));
  const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  await mkdir(output, { recursive: true });
  try {
    await mkdir(`${scratch}/frames`); await mkdir(`${scratch}/out`);
    run(['-i', source, '-vf', 'fps=12,format=rgb24', `${scratch}/frames/%04d.png`]);
    const files = (await readdir(`${scratch}/frames`)).filter(f => f.endsWith('.png')).sort();
    for (const [index, file] of files.entries()) {
      const { data, info } = await sharp(`${scratch}/frames/${file}`).flatten({ background: '#000' }).resize({ width: 96 }).raw().toBuffer({ resolveWithObject: true });
      await sharp(Buffer.from(await diamondSvg(data, info))).png().toFile(`${scratch}/out/${String(index + 1).padStart(4, '0')}.png`);
    }
    run(['-framerate', '12', '-i', `${scratch}/out/%04d.png`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/${name}.mp4`]);
    run(['-i', `${output}/${name}.mp4`, '-vf', 'scale=iw/2:ih/2:flags=lanczos', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/${name}-small.mp4`]);
    await sharp(`${scratch}/out/0001.png`).webp({ quality: 90 }).toFile(`${output}/${name}-poster.webp`);
    console.log(`${name}: ${files.length} frames`);
  } finally { await rm(scratch, { recursive: true, force: true }); }
}
