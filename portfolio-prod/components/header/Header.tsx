import React from 'react'
import Image from 'next/image'

const Header = () => {
  const navItems = [
    { name: 'about', color: 'bg-[#6B9FFF]' },
    { name: 'experience', color: 'bg-[#FF8C42]' },
    { name: 'projects', color: 'bg-[#4ADE80]' },
    { name: 'contact', color: 'bg-[#FFE66D]' }
  ]

  return (
    <header className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <nav className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="flex items-center justify-center gap-2">
            {navItems.map((item, index) => (
              <React.Fragment key={item.name}>
                {/* Group for ball + label */}
                <div className="flex flex-col items-center relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center shrink-0">
                    <Image
                      src="/assets/ball.svg"
                      alt=""
                      width={56}
                      height={56}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Label below, spaced tightly */}
                  <span className="text-[10px] sm:text-xs md:text-sm font-mono text-gray-700 mt-1 sm:mt-1.5 text-center">
                    {item.name}
                  </span>
                </div>

                {/* Bar between circles */}
                {index < navItems.length - 1 && (
                  <div className="relative flex items-center">
                    {/* Adjust bar position slightly upward */}
                    <div className="w-10 sm:w-12 md:w-16 lg:w-20 h-1.5 sm:h-2 rounded-xl bg-gray-800 -translate-y-2 sm:-translate-y-3" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header