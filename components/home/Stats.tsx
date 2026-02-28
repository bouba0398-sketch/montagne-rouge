import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";

const stats = [
  { value: "500+", label: "Élèves",      sub: "de la maternelle au lycée" },
  { value: "45+",  label: "Enseignants", sub: "qualifiés et certifiés" },
  { value: "30",   label: "Ans",         sub: "d'excellence académique" },
  { value: "98%",  label: "Réussite",    sub: "au baccalauréat" },
];

export default function Stats() {
  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden border-t border-white/8"
      style={{ background: "linear-gradient(168deg, #841219 0%, #8B1020 50%, #7A0D1B 100%)" }}
    >

      {/* ── Ghost letter ── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        aria-hidden
        style={{ lineHeight: 0.8 }}
      >
        <span
          className="font-display italic"
          style={{ fontSize: "40vw", color: "rgba(255,255,255,0.032)" }}
        >
          E
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="py-8 lg:py-0 lg:px-10 border-b border-white/8 lg:border-b-0 lg:border-l lg:border-white/8 first:lg:border-l-0 first:lg:pl-0 text-center lg:text-left"
            >
              <StatCounter
                raw={stat.value}
                className="font-display italic text-white mb-1.5 tabular-nums leading-none"
                style={{ fontSize: "clamp(48px,5vw,72px)" }}
              />
              <p className="text-white font-semibold text-base mb-1">
                {stat.label}
              </p>
              <p className="text-white/45 text-xs leading-relaxed">
                {stat.sub}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
