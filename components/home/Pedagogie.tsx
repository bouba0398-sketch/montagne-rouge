import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const methods = [
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Excellence académique",
    desc: "Des enseignants certifiés, des programmes rigoureux et des bilans hebdomadaires. Chaque élève est suivi avec exigence et bienveillance.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Encadrement rigoureux",
    desc: "Un suivi individualisé à chaque étape, avec des rapports réguliers partagés avec les familles. L'élève n'avance jamais seul.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Discipline & valeurs",
    desc: "Un cadre structuré fondé sur le respect, la persévérance et la responsabilité. Des valeurs transmises durablement, bien au-delà des résultats scolaires.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "Innovation pédagogique",
    desc: "Des méthodes actives, des projets interdisciplinaires et des outils numériques intégrés. Une école sérieuse et tournée vers l'avenir.",
  },
];

const journey = [
  {
    level: "Maternelle",
    ages: "3 – 5 ans",
    classes: "PS · MS · GS",
    desc: "L'éveil émotionnel et cognitif dans un environnement sécurisant. La curiosité comme premier moteur d'apprentissage.",
  },
  {
    level: "Primaire",
    ages: "6 – 11 ans",
    classes: "CP → CM2",
    desc: "Les fondations académiques posées avec méthode et exigence — lecture, calcul, expression, sciences.",
  },
  {
    level: "Collège",
    ages: "12 – 15 ans",
    classes: "6ème → 3ème",
    desc: "Approfondissement disciplinaire, construction de l'autonomie et préparation rigoureuse au BFEM.",
  },
  {
    level: "Lycée",
    ages: "16 – 18 ans",
    classes: "2nde → Terminale",
    desc: "Préparation intensive au baccalauréat. 98% de réussite. Orientation vers les études supérieures.",
  },
];

const outcomes = [
  { value: "30",    label: "ans d'expertise",        sub: "et de méthodes éprouvées" },
  { value: "98%",   label: "au baccalauréat",         sub: "chaque année depuis 10 ans" },
  { value: "1 500+", label: "diplômés",               sub: "accompagnés depuis 1996" },
  { value: "100%",  label: "orientés",                sub: "vers leurs études supérieures" },
];

// ─────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────

export default function Pedagogie() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── 1. Intro block ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-10 items-end">

          {/* Left — headline */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-black/30 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" aria-hidden />
                Pédagogie · Depuis 1996
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="font-display font-semibold tracking-tight text-black leading-tight"
                style={{ fontSize: "clamp(30px,4vw,52px)" }}
              >
                Une pédagogie<br />
                d&apos;excellence<br />
                depuis 30 ans
              </h2>
            </Reveal>
          </div>

          {/* Right — body + link */}
          <Reveal delay={140} className="lg:pb-2">
            <p className="text-[16px] text-black/50 leading-[1.75] mb-8 max-w-md">
              Montagne Rouge conçoit l&apos;éducation comme un engagement global
              envers chaque élève. Notre approche conjugue rigueur académique,
              accompagnement personnalisé et transmission de valeurs durables —
              de la petite section jusqu&apos;au baccalauréat.
            </p>
            <blockquote className="border-l-2 border-rouge/25 pl-5 mb-8">
              <p className="font-display italic text-[17px] text-black/55 leading-relaxed">
                &ldquo;Former l&apos;élève d&apos;aujourd&apos;hui pour en faire
                le citoyen de demain.&rdquo;
              </p>
            </blockquote>
            <Link
              href="/pedagogie"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-rouge hover:text-rouge-dark transition-colors group"
            >
              Découvrir notre approche complète
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </Reveal>

        </div>

        {/* ── Photo break ── */}
        <Reveal className="mb-20">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/6] lg:aspect-[21/7]">
            <Image
              src="/pedagogie-cours.jpg"
              alt="Enseignant aidant un élève dans son apprentissage"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/8 to-transparent" />
          </div>
        </Reveal>

        {/* ── 2. Method cards ───────────────────────────────── */}
        <div className="mb-24">
          <Reveal className="mb-10">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-black/25">
              Notre méthode
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {methods.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group p-8 rounded-2xl bg-[#F8F7F5] border border-transparent hover:bg-white hover:border-black/6 hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-400 h-full">

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-rouge/8 flex items-center justify-center mb-7 transition-colors duration-500 group-hover:bg-rouge/14">
                    <span className="transition-transform duration-500 group-hover:scale-110 block">
                      {m.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-black text-[17px] leading-snug mb-3">
                    {m.title}
                  </h3>

                  {/* Accent line */}
                  <div className="h-px w-7 bg-rouge/20 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-rouge/40" />

                  {/* Body */}
                  <p className="text-sm text-black/45 leading-relaxed">
                    {m.desc}
                  </p>

                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── 3. Student journey ────────────────────────────── */}
        <div className="mb-24">
          <Reveal className="mb-10">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-black/25">
              Le parcours · 3 à 18 ans
            </p>
          </Reveal>

          {/* Desktop: horizontal timeline */}
          <div className="relative hidden lg:block">
            {/* Connector line */}
            <div
              className="absolute h-px bg-black/7"
              style={{ top: "11px", left: "calc(12.5% + 12px)", right: "calc(12.5% + 12px)" }}
              aria-hidden
            />
            <div className="grid grid-cols-4 gap-8">
              {journey.map((stage, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div>
                    {/* Dot */}
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-rouge flex items-center justify-center mb-6 transition-shadow duration-300 hover:shadow-md hover:shadow-rouge/20">
                      <span className="w-2 h-2 rounded-full bg-rouge" />
                    </div>
                    {/* Stage info */}
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-rouge mb-1">
                      {stage.ages}
                    </p>
                    <h3 className="font-semibold text-black text-[16px] leading-snug mb-1">
                      {stage.level}
                    </h3>
                    <p className="text-[11px] text-black/25 font-medium mb-3">
                      {stage.classes}
                    </p>
                    <p className="text-[13px] text-black/45 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden">
            {journey.map((stage, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="flex gap-5">
                  {/* Left rail */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-rouge flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-rouge" />
                    </div>
                    {i < journey.length - 1 && (
                      <div className="w-px flex-1 bg-black/7 mt-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-8">
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-rouge mb-0.5">
                      {stage.ages}
                    </p>
                    <h3 className="font-semibold text-black text-[16px] mb-0.5">
                      {stage.level}
                    </h3>
                    <p className="text-[11px] text-black/25 font-medium mb-2">
                      {stage.classes}
                    </p>
                    <p className="text-[13px] text-black/45 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── 4. Outcomes ───────────────────────────────────── */}
        <div className="border-t border-black/6 pt-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className={`lg:px-8 ${i > 0 ? "lg:border-l lg:border-black/6" : ""}`}>
                  <div
                    className="font-display italic text-rouge leading-none mb-2 tabular-nums"
                    style={{ fontSize: "clamp(36px,3.5vw,50px)" }}
                  >
                    {o.value}
                  </div>
                  <p className="text-[14px] font-semibold text-black mb-0.5">
                    {o.label}
                  </p>
                  <p className="text-[12px] text-black/35 leading-snug">
                    {o.sub}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
