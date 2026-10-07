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

`public/animation/helmet-particles-source.png` preserves the generated source. `scripts/animate-helmet.mjs` removes its dark matte/checker pixels and renders an eight-second periodic crest-wind cycle with local particle shimmer, sparse dropout, and traveling glints. The September 7 revision roughly doubles the main gust and extends the motion through more of the crest, while its curved mounting line still anchors every bristle. Metal geometry never rotates or drifts. Current outputs are `helmet-gust-poster.webp`, `helmet-gust.mp4` (720px), and `helmet-gust-small.mp4` (384px). Integer harmonics preserve the closed eight-second cycle at 12 fps without adding runtime computation. The entire displayed subject uses difference blending, so its particles invert at the same slider boundary as the page.

## Ink handwriting

Created and downloaded from [Arnold Francisca's Ink tool](https://arnoldfrancisca.com/tools/ink), using the text “around the dot”, Love Letter, Thin, white `#f5f5f5`, Wiggle 50, Twist 40, and WebM Transparent. This is an actual tool export, not an approximation using a CSS font.

`public/animation/ink-source.webm` is the original 1920×1080, 4-fps, six-second export. `scripts/prepare-ink.mjs` crops the shared frame bounds to 816×424, creates an alpha poster, and makes a 46-frame forward/reverse MP4. It appears as a small, low-opacity handwritten sideline beside the Around the dot heading. The main semantic heading remains readable.

## Morgan globe

The current globe uses two clean exports from the owner's saved Orbit Globe project in [Bloop](https://bloop.wtf/en), September 6, 2026:

- `/Users/kuanw/Downloads/Bloop-orbitglobe-black-15s.mp4`
- `/Users/kuanw/Downloads/Bloop-orbitglobe-white-15s.mp4`

Both are 1080×1080, 15 seconds, 30 fps. The project retains the six selected photos, 50% globe size, 2.5% card gap, 27° tilt, 55% back fade, 133% card scale, 16:9 cards, corner radius 23, and XL shadows. Only the solid background differs. Bloop's export dialog offers MP4 rather than a transparent format.

`scripts/prepare-globe-pair.mjs black.mp4 white.mp4` normalizes the exports' nominal video black/white levels uniformly, then packs the white render above the black render in one file. Outputs are `morgan-bloop-pair.mp4` (600×1200), `morgan-bloop-pair-small.mp4` (384×768), and matching black/white WebP posters. Runtime displays a square. One decoder keeps both versions on the same frame; a tiny shader selects the appropriate original render on each side of the slider. The light render receives a 255/253 gain to make its encoded white meet the page's exact white. There is no chroma key, segmentation, alpha reconstruction, or removal of photo pixels.

The earlier gray-background removal script and generated alpha assets were removed. No visible playback control appears on the globe. Offscreen, hidden-tab, reduced-motion, and poster fallback behavior remain.

## Runtime rendering

The minifigure, helmet, and Ink retain their existing near-black matte pass for their precomputed artwork. Morgan uses only the paired full-color render selector described above. `requestVideoFrameCallback` drives video redraws, with 83ms artwork and 33ms globe fallbacks. Slider movement reuses the last uploaded frame. The globe's still fallback also clips between its clean black/white posters, including when WebGL is unavailable.

# Blue floral backdrop — October 2026

The owner requested the evolving background and character details from [Did Codex Reset Today?](https://hascodexratelimitreset.today/), changing purple to blue while retaining the portfolio's draggable inversion boundary.

- Original film: [OpenAI CDN floral_a.mp4](https://cdn.openai.com/ctf-cdn/floral_a.mp4), the exact video used by the reference. Its original six-second motion and texture are preserved.
- Treatment: hue shifted −35 degrees, encoded as H.264 at 30 fps with 1600×1600 desktop and 768×768 mobile sources. Local files and a still poster live in `public/background/`; `source.json` records provenance and processing.
- Character field: adapted from the reference's `app.js`, preserving its glyph vocabulary, grid spacing, waves, drift, and eased cursor pull. Neutral gray ink supersedes the earlier blue treatment; drawing is capped at 30 fps and device pixel ratio 1.5.
- Runtime: one native film supplies the normal light-gray side and clipped dark inverse. Foreground photographs retain their original pixels. Video and character updates pause in hidden tabs or through the background pause control. Reduced-motion visitors start with the poster and a static character field.

The owner’s October 7 revision supersedes the blue presentation: CSS grayscale(1) removes color from the film and its poster, the character field uses neutral gray ink, and the continuous inversion uses neutral light and dark surfaces. The stored film remains unchanged.

The subsequent October 7 refinement adds a clipped pink tint to the light side only. The grayscale film, synchronized dark inverse, neutral character field, and all foreground media remain the same.

The latest October 7 simplification keeps only the dark grayscale presentation across the viewport. The pink tint and slider are removed. Morgan uses the black-background half of its existing paired Bloop video and the black still poster.

The final October 7 publication removes every visible play/pause button at the owner’s request, including the background, minifigure, helmet, and handwriting. Automatic playback, offscreen/hidden-tab pausing, reduced-motion stills, and poster fallbacks remain.
