"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES, CATEGORIES, type Category, type Article } from "@/data/actualites";

/* ── Card ───────────────────────────────────────────────── */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="news-page-card block rounded-3xl overflow-hidden group"
      style={{
        background:   "#1c1f26",
        border:       "1px solid rgba(255,255,255,0.06)",
        boxShadow:    "0 4px 24px rgba(0,0,0,0.30)",
        animationDelay: `${index * 55}ms`,
      }}
    >
      {/* ── Image placeholder ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "180px", background: article.gradient }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.03)" }}
          aria-hidden
        />
        {/* Urgent badge */}
        {article.urgent && (
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.90)" }}
            >
              Urgent
            </span>
          </div>
        )}
        {/* Subtle bottom gradient for depth */}
        <div
          className="absolute bottom-0 inset-x-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)" }}
          aria-hidden
        />
      </div>

      {/* ── Content ── */}
      <div className="p-6 lg:p-7">
        {/* Category + date */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full"
            style={
              article.urgent
                ? { background: "#960018", color: "#fff" }
                : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }
            }
          >
            {article.category}
          </span>
          <span
            className="text-[11px] font-medium"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-semibold text-[15px] leading-snug mb-3 transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          {article.title}
        </h2>

        {/* Accent line */}
        <div
          className="h-px w-8 mb-4 transition-all duration-300 group-hover:w-12"
          style={{
            background: article.urgent
              ? "rgba(150,0,24,0.70)"
              : "rgba(255,255,255,0.09)",
          }}
        />

        {/* Excerpt */}
        <p
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {article.excerpt}
        </p>

        {/* CTA */}
        <div
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-200"
          style={{ color: article.urgent ? "#960018" : "rgba(255,255,255,0.30)" }}
        >
          Lire l&apos;article
          <svg
            className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function ActualitesPage() {
  const [active, setActive] = useState<Category>("Tous");

  const filtered =
    active === "Tous"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === active);

  return (
    <>
      {/* ══ FILTER BAR ═════════════════════════════════════ */}
      <div
        className="sticky top-[68px] lg:top-[76px] z-30 py-3.5"
        style={{
          background: "rgba(10,12,14,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-2 overflow-x-auto news-filter-scroll">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="shrink-0 text-[12px] font-semibold rounded-full transition-all duration-200 active:scale-[0.96]"
                  style={
                    isActive
                      ? { background: "#960018", color: "#fff", border: "1px solid #960018", padding: "7px 18px" }
                      : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.42)", border: "1px solid rgba(255,255,255,0.06)", padding: "7px 18px" }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ GRID ═══════════════════════════════════════════ */}
      <section
        className="min-h-[60vh] py-14 lg:py-20"
        style={{ background: "#0f1115" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Count */}
          <p
            className="text-[11px] font-semibold uppercase tracking-wider mb-10"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {active !== "Tous" && ` · ${active}`}
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((article, i) => (
                <ArticleCard
                  key={`${active}-${article.slug}`}
                  article={article}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p style={{ color: "rgba(255,255,255,0.20)" }} className="text-[15px]">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
