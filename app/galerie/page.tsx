import type { Metadata } from "next";
import Image from "next/image";
import GalerieGrid from "@/components/galerie/GalerieGrid";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Découvrez la vie à l'école Montagne Rouge en images : salles de classe, sport, arts, événements et campus.",
};

export default function GaleriePage() {
  return (
    <main className="pt-16 lg:pt-20">

      {/* ── Cinematic header ── */}
      <section className="relative min-h-[48vh] lg:min-h-[52vh] flex items-end overflow-hidden">
        <Image
          src="/galerie-vie-scolaire.jpg"
          alt="Vie scolaire à Montagne Rouge"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Ghost letter */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
          aria-hidden
          style={{ lineHeight: 0.8 }}
        >
          <span
            className="font-display italic"
            style={{ fontSize: "28vw", color: "rgba(255,255,255,0.04)" }}
          >
            G
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-14 lg:pb-20 w-full">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" aria-hidden />
            Galerie photo · Montagne Rouge
          </p>
          <h1
            className="font-display font-semibold tracking-tight text-white leading-tight max-w-2xl"
            style={{ fontSize: "clamp(34px,5vw,62px)" }}
          >
            La vie à Montagne Rouge<br className="hidden sm:block" /> en images.
          </h1>
          <p className="text-white/50 mt-4 text-[15px] max-w-lg leading-relaxed">
            Vie scolaire, classes, sport, arts, campus et événements — l&apos;école telle qu&apos;elle est au quotidien.
          </p>
        </div>
      </section>

      {/* Filter + Grid (client component) */}
      <GalerieGrid />

    </main>
  );
}
