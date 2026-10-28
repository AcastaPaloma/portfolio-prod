"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { TransparentLoop } from "@/components/transparent-loop";
import type { Project } from "@/lib/projects";

// An 8 × 12 grid of units. The layout is fixed, so every visit sees the same bento.
// Projects sits top-right and back-home bottom-left, as always.
type Rect = { x: number; y: number; w: number; h: number };
const PLACE: Record<string, Rect> = {
  rose: { x: 0, y: 0, w: 2, h: 6 },
  quantum: { x: 2, y: 0, w: 2, h: 3 },
  title: { x: 4, y: 0, w: 4, h: 3 },
  pi: { x: 5, y: 3, w: 3, h: 3 },
  helmet: { x: 3, y: 3, w: 2, h: 6 },
  kuangrad: { x: 5, y: 6, w: 3, h: 3 },
  cortesol: { x: 2, y: 3, w: 1, h: 6 },
  genie: { x: 0, y: 6, w: 2, h: 3 },
  home: { x: 0, y: 9, w: 2, h: 3 },
  stars: { x: 2, y: 9, w: 2, h: 3 },
  mvpvp: { x: 4, y: 9, w: 2, h: 3 },
  allot: { x: 6, y: 9, w: 2, h: 3 },
};

// The background stays black, so every tile carries its own solid colour. Text flips between black and white to suit it.
// Only Projects and back-home carry colour. They invert the background behind them and tint it pink.
// Projects and back-home invert the background behind them, then tint the result pink.
const COLOUR: Record<string, string> = {
  title: "#ff3d9a",
  home: "#ff6fb5",
};

function ink(hex: string) {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
  return luminance > 0.36 ? "#0b0b0b" : "#fff";
}

const tileStyle = (): CSSProperties => ({ color: "#fff" });

// The wash is the box's colour, screened over the background so the gradient and numbers show through it.
// Difference with white inverts the background. Multiply with pink then tints the inverted gradient.
function Wash({ id }: { id: string }) {
  if (!COLOUR[id]) return null;
  return <>
    <span className="bento-wash bento-wash--invert" aria-hidden="true" />
    <span className="bento-wash" aria-hidden="true" style={{ background: COLOUR[id] }} />
  </>;
}

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

// The image and description slide in from one of four sides. Each open picks one at random, never the one before it.
const SIDES: Record<string, [string, string]> = {
  top: ["0px", "-100%"],
  bottom: ["0px", "100%"],
  left: ["-100%", "0px"],
  right: ["100%", "0px"],
};

// Opening picks a new side only when the pane is at rest. A quick re-hover mid-slide keeps its path instead of snapping.
function slide(tile: HTMLElement, open: boolean) {
  if (!open) {
    tile.removeAttribute("data-open");
    return;
  }
  if (tile.hasAttribute("data-open")) return;
  const pane = tile.querySelector<HTMLElement>(".bento-detail-pane")!;
  if (pane.getAnimations().length === 0) {
    const sides = Object.keys(SIDES).filter(side => side !== tile.dataset.from);
    const side = sides[Math.floor(Math.random() * sides.length)];
    const [x, y] = SIDES[side];
    tile.dataset.from = side;
    // Move the pane to its new start without animating, so it does not sweep across the tile on the way.
    pane.style.transition = "none";
    tile.style.setProperty("--from-x", x);
    tile.style.setProperty("--from-y", y);
    void pane.offsetWidth;
    pane.style.transition = "";
  }
  tile.setAttribute("data-open", "");
}

function ProjectTile({ project, id }: { project: Project; id: string }) {
  const external = project.href && !project.href.startsWith("/") ? { target: "_blank", rel: "noreferrer" } : {};
  const Tag = project.href ? "a" : "div";
  const style: CSSProperties = { ...tile(id), ...tileStyle() };
  return <Tag className="bento-tile bento-project" href={project.href} style={style} {...external}
    onPointerEnter={e => slide(e.currentTarget, true)}
    onPointerLeave={e => slide(e.currentTarget, false)}
    onFocus={e => slide(e.currentTarget, true)}
    onBlur={e => slide(e.currentTarget, false)}>

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

export function ProjectsBento({ projects, rose }: { projects: Project[]; rose: string }) {
  const byId = (slug: string) => projects.find(p => p.slug === slug)!;
  return <div className="bento">
    <div className="bento-tile bento-title" style={{ ...tile("title"), ...tileStyle() }}><Wash id="title" /><FitText>Projects</FitText></div>
    <Link href="/" className="bento-tile bento-home" style={{ ...tile("home"), ...tileStyle() }}><Wash id="home" /><FitText>← back home</FitText></Link>
    <div className="bento-tile bento-media" style={{ ...tile("rose"), ...tileStyle() }}><TransparentLoop className="bento-loop" name="roses in halftone" src={rose} smallSrc={rose} poster="/animation/roses-color-poster.webp" width={960} height={1440} /></div>
    <div className="bento-tile bento-media bento-helmet" style={{ ...tile("helmet"), ...tileStyle() }}><TransparentLoop className="bento-loop" name="helmet particles" src="/animation/helmet-full.mp4" smallSrc="/animation/helmet-full.mp4" poster="/animation/helmet-full-poster.webp" width={544} height={708} monochrome /></div>
    <ProjectTile project={byId("genie")} id="genie" />
    <ProjectTile project={byId("pi")} id="pi" />
    <ProjectTile project={byId("kuangrad")} id="kuangrad" />
    <ProjectTile project={byId("among-the-stars")} id="stars" />
    <ProjectTile project={byId("quantum")} id="quantum" />
    <ProjectTile project={byId("allot")} id="allot" />
    <ProjectTile project={byId("cortesol")} id="cortesol" />
    <ProjectTile project={byId("mvpvp")} id="mvpvp" />
  </div>;
}
