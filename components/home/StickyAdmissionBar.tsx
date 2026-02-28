"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DISMISS_KEY = "mr_admission_bar_dismissed";

export default function StickyAdmissionBar() {
  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check sessionStorage once on mount
    if (sessionStorage.getItem(DISMISS_KEY)) {
      setDismissed(true);
      return;
    }

    const onScroll = () => setVisible(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once to set correct initial state if page is already scrolled
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  const show = visible && !dismissed;

  return (
    <div
      role="banner"
      aria-live="polite"
      aria-hidden={!show}
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
    >
      <div
        className="pointer-events-auto transition-transform duration-300 ease-out"
        style={{
          transform: show ? "translateY(0)" : "translateY(100%)",
          // Respect prefers-reduced-motion: if user prefers no motion the
          // transition-duration is zeroed by the @media rule in globals.css
        }}
      >
        <div
          className="mx-auto max-w-none flex items-center justify-between gap-4 px-5 py-3.5"
          style={{
            background: "#0f1115",
            borderTop:  "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Left — label */}
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: "#960018", color: "#fff" }}
            >
              <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" aria-hidden />
              Ouvert
            </span>
            <p className="text-white/70 text-[13px] font-medium truncate">
              Inscriptions 2025–2026 · Places limitées par niveau
            </p>
          </div>

          {/* Right — CTA + dismiss */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 bg-rouge text-white font-semibold text-[12px] px-5 py-2 rounded-full transition-all duration-150 hover:bg-rouge-dark active:scale-[0.97]"
            >
              Admissions
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <button
              onClick={dismiss}
              aria-label="Fermer"
              className="p-1.5 text-white/35 hover:text-white/70 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
