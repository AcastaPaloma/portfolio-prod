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
