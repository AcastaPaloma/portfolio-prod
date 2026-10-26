import type { ReactNode } from "react";

// Add a project here and it appears on /projects. `loop` names its halftone GIF in public/animation
// (baked by scripts/diamond.mjs as <loop>-diamond.mp4). `size` sets the tile footprint in the grid.
export type Size = "normal" | "wide" | "tall" | "big";
export type Project = {
  slug: string;
  title: string;
  desc: ReactNode;
  loop: string;
  href?: string;
  size?: Size;
};

export const projects: Project[] = [
  { slug: "genie", title: "Genie Doom World Model", loop: "genie", href: "/genie/", size: "wide", desc: "Playable, action-conditioned Doom video from unlabeled footage." },
  { slug: "pi", title: "π0.7 Recreation", loop: "pi", href: "/pi/", desc: "A full breakdown and rebuild of Physical Intelligence’s π0.7." },
  { slug: "among-the-stars", title: "Among the Stars", loop: "stars", desc: "A simulation of humanity taking over space, from Mars in 2040 to 10,000 years out. Coming soon." },
  { slug: "quantum", title: "GNN Quantum Error Decoder", loop: "quantum", href: "https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction", desc: "ISEF Silver · Physics & Astronomy · Team Canada. Quantum error correction; sponsored by Jane Street." },
  { slug: "allot", title: "Allot", loop: "allot", href: "https://github.com/fiona-cai/ampitup", desc: "Hackathon winner. Calendar and event-based budgets for companies." },
  { slug: "cortesol", title: "Cortesol", loop: "cortesol", href: "https://cortesol.onrender.com/", size: "wide", desc: "Critical thinking over a knowledge graph." },
  { slug: "mvpvp", title: "MvPVP", loop: "mvpvp", href: "https://github.com/AcastaPaloma/MvPvP", size: "wide", desc: "Competitive vibe coding. Build an MVP in five minutes." },
];

// The rose sits in its own tile, the same halftone treatment as the rest.
export const roseLoop = "roses";
