// Add a project here and it appears on /projects. `image` is the original photo shown when the tile flips.
export type Project = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  href?: string;
};

export const projects: Project[] = [
  { slug: "genie", title: "Genie Doom World Model", href: "/genie/", image: "/work/genie.jpg", desc: "Playable, action-conditioned Doom video from unlabeled footage." },
  { slug: "pi", title: "π0.7 Recreation", href: "/pi/", image: "/work/pi.jpg", desc: "A full breakdown and rebuild of Physical Intelligence’s π0.7." },
  { slug: "kuangrad", title: "Neural Net from Scratch", href: "/kuangrad/", image: "/work/kuangrad.jpg", desc: "An autograd engine where every number is its own Python object, trained on 1,000 digits I drew by hand." },
  { slug: "among-the-stars", title: "Among the Stars", image: "/work/among-the-stars.jpg", desc: "A simulation of humanity taking over space, from Mars in 2040 to 10,000 years out. Coming soon." },
  { slug: "quantum", title: "GNN Quantum Error Decoder", href: "https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction", image: "/work/isef.jpg", desc: "ISEF Silver · Physics & Astronomy · Team Canada. Quantum error correction; sponsored by Jane Street." },
  { slug: "allot", title: "Allot", href: "https://github.com/fiona-cai/ampitup", image: "/work/allot.jpg", desc: "Hackathon winner. Calendar and event-based budgets for companies." },
  { slug: "cortesol", title: "Cortesol", href: "https://cortesol.onrender.com/", image: "/work/cortesol-tall.jpg", desc: "Critical thinking over a knowledge graph." },
  { slug: "mvpvp", title: "MvPVP", href: "https://github.com/AcastaPaloma/MvPvP", image: "/work/mvpvp.jpg", desc: "Competitive vibe coding. Build an MVP in five minutes." },
];
