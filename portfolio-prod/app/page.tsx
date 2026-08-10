"use client";

import { useEffect, useState, type CSSProperties } from "react";

const experience = [
  ["Morgan Stanley", "Technology Analyst · TEDRA Pantheon Data Persistence", "May 2026 — present", "Joining the TEDRA Pantheon data persistence team as a technology analyst."],
  ["Neuropoly · Polytechnique Montréal", "Research & Development Intern", "Jun 2024 — Jun 2026", "Trained nnU-Net models for MS spinal cord lesion segmentation; accelerated MRI/CT annotation in CART by 80%; and performed QA on lesion masks and model inferences."],
  ["Global Talent Forum", "Co-Founder & Head of Communications", "Nov 2024 — present", "Built Piñata Pitch into a student startup competition reaching 1000+ students across 25 countries and helped raise $30K+ across its events."],
];

const projects = [
  { title: "Sparse GNN Decoders for QEC", note: "ISEF Grand Award (2nd) · Lead Researcher, Team Canada", text: "Sparse-graph GNN decoders for surface-code quantum error correction, with GraphSAGE cutting large-d logical error rate 4–7× versus a neural baseline with 5–7× fewer parameters.", href: "https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction", label: "PHYS061T ↗" },
  { title: "Brain Tumor MRI Platform", note: "Lead Developer · Feb 2026 — present", text: "Privacy-preserving MRI tumor-segmentation decision support with 3D U-Net + Swin UNETR, FastAPI/Docker, and a Next.js slice-overlay viewer.", href: "https://github.com/AcastaPaloma/integrative-project", label: "Repository ↗" },
  { title: "Twin", note: "Lead Developer · Hack The North ’25", text: "An agentic developer copilot designed to track context and intent through a live build and pitch.", href: "https://github.com/AcastaPaloma", label: "GitHub ↗" },
];

function useScroll() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => { raf = 0; setValue(Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight))); };
    const handle = () => { if (!raf) raf = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", handle, { passive: true }); window.addEventListener("resize", handle);
    return () => { window.removeEventListener("scroll", handle); window.removeEventListener("resize", handle); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return value;
}

function PaperAssembly({ progress }: { progress: number }) {
  const state = { "--p": progress } as CSSProperties;
  return (
    <div className="paper-assembly" style={state} data-weave-slot="paper-cut-scroll-study" aria-label="A layered paper composition that changes depth with page scroll" role="img">
      <div className="cut orbit orbit-one" /><div className="cut orbit orbit-two" />
      <div className="cut mri"><span>slice / 24</span><i /><b /></div>
      <div className="cut llama-body"><i /><i /><i /><i /><b /></div>
      <div className="cut llama-head"><i /><i /><b /></div>
      <div className="cut llama-ear ear-a" /><div className="cut llama-ear ear-b" />
      <div className="cut club"><i /></div><div className="cut ball" />
      <div className="cut label-card">LLAMA<br /><span>IN MOTION</span></div>
      <p className="assembly-caption">paper layers react to scroll<br />down = open / up = close</p>
    </div>
  );
}

export default function Home() {
  const progress = useScroll();
  return (
    <main className="paper-page">
      <header className="paper-nav"><a href="#top" className="paper-mark">KYW</a><nav><a href="#work">work</a><a href="#projects">projects</a><a href="#contact">contact</a></nav></header>
      <section className="paper-hero" id="top">
        <div className="paper-copy">
          <h1>Kuan Yi<br />Wang</h1>
          <p className="paper-lede">I make useful things around research, medical imaging, and people with disproportionately big ideas.</p>
          <div className="paper-actions"><a href="#projects">see the work <span>↓</span></a><a href="mailto:kuanyi.wang0807@gmail.com">say hello <span>↗</span></a></div>
        </div>
        <PaperAssembly progress={progress} />
      </section>
      <section className="thread-banner"><span>quantum research</span><b>×</b><span>medtech</span><b>×</b><span>startup rooms</span><b>×</b><span>golf on weekends</span></section>
      <section className="paper-section work-section" id="work">
        <div className="section-heading"><p className="scribble">work that sticks</p><h2>Each role adds another layer.</h2></div>
        <div className="cut-records">
          {experience.map(([name, role, date, detail], index) => <article className={`cut-record record-${index + 1}`} key={name}><span className="record-date">{date}</span><div><h3>{name}</h3><p className="record-role">{role}</p><p>{detail}</p></div><span className="record-tab">{String(index + 1).padStart(2, "0")}</span></article>)}
        </div>
      </section>
      <section className="paper-section projects-area" id="projects">
        <div className="section-heading"><p className="scribble">open these up</p><h2>Selected project folds.</h2></div>
        <div className="project-folds">
          {projects.map((project, index) => <article className={`project-fold fold-${index + 1}`} key={project.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{project.title}</h3><p className="record-role">{project.note}</p><p>{project.text}</p><a href={project.href} target="_blank" rel="noreferrer">{project.label}</a></article>)}
        </div>
      </section>
      <section className="paper-contact" id="contact"><h2>Make contact.</h2><div><a href="mailto:kuanyi.wang0807@gmail.com">kuanyi.wang0807@gmail.com ↗</a><a href="/WANG_KUANYI.pdf" target="_blank" rel="noreferrer">curriculum vitae ↗</a><a href="https://www.linkedin.com/in/kuan-yi-wang-443871319/" target="_blank" rel="noreferrer">linkedin ↗</a><a href="https://github.com/AcastaPaloma" target="_blank" rel="noreferrer">github ↗</a></div></section>
      <footer>© Kuan Yi Wang · made to be unfolded</footer>
    </main>
  );
}
