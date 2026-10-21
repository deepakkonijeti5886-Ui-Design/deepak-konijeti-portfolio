import React from 'react';
import { PORTFOLIO_CONFIG, STACK_ROWS } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen bg-[#050505] text-white pt-24 pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header & Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Label + Sleek Metallic "Intro" */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase mb-4">
              ABOUT ME
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-[-0.03em] leading-none text-metallic uppercase select-none font-display">
              Intro
            </h2>
          </div>

          {/* Right Column: Sleek Obsidian Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-8 sm:p-10 md:p-12 bg-[#0c0d11]/80 border border-white/8 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/15">
              {/* Subtle top glare highlight */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed sm:leading-relaxed">
                Hey, I'm <strong className="font-bold text-white">Deepak</strong>. A UI Developer & Frontend Engineer with 4+ years of professional experience at Tata Consultancy Services (TCS), building scalable, high-performance UI components and applications for large-scale eCommerce platforms serving 5M+ users globally.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed mt-4 sm:mt-6">
                Specializing in React.js, TypeScript, Server-Driven UI (SDUI), and conversion-optimized checkout funnels on major platforms like Clicks South Africa (+18.4% conversion uplift, 15% reduction in cart abandonment).
              </p>

              {/* Quick credentials badges */}
              <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/6 text-xs font-mono text-gray-400">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  ⚡ 4+ Years at TCS
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  🏢 Ex-TCS UI Developer
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  🏆 TCS On-the-Spot Award
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                  ● Immediate Joiner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The Stack Section */}
        <div className="mt-24 md:mt-32">
          {/* Header divider */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase shrink-0">
              THE STACK
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
          </div>

          {/* 4 Marquee Rows */}
          <div className="flex flex-col gap-3 overflow-hidden select-none py-2">
            {STACK_ROWS.map((row, rowIdx) => {
              const isEven = rowIdx % 2 === 0;
              // Duplicate items to ensure smooth infinite loop
              const displayList = [...row, ...row, ...row, ...row];

              return (
                <div
                  key={rowIdx}
                  className="relative overflow-hidden w-full flex mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                >
                  <div className={isEven ? 'animate-marquee-left' : 'animate-marquee-right'}>
                    {displayList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center px-4 py-2 mx-1.5 rounded-full bg-[#111216] border border-white/10 hover:border-white/30 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 cursor-default shadow-sm hover:scale-105"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-2 opacity-60" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
