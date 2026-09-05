# Photographs

Selected for the dither version after surveying 270 thumbnails across the connected iPhone's 4,927 JPEG/HEIC photographs, then retrieving the chosen originals. This was a broad visual survey, not an individual review of every photo.

| Web asset | iPhone original | Captured | Selection reason |
| --- | --- | --- | --- |
| after-rain | IMG_2712.HEIC | September 2026 | Reflections, dusk color, and strong architectural perspective |
| off-the-clock | IMG_0976.JPG | August 2026 | The candid group pose tells a small story without explanation |
| hills | RUNT1320.JPG | June 2023 | Human scale against the landscape |
| window | IMG_8766.HEIC | April 2024 | A naturally framed view with a small figure at the waterfront |
| a-short-break | IMG_9378.HEIC | July 2024 | A playful pause and an unexpected composition |
| circa-2026 | Existing supplied LEGO photograph | 2026 | Continuity with the original portfolio and the beach photographs |

The `.webp` assets contain no EXIF or precise-location metadata. `*-original.webp` is a resized, stripped source for future regeneration; it is not loaded by the page. `*-small.webp` is the mobile image variant.

Regenerate a photograph with `node scripts/dither-photos.mjs path/to/source.jpg asset-name`. The generated diamond halftones use sampled luminance for dot size and opacity, with a restrained increase in source-color saturation. The implementation is original, informed by the visible rendering and public client code of [Lance Yan's site](https://www.lanceyan.com/). His photographs, videos, and text are not included.
