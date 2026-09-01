---
name: Kuan Yi Wang Portfolio
description: "An interactive vector resume displayed as a suspended white document slab."
colors:
  void: "#d8d0c3"
  ink: "#28231f"
  quiet-ink: "#5b5147"
  line: "rgb(47 41 35 / 22%)"
  slab-white: "#fff"
  slab-surface: "#fbfbf9"
  slab-edge: "#8f8e89"
  card-surface: "rgb(255 255 255 / 94%)"
  card-border: "rgb(47 41 35 / 25%)"
  detail-ink: "#332d27"
  mobile-void: "#181817"
typography:
  body:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "0.73rem"
    fontStyle: "italic"
    lineHeight: "1.2"
rounded:
  slab: "0.025 scene units"
spacing:
  rail-gap: "1rem"
  rail-bottom: "1.35rem"
components:
  control-rail:
    textColor: "{colors.quiet-ink}"
    padding: "1.1rem 0 1.35rem"
  resume-slab:
    backgroundColor: "{colors.slab-surface}"
    rounded: "{rounded.slab}"
  technical-card:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.ink}"
    padding: "0.46rem"
  gym-surface:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.ink}"
    padding: "clamp(1.15rem, 3vw, 2.6rem)"
---

# Design System: Kuan Yi Wang Portfolio

## Overview

**Creative North Star: "The Suspended White Resume"**

This is an Experience-mode portfolio rather than a conventional portfolio page. The resume is both content and interface: the supplied document is an outlined SVG on a thin, clean white slab that moves through authored scroll viewpoints inside a beige void. The shell stays deliberately quiet so the document, its physical edge, and each close reading position own the composition.

The visual system rejects decorative portfolio filler, visible floors, and material texture. The supplied PDF controls the resume's styling; the SVG conversion preserves that styling as scalable vector paths rather than a sampled image.

**Key Characteristics:**

- One floating document object in open space.
- Crisp vector resume face with no visual re-typesetting.
- Restrained overhead light, outline, and suspended shadow.
- A slow, vector-aligned highlighter sequence paired with an image-to-dither detail card.
- A minimal scroll cue and direct PDF escape hatch.
- A four-note technical stage that feels like personal field notes, not a dashboard.
- A private gym log that carries the same restrained document language into an authenticated utility.

## Colors

The palette is warm, quiet, and nearly monochrome: beige atmosphere around a white object, with brown-black typography and only a fine gray edge.

### Neutral

- **Open Void** (`#d8d0c3`): the page and Canvas background; there is no floor plane.
- **Document White** (`#fff`): the vector document's DOM backing surface.
- **Slab White** (`#fbfbf9`): the physical material of the thin 3D slab.
- **Fine Edge** (`#8f8e89`): the low-opacity geometric outline of the slab.
- **Primary Ink** (`#28231f`): body color, link hover, and focus treatment.
- **Quiet Ink** (`#5b5147`): the default control rail copy.
- **Hairline** (`rgb(47 41 35 / 22%)`): the PDF link underline at rest.
- **Paper Card** (`rgb(255 255 255 / 94%)`): technical-note cards and the gym-log shell; nearly opaque so they read as placed paper, not glass.
- **Card Rule** (`rgb(47 41 35 / 25%)`): the fine perimeter around the technical cards and gym surface.
- **Detail Ink** (`#332d27`): compact explanatory copy and data labels.
- **Mobile Night** (`#181817`): the narrow-screen portfolio field behind the résumé and note grid.

**The One-Object Rule.** White belongs to the document object; the surrounding page remains a single uninterrupted beige field.

## Typography

**Body Font:** Georgia, "Times New Roman", serif

**Character:** The site shell is small, literary, and quiet. The resume face itself is supplied vector artwork and must never be recreated or reflowed by the shell.

### Hierarchy

- **Control label** (italic, `0.73rem`, `1.2` line-height): the lower rail's directional cue and PDF action.
- **Mobile control label** (italic, `0.68rem`): compact equivalent below `42rem`.
- **Fallback copy** (italic, `0.9rem`, `1.5` line-height): WebGL failure state.
- **Technical card title** (semibold, `0.76rem`, `1.12` line-height): concise titles within the four-card cluster.
- **Technical caption and data** (italic, `0.49–0.66rem`): supporting note, calendar labels, chart axis, and compact links.
- **Gym display** (regular, `clamp(2.4rem, 7vw, 5.75rem)`, `0.85` line-height): “The work, counted.” is the utility surface’s only large gesture; form and history type remains small, serif, and direct.

## Layout

The viewport is a full-height (`100dvh`) sticky stage with hidden overflow. The Canvas fills it; the lower control rail sits above it on z-index 1, spans `min(100% - 3rem, 72rem)`, and accepts no pointer input except the PDF link. On medium and large screens, scroll moves the camera from the name-and-education view to a close technical-skills composition, leaving the left side open for a detail card. The 3D slab scales down from its desktop scene size to fit the horizontal viewport while preserving its 612 × 792 resume aspect.

On screens below `42rem`, the rail uses a `calc(100% - 2rem)` width, hides the keyboard cue, and shows the touch cue. The document remains the only visual focal point.

### Technical Stage and Mobile Notes

At desktop widths (`48rem` and above), the second of four authored stages exposes a compact, asymmetrical two-by-two technical-card cluster (`min(36vw, 34rem)`) confined to the left of the existing 3D résumé. The visual order is fixed: **Duolingo** at top left, **Circa 2026** at top right, **Load, over time** at bottom left, and **Find a workout** at bottom right. The square owl and 3:4 friends image use 4:3 column proportions so they share a visual height without stretching or cover-cropping. Cards are close-set and compact, with a subtle paper border, no rounded corners, and a short reveal sequence; no separate DOM résumé overlay belongs in this stage.

Below `48rem`, there is no cinematic stage, WebGL scene, or private-gym data fetch for this cluster. The portfolio becomes a dark, ordinary scrolling page: the résumé preview is followed by the same four cards in the same reading order in a two-column grid. The Duolingo card still uses its public server route; the chart and calendar use safe illustrative/private-data-free fallbacks. Preserve the card minimum heights (`14rem`; chart `16rem`; calendar `8rem`).

### Private Gym Route

`/gym` is a conventional, full-page utility surface, not part of the stage navigator. A warm void frames one broad white panel (`min(100%, 68rem)`); its header pairs the small “Training log” label with the oversized “The work, counted.” and a return-to-résumé link. The ready state uses a two-column composition—entry form first, recent history second—then collapses to one column below `48rem`; the entry form reduces from three fields across to two, while the unlock control becomes vertically stacked and full-width.

## Elevation & Depth

Depth is physical and sparse. A rounded Three.js slab has a `0.075` scene-unit depth with a subtle edge and a white physical material (`roughness: 0.31`, `clearcoat: 0.18`). A separate blurred canvas texture, shifted down and right behind the object, provides the soft suspended shadow at `46%` opacity. Ambient plus overhead directional light creates the form; no floor is introduced.

The technical cluster and gym surface translate that restraint into 2D paper: a single fine rule and a low, warm shadow (`0 0.75rem 1.8rem rgb(54 47 40 / 7%)` for cards; `0 1.25rem 3rem rgb(54 47 40 / 10%)` for the gym panel). They should never become elevated product-dashboard tiles.

**The Suspension Rule.** Keep the shadow diffuse and offset as an atmospheric projection, never as evidence of a ground plane.

## Shapes

The signature silhouette is a thin rounded rectangular document tablet: `3.18 × 4.12 × 0.075` scene units, with `0.025` corner radius and five-segment smoothing. Its fine edge is visible but never decorative. The resume is a `612 × 792` SVG object positioned just above the front face; it is a scalable vector DOM surface, not a WebGL raster texture.

Technical cards, chart controls, fields, and gym actions are deliberately square (`border-radius: 0`), with one-pixel brown rules. The ordinary rectangle is the point: these are annotations and records pinned beside the résumé, not a separate branded application.

## Components

### Resume Slab

- **Material:** clean white physical surface; do not add marble, veins, paper grain, or image texture.
- **Face:** embed `/resume/kuan-yi-wang-resume.svg` as an SVG object so browser zoom retains the supplied resume's vector detail.
- **Motion:** scroll owns the viewpoint; no drag, swipe, keyboard rotation, pan, or roll is available. At the technical-skills view, a four-stroke yellow paint overlay draws onto the vector face over a few seconds while the side card resolves from procedural dither noise into an image dither. Respect reduced-motion preferences.

### Control Rail

- **Shape:** unboxed, no card, no filled button; only a hairline underline on the PDF link.
- **Behavior:** pointer events pass through except at the PDF action; focus uses a two-pixel ink outline.
- **Copy:** a brief scroll cue plus "Open PDF" as the conventional document path.

### Technical Stage: Four-Card Cluster

- **Visual language:** near-white paper panels with small serif titles, italic captions, thin brown rules, tightly cropped image fragments, and only a quiet warm shadow. Treat the collection as personal evidence around the résumé, not as portfolio navigation.
- **Order and content:** (1) **Duolingo** shows the current day-streak and “The owl is watching”; (2) **Circa 2026** pairs the friends image with “Trolling with friends”; (3) **Load, over time** offers an exercise picker, SVG working-load line, and `/gym` escape hatch; (4) **Find a workout** is a whole-card external Cal.com link with a current-month calendar and the Waterloo invitation.
- **Interactions:** the training picker alone changes its plotted series; its selected state inverts to ink with white type. The calendar card remains a single link and gains only a rule/background clarification on hover. Focus is a two-pixel ink outline offset by three pixels. Respect reduced motion by making card and résumé reveals immediate.
- **Public data truth:** the Duolingo card starts at a clearly coded fallback of `1,223`, then requests `/api/duolingo`. That server route is the only Duolingo boundary: it requests `coini2`’s username, picture, and streak from Duolingo, revalidates upstream hourly, caches a successful response for one hour (with one-day stale serving), and returns the fallback value if upstream data is unavailable. Do not move this fetch into the browser or present an unverified number as a live reading.
- **Gym preview truth:** when an authenticated `/api/gym/logs` request yields at least two matching sets, the chart uses those dated working weights and labels them “logged”; otherwise it deliberately renders the documented estimated series. Only authenticated workout data marks days in the desktop calendar. The mobile technical grid intentionally passes no workout data, so it shows estimates and unmarked days rather than attempting private access.
- **Booking boundary:** the card destination comes only from `NEXT_PUBLIC_CAL_COM_URL`; its explicit fallback is `https://cal.com`. Keep the target external (`target="_blank"`, `rel="noreferrer"`) and do not hard-code a personal booking route into the component.

### Private Gym Log

- **States:** begin locked with the password form and live status text; show the production-setup panel when either access or database configuration is absent; show the two-column log only after a valid session and successful data load. “Lock log” clears the session and returns to the locked state.
- **Entry and history:** seed a practical editable bench suggestion (`185 lb × 5 × 5`), provide native date/number fields and a suggested-exercise datalist, then prepend a successful save to the recent-work list. Status copy is live-region feedback, not a toast layer.
- **Access boundary:** `/api/gym/session` is the password/session boundary. `GYM_ADMIN_PASSWORD` is compared server-side in constant time; successful authentication creates a signed, HTTP-only, strict-same-site `portfolio_gym_session` cookie valid for 30 days. Failed attempts are throttled in-process after five attempts in ten minutes. Never expose either gym secret to client code.
- **Data boundary:** `/api/gym/logs` permits GET and POST only with that session. Supabase is accessed server-side with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; browser roles have no `gym_workouts` table access. The production setup also requires `GYM_SESSION_SECRET` and the included `supabase/gym-workouts.sql` schema (validated date, exercise, weight, reps, and sets, newest-first history). A `503` means configuration is absent, not that there are no workouts.

### Fallback

- **Behavior:** when WebGL cannot load, center a single italic message and the original PDF link on the same beige void.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied PDF as the content and styling source of truth.
- **Do** use the outlined SVG resume face to keep browser zoom sharp.
- **Do** retain the white slab, fine outline, overhead light, and diffuse floating shadow as one spatial system.
- **Do** keep reduced-motion and PDF fallback access intact.
- **Do** retain the four technical cards as a fixed, personally specific sequence; the visual hierarchy should stay secondary to the résumé.
- **Do** distinguish estimated gym progress from authenticated, logged data in copy and accessible chart labels.
- **Do** keep live data and personal service URLs behind their documented server or environment boundaries.

### Don't:

- **Don't** add marble, veins, grain, or a rasterized resume texture.
- **Don't** place a floor, pedestal, navigation chrome, or promotional portfolio filler around the object.
- **Don't** retype, reflow, crop, or independently style the resume contents.
- **Don't** turn the technical cluster into generic dashboard widgets, rounded cards, or a data-rich public fitness feed.
- **Don't** let unauthenticated or unavailable gym data create claimed workout history, chart values, or calendar marks.
