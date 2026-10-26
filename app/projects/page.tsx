import type { Metadata } from "next";
import { ProjectsBento } from "@/components/projects-bento";
import { projects } from "@/lib/projects";
import "../dither.css";

export const metadata: Metadata = { title: "Projects — Kuan Yi Wang" };

export default function ProjectsPage() {
  return <main className="dither-page projects-page">
    <ProjectsBento projects={projects} rose="/animation/roses-tight-small.mp4" aurora="/work/aurora.gif" />
  </main>;
}
