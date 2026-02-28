import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug } from "@/data/actualites";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable — Montagne Rouge" };
  return {
    title: `${article.title} — Montagne Rouge`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="pt-16 lg:pt-20">

      {/* ── Back bar ─────────────────────────────────────── */}
      <div style={{ background: "#0a0c0e", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-[12px] font-semibold transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux actualités
          </Link>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: article.gradient }}
      >
        {/* Dark overlay for text contrast */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.40)" }}
          aria-hidden
        />

        {/* Decorative circles */}
        <div
          className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-hidden
        />
        <div
          className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.03)" }}
          aria-hidden
        />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">

          {/* Category + urgent */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.80)" }}
            >
              {article.category}
            </span>
            {article.urgent && (
              <span
                className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full"
                style={{ background: "#960018", color: "#fff" }}
              >
                Urgent
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-display font-semibold text-white tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(26px, 4vw, 52px)" }}
          >
            {article.title}
          </h1>

          {/* Date */}
          <p
            className="text-[13px] font-medium"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {article.date}
          </p>
        </div>
      </section>

      {/* ── Article content ───────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">

          {/* Lead / excerpt */}
          <p
            className="text-[17px] font-medium leading-relaxed mb-10 pb-10"
            style={{
              color: "rgba(10,10,10,0.70)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {article.excerpt}
          </p>

          {/* Body paragraphs */}
          <div className="space-y-5">
            {article.content.map((para, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.85]"
                style={{ color: "rgba(10,10,10,0.60)" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* CTA block */}
          {article.urgent && (
            <div
              className="mt-12 rounded-2xl p-6"
              style={{
                background: "rgba(150,0,24,0.04)",
                border: "1px solid rgba(150,0,24,0.12)",
              }}
            >
              <p className="text-[14px] font-semibold text-black mb-1">
                Prêt à démarrer votre inscription ?
              </p>
              <p className="text-[13px] text-black/50 mb-4">
                Déposez votre dossier en ligne en quelques minutes.
              </p>
              <Link
                href="/inscriptions"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{ background: "#960018" }}
              >
                Démarrer une inscription
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}

          {/* Bottom nav */}
          <div
            className="mt-16 pt-10 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
          >
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-[13px] font-semibold transition-colors duration-200 hover:text-rouge"
              style={{ color: "rgba(10,10,10,0.38)" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Toutes les actualités
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
