/// ========== Components ========== //
import TopLeftPath from '../TopLeftPath'
import LineNumbers from '../layout/LineNumbers'

import React from 'react'

const WorkExperience = () => {
  return (
    <section id="experience" className="min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:pb-30 md:pb-50 lg:pb-100 pt-0 flex flex-col scroll-mt-24">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <TopLeftPath path={["portfolio", "app", "page.tsx", "WorkExperience"]} />

        {/* Section content with line numbers */}
        <div className="flex-1 flex flex-col justify-between pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4">
          {/* Opening tag */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono mb-4 sm:mb-5 md:mb-6 text-white">
              &lt;WorkExperience
            </h1>

            {/* Code content with inline line numbers */}
            <div className="font-mono text-[8px] xs:text-[9px] pt-4 sm:text-xs md:text-sm lg:text-base overflow-x-auto">
              {/* Line 1 - QEC Research header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">1</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 whitespace-nowrap">QEC Research, ISEF</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">October 2025 - Present</span>
                </div>
              </div>

              {/* Line 2 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">2</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">Researcher</span>
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
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Sparse GNN decoders for surface codes; scalable inference.</span>
                </div>
              </div>

              {/* Line 5 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">5</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• GraphSAGE hit 74.3% at d=13 with 5-7x fewer params vs MLP.</span>
                </div>
              </div>

              {/* Line 6 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">6</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">
                    • Mixed-distance training +8.9%; Team Canada at{' '}
                    <a
                      href="https://isef.net/project/phys061t-sparse-gnn-decoders-for-quantum-error-correction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFB86C] hover:underline"
                    >
                      ISEF
                    </a>
                    .
                  </span>
                </div>
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

              {/* Line 11 - Neuropoly header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">11</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 whitespace-nowrap">Neuropoly, Polytechnique Montreal</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">June 2024 - Present</span>
                </div>
              </div>

              {/* Line 12 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">12</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">Research & Development Intern</span>
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
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Trained nnU-Net models for MS spinal cord lesion segmentation.</span>
                </div>
              </div>

              {/* Line 15 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">15</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Accelerated MRI/CT annotation in{' '}
                    <a
                      href="https://github.com/SomeoneInParticular/CART"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFB86C] hover:underline"
                    >
                      CART
                    </a>
                    {' '}by 80%.
                  </span>
                </div>
              </div>

              {/* Line 16 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">16</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Performed QA on lesion masks and model inferences.</span>
                </div>
              </div>

              {/* Line 17 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">17</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 18 - SEPARATOR */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">18</span>
                <div className="flex-1 flex justify-center">
                  <span className="text-gray-300">// SEPARATOR //</span>
                </div>
              </div>

              {/* Line 19 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">19</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 20 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">20</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 21 - MariHacks header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">21</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 whitespace-nowrap">MariHacks</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">April 2025 - Present</span>
                </div>
              </div>

              {/* Line 22 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">22</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">Lead Organizer</span>
                </div>
              </div>

              {/* Line 23 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">23</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 24 - Bullet 1 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">24</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Organized Marianopolis College's flagship hackathon (300 participants).</span>
                </div>
              </div>

              {/* Line 25 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">25</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Built sponsor, mentorship, and challenge tracks across project streams.</span>
                </div>
              </div>

              {/* Line 26 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">26</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">
                    • Project:{' '}
                    <a
                      href="https://www.marihacks.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFB86C] hover:underline"
                    >
                      marihacks.com
                    </a>
                  </span>
                </div>
              </div>

              {/* Line 27 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">27</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 28 - SEPARATOR */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">28</span>
                <div className="flex-1 flex justify-center">
                  <span className="text-gray-300">// SEPARATOR //</span>
                </div>
              </div>

              {/* Line 29 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">29</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 30 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">30</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 31 - Global Talent Forum header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">31</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 whitespace-nowrap">Global Talent Forum</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">November 2024 - Present</span>
                </div>
              </div>

              {/* Line 32 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">32</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">Co-Founder & Head of Communications</span>
                </div>
              </div>

              {/* Line 33 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">33</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 34 - Bullet 1 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">34</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Built GTF to surface student talent and founder pipelines.</span>
                </div>
              </div>

              {/* Line 35 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">35</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Led comms for Piñata Pitch and a16z Tech Week activations.</span>
                </div>
              </div>

              {/* Line 36 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">36</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Designed CRM for 500+ students and community ops.</span>
                </div>
              </div>

              {/* Line 37 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">37</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 38 - SEPARATOR */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">38</span>
                <div className="flex-1 flex justify-center">
                  <span className="text-gray-300">// SEPARATOR //</span>
                </div>
              </div>

              {/* Line 39 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">39</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 40 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">40</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 41 - Re:Pair Genomics header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">41</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 whitespace-nowrap">Re:Pair Genomics</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">February 2025 - April 2025</span>
                </div>
              </div>

              {/* Line 42 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">42</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">Web Development Intern</span>
                </div>
              </div>

              {/* Line 43 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">43</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 44 - Bullet 1 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">44</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Redesigned the company site to highlight new products.</span>
                </div>
              </div>

              {/* Line 45 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">45</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Refactored backend services with serverless email workflows.</span>
                </div>
              </div>

              {/* Line 46 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">46</span>
                <div className="flex-1 min-w-0 whitespace-nowrap">
                  <span className="text-gray-300">• Delivered developer handoff docs for future interns.</span>
                </div>
              </div>

              {/* Line 47 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">47</span>
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

export default WorkExperience
