import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import React, { type ReactNode } from "react";

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────

interface Cta {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
}

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctas?: Cta[];
  image?: { src: string; alt: string };
  /** "light" = white bg (default). "dark" = near-black bg for dark-themed pages. */
  variant?: "light" | "dark";
  /** Optional giant ghost letter rendered behind the content. */
  decorativeLetter?: string;
  /** Extra content rendered below the CTA buttons (e.g. checklist chips). */
  children?: ReactNode;
}

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────

const ARROW = (
  <svg
    className="w-3.5 h-3.5 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  ctas,
  image,
  variant = "light",
  decorativeLetter,
  children,
}: PageHeroProps) {
  const dark = variant === "dark";

  return (
    <section
      className="relative overflow-hidden pt-[68px] lg:pt-[76px]"
      style={{ background: dark ? "#0a0c0e" : "#ffffff" }}
    >
      {/* ── Decorative rouge radial glow (dark variant) ── */}
      {dark && (
        <div
          className="absolute top-0 left-1/3 -translate-x-1/2 w-[600px] h-[300px] -translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(150,0,24,0.14) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      )}

      {/* ── Top hairline (dark variant) ── */}
      {dark && (
        <div
          className="absolute top-[68px] lg:top-[76px] inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
          }}
          aria-hidden
        />
      )}

      {/* ── Ghost decorative letter ── */}
      {decorativeLetter && (
        <div
          className="absolute right-0 bottom-0 select-none pointer-events-none hidden lg:block"
          aria-hidden
          style={{ lineHeight: 0.8 }}
        >
          <span
            className="font-display italic"
            style={{
              fontSize: "28vw",
              color: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.035)",
            }}
          >
            {decorativeLetter}
          </span>
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div
          className={
            image
              ? "grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center"
              : ""
          }
        >
          {/* Left — text */}
          <div className={image ? "" : "max-w-3xl"}>
            {eyebrow && (
              <Reveal>
                <p
                  className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase mb-5 ${
                    dark ? "text-white/30" : "text-black/30"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#960018" }}
                    aria-hidden
                  />
                  {eyebrow}
                </p>
              </Reveal>
            )}

            <Reveal delay={70}>
              <h1
                className={`font-display font-semibold tracking-tight leading-tight mb-5 ${
                  dark ? "text-white" : "text-black"
                }`}
                style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
              >
                {title}
              </h1>
            </Reveal>

            {subtitle && (
              <Reveal delay={140}>
                <p
                  className={`text-[16px] leading-relaxed mb-8 max-w-lg ${
                    dark ? "text-white/40" : "text-black/50"
                  }`}
                >
                  {subtitle}
                </p>
              </Reveal>
            )}

            {ctas && ctas.length > 0 && (
              <Reveal delay={200}>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  {ctas.map((cta) => {
                    const isPrimary = cta.variant !== "secondary";
                    const linkProps = cta.external
                      ? { target: "_blank" as const, rel: "noopener noreferrer" }
                      : {};
                    const cls = isPrimary
                      ? "inline-flex items-center justify-center gap-2 bg-rouge text-white font-semibold px-8 py-4 rounded-full text-[13px] hover:bg-rouge-dark transition-all duration-200 hover:shadow-lg hover:shadow-rouge/25 active:scale-[0.97]"
                      : `inline-flex items-center justify-center gap-2 border font-medium px-8 py-4 rounded-full text-[13px] transition-all active:scale-[0.97] ${
                          dark
                            ? "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                            : "border-black/10 text-black/55 hover:border-black/20 hover:text-black"
                        }`;
                    return (
                      <Link key={cta.href} href={cta.href} className={cls} {...linkProps}>
                        {cta.label}
                        {isPrimary && ARROW}
                      </Link>
                    );
                  })}
                </div>
              </Reveal>
            )}

            {children && (
              <Reveal delay={260}>
                <div>{children}</div>
              </Reveal>
            )}
          </div>

          {/* Right — clean image, no overlay */}
          {image && (
            <Reveal delay={100} className="hidden lg:block">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-black/8 shadow-xl shadow-black/10">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 100vw"
                  priority
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* ── Bottom hairline (dark variant) ── */}
      {dark && (
        <div
          className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
          }}
          aria-hidden
        />
      )}
    </section>
  );
}
