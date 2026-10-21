import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/portfolioData';

interface ServiceSectionProps {
  onNavigateToProjects?: () => void;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({ onNavigateToProjects }) => {
  const [openId, setOpenId] = useState<string | null>('01');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="service" className="relative min-h-screen bg-[#050505] text-white pt-24 pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Right-aligned Massive Metallic Title */}
        <div className="flex flex-col items-end mb-16 md:mb-24 select-none">
          <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-gray-400 uppercase mb-3 text-right">
            SERVICES & EXPERTISE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] text-right text-metallic uppercase font-display">
            WHAT WE
            <br />
            CAN DO
          </h2>
        </div>

        {/* Accordion Rows */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {SERVICES_LIST.map((service) => {
            const isOpen = openId === service.id;

            return (
              <div key={service.id} className="transition-colors duration-200">
                {/* Header Row */}
                <button
                  onClick={() => toggleItem(service.id)}
                  aria-expanded={isOpen}
                  className="w-full py-8 md:py-10 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-baseline gap-6 md:gap-12">
                    {/* Number */}
                    <span className="text-xl md:text-2xl font-mono font-bold text-gray-500 group-hover:text-white transition-colors duration-200">
                      {service.id}
                    </span>

                    {/* Service Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-white group-hover:text-gray-200 transition-colors duration-200">
                      {service.title}
                    </h3>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? 'rotate-90 text-white' : 'group-hover:translate-x-0.5 group-hover:translate-y-0.5'
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="7" x2="17" y2="17" />
                      <polyline points="17 7 17 17 7 17" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content Panel */}
                {isOpen && (
                  <div className="pb-10 pl-12 md:pl-20 pr-4 animate-in slide-in-from-top-3 fade-in-50 duration-300">
                    <div className="max-w-3xl">
                      <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.capabilities.map((cap, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      {service.buttonText && onNavigateToProjects && (
                        <button
                          onClick={onNavigateToProjects}
                          className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          {service.buttonText} →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
