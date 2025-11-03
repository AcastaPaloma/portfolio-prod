export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#0a0a0a] text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 mt-auto scroll-mt-24">
      <hr className="w-[75vw] mx-auto my-6 rounded-xl border-0 h-0.25 bg-white" />
      <div className="max-w-7xl mx-auto relative">
        {/* Contact Object - freely positionable */}
        <div className="font-mono text-xs sm:text-sm md:text-base lg:text-lg w-fit">
          <div className="mb-2 sm:mb-3">
            <span className="text-white">Contact</span>
            <span className="text-white ml-1 sm:ml-2">=</span>
            <span className="text-white ml-1 sm:ml-2">{'{'}</span>
          </div>

          <div className="pl-4 sm:pl-6 md:pl-8 space-y-1 sm:space-y-2">
            {/* Phone */}
            <div className="flex flex-wrap items-start sm:items-center">
              <span className="text-white">&quot;nbr&quot;:</span>
              <span className="text-[#FFB86C] ml-1 sm:ml-2">&quot;(+1) 438-722-0688&quot;</span>
              <span className="text-white">,</span>
            </div>

            {/* Email */}
            <div className="flex flex-wrap items-start sm:items-center">
              <span className="text-white">&quot;email&quot;:</span>
              <a
                href="mailto:kuanyi.wang0906@gmail.com"
                className="text-blue-400 ml-1 sm:ml-2 break-all hover:underline"
              >
                kuanyi.wang0906@gmail.com
              </a>
            <span className="text-white">,</span>
            </div>

            {/* Website */}
            <div className="flex flex-wrap items-start sm:items-center">
              <span className="text-white">&quot;website&quot;:</span>
              <span className="text-[#FFB86C] ml-1 sm:ml-2 break-all">&quot;www.kuant.space&quot;</span>
              <span className="text-white">,</span>
            </div>

            {/* More links */}
            <div className="flex flex-wrap items-start sm:items-center">
              <span className="text-white">"more_links":</span>
              <span className="text-[#FFB86C] ml-1 sm:ml-2 break-all">
                [
                <a
                  href="https://www.pinatapitch.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFB86C]  hover:underline"
                >
                  "www.pinatapitch.tech"
                </a>,&nbsp;
                <a
                  href="https://www.unfounders.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFB86C]  hover:underline"
                >
                  "www.unfounders.com"
                </a>
                ]
              </span>
            </div>
          </div>

          <div className="mt-2 sm:mt-3">
            <span className="text-white">{'}'}</span>
          </div>
        </div>

        {/* Console log message - freely positionable */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 ml-auto w-fit">
          <p className="font-mono text-xs sm:text-sm md:text-base lg:text-lg text-[#50FA7B]">
            console.log(&quot;Appreciate the visit.&quot;)
          </p>
        </div>
      </div>
    </footer>
  );
}
