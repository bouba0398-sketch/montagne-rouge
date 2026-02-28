import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";

/*
  ── Editable metric values ────────────────────────────────────
  To update any figure, change the `value` field below.
  To edit BFEM: change stats[4].value  (currently "95%")
  To edit CFEE: change stats[5].value  (currently "97%")
  StatCounter parses "500+" / "98%" / "30" automatically.
──────────────────────────────────────────────────────────────── */
const stats = [
  {
    value: "500+",
    label: "Élèves",
    sub:   "de la maternelle au lycée",
  },
  {
    value: "45+",
    label: "Enseignants",
    sub:   "certifiés et expérimentés",
  },
  {
    value: "30",
    label: "Ans",
    sub:   "d'excellence académique",
  },
  {
    value: "98%",
    label: "Baccalauréat",
    sub:   "taux de réussite",
  },
  // ── New metrics — edit values here ──────────────────────
  {
    value: "95%",
    label: "BFEM",
    sub:   "taux de réussite au brevet",
  },
  {
    value: "97%",
    label: "CFEE",
    sub:   "taux de réussite au certificat",
  },
];

export default function Stats() {
  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "#0f1115" }}
    >

      {/* Top border rule — visually separates from Niveaux (white) */}
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
        <Reveal className="mb-12 lg:mb-14">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rouge/60 shrink-0" aria-hidden />
            Performances
          </p>
          <h2
            className="font-display font-semibold tracking-tight text-white leading-tight"
            style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
          >
            Des résultats qui parlent<br className="hidden sm:block" /> d&apos;eux-mêmes
          </h2>
        </Reveal>

        {/* ── 6-card metric grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className="stat-card h-full p-7 lg:p-8 rounded-3xl cursor-default"
                style={{
                  background:  "#1c1f26",
                  border:      "1px solid rgba(255,255,255,0.06)",
                  boxShadow:   "0 4px 24px rgba(0,0,0,0.25)",
                }}
              >
                {/* Animated number */}
                <StatCounter
                  raw={stat.value}
                  className="font-display italic text-white tabular-nums leading-none mb-2"
                  style={{ fontSize: "clamp(40px,4.5vw,64px)" }}
                />

                {/* Label */}
                <p className="text-white font-semibold text-[15px] mb-2.5">
                  {stat.label}
                </p>

                {/* Carmin accent rule */}
                <div
                  className="h-px w-7 mb-2.5"
                  style={{ background: "rgba(150, 0, 24, 0.55)" }}
                />

                {/* Sub-label */}
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {stat.sub}
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
