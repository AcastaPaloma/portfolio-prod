import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuan Yi Wang — Portfolio",
  description: "Kuan Yi Wang's resume as a three-dimensional object.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/*
          THESIS: The resume is the interface; reject the conventional portfolio page.
          OWN-WORLD: A beige void, a clean white slab, hairline edges, and a single overhead light.
          STORY: A visitor reads Kuan Yi Wang's actual resume and explores it as a physical object.
          FIRST VIEWPORT: The white resume slab occupies the open field; a quiet lower rail explains rotation and offers the PDF.
          FORM: A document-object portfolio, pinned by the user's supplied material and spatial direction. Seed: user-pinned-white-slab.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
      </body>
    </html>
  );
}
