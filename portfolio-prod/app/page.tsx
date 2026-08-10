"use client";

import { useEffect, useRef, useState } from "react";

const work = [
  { year: "2026 →", name: "Morgan Stanley", role: "Technology Analyst · TEDRA Pantheon Data Persistence", body: "Joining the TEDRA Pantheon data persistence team as a technology analyst." },
  { year: "2024 → 26", name: "Neuropoly · Polytechnique Montréal", role: "Research & Development Intern", body: "Trained nnU-Net models for MS spinal cord lesion segmentation, accelerated MRI/CT annotation in CART by 80%, and performed QA on masks and inferences." },
  { year: "2024 →", name: "Global Talent Forum", role: "Co-Founder & Head of Communications", body: "Built Piñata Pitch into a student startup competition reaching 1000+ students across 25 countries and raised $30K+ across community events." },
];

const projects = [
  { kind: "quantum", name: "Sparse GNN Decoders for QEC", meta: "ISEF Grand Award (2nd) · Lead Researcher, Team Canada", body: "Sparse-graph GNN decoders for surface-code quantum error correction. GraphSAGE cut large-d logical error rate 4–7× versus a neural baseline with 5–7× fewer parameters.", link: "https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction", action: "PHYS061T" },
  { kind: "medical", name: "Brain Tumor MRI Platform", meta: "Lead Developer · Feb 2026 — present", body: "Privacy-preserving MRI tumor-segmentation decision support with 3D U-Net + Swin UNETR, FastAPI/Docker, and a Next.js slice-overlay viewer.", link: "https://github.com/AcastaPaloma/integrative-project", action: "Repository" },
  { kind: "agent", name: "Twin", meta: "Lead Developer · Hack The North ’25", body: "An agentic developer copilot designed to track context and intent through a live build and pitch.", link: "https://github.com/AcastaPaloma", action: "GitHub" },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(.15);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => { frame = 0; if (!reduced) setProgress(Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return progress;
}

function Portal({ progress }: { progress: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const draw = () => {
      const rect = element.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width * ratio));
      const height = Math.max(1, Math.floor(rect.height * ratio));
      if (element.width !== width || element.height !== height) { element.width = width; element.height = height; }
      const ctx = element.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#171c18"; ctx.fillRect(0, 0, rect.width, rect.height);
      const cell = Math.max(5, Math.round(rect.width / 56));
      const t = progress * 8.4;
      const cx = rect.width * (.52 + Math.sin(t * .47) * .075);
      const cy = rect.height * (.53 + Math.cos(t * .34) * .055);
      for (let y = cell; y < rect.height - cell; y += cell) {
        for (let x = cell; x < rect.width - cell; x += cell) {
          const nx = (x - cx) / rect.width; const ny = (y - cy) / rect.height;
          const body = ((nx + .07) * (nx + .07)) / .045 + ((ny + .01) * (ny + .01)) / .105 < 1;
          const neck = (Math.abs(nx + .02) < .10 && ny < -.08 && ny > -.37);
          const head = (nx + .02) * (nx + .02) / .017 + (ny + .40) * (ny + .40) / .028 < 1;
          const ears = (Math.abs(nx + .07) < .022 && ny < -.47 && ny > -.63) || (Math.abs(nx - .07) < .022 && ny < -.47 && ny > -.63);
          const legs = ((Math.abs(nx + .115) < .026 || Math.abs(nx - .12) < .026) && ny > .21 && ny < .41);
          const llama = body || neck || head || ears || legs;
          const wave = Math.sin(x * .061 + y * .043 + t * 3.2) + Math.cos(x * .018 - y * .071 - t * 1.7);
          const ring = Math.abs(Math.hypot(nx, ny) - (.32 + .05 * Math.sin(t))) < .018;
          if (llama || (ring && wave > .7) || (wave > 1.76 && Math.hypot(nx, ny) < .54)) {
            const bright = llama ? 1 : .38 + Math.max(0, wave - 1.7) * .45;
            ctx.fillStyle = llama ? (wave > .45 ? "#dfff50" : "#a782ff") : `rgba(178, 143, 255, ${bright})`;
            ctx.fillRect(x, y, cell - 1, cell - 1);
          }
        }
      }
      ctx.strokeStyle = "rgba(226,255,79,.55)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, Math.min(rect.width, rect.height) * (.37 + progress * .08), 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.72)"; ctx.font = "10px JetBrains Mono"; ctx.fillText(`portal state / ${String(Math.round(progress * 100)).padStart(2, "0")}`, 17, rect.height - 18);
    };
    draw(); window.addEventListener("resize", draw); return () => window.removeEventListener("resize", draw);
  }, [progress]);

  return <div className="portal-shell" data-weave-slot="shader-portal-scroll-study"><canvas ref={canvas} aria-label="A pixel portal that moves forward and backward with the page scroll" role="img" /><span className="portal-annotation">scroll modulates field</span></div>;
}

export default function Home() {
  const progress = useScrollProgress();
  return <main className="portal-page">
    <header className="portal-nav"><a href="#top" className="portal-logo">KYW<span>_</span></a><nav><a href="#work">work</a><a href="#projects">projects</a><a href="#contact">contact</a></nav><span className="nav-status">available for interesting conversations</span></header>
    <section className="portal-hero" id="top"><div className="portal-intro"><h1>Kuan<br />Yi Wang</h1><p>I work across research, code, and community—with a soft spot for medical images, hard quantum problems, and long golf swings.</p><div className="portal-actions"><a href="#projects">project signal <span>↓</span></a><a href="mailto:kuanyi.wang0807@gmail.com">open a channel <span>↗</span></a></div></div><Portal progress={progress} /></section>
    <section className="portal-telemetry"><span>qec / gnn decoder</span><b>•</b><span>mri / segmentation</span><b>•</b><span>infrastructure / data</span><b>•</b><span>golf / practice mode</span></section>
    <section className="portal-section" id="work"><div className="portal-heading"><p className="handline">work log</p><h2>The places that tuned the signal.</h2></div><div className="work-stream">{work.map((item) => <article key={item.name}><span>{item.year}</span><div><h3>{item.name}</h3><p className="item-role">{item.role}</p><p>{item.body}</p></div><i aria-hidden="true" /></article>)}</div></section>
    <section className="portal-section project-section" id="projects"><div className="portal-heading"><p className="handline">three active portals</p><h2>Work worth opening in a new tab.</h2></div><div className="portal-projects">{projects.map((project, index) => <article className={project.kind} key={project.name}><div className="project-code"><span>0{index + 1}</span><i /></div><h3>{project.name}</h3><p className="item-role">{project.meta}</p><p>{project.body}</p><a href={project.link} target="_blank" rel="noreferrer">{project.action} <span>↗</span></a></article>)}</div></section>
    <section className="portal-contact" id="contact"><div><h2>Say hello.</h2></div><div className="contact-rail"><a href="mailto:kuanyi.wang0807@gmail.com">kuanyi.wang0807@gmail.com <span>↗</span></a><a href="/WANG_KUANYI.pdf" target="_blank" rel="noreferrer">curriculum vitae <span>↗</span></a><a href="https://www.linkedin.com/in/kuan-yi-wang-443871319/" target="_blank" rel="noreferrer">linkedin <span>↗</span></a><a href="https://github.com/AcastaPaloma" target="_blank" rel="noreferrer">github <span>↗</span></a></div></section>
    <footer><span>© Kuan Yi Wang</span><span>signal received / thank you for visiting</span></footer>
  </main>;
}
