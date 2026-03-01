"use client";

import { useRef, useEffect, useState } from "react";

// Parses "+350", "100%", "30" → { prefix: "+", value: 350, suffix: "" }
function parse(raw: string): { prefix: string; value: number; suffix: string } {
  const match = raw.match(/^([+]?)(\d+)([+%]?)$/);
  if (!match) return { prefix: "", value: 0, suffix: "" };
  return { prefix: match[1], value: parseInt(match[2], 10), suffix: match[3] };
}

interface Props {
  raw: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatCounter({ raw, className = "", style }: Props) {
  const { prefix, value: target, suffix } = parse(raw);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion: show final value immediately
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          io.unobserve(el);

          if (reduced) {
            setCount(target);
            return;
          }

          const duration = 1400;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic — decelerates into the final value
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={className} style={style}>
      {prefix}{count}{suffix}
    </div>
  );
}
