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
            <div className="font-mono text-[8px] xs:text-[9px] pt-4 sm:text-xs md:text-sm lg:text-base">
              {/* Line 1 - Global Talent Forum header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">1</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 truncate">Global Talent Forum</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">November 2024 - Present</span>
                </div>
              </div>

              {/* Line 2 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">2</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">Co-Founder & Head of Communications</span>
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
                  <span className="text-gray-300">• Co-founded GTF, a platform dedicated to identifying talent and empowering student</span>
                </div>
              </div>

              {/* Line 5 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">5</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  entrepreneurs.</span>
                </div>
              </div>

              {/* Line 6 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">6</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Communications for Piñata Pitch ($17k raised, 450+ students, supported by Pear</span>
                </div>
              </div>

              {/* Line 7 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">7</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  VC, Harvard & Berkeley) and Unfounders at a16z Tech Week, 500+ participants, with</span>
                </div>
              </div>

              {/* Line 8 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">8</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  backing from Cluely, Pally AI (YC S25), Foundess, OpenNote (YC S25).</span>
                </div>
              </div>

              {/* Line 9 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">9</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Designed the CRM system for 500+ students part of the GTF.</span>
                </div>
              </div>

              {/* Line 10 - Bullet 4 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">10</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Lead Organizer of AI BUILD DAY w/ Piñata Pitch x <span className="text-green-400">Shopify</span> x </span>
                  <span className="text-gray-300">ElanTech</span>
                  <span className="text-gray-300">.</span>
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

              {/* Line 13 - SEPARATOR */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">13</span>
                <div className="flex-1 flex justify-center">
                  <span className="text-gray-300">// SEPARATOR //</span>
                </div>
              </div>

              {/* Line 14 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">14</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 15 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">15</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 16 - Neuropoly header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">16</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 truncate">Neuropoly, Polytechnique Montréal</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">June 2024 - Present</span>
                </div>
              </div>

              {/* Line 17 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">17</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">Research & Development Intern</span>
                </div>
              </div>

              {/* Line 18 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">18</span>
                <div className="flex-1 min-w-0"></div>
              </div>

              {/* Line 19 - Bullet 1 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">19</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Trained and fine-tuned various nn-UNet models to automate the segmentation of</span>
                </div>
              </div>

              {/* Line 20 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">20</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  spinal cord multiple sclerosis lesions on contrast and modality agnostic medical</span>
                </div>
              </div>

              {/* Line 21 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">21</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  images.</span>
                </div>
              </div>

              {/* Line 22 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">22</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Contributed to CART, optimizing the segmentation and annotation speed of Magnetic</span>
                </div>
              </div>

              {/* Line 23 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">23</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  Resonance Imaging (MRI) and Computed Tomography (CT) images by over 80%.</span>
                </div>
              </div>

              {/* Line 24 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">24</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Engaged in quality control of segmentation mask inferences on lesions of the</span>
                </div>
              </div>

              {/* Line 25 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">25</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  spinal cord.</span>
                </div>
              </div>

              {/* Line 26 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">26</span>
                <div className="flex-1 min-w-0"></div>
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

              {/* Line 31 - Re-Pair Genomics header */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">31</span>
                <div className="flex-1 flex items-center justify-between min-w-0 gap-2 sm:gap-3 md:gap-4">
                  <span className="text-green-400 truncate">Re:Pair Genomics</span>
                  <span className="text-gray-300 text-right shrink-0 whitespace-nowrap text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs lg:text-sm">February 2025 - April 2025</span>
                </div>
              </div>

              {/* Line 32 - Role */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">32</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">Web Development Intern</span>
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
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Designed and revamped company website to highlight recent achievements and</span>
                </div>
              </div>

              {/* Line 35 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">35</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  products.</span>
                </div>
              </div>

              {/* Line 36 - Bullet 2 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">36</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Refactored back-end of website using cloud-based and serverless emailing</span>
                </div>
              </div>

              {/* Line 37 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">37</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">  solutions.</span>
                </div>
              </div>

              {/* Line 38 - Bullet 3 */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">38</span>
                <div className="flex-1 min-w-0 truncate">
                  <span className="text-gray-300">• Curated documentation for future development and future interns.</span>
                </div>
              </div>

              {/* Line 39 - empty */}
              <div className="h-3 xs:h-[14px] sm:h-4 md:h-5 lg:h-[22px] flex items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-5 lg:gap-6 hover:bg-blue-500/10 transition-colors">
                <span className="text-gray-500 select-none w-3 xs:w-3.5 sm:w-4 md:w-6 text-right shrink-0 text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs">39</span>
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
