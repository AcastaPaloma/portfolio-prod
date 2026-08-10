---
name: Layered Paper Cut
description: A bright personal portfolio assembled as an unfolding field board.
colors:
  ink: "#14233d"
  paper: "#f7f6ee"
  cobalt: "#4273df"
  cobalt-pale: "#dbe8ff"
  citron: "#e5ef58"
  orange: "#ff8a54"
typography:
  display:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(62px, 10vw, 150px)"
    fontWeight: 400
    lineHeight: 0.76
    letterSpacing: "-0.08em"
  body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    lineHeight: 1.65
  annotation:
    fontFamily: "HW4, JetBrains Mono, cursive"
rounded:
  paper: "13px"
spacing:
  edge: "4.5vw"
  section: "clamp(92px, 13vw, 180px)"
components:
  paper-record:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "31px 35px"
---

# Design System: Layered Paper Cut

## Overview

**Creative North Star: "The unfolding field board"**

White stock, cobalt, citron, and orange act as real cut sheets, not as interface accents. A single layered composition physically opens with scroll; records and projects continue the cut-paper grammar.

## Colors

Navy anchors all copy. Cobalt and pale cobalt handle research and structure; citron is the optimistic live layer; orange is the small diagnostic counterpoint.

## Typography

JetBrains Mono does the information work. HW4 only annotates from the side of a section grid, never as a heading label.

## Layout

The hero is a 0.85/1.15 copy-to-composition split. Major headings use a 30% annotation column. Work records stack with intentional small rotations; projects become three folded sheets and collapse to one column below 780px.

## Elevation & Depth

Offset, soft cast shadows (`10px 12px 0 rgba(20,35,61,.16)`) are structural paper depth, not generic card elevation. Use them only on literal paper pieces.

## Shapes

Paper records use 13px corners; the project sheets use a clipped folded corner. The hero is composed of crisp geometric cut layers.

## Components

### Paper record

Records are large sheets with a date edge, a compact numeric tab, and one role statement. Their alternating color and small rotation create the stack.

### Project fold

Projects are clipped sheets with a folded-corner void and a fixed bottom link.

### Paper assembly

The llama, MRI slice, orbital lines, club, and ball are independently positioned paper layers keyed to scroll progress and exposed through `data-weave-slot`.

## Do's and Don'ts

- **Do** use saturated color as a physical paper layer with a visible reason.
- **Do** keep movement to the single paper assembly.
- **Don't** add neutral utility cards beside the cut sheets.
- **Don't** use handwriting as an eyebrow above a heading.
