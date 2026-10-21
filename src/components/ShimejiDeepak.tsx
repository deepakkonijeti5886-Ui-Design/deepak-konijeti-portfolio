import React, { useState, useEffect, useRef } from 'react';

export type ShimejiPose = 
  | 'sit'            // Classic sitting with legs crossed drinking chai
  | 'sleep'          // Lying flat fast asleep with Zzz
  | 'coding'         // Sitting with laptop coding eagerly
  | 'celebrate'      // Jumping up YAY celebrating
  | 'walk'           // Walking across the bottom edge
  | 'climb'          // Climbing the screen wall
  | 'dragged'        // Picked up by mouse cursor (dangling)
  | 'falling';       // Flailing falling through air with gravity before landing

interface PoseConfig {
  name: string;
  sprite: string;
  scale?: number;
  offsetY?: number;
  jokes: string[];
}

export const ALL_POSES: Record<ShimejiPose, PoseConfig> = {
  sit: {
    name: 'Sitting Down',
    sprite: '/assets/shimeji_coffee.png',
    scale: 1.05,
    offsetY: 0,
    jokes: [
      "Sitting down enjoying warm chai while code compiles cleanly! ✨",
      "Immediate joiner sitting ready for your technical interview! 💼",
      "Sitting relaxed after shipping high-converting e-commerce components! 🚀"
    ]
  },
  sleep: {
    name: 'Sleeping Flat',
    sprite: '/assets/shimeji_sleep.png',
    scale: 1.15,
    offsetY: 15,
    jokes: [
      "Zzz... Fast asleep while the CI/CD test suite passes with 100% green! 😴",
      "Power napping on the floor! Don't wake me unless the offer letter is ready! 💤",
      "Dreaming in clean React architecture and zero console warnings... 💭"
    ]
  },
  coding: {
    name: 'Deep Work Coding',
    sprite: '/assets/shimeji_coding.png',
    scale: 1.05,
    offsetY: 0,
    jokes: [
      "Deep in the zone! Writing robust TypeScript types and scalable hooks! 💻⚡",
      "Squashing bugs at 120 lines/hour! Tech stack: React, TypeScript, Redux, Next.js! 🧪",
      "Coding clean, accessible UI components with 60fps animations! 🚀"
    ]
  },
  celebrate: {
    name: 'Celebrating Success',
    sprite: '/assets/shimeji_celebrate.png',
    scale: 1.1,
    offsetY: -10,
    jokes: [
      "YAY! All PRs approved and merged straight to production! 🎉🙌",
      "Woohoo! 15% reduction in cart abandonment achieved on live e-commerce! 🏆",
      "Celebrating another milestone! Ready to bring high energy to your engineering team! 🚀"
    ]
  },
  walk: {
    name: 'Walking & Inspecting',
    sprite: '/assets/shimeji_deepak.png',
    scale: 1,
    offsetY: 0,
    jokes: [
      "Strolling through your browser checking if all animations run at 60fps! 🚀",
      "On the move! Ready to join an ambitious engineering team immediately! 💼",
      "Walking back and forth admiring your screen layout! ✨"
    ]
  },
  climb: {
    name: 'Climbing Viewport',
    sprite: '/assets/shimeji_climb.png',
    scale: 1.05,
    offsetY: 0,
    jokes: [
      "Climbing up the browser window! Scaling platforms to 5M+ users! 🧗‍♂️",
      "Hanging out on your screen border! Don't worry, my grip is rock solid! 🕷️",
      "Climbing to the top of the engineering ladder! 📈"
    ]
  },
  dragged: {
    name: 'Picked Up',
    sprite: '/assets/shimeji_dragged.png',
    scale: 1.08,
    offsetY: 0,
    jokes: [
      "Woaaaaah! Put me down! I'm an engineer, not a ragdoll! Haha!",
      "Wheeeeee! Testing draggable UI gesture physics with React hooks! 🎢",
      "Don't drop me! Click 'Hire Deepak' instead! 📬"
    ]
  },
  falling: {
    name: 'Free Falling',
    sprite: '/assets/shimeji_falling.png',
    scale: 1.12,
    offsetY: 0,
    jokes: [
      "Aaaaaah gravity is real! Coming in for a landing! 🪂💥",
      "Watch out below! Physics-based parabolic trajectory active! 🎯",
      "Wheeeee! Landing smoothly right on the floor! 🚀"
    ]
  }
};

interface TimedPoseStep {
  pose: ShimejiPose;
  durationSeconds: number;
  dialogue?: string;
}

// Precise timestamps (seconds) for hands-free loop:
const AUTOMATED_TIMELINE: TimedPoseStep[] = [
  // 1. Sitting Down (5s)
  {
    pose: 'sit',
    durationSeconds: 5,
    dialogue: "Sitting down enjoying warm chai while inspecting this portfolio! ✨"
  },
  // 2. Turns around, lies flat and SLEEPS with Zzz (5s)
  {
    pose: 'sleep',
    durationSeconds: 5,
    dialogue: "Zzz... Fast asleep on the floor! Power napping after shipping clean code... 😴"
  },
  // 3. Sits back up with his laptop and CODES (5s)
  {
    pose: 'coding',
    durationSeconds: 5,
    dialogue: "Back up and coding! Writing robust React & TypeScript components at 60fps! 💻⚡"
  },
  // 4. Jumps up and CELEBRATES (5s)
  {
    pose: 'celebrate',
    durationSeconds: 5,
    dialogue: "YAY! 100% green test suite & all PRs merged to production! 🎉🚀"
  },
  // 5. STROLLS / WALKS along the bottom taskbar (5s)
  {
    pose: 'walk',
    durationSeconds: 5,
    dialogue: "Strolling across your screen towards the wall! Ready to climb! 🧗‍♂️"
  },
  // 6. CLIMBS up the screen wall to the top (6s)
  {
    pose: 'climb',
    durationSeconds: 6,
    dialogue: "Climbing all the way up the screen border! Scaling to the top! 🧗‍♂️"
  },
  // 7. LOOSES GRIP & FALLS DOWN SLOWLY in full panic flail (4s)
  {
    pose: 'falling',
    durationSeconds: 4,
    dialogue: "WHOAAA! Lost my grip! Falling down in panic! Watch out below! 🪂😱"
  }
];

const POSE_KEYS: ShimejiPose[] = ['sit', 'sleep', 'coding', 'celebrate', 'walk', 'climb', 'falling'];

interface ShimejiDeepakProps {
  onContactClick?: () => void;
}

export const ShimejiDeepak: React.FC<ShimejiDeepakProps> = ({ onContactClick }) => {
  const [posX, setPosX] = useState<number>(300);
  const [posY, setPosY] = useState<number>(500);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  
  // Timeline index for automated pose orchestration
  const [timelineIndex, setTimelineIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5);
  const [pose, setPose] = useState<ShimejiPose>('sit');
  
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFalling, setIsFalling] = useState<boolean>(false);
  const [speechText, setSpeechText] = useState<string>('');
  const [showSpeech, setShowSpeech] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Drag and throwing physics refs
  const dragStartRef = useRef<{ x: number; y: number; startPosX: number; startPosY: number }>({
    x: 0,
    y: 0,
    startPosX: 0,
    startPosY: 0
  });
  const velocityRef = useRef<{ vx: number; vy: number; lastX: number; lastY: number; lastTime: number }>({
    vx: 0,
    vy: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0
  });
  const hasMovedRef = useRef<boolean>(false);
  const timelineIndexRef = useRef<number>(0);

  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Client-side initialization
  useEffect(() => {
    setIsMounted(true);
    const isMobile = window.innerWidth < 768;
    const startX = isMobile 
      ? Math.max(20, window.innerWidth - 120) 
      : Math.max(100, window.innerWidth - 280);
    const startY = isMobile
      ? Math.max(80, window.innerHeight - 120)
      : Math.max(120, window.innerHeight - 150);
    setPosX(startX);
    setPosY(startY);

    // Initial pose (silent, comment box appears only when touched)
    const currentStep = AUTOMATED_TIMELINE[0];
    setPose(currentStep.pose);
    setSecondsRemaining(currentStep.durationSeconds);
    if (currentStep.dialogue) {
      setSpeechText(currentStep.dialogue);
    }
  }, []);

  useEffect(() => {
    timelineIndexRef.current = timelineIndex;
  }, [timelineIndex]);

  const applyPosePosition = (targetPose: ShimejiPose) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const floorY = isMobile 
      ? Math.max(80, window.innerHeight - 120) 
      : Math.max(120, window.innerHeight - 150);
    if (targetPose === 'climb') {
      // Anchor to the wall edge
      setPosX(direction === 'left' ? (isMobile ? 10 : 25) : window.innerWidth - (isMobile ? 100 : 130));
      setPosY(floorY - 60);
    } else if (targetPose === 'sleep') {
      setPosY(floorY + (isMobile ? 8 : 15));
    } else if (targetPose === 'falling') {
      // If triggered from top, keep current high posY
      // launchFallingPhysics will take over
    } else {
      setPosY(floorY);
    }
  };

  const triggerDialogue = (currentPose: ShimejiPose, customText?: string) => {
    const text = customText || (() => {
      const list = ALL_POSES[currentPose].jokes;
      return list[Math.floor(Math.random() * list.length)];
    })();

    setSpeechText(text);
    setShowSpeech(true);

    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    // Auto-dismiss after 6 seconds so it never stays cluttered or permanently open
    speechTimeoutRef.current = setTimeout(() => {
      setShowSpeech(false);
    }, 6000);
  };

  // Climbing movement loop (runs automatically when in 'climb' pose)
  useEffect(() => {
    if (!isMounted || pose !== 'climb' || isDragging || isFalling) return;

    const climbInterval = setInterval(() => {
      setPosY((prevY) => {
        // Climb upwards towards top of screen (around 70px from top)
        const topLimit = 75;
        if (prevY <= topLimit) {
          return topLimit;
        }
        return Math.max(topLimit, prevY - 4.5);
      });
      // Keep glued to screen border
      setPosX(direction === 'left' ? 25 : window.innerWidth - 130);
    }, 45);

    return () => clearInterval(climbInterval);
  }, [isMounted, pose, direction, isDragging, isFalling]);

  // ==============================================================
  // AUTOMATIC TIMED STEPPER: Advances precisely every X seconds!
  // ==============================================================
  useEffect(() => {
    if (!isMounted || isDragging || isFalling) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prevSec) => {
        if (prevSec <= 1) {
          const currentIdx = timelineIndexRef.current;
          const nextIdx = (currentIdx + 1) % AUTOMATED_TIMELINE.length;
          timelineIndexRef.current = nextIdx;
          setTimelineIndex(nextIdx);

          const nextStep = AUTOMATED_TIMELINE[nextIdx];
          if (nextStep.pose === 'falling') {
            launchFallingPhysics(0.5, direction === 'left' ? 2 : -2);
          } else {
            applyPosePosition(nextStep.pose);
            setPose(nextStep.pose);
            // Prepare dialog text silently; user sees it when touching the character
            if (nextStep.dialogue) {
              setSpeechText(nextStep.dialogue);
            }
          }

          return nextStep.durationSeconds;
        }
        return prevSec - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMounted, isDragging, isFalling, direction]);

  // Walking movement loop (runs automatically when in 'walk' pose)
  useEffect(() => {
    if (!isMounted || pose !== 'walk' || isDragging || isFalling) return;

    const walkInterval = setInterval(() => {
      const floorY = Math.max(120, window.innerHeight - 150);
      setPosY(floorY);

      setPosX((prev) => {
        const speed = direction === 'left' ? -2.4 : 2.4;
        const next = prev + speed;

        if (next <= 30) {
          setDirection('right');
          return 35;
        }
        if (next >= window.innerWidth - 130) {
          setDirection('left');
          return window.innerWidth - 135;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(walkInterval);
  }, [isMounted, pose, direction, isDragging, isFalling]);

  // Manual cycle fallback if user wants to click
  const cycleNextPose = () => {
    const currentIdx = timelineIndexRef.current;
    const nextIdx = (currentIdx + 1) % AUTOMATED_TIMELINE.length;
    timelineIndexRef.current = nextIdx;
    setTimelineIndex(nextIdx);
    
    const nextStep = AUTOMATED_TIMELINE[nextIdx];
    setSecondsRemaining(nextStep.durationSeconds);
    if (nextStep.pose === 'falling') {
      launchFallingPhysics(0.5, direction === 'left' ? 2 : -2);
    } else {
      applyPosePosition(nextStep.pose);
      setPose(nextStep.pose);
      triggerDialogue(nextStep.pose, nextStep.dialogue);
    }
  };

  const selectPose = (targetPose: ShimejiPose) => {
    const matchingIdx = AUTOMATED_TIMELINE.findIndex((s) => s.pose === targetPose);
    const chosenIdx = matchingIdx !== -1 ? matchingIdx : timelineIndexRef.current;
    timelineIndexRef.current = chosenIdx;
    setTimelineIndex(chosenIdx);

    const step = AUTOMATED_TIMELINE[chosenIdx];
    setSecondsRemaining(step ? step.durationSeconds : 5);
    setShowMenu(false);

    if (targetPose === 'falling') {
      // If user chooses falling from menu, start from current position or high up
      if (posY > 200) {
        setPosY(100);
      }
      setTimeout(() => {
        launchFallingPhysics(0.5, direction === 'left' ? 2 : -2);
      }, 50);
    } else {
      applyPosePosition(targetPose);
      setPose(targetPose);
      triggerDialogue(targetPose, step?.dialogue);
    }
  };

  // ==============================================================
  // SLOW PANIC FALLING PHYSICS (Gentle terminal velocity, air sway & panic pose)
  // ==============================================================
  const launchFallingPhysics = (startVy = 0.5, startVx = 0) => {
    setIsFalling(true);
    setPose('falling');
    triggerDialogue('falling', 'Aaaaaah! Free falling through the air! Flailing in panic! 😱🪂');

    let currentY = posY;
    let currentX = posX;
    let vy = Math.min(2.0, Math.max(0.5, startVy));
    let vx = startVx || (direction === 'left' ? 1.5 : -1.5);
    const gravity = 0.28; // gentle slow gravity so user can see panic pose clearly
    const maxFallSpeed = 4.0; // terminal velocity
    const floorY = Math.max(120, window.innerHeight - 150);
    let swayPhase = 0;

    const fallInterval = setInterval(() => {
      vy = Math.min(maxFallSpeed, vy + gravity);
      currentY += vy;
      swayPhase += 0.15;
      
      // Aerodynamic horizontal flutter / panic wobble while falling
      currentX += Math.sin(swayPhase) * 2.2 + vx * 0.4;

      // Bound X within viewport
      if (currentX < 25) {
        currentX = 25;
        vx = Math.abs(vx) * 0.5;
      } else if (currentX > window.innerWidth - 130) {
        currentX = window.innerWidth - 130;
        vx = -Math.abs(vx) * 0.5;
      }

      setPosX(currentX);
      setPosY(currentY);

      // Hit Floor: land smoothly and advance to sitting pose
      if (currentY >= floorY) {
        currentY = floorY;
        setPosY(floorY);
        clearInterval(fallInterval);
        setIsFalling(false);

        // Land safely back into Sitting or next timeline pose
        const currentIdx = timelineIndexRef.current;
        const nextIdx = (currentIdx + 1) % AUTOMATED_TIMELINE.length;
        timelineIndexRef.current = nextIdx;
        setTimelineIndex(nextIdx);
        const nextStep = AUTOMATED_TIMELINE[nextIdx];
        setPose(nextStep.pose);
        setSecondsRemaining(nextStep.durationSeconds);
        // Silent landing: do not pop comment bubble automatically
        if (nextStep.dialogue) {
          setSpeechText(nextStep.dialogue);
        }
      }
    }, 30);
  };

  // Mouse & Touch Dragging & Throwing logic
  const handleStart = (clientX: number, clientY: number) => {
    if (isFalling) return;
    hasMovedRef.current = false;
    const now = performance.now();
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      startPosX: posX,
      startPosY: posY
    };
    velocityRef.current = {
      vx: 0,
      vy: 0,
      lastX: clientX,
      lastY: clientY,
      lastTime: now
    };
  };

  const handleMove = (clientX: number, clientY: number) => {
    const dist = Math.hypot(
      clientX - dragStartRef.current.x,
      clientY - dragStartRef.current.y
    );
    if (dist > 5) {
      hasMovedRef.current = true;
      setIsDragging(true);
      setPose('dragged');

      const curTime = performance.now();
      const dt = Math.max(1, curTime - velocityRef.current.lastTime);
      velocityRef.current.vx = ((clientX - velocityRef.current.lastX) / dt) * 12;
      velocityRef.current.vy = ((clientY - velocityRef.current.lastY) / dt) * 12;
      velocityRef.current.lastX = clientX;
      velocityRef.current.lastY = clientY;
      velocityRef.current.lastTime = curTime;

      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;
      const isMobile = window.innerWidth < 768;
      const maxX = window.innerWidth - (isMobile ? 90 : 120);
      const maxY = window.innerHeight - (isMobile ? 100 : 140);
      setPosX(Math.max(10, Math.min(maxX, dragStartRef.current.startPosX + dx)));
      setPosY(Math.max(10, Math.min(maxY, dragStartRef.current.startPosY + dy)));
    }
  };

  const handleEnd = () => {
    const isMobile = window.innerWidth < 768;
    if (hasMovedRef.current) {
      setIsDragging(false);
      const floorY = isMobile
        ? Math.max(80, window.innerHeight - 120)
        : Math.max(120, window.innerHeight - 150);

      // If lifted high or thrown, enter FALLING physics mode!
      if (posY < floorY - 30 || Math.abs(velocityRef.current.vy) > 3) {
        launchFallingPhysics(velocityRef.current.vy, velocityRef.current.vx);
      } else {
        // Put gently on floor (silent, ready for user touch)
        const currentIdx = timelineIndexRef.current;
        const step = AUTOMATED_TIMELINE[currentIdx];
        setSecondsRemaining(step.durationSeconds);
        applyPosePosition(step.pose);
        setPose(step.pose);
        if (step.dialogue) {
          setSpeechText(step.dialogue);
        }
      }
    } else {
      // Direct touch or click triggers the comment dialogue & cycles pose
      const currentIdx = timelineIndexRef.current;
      const step = AUTOMATED_TIMELINE[currentIdx];
      triggerDialogue(step.pose, step.dialogue);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || isFalling) return;
    handleStart(e.clientX, e.clientY);

    const onMouseMove = (me: MouseEvent) => {
      handleMove(me.clientX, me.clientY);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      handleEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFalling || e.touches.length === 0) return;
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);

    const onTouchMove = (te: TouchEvent) => {
      if (te.touches.length > 0) {
        handleMove(te.touches[0].clientX, te.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      handleEnd();
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  };

  if (!isMounted) return null;

  const currentConfig = ALL_POSES[pose];

  return (
    <>
      <style>{`
        @keyframes shimejiBreath {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-3px) scale(1.02); }
        }

        @keyframes shimejiSleepSway {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes shimejiCelebrateBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.04); }
        }

        @keyframes shimejiWaddle {
          0% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-7px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(-3deg); }
        }

        @keyframes shimejiClimbShimmy {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-4deg); }
          75% { transform: translateY(-8px) rotate(4deg); }
        }

        @keyframes shimejiPanicFlail {
          0% { transform: rotate(-16deg) scale(1.1) translateY(0); }
          25% { transform: rotate(14deg) scale(1.12) translateY(-4px); }
          50% { transform: rotate(-14deg) scale(1.08) translateY(2px); }
          75% { transform: rotate(16deg) scale(1.14) translateY(-2px); }
          100% { transform: rotate(-16deg) scale(1.1) translateY(0); }
        }

        .pose-sit { animation: shimejiBreath 3s infinite ease-in-out; }
        .pose-sleep { animation: shimejiSleepSway 3.5s infinite ease-in-out; }
        .pose-coding { animation: shimejiBreath 2.5s infinite ease-in-out; }
        .pose-celebrate { animation: shimejiCelebrateBounce 1.2s infinite ease-in-out; }
        .pose-walk { animation: shimejiWaddle 0.38s infinite ease-in-out; }
        .pose-climb { animation: shimejiClimbShimmy 0.4s infinite ease-in-out; }
        .pose-dragged { animation: shimejiDangle 0.5s infinite ease-in-out; }
        .pose-falling { animation: shimejiPanicFlail 0.22s infinite ease-in-out; }
      `}</style>

      {/* SHIMEJI CONTAINER */}
      <div
        id="shimejiContainer"
        style={{
          position: 'fixed',
          left: `${posX}px`,
          top: `${posY}px`,
          zIndex: 9999,
          cursor: isDragging ? 'grabbing' : 'pointer',
          touchAction: 'none',
          transition: (isDragging || isFalling) ? 'none' : 'top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.3s ease-out'
        }}
        className="select-none flex flex-col items-center pointer-events-auto"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onContextMenu={handleContextMenu}
      >
        {/* SPEECH BUBBLE (Clean Dialogue with Dynamic Edge & Mobile Adaptation) */}
        {showSpeech && (() => {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          // Check if mini guy is near the left edge (< 220px) or right edge (> window.innerWidth - 320px)
          const isNearLeft = typeof window !== 'undefined' && posX < (isMobile ? 120 : 220);
          const isNearRight = typeof window !== 'undefined' && posX > window.innerWidth - (isMobile ? 180 : 320);

          // Default: top-centered above Deepak
          // If near left edge: shift speech bubble to the right of Deepak
          // If near right edge: shift speech bubble to the left of Deepak
          let bubblePosClasses = "bottom-[115px] md:bottom-[135px] left-1/2 -translate-x-1/2";
          let pointerClasses = "-bottom-2 left-1/2 -translate-x-1/2 border-r border-b";

          if (isNearLeft) {
            bubblePosClasses = "bottom-[15px] left-[75px] md:left-[105px] translate-x-0";
            pointerClasses = "top-1/2 -left-2 -translate-y-1/2 border-l border-b rotate-45";
          } else if (isNearRight) {
            bubblePosClasses = "bottom-[15px] right-[75px] md:right-[105px] translate-x-0";
            pointerClasses = "top-1/2 -right-2 -translate-y-1/2 border-r border-t rotate-45";
          }

          return (
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className={`absolute ${bubblePosClasses} w-[80vw] max-w-[270px] sm:max-w-none sm:w-72 p-3 sm:p-3.5 rounded-2xl bg-black/95 border border-cyan-400/50 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.35)] text-left z-50 animate-in fade-in zoom-in-95 duration-200`}
            >
              {/* Dynamic Speech Pointer */}
              <div className={`absolute ${pointerClasses} w-3 h-3 md:w-3.5 md:h-3.5 bg-black/95 border-cyan-400/50 transform`} />

              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
                <span className="text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Deepak
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSpeech(false);
                  }}
                  className="text-gray-400 hover:text-white text-xs px-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-gray-100 font-medium leading-relaxed mb-3">
                {speechText}
              </p>

              {/* Quick Action buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onContactClick?.();
                    setShowSpeech(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-[10px] font-bold tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer flex items-center gap-1"
                >
                  <span>Hire Deepak! 📬</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cycleNextPose();
                  }}
                  className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 text-[10px] font-mono transition-colors cursor-pointer"
                >
                  Next ❯
                </button>
              </div>
            </div>
          );
        })()}

        {/* SHIMEJI RIGHT-CLICK ACTION MENU (Clean Text) */}
        {showMenu && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-[160px] right-0 w-48 rounded-xl bg-[#0c0f18] border border-cyan-500/40 backdrop-blur-xl shadow-2xl py-1 z-50 text-xs font-mono text-gray-200"
          >
            <div className="px-3 py-1.5 text-[10px] text-gray-500 uppercase font-bold border-b border-white/10">
              Select Pose Action
            </div>
            {POSE_KEYS.map((pk) => {
              const cfg = ALL_POSES[pk];
              return (
                <button
                  key={pk}
                  onClick={() => selectPose(pk)}
                  className={`w-full text-left px-3 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors flex items-center justify-between ${
                    pose === pk ? 'text-cyan-400 bg-cyan-950/40 font-bold' : ''
                  }`}
                >
                  <span>{cfg.name}</span>
                  <span className="text-[9px] text-gray-500">{pk}</span>
                </button>
              );
            })}
            <div className="border-t border-white/10 my-1" />
            <button
              onClick={() => {
                onContactClick?.();
                setShowMenu(false);
              }}
              className="w-full text-left px-3 py-1.5 text-emerald-400 hover:bg-emerald-500/20 transition-colors font-bold"
            >
              Contact Deepak
            </button>
            <button
              onClick={() => setShowMenu(false)}
              className="w-full text-left px-3 py-1 text-gray-500 hover:text-gray-300 transition-colors text-[10px]"
            >
              Close Menu
            </button>
          </div>
        )}

        {/* ACTIVE SHIMEJI SPRITE */}
        <div
          id="shimejiSpriteWrapper"
          className={`relative transition-transform duration-200 pose-${pose}`}
          style={{
            transform: `${direction === 'right' && (pose === 'walk' || pose === 'climb') ? 'scaleX(-1)' : 'scaleX(1)'} scale(${
              currentConfig.scale || 1
            }) translateY(${currentConfig.offsetY || 0}px)`
          }}
        >
          <img
            id="shimejiSpriteImg"
            src={currentConfig.sprite}
            alt={`Deepak Shimeji ${pose}`}
            className="w-20 sm:w-28 h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] filter pointer-events-none"
            draggable={false}
          />
        </div>

        {/* SHIMEJI FLOOR SHADOW (Hidden when climbing, falling, or dragged) */}
        {pose !== 'climb' && pose !== 'dragged' && pose !== 'falling' && (
          <div className="w-16 h-2 rounded-full bg-black/60 blur-[3px] -mt-1 pointer-events-none" />
        )}
      </div>
    </>
  );
};
