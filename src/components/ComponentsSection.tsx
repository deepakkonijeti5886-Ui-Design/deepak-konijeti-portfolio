import React, { useRef, useState } from 'react';
import { COMPONENTS_CATALOG, PORTFOLIO_CONFIG } from '../data/portfolioData';

export const ComponentsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalKb = COMPONENTS_CATALOG.reduce((acc, c) => acc + c.sizeKb, 0).toFixed(1);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="components" className="relative min-h-screen bg-[#050505] text-white pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase mb-3 block">
              CATALOGUE & UI LAB
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none">
              Plain HTML, CSS & JS
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light mt-4 max-w-2xl leading-relaxed">
              {COMPONENTS_CATALOG.length} components, {totalKb} KB in total, every one of them plain HTML, CSS and JavaScript with zero framework dependencies and no build step.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* WhatsApp direct talk */}
            <a
              href={`https://wa.me/${PORTFOLIO_CONFIG.whatsapp}?text=Hi%20Deepak%2C%20I'd%20like%20to%20discuss%20your%20UI%20components%20and%20design%20systems.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-white/25 hover:border-white text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:bg-white hover:text-black rounded-full inline-flex items-center gap-2"
            >
              <span>Talk about components</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            {/* Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll components left"
                className="w-11 h-11 rounded-full border border-white/15 hover:border-white text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll components right"
                className="w-11 h-11 rounded-full border border-white/15 hover:border-white text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Snap Reel Carousel */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4"
        >
          {COMPONENTS_CATALOG.map((item, idx) => (
            <div
              key={item.slug}
              onMouseEnter={() => setActiveIndex(idx)}
              className="relative shrink-0 snap-start w-[280px] sm:w-[320px] lg:w-[340px] flex flex-col group border border-white/10 hover:border-white/35 rounded-2xl overflow-hidden bg-[#0d0d11] transition-all duration-300"
            >
              {/* Video Reel or Poster */}
              <div className="relative w-full aspect-[9/16] overflow-hidden bg-black/60">
                <video
                  src={`/photos/reels/${item.slug}.mp4`}
                  poster={`/photos/reels/${item.slug}.jpg`}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-widest text-gray-300">
                  {item.category}
                </div>

                {/* Size / Specs Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono text-emerald-400 font-bold">
                  {item.sizeKb} KB
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-transparent to-transparent opacity-80" />
              </div>

              {/* Bottom Card Info */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-[#0d0d11] border-t border-white/5">
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-semibold">{item.badge}</span>
                  </div>

                  <p className="text-xs text-gray-400 font-light line-clamp-2 leading-relaxed mb-4">
                    {item.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  <span className="text-gray-500">{item.deps === 0 ? '0 dependencies' : `${item.deps} dependency`}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Architected by Deepak
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* End Callout Card: The Full Catalogue */}
          <div className="relative shrink-0 snap-start w-[280px] sm:w-[320px] lg:w-[340px] flex flex-col rounded-2xl overflow-hidden border-2 border-orange-500/50 bg-[#161214] p-8 justify-between text-left">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-400/80 mb-6 block font-mono">
                THE FULL CATALOGUE
              </span>
              <p className="text-6xl font-black tracking-tighter text-white leading-none">
                All
              </p>
              <p className="text-xl font-bold tracking-tight text-gray-200 mt-2">
                components & templates
              </p>
              <p className="text-sm text-gray-400 font-light mt-4 leading-relaxed">
                Handcrafted micro-interactions, responsive design systems, and animated UI kits created by Deepak.
              </p>
            </div>

            <a
              href={`https://wa.me/${PORTFOLIO_CONFIG.whatsapp}?text=Hi%20Deepak%2C%20I'd%20like%20to%20get%20access%20to%20your%20full%20UI%20catalogue.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs tracking-wider uppercase text-center transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <span>Inquire Catalogue →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
