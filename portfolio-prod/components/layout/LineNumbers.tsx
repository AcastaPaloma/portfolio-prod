'use client';

import React, { useEffect, useState } from 'react';

interface LineNumbersProps {
  startFrom?: number;
}

const LineNumbers = ({ startFrom = 1 }: LineNumbersProps) => {
  const [lineCount, setLineCount] = useState(20);

  useEffect(() => {
    const updateLineCount = () => {
      const viewportHeight = window.innerHeight;

      // Get line height based on screen size
      const lineHeight = window.innerWidth < 640 ? 16 :
                        window.innerWidth < 768 ? 18 :
                        window.innerWidth < 1024 ? 20 : 22;

      // Calculate number of lines that fit in viewport, use about 70% for each section
      const calculatedLines = Math.floor((viewportHeight * 0.7) / lineHeight);
      setLineCount(Math.max(calculatedLines, 10)); // Minimum 10 lines
    };

    updateLineCount();

    // Update on resize
    window.addEventListener('resize', updateLineCount);

    return () => {
      window.removeEventListener('resize', updateLineCount);
    };
  }, []);

  return (
    <div className="shrink-0 select-none pr-3 sm:pr-4 md:pr-5 lg:pr-6 w-8 sm:w-10 md:w-12">
      <div className="flex flex-col items-end font-mono text-[10px] sm:text-xs text-gray-400">
        {Array.from({ length: lineCount }, (_, i) => (
          <div
            key={startFrom + i}
            className="h-4 sm:h-[18px] md:h-5 lg:h-[22px] leading-none flex items-center justify-end"
          >
            {startFrom + i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineNumbers;