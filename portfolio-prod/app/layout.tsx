import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuan Yi Wang — portfolio",
  description: "Computer science, medtech, research, startups, and golf.",
};

const directionContract = `<!--
THESIS: A personal portfolio as a living specimen ledger, refusing the generic project-card grid.
OWN-WORLD: Chalk-white paper, graphite rules, moss measurements, JetBrains Mono records, and small HW4 marginalia.
STORY: A first-time visitor meets Kuan's work in research, medtech, technology, and community, then can inspect projects or make contact.
FIRST VIEWPORT: Oversized name and direct invitation occupy the left; a scroll-scrubbed dither llama specimen moves in the right field; project and contact actions sit at the lower left.
FORM: Pale Specimen Ledger, selected visual world, seed d16a4779.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <template data-direction-contract="pale-specimen-ledger" dangerouslySetInnerHTML={{ __html: directionContract }} />
        {children}
      </body>
    </html>
  );
}
