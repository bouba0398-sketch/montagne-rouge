"use client";

import { useRef, useEffect, useState } from "react";

// Parses "500+", "98%", "30" → { value: 500, suffix: "+" }
function parse(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(\d+)([+%]?)$/);
  if (!match) return { value: 0, suffix: "" };
  return { value: parseInt(match[1], 10), suffix: match[2] };
}

interface Props {
  raw: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StatCounter({ raw, className = "", style }: Props) {
  const { value: target, suffix } = parse(raw);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          io.unobserve(el);

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
      {count}{suffix}
    </div>
  );
}
