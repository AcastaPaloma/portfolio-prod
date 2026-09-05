import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuan Yi Wang — Portfolio",
  description: "Computer science at Waterloo. Agentic systems, medical imaging, and a few things outside the résumé.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <span hidden data-design-contract="2020df78-user-pinned-lance-dither">
          THESIS: A personal page reduced to words, photographs, and dots.
          OWN-WORLD: White, black, Georgia, colored diamond halftones; no panels or ornamental navigation.
          STORY: Meet Kuan Yi through his work and his own camera roll, then get in touch.
          FIRST VIEWPORT: A compact introduction on the left and a large dithered dusk photograph on the right.
          FORM: User-pinned Lance Yan reference; one scrolling page and a vertical color-inversion boundary.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        </span>
        {children}
      </body>
    </html>
  );
}
