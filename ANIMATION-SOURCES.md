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

# Piñata, helmet, and Ink additions — September 2026

The current page dithers only the minifigure and helmet. The piñata animation was removed in the latest September 6 refinement; its generation assets below remain archived and are not loaded. Personal photographs and the Morgan globe use their original colors.

## Piñata

Generated in the owner's signed-in Midjourney account: one image batch and one video, without account or subscription changes.

- [Image job 1b2dfd18, image 0](https://www.midjourney.com/jobs/1b2dfd18-b100-47ad-ba8d-b0267b08b387?index=0)
- [Video job 6df0c400, video 0](https://www.midjourney.com/jobs/6df0c400-e9b7-4223-8e4a-6e56165b1b49?index=0)
- Source: `public/animation/pinata-source.mp4`.
- Image direction: happy tactile donkey piñata, long ears, smiling face, tissue fringe in fuchsia, orange, and cobalt bands, full body on a white studio background. Video direction: joyful leap, tissue/confetti burst, and reassembly, fixed camera (`--motion high --raw --loop --bs 1`).
- Processing: `scripts/dither-motion.mjs source.mp4 pinata-leap white` removes the neutral studio backdrop, renders colored diamond marks, and adds reversible particle dispersion. The forward/reverse source sequence closes the 124-frame, 12-fps loop.
- Archived `pinata-roam.mp4` is a 256px derivative of `pinata-leap.mp4`, encoded with H.264 CRF 24. The roaming component and its control were deleted; no piñata animation is mounted.

## Agamemnon helmet

The owner supplied a crested helmet reference and a particle-filter description. An image was generated with the built-in image-generation tool, preserving the three-quarter pose, crest, face opening, and rear ornaments. The requested style was white point-cloud particles, density-defined contours, sparse edge dispersion, and no typography or colored background.

`public/animation/helmet-particles-source.png` preserves the generated source. `scripts/animate-helmet.mjs` removes its dark matte/checker pixels and renders an eight-second periodic crest-wind cycle with local particle shimmer, sparse dropout, and traveling glints. The curved crest root anchors the motion: metal geometry never rotates or drifts. Current outputs are `helmet-wind-poster.webp`, `helmet-wind.mp4` (720px), and `helmet-wind-small.mp4` (384px). The entire displayed subject uses difference blending, so its particles invert at the same slider boundary as the page.

## Ink handwriting

Created and downloaded from [Arnold Francisca's Ink tool](https://arnoldfrancisca.com/tools/ink), using the text “around the dot”, Love Letter, Thin, white `#f5f5f5`, Wiggle 50, Twist 40, and WebM Transparent. This is an actual tool export, not an approximation using a CSS font.

`public/animation/ink-source.webm` is the original 1920×1080, 4-fps, six-second export. `scripts/prepare-ink.mjs` crops the shared frame bounds to 816×424, creates an alpha poster, and makes a 46-frame forward/reverse MP4. It appears as a small, low-opacity handwritten sideline beside the Around the dot heading. The main semantic heading remains readable.

## Morgan globe

Source supplied by the owner: `/Users/kuanw/Downloads/Bloop-orbitglobe-15s.mp4`. `scripts/prepare-globe-alpha.mjs` isolates connected gray matte regions offline and builds a separate alpha mask, preserving the RGB photo content. It packs color above alpha into `morgan-orbit-alpha.mp4` (600×1200, 24 fps, H.264 CRF 20) and `morgan-orbit-alpha-small.mp4` (384×768, CRF 22). The displayed image is square. The first frame supplies transparent `morgan-orbit-alpha-poster.webp`.

There is no visible pause button or native video control on the globe. Playback still pauses offscreen and in hidden tabs; reduced motion uses its still poster. The earlier opaque `morgan-orbit` files remain historical, unused assets.

## Runtime transparency

The two dither subjects and Ink use a tiny WebGL matte-removal pass on each decoded frame. Dithering and sparkle are already baked. `requestVideoFrameCallback` avoids unnecessary redraws; an 83ms timer is the fallback. The shader uses a soft near-black threshold, leaves colored pixels in their original color space, and writes premultiplied alpha. Morgan uses a second shader sampling its explicit packed alpha rather than chroma-keying photo colors at runtime; its fallback timer is 42ms. WebGL failure leaves the static alpha poster.
