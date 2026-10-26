import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Bake a looping GIF into a light-on-black diamond halftone mp4 for TransparentLoop.
// Black reads as transparent on the site, so only the dots remain. Usage: node scripts/halftone-loop.mjs input.gif name
const [source, name] = process.argv.slice(2);
if (!source || !name) throw new Error('Usage: node scripts/halftone-loop.mjs input.gif name');
const ffmpeg = process.env.PORTFOLIO_FFMPEG || 'ffmpeg';
const output = path.resolve('public/animation');
const scratch = await mkdtemp(path.join(tmpdir(), 'portfolio-halftone-'));
const columns = 96, cell = 6, fps = 12;
const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
await mkdir(output, { recursive: true });
try {
  await mkdir(`${scratch}/frames`);
  run(['-i', source, '-vf', `fps=${fps},format=rgb24`, `${scratch}/frames/%04d.png`]);
  const files = (await readdir(`${scratch}/frames`)).filter(f => f.endsWith('.png')).sort();
  await mkdir(`${scratch}/out`);
  let width = 0, height = 0;
  for (const [index, file] of files.entries()) {
    const { data, info } = await sharp(`${scratch}/frames/${file}`).flatten({ background: '#000' }).resize({ width: columns }).greyscale().raw().toBuffer({ resolveWithObject: true });
    width = info.width * cell; height = info.height * cell;
    const dots = [];
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
      const lightness = data[y * info.width + x] / 255;
      if (lightness < 0.05) continue;
      const radius = (Math.sqrt(lightness) * cell * 0.5).toFixed(2);
      const cx = (x + 0.5) * cell, cy = (y + 0.5) * cell;
      dots.push(`M${cx} ${(cy - radius)}l${radius} ${radius}-${radius} ${radius}-${radius}-${radius}Z`);
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#000"/><path fill="#f2efe8" d="${dots.join('')}"/></svg>`;
    await sharp(Buffer.from(svg)).png().toFile(`${scratch}/out/${String(index + 1).padStart(4, '0')}.png`);
  }
  run(['-framerate', String(fps), '-i', `${scratch}/out/%04d.png`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/${name}.mp4`]);
  run(['-i', `${output}/${name}.mp4`, '-vf', 'scale=iw/2:ih/2:flags=lanczos', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/${name}-small.mp4`]);
  await sharp(`${scratch}/out/0001.png`).webp({ quality: 90 }).toFile(`${output}/${name}-poster.webp`);
  console.log(`${name}: ${files.length} frames, ${width} × ${height}`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
