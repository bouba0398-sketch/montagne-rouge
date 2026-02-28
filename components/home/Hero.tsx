"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/*
  Glass lives INSIDE textRef (position: absolute, inset: 0, z-index: 0).
  Text (contentRef) sits at z-index: 1 within the same container.

  This means the glass backdrop-filter only ever captures the section's
  background layers (z-0…z-3) — it can never reach the text, which is
  painted after the glass in its own stacking layer.

  No useLayoutEffect sync needed: inset:0 fills the container automatically.
*/
const GLASS_BASE: React.CSSProperties = {
  position:             "absolute",
  inset:                0,
  zIndex:               0,
  pointerEvents:        "none",
  borderRadius:         "20px",
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  background:           "rgba(0, 0, 0, 0.30)",
  border:               "1px solid rgba(255, 255, 255, 0.14)",
  /* 3-layer shadow — base values match float-shadow 0% keyframe for seamless start */
  boxShadow:            "0 50px 100px rgba(0,0,0,0.24), 0 16px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)",
  /* shadow animation synced to glass-float (same 6s period) — elevation rises → shadow extends */
  animation:            "float-shadow 8s ease-in-out infinite alternate",
};

export default function Hero() {
  const bgRef      = useRef<HTMLDivElement>(null);
  const lightRef   = useRef<HTMLDivElement>(null);
  const glassRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const videoRef   = useRef<HTMLVideoElement>(null);

  /* Programmatic autoplay fallback — handles iOS Low Power Mode and any browser
     that blocks the autoplay attribute. Silent catch = poster stays visible. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Prevent iOS AirPlay UI from hijacking the video element (non-standard attr)
    video.setAttribute("x-webkit-airplay", "deny");
    // Fire .play() manually — no-op if already playing, silent if blocked
    video.play().catch(() => {});
  }, []);

  /* Three-layer RAF parallax */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const y      = window.scrollY;
        const bgY    = Math.min(80, y * 0.15);  // background pulls away — creates depth
        const lightY = Math.min(40, y * 0.08);  // light at mid-depth
        const textY  = Math.min(20, y * 0.04);  // card barely moves — feels grounded
        if (bgRef.current)    bgRef.current.style.transform    = `translateY(${bgY}px) scale(1.12)`;
        if (lightRef.current) lightRef.current.style.transform = `translateY(${lightY}px)`;
        if (textRef.current)  textRef.current.style.transform  = `translateY(${textY}px)`;
        // glass is inside textRef — it moves with it automatically

        // Shadow depth on scroll: card sinks → shadow compresses and darkens
        if (glassRef.current) {
          if (y < 5) {
            glassRef.current.style.boxShadow = ""; // restore CSS float-shadow animation
          } else {
            const t      = Math.min(1, y / 200);
            const offset = Math.round(50 - t * 14);          // 50 → 36px
            const blur   = Math.round(100 - t * 28);         // 100 → 72px
            const alpha  = (0.24 + t * 0.10).toFixed(2);     // 0.24 → 0.34
            glassRef.current.style.boxShadow =
              `0 ${offset}px ${blur}px rgba(0,0,0,${alpha}), 0 16px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)`;
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    /*
      overflow-hidden removed from section — it blocks backdrop-filter in Safari.
      Background clipping is handled by the bgRef wrapper's own overflow-hidden.
    */
    <section className="relative z-0 min-h-screen flex flex-col justify-center">

      {/*
        overflow-hidden here clips the scale(1.12) scaled image
        so its edges don't bleed outside the hero section.
        Keeping overflow-hidden on this inner wrapper (not section) fixes Safari.
      */}
      {/* background:#000 prevents white flash on slow connections before poster loads */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0, background: "#000" }}>
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ transform: "scale(1.12)", willChange: "transform" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            disablePictureInPicture
            disableRemotePlayback
            suppressHydrationWarning
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",        // removes inline bottom gap
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ── Cinematic sunlight glow ── */}
      <div
        ref={lightRef}
        className="hero-sunlight absolute inset-0 z-[1] pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* ── Micro particles ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ overflow: "hidden" }}>
        {([
          { size: 2, left: "8%",  top: "22%", delay: "0s",   dur: "9s"  },
          { size: 3, left: "19%", top: "55%", delay: "1.8s", dur: "13s" },
          { size: 2, left: "31%", top: "38%", delay: "3.2s", dur: "10s" },
          { size: 2, left: "44%", top: "67%", delay: "0.6s", dur: "12s" },
          { size: 3, left: "12%", top: "78%", delay: "5.1s", dur: "11s" },
          { size: 2, left: "25%", top: "14%", delay: "2.4s", dur: "14s" },
          { size: 2, left: "6%",  top: "47%", delay: "4.0s", dur: "8s"  },
          { size: 3, left: "38%", top: "82%", delay: "1.1s", dur: "15s" },
        ] as const).map((p, i) => (
          <div key={i} className="hero-particle absolute rounded-full"
            style={{ width: p.size, height: p.size, left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur }} />
        ))}
      </div>

      {/* ── Top gradient — nav readability ── */}
      <div
        className="absolute top-0 left-0 right-0 z-[3] pointer-events-none"
        style={{ height: "200px", background: "linear-gradient(to bottom, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.05) 65%, transparent 100%)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-[10] max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-24 w-full">
        {/* Floating card — glass + text move as one unit */}
        <div style={{ animation: "glass-float 8s ease-in-out infinite alternate" }}>
        <div ref={textRef} style={{ position: "relative", width: "100%", maxWidth: "460px" }}>

          {/*
            Glass lives here — inside textRef, z-0.
            backdrop-filter sees only the section background layers behind
            the content wrapper. Text (contentRef) is at z-1 → always above.
          */}
          <div ref={glassRef} style={GLASS_BASE} />

          {/* Sheen — soft light reflection drifting across the glass */}
          <div className="glass-sheen" style={{ position: "absolute", inset: 0, borderRadius: "20px", zIndex: 0 }} />

          <div ref={contentRef} style={{ position: "relative", zIndex: 1, padding: "12px 24px 13px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "rgba(255,255,255,0.85)" }}>
                  École Internationale Privée · Dakar, Sénégal
                </span>
              </div>

              {/* Logo — main hero visual */}
              <div className="w-[240px] sm:w-[360px]" style={{ maxWidth: "100%", marginBottom: "7px" }}>
                <Image
                  src="/montagne-rouge-logo-full.svg"
                  alt="Montagne Rouge — École Internationale Privée à Dakar"
                  width={360}
                  height={100}
                  priority
                  unoptimized
                  style={{ width: "100%", height: "auto", display: "block", mixBlendMode: "screen" }}
                />
              </div>

              {/* Tagline */}
              <p style={{ fontSize: "clamp(17px, 2vw, 20px)", color: "#ffffff", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.3, marginBottom: "11px" }}>
                Former les leaders du Sénégal de demain.
              </p>

              {/* Description */}
              <p style={{ fontSize: "clamp(13px, 1.4vw, 15px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: "360px", marginBottom: "24px" }}>
                Montagne Rouge, école internationale privée située à Ouakam – Cité Avion, accompagne les élèves de la maternelle au lycée depuis près de 30 ans.
                <br />
                En 2026, l&apos;établissement célèbre ses 30 ans d&apos;excellence académique au service des familles dakaroises.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <Link href="/inscriptions"
                  className="group inline-flex items-center justify-center gap-2 bg-rouge text-white font-semibold px-7 py-3.5 rounded-full text-[13px] hover:bg-rouge-dark transition-all duration-200 hover:shadow-lg hover:shadow-rouge/30 hover:-translate-y-px">
                  Inscriptions ouvertes
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/ecole"
                  className="inline-flex items-center justify-center font-medium px-7 py-3.5 rounded-full text-[13px] transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.90)" }}>
                  Découvrir l&apos;école
                </Link>
              </div>

              {/* Stat line */}
              <p className="text-[11px] font-medium tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.50)" }}>
                30 ans d&apos;excellence&nbsp;•&nbsp;Ouakam – Cité Avion&nbsp;•&nbsp;Depuis 1996
              </p>

          </div>
        </div>
        </div>{/* end floating card */}
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden>
        <svg className="w-5 h-5 drop-shadow" style={{ color: "rgba(255,255,255,0.7)" }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  );
}
