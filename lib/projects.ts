import type { ReactNode } from "react";

// Add a project here and it appears on /projects. `size` sets the tile footprint in the grid.
export type Size = "normal" | "wide" | "tall" | "big";
export type Project = {
  slug: string;
  title: string;
  icon: string;
  desc: ReactNode;
  tags?: string[];
  href?: string;
  thumb?: string;
  size?: Size;
};

export const projects: Project[] = [
  { slug: "genie", icon: "world", title: "Genie Doom World Model", href: "/genie/", thumb: "/work/genie-diamond.webp", size: "wide", tags: ["research", "world models"], desc: "Playable, action-conditioned Doom video from unlabeled footage." },
  { slug: "pi", icon: "network", title: "π0.7 Recreation", href: "/pi/", thumb: "/work/pi-diamond.webp", tags: ["robotics"], desc: "A full breakdown and rebuild of Physical Intelligence’s π0.7." },
  { slug: "among-the-stars", icon: "code", title: "Among the Stars", tags: ["hackathon", "3rd SOON"], thumb: "/work/among-the-stars-diamond.webp", desc: "A simulation of humanity taking over space, from Mars in 2040 to 10,000 years out. Coming soon." },
  { slug: "quantum", icon: "quantum", title: "GNN Quantum Error Decoder", href: "https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction", thumb: "/work/isef-diamond.webp", tags: ["ISEF Silver"], desc: "Physics & Astronomy · Team Canada. Quantum error correction; sponsored by Jane Street." },
  { slug: "allot", icon: "code", title: "Allot", href: "https://github.com/fiona-cai/ampitup", thumb: "/work/allot-diamond.webp", tags: ["hackathon", "1st place"], desc: "Hackathon winner. Calendar and event-based budgets for companies." },
  { slug: "cortesol", icon: "network", title: "Cortesol", href: "https://cortesol.onrender.com/", thumb: "/work/cortesol-diamond.webp", size: "wide", tags: ["hackathon", "HackThe6ix"], desc: "Critical thinking over a knowledge graph." },
  { slug: "mvpvp", icon: "code", title: "MvPVP", href: "https://github.com/AcastaPaloma/MvPvP", thumb: "/work/mvpvp-diamond.webp", tags: ["hackathon", "McHacks"], desc: "Competitive vibe coding. Build an MVP in five minutes." },
];

// Looping halftone GIFs baked by scripts/halftone-loop.mjs. They sit in tiles without a caption.
export const loops = {
  roses: { src: "/animation/roses-diamond.mp4", smallSrc: "/animation/roses-diamond-small.mp4", poster: "/animation/roses-diamond-poster.webp" },
};
