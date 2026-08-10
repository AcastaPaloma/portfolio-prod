---
name: Shader Portal
description: A pale portfolio with a contained, live pixel research portal.
colors:
  paper: "#f1f0e9"
  ink: "#171c18"
  muted: "#6a6f67"
  violet: "#a782ff"
  acid: "#dfff50"
  line: "#b8bbb3"
typography:
  display:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "clamp(64px, 10vw, 152px)"
    fontWeight: 400
    lineHeight: 0.75
    letterSpacing: "-0.085em"
  body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    lineHeight: 1.68
  annotation:
    fontFamily: "HW4, JetBrains Mono, cursive"
spacing:
  edge: "4vw"
  section: "clamp(92px, 13vw, 185px)"
components:
  portal-field:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.acid}"
    height: "590px"
---

# Design System: Shader Portal

## Overview

**Creative North Star: "The contained research portal"**

The portfolio is bone paper and black type until one canvas field breaks the surface. The field owns all high energy, so the rest of the page remains direct and calmly readable.

## Colors

Paper and ink are the operating surfaces. Violet is the signal field; acid is the bright portal edge and pulse, never a distributed accent.

## Typography

JetBrains Mono carries the entire interface, including its compressed display. HW4 remains a rare sideways annotation at section scale.

## Layout

Hero is a 0.88/1.12 split with copy at left and a 590px portal at right. Section headings use a 29% annotation column; three projects use a rule-separated grid that becomes one column below 780px.

## Elevation & Depth

There is no generic elevation. The portal is a dark aperture with an acid offset edge; dimensionality comes from the generated pixel field.

## Shapes

Most geometry is sharp and ruled. Pixel cells carry a 1px radius, while the only rounded shapes are signal dots.

## Components

### Portal field

Canvas renders a llama-like pixel form, ring, and noisy field from actual scroll progress. It must preserve a static first draw and the `data-weave-slot` handoff.

### Work stream

Work is a ruled timeline, not a card list. A small acid dot marks each record.

### Project grid

Projects are flat fields divided by a 1px ink rule, each ending with a simple underlined external link.

## Do's and Don'ts

- **Do** contain saturated/dark energy inside the portal field.
- **Do** use acid as a signal edge and state, not a fill for normal controls.
- **Don't** spread glow, gradients, or dashboard widgets across the page.
- **Don't** add an eyebrow above a heading.
