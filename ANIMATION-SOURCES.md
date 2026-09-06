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

The page now dithers only the minifigure, piñata, and helmet. Personal photographs and the Morgan globe use their original colors.

## Piñata

Generated in the owner's signed-in Midjourney account: one image batch and one video, without account or subscription changes.

- [Image job 1b2dfd18, image 0](https://www.midjourney.com/jobs/1b2dfd18-b100-47ad-ba8d-b0267b08b387?index=0)
- [Video job 6df0c400, video 0](https://www.midjourney.com/jobs/6df0c400-e9b7-4223-8e4a-6e56165b1b49?index=0)
- Source: `public/animation/pinata-source.mp4`.
- Image direction: happy tactile donkey piñata, long ears, smiling face, tissue fringe in fuchsia, orange, and cobalt bands, full body on a white studio background. Video direction: joyful leap, tissue/confetti burst, and reassembly, fixed camera (`--motion high --raw --loop --bs 1`).
- Processing: `scripts/dither-motion.mjs source.mp4 pinata-leap white` removes the neutral studio backdrop, renders colored diamond marks, and adds reversible particle dispersion. The forward/reverse source sequence closes the 124-frame, 12-fps loop.
- The page plays `pinata-roam.mp4`, a 256px derivative of `pinata-leap.mp4`, encoded with H.264 CRF 24. `RovingPinata` adds three actual positional hops along periodic ballistic arcs, compositor transforms, and landing compression. Its fixed button pauses both travel and source playback.

## Agamemnon helmet

The owner supplied a crested helmet reference and a particle-filter description. An image was generated with the built-in image-generation tool, preserving the three-quarter pose, crest, face opening, and rear ornaments. The requested style was white point-cloud particles, density-defined contours, sparse edge dispersion, and no typography or colored background.

`public/animation/helmet-particles-source.png` preserves the generated source. `scripts/animate-helmet.mjs` removes its dark matte/checker pixels and renders an eight-second periodic particle shimmer, local glints, and a tiny closed drift. It writes transparent still, 720px video, and 384px mobile video. The entire displayed subject uses difference blending, so its particles invert at the same slider boundary as the page.

## Ink handwriting

Created and downloaded from [Arnold Francisca's Ink tool](https://arnoldfrancisca.com/tools/ink), using the text “around the dot”, Love Letter, Thin, white `#f5f5f5`, Wiggle 50, Twist 40, and WebM Transparent. This is an actual tool export, not an approximation using a CSS font.

`public/animation/ink-source.webm` is the original 1920×1080, 4-fps, six-second export. `scripts/prepare-ink.mjs` crops the shared frame bounds to 816×424, creates an alpha poster, and makes a 46-frame forward/reverse MP4. It appears as a small, low-opacity handwritten sideline beside the Around the dot heading. The main semantic heading remains readable.

## Morgan globe

Source supplied by the owner: `/Users/kuanw/Downloads/Bloop-orbitglobe-15s.mp4`. `morgan-orbit.mp4` is a 720px, 30-fps, H.264 CRF 23 encode; `morgan-orbit-small.mp4` is the 480px CRF 24 variant. Both preserve the normal full-color video. The first frame supplies `morgan-orbit-poster.webp`. Native browser playback pauses offscreen, in hidden tabs, or for reduced-motion preferences.

## Runtime transparency

The three dither subjects and Ink use a tiny WebGL matte-removal pass on each decoded frame. Dithering, sparkle, and confetti are already baked. `requestVideoFrameCallback` avoids unnecessary redraws; an 83ms timer is the fallback. The shader uses a soft near-black threshold, leaves colored pixels in their original color space, and writes premultiplied alpha. WebGL failure leaves the static alpha poster. The normal Morgan video bypasses this pass.
