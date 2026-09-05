# Minifigure animation

Generated through the owner's signed-in Midjourney account. The green cap and blue shirt are based on the owner's existing Duolingo avatar; this is an avatar-inspired likeness, not a face reconstruction from a photograph.

- Image: [Midjourney job 233530ab, image 0](https://www.midjourney.com/jobs/233530ab-275d-45a2-b70d-a4c4a1850c91?index=0)
- Video: [Midjourney job bd8c8ae0, video 0](https://www.midjourney.com/jobs/bd8c8ae0-f7c8-4fd5-b340-a8365a99a22c?index=0)
- Generation scope: one four-image batch and one video (`--bs 1`). No subscription changes or purchases.
- Source: `public/animation/minifigure-source.mp4`.
- Processed: `minifigure-spin.mp4`, `minifigure-spin-small.mp4`, `minifigure-spin.gif`, and `minifigure-poster.webp` in the same directory.
- Rebuild with `PORTFOLIO_FFMPEG=/path/to/ffmpeg node scripts/dither-animation.mjs public/animation/minifigure-source.mp4`.

Image prompt summary: One glossy authentic LEGO minifigure with warm light peach plastic face, dark dot eyes, straight eyebrows, small smile, plain green baseball cap, blue crewneck torso, dark navy legs and peach C-shaped hands. Full-body studio product photograph, polished ABS reflections, front three-quarter view, arms down, pure white seamless background. No accessories, stand, text, watermark, or additional figures. Parameters: `--ar 3:4 --raw --stylize 50`.

Video prompt summary: Fixed-camera product turntable. The entire rigid figure rotates through a full 360 degrees, from front to side to back to side and back to the matching front frame. Keep figure scale, position, expression and pose fixed. Studio highlights travel across the cap and torso. No walking, gestures or camera movement. Parameters: `--motion high --raw --loop --bs 1`.

The original video is 5.208 seconds and includes repeated full turns. Its frame sequence is sampled at 20 fps and played at 12 fps after dithering for a slower, stepped loop. The MP4 supplies browser playback; the GIF is an optional reusable export.
