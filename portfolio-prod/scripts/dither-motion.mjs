import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Bake the same source-colored diamond treatment into every frame of a video.
// The website decodes finished frames and removes their black matte with one GPU pass.
const source = process.argv[2];
const name = process.argv[3] || 'motion';
const backdrop = process.argv[4] || 'white';
if (!source) throw new Error('Usage: PORTFOLIO_FFMPEG=/path/to/ffmpeg node scripts/dither-motion.mjs source.mp4 output-name white|gray');
const ffmpeg = process.env.PORTFOLIO_FFMPEG || 'ffmpeg';
const output = path.resolve('public/animation');
const scratch = await mkdtemp(path.join(tmpdir(), 'portfolio-dither-'));
const columns = 168, rows = 168, cell = 4, fps = 12;
const width = columns * cell, height = rows * cell;
const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
await mkdir(output, { recursive: true });

try {
  run(['-i', source, '-an', '-vf', `fps=${fps},scale=${columns}:${rows}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${columns}:${rows}:(ow-iw)/2:(oh-ih)/2:white,format=rgb24`, '-f', 'rawvideo', `${scratch}/frames.rgb`]);
  const raw = await readFile(`${scratch}/frames.rgb`);
  const frameBytes = columns * rows * 3;
  const sourceCount = Math.floor(raw.length / frameBytes);
  const confetti = backdrop === 'white';
  const count = confetti ? sourceCount * 2 - 2 : sourceCount;
  const hash = value => { let n = Math.imul(value ^ 61, 0x45d9f3b); n = Math.imul(n ^ (n >>> 16), 0x45d9f3b); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
  for (let frame = 0; frame < count; frame++) {
    const groups = new Map();
    const sourceFrame = confetti && frame >= sourceCount ? count - frame : frame;
    const data = raw.subarray(sourceFrame * frameBytes, (sourceFrame + 1) * frameBytes);
    // A reversible dispersion closes the source into a continuous burst/reassembly loop.
    const burst = confetti ? Math.pow(Math.sin(Math.PI * frame / count), 12) : 0;
    // Flood only the connected studio background, preserving enclosed white highlights.
    const background = new Uint8Array(columns * rows);
    const queue = [];
    const visit = index => {
      if (index < 0 || index >= background.length || background[index]) return;
      const rgb = [data[index*3], data[index*3+1], data[index*3+2]];
      if (backdrop === 'gray' ? Math.max(Math.abs(rgb[0]-61),Math.abs(rgb[1]-63),Math.abs(rgb[2]-66)) > 14 : (Math.max(...rgb)-Math.min(...rgb))/Math.max(1,...rgb) > .42) return;
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
      const opacity = Math.round(Math.max(0, Math.min(1, (light - threshold) / .12)) * (1-burst*.35) * 16) / 16;
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
      const radius = +(cell * (confetti ? .62 : .82)).toFixed(2);
      const tile = Math.floor(x/3) + Math.floor(y/3)*columns;
      const angle = hash(tile+171)*Math.PI*2;
      const travel = burst * (30 + hash(tile+599)*100);
      const cx = +((x + .5) * cell * (confetti?.76:1) + (confetti?width*.12:0) + Math.cos(angle)*travel).toFixed(2);
      const cy = +((y + .5) * cell * (confetti?.76:1) + (confetti?height*.1:0) + Math.sin(angle)*travel).toFixed(2);
      const diamond = `M${cx} ${cy-radius}l${radius} ${radius}-${radius} ${radius}-${radius}-${radius}Z`;
      groups.set(key, (groups.get(key) || '') + diamond);
    }
    const marks = [...groups].map(([key, d]) => { const [rgb, opacity] = key.split('/'); return `<path fill="rgb(${rgb})" opacity="${opacity}" d="${d}"/>`; }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="black"/>${marks}</svg>`;
    const rendered = sharp(Buffer.from(svg));
    await rendered.clone().png().toFile(`${scratch}/${String(frame).padStart(4,'0')}.png`);
    if (frame === 0) await sharp(Buffer.from(svg.replace('<rect width="100%" height="100%" fill="black"/>', ''))).webp({ quality: 92, alphaQuality: 100 }).toFile(`${output}/${name}-poster.webp`);
  }
  // Slightly slower than the source turntable, with crisp dots and a small payload.
  run(['-framerate', '12', '-i', `${scratch}/%04d.png`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/${name}.mp4`]);
  run(['-i', `${output}/${name}.mp4`, '-vf', 'scale=384:384:flags=lanczos', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/${name}-small.mp4`]);
  if(name==='pinata-leap')run(['-i', `${output}/${name}.mp4`, '-vf', 'scale=256:256:flags=lanczos', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${output}/pinata-roam.mp4`]);
  await writeFile(`${output}/${name}-info.json`, JSON.stringify({ width, height, frames: count, fps: 12, duration: count / 12, source: path.basename(source), technique: 'Precomputed night-mode diamond dithering with local temporal threshold variation' }, null, 2) + '\n');
  console.log(`Rendered ${count} frames, ${width} × ${height}, ${count / 12}s loop.`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
