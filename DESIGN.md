---
name: Kuan Yi Wang — Words, Photographs, and Dots
description: "A minimal personal page with full-color photo bentos, two dithered subjects, a dark grayscale floral film, and a neutral contribution calendar."
colors:
  paper: "#fff"
  ink: "#f2f2f2"
  print-ink: "#202020"
  surface: "#eee"
  dark-fallback: "#151515"
  dark-backdrop-wash: "rgb(21 21 21 / 14%)"
  glyph-ink: "rgba(90, 90, 90, 0.22)"
  glyph-ink-active: "rgba(80, 80, 80, 0.42)"
  sponsor-blue: "#0070f3"
  location-red: "#ff0000"
  link-rule: "#888"
  focus-ring: "#999"
  streak-rule: "#8a8a8a"
  gym-void: "#d8d0c3"
  gym-ink: "#28231f"
  gym-quiet-ink: "#5b5147"
  gym-surface: "rgb(255 255 255 / 94%)"
  gym-rule: "rgb(47 41 35 / 25%)"
typography:
  body:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "17px"
    lineHeight: "1.55"
  name:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "2.2rem"
    fontWeight: 600
    lineHeight: "1.15"
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: "1.25"
    letterSpacing: "-0.02em"
  streak-count:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "1.3rem"
    letterSpacing: "-0.02em"
  streak-count-compact:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "1.15rem"
    letterSpacing: "-0.02em"
  link-label:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "0.85rem"
    lineHeight: "1.55"
  activity-body:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "0.8125rem"
    lineHeight: "1.5"
  activity-heading:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: "1.5"
    letterSpacing: "0"
  activity-label:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "0.75rem"
    lineHeight: "1.5"
rounded:
  image: "0"
  streak-card: "14px"
  streak-flag: "5px"
  gym-field: "0"
spacing:
  paragraph: "1.35rem"
  link-gap: "1.4rem"
  work-row: "1.5rem"
  photo-gap: "4px"
  masonry-column-gap: "0.75rem"
  masonry-item-gap: "1.25rem"
  section-space: "clamp(4rem, 7vw, 5.5rem)"
  location-gap: "0.4rem"
components:
  text-link:
    textColor: "{colors.ink}"
  github-activity:
    textColor: "{colors.ink}"
    typography: "{typography.activity-body}"
    width: "min(100%, 20rem)"
  github-heading:
    typography: "{typography.activity-heading}"
  gym-surface:
    backgroundColor: "{colors.gym-surface}"
    textColor: "{colors.gym-ink}"
    padding: "clamp(1.15rem, 3vw, 2.6rem)"
  gym-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.gym-ink}"
    rounded: "{rounded.gym-field}"
    padding: "0.45rem 0.55rem"
  gym-button:
    backgroundColor: "{colors.gym-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.gym-field}"
    padding: "0.5rem 0.85rem"
---

# Design System: Kuan Yi Wang — Words, Photographs, and Dots

## Overview

**Creative North Star: "Words, Photographs, and Dots"**

One compact personal page: Georgia prose, full-color photographs, and two animated dither subjects over the floral film and cursor-reactive characters from the user-approved hascodexratelimitreset.today reference. The owner’s final October 7 refinement keeps the dark grayscale presentation across the whole viewport and a graph-only GitHub panel, while preserving the existing typography, composition, content, and foreground colors. Only the minifigure and Agamemnon helmet receive the particle/dither treatment. The roaming piñata is removed. The supplied Morgan globe consistently displays the black-background half of its original full-color Bloop pair, with a black poster and no visible playback control. Arnold Francisca's Ink export supplies a small handwritten accent beside Around the dot.

The page opens on a black and charcoal floral field. Compact identity copy, including current computer vision inference work at Reflex, representation learning at RBC Borealis, and Piñata Pitch's 2000+ student ideas, and the minifigure share the opening; work follows beside the particle helmet. Projects appear in order: Genie Doom World Model, GNN Quantum Error Decoder, Allot, Cortesol, and MvPVP. Awards are condensed beside project names where they fit; the quantum project’s ISEF Silver, Physics & Astronomy, Team Canada, and Jane Street sponsorship appear in the description. People contains Piñata Pitch, Morgan Stanley, and Around the dot. Elsewhere combines eleven owner-selected travel photographs with three retained camera-roll images. The calendar invitation belongs in the opening links, alongside résumé, LinkedIn, and email.

The inherited PRODUCT.md and résumé scene describe the earlier route. The current main-page authority is the user's minimal Lance-inspired direction and subsequent refinements. The existing /gym utility stays separate. The desktop introduction’s top-right column contains an open public GitHub contribution calendar above the minifigure. The entire panel is hidden through 64rem; narrow layouts retain name, biography, and figure without an activity gap.

**Key Characteristics:**

- Compact Georgia identity and prose on one centered rail with symmetric gutters.
- Authentic full-color photographs, tight People bentos, and natural-proportion Elsewhere masonry.
- Dither limited to the minifigure and helmet; the globe and handwriting retain their established media treatments.
- A full-viewport dark grayscale floral film with small cursor-reactive glyphs and solid light foreground ink.
- One authentic neutral GitHub contribution calendar on larger displays; complete removal on smaller displays.
- Precomputed artwork, native floral motion, visible focus, and reduced-motion stills.

## Colors

The main page uses black and charcoal motion beneath light neutral text; authentic media and the existing semantic accents keep their own colors.

### Primary

- **Sponsor Blue:** the owner-requested Jane Street mention and the “U” in the Luray Caverns USA location caption retain their established blue.

### Secondary

- **Location Red:** the “S” in that caption remains red; “A” remains Paper.

### Neutral

- **Ink:** solid light foreground color for prose, headings, links, captions, and the contribution calendar.
- **Surface:** the neutral base beneath the filmed backdrop and its white wash.
- **Dark Fallback / Dark Backdrop Wash:** an opaque dark fill when backdrop filtering is unavailable and the translucent neutral wash when inversion is supported.
- **Glyph Ink / Glyph Ink Active:** the neutral gray character field, including the cursor-reactive variant.
- **Paper, Link Rule, Focus Ring, and Streak Rule:** established control ink, link decoration, visible focus, and the streak panel’s hairline.
- **Print Ink:** dark foreground text and calendar cells on white print output.
- **Gym palette:** the existing warm void, ink, quiet ink, translucent surface, and rule colors remain scoped to the retained utility.

A fixed film, neutral white wash, and gray glyph field form the lowest backdrop layer. A fixed shade covers the complete viewport with backdrop `invert(1)` and the neutral 14% dark wash. Its opaque fallback uses Dark Fallback. The shade filters only the backdrop below it; the foreground photographs and ordinary video remain above it with their original pixels. Prose and the one calendar SVG use solid Ink, with no viewport-aligned text masks or second inverse graph.

The calendar expresses contribution levels through five opacities (.1, .3, .5, .72, and 1) of the same light ink. Photographs and the Morgan globe keep their full-color pixels. The minifigure has transparent negative space and retains source colors. The white particle helmet and Ink handwriting keep their own difference blending over the dark field.

**The Photograph Color Rule.** Photographs and the Morgan globe retain their full original colors. No dither or inversion is applied to them.

**The Dark Field Rule.** The grayscale floral film and neutral glyphs share one fixed dark treatment across the whole viewport. Foreground text and calendar cells use solid light Ink; the backdrop shade does not filter foreground media. Only the monochrome helmet and handwriting use their own difference blending.

## Typography

Georgia body copy is 17px with 1.55 line height; the name is 2.2rem and section headings 1.3rem. At 48rem, body and name become 16px and 2rem. Work descriptions and profile links use .85rem. Project title links stay on one line; below 34rem they also use .85rem so the compact labels fit without overflow. Every Elsewhere photograph has a location caption: .8125rem desktop, .75rem on narrow phones, with 1.35 line height. These wrap beneath the images in solid light ink. Unknown locations, including the aurora, use the owner-requested `???`. People remains caption-free.

GitHub activity uses the compact caption scale (.8125rem with 1.5 line height), a quiet regular-weight heading (.85rem with 1.5 line height and no letter spacing), and the “past year” label and saved-activity note (.75rem with inherited 1.5 line height). The single calendar carries an accessible contribution summary and exact date/count titles for each day.

Every underlined text link has a small preceding icon. Brand marks come from the organizations' official assets or the user's Piñata Pitch logo. Other symbols are simple authored SVGs. Profile organization links keep the icon with the first word; longer names wrap naturally. The opening uses a 31rem measure and pretty paragraph wrapping. All links retain visible keyboard focus. The top invitation reads: “join me for a workout. or a coffee.”

**The Quiet Name Rule.** Keep the name and prose compact so the animated minifigure can lead the first viewport.

## Layout

The intro, work, People, and Elsewhere all share one centered 60rem maximum-width rail with symmetric 2.75–3rem gutters. Headings, prose, links, and image groups share its left edge. The first section uses a 1.2:1 copy/art split with a 3rem gap and content-driven height. Above 64rem, the right column stacks the GitHub panel above the figure with a 1.5rem gap and begins 2.75rem above the copy rail; the panel aligns right and caps at 20rem, while the desktop figure caps at 18rem. Work occupies about 26rem, with the helmet aligned to the rail’s right edge and an additional 1–2rem gap above the section. People and Elsewhere headings have 4–5.5rem of responsive space above them. Avoid independent section widths, asymmetric mobile padding, or viewport-height gaps before work.

Bento groups use four-pixel seams, square corners, and no card shells. Piñata Pitch uses three columns: tall event screen, selfie above the audience, tall physical piñata. Morgan's square globe and the two Around the dot photos share a desktop row. Their headings align. Around the dot pairs the childhood blanket photograph with the inflatable dinosaur.

Elsewhere follows the varied-height masonry direction of the owner's [Gallery 25 reference](https://www.shadcnblocks.com/block/gallery25). Four native CSS columns let each photograph keep its complete natural proportions. Columns have .75rem gutters, figures have 1.25rem of space below, and location labels sit .4rem beneath their images at their natural text height. Images and captions never split across columns. Source and keyboard order proceed down each column; no client layout library, image measurement, or extra animation is needed. The photographs remain full-color and square-cornered. Each still opens its complete optimized image in a new tab.

Through 64rem (1024px at the default root size), the entire GitHub panel uses `display:none`, removing it from layout and the accessibility tree. The visual column’s top margin becomes zero. At 48rem, the introduction and work stack and Elsewhere uses three masonry columns. The intro order is name → biography (including streak panel and links) → minifigure, with a 2rem row gap. Its grid contains no activity track or reserved gap. The minifigure is capped to 42svh; the helmet is capped at 24rem. Every section retains the same symmetric gutter; photo groups and headings stay flush to that common rail. At 34rem, the Piñata grid becomes two columns, Morgan and Around the dot stack, and Elsewhere uses two masonry columns with .5rem gutters and 1rem between figures. Location labels wrap naturally without overflowing at 320px. Around the dot retains a tiny handwriting sideline. The page scrolls normally, without pinned sections or full-screen image panels.

## Elevation & Depth

Main-page content uses typography, spacing, authentic imagery, and the dark filmed backdrop for depth. There are no card shadows or parent shells around GitHub, work, or photographs. The Duolingo hairline panel is an explicit owner-requested exception. The retained gym utility’s low paper shadow remains scoped to that route.

**The Unboxed Page Rule.** Use typography, spacing, and imagery to group main-page content; do not surround work entries or photographs with panels. The owner-requested Duolingo streak panel is the boxed exception; GitHub’s calendar panel stays open and shadow-free.

## Shapes

Photographs and media keep square corners, zero frame, internal padding, and margin. The calendar has tiny softened cells (.8px radius) arranged on a seven-pixel grid. The Duolingo panel retains its gently curved shell (14px), flag clipping (5px), and circular avatar. Video artwork has no visible playback controls; the retained gym fields and actions stay square.

## Components

### Public GitHub activity

Quiet neutral data geometry sits directly on the page. The parent panel has no card shell, border, shadow, pill, divider ornament, or added motion. The GitHub heading and “past year” label sit .75rem above the calendar. The graph link retains a 44px minimum height; the single light-ink SVG places five-pixel cells on a seven-pixel grid. Its five opacity levels show genuine contribution intensity.

The panel uses AcastaPaloma’s complete public contribution year. Both the heading and calendar link to the profile. The calendar exposes a total when exact counts are available and a date/count title on every day. The shipped verified snapshot contains 368 real days and 924 contributions, covering October 5, 2025 through October 7, 2026; these are source data, not decorative specimen values. The heading underlines on hover and links retain the page’s visible keyboard focus treatment.

The entire panel is hidden through 64rem, with no mobile activity track or reserved gap. Initial activity remains server-rendered. The public contribution-calendar request is cached for 300 seconds. On larger displays, the client requests `/api/github` on mount and whenever the tab becomes visible; it skips refresh while the 64rem compact query matches and resumes when the viewport becomes wider. The route permits five minutes of shared caching and one hour of stale revalidation. An upstream failure retains the verified real calendar snapshot and displays “Saved activity” with its verification date, .7rem beneath the graph. A failed browser refresh retains the activity already visible. The API contains only username, calendar days, the calendar fallback flag, and saved verification date. Snapshot provenance lives in `lib/github-snapshot.json`.

### Duolingo streak panel

Above the profile links sits a Duolingo streak panel: the label “Current Streak”, the German flag, drawn unframed like every other image on the page and with its upper band set in the page's light ink, the day count in tabular figures, and the owner's Duolingo avatar as a circle on the right. It carries no link. The page server-renders the count so the panel never opens empty, then the client refetches /api/duolingo on mount and whenever the tab regains focus, so a lesson finished on the phone appears without a reload. A verified snapshot covers upstream outages. The panel is the owner-requested boxed exception; its shell stays a neutral hairline on the dark field, and below 34rem the flag, count, and avatar step down so the row never collides.

### Animated media and backdrop

The background uses the reference’s original six-second floral film, served as native H.264 video at 30 fps. The stored film and poster retain their blue source filenames and earlier hue treatment; CSS `grayscale(1) contrast(.96) brightness(1.16)` renders both in neutral gray. Desktop uses a 1600 × 1600 source; at the existing 48rem breakpoint the browser selects the 768 × 768 source. Cover framing, the neutral white wash, and the full-viewport inverted shade preserve the original floral texture in a black and charcoal field behind readable prose. Attribution and the final dark presentation are recorded in `public/background/source.json`; the original stored film remains unchanged.

The reference’s character vocabulary—space, `.`, `:`, `+`, `*`, `o`, `O`, and `#`—is drawn over the film on a transparent canvas at 30 fps. It retains the reference’s waves, drift, and eased cursor pull with neutral gray ink. The field uses a 22px grid and 13px monospace glyphs, stepping to an 18px grid and 12px glyphs below 720px; pixel density is capped at 1.5. The field supplies small background details, not a new display type style.

The fixed background pauses both video and glyph updates when the tab is hidden. Reduced-motion visitors see the grayscale-filtered static poster and static glyph field. Playback failure retains the same grayscale-filtered poster. The owner requested removal of every visible playback button; all videos now play automatically under these visibility and motion preferences. Print omits the background.

All dithering and particle shimmer are precomputed into video frames. TransparentLoop uses one small WebGL pass, requested only when a new video frame arrives. Dither subjects use a near-black matte; Morgan retains matching white and black Bloop renders packed into one video, but runtime always samples the black-background bottom half with opaque, unmasked RGB pixels. There are no inversion events or alternate poster prop. The browser does not run image dithering, 3D rendering, or background segmentation.

The minifigure, helmet, and Morgan globe use 384px mobile video variants. The helmet has an eight-second closed wind cycle at 12 fps: stronger gusts travel through the crest bristles above a fixed metal root, with local particle dropout, traveling glints, and slow density pulses. The main lateral wind amplitude is 27 source pixels, with smaller periodic harmonics. There is no rotation or whole-object drift. Morgan plays at 30 fps without a visible pause button, as requested. Ink uses the actual tool's four-fps export, cropped and played forward/reverse to close smoothly. None uses a full-frame strobe.

All subject animations pause offscreen and in hidden tabs; the fixed background pauses in hidden tabs. Reduced-motion visitors see still posters and static background details. No background or artwork playback buttons are shown. WebGL failure leaves the artwork posters; Morgan uses its one clean black-background poster. Full-color photos load lazily in optimized WebP, with 550px mobile sources and no EXIF or location metadata.

### Private Gym Log

- **States:** begin locked with the password form and live status text; show the production-setup panel when either access or database configuration is absent; show the two-column log only after a valid session and successful data load. “Lock log” clears the session and returns to the locked state.
- **Entry and history:** seed a practical editable bench suggestion (`185 lb × 5 × 5`), provide native date/number fields and a suggested-exercise datalist, then prepend a successful save to the recent-work list. Status copy is live-region feedback, not a toast layer.
- **Access boundary:** `/api/gym/session` is the password/session boundary. `GYM_ADMIN_PASSWORD` is compared server-side in constant time; successful authentication creates a signed, HTTP-only, strict-same-site `portfolio_gym_session` cookie valid for 30 days. Failed attempts are throttled in-process after five attempts in ten minutes. Never expose either gym secret to client code.
- **Data boundary:** `/api/gym/logs` permits GET and POST only with that session. Supabase is accessed server-side with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; browser roles have no `gym_workouts` table access. The production setup also requires `GYM_SESSION_SECRET` and the included `supabase/gym-workouts.sql` schema (validated date, exercise, weight, reps, and sets, newest-first history). A `503` means configuration is absent, not that there are no workouts.


Its square native fields, ink-filled primary actions, hover inversion, visible focus outlines, live status feedback, and low paper shadow remain scoped to `/gym`. The main-page floral background does not mount on that route.

## Do's and Don'ts

### Do:

- **Do** follow the pinned dark grayscale floral film, Georgia, full-color photographs, and colored-diamond direction on the main route.
- **Do** let the animated minifigure and compact introduction share the opening.
- **Do** preserve authentic photo content, focal points, uncropped image access, and provenance in PHOTO-SOURCES.md and ANIMATION-SOURCES.md.
- **Do** precompute image effects and serve the mobile image variants at the documented breakpoint.
- **Do** keep work and gallery content unboxed and normally scrollable, with People in tight bentos and Elsewhere in natural-proportion masonry with location captions.
- **Do** preserve visible keyboard focus on links and functional controls.
- **Do** retain résumé access, the opening calendar invitation, and the existing private gym utility as separate functions.
- **Do** retain the original film, grayscale treatment, white wash, neutral glyphs, and fixed full-viewport dark shade, with solid light foreground ink.
- **Do** keep the open GitHub panel above the desktop figure with one authentic neutral full-year calendar, profile links, day labels, 300-second caching, and a dated verified fallback.
- **Do** hide the entire GitHub panel through 64rem, omit its mobile grid track, skip client refresh while compact, and resume refresh when the viewport becomes wide.
- **Do** retain automatic offscreen and hidden-tab pausing and reduced-motion stills, without visible playback buttons.

### Don't:

- **Don't** restore the suspended slab, beige void, paper-note panels, or stage dock to the redesigned main page.
- **Don't** turn the photograph colors into decorative UI accents or a fixed rainbow palette.
- **Don't** add rounded photo cards, shadows, badges, or ornamental navigation to the main route.
- **Don't** surround GitHub with a card shell or change its neutral graph to a decorative accent color.
- **Don't** add theme switches, a movable color boundary, or alternate light-side tints to the dark background.
- **Don't** render photo dithering in a runtime canvas or shader.
- **Don't** copy the reference site’s personal photographs, videos, or text.
- **Don't** apply main-page styling to the retained gym utility without a separate scoped change.
