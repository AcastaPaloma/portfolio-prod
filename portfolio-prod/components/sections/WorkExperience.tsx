/// ========== Components ========== //
import TopLeftPath from '../TopLeftPath'

import React from 'react'

type ExperienceEntry = {
  title: string
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

const experiences: ExperienceEntry[] = [
  {
    title: 'Morgan Stanley',
    date: 'May 2026 - Present',
    role: 'Technology Analyst, TEDRA Pantheon Data Persistence',
    bullets: [
      <>Joining the TEDRA Pantheon data persistence team as a technology analyst.</>,
    ],
  },
  {
    title: 'Neuropoly, Polytechnique Montreal',
    date: 'June 2024 - June 2026',
    role: 'Research & Development Intern',
    bullets: [
      <>Trained nnU-Net models for MS spinal cord lesion segmentation.</>,
      <>
        Accelerated MRI/CT annotation in{' '}
        <a
          href="https://github.com/SomeoneInParticular/CART"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFB86C] hover:underline"
        >
          CART
        </a>{' '}
        by 80%.
      </>,
      <>Performed QA on lesion masks and model inferences.</>,
    ],
  },
  {
    title: 'Global Talent Forum',
    date: 'November 2024 - Present',
    role: 'Co-Founder & Head of Communications',
    bullets: [
      <>Built Pi&ntilde;ata Pitch into a student startup competition reaching 1000+ students across 25 countries.</>,
      <>Raised $30K+ across Pi&ntilde;ata Pitch, a16z Tech Week, Open House Montreal, and Shopify events.</>,
      <>Partnering with Startupfest to put the top 5 teams on a main stage at Old Port Montreal.</>,
      <>Coordinating live judges and investor-facing pitch ops with Botpress CEO, Morgan Stanley, and Mila.</>,
    ],
  },
]

const WorkExperience = () => {
  let lineNumber = 1

  const nextLine = (children?: React.ReactNode) => (
    <CodeLine key={lineNumber} number={lineNumber++}>
      {children}
    </CodeLine>
  )

  const renderedLines = experiences.flatMap((entry, entryIndex) => {
    const lines = [
      nextLine(
        <div className="flex-1 flex items-start justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
          <span className="text-green-400 break-words">{entry.title}</span>
          <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
            {entry.date}
          </span>
        </div>
      ),
      nextLine(
        <div className="flex-1 min-w-0 break-words">
          <span className="text-gray-300">{entry.role}</span>
        </div>
      ),
      nextLine(),
      ...entry.bullets.map((bullet) =>
        nextLine(
          <div className="flex-1 min-w-0 break-words">
            <span className="text-gray-300">&bull; {bullet}</span>
          </div>
        )
      ),
    ]

    if (entryIndex < experiences.length - 1) {
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
    <section id="experience" className="min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:pb-30 md:pb-50 lg:pb-100 pt-0 flex flex-col scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <TopLeftPath path={["portfolio", "app", "page.tsx", "WorkExperience"]} />

        <div className="flex-1 flex flex-col justify-between pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mb-4 sm:mb-5 md:mb-6 text-white">
              &lt;WorkExperience
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

export default WorkExperience
