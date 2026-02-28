"use client";

import Reveal from "@/components/ui/Reveal";

const chiffres = [
  {
    value: "30",
    unit: "ans",
    label: "d'excellence",
    sub: "1996 – 2026",
  },
  {
    value: "5",
    unit: "cycles",
    label: "de la maternelle au lycée",
    sub: "Parcours complet",
  },
  {
    value: "6+",
    unit: "services",
    label: "dans un seul établissement",
    sub: "Cantine · Tenues · Étude dirigée · Cours vacances · Inscriptions · Mensualités",
  },
  {
    value: "Dakar",
    unit: "",
    label: "Ouakam – Cité Avion",
    sub: "Sénégal",
  },
];

export default function ChiffresProuves() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#18191D" }}>

      {/* Subtle rouge glow top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(196,30,58,0.10) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Ghost letter */}
      <div
        className="absolute left-0 bottom-0 select-none pointer-events-none hidden lg:block"
        aria-hidden
        style={{ lineHeight: 0.75, overflow: "hidden" }}
      >
        <span
          className="font-display italic"
          style={{ fontSize: "28vw", color: "rgba(255,255,255,0.025)" }}
        >
          30
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <Reveal className="mb-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "rgba(196,30,58,0.7)" }}>
            En chiffres
          </p>
          <h2
            className="font-display font-semibold tracking-tight text-white leading-tight max-w-xl"
            style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
          >
            Une institution qui a fait ses preuves
          </h2>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          {chiffres.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className="group p-8 lg:p-10 transition-colors duration-300 cursor-default"
                style={{ background: "#18191D" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1e1f24")}
                onMouseLeave={e => (e.currentTarget.style.background = "#18191D")}
              >
                {/* Big number */}
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span
                    className="font-display italic font-semibold leading-none tabular-nums"
                    style={{ fontSize: "clamp(42px,5vw,68px)", color: "#ffffff" }}
                  >
                    {c.value}
                  </span>
                  {c.unit && (
                    <span
                      className="font-semibold text-rouge"
                      style={{ fontSize: "clamp(14px,1.5vw,18px)" }}
                    >
                      {c.unit}
                    </span>
                  )}
                </div>

                {/* Accent line */}
                <div
                  className="h-px mb-4 transition-all duration-500 group-hover:w-10"
                  style={{ width: "24px", background: "rgba(196,30,58,0.5)" }}
                />

                <p className="text-white/70 text-[14px] font-medium leading-snug mb-1">
                  {c.label}
                </p>
                <p className="text-white/28 text-[11px] leading-relaxed">
                  {c.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={320}>
          <p className="mt-10 text-white/22 text-[12px] max-w-lg leading-relaxed">
            Montagne Rouge accompagne les familles de Dakar depuis 1996 avec un parcours scolaire complet et des services intégrés pensés pour faciliter la vie des parents.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
