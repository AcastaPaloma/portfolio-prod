# Graph Report - /Users/kuanw/Me/code/portfolios/portfolio-resume  (2026-09-01)

## Corpus Check
- 36 files · ~249,206 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 123 nodes · 129 edges · 14 communities (8 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Resume Experience
- Runtime Dependencies
- TypeScript Configuration
- Development Tooling
- Package Metadata
- Project File Scope
- Resume 3D Geometry
- Root Layout
- Home Route
- Scene Error Handling
- Resume Texture Layer
- Next Configuration
- Next Type Declarations

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 6 edges
3. `createPerforatedSlabGeometry()` - 5 edges
4. `scripts` - 5 edges
5. `pdfXToWorld()` - 4 edges
6. `pdfYToWorld()` - 4 edges
7. `ExperienceFragment()` - 4 edges
8. `ExperienceFragments()` - 4 edges
9. `lib` - 4 edges
10. `RESUME_EXCAVATIONS` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ExperienceFragment()` --calls--> `prepareTexture()`  [EXTRACTED]
  components/resume-experience.tsx → components/resume-experience.tsx  _Bridges community 10 → community 6_

## Import Cycles
- None detected.

## Communities (14 total, 6 thin omitted)

### Community 0 - "Resume Experience"
Cohesion: 0.07
Nodes (13): AUTHORED_EASE, CinematicStageContext, CinematicStageState, HIGHLIGHT_STROKES, HighlightStroke, PROJECT_CARDS, PROJECT_MARKER_TARGETS, ProjectMarkerTarget (+5 more)

### Community 1 - "Runtime Dependencies"
Cohesion: 0.11
Nodes (19): motion, next, dependencies, motion, next, @paper-design/shaders-react, react, react-dom (+11 more)

### Community 2 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "Development Tooling"
Cohesion: 0.13
Nodes (15): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, @types/node (+7 more)

### Community 4 - "Package Metadata"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 5 - "Project File Scope"
Cohesion: 0.22
Nodes (8): .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 6 - "Resume 3D Geometry"
Cohesion: 0.36
Nodes (8): createFloatingShadowTexture(), createPerforatedSlabGeometry(), ExperienceFragment(), ExperienceFragments(), pdfXToWorld(), pdfYToWorld(), RESUME_EXCAVATIONS, ResumeSlab()

## Knowledge Gaps
- **61 isolated node(s):** `metadata`, `AUTHORED_EASE`, `RETURN_EASE`, `Stage`, `CinematicStageState` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Tooling` to `Package Metadata`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `TypeScript Configuration` to `Project File Scope`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `metadata`, `AUTHORED_EASE`, `RETURN_EASE` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Resume Experience` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._