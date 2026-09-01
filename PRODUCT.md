# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js with React and React Three Fiber, explicitly requested for a portfolio that can grow beyond the initial resume experience.

## Users

Recruiters, prospective collaborators, and peers reviewing Kuan Yi Wang's experience and work. They need to understand the resume quickly while being able to explore it as a tangible portfolio object.

## Product Purpose

A personal portfolio whose first and primary artifact is Kuan Yi Wang's resume, presented as a manipulable three-dimensional object rather than a conventional marketing site.

## Positioning

The resume itself is the interface: visitors can rotate a thin white slab in open space while retaining the supplied document's layout and information.

## Operating Context

Visitors arrive on desktop or mobile, inspect the resume, rotate it by dragging or with arrow keys, and can access the original PDF when they need a conventional copy.

## Capabilities and Constraints

- The initial experience is a single full-screen 3D resume slab.
- It must be implemented as a Next.js application with a React / WebGL foundation suitable for future portfolio sections.
- The supplied PDF is the source of truth for resume content and visual layout.
- Motion must respect reduced-motion preferences and the document must remain available outside WebGL.

## Brand Commitments

- A quiet beige void, no floor, and restrained light from above.
- The resume reads as a thin white slab with a subtle spatial outline and shadow.
- Avoid decorative portfolio filler; the artifact and its information are the design.

## Evidence on Hand

- Source resume: `/Users/kuanw/Me/docs/CVs/WANG_KUANYI_RE.pdf`
- An outlined SVG derived from that source is used as the resume face, preserving its exact layout and sharpness when the page is zoomed.

## Product Principles

1. Let the resume be both the content and the interaction model.
2. Keep orientation cues useful but visually subordinate.
3. Treat the 3D material as a physical interpretation of the document, not an extra layer of marketing.
4. Preserve a fast, accessible path to the original document.

## Accessibility & Inclusion

- Support pointer and keyboard rotation.
- Respect reduced-motion preferences.
- Provide an accessible original-PDF link and meaningful non-WebGL fallback.
