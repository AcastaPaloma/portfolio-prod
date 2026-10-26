"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { TransparentLoop } from "@/components/transparent-loop";
import type { Project } from "@/lib/projects";

// An 8 × 12 grid of units. The layout is fixed, so every visit sees the same bento.
// Projects sits top-right and back-home bottom-left, as always.
type Rect = { x: number; y: number; w: number; h: number };
const PLACE: Record<string, Rect> = {
  rose: { x: 0, y: 0, w: 2, h: 3 },
  genie: { x: 2, y: 0, w: 2, h: 3 },
  title: { x: 4, y: 0, w: 4, h: 3 },
  helmet: { x: 0, y: 3, w: 2, h: 6 },
  pi: { x: 2, y: 3, w: 3, h: 3 },
  stars: { x: 5, y: 3, w: 3, h: 3 },
  cortesol: { x: 2, y: 6, w: 3, h: 3 },
  mvpvp: { x: 5, y: 6, w: 3, h: 3 },
  home: { x: 0, y: 9, w: 4, h: 3 },
  aurora: { x: 4, y: 9, w: 2, h: 3 },
  allot: { x: 6, y: 9, w: 2, h: 2 },
  quantum: { x: 6, y: 11, w: 2, h: 1 },
};

// The background stays black, so every tile carries its own solid colour. Text flips between black and white to suit it.
const COLOUR: Record<string, string> = {
  rose: "#ff2e88",     // hot pink
  genie: "#1fd6ff",    // cyan
  title: "#ffd21f",    // gold
  helmet: "#7c4dff",   // violet
  pi: "#ff7a1a",       // orange
  stars: "#2f6bff",    // electric blue
  cortesol: "#00e08a", // mint
  mvpvp: "#ff3ea5",    // magenta
  home: "#c6ff3d",     // acid lime
  aurora: "#14120f",   // only shows if the image fails to load
  allot: "#ff5c35",    // red-orange
  quantum: "#3ee07a",  // green
};

function ink(hex: string) {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
  return luminance > 0.36 ? "#0b0b0b" : "#fff";
}

const tileStyle = (id: string): CSSProperties => ({ background: COLOUR[id], color: ink(COLOUR[id]) });

function FitText({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      let lo = 10, hi = 420;
      for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) hi = mid; else lo = mid;
      }
      el.style.fontSize = `${lo}px`;
    };
    const frame = requestAnimationFrame(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [children]);
  return <span ref={ref} className={`bento-fit ${className ?? ""}`}>{children}</span>;
}

function ProjectTile({ project, id }: { project: Project; id: string }) {
  const external = project.href && !project.href.startsWith("/") ? { target: "_blank", rel: "noreferrer" } : {};
  const Tag = project.href ? "a" : "div";
  const style: CSSProperties = { ...tile(id), ...tileStyle(id) };
  return <Tag className="bento-tile bento-project" href={project.href} style={style} {...external}>
    <span className="bento-face bento-name"><FitText>{project.title}</FitText></span>
    <span className="bento-face bento-detail-pane">
      <img src={project.image} alt="" loading="lazy" decoding="async" />
      <span className="bento-detail"><span className="bento-detail-title">{project.title}</span><span className="bento-detail-desc">{project.desc}</span></span>
    </span>
  </Tag>;
}

function tile(id: string): CSSProperties {
  const at = PLACE[id];
  return { gridColumn: `${at.x + 1} / span ${at.w}`, gridRow: `${at.y + 1} / span ${at.h}` };
}

export function ProjectsBento({ projects, rose, aurora }: { projects: Project[]; rose: string; aurora: string }) {
  const byId = (slug: string) => projects.find(p => p.slug === slug)!;
  return <div className="bento">
    <div className="bento-tile bento-title" style={{ ...tile("title"), ...tileStyle("title") }}><FitText>Projects</FitText></div>
    <Link href="/" className="bento-tile bento-home" style={{ ...tile("home"), ...tileStyle("home") }}><FitText>← back home</FitText></Link>
    <div className="bento-tile bento-media" style={{ ...tile("rose"), ...tileStyle("rose") }}><TransparentLoop className="bento-loop" name="roses in halftone" src={rose} smallSrc={rose} poster="/animation/roses-tight-poster.webp" width={650} height={812} /></div>
    <div className="bento-tile bento-media" style={{ ...tile("helmet"), ...tileStyle("helmet") }}><TransparentLoop className="bento-loop" name="helmet particles" src="/animation/helmet-diamond-small.mp4" smallSrc="/animation/helmet-diamond-small.mp4" poster="/animation/helmet-diamond-poster.webp" width={540} height={851} /></div>
    <div className="bento-tile bento-media" style={{ ...tile("aurora"), ...tileStyle("aurora") }}><img className="bento-cover" src={aurora} alt="Aurora borealis" /></div>
    <ProjectTile project={byId("genie")} id="genie" />
    <ProjectTile project={byId("pi")} id="pi" />
    <ProjectTile project={byId("among-the-stars")} id="stars" />
    <ProjectTile project={byId("quantum")} id="quantum" />
    <ProjectTile project={byId("allot")} id="allot" />
    <ProjectTile project={byId("cortesol")} id="cortesol" />
    <ProjectTile project={byId("mvpvp")} id="mvpvp" />
  </div>;
}
