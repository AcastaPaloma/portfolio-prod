---
name: Kuan Yi Wang — Words, Photographs, and Dots
description: "A minimal personal page with Georgia type, colored diamond halftones, and a draggable inversion boundary."
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
  caption:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "0.73rem"
    lineHeight: "1.4"
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
  caption-top: "0.65rem"
  link-gap: "1.4rem"
  work-row: "1.5rem"
  mobile-gallery-gap: "3rem"
components:
  text-link:
    textColor: "{colors.ink}"
  caption:
    textColor: "{colors.quiet-ink}"
    typography: "{typography.caption}"
    padding: "0.65rem 0 0"
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

## Overview

**Creative North Star: "Words, Photographs, and Dots"**

A personal page reduced to words, photographs, and dots. The main route uses white space, black Georgia type, compact personal writing, and large colored halftone photographs. Work and camera-roll moments appear as an unboxed sequence; the images provide the visual expression while the interface recedes.

The current main-page authority is the user-pinned Lance Yan direction recorded in the layout contract `2020df78-user-pinned-lance-dither`: white, black, Georgia, colored diamond halftones, one scrolling page, and a vertical inversion boundary dragged horizontally. This replaces the former suspended-résumé visual world on `/`. The inherited PRODUCT.md describes that earlier concept and is historical context for this route; the supplied résumé remains an available document, not the page’s visual shell. The existing `/gym` route remains a separate beige paper utility, with its scoped guidance retained below.

**Key Characteristics:**

- Compact introduction beside a large camera-roll photograph.
- Georgia throughout, with regular body text and quiet underlined links.
- Black and white interface; color arrives through the photographs.
- Luminance-sized colored diamond dots baked into image assets.
- Unboxed work entries and a loose, staggered photo gallery.
- One vertical boundary dragged horizontally to invert the viewport.
- Responsive photo assets, normal mobile scrolling, and no runtime Canvas.

## Colors

The main interface is neutral. Its photographic colors are sampled from personal images rather than promoted to a fixed accent palette.

### Neutral

- **Paper:** the default page and inversion overlay, also the small handle and hint backing.
- **Ink:** main-page text and links.
- **Quiet Ink:** project descriptions, photo captions, and small footer copy.
- **Link Rule:** understated one-pixel underlines that become current text color on hover.
- **Boundary Line:** the thin full-height marker of the split.
- **Boundary Rule:** the grip’s fine outline.
- **Boundary Ink:** the grip glyph and its focus ring.

The `gym-*` frontmatter tokens belong exclusively to the retained utility: beige atmosphere, brown-black text, quiet labels, near-white panel, and fine paper rule. Do not apply them to the redesigned main page.

**The Photograph Color Rule.** Keep page chrome neutral; retain sampled image color in the diamond halftones rather than adding decorative interface accents.

**The Inversion Rule.** A white overlay with `mix-blend-mode: difference` inverts the portion to the right of the boundary, including text and images together. Preserve this continuous spatial effect instead of substituting a theme toggle.

## Typography

**Display Font:** Georgia, "Times New Roman", serif
**Body Font:** Georgia, "Times New Roman", serif

**Character:** Familiar serif typography makes the writing personal and immediate. The name is modestly larger than the body; the photograph supplies scale. There is no oversized marketing slogan or separate decorative display face.

### Hierarchy

- **Name** (600, 2.2rem, 1.15 line-height): a compact identity heading with tight tracking.
- **Section heading** (400, 1.3rem, 1.25 line-height): “A few things I’ve built.” and “Elsewhere.”
- **Body** (regular, 17px, 1.55 line-height): short personal paragraphs, with the introduction limited to a 29rem column.
- **Links and work descriptions** (regular, 0.85rem): quiet navigation and secondary project detail.
- **Photo caption** (regular, 0.73rem, 1.4 line-height): a short title or moment and date directly below each photograph.
- **Boundary hint** (regular, 0.7rem): vertical “drag to invert” text.
- **Mobile body and name** (16px and 2rem): a small reduction at 48rem and below, preserving the same type family and hierarchy.

**The Quiet Name Rule.** Keep the name and prose compact so a large personal photograph can lead the first viewport.

## Layout

The main route is a single normally scrolling page. At desktop widths, the first section fills at least 100svh with columns of 1.2:1: compact copy at left and the portrait dusk photograph at right. The text column is min(100% - 5rem, 29rem), vertically centered with 6rem padding above and below. The hero preserves its full aspect and stays within 85svh rather than cover-cropping.

The work section is an unboxed two-column composition, min(100% - 5rem, 66rem), with an 8rem gap: a simple project list and a larger supplied LEGO photograph. The gallery widens to 72rem, with two equal columns, 5rem row gaps, 6rem column gaps, and a 7rem downward offset on even figures. Varied image proportions and the offset produce the rhythm; no tile backgrounds or card outlines are needed. The footer is a compact invitation and a small note after generous space.

At 48rem and below, the introduction, work section, and gallery become single-column sequences. Copy precedes the hero; work copy precedes its image. The gallery removes its stagger and uses a 3rem gap. The right margin allows room for the inversion control; the mobile introduction uses 1.5rem left padding and 3.1rem right padding. Primary profile links have a 44px minimum height. The hero stays within 75svh and remains fully visible. Every photograph selects a 600px-wide `-small.webp` variant through a responsive picture source.

### Retained Gym Utility

`/gym` keeps its existing full-page beige surround and one near-white panel up to 68rem wide. Its “Training log” label, large “The work, counted.” heading, return link, unlock/setup states, and form/history layout remain a utility surface. At narrower widths, the form/history columns stack and unlock controls become full width. This is a scoped exception to the main page’s unboxed composition, not a reusable card system for `/`.

## Elevation & Depth

The main page is flat and has no content-card shadows. Depth comes from photo scale, alternating proportions, and generous white space. The inversion overlay is a fixed blend layer, not an elevated panel; its narrow line and circular grip identify a movable boundary. The retained gym panel alone uses the existing low warm paper shadow (0 1.25rem 3rem rgb(54 47 40 / 10%)).

**The Unboxed Page Rule.** Use typography, spacing, and imagery to group main-page content; do not surround work entries or photographs with panels.

## Shapes

Photos are ordinary square-cornered rectangles at their source aspect ratios. The repeating image mark is a diamond whose size follows sampled luminance. The sole circular shape in the main-page interface is the 44px inversion grip. The one-pixel boundary spans the viewport vertically, and its 44px interaction strip stays reachable even at either edge. Gym inputs and actions retain their existing square corners and thin rules.

## Components

### Text Links and Profile Navigation

Links inherit text color, use a one-pixel underline with a 0.2em offset, and strengthen their underline on hover. Keyboard focus is a one-pixel current-color outline offset by 5px. The “résumé”, “linkedin”, and “email” navigation is a wrapping inline row with no ornamental navigation shell. Keep actual project links and the original résumé PDF accessible.

### Work Entries

A plain list presents project names followed by small gray descriptions. Entries use a 1.5rem separation, with no bullets, cards, badges, or additional controls. The built linked quantum project retains its link; the other project names remain plain text. Do not imply interactions on unlinked entries.

### Captioned Camera-Roll Photos

Use personal imagery documented in PHOTO-SOURCES.md. The lead dusk street photograph is eager-loaded with high fetch priority; all later photos load lazily, and gallery images decode asynchronously. Captions remain short and factual, beneath the image with 0.65rem top padding. Preserve the supplied image descriptions for assistive technology.

The assets come from selected personal iPhone photographs plus the existing supplied LEGO image. PHOTO-SOURCES.md records the broad thumbnail survey and chosen originals; it does not claim that every photo was individually reviewed. The web assets have EXIF and precise-location metadata stripped. Resized `-original.webp` files support regeneration and are not loaded by the page. The reference informs the rendering direction; its photographs, videos, and text are not used.

### Colored Diamond Halftones

The build-time image script samples each source into 180 columns, with a six-pixel cell and dot radius proportional to the square root of density (one minus luminance). Very light samples below a 0.055 density threshold drop out; opacity is quantized into sixteenths. Source color receives the implemented 1.8 saturation adjustment and restrained quantization before paths are rendered to a white-backed WebP. The result preserves color and scene recognition while making the diamond texture legible.

Generate the effect before serving the page. Full assets are lossless WebP; 600px mobile variants are separate optimized WebP files. No canvas, WebGL shader, animation loop, or per-frame image processing belongs in the browser for these photographs.

### Color Inversion Boundary

The control is a fixed vertical line with a 44px circular grip and the hint “drag to invert”. It starts at 100%, leaving the page in its normal white state. Dragging horizontally reveals inversion to the right. The control keeps a 44px-wide pointer area, uses pointer capture, and schedules movement through requestAnimationFrame; release updates the announced value. The blend overlay ignores pointer events so underlying links still work.

The control has horizontal slider semantics, a descriptive accessible name, and a text value reporting the percentage inverted. Arrow keys move two percentage points, Page keys ten, and Home/End go to the limits. Its focused grip has a two-pixel outline offset by 4px. Keep the handle reachable with its center clamped 22px from either edge. There is no autonomous animation; the effect follows deliberate user input. Both the control and inversion overlay disappear when printing.

### Footer Invitation

Use the single external invitation “join me for a workout. or a coffee.” with “Photos, reduced to dots.” as subordinate text. The destination comes from `NEXT_PUBLIC_CAL_COM_URL` with `https://cal.com` as fallback; retain the external-link target and referrer attributes. Keep the footer unboxed.

### Private Gym Log

- **States:** begin locked with the password form and live status text; show the production-setup panel when either access or database configuration is absent; show the two-column log only after a valid session and successful data load. “Lock log” clears the session and returns to the locked state.
- **Entry and history:** seed a practical editable bench suggestion (`185 lb × 5 × 5`), provide native date/number fields and a suggested-exercise datalist, then prepend a successful save to the recent-work list. Status copy is live-region feedback, not a toast layer.
- **Access boundary:** `/api/gym/session` is the password/session boundary. `GYM_ADMIN_PASSWORD` is compared server-side in constant time; successful authentication creates a signed, HTTP-only, strict-same-site `portfolio_gym_session` cookie valid for 30 days. Failed attempts are throttled in-process after five attempts in ten minutes. Never expose either gym secret to client code.
- **Data boundary:** `/api/gym/logs` permits GET and POST only with that session. Supabase is accessed server-side with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; browser roles have no `gym_workouts` table access. The production setup also requires `GYM_SESSION_SECRET` and the included `supabase/gym-workouts.sql` schema (validated date, exercise, weight, reps, and sets, newest-first history). A `503` means configuration is absent, not that there are no workouts.


Its square native fields, ink-filled primary actions, hover inversion, visible focus outlines, live status feedback, and low paper shadow remain scoped to `/gym`. Main-page inversion controls do not mount on that route.

## Do's and Don'ts

### Do:

- **Do** follow the pinned white, black, Georgia, colored-diamond direction on the main route.
- **Do** let the large personal photograph and compact introduction share the opening.
- **Do** preserve authentic photo content, captions, aspect ratios, and provenance.
- **Do** precompute image effects and serve the mobile image variants at the documented breakpoint.
- **Do** keep work and gallery content unboxed and normally scrollable.
- **Do** preserve the inversion boundary’s keyboard support, focus visibility, and 44px grip.
- **Do** retain résumé access and the existing private gym utility as separate functions.

### Don't:

- **Don't** restore the suspended slab, beige void, paper-note panels, or stage dock to the redesigned main page.
- **Don't** turn the photograph colors into decorative UI accents or a fixed rainbow palette.
- **Don't** add rounded photo cards, shadows, badges, or ornamental navigation to the main route.
- **Don't** replace the continuous inversion boundary with a theme toggle or autonomous animation.
- **Don't** render photo dithering in a runtime canvas or shader.
- **Don't** copy the reference site’s personal photographs, videos, or text.
- **Don't** apply main-page styling to the retained gym utility without a separate scoped change.
