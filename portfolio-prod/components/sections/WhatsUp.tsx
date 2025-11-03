/// ========== Components ========== //
import TopLeftPath from '../TopLeftPath'
import LineNumbers from '../layout/LineNumbers'

import React from 'react'

const WhatsUp = () => {
  return (
    <section id="projects" className="min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:pb-12 md:pb-16 lg:pb-20 pt-0 flex flex-col scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <TopLeftPath path={["portfolio", "app", "page.tsx", "Projects"]} />

        {/* Section content with line numbers */}
        <div className="flex-1 flex flex-col justify-between pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4">
          {/* Opening tag */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mb-4 sm:mb-5 md:mb-6 text-white">
              &lt;Projects
            </h1>

            {/* Code content with inline line numbers */}
            <div className="font-mono text-[8px] xs:text-[9px] pt-4 sm:text-xs md:text-sm lg:text-base">
              {/* Line 1 - Twin header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">1</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 truncate">Twin</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">October 2025 - Present</span>
                </div>
              </div>

              {/* Line 2 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">2</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">Lead Developer @HackTheNorth &apos;25</span>
                </div>
              </div>

              {/* Line 3 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">3</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 4 - Bullet 1 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">4</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Submitted and pitched at Hack The North, Canada&apos;s most prestigious hackathon.</span>
                </div>
              </div>

              {/* Line 5 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">5</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Launched Twin v.0, an agentic AI system looking over your shoulder, always.</span>
                </div>
              </div>

              {/* Line 6 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">6</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 7 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">7</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 8 - SEPARATOR */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">8</span>
                <div className="flex-1 flex justify-center">
                  <span className="text-gray-300">// SEPARATOR //</span>
                </div>
              </div>

              {/* Line 9 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">9</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 10 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">10</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 11 - Tempulse header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">11</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 truncate">Tempulse</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">April 2025 - Present</span>
                </div>
              </div>

              {/* Line 12 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">12</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">Lead Developer</span>
                </div>
              </div>

              {/* Line 13 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">13</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 14 - Bullet 1 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">14</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Served as lead developer of Tempulse, a productivity app providing time insights.</span>
                </div>
              </div>

              {/* Line 15 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">15</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Launched to local community in Montreal, in alpha version.</span>
                </div>
              </div>

              {/* Line 16 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">16</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Pitched and gathered waitlist at Shopify&apos;s Builder Sundays.</span>
                </div>
              </div>

              {/* Line 17 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">17</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 18 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">18</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 19 - SEPARATOR */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">19</span>
                <div className="flex-1 flex justify-center">
                  <span className="text-gray-300">// SEPARATOR //</span>
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

              {/* Line 22 - Fun text */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">22</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-[#FFB86C] ">some fiddling around here and there, currently learning quantum computing...</span>
                </div>
              </div>

              {/* Line 23 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">23</span>
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

export default WhatsUp