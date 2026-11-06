import React from 'react';
import { PORTFOLIO_CONFIG, STACK_ROWS } from '../data/portfolioData';
import { GlowCard } from './GlowCard';

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
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-normal leading-tight text-metallic uppercase select-none font-display inline-block pb-2 pr-4">
              INTRO
            </h2>
          </div>

          {/* Right Column: Sleek Obsidian Card with Reactive Spotlight Glow */}
          <div className="lg:col-span-7">
            <GlowCard
              glowColor="rgba(52, 211, 153, 0.08)"
              borderGlowColor="rgba(255, 255, 255, 0.3)"
              className="rounded-3xl p-8 sm:p-10 md:p-12 bg-[#0c0d11]/90 border border-white/10 backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Subtle top glare highlight + ambient shimmer */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute -inset-x-20 top-0 h-24 animate-shimmer pointer-events-none opacity-40" />

              <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed sm:leading-relaxed">
                Hey, I'm <strong className="font-bold text-white">Deepak</strong>. A UI Developer & Frontend Engineer with 5+ years of professional experience at Tata Consultancy Services (TCS), building scalable, high-performance UI components and applications for large-scale eCommerce platforms serving 10m+ users across Africa region.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed mt-4 sm:mt-6">
                Contributed to the growth of Clicks South Africa (clicks.co.za) by developing and managing content-driven experiences through SAP Commerce SmartEdit and redesigning the complete checkout flow. Focused on creating a smoother, more intuitive user journey that improved the overall online shopping experience.
              </p>

              {/* Quick credentials badges with micro hover animations */}
              <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/6 text-xs font-mono text-gray-400">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-white transition-all duration-200 cursor-default">
                  ⚡ 5+ Years at TCS
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-default">
                  🏢 TCS UI Developer
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-white transition-all duration-200 cursor-default">
                  🏆 TCS On-the-Spot Award
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:border-amber-400 hover:bg-amber-500/20 transition-all duration-200 cursor-default">
                  ⏱️ 90 Days Notice Period
                </span>
              </div>
            </GlowCard>
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
