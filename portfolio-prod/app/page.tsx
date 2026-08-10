"use client";

import { useEffect, useState } from "react";

const experiences = [
  {
    place: "Morgan Stanley",
    time: "May 2026 — present",
    role: "Technology Analyst · TEDRA Pantheon Data Persistence",
    notes: ["Joining the TEDRA Pantheon data persistence team as a technology analyst."],
  },
  {
    place: "Neuropoly · Polytechnique Montréal",
    time: "Jun 2024 — Jun 2026",
    role: "Research & Development Intern",
    notes: [
      "Trained nnU-Net models for MS spinal cord lesion segmentation.",
      "Accelerated MRI/CT annotation in CART by 80%.",
      "Performed QA on lesion masks and model inferences.",
    ],
  },
  {
    place: "Global Talent Forum",
    time: "Nov 2024 — present",
    role: "Co-Founder & Head of Communications",
    notes: [
      "Built Piñata Pitch into a student startup competition reaching 1000+ students across 25 countries.",
      "Raised $30K+ across Piñata Pitch, a16z Tech Week, Open House Montréal, and Shopify events.",
      "Partnering with Startupfest to put the top 5 teams on a main stage at Old Port Montréal.",
    ],
  },
];

const projects = [
  {
    title: "Sparse GNN Decoders for QEC",
    subtitle: "ISEF Grand Award (2nd) · Lead Researcher, Team Canada",
    details: "Sparse-graph GNN decoders for surface-code quantum error correction; GraphSAGE cut large-d logical error rate 4–7× versus a neural baseline with 5–7× fewer parameters.",
    href: "https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction",
    link: "Read PHYS061T",
  },
  {
    title: "Brain Tumor MRI Platform",
    subtitle: "Lead Developer · Feb 2026 — present",
    details: "Privacy-preserving MRI tumor-segmentation decision support with 3D U-Net + Swin UNETR, a FastAPI/Docker service, and a Next.js overlay viewer.",
    href: "https://github.com/AcastaPaloma/integrative-project",
    link: "Open repository",
  },
  {
    title: "Twin",
    subtitle: "Lead Developer · Hack The North ’25",
    details: "An agentic developer copilot designed to track context and intent through a live build and pitch.",
    href: "https://github.com/AcastaPaloma",
    link: "View GitHub",
  },
];

const pixels = [
  [230, 84], [252, 84], [274, 84], [296, 84], [318, 84], [340, 84],
  [207, 106], [229, 106], [251, 106], [273, 106], [295, 106], [317, 106], [339, 106], [361, 106],
  [229, 128], [251, 128], [273, 128], [295, 128], [317, 128], [339, 128], [361, 128],
  [207, 150], [229, 150], [251, 150], [273, 150], [295, 150], [317, 150], [339, 150], [361, 150], [383, 150],
  [185, 172], [207, 172], [229, 172], [251, 172], [273, 172], [295, 172], [317, 172], [339, 172], [361, 172], [383, 172], [405, 172],
  [185, 194], [207, 194], [229, 194], [251, 194], [273, 194], [295, 194], [317, 194], [339, 194], [361, 194], [383, 194], [405, 194],
  [185, 216], [207, 216], [229, 216], [251, 216], [273, 216], [295, 216], [317, 216], [339, 216], [361, 216], [383, 216], [405, 216],
  [207, 238], [229, 238], [251, 238], [273, 238], [295, 238], [317, 238], [339, 238], [361, 238], [383, 238],
  [229, 260], [251, 260], [273, 260], [295, 260], [317, 260], [339, 260], [361, 260],
  [251, 282], [273, 282], [295, 282], [317, 282], [339, 282],
  [229, 304], [251, 304], [273, 304], [317, 304], [339, 304],
  [207, 326], [229, 326], [251, 326], [317, 326], [339, 326], [361, 326],
  [207, 348], [229, 348], [339, 348], [361, 348],
  [185, 370], [207, 370], [361, 370], [383, 370],
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(Math.min(1, window.scrollY / max));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}

function SpecimenLlama({ progress }: { progress: number }) {
  const shift = Math.round((progress - 0.22) * 70);
  const rotation = -6 + progress * 12;

  return (
    <svg className="specimen-llama" viewBox="0 0 520 470" role="img" aria-label="A dithered llama specimen that follows the page scroll">
      <g opacity="0.6" stroke="currentColor" fill="none" strokeWidth="1">
        <circle cx="296" cy="224" r={166 + progress * 20} strokeDasharray="2 8" />
        <path d="M76 224H446M296 38V414" strokeDasharray="3 9" />
        <path d={`M98 ${222 + shift}C170 ${76 - shift} 356 ${86 + shift} 424 ${232 - shift}`} opacity="0.6" />
      </g>
      <g transform={`translate(0 ${shift}) rotate(${rotation} 296 220)`}>
        <path d="M227 80 L247 27 L268 95 M330 93 L353 37 L366 127 M205 128 C159 156 161 255 219 289 L209 371 L248 371 L261 302 L324 302 L338 371 L377 371 L357 278 C409 249 408 171 363 145 C363 101 346 82 326 82 C292 103 252 102 227 80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        {pixels.map(([x, y], index) => (
          <rect key={`${x}-${y}`} x={x + (index % 4 === 0 ? shift / 7 : 0)} y={y} width={index % 5 === 0 ? 15 : 12} height={index % 5 === 0 ? 15 : 12} rx="1" fill="currentColor" opacity={0.2 + ((index * 13) % 70) / 100} />
        ))}
        <circle cx="349" cy="153" r="4" fill="currentColor" />
        <path d="M368 170h18l-12 12" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
      <text x="64" y="437" className="svg-note">SPECIMEN / L-07 · scroll position {String(Math.round(progress * 100)).padStart(2, "0")}%</text>
    </svg>
  );
}

export default function Home() {
  const progress = useScrollProgress();

  return (
    <main className="ledger-shell" style={{ "--scroll": progress } as React.CSSProperties}>
      <header className="ledger-nav">
        <a className="wordmark" href="#top">KYW / 26</a>
        <nav aria-label="Page navigation">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="ledger-hero" id="top">
        <div className="hero-copy">
          <h1>Kuan<br />Yi Wang</h1>
          <p className="lede">I work where code, research, and organizing people make each other sharper.</p>
          <p className="hero-proof">CS @ Waterloo · now at Morgan Stanley · building around medtech, quantum research, and startup rooms.</p>
          <div className="hero-actions">
            <a className="text-link" href="#projects">Inspect selected projects <span>↘</span></a>
            <a className="text-link" href="mailto:kuanyi.wang0807@gmail.com">Start a conversation <span>↗</span></a>
          </div>
        </div>
        <figure className="specimen-stage" data-weave-slot="llama-scroll-study">
          <p className="stage-index">Field study<br />no. 07</p>
          <SpecimenLlama progress={progress} />
          <figcaption>scroll down to advance / up to rewind</figcaption>
        </figure>
      </section>

      <section className="signal-strip" aria-label="Current interests">
        <span>quantum research</span><i />
        <span>medical imaging</span><i />
        <span>golf, badly but earnestly</span><i />
        <span>good rooms full of builders</span>
      </section>

      <section className="ledger-section" id="work">
        <div className="section-intro">
          <p className="hand-note">the working record</p>
          <h2>Somewhere between the lab, the server, and the stage.</h2>
        </div>
        <div className="ledger-list">
          {experiences.map((item) => (
            <article className="ledger-entry" key={item.place}>
              <div className="entry-stamp"><span>record</span><strong>{item.time}</strong></div>
              <div>
                <h3>{item.place}</h3>
                <p className="entry-role">{item.role}</p>
                <ul>{item.notes.map((note) => <li key={note}>{note}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ledger-section projects-section" id="projects">
        <div className="section-intro">
          <p className="hand-note">things I keep returning to</p>
          <h2>Projects with an actual point of view.</h2>
        </div>
        <div className="project-ledger">
          {projects.map((project, index) => (
            <article className="project-row" key={project.title}>
              <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{project.title}</h3>
                <p className="entry-role">{project.subtitle}</p>
              </div>
              <p>{project.details}</p>
              <a href={project.href} target="_blank" rel="noreferrer">{project.link} <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-sheet" id="contact">
        <div>
          <h2>Let&apos;s make the next<br />entry interesting.</h2>
        </div>
        <div className="contact-links">
          <a href="mailto:kuanyi.wang0807@gmail.com">kuanyi.wang0807@gmail.com <span>↗</span></a>
          <a href="/WANG_KUANYI.pdf" target="_blank" rel="noreferrer">Curriculum vitae <span>↗</span></a>
          <a href="https://www.linkedin.com/in/kuan-yi-wang-443871319/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          <a href="https://github.com/AcastaPaloma" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        </div>
      </section>

      <footer className="ledger-footer"><span>© Kuan Yi Wang</span><span>Toronto / Montréal / wherever the interesting work is</span></footer>
    </main>
  );
}
