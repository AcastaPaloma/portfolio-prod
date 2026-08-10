import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuan Yi Wang — paper cut portfolio",
  description: "Computer science, medtech, research, startups, and golf.",
};

const directionContract = `<!--
THESIS: A portfolio assembled as a paper-cut field board, refusing the fixed hero plus uniform card stack.
OWN-WORLD: White stock, cobalt and citrus cut sheets, deep navy cut lines, soft cast-paper shadows, JetBrains Mono facts, HW4 notes.
STORY: A visitor sees Kuan's threads—research, medical imaging, startup rooms, and play—converge, then follows them to evidence and contact.
FIRST VIEWPORT: Huge hand-marked name sits on the left of a full paper-cut composition; a llama, orbital path, MRI slice, and golf club shift through depth with scroll; actions sit beneath the introduction.
FORM: Layered Paper Cut, selected visual world, seed d16a4779.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><template data-direction-contract="layered-paper-cut" dangerouslySetInnerHTML={{ __html: directionContract }} />{children}</body></html>;
}
