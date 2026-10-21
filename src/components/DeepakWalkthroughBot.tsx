import React, { useState, useEffect, useRef } from 'react';
import { DeepakFaceAvatar } from './DeepakFaceAvatar';
import {
  TOUR_STOPS,
  BOT_KNOWLEDGE_BASE,
  findBestMatchingAnswer,
  TourStop,
  BotQA
} from '../data/deepakBotKnowledge';
import {
  Compass,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Search,
  ExternalLink,
  Award,
  ArrowRight,
  HelpCircle,
  Footprints
} from 'lucide-react';

interface DeepakWalkthroughBotProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const DeepakWalkthroughBot: React.FC<DeepakWalkthroughBotProps> = ({ onNavigateSection }) => {
  // Widget Open / Minimized state
  const [isOpen, setIsOpen] = useState(false);
  const [isTeaserDismissed, setIsTeaserDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState<'tour' | 'ask'>('tour');

  // Tour Mode states
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Ask Mode states
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState<BotQA>(BOT_KNOWLEDGE_BASE[0]);
  const [hasUserAsked, setHasUserAsked] = useState(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentStop = TOUR_STOPS[currentStopIndex];

  // Web Audio subtle gentle chime
  const playChime = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch {
      // Audio context may require user interaction; ignore silently
    }
  };

  // Walk and scroll to a specific tour stop
  const goToStop = (index: number) => {
    const validIndex = Math.max(0, Math.min(TOUR_STOPS.length - 1, index));
    setCurrentStopIndex(validIndex);
    const stop = TOUR_STOPS[validIndex];

    // Trigger walking animation and sound
    setIsWalking(true);
    setIsSpeaking(false);
    playChime();

    // Scroll to the element smoothly
    const element = document.getElementById(stop.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Add temporary highlight effect
      element.classList.add('ring-4', 'ring-[#2B63F6]', 'ring-offset-8', 'transition-all', 'duration-500');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-[#2B63F6]', 'ring-offset-8');
      }, 2400);
    }

    if (onNavigateSection) {
      onNavigateSection(stop.targetId);
    }

    // After movement finishes, Deepak begins speaking
    setTimeout(() => {
      setIsWalking(false);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 4200);
    }, 700);
  };

  const handleNextStop = () => {
    if (currentStopIndex < TOUR_STOPS.length - 1) {
      goToStop(currentStopIndex + 1);
    } else {
      goToStop(0); // Loop back or stop
      setIsAutoPlaying(false);
    }
  };

  const handlePrevStop = () => {
    if (currentStopIndex > 0) {
      goToStop(currentStopIndex - 1);
    }
  };

  // Auto-play walkthrough timer
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setTimeout(() => {
        if (currentStopIndex < TOUR_STOPS.length - 1) {
          goToStop(currentStopIndex + 1);
        } else {
          setIsAutoPlaying(false);
        }
      }, 7000);
    } else if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, currentStopIndex]);

  // Start Tour from scratch
  const startFullTour = () => {
    setIsOpen(true);
    setActiveTab('tour');
    goToStop(0);
    setIsAutoPlaying(true);
  };

  // Listen to custom event so Navbar or Hero can start the walkthrough
  useEffect(() => {
    const handleStartTourEvent = () => {
      startFullTour();
    };
    window.addEventListener('start-deepak-tour', handleStartTourEvent);
    return () => window.removeEventListener('start-deepak-tour', handleStartTourEvent);
  }, []);

  // Handle deterministic question submit
  const handleAskQuestion = (q: string) => {
    setSearchQuery(q);
    const matched = findBestMatchingAnswer(q);
    setCurrentAnswer(matched);
    setHasUserAsked(true);
    setIsSpeaking(true);
    playChime();
    setTimeout(() => setIsSpeaking(false), 3500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* 1. Minimized Floating Avatar Trigger */}
      {!isOpen && (
        <div className="flex flex-col items-end gap-2">
          {/* Greeting Speech Teaser bubble */}
          {!isTeaserDismissed && (
            <div className="relative bg-white dark:bg-[#1C1F26] text-[#16181D] dark:text-white px-4 py-2.5 rounded-2xl shadow-xl border border-black/10 dark:border-white/10 max-w-[270px] text-xs flex items-center gap-3 animate-fade-in">
              <span className="text-base select-none">👋</span>
              <div>
                <p className="font-semibold text-[13px] text-[#16181D] dark:text-white">
                  Hey, I&apos;m Deepak!
                </p>
                <p className="text-[#5E6573] dark:text-[#969EAE] text-[11px] mt-0.5">
                  Want me to walk you through my portfolio?
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTeaserDismissed(true);
                }}
                className="text-[#8C95A6] hover:text-black dark:hover:text-white p-0.5 rounded transition-colors"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Little speech tail */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white dark:bg-[#1C1F26] border-b border-r border-black/10 dark:border-white/10 rotate-45" />
            </div>
          )}

          {/* Avatar button with online beacon */}
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-white dark:bg-[#1C1F26] hover:bg-[#F8FAFC] dark:hover:bg-[#222733] border-2 border-[#2B63F6] p-1.5 pr-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-left"
            title="Open Deepak's Walkthrough Guide"
          >
            <DeepakFaceAvatar size="md" isWalking={isWalking} isSpeaking={isSpeaking} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#16181D] dark:text-white flex items-center gap-1.5">
                Deepak Guide
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-mono font-semibold">
                  NON-AI
                </span>
              </span>
              <span className="text-[10px] text-[#2B63F6] font-medium flex items-center gap-1">
                <Compass className="w-2.5 h-2.5" /> Walk me through
              </span>
            </div>
          </button>
        </div>
      )}

      {/* 2. Expanded Interactive Bot Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] max-h-[88vh] bg-white dark:bg-[#181B22] rounded-3xl shadow-2xl border border-black/12 dark:border-white/12 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header Bar */}
          <div className="p-4 bg-gradient-to-r from-[#1C212E] to-[#12151D] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <DeepakFaceAvatar size="sm" isWalking={isWalking} isSpeaking={isSpeaking} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm tracking-tight text-white">Deepak Konijeti</h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold border border-emerald-500/30">
                    Trained on details
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                  Senior UI Developer &bull; TCS Bengaluru
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title={soundEnabled ? 'Mute chimes' : 'Enable sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Minimize guide"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsAutoPlaying(false);
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close guide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Mode Switcher Tabs */}
          <div className="flex bg-[#F1F3F7] dark:bg-[#13161C] p-1 border-b border-black/8 dark:border-white/8">
            <button
              onClick={() => setActiveTab('tour')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'tour'
                  ? 'bg-white dark:bg-[#202530] text-[#2B63F6] dark:text-blue-400 shadow-sm'
                  : 'text-[#5E6573] dark:text-[#8C95A6] hover:text-black dark:hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Walkthrough Tour ({currentStopIndex + 1}/{TOUR_STOPS.length})
            </button>
            <button
              onClick={() => setActiveTab('ask')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'ask'
                  ? 'bg-white dark:bg-[#202530] text-[#2B63F6] dark:text-blue-400 shadow-sm'
                  : 'text-[#5E6573] dark:text-[#8C95A6] hover:text-black dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Ask Deepak (Deterministic)
            </button>
          </div>

          {/* TAB 1: WEBSITE WALKTHROUGH TOUR */}
          {activeTab === 'tour' && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* Stepper Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#5E6573] dark:text-[#8C95A6]">
                  <span className="font-semibold text-[#2B63F6] dark:text-blue-400">
                    {currentStop.badge}
                  </span>
                  <span>
                    Step {currentStopIndex + 1} of {TOUR_STOPS.length}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex gap-1">
                  {TOUR_STOPS.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => goToStop(idx)}
                      className={`h-full flex-1 rounded-full transition-all ${
                        idx === currentStopIndex
                          ? 'bg-[#2B63F6]'
                          : idx < currentStopIndex
                          ? 'bg-emerald-500'
                          : 'bg-black/15 dark:bg-white/15'
                      }`}
                      title={s.title}
                    />
                  ))}
                </div>
              </div>

              {/* Walking & Speaking Visual Card */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EFF3F9] dark:from-[#1E232F] dark:to-[#171B24] p-4 rounded-2xl border border-black/8 dark:border-white/8 relative overflow-hidden">
                <div className="flex items-start gap-3.5">
                  <DeepakFaceAvatar size="lg" isWalking={isWalking} isSpeaking={isSpeaking} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mb-0.5">
                      {isWalking ? (
                        <>
                          <Footprints className="w-3.5 h-3.5 animate-bounce" />
                          Walking to section...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-[#2B63F6]" />
                          Deepak Speaking
                        </>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-[#16181D] dark:text-white tracking-tight">
                      {currentStop.title}
                    </h4>
                    <p className="text-xs text-[#4A5160] dark:text-[#B0B7C3] mt-1.5 leading-relaxed italic">
                      &ldquo;{currentStop.shortSpeech}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Key Takeaway Bullets for this Stop */}
                <div className="mt-3.5 pt-3 border-t border-black/6 dark:border-white/6 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E6573] dark:text-[#8C95A6] font-semibold">
                    Key Highlights:
                  </span>
                  {currentStop.detailedNotes.map((note, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#2B303B] dark:text-[#CBD5E1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2B63F6] mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>

                {/* Suggested CTA if user wants to inspect on the page */}
                {currentStop.suggestedAction && (
                  <button
                    onClick={() => {
                      const el = document.getElementById(currentStop.targetId);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="mt-3 w-full py-1.5 px-3 rounded-xl bg-white dark:bg-[#252B38] border border-black/10 dark:border-white/10 text-xs font-semibold text-[#16181D] dark:text-white flex items-center justify-center gap-1.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <span>Focus on {currentStop.suggestedAction.label}</span>
                    <ArrowRight className="w-3 h-3 text-[#2B63F6]" />
                  </button>
                )}
              </div>

              {/* Quick Jump Stop Pills */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E6573] dark:text-[#8C95A6] font-semibold mb-2 block">
                  Jump to any section:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {TOUR_STOPS.map((stop, i) => (
                    <button
                      key={stop.id}
                      onClick={() => goToStop(i)}
                      className={`text-left text-[11px] p-2 rounded-xl transition-all border ${
                        i === currentStopIndex
                          ? 'bg-[#2B63F6] text-white font-semibold border-transparent shadow'
                          : 'bg-white dark:bg-[#1E232F] text-[#4A5160] dark:text-[#969EAE] border-black/8 dark:border-white/8 hover:border-[#2B63F6]'
                      }`}
                    >
                      <span className="font-mono text-[9px] opacity-75 block">Stop 0{i + 1}</span>
                      <span className="truncate block">{stop.title.split(':')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Controls Bar */}
              <div className="mt-auto pt-3 border-t border-black/8 dark:border-white/8 flex items-center justify-between gap-2">
                <button
                  onClick={handlePrevStop}
                  disabled={currentStopIndex === 0}
                  className="px-3 py-2 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold text-[#16181D] dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>

                <button
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isAutoPlaying
                      ? 'bg-amber-500 text-white'
                      : 'bg-black/5 dark:bg-white/10 text-[#16181D] dark:text-white hover:bg-black/10'
                  }`}
                  title={isAutoPlaying ? 'Pause automatic walkthrough' : 'Auto-advance every 7s'}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      Auto: ON
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Auto-Walk
                    </>
                  )}
                </button>

                <button
                  onClick={handleNextStop}
                  className="px-4 py-2 rounded-xl bg-[#2B63F6] hover:bg-[#1E4FD8] text-white text-xs font-semibold shadow-md flex items-center gap-1 transition-all"
                >
                  {currentStopIndex === TOUR_STOPS.length - 1 ? 'Start Over' : 'Next Stop'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ASK DEEPAK (DETERMINISTIC KNOWLEDGE ENGINE) */}
          {activeTab === 'ask' && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {/* Search / Input Box */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C95A6]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleAskQuestion(e.target.value)}
                  placeholder="Ask Deepak anything about his work..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#F4F6F9] dark:bg-[#1E232F] text-xs text-[#16181D] dark:text-white placeholder-[#8C95A6] border border-black/8 dark:border-white/8 focus:outline-none focus:ring-2 focus:ring-[#2B63F6]"
                />
              </div>

              {/* Quick Prompt Pill Carousel */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E6573] dark:text-[#8C95A6] font-semibold mb-2 block">
                  Frequently Asked:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Clicks e-commerce impact?",
                    "What is your tech stack?",
                    "Why hire Deepak?",
                    "TCS On-the-Spot Award?",
                    "What is SDUI?",
                    "How to contact you?"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleAskQuestion(chip)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E232F] border border-black/8 dark:border-white/8 hover:border-[#2B63F6] text-[11px] text-[#4A5160] dark:text-[#CBD5E1] transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bot Answer Display */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#EFF3F9] dark:from-[#1E232F] dark:to-[#171B24] p-4 rounded-2xl border border-black/8 dark:border-white/8 relative">
                <div className="flex items-start gap-3">
                  <DeepakFaceAvatar size="md" isSpeaking={isSpeaking} />
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-[#2B63F6] dark:text-blue-400 font-semibold uppercase tracking-wider block mb-1">
                      Deepak&apos;s Verified Answer
                    </span>
                    <h4 className="font-bold text-xs text-[#16181D] dark:text-white">
                      {currentAnswer.question}
                    </h4>
                  </div>
                </div>

                <p className="mt-3 text-xs text-[#333842] dark:text-[#CBD5E1] leading-relaxed">
                  {currentAnswer.answer}
                </p>

                {currentAnswer.highlightFact && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#2B63F6]/10 border border-[#2B63F6]/20 text-[11px] font-medium text-[#1E4FD8] dark:text-blue-300 flex items-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-[#2B63F6]" />
                    <span>{currentAnswer.highlightFact}</span>
                  </div>
                )}

                {/* Direct Action Link to relevant section */}
                {currentAnswer.relatedStopId && (
                  <button
                    onClick={() => {
                      const el = document.getElementById(currentAnswer.relatedStopId!);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setIsOpen(false);
                    }}
                    className="mt-3 w-full py-1.5 px-3 rounded-xl bg-white dark:bg-[#252B38] border border-black/10 dark:border-white/10 text-xs font-semibold text-[#16181D] dark:text-white flex items-center justify-center gap-1.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <span>View in {currentAnswer.relatedStopId} section</span>
                    <ExternalLink className="w-3 h-3 text-[#2B63F6]" />
                  </button>
                )}
              </div>

              {/* Direct Contact Quick Link */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs">Want to talk to me directly?</div>
                  <div className="text-[10px] opacity-80">deepak.konijeti5886@gmail.com &bull; +91-9533095630</div>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setIsOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[10px] hover:bg-emerald-700 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
