import type { Metadata } from "next";
import Link from "next/link";
import { GradientBackground } from "@/components/gradient-background";
import { TransparentLoop } from "@/components/transparent-loop";
import { LiquidGlass } from "@/components/liquid-glass";
import { loops, projects, type Project } from "@/lib/projects";
import "../dither.css";

export const metadata: Metadata = { title: "Projects — Kuan Yi Wang" };

function ProjectTile({ project }: { project: Project }) {
  const external = project.href && !project.href.startsWith("/") ? { target: "_blank", rel: "noreferrer" } : {};
  return <LiquidGlass as={project.href ? "a" : "div"} href={project.href} {...external}
    className={`project-tile project-tile--${project.size ?? "normal"}`}
    underlay={project.thumb && <img src={project.thumb} alt="" loading="lazy" decoding="async" />}>
    <p className="project-tile-desc">{project.desc}</p>
  </LiquidGlass>;
}

export default function ProjectsPage() {
  // Projects fill the grid in order. The helmet loop sits in the middle, after the first two.
  const cells: (Project | "helmet")[] = [...projects.slice(0, 2), "helmet", ...projects.slice(2)];
  return <main className="dither-page projects-page">
    <GradientBackground />
    <div className="projects-grid">
      <LiquidGlass className="project-tile projects-title-tile" >
        <h1 id="projects-title">Projects</h1>
      </LiquidGlass>
      <LiquidGlass className="project-tile project-tile--loop">
        <TransparentLoop className="loop-tile-art" name="roses in halftone" src={loops.roses.src} smallSrc={loops.roses.smallSrc} poster={loops.roses.poster} width={576} height={864} />
      </LiquidGlass>
      {cells.map((cell, index) => cell === "helmet"
        ? <LiquidGlass key="helmet" className="project-tile project-tile--helmet">
            <TransparentLoop className="helmet-art" name="helmet particles" src="/animation/helmet-gust.mp4" smallSrc="/animation/helmet-gust-small.mp4" poster="/animation/helmet-gust-poster.webp" width={720} height={720} monochrome />
          </LiquidGlass>
        : <ProjectTile key={cell.slug ?? index} project={cell} />)}
      <LiquidGlass as="a" href="/" className="project-tile projects-home-tile">
        <span>← back home</span>
      </LiquidGlass>
    </div>
  </main>;
}
