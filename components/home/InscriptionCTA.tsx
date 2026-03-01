import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { SCHOOL } from "@/lib/school-config";

export default function InscriptionCTA() {
  return (
    <section className="section-bordeaux py-24 lg:py-32 relative overflow-hidden">

      {/* Grain — same opacity as other bordeaux sections */}
      <div className="grain-texture absolute inset-0 pointer-events-none" style={{ opacity: 0.02 }} aria-hidden />

      {/* ── Background photo ── */}
      <Image
        src="/admissions-cta.jpg"
        alt=""
        fill
        className="object-cover opacity-[0.12]"
        sizes="100vw"
        aria-hidden
      />

      {/* ── Ghost letter ── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        aria-hidden
        style={{ lineHeight: 0.8 }}
      >
        <span
          className="font-display italic"
          style={{ fontSize: "38vw", color: "rgba(255,255,255,0.04)" }}
        >
          R
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">

          {/* ── Eyebrow ── */}
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-white/40 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" aria-hidden />
              Rentrée 2025 – 2026
            </p>
          </Reveal>

          {/* ── Headline ── */}
          <Reveal delay={80}>
            <h2
              className="font-display font-semibold text-white tracking-tight leading-tight mb-6"
              style={{ fontSize: "clamp(32px,4.5vw,60px)" }}
            >
              Offrez à votre enfant<br />
              l&apos;excellence qu&apos;il mérite.
            </h2>
          </Reveal>

          {/* ── Supporting copy ── */}
          <Reveal delay={160}>
            <p className="text-white/60 mb-10 text-[16px] leading-relaxed max-w-sm mx-auto sm:mx-0">
              Déposez votre demande maintenant. Places limitées par niveau.
            </p>
          </Reveal>

          {/* ── Buttons ── */}
          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">

              {/* Primary */}
              <Link
                href="/inscriptions"
                className="cta-btn-primary group inline-flex items-center justify-center gap-2 bg-white text-rouge font-semibold px-8 py-4 rounded-full text-[13px] w-full sm:w-auto"
              >
                Commencer ma demande
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Secondary — WhatsApp */}
              <a
                href={SCHOOL.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn-secondary inline-flex items-center justify-center gap-2 border border-white/25 text-white font-medium px-8 py-4 rounded-full text-[13px] w-full sm:w-auto"
              >
                <svg className="w-4 h-4 opacity-70 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Question sur WhatsApp
              </a>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
