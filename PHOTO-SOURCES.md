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

## Current full-color bento assets

The September 6 revision explicitly removes dithering from all personal photographs. The current route uses `public/people/*.webp`, prepared by `scripts/prepare-people.mjs`: original color, EXIF orientation normalized, metadata stripped, up to 1100px wide, with 550px mobile variants. The earlier dithered files under `public/photos/` are retained historical assets and are not loaded by this page.

| Section | Current asset | Owner-selected source |
| --- | --- | --- |
| Piñata Pitch | pinata-1552 | `/Users/kuanw/Pictures/IMG_1552.HEIC` |
| Piñata Pitch | pinata-1225 | `/Users/kuanw/Pictures/IMG_1225.HEIC` |
| Piñata Pitch | pinata-0839 | `/Users/kuanw/Pictures/IMG_0839.JPG` |
| Piñata Pitch | pinata-3876 | `/Users/kuanw/Pictures/DSC_3876.JPEG` |
| Around the dot | around-0752 | `/Users/kuanw/Pictures/IMG_0752.HEIC` |
| Around the dot | around-0738 | `/Users/kuanw/Pictures/IMG_0738.HEIC` |

The six previously selected Elsewhere images are regenerated from the retained, stripped `public/photos/*-original.webp` sources. Bento slots use cover crops and selected focal positions; clicking any photograph opens its complete optimized image. There are no visible captions.

## Inline brand marks

- [Waterloo official icon](https://uwaterloo.ca/profiles/uw_base_profile/themes/uw_fdsu_theme_resp/icon.svg)
- [Morgan Stanley official favicon](https://www.morganstanley.com/etc.clientlibs/msdotcomr4/clientlibs/components/site/resources/img/favicon-196x196.png)
- [Reflex official favicon](https://reflex.inc/favicon-32x32.png), with the company domain verified through [its GitHub organization](https://github.com/reflex-inc).
- [NeuroPoly official logo](https://neuro.polymtl.ca/_static/logo.png)
- Piñata Pitch: owner-supplied `/Users/kuanw/Downloads/Pinata Pitch Logo Icon.png`.

These become small optimized files in `public/icons/`. Résumé, email, LinkedIn, quantum, and coffee symbols are original small SVG drawings.
