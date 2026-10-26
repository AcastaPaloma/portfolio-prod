import type { Metadata } from "next";
import Link from "next/link";
import { GradientBackground } from "@/components/gradient-background";
import { TransparentLoop } from "@/components/transparent-loop";
import { InlineIcon } from "@/components/inline-icon";
import { LiquidGlass } from "@/components/liquid-glass";
import { loops, projects, type Project } from "@/lib/projects";
import "../dither.css";

export const metadata: Metadata = { title: "Projects — Kuan Yi Wang" };

function ProjectTile({ project }: { project: Project }) {
  const external = project.href && !project.href.startsWith("/") ? { target: "_blank", rel: "noreferrer" } : {};
  return <LiquidGlass as={project.href ? "a" : "div"} href={project.href} {...external}
    className={`project-tile project-tile--${project.size ?? "normal"}`}
    underlay={project.thumb && <img src={project.thumb} alt="" loading="lazy" decoding="async" />}>
    <div className="project-tile-copy">
      {project.tags && <span className="project-tile-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</span>}
      <h2><InlineIcon name={project.icon} />{project.title}</h2>
      <p>{project.desc}</p>
    </div>
  </LiquidGlass>;
}

export default function ProjectsPage() {
  // The helmet loop sits in the middle of the grid, after the first two projects.
  const cells: (Project | "helmet" | "roses")[] = [...projects.slice(0, 2), "helmet", ...projects.slice(2, 4), "roses", ...projects.slice(4)];
  return <main className="dither-page projects-page">
    <GradientBackground />
    <nav className="home-writings text-layer ink" aria-label="Site">
      <Link href="/">home</Link>
    </nav>
    <section className="projects-wrap" aria-labelledby="projects-title">
      <h1 id="projects-title" className="text-layer ink">Projects.</h1>
      <div className="projects-grid">
        {cells.map((cell, index) => cell === "helmet"
          ? <LiquidGlass key="helmet" className="project-tile project-tile--helmet">
              <TransparentLoop className="helmet-art" name="helmet particles" src="/animation/helmet-gust.mp4" smallSrc="/animation/helmet-gust-small.mp4" poster="/animation/helmet-gust-poster.webp" width={720} height={720} monochrome />
            </LiquidGlass>
          : cell === "roses"
          ? <LiquidGlass key="roses" className="project-tile project-tile--big project-tile--loop">
              <TransparentLoop className="loop-tile-art" name="roses in halftone" src={loops.roses.src} smallSrc={loops.roses.smallSrc} poster={loops.roses.poster} width={576} height={864} monochrome />
            </LiquidGlass>
          : <ProjectTile key={(cell as Project).slug ?? index} project={cell as Project} />)}
      </div>
    </section>
  </main>;
}
