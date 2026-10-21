import React, { useState, useEffect } from 'react';

const FUNNY_MESSAGES = [
  "Hey recruiter! 👋 Did you just click me? Guess what, Deepak is an Immediate Joiner!",
  "Looking for clean React + TypeScript code? Deepak writes code smoother than butter! 🚀",
  "TCS 4+ years under the belt, zero Sev-1 incidents! Would you like to hire Deepak? 💼",
  "Beep boop! 🤖 99 bugs in the code, fix one... 127 bugs! Just kidding, Deepak's tests always pass! 🧪",
  "Psst! Deepak can convert your wireframes into pixel-perfect 60fps UIs before you finish your coffee! ☕",
  "Would you like to contact Deepak right now? Click 'Let's Connect' below! 📬",
  "I'm Deepak's tiny AI mini-me! Floating around making sure this portfolio blows your mind! ✨",
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂"
];

interface MiniDeepakBuddyProps {
  onContactClick?: () => void;
}

export const MiniDeepakBuddy: React.FC<MiniDeepakBuddyProps> = ({ onContactClick }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleTimer, setBubbleTimer] = useState<NodeJS.Timeout | null>(null);
  const [isWaving, setIsWaving] = useState(false);

  // Auto pop-up greeting on mount after 3.5 seconds
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowBubble(true);
      const hideTimer = setTimeout(() => setShowBubble(false), 5500);
      setBubbleTimer(hideTimer);
    }, 3500);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 800);

    // Pick next joke or message
    const nextIdx = (msgIndex + 1) % FUNNY_MESSAGES.length;
    setMsgIndex(nextIdx);
    setShowBubble(true);

    if (bubbleTimer) clearTimeout(bubbleTimer);
    const t = setTimeout(() => setShowBubble(false), 7000);
    setBubbleTimer(t);
  };

  return (
    <>
      <style>{`
        @keyframes orbitFloat {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(25px, -35px) rotate(4deg);
          }
          50% {
            transform: translate(10px, -65px) rotate(-3deg);
          }
          75% {
            transform: translate(-25px, -30px) rotate(3deg);
          }
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }

        @keyframes jetThruster {
          0%, 100% {
            filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.7)) drop-shadow(0 15px 25px rgba(234, 179, 8, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 24px rgba(6, 182, 212, 0.95)) drop-shadow(0 20px 35px rgba(234, 179, 8, 0.7));
          }
        }

        @keyframes waveAnim {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.15) rotate(-12deg); }
          50% { transform: scale(1.2) rotate(14deg); }
          75% { transform: scale(1.15) rotate(-10deg); }
        }

        .buddy-orbit {
          animation: orbitFloat 9s ease-in-out infinite, jetThruster 3s ease-in-out infinite alternate;
        }

        .buddy-waving {
          animation: waveAnim 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
      `}</style>

      {/* FIXED FLOATING ORBIT POSITION (bottom right with comfortable margin) */}
      <div className="fixed bottom-8 right-6 z-50 pointer-events-auto select-none flex flex-col items-end">
        {/* SPEECH BUBBLE WITH JOKES & CTA */}
        {showBubble && (
          <div
            className="mb-3 max-w-[270px] sm:max-w-[310px] p-3.5 rounded-2xl bg-black/90 border border-cyan-400/40 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(6,182,212,0.25)] text-left relative animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {/* Pointer arrow pointing to the chibi */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-black/90 border-r border-b border-cyan-400/40 transform rotate-45" />

            <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-white/10 pb-1">
              <span className="text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Mini Deepak AI
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                className="text-gray-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-100 font-medium leading-relaxed mb-2.5">
              {FUNNY_MESSAGES[msgIndex]}
            </p>

            {/* Quick Action buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onContactClick?.();
                  setShowBubble(false);
                }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-[10px] font-bold tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
              >
                <span>Hire Deepak! 📬</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-mono transition-colors cursor-pointer"
              >
                Tell Joke 😄
              </button>
            </div>
          </div>
        )}

        {/* CUTE CHIBI AVATAR BUTTON */}
        <div
          onClick={handleClick}
          title="Click mini Deepak for a joke or to contact him!"
          className="relative cursor-pointer group flex flex-col items-center"
        >
          {/* Subtle click me badge */}
          <div className="mb-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 backdrop-blur-md text-[9px] font-mono font-bold text-cyan-300 tracking-wider shadow-lg opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all">
            👋 Click Me!
          </div>

          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300 buddy-orbit ${
              isWaving ? 'buddy-waving' : ''
            }`}
          >
            <img
              src="/assets/mini_deepak.png"
              alt="Mini Deepak Chibi character"
              className="w-full h-full object-cover transform scale-110 group-hover:scale-120 transition-transform duration-300"
            />
          </div>

          {/* Jet thruster particle effect under his boots */}
          <div className="w-10 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] opacity-75 mt-0.5 animate-pulse" />
        </div>
      </div>
    </>
  );
};
