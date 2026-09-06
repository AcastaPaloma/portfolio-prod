---
name: Kuan Yi Wang — Words, Photographs, and Dots
description: "A minimal personal page with full-color photo bentos, two dithered subjects, and a draggable light/dark boundary."
colors:
  paper: "#fff"
  ink: "#202020"
  quiet-ink: "#666"
  link-rule: "#969696"
  boundary-line: "#858585"
  boundary-rule: "#656565"
  boundary-ink: "#222"
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
  link-label:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "0.85rem"
    lineHeight: "1.55"
rounded:
  image: "0"
  boundary-grip: "50%"
  gym-field: "0"
spacing:
  paragraph: "1.35rem"
  link-gap: "1.4rem"
  work-row: "1.5rem"
  photo-gap: "4px"
components:
  text-link:
    textColor: "{colors.ink}"
  boundary-grip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.boundary-ink}"
    rounded: "{rounded.boundary-grip}"
    size: "44px"
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

## Direction

One compact personal page: Georgia prose, full-color photographs, and two animated dither subjects. The user's September 6 revision supersedes the earlier all-dither gallery. Only the minifigure and Agamemnon helmet receive the particle/dither treatment. The roaming piñata is removed. The supplied Morgan globe is a full-color video with a transparent background and no visible playback control. Arnold Francisca's Ink export supplies a small handwritten accent beside Around the dot.

The page begins in black. Compact identity copy, including current computer vision inference work at Reflex, and the minifigure share the opening; work follows beside the quiet particle helmet. People contains Piñata Pitch, Morgan Stanley, and Around the dot. Elsewhere preserves the earlier camera-roll selection. The calendar invitation belongs in the opening links, alongside résumé, LinkedIn, and email.

The inherited PRODUCT.md and résumé scene describe the earlier route. The alternate branch's current main-page authority is the user's minimal Lance-inspired direction and subsequent refinements. The existing /gym utility stays separate.

## Color and layering

- The neutral page is white to the left of the dragged boundary and black to its right.
- Text uses viewport-aligned dark/light gradients clipped to glyphs. Horizontal offsets are measured on mount and resize; dragging updates one CSS variable. This avoids dependence on fixed background attachment on mobile Safari.
- Photographs and normal video have no color filters or inversion. Their full-color pixels remain unchanged across the slider.
- The minifigure has transparent negative space and retains its source colors.
- The white particle helmet and white Ink handwriting use difference blending against the page, becoming dark on white and light on black.
- Text has a higher layer than animated artwork. Media has zero frame, border radius, internal padding, and margin.

## Type and links

Georgia body copy is 17px with 1.55 line height; the name is 2.2rem and section headings 1.3rem. At 48rem, body and name become 16px and 2rem. Work descriptions and profile links use .85rem. There are no image captions or subtitles.

Every underlined text link has a small preceding icon. Brand marks come from the organizations' official assets or the user's Piñata Pitch logo. Other symbols are simple authored SVGs. Profile organization links keep the icon with the first word; longer names wrap naturally. The opening uses a 31rem measure and pretty paragraph wrapping. All links retain visible keyboard focus. The top invitation reads: “join me for a workout. or a coffee.”

## Layout and spacing

The intro, work, People, and Elsewhere all share one centered 60rem maximum-width rail with symmetric 2.75–3rem gutters. Headings, prose, links, and image groups share its left edge. The first section uses a 1.2:1 copy/art split with a 3rem gap and content-driven height. Work occupies about 26rem, with the helmet aligned to the rail’s right edge. Avoid independent section widths, asymmetric mobile padding, or viewport-height gaps before work.

Bento groups use four-pixel seams, square corners, and no card shells. Piñata Pitch uses three columns: tall event screen, selfie above the audience, tall physical piñata. Morgan's square globe and the two Around the dot photos share a desktop row. Their headings align. Elsewhere pairs portrait slots with wider landscape slots. Image proportions and focal positions preserve people; each photo opens its uncropped optimized image in a new tab.

At 48rem, the introduction and work stack. The minifigure is capped to 42svh; the helmet is capped at 24rem. Every section retains the same symmetric gutter; photo groups and headings stay flush to that common rail. At 34rem, the Piñata grid becomes two columns, Morgan and Around the dot stack, and the six Elsewhere images become four compact rows. Around the dot retains a tiny handwriting sideline. The page scrolls normally, without pinned sections or full-screen image panels.

## Motion and performance

All dithering and particle shimmer are precomputed into video frames. TransparentLoop uses one small WebGL pass, requested only when a new video frame arrives. Dither subjects use a near-black matte; Morgan uses a separately prepared alpha mask packed beneath its original RGB frames. The browser does not run image dithering, 3D rendering, or background segmentation.

The minifigure, helmet, and Morgan globe use 384px mobile video variants. The helmet has an eight-second closed wind cycle at 12 fps: crest bristles sway above a fixed metal root, with local particle dropout, traveling glints, and slow density pulses. There is no rotation or whole-object drift. Morgan plays at 24 fps without a visible pause button, as requested. Ink uses the actual tool's four-fps export, cropped and played forward/reverse to close smoothly. None uses a full-frame strobe.

All animations pause offscreen and in hidden tabs. Reduced-motion visitors see still posters; artwork with controls can be played explicitly. WebGL failure leaves a transparent poster. Full-color photos load lazily in optimized WebP, with 550px mobile sources and no EXIF or location metadata.

## Inversion control

The boundary is a one-pixel vertical line, with a 44px grip and interaction strip. It starts at 0% and follows pointer input through requestAnimationFrame. Arrow keys move two points, Page keys ten, Home/End reach the limits. Its announced value distinguishes photo colors from the inverted text/helmet/handwriting. The grip remains reachable 22px from either edge. Print removes the controls.

## Retained utility

### Private Gym Log

- **States:** begin locked with the password form and live status text; show the production-setup panel when either access or database configuration is absent; show the two-column log only after a valid session and successful data load. “Lock log” clears the session and returns to the locked state.
- **Entry and history:** seed a practical editable bench suggestion (`185 lb × 5 × 5`), provide native date/number fields and a suggested-exercise datalist, then prepend a successful save to the recent-work list. Status copy is live-region feedback, not a toast layer.
- **Access boundary:** `/api/gym/session` is the password/session boundary. `GYM_ADMIN_PASSWORD` is compared server-side in constant time; successful authentication creates a signed, HTTP-only, strict-same-site `portfolio_gym_session` cookie valid for 30 days. Failed attempts are throttled in-process after five attempts in ten minutes. Never expose either gym secret to client code.
- **Data boundary:** `/api/gym/logs` permits GET and POST only with that session. Supabase is accessed server-side with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; browser roles have no `gym_workouts` table access. The production setup also requires `GYM_SESSION_SECRET` and the included `supabase/gym-workouts.sql` schema (validated date, exercise, weight, reps, and sets, newest-first history). A `503` means configuration is absent, not that there are no workouts.


Its square native fields, ink-filled primary actions, hover inversion, visible focus outlines, live status feedback, and low paper shadow remain scoped to `/gym`. Main-page inversion controls do not mount on that route.


## Working rules

- Preserve the compact, unboxed serif identity and authentic personal media.
- Keep photos and the Morgan video in full color. Dither only the minifigure and helmet.
- Keep the calendar invitation in the opening.
- Use tight bento seams with no image captions, frames, or internal padding.
- Keep text readable over motion, retain artwork pause controls and reduced-motion behavior, and precompute expensive image work.
- Record media provenance in PHOTO-SOURCES.md and ANIMATION-SOURCES.md.
