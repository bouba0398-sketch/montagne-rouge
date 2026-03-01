import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import { SCHOOL } from "@/lib/school-config";

/*
  ── Montagne Rouge en chiffres ────────────────────────────────
  Source : lib/school-config.ts → SCHOOL.stats
  Pour modifier une valeur, éditez UNIQUEMENT lib/school-config.ts.
  ─────────────────────────────────────────────────────────────
*/

// ── Heroicons outline 24px, strokeWidth 1.5 ──────────────────
const IcoUsers = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const IcoCalendar = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const IcoTrophy = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515M5.25 4.236C6.789 4.092 8.354 4 10 4" />
  </svg>
);

const IcoCheck = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IcoCap = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 013.741-1.342m-7.5 0V3.75A2.25 2.25 0 0112 1.5a2.25 2.25 0 012.25 2.25v5.5m-4.5 0h4.5" />
  </svg>
);

const IcoStar = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

// ── Card data — all values from SCHOOL config ─────────────────
const cards = [
  {
    numeric:  true,
    raw:      SCHOOL.stats.eleves,       // "+350" — leading + now handled by StatCounter
    label:    SCHOOL.stats.elevesLabel,  // "élèves"
    sub:      SCHOOL.stats.elevesSub,    // "de la crèche à la Terminale"
    icon:     <IcoUsers />,
    featured: false,
  },
  {
    numeric:  true,
    raw:      SCHOOL.stats.annees,       // "30"
    label:    "ans d'excellence",
    sub:      `fondée en ${SCHOOL.founded}`,
    icon:     <IcoCalendar />,
    featured: false,
  },
  {
    numeric:  true,
    raw:      SCHOOL.stats.bfem,         // "100%"
    label:    SCHOOL.stats.bfemLabel,    // "BFEM"
    sub:      "6 années consécutives",
    icon:     <IcoTrophy />,
    featured: true,                      // ← stat prioritaire — glow rouge
  },
  {
    numeric:  true,
    raw:      SCHOOL.stats.cfee,         // "100%"
    label:    SCHOOL.stats.cfeeLabel,    // "CFEE"
    sub:      SCHOOL.stats.cfeeSub,      // "taux de réussite au certificat"
    icon:     <IcoCheck />,
    featured: false,
  },
  {
    numeric:  false,
    raw:      SCHOOL.levelsShort,        // "Crèche → Terminale"
    label:    "parcours complet",
    sub:      "de la petite enfance au baccalauréat",
    icon:     <IcoCap />,
    featured: false,
  },
  {
    numeric:  false,
    raw:      "Certifiés",
    label:    "équipe pédagogique",
    sub:      "enseignants diplômés et expérimentés",
    icon:     <IcoStar />,
    featured: false,
  },
];

export default function Stats() {
  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0f1115" }}
    >

      {/* Top border rule */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }}
        aria-hidden
      />

      {/* Ghost letter */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        aria-hidden
        style={{ lineHeight: 0.8 }}
      >
        <span
          className="font-display italic"
          style={{ fontSize: "40vw", color: "rgba(255,255,255,0.025)" }}
        >
          N
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <Reveal className="mb-12 lg:mb-16">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rouge/60 shrink-0" aria-hidden />
            Chiffres clés
          </p>
          <h2
            className="font-display font-semibold tracking-tight text-white leading-tight mb-3"
            style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
          >
            Montagne Rouge en chiffres
          </h2>
          <p className="text-white/40 text-[15px] max-w-md leading-relaxed">
            Une institution d&apos;excellence à Dakar depuis {SCHOOL.founded}.
          </p>
        </Reveal>

        {/* ── 6-card grid : 2 cols mobile → 3 cols md+ ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 70}>
              <div
                className="stat-card group h-full p-6 lg:p-8 rounded-3xl cursor-default"
                style={card.featured ? {
                  background: "radial-gradient(ellipse at 20% 20%, rgba(150,0,24,0.16) 0%, transparent 55%), #1e1619",
                  border:     "1px solid rgba(150, 0, 24, 0.28)",
                  boxShadow:  "0 0 40px rgba(150, 0, 24, 0.16), 0 4px 24px rgba(0,0,0,0.35)",
                } : {
                  background: "#1c1f26",
                  border:     "1px solid rgba(255,255,255,0.06)",
                  boxShadow:  "0 4px 24px rgba(0,0,0,0.25)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: card.featured
                      ? "rgba(150, 0, 24, 0.28)"
                      : "rgba(255, 255, 255, 0.06)",
                    color: card.featured
                      ? "rgba(255, 150, 150, 0.90)"
                      : "rgba(255, 255, 255, 0.38)",
                  }}
                >
                  {card.icon}
                </div>

                {/* Value — animated counter for numeric, static text for others */}
                {card.numeric ? (
                  <StatCounter
                    raw={card.raw}
                    className="font-display italic text-white tabular-nums leading-none mb-2"
                    style={{ fontSize: "clamp(36px,4vw,60px)" }}
                  />
                ) : (
                  <div
                    className="font-display italic text-white leading-tight mb-2"
                    style={{ fontSize: "clamp(20px,2vw,32px)" }}
                  >
                    {card.raw}
                  </div>
                )}

                {/* Label */}
                <p
                  className="font-semibold mb-2.5"
                  style={{
                    fontSize: "clamp(13px,1.1vw,15px)",
                    color: card.featured ? "rgba(255, 200, 200, 0.88)" : "rgba(255,255,255,0.88)",
                  }}
                >
                  {card.label}
                </p>

                {/* Carmin accent rule — grows on hover */}
                <div
                  className="h-px w-7 mb-2.5 transition-[width] duration-500 group-hover:w-12"
                  style={{
                    background: card.featured
                      ? "rgba(150, 0, 24, 0.75)"
                      : "rgba(150, 0, 24, 0.55)",
                  }}
                />

                {/* Sub-label */}
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                >
                  {card.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Bottom border rule */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }}
        aria-hidden
      />

    </section>
  );
}
