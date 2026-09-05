import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Bake the same source-colored diamond treatment into every frame of a video.
// The website only decodes the finished loop; it performs no image processing.
const source = process.argv[2];
if (!source) throw new Error('Usage: PORTFOLIO_FFMPEG=/path/to/ffmpeg node scripts/dither-animation.mjs source.mp4');
const ffmpeg = process.env.PORTFOLIO_FFMPEG || 'ffmpeg';
const output = path.resolve('public/animation');
const scratch = await mkdtemp(path.join(tmpdir(), 'portfolio-dither-'));
const columns = 128, rows = 172, cell = 6, fps = 20;
const width = columns * cell, height = rows * cell;
const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
await mkdir(output, { recursive: true });

try {
  run(['-i', source, '-an', '-vf', `fps=${fps},scale=${columns}:${rows}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${columns}:${rows}:(ow-iw)/2:(oh-ih)/2:white,format=rgb24`, '-f', 'rawvideo', `${scratch}/frames.rgb`]);
  const raw = await readFile(`${scratch}/frames.rgb`);
  const frameBytes = columns * rows * 3;
  const count = Math.floor(raw.length / frameBytes);
  const hash = value => { let n = Math.imul(value ^ 61, 0x45d9f3b); n = Math.imul(n ^ (n >>> 16), 0x45d9f3b); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
  for (let frame = 0; frame < count; frame++) {
    const groups = new Map();
    const data = raw.subarray(frame * frameBytes, (frame + 1) * frameBytes);
    // Flood only the connected studio background, preserving enclosed white highlights.
    const background = new Uint8Array(columns * rows);
    const queue = [];
    const visit = index => {
      if (index < 0 || index >= background.length || background[index]) return;
      const rgb = [data[index*3], data[index*3+1], data[index*3+2]];
      if (Math.min(...rgb) < 188 || Math.max(...rgb) - Math.min(...rgb) > 30) return;
      background[index] = 1; queue.push(index);
    };
    for (let x = 0; x < columns; x++) { visit(x); visit((rows-1)*columns+x); }
    for (let y = 0; y < rows; y++) { visit(y*columns); visit(y*columns+columns-1); }
    for (let q = 0; q < queue.length; q++) {
      const at = queue[q];
      if (at % columns > 0) visit(at-1);
      if (at % columns < columns-1) visit(at+1);
      visit(at-columns); visit(at+columns);
    }
    for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
      const index = y * columns + x;
      if (background[index]) continue;
      const p = index * 3;
      const rgb = [data[p], data[p + 1], data[p + 2]];
      const light = (.299 * rgb[0] + .587 * rgb[1] + .114 * rgb[2]) / 255;
      // Local, deterministic grain varies thresholds without flashing the whole frame.
      const threshold = .075 + (hash(index + frame*196613) - .5) * .055;
      const opacity = Math.round(Math.max(0, Math.min(1, (light - threshold) / .12)) * 16) / 16;
      if (!opacity || (light < .75 && hash(index*31 + frame*524287) < .012)) continue;
      const average = (rgb[0] + rgb[1] + rgb[2]) / 3;
      let ink;
      if (Math.max(...rgb) - Math.min(...rgb) > 15) {
        const saturated = rgb.map(value => Math.max(0, Math.min(255, average + (value - average) * 2)));
        const mean = saturated.reduce((a,b)=>a+b,0) / 3;
        const gain = Math.max(150, 280 * light) / Math.max(1, mean);
        ink = saturated.map(value => Math.max(0, Math.min(255, Math.round(value * gain / 8) * 8)));
      } else ink = [0.92, 0.97, 1].map(tint => Math.round(240 * light * tint / 8) * 8);
      const key = `${ink.join(',')}/${opacity}`;
      const radius = +(cell * .82).toFixed(2);
      const cx = (x + .5) * cell, cy = (y + .5) * cell;
      const diamond = `M${cx} ${cy-radius}l${radius} ${radius}-${radius} ${radius}-${radius}-${radius}Z`;
      groups.set(key, (groups.get(key) || '') + diamond);
    }
    const marks = [...groups].map(([key, d]) => { const [rgb, opacity] = key.split('/'); return `<path fill="rgb(${rgb})" opacity="${opacity}" d="${d}"/>`; }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="black"/>${marks}</svg>`;
    const rendered = sharp(Buffer.from(svg));
    await rendered.clone().png().toFile(`${scratch}/${String(frame).padStart(4,'0')}.png`);
    if (frame === 0) await rendered.clone().webp({ quality: 94 }).toFile(`${output}/minifigure-poster.webp`);
  }
  // Slightly slower than the source turntable, with crisp dots and a small payload.
  run(['-framerate', '12', '-i', `${scratch}/%04d.png`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/minifigure-spin.mp4`]);
  run(['-i', `${output}/minifigure-spin.mp4`, '-vf', 'scale=384:516:flags=lanczos', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/minifigure-spin-small.mp4`]);
  run(['-framerate', '12', '-i', `${scratch}/%04d.png`, '-vf', 'scale=384:-2:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3', '-loop', '0', `${output}/minifigure-spin.gif`]);
  await writeFile(`${output}/render-info.json`, JSON.stringify({ width, height, frames: count, fps: 12, duration: count / 12, source: path.basename(source), technique: 'Precomputed night-mode diamond dithering with local temporal threshold variation' }, null, 2) + '\n');
  console.log(`Rendered ${count} frames, ${width} × ${height}, ${count / 12}s loop.`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
