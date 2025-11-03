"use client"

import React from 'react'
import Image from 'next/image'

const Header = () => {
  const navItems = [
    { name: 'about', color: 'bg-[#6B9FFF]', href: '#about' },
    { name: 'experience', color: 'bg-[#FF8C42]', href: '#experience' },
    { name: 'projects', color: 'bg-[#4ADE80]', href: '#projects' },
    { name: 'contact', color: 'bg-[#FFE66D]', href: '#contact' }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <nav className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((item, index) => (
              <React.Fragment key={item.name}>
                {/* Group for ball + label */}
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex flex-col items-center relative group cursor-pointer transition-transform hover:scale-110 active:scale-95"
                >
                  <div className="w-8 h-8 sm:w-4 sm:h-4 md:w-7 md:h-7 lg:w-10 lg:h-10 flex items-center justify-center shrink-0">
                    <Image
                      src="/assets/ball4.svg"
                      alt=""
                      width={56}
                      height={56}
                      className="w-full h-full transition-opacity group-hover:opacity-80"
                    />
                  </div>

                  {/* Label below, spaced tightly */}
                  <span className="text-[10px] sm:text-xs md:text-sm font-mono text-white group-hover:text-gray-400 mt-1 sm:mt-1.5 text-center transition-colors">
                    {item.name}
                  </span>
                </a>

                {/* Bar between circles */}
                {index < navItems.length - 1 && (
                  <div className="relative flex items-center">
                    {/* Adjust bar position slightly upward */}
                    <div className="w-10 sm:w-12 md:w-16 lg:w-24 sm:h-1 rounded-xl bg-white -translate-y-2 sm:-translate-y-3" />
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