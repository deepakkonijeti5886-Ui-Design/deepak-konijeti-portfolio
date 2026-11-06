import React, { useEffect, useState } from 'react';

export const ScrollProgressHUD: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top sleek gradient progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/[0.04]">
        <div
          className="h-full bg-gradient-to-r from-white/40 via-emerald-400 to-amber-300 shadow-[0_0_12px_rgba(52,211,153,0.7)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating minimalistic scroll percentage pill */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0a0a0d]/80 border border-white/10 backdrop-blur-md shadow-2xl text-[10px] font-mono tracking-widest text-zinc-400 select-none pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-zinc-200 font-semibold">{Math.round(scrollProgress)}%</span>
        <span className="text-zinc-500">READ</span>
      </div>
    </>
  );
};
