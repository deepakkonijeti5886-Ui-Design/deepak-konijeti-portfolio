import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface LetterIntroWordmarkProps {
  wordmark?: string;
  onAnimationComplete?: () => void;
  onStartParticles?: () => void;
  onScrollToContact?: () => void;
  onScrollToAbout?: () => void;
}

export const LetterIntroWordmark: React.FC<LetterIntroWordmarkProps> = ({
  wordmark = 'DEEPAK',
  onAnimationComplete,
  onStartParticles,
  onScrollToContact,
  onScrollToAbout
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleBoxRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  // Animation sequence states:
  // 'blank': black screen / nothing visible
  // 'deepak_letters': letters D-E-E-P-A-K animate in one by one with glowing aura
  // 'deepak_hold': full DEEPAK glows
  // 'deepak_fadeout': DEEPAK smoothly dissolves away
  // 'portfolio_in': PORTFOLIO letters zoom & reveal into place
  // 'portfolio_settled': settled down to bottom bar, revealing the particle face behind it
  const [phase, setPhase] = useState<
    'blank' | 'deepak_letters' | 'deepak_hold' | 'deepak_fadeout' | 'portfolio_in' | 'portfolio_settled'
  >('blank');

  const [deepakRevealed, setDeepakRevealed] = useState<number>(0);
  const [portfolioRevealed, setPortfolioRevealed] = useState<number>(0);
  const [isAgentMiniOpen, setIsAgentMiniOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'video' | 'terminal'>('video');

  const deepakChars = wordmark.split('');
  const portfolioChars = 'PORTFOLIO'.split('');

  useEffect(() => {
    let isCancelled = false;
    const timeouts: NodeJS.Timeout[] = [];

    // Stage 0: Blank screen for 300ms
    timeouts.push(
      setTimeout(() => {
        if (isCancelled) return;
        setPhase('deepak_letters');

        // Stage 1: Reveal D - E - E - P - A - K one by one (120ms each)
        let count = 0;
        const letterInterval = setInterval(() => {
          if (isCancelled) {
            clearInterval(letterInterval);
            return;
          }
          count++;
          setDeepakRevealed(count);

          if (count >= deepakChars.length) {
            clearInterval(letterInterval);

            // Stage 2: Hold DEEPAK briefly for 500ms
            timeouts.push(
              setTimeout(() => {
                if (isCancelled) return;
                setPhase('deepak_hold');

                // Stage 3: DEEPAK dissolves & disappears smoothly
                timeouts.push(
                  setTimeout(() => {
                    if (isCancelled) return;
                    setPhase('deepak_fadeout');

                    // Stage 4: Trigger particle face to emerge & start PORTFOLIO reveal
                    timeouts.push(
                      setTimeout(() => {
                        if (isCancelled) return;
                        setPhase('portfolio_in');
                        onStartParticles?.(); // particle face begins forming!

                        // Reveal P - O - R - T - F - O - L - I - O letters
                        let pCount = 0;
                        const pInterval = setInterval(() => {
                          if (isCancelled) {
                            clearInterval(pInterval);
                            return;
                          }
                          pCount++;
                          setPortfolioRevealed(pCount);

                          if (pCount >= portfolioChars.length) {
                            clearInterval(pInterval);

                            // Stage 5: Move PORTFOLIO to settled bottom position
                            timeouts.push(
                              setTimeout(() => {
                                if (isCancelled) return;
                                setPhase('portfolio_settled');

                                if (titleBoxRef.current) {
                                  const isMobile = window.innerWidth < 768;
                                  gsap.to(titleBoxRef.current, {
                                    top: isMobile ? '38%' : '83%',
                                    duration: 1.1,
                                    ease: 'power3.out',
                                    onComplete: () => {
                                      onAnimationComplete?.();
                                    }
                                  });
                                }

                                if (subtitleRef.current && actionsRef.current) {
                                  gsap.fromTo(
                                    [subtitleRef.current, actionsRef.current],
                                    { y: 25, opacity: 0 },
                                    { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'power3.out' }
                                  );
                                }
                              }, 350)
                            );
                          }
                        }, 75);
                      }, 500)
                    );
                  }, 500)
                );
              }, 450)
            );
          }
        }, 120);
      }, 300)
    );

    return () => {
      isCancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [wordmark]);

  return (
    <div ref={containerRef} className="relative w-full h-full pointer-events-none select-none">
      {/* INITIAL BLANK SCREEN OVERLAY (Fades smoothly out) */}
      <div
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-700 pointer-events-none ${
          phase === 'blank' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* STAGE 1 & 2: DEEPAK LETTERS CINEMATIC REVEAL & DISSOLVE */}
      {(phase === 'deepak_letters' || phase === 'deepak_hold' || phase === 'deepak_fadeout') && (
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center w-full px-4 transition-all duration-500 ease-out ${
            phase === 'deepak_fadeout' ? 'opacity-0 scale-105 blur-md' : 'opacity-100 scale-100 blur-0'
          }`}
        >
          <span className="text-xs md:text-sm font-mono uppercase tracking-[0.35em] text-emerald-400/80 mb-3 animate-pulse">
            Introducing
          </span>
          <h1 className="text-[17vw] md:text-[11rem] lg:text-[14rem] font-black tracking-tight leading-none uppercase font-sans flex items-center justify-center">
            {deepakChars.map((char, i) => {
              const isVisible = i < deepakRevealed;
              return (
                <span
                  key={i}
                  style={{
                    transitionDelay: `${i * 25}ms`
                  }}
                  className={`inline-block transition-all duration-400 transform ${
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100 filter drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500'
                      : 'opacity-0 translate-y-10 scale-75'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
              UI Developer • Frontend Engineer
            </span>
          </div>
        </div>
      )}

      {/* STAGE 3 & 4: PORTFOLIO LETTERS REVEAL & FINAL DOCK POSITION */}
      {(phase === 'portfolio_in' || phase === 'portfolio_settled') && (
        <div
          ref={titleBoxRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center md:items-start w-full px-6 md:px-12 lg:px-16 max-w-7xl transition-all duration-700 pointer-events-none"
          style={{ top: phase === 'portfolio_settled' ? '83%' : '50%' }}
        >
          {/* Giant PORTFOLIO title docked at the lower boundary, scaled gracefully for laptops */}
          <h1 className="w-full text-center md:text-left text-[11vw] sm:text-[9.5vw] md:text-[6.2rem] lg:text-[7.4rem] xl:text-[8.5rem] font-extrabold tracking-[-0.04em] drop-shadow-2xl leading-none uppercase text-metallic font-display select-none">
            <span className="inline-flex tracking-[-0.03em] whitespace-nowrap">
              {portfolioChars.map((char, i) => {
                const isVisible = i < portfolioRevealed;
                return (
                  <span
                    key={i}
                    className={`inline-block transition-all duration-300 transform ${
                      isVisible
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 -translate-y-8 scale-90'
                    } ${i < 4 ? 'text-white drop-shadow-[0_10px_35px_rgba(255,255,255,0.2)]' : 'text-gray-300'}`}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          </h1>

          {/* Sub-hero info row */}
          <div
            ref={subtitleRef}
            className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 md:mt-3 opacity-0 pointer-events-auto"
          >
            <div className="flex items-center gap-2">
              <p className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-white">
                UI Developer{' '}
                <span className="font-light italic text-gray-300 font-editorial text-xl md:text-2xl lg:text-3xl">
                  & Frontend Engineer (React / TypeScript / Next.js)
                </span>
              </p>
            </div>

            <div ref={actionsRef} className="flex items-center gap-3">
              <button
                onClick={onScrollToAbout}
                aria-label="Scroll to About section"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/60 hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer backdrop-blur-sm"
              >
                <svg
                  className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="7" x2="17" y2="17" />
                  <polyline points="17 7 17 7 17 17" />
                </svg>
              </button>

              <button
                onClick={onScrollToContact}
                className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/20 bg-black/60 hover:bg-white text-white hover:text-black text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm shadow-lg"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
