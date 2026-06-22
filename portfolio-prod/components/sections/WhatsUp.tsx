/// ========== Components ========== //
import TopLeftPath from '../TopLeftPath'

import React from 'react'

type ProjectEntry = {
  title: React.ReactNode
  date: string
  role: string
  bullets: React.ReactNode[]
}

const rowClass = 'min-h-3 xs:min-h-[14px] sm:min-h-4 md:min-h-5 lg:min-h-[22px] flex items-baseline gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 leading-[1.35] hover:bg-blue-500/10 transition-colors'

const CodeLine = ({ number, children }: { number: number; children?: React.ReactNode }) => (
  <div className={rowClass}>
    <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs leading-[inherit] tabular-nums">
      {number}
    </span>
    {children ?? <div className="flex-1 min-w-0" />}
  </div>
)

const projects: ProjectEntry[] = [
  {
    title: (
      <>
        Sparse GNN Decoders for QEC | <span className="text-cyan-300">ISEF Grand Award (2nd)</span>
      </>
    ),
    date: 'October 2025 - Present',
    role: 'Lead Researched, Team Canada',
    bullets: [
      <>Built sparse-graph GNN decoders for surface-code quantum error correction.</>,
      <>Generated Google Stim syndrome data for 6 code distances, d=3-13, across 8 physical error rates.</>,
      <>GraphSAGE cut large-d logical error rate 4-7x vs neural baseline with 5-7x fewer parameters.</>,
      <>Small-code training on d=3/5/7 generalized to d=9/11/13 with p&lt;0.001 vs non-graph baseline.</>,
      <>
        Project:{' '}
        <a
          href="https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFB86C] hover:underline"
        >
          PHYS061T
        </a>
      </>,
    ],
  },
  {
    title: 'Brain Tumor MRI Platform',
    date: 'February 2026 - Present',
    role: 'Lead Developer',
    bullets: [
      <>Privacy-preserving decision support for MRI tumor segmentation.</>,
      <>3D U-Net + Swin UNETR on BraTS with MONAI/PyTorch.</>,
      <>FastAPI + Docker serving, Next.js UI with slice overlays.</>,
      <>
        Repo:{' '}
        <a
          href="https://github.com/AcastaPaloma/integrative-project"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFB86C] hover:underline"
        >
          github.com/AcastaPaloma/integrative-project
        </a>
      </>,
    ],
  },
  {
    title: 'Twin',
    date: 'October 2025 - Present',
    role: "Lead Developer @HackTheNorth '25",
    bullets: [
      <>Hack The North &apos;25 submission and live pitch.</>,
      <>Agentic dev co-pilot that tracks context and intent.</>,
    ],
  },
]

const WhatsUp = () => {
  let lineNumber = 1

  const nextLine = (children?: React.ReactNode) => (
    <CodeLine key={lineNumber} number={lineNumber++}>
      {children}
    </CodeLine>
  )

  const renderedLines = projects.flatMap((project, projectIndex) => {
    const lines = [
      nextLine(
        <div className="flex-1 flex items-start justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
          <span className="text-green-400 break-words">{project.title}</span>
          <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
            {project.date}
          </span>
        </div>
      ),
      nextLine(
        <div className="flex-1 min-w-0 break-words">
          <span className="text-gray-300">{project.role}</span>
        </div>
      ),
      nextLine(),
      ...project.bullets.map((bullet) =>
        nextLine(
          <div className="flex-1 min-w-0 break-words">
            <span className="text-gray-300">&bull; {bullet}</span>
          </div>
        )
      ),
    ]

    if (projectIndex < projects.length - 1) {
      lines.push(
        nextLine(),
        nextLine(
          <div className="flex-1 flex justify-center">
            <span className="text-gray-300">{'// SEPARATOR //'}</span>
          </div>
        ),
        nextLine(),
        nextLine()
      )
    }

    return lines
  })

  return (
    <section id="projects" className="min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:pb-12 md:pb-16 lg:pb-20 pt-0 flex flex-col scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <TopLeftPath path={["portfolio", "app", "page.tsx", "Projects"]} />

        <div className="flex-1 flex flex-col justify-between pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mb-4 sm:mb-5 md:mb-6 text-white">
              &lt;Projects
            </h1>

            <div className="font-mono text-[8px] xs:text-[9px] pt-4 sm:text-xs md:text-sm lg:text-base">
              {renderedLines}
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mt-8 sm:mt-10 md:mt-12 text-white">
            /&gt;
          </h1>
        </div>
      </div>
    </section>
  )
}

export default WhatsUp
