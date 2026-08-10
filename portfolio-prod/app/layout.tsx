import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuan Yi Wang — portal portfolio",
  description: "Computer science, medtech, research, startups, and golf.",
};

const directionContract = `<!--
THESIS: A pale portfolio with one contained, live research portal rather than page-wide decorative motion or an ordinary project grid.
OWN-WORLD: Bone paper, near-black type, electric chartreuse and ultraviolet pixels, sharp hairlines, JetBrains Mono data, HW4 annotations.
STORY: The visitor meets a person whose work moves between quantum research, medical imaging, infrastructure, and builder communities; the portal becomes evidence of that curiosity before the work and contact are made legible.
FIRST VIEWPORT: An oversized two-line name occupies a pale left field; a scroll-scrubbed canvas portal fills the right, with the primary project and contact actions held directly below the introduction.
FORM: Shader Portal, selected visual world, seed d16a4779.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><template data-direction-contract="shader-portal" dangerouslySetInnerHTML={{ __html: directionContract }} />{children}</body></html>;
}
