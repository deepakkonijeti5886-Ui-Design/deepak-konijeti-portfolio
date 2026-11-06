import React from 'react';
import { PORTFOLIO_CONFIG, STACK_ROWS } from '../data/portfolioData';
import { GlowCard } from './GlowCard';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen bg-[#050505] text-white pt-24 pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header & Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Label + Sleek Metallic "Intro" + 3D Holographic Portrait Card */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase mb-4">
              ABOUT ME
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-normal leading-tight text-metallic uppercase select-none font-display inline-block pb-4 pr-4">
              INTRO
            </h2>

            {/* Premium 3D Portrait Frame */}
            <div className="relative mt-2 max-w-sm group">
              {/* Ambient holographic backlight */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#14161f] to-[#0a0a0d] p-3 shadow-2xl transition-all duration-500 group-hover:border-white/35 group-hover:scale-[1.02]">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/60">
                  <img
                    src="/assets/deepak_portrait.jpg"
                    alt="Deepak Konijeti - Senior UI Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Corner Accent Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[10px] font-mono font-semibold text-white tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>DEEPAK K.</span>
                  </div>

                  {/* Bottom Role Info on Portrait */}
                  <div className="absolute bottom-3.5 inset-x-3.5 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white tracking-wide">Deepak Konijeti</div>
                      <div className="text-[10px] font-mono text-emerald-400">UI Developer • 5+ Yrs TCS</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
