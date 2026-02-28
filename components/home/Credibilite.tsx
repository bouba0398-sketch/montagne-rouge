import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    label: "Fondée en 1996",
    title: "30 ans d'excellence",
    desc: "Trois décennies de formation au service des familles dakaroises. Une réputation construite sur des résultats concrets, génération après génération.",
    floatDuration: "9s",
    floatDelay: "0s",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    label: "3 – 18 ans",
    title: "De la maternelle au lycée",
    desc: "Un parcours éducatif continu et cohérent. L'élève grandit dans un même cadre bienveillant, de ses premiers apprentissages jusqu'au baccalauréat.",
    floatDuration: "10.5s",
    floatDelay: "2.2s",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    label: "98 % au baccalauréat",
    title: "Excellence académique",
    desc: "Des enseignants certifiés, un suivi individualisé et des méthodes rigoureuses. Des résultats mesurables qui reflètent l'exigence de l'établissement.",
    floatDuration: "9.5s",
    floatDelay: "1.1s",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    label: "Méthodes actives",
    title: "Pédagogie moderne",
    desc: "Programmes enrichis, apprentissage par projets, environnement stimulant. Montagne Rouge prépare ses élèves aux défis du monde contemporain.",
    floatDuration: "8.5s",
    floatDelay: "3.4s",
  },
];

export default function Credibilite() {
  return (
    <section className="section-bordeaux py-28 lg:py-36 relative overflow-hidden">

      {/* Grain texture — premium depth, opacity 2% — never on hero */}
      <div className="grain-texture absolute inset-0 pointer-events-none" style={{ opacity: 0.02 }} aria-hidden />

      {/* ── Ghost letter ── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        aria-hidden
        style={{ lineHeight: 0.8 }}
      >
        <span
          className="font-display italic"
          style={{ fontSize: "36vw", color: "rgba(255,255,255,0.038)" }}
        >
          M
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" aria-hidden />
            Institution · Depuis 1996
          </p>
          <h2
            className="font-display font-semibold tracking-tight text-white leading-tight mb-5"
            style={{ fontSize: "clamp(30px,4vw,48px)" }}
          >
            Une école de référence<br className="hidden sm:block" /> au Sénégal
          </h2>
          <p className="text-[15px] text-white/60 leading-relaxed">
            Montagne Rouge, école internationale privée à Ouakam – Cité Avion,
            forme les futures générations depuis 1996.
          </p>
        </Reveal>

        {/* ── Photo strip ── */}
        <Reveal className="mb-12">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/6] lg:aspect-[21/7]">
            <Image
              src="/credibilite-enseignant.jpg"
              alt="Enseignant en interaction avec ses élèves à Montagne Rouge"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, transparent 40%, rgba(92,0,15,0.68) 100%)" }} />
          </div>
        </Reveal>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {pillars.map((pillar, i) => (
            <Reveal key={i} delay={i * 80}>
              {/*
                Float wrapper — independent slow oscillation per card.
                Reveal handles scroll fade on its own outer div.
              */}
              <div
                className="h-full"
                style={{
                  animation: `card-float ${pillar.floatDuration} ease-in-out ${pillar.floatDelay} infinite`,
                }}
              >
                {/* credibility-card class drives all hover states in globals.css */}
                <div className="credibility-card group h-full bg-white rounded-[28px] border border-black/[0.07] p-8">

                  {/* Icon — red circle on white card */}
                  <div className="w-10 h-10 rounded-2xl bg-rouge/10 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-rouge/16">
                    <span className="block transition-transform duration-700 ease-out group-hover:scale-110">
                      {pillar.icon}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-rouge/70 mb-2">
                    {pillar.label}
                  </p>

                  {/* Title */}
                  <h3 className="font-semibold text-[#111318] text-[17px] leading-snug mb-3">
                    {pillar.title}
                  </h3>

                  {/* Red accent line — driven by CSS via .credibility-card:hover */}
                  <div className="card-accent-line mb-4" />

                  {/* Description */}
                  <p className="text-sm text-black/50 leading-relaxed">
                    {pillar.desc}
                  </p>

                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
