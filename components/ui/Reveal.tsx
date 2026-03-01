"use client";

import { useRef, useEffect, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion: skip animation, show immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionDelay:  `${delay}ms`,
        opacity:          visible ? 1 : 0,
        transform:        visible ? "none" : `translateY(${y}px)`,
        transition:       "opacity 0.65s ease, transform 0.65s ease",
      }}
    >
      {children}
    </div>
  );
}
