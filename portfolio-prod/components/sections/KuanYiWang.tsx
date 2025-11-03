"use client"

/// ========== Components ========== //
import TopLeftPath from '../TopLeftPath'
import LineNumbers from '../layout/LineNumbers'

import React, { useRef } from 'react'
const KuanYiWang = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:pb-30 md:pb-50 lg:pb-100 sm:pt-6 md:pt-10 lg:pt-15 pt-0 flex flex-col scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <TopLeftPath path={["portfolio", "app", "page.tsx", "Home"]} />

        {/* Section content with line numbers */}
        <div className="flex-1 flex flex-col justify-between pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4">
          {/* Opening tag */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mb-4 sm:mb-5 md:mb-6 text-white">
              &lt;KuanYiWang
            </h1>

            {/* Code content with inline line numbers */}
            <div className="font-mono text-[8px] xs:text-[9px] pt-4 sm:text-xs md:text-sm lg:text-base">
              {/* Line 1 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">1</span>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-300">import</span>{' '}
                  <span className="text-blue-400">React</span>
                  <span className="text-gray-300">, &#123;</span>
                </div>
              </div>

              {/* Line 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">2</span>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0 truncate">
                  <span className="text-blue-400">TypeScript</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-green-400">JavaScript</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-orange-400">HTML</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-cyan-400">TailWind CSS</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-gray-300">Next.js</span>
                </div>
              </div>

              {/* Line 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">3</span>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0">
                  <span className="text-blue-400">Python, Sci-kit Learn</span>
                  <span className="text-gray-300">,</span>
                </div>
              </div>

              {/* Line 4 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">4</span>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0 truncate">
                  <span className="text-yellow-400">Google Firebase</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-green-400">Cloud Functions</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-cyan-400">FastAPI</span>
                  <span className="text-gray-300">,</span>
                </div>
              </div>

              {/* Line 5 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">5</span>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0">
                  <span className="text-green-400">Supabase</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-blue-400">SQL</span>
                </div>
              </div>

              {/* Line 6 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">6</span>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-300">&#125; </span>
                  <span className="text-gray-300">from</span>{' '}
                  <span className="text-gray-300">&apos;my_tech_stack&apos;</span>
                  <span className="text-gray-300">;</span>
                </div>
              </div>

              {/* Line 7 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">7</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 8 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">8</span>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-300">import</span>{' '}
                  <span className="text-gray-300">&#123;</span>
                </div>
              </div>

              {/* Line 9 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">9</span>
                <div className="pl-2 xs:pl-3 sm:pl-4 md:pl-8 flex-1 min-w-0 truncate">
                  <span className="text-blue-400">Cursor</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-blue-400">GitHub Copilot</span>
                  <span className="text-gray-300">, </span>
                  <span className="text-cyan-400">Figma</span>
                </div>
              </div>

              {/* Line 10 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">10</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">&#125; </span>
                  <span className="text-gray-300">from</span>{' '}
                  <span className="text-gray-300">&apos;my_more_useful_tech_stack&apos;</span>
                  <span className="text-gray-300">;</span>
                </div>
              </div>

              {/* Line 11 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">11</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 12 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">12</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 13 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">13</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 14 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">14</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 15 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 bg-red-900/20 hover:bg-red-900/30 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">15</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">What&apos;s up - My name is Kuan, currently hosting Piñata Pitch,</span>
                </div>
              </div>

              {/* Line 16 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">16</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">Montreal&apos;s largest student tech pitch competition.</span>
                </div>
              </div>

              {/* Line 17 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">17</span>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-300">I Golf</span>
                </div>
              </div>

              {/* Line 18 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">18</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">I love Learning Languages (1000 day streak on Duolingo, German)</span>
                </div>
              </div>

              {/* Line 19 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">19</span>
                <div className="flex-1 min-w-0">
                  <span className="text-gray-300">Loving MedTech.</span>
                </div>
              </div>

              {/* Line 20 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">20</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 21 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">21</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 22 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">22</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">
                    438-722-0688 |{" "}
                    <a
                      href="mailto:kuanyi.wang0906@gmail.com"
                      className="text-blue-400 hover:underline"
                    >
                      kuanyi.wang0906@gmail.com
                    </a>
                  </span>
                </div>
              </div>

              {/* Line 23 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">23</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 24 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">24</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 25 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">25</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 26 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">26</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">i literally can&apos;t stop talking:</span>
                </div>
              </div>

              {/* Line 27 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">27</span>
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
              </div>

              {/* Line 28 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">28</span>
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
              </div>

              {/* Line 29 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">29</span>
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
              </div>

              {/* Line 30 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">30</span>
                <div className="flex-1 min-w-0">
                  <a
                    href="https://github.com/AcastaPaloma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:underline"
                  >
                    GitHub 🤫
                  </a>
                </div>
              </div>

              {/* Line 31 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">31</span>
                <div className="flex-1 min-w-0"></div>
              </div>
            </div>
          </div>

          {/* Closing tag at bottom */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mt-8 sm:mt-10 md:mt-12 text-white">
            /&gt;
          </h1>
        </div>
      </div>
    </section>
  )
}

export default KuanYiWang