import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string; // e.g. "4+", "50+", "5M+", "-15%", "+22%", "+3.5%"
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1600,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Extract numerical part and prefixes/suffixes
  // e.g. "+22%" -> prefix="+", target=22, suffix="%"
  // "-15%" -> prefix="-", target=15, suffix="%"
  // "+3.5%" -> prefix="+", target=3.5, suffix="%"
  // "5M+" -> prefix="", target=5, suffix="M+"
  // "4+" -> prefix="", target=4, suffix="+"
  // "Zero" -> string literal
  const match = value.match(/^([+-]?)([\d.]+)(.*)$/);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const isFloat = match[2].includes('.');

    let start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease-out: 1 - (1 - progress)^4
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = start + (target - start) * ease;

      const formattedNumber = isFloat ? current.toFixed(1) : Math.round(current).toString();
      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasAnimated, value, duration, match]);

  return (
    <span ref={elementRef} className={className}>
      {hasAnimated ? displayValue : '0'}
    </span>
  );
};
