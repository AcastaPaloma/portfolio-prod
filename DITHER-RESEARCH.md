# Animated dither direction

Research checked 2026-09-05. The requested effect is a moving, high-contrast image treatment with a deliberately stepped cadence, rather than a static print texture.

| Source | Observed mechanism | Application here |
| --- | --- | --- |
| [Lance Yan](https://www.lanceyan.com/) and the site's publicly served page JavaScript | Hidden MP4 sources sampled into a coarse grid, rendered as diamond marks. Night scenes use black, fixed-size diamonds, strong saturation, and a narrow opacity threshold. The fish scene was observed playing live. Butterfly rendering is capped at 25 fps; the general renderer defaults to 30 fps. | Black field, bright source-colored diamonds, a sharp threshold, and a genuine rotating subject. |
| [video-dithering-tool](https://github.com/MichailSemoglou/video-dithering-tool) | Processes individual video frames with error diffusion, ordered or random thresholds and exports frame sequences/GIFs. | Precompute every frame and encode the final loop; no processing burden in the browser. |
| [Ditherer](https://github.com/gyng/ditherer) | Distinguishes palette reduction, glitch, temporal processing and filter chains. | Treat palette, frame cadence, and local temporal texture as separate controls. |
| [Dancing Dither — creator's Reddit explanation](https://www.reddit.com/r/generative/comments/1heqrc7/dancing_dither/) | The creator combines source motion with pixel/dither postprocessing and describes aiming for a flip-book feel. | A deliberately stepped 12 fps playback cadence. |
| [Video dithering app — creator's Reddit explanation](https://www.reddit.com/r/graphic_design/comments/1rs3yqp/just_added_video_dithering_to_my_free_app/) | Discusses the performance tradeoff between ordered GPU methods and sequential error-diffusion work. | Keep the finished site lightweight by baking its effect offline. |

Lance's sampled renderer does not use random noise. Its shimmer comes from moving source content crossing a sharp threshold. The small, deterministic per-frame threshold perturbation and sparse dot dropout in this implementation are an authored addition for the requested glitchier feel, not a claim about Lance's code. There is no full-frame strobe or opacity flashing. The layout remains quiet and text stays crisp.

The page starts in its night state. Its draggable boundary changes only text and page background; photos and the animation retain their colors. Visitors can pause the spin. Reduced-motion, offscreen, and hidden-tab states do not autoplay.

## Transparency and motion follow-up

Reference analysis and source checks continued September 5–6, 2026:

| Source | Relevant finding |
| --- | --- |
| [Aceternity Dither Shader](https://ui.aceternity.com/components/dither-shader) | Real-time image treatment with ordered patterns, animated texture, and transparent backgrounds. It is not itself the moving-source video pipeline needed here. No dependency was added. |
| [fidelthomet/dither-dither](https://github.com/fidelthomet/dither-dither) | Image/video Web Component, including blue-noise thresholds and visibility-aware GPU lifecycle. Informs the visibility/lifecycle budget, rather than copying an effect wholesale. |
| [ForLoopCodes/dither](https://github.com/ForLoopCodes/dither) | Multiple image/video dither methods; confirms source animation and dither method are separate choices. |
| [makew0rld/didder](https://github.com/makew0rld/didder) | Offline image dither with alpha support. Useful precedent for baking transparency into still assets. |
| [runevision/Dither3D](https://github.com/runevision/Dither3D) and [the creator's Reddit demo](https://www.reddit.com/r/GraphicsProgramming/comments/1ijw78c/feature_demo_video_of_surfacestable_fractal/) | Surface-stable patterns differ from screen-space grain. Our deliberate shimmer follows source motion and local thresholds, not a full-frame flicker. |
| [Creator's local dither tool discussion](https://www.reddit.com/r/webdev/comments/1oyop6s/ive_build_a_free_fast_and_secure_image_dithering/) | Browser-local image processing and algorithm choices; research context, not the implementation's source code. |
| [alphavid](https://github.com/matthabermehl/alphavid), [transparent-video](https://github.com/status-im/react-native-transparent-video), and [chromakey-video-react](https://github.com/anl331/chromakey-video-react) | Alpha packing and GPU matte extraction are viable cross-format approaches. This page uses a tiny black-matte extraction pass on its already-dithered video. |
| [Lance Yan, inspected live](https://www.lanceyan.com/) | Transparent scene backgrounds with a higher text layer allow motion behind prose. Our text and page backgrounds are independently split, keeping colored media intact. |
| [Arnold Francisca Ink](https://arnoldfrancisca.com/tools/ink) | Actual handwritten animation export used as a restrained sideline; settings and source recorded in ANIMATION-SOURCES.md. |

The latest user direction narrows dithering to the minifigure and helmet and removes the piñata animation. Photographs and the supplied Morgan globe are full color in compact bento groups. The white helmet and handwriting follow the inversion boundary; colored subjects and normal media retain their colors. The helmet uses a fixed silhouette below the crest, with coherent wind displacement in the bristles and local luminance pulses. Morgan now uses matching black/white renders exported directly from Bloop, with one synchronized video and no background removal.

## September 6 refinement

[Lance’s butterfly scene](https://www.lanceyan.com/) was inspected playing live again. The intended energy comes from local moving detail crossing a sharp dither threshold; the new helmet applies that through crest wind and sparse particle variation, with no rotation. Its periodic displacement and brightness waves close over eight seconds. Expensive mask extraction and frame rendering remain offline.

## Clean globe export correction

The owner identified photo damage from the gray-matte extraction. The replacement uses [Bloop’s saved project and MP4 export](https://bloop.wtf/en) twice, with only the background changed to black or white. Both renders retain the original card edges, source photos, shadows, and back fade. A single packed video keeps their timing synchronized; the slider selects the matching source render. The segmentation pipeline has been deleted.
