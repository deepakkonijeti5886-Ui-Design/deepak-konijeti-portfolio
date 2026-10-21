import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            {PORTFOLIO_CONFIG.name}
          </p>
          <p className="text-xs text-gray-500 font-light mt-1">
            © {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. Crafted with React, WebGL & Tailwind.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-xs text-gray-400 font-light hidden sm:block">
            {PORTFOLIO_CONFIG.availability}
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full border border-white/15 hover:border-white text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
