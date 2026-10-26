import type { Metadata } from "next";
import { GradientBackground } from "@/components/gradient-background";
import { ProjectsBento } from "@/components/projects-bento";
import { projects } from "@/lib/projects";
import "../dither.css";

export const metadata: Metadata = { title: "Projects — Kuan Yi Wang" };

export default function ProjectsPage() {
  return <main className="dither-page projects-page">
    <GradientBackground />
    <ProjectsBento projects={projects} rose="/animation/roses-tight-small.mp4" aurora="/work/aurora.gif" />
  </main>;
}
