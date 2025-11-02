import React from 'react'

interface TopLeftPathProps {
  path: string[];
}

const TopLeftPath = ({ path }: TopLeftPathProps) => {
  return (
    <div className="font-mono text-[10px] sm:text-xs md:text-sm text-gray-400 mb-4 sm:mb-6 md:mb-8">
      <span className="inline-flex flex-wrap items-center gap-1 sm:gap-2">
        {path.map((segment, index) => (
          <React.Fragment key={index}>
            <span className="hover:text-white transition-colors cursor-default">
              {segment}
            </span>
            {index < path.length - 1 && (
              <span className="text-gray-600">&gt;</span>
            )}
          </React.Fragment>
        ))}
      </span>
    </div>
  )
}

export default TopLeftPath