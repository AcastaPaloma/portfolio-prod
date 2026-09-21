import { execFileSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const ffmpeg = process.env.PORTFOLIO_FFMPEG || 'ffmpeg';
const [black, white] = process.argv.slice(2);
if (!black || !white) throw new Error('Provide the matching black and white Bloop exports.');
const scratch = await mkdtemp(`${tmpdir()}/globe-pair-`);
const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args]);
// Bloop exports put nominal black/white at RGB 4/251. Normalize the entire
// video range uniformly; no segmentation, keying, or pixel removal is involved.
const levels = 'format=gbrp,colorlevels=rimin=0.015686:gimin=0.015686:bimin=0.015686:rimax=0.984314:gimax=0.984314:bimax=0.984314';
try {
  for (const [name, source] of [['black', black], ['white', white]]) {
    run(['-i', source, '-frames:v', '1', '-vf', `scale=600:600:flags=lanczos,${levels}`, `${scratch}/${name}.png`]);
    await sharp(`${scratch}/${name}.png`).webp({ quality: 92 }).toFile(`public/animation/morgan-bloop-${name}-poster.webp`);
  }
  // Two original color renders in one video, white above black. One decoder
  // keeps the two sides perfectly synchronized while the slider reveals them.
  for (const size of [600, 384]) {
    const filter = `[0:v]fps=30,setpts=PTS-STARTPTS,scale=${size}:${size}:flags=lanczos,${levels}[black];[1:v]fps=30,setpts=PTS-STARTPTS,scale=${size}:${size}:flags=lanczos,${levels}[white];[white][black]vstack=inputs=2,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[out]`;
    run(['-i', black, '-i', white, '-filter_complex', filter, '-map', '[out]', '-an', '-t', '15', '-c:v', 'libx264', '-preset', 'slow', '-crf', size === 600 ? '20' : '22', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart', `public/animation/morgan-bloop-pair${size === 384 ? '-small' : ''}.mp4`]);
  }
  console.log('Packed matching Bloop renders at 600px and 384px, with original photo edges and shadows.');
} finally {
  await rm(scratch, { recursive: true, force: true });
}
