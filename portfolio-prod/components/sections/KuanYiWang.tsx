"use client"

/// ========== Components ========== //
import TopLeftPath from '../TopLeftPath'

import React from 'react'

const rowClass = 'min-h-3 xs:min-h-[14px] sm:min-h-4 md:min-h-5 lg:min-h-[22px] flex items-baseline gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 leading-[1.35] hover:bg-blue-500/10 transition-colors'

const CodeLine = ({ number, children, className = '' }: { number: number; children?: React.ReactNode; className?: string }) => (
  <div className={`${rowClass} ${className}`}>
    <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs leading-[inherit] tabular-nums">
      {number}
    </span>
    {children ?? <div className="flex-1 min-w-0" />}
  </div>
)

const KuanYiWang = () => {
  return (
    <section id="about" className="min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:pb-30 md:pb-50 lg:pb-100 sm:pt-6 md:pt-10 lg:pt-15 pt-0 flex flex-col scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <TopLeftPath path={["portfolio", "app", "page.tsx", "Home"]} />

        <div className="flex-1 flex flex-col justify-between pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mb-4 sm:mb-5 md:mb-6 text-white">
              &lt;KuanYiWang
            </h1>

            <div className="font-mono text-[8px] xs:text-[9px] pt-4 sm:text-xs md:text-sm lg:text-base">
              <CodeLine number={1}>
                <div className="flex-1 min-w-0">
                  <span className="text-pink-300">import</span>{' '}
                  <span className="text-blue-400">React</span>
                  <span className="text-gray-300">, &#123;</span>
                </div>
              </CodeLine>

              <CodeLine number={2}>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0 break-words">
                  <span className="text-gray-300">TypeScript</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">JavaScript</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">HTML</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">TailWind CSS</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">Next.js</span>
                </div>
              </CodeLine>

              <CodeLine number={3}>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0 break-words">
                  <span className="text-gray-300">Python</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-red-400">PyTorch, U-Net, TensorFlow</span>
                </div>
              </CodeLine>

              <CodeLine number={4}>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0 break-words">
                  <span className="text-gray-300">Google Firebase</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">Cloud Functions</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">FastAPI</span>
                  <span className="text-gray-300">,</span>
                </div>
              </CodeLine>

              <CodeLine number={5}>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0">
                  <span className="text-gray-300">Supabase</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">SQL</span>
                </div>
              </CodeLine>

              <CodeLine number={6}>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-300">&#125; </span>
                  <span className="text-pink-300">from</span>{' '}
                  <span className="text-[#FFB86C]">&apos;my_tech_stack&apos;</span>
                  <span className="text-gray-300">;</span>
                </div>
              </CodeLine>

              <CodeLine number={7} />

              <CodeLine number={8}>
                <div className="flex-1 min-w-0">
                  <span className="text-pink-300">import</span>{' '}
                  <span className="text-gray-300">&#123;</span>
                </div>
              </CodeLine>

              <CodeLine number={9}>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0 break-words">
                  <span className="text-gray-300">Claude Code</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">OpenClaw</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">Figma</span>
                </div>
              </CodeLine>

              <CodeLine number={10}>
                <div className="flex-1 min-w-0 break-words">
                  <span className="text-gray-300">&#125; </span>
                  <span className="text-pink-300">from</span>{' '}
                  <span className="text-[#FFB86C]">&apos;my_more_useful_tech_stack&apos;</span>
                  <span className="text-gray-300">;</span>
                </div>
              </CodeLine>

              <CodeLine number={11} />
              <CodeLine number={12} />

              <CodeLine number={13}>
                <div className="flex-1 min-w-0 break-words">
                  <span className="text-gray-300">
                    MY CV:&nbsp;
                    <a
                      href="/WANG_KUANYI.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFB86C] hover:underline"
                    >
                      WANG_KUANYI.pdf
                    </a>
                  </span>
                </div>
              </CodeLine>

              <CodeLine number={14} />

              <CodeLine number={15} className="bg-red-900/20 hover:bg-red-900/30">
                <div className="flex-1 min-w-0 break-words">
                  <span className="text-gray-300">Hosting Pi&ntilde;ata Pitch w/ Startupfest</span>
                </div>
              </CodeLine>

              <CodeLine number={16}>
                <div className="flex-1 min-w-0 break-words">
                  <span className="text-gray-300">Curr. @ Morgan Stanley &amp; </span>
                  <span className="text-cyan-300">CS @ Waterloo</span>
                </div>
              </CodeLine>

              <CodeLine number={17}>
                <div className="flex-1 min-w-0 break-words">
                  <span className="text-gray-300">Loving MedTech &amp; Golfing</span>
                </div>
              </CodeLine>

              <CodeLine number={18} />
              <CodeLine number={19} />
              <CodeLine number={20} />
              <CodeLine number={21} />

              <CodeLine number={22}>
                <div className="flex-1 min-w-0 break-words">
                  <span className="text-gray-300">
                    438-722-0688 |{' '}
                    <a
                      href="mailto:kuanyi.wa807@gmail.com"
                      className="text-blue-400 hover:underline"
                    >
                      kuanyi.wang0807@gmail.com
                    </a>
                  </span>
                </div>
              </CodeLine>

              <CodeLine number={23} />
              <CodeLine number={24} />
              <CodeLine number={25} />

              <CodeLine number={26}>
                <div className="flex-1 min-w-0 break-words">
                  <span className="text-gray-300">i literally can&apos;t stop talking:</span>
                </div>
              </CodeLine>

              <CodeLine number={27}>
                <div className="flex-1 min-w-0">
                  <a
                    href="https://www.linkedin.com/in/kuan-yi-wang-443871319/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </CodeLine>

              <CodeLine number={28}>
                <div className="flex-1 min-w-0">
                  <a
                    href="https://www.instagram.com/kuanus_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-300 hover:underline"
                  >
                    Instagram
                  </a>
                </div>
              </CodeLine>

              <CodeLine number={29}>
                <div className="flex-1 min-w-0">
                  <a
                    href="https://luma.com/user/kuans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:underline"
                  >
                    Lu.ma
                  </a>
                </div>
              </CodeLine>

              <CodeLine number={30}>
                <div className="flex-1 min-w-0">
                  <a
                    href="https://github.com/AcastaPaloma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </CodeLine>

              <CodeLine number={31} />
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

export default KuanYiWang
