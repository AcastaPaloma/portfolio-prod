---
name: Pale Specimen Ledger
description: A text-led portfolio recorded as a moving field ledger.
colors:
  paper: "#f4f4ee"
  ink: "#20241f"
  muted: "#696c65"
  rule: "#b8bab0"
  moss: "#55634a"
typography:
  display:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(67px, 10.3vw, 156px)"
    fontWeight: 400
    lineHeight: 0.78
    letterSpacing: "-0.075em"
  body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    lineHeight: 1.65
  annotation:
    fontFamily: "HW4, JetBrains Mono, cursive"
rounded:
  pixel: "1px"
spacing:
  edge: "4vw"
  section: "clamp(90px, 13vw, 190px)"
components:
  text-link:
    textColor: "{colors.ink}"
    padding: "0 0 6px"
---

# Design System: Pale Specimen Ledger

## Overview

**Creative North Star: "The living field ledger"**

The page treats evidence, contact, and personality as ledger entries on a near-white sheet. It stays minimal at rest; the dithered llama specimen is the one animated instrument.

## Colors

Paper dominates. Graphite makes the text legible, moss carries all specimen and annotation emphasis, and rules provide hierarchy without containers.

## Typography

JetBrains Mono is the full reading voice, compressed aggressively only for the display. HW4 is reserved for marginal annotations, never for dense factual copy.

## Layout

Use a 4vw desktop edge and thin horizontal rules. Hero splits copy and specimen on a 1.08/0.92 grid; ledger rows repeat a 26% metadata column. Below 760px, all sections collapse to one column.

## Elevation & Depth

Flat by default. Depth is created by the specimen's orbital lines and contrast field, not cards or shadows.

## Shapes

Rules are 1px, pixels have 1px rounding, and the animated illustration is measurement geometry rather than a decorative picture.

## Components

### Navigation

Small text links share the page baseline and change to moss on hover.

### Ledger entries

Entries are rows separated by rules, not cards. Metadata remains short and left-aligned; the work statement earns the larger column.

### Specimen study

The SVG study is a scroll-scrubbed field record. It must retain a readable static first frame and a `data-weave-slot` replacement seam.

## Do's and Don'ts

- **Do** let generous paper space and one live specimen lead the page.
- **Do** use HW4 only as an annotation in the margin or side column.
- **Don't** turn records into rounded cards, gradients, or generic data widgets.
- **Don't** put a kicker above a heading; annotations sit beside the reading line instead.
