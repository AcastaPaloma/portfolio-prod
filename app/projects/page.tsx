import type { Metadata } from "next";
import Link from "next/link";
import { GradientBackground } from "@/components/gradient-background";
import { TransparentLoop } from "@/components/transparent-loop";
import { LiquidGlass } from "@/components/liquid-glass";
import { projects, roseLoop, type Project } from "@/lib/projects";
import "../dither.css";

export const metadata: Metadata = { title: "Projects — Kuan Yi Wang" };

function loopFor(name: string) {
  return { src: `/animation/${name}-diamond.mp4`, smallSrc: `/animation/${name}-diamond-small.mp4`, poster: `/animation/${name}-diamond-poster.webp` };
}

function ProjectTile({ project }: { project: Project }) {
  const external = project.href && !project.href.startsWith("/") ? { target: "_blank", rel: "noreferrer" } : {};
  const loop = loopFor(project.loop);
  return <LiquidGlass as={project.href ? "a" : "div"} href={project.href} {...external}
    className={`project-tile project-tile--${project.size ?? "normal"}`}>
    <TransparentLoop className="project-loop" name={project.title} src={loop.src} smallSrc={loop.smallSrc} poster={loop.poster} width={480} height={480} />
    <p className="project-tile-desc">{project.desc}</p>
  </LiquidGlass>;
}

export default function ProjectsPage() {
  const rose = loopFor(roseLoop);
  return <main className="dither-page projects-page">
    <GradientBackground />
    <div className="projects-grid">
      <LiquidGlass className="project-tile projects-title-tile">
        <h1>Projects</h1>
      </LiquidGlass>
      <LiquidGlass className="project-tile project-tile--loop">
        <TransparentLoop className="project-loop" name="roses in halftone" src={rose.src} smallSrc={rose.smallSrc} poster={rose.poster} width={576} height={864} />
      </LiquidGlass>
      {projects.slice(0, 2).map(project => <ProjectTile key={project.slug} project={project} />)}
      <LiquidGlass className="project-tile project-tile--helmet">
        <TransparentLoop className="project-loop" name="helmet particles" src="/animation/helmet-gust.mp4" smallSrc="/animation/helmet-gust-small.mp4" poster="/animation/helmet-gust-poster.webp" width={720} height={720} monochrome />
      </LiquidGlass>
      {projects.slice(2).map(project => <ProjectTile key={project.slug} project={project} />)}
      <LiquidGlass as="a" href="/" className="project-tile projects-home-tile">
        <span>← back home</span>
      </LiquidGlass>
    </div>
  </main>;
}
