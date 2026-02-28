import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Pédagogie — Montagne Rouge",
  description:
    "Découvrez la pédagogie d'excellence de Montagne Rouge : méthodes actives, suivi individualisé, discipline et valeurs depuis 1996 à Ouakam, Dakar.",
};

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const philosophy = [
  {
    title: "Excellence académique",
    desc: "Des programmes rigoureux et des enseignants certifiés qui poussent chaque élève vers ses meilleures performances, sans exception.",
  },
  {
    title: "Rigueur & méthode",
    desc: "Un cadre exigeant où le travail, la ponctualité et l'effort sont des valeurs fondamentales cultivées dès la maternelle.",
  },
  {
    title: "Valeurs humaines",
    desc: "Respect, responsabilité, solidarité — des qualités transmises durablement, bien au-delà des résultats scolaires.",
  },
  {
    title: "Discipline structurante",
    desc: "Un environnement structuré qui favorise la concentration, la sérénité et le respect mutuel entre élèves et enseignants.",
  },
  {
    title: "Suivi individualisé",
    desc: "Chaque élève est unique. Notre approche personnalisée garantit qu'aucun enfant n'est laissé pour compte.",
  },
];

const parcours = [
  {
    num: "01",
    level: "Maternelle",
    ages: "3 – 5 ans",
    classes: "PS · MS · GS",
    desc: "L'éveil sensoriel et cognitif, le développement du langage et les premières compétences sociales dans un environnement bienveillant et structuré.",
    objectives: [
      "Développement du langage oral et préparation à l'écrit",
      "Éveil aux nombres, aux lettres et aux sciences du quotidien",
      "Socialisation progressive et respect de l'autre",
    ],
    support: "Petits effectifs, enseignante dédiée, communication quotidienne avec les familles.",
  },
  {
    num: "02",
    level: "Primaire",
    ages: "6 – 11 ans",
    classes: "CP · CE1 · CE2 · CM1 · CM2",
    desc: "Les fondations académiques posées avec méthode et exigence — lecture, écriture, calcul, sciences et découverte du monde.",
    objectives: [
      "Maîtrise solide de la lecture, de l'écriture et du calcul",
      "Curiosité intellectuelle cultivée par des projets interdisciplinaires",
      "Autonomie croissante et sens des responsabilités",
    ],
    support: "Bilans trimestriels, tutorat hebdomadaire, études dirigées disponibles.",
  },
  {
    num: "03",
    level: "Collège",
    ages: "12 – 15 ans",
    classes: "6ème · 5ème · 4ème · 3ème",
    desc: "L'approfondissement disciplinaire, la construction d'une autonomie intellectuelle et la préparation rigoureuse au BFEM.",
    objectives: [
      "Maîtrise approfondie des disciplines fondamentales",
      "Préparation au BFEM avec suivi individualisé renforcé",
      "Orientation progressive vers les filières lycéennes",
    ],
    support: "Études dirigées mer. & sam., réunions parents-professeurs mensuelles.",
  },
  {
    num: "04",
    level: "Lycée",
    ages: "16 – 18 ans",
    classes: "2nde · 1ère · Terminale",
    desc: "Préparation intensive au baccalauréat avec 98% de réussite. Accompagnement personnalisé vers les études supérieures.",
    objectives: [
      "Excellence au baccalauréat — 98% de réussite",
      "Coaching personnalisé et révisions intensives ciblées",
      "Accompagnement et orientation vers les études supérieures",
    ],
    support: "Coaching individualisé, accès autonome à la bibliothèque, orientation supérieure.",
  },
];

const activites = [
  "Football & sports collectifs",
  "Arts plastiques",
  "Théâtre & expression orale",
  "Club scientifique",
  "Chorale",
  "Initiation à la programmation",
  "Bibliothèque & lecture",
  "Étude dirigée mer. & sam.",
];

const outcomes = [
  { value: "30",     label: "ans d'existence",   sub: "et de méthodes éprouvées" },
  { value: "98%",    label: "au baccalauréat",    sub: "chaque année depuis 10 ans" },
  { value: "1 500+", label: "diplômés",           sub: "accompagnés depuis 1996" },
  { value: "100%",   label: "orientés",           sub: "vers les études supérieures" },
];

// ─────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────

export default function PedagogiePage() {
  return (
    <main className="pt-[68px] lg:pt-[76px]">

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 lg:gap-20 items-center">

            {/* Left — text */}
            <div>
              <Reveal>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-black/30 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" aria-hidden />
                  Pédagogie · 1996 – 2026
                </p>
              </Reveal>
              <Reveal delay={70}>
                <h1
                  className="font-display font-semibold tracking-tight text-black leading-tight mb-6"
                  style={{ fontSize: "clamp(36px,5vw,68px)" }}
                >
                  Une pédagogie<br />
                  d&apos;excellence<br />
                  depuis 30 ans
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-[16px] text-black/50 leading-relaxed mb-10 max-w-lg">
                  Montagne Rouge accompagne les élèves de la maternelle au lycée
                  avec exigence, discipline et accompagnement personnalisé depuis
                  plus de trois décennies à Ouakam, Dakar.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
                  <Link
                    href="/inscriptions/nouvelle-inscription"
                    className="inline-flex items-center justify-center gap-2 bg-rouge text-white font-semibold px-8 py-4 rounded-full text-[13px] hover:bg-rouge-dark transition-all duration-200 hover:shadow-lg hover:shadow-rouge/25 active:scale-[0.97]"
                  >
                    Demander une admission
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <a
                    href="https://wa.me/221770000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-black/10 text-black/55 font-medium px-8 py-4 rounded-full text-[13px] hover:border-black/20 hover:text-black transition-all"
                  >
                    Poser une question
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-black/6 pt-6">
                  {["Maternelle au Lycée", "Enseignants certifiés", "98% au baccalauréat"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-xs text-black/35">
                      <svg className="w-3.5 h-3.5 text-rouge/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — photo card with overlaid stats */}
            <Reveal delay={120} className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden h-[320px] lg:h-[480px]">

                {/* Photo */}
                <Image
                  src="/pedago-hero.jpg"
                  alt="Élève concentrée dans une salle de cours moderne"
                  fill
                  className="object-cover"
                  sizes="360px"
                  priority
                />

                {/* Gradient overlay — top transparent, bottom near-black */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/15" />

                {/* Ghost "30" */}
                <div
                  className="absolute right-0 bottom-0 select-none pointer-events-none"
                  aria-hidden
                  style={{ lineHeight: 0.75 }}
                >
                  <span
                    className="font-display italic"
                    style={{ fontSize: "14rem", color: "rgba(255,255,255,0.06)" }}
                  >
                    30
                  </span>
                </div>

                {/* Stats + quote overlaid at bottom */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                  <div className="grid grid-cols-2 gap-5 mb-7">
                    {[
                      { v: "30",   l: "ans d'excellence" },
                      { v: "98%",  l: "au baccalauréat"  },
                      { v: "500+", l: "élèves / an"      },
                      { v: "3–18", l: "ans accompagnés"  },
                    ].map(({ v, l }) => (
                      <div key={v}>
                        <div
                          className="font-display italic text-rouge leading-none mb-1 tabular-nums"
                          style={{ fontSize: "clamp(28px,2.2vw,38px)" }}
                        >
                          {v}
                        </div>
                        <p className="text-white/40 text-[11px]">{l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/12 pt-5">
                    <p className="font-display italic text-white/55 text-[14px] leading-relaxed">
                      &ldquo;Former l&apos;élève d&apos;aujourd&apos;hui pour en faire
                      le citoyen de demain.&rdquo;
                    </p>
                    <p className="text-white/25 text-[11px] mt-2 font-medium">
                      — Montagne Rouge, Ouakam
                    </p>
                  </div>
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. PHILOSOPHIE ÉDUCATIVE
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left — heading + body */}
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-black/30 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" aria-hidden />
                  Philosophie éducative
                </p>
              </Reveal>
              <Reveal delay={70}>
                <h2
                  className="font-display font-semibold tracking-tight text-black leading-tight mb-6"
                  style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
                >
                  Notre vision<br />de l&apos;éducation
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="text-[15px] text-black/50 leading-relaxed mb-6">
                  Chez Montagne Rouge, nous croyons que l&apos;éducation est bien plus
                  que la transmission de savoirs. C&apos;est un processus global qui
                  façonne le caractère, développe la pensée critique et prépare
                  chaque élève à affronter le monde avec confiance et intégrité.
                </p>
                <p className="text-[15px] text-black/40 leading-relaxed">
                  Depuis 1996, cette conviction guide chaque décision pédagogique,
                  chaque recrutement et chaque interaction avec nos élèves
                  et leurs familles.
                </p>
              </Reveal>

              {/* Photo below text — desktop only (sticky column) */}
              <Reveal delay={210} className="mt-8 hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/7]">
                  <Image
                    src="/pedago-philosophie.jpg"
                    alt="Étudiante lisant dans une bibliothèque"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/8" />
                </div>
              </Reveal>
            </div>

            {/* Right — 5 pillars */}
            <div className="space-y-5">
              {philosophy.map((p, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="flex gap-4 items-start group">
                    <div className="w-8 h-8 rounded-xl bg-rouge/8 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 group-hover:bg-rouge/14">
                      <svg className="w-4 h-4 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black text-[15px] mb-1">{p.title}</h3>
                      <p className="text-[13px] text-black/45 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. PARCOURS ÉLÈVE COMPLET
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <Reveal className="max-w-2xl mb-4">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-black/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" aria-hidden />
              Parcours élève · 3 à 18 ans
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              Un accompagnement continu<br className="hidden sm:block" />
              de 3 à 18 ans
            </h2>
          </Reveal>

          {/* Level rows */}
          <div>
            {parcours.map((lvl, i) => (
              <Reveal key={i} delay={60}>
                <div className="border-t border-black/6 py-12 grid grid-cols-1 lg:grid-cols-[180px_1fr_260px] gap-8 lg:gap-10">

                  {/* Col 1 — identifier */}
                  <div>
                    <div
                      className="font-display italic leading-none mb-3 tabular-nums"
                      style={{ fontSize: "52px", color: "rgba(196,30,58,0.18)" }}
                    >
                      {lvl.num}
                    </div>
                    <h3 className="font-semibold text-black text-[22px] leading-tight mb-1">
                      {lvl.level}
                    </h3>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-rouge mb-1">
                      {lvl.ages}
                    </p>
                    <p className="text-[11px] text-black/25 font-medium">{lvl.classes}</p>
                  </div>

                  {/* Col 2 — description + objectives */}
                  <div>
                    <p className="text-[15px] text-black/55 leading-relaxed mb-6">
                      {lvl.desc}
                    </p>
                    <div className="space-y-2.5">
                      {lvl.objectives.map((obj, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-rouge/50 shrink-0"
                            style={{ marginTop: "7px" }}
                          />
                          <p className="text-[13px] text-black/50 leading-snug">{obj}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col 3 — support block */}
                  <div
                    className="rounded-2xl p-5 self-start bg-[rgba(196,30,58,0.04)] border border-[rgba(196,30,58,0.08)]"
                  >
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-rouge/60 mb-2">
                      Accompagnement
                    </p>
                    <p className="text-[13px] text-black/55 leading-relaxed">{lvl.support}</p>
                  </div>

                </div>
              </Reveal>
            ))}
            <div className="border-t border-black/6" />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. ENCADREMENT & MÉTHODES
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <Reveal className="max-w-2xl mb-14">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-black/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" aria-hidden />
              Encadrement
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              Comment nous accompagnons<br className="hidden sm:block" />
              chaque élève
            </h2>
          </Reveal>

          {/* Photo banner */}
          <Reveal className="mb-12">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/6] lg:aspect-[21/7]">
              <Image
                src="/pedago-encadrement.jpg"
                alt="Étudiantes travaillant ensemble sur un projet"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1280px) 1200px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />
            </div>
          </Reveal>

          {/* 4 method cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">

            {/* Suivi pédagogique */}
            <Reveal>
              <div className="group p-8 bg-white rounded-2xl border border-transparent hover:border-black/6 hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-rouge/8 flex items-center justify-center mb-7 transition-colors duration-300 group-hover:bg-rouge/14">
                  <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-black text-[17px] leading-snug mb-3">Suivi pédagogique</h3>
                <div className="h-px w-7 bg-rouge/20 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-rouge/40" />
                <p className="text-sm text-black/45 leading-relaxed">
                  Un enseignant référent pour chaque élève. Bilans hebdomadaires,
                  dossiers de suivi et réunions parents-professeurs régulières
                  pour garantir la progression de chacun.
                </p>
              </div>
            </Reveal>

            {/* Cadre disciplinaire */}
            <Reveal delay={80}>
              <div className="group p-8 bg-white rounded-2xl border border-transparent hover:border-black/6 hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-rouge/8 flex items-center justify-center mb-7 transition-colors duration-300 group-hover:bg-rouge/14">
                  <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-black text-[17px] leading-snug mb-3">Cadre disciplinaire</h3>
                <div className="h-px w-7 bg-rouge/20 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-rouge/40" />
                <p className="text-sm text-black/45 leading-relaxed">
                  Des règles claires, appliquées avec cohérence et bienveillance.
                  Un cadre structuré qui libère l&apos;apprentissage plutôt que
                  de le contraindre, favorisant la sérénité de tous.
                </p>
              </div>
            </Reveal>

            {/* Enseignants certifiés */}
            <Reveal delay={120}>
              <div className="group p-8 bg-white rounded-2xl border border-transparent hover:border-black/6 hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-rouge/8 flex items-center justify-center mb-7 transition-colors duration-300 group-hover:bg-rouge/14">
                  <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="font-semibold text-black text-[17px] leading-snug mb-3">Enseignants certifiés</h3>
                <div className="h-px w-7 bg-rouge/20 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-rouge/40" />
                <p className="text-sm text-black/45 leading-relaxed">
                  Tous nos enseignants sont diplômés et bénéficient de formations
                  continues. Une équipe de 45+ professeurs passionnés, exigeants
                  et profondément investis dans la réussite des élèves.
                </p>
              </div>
            </Reveal>

            {/* Innovation éducative */}
            <Reveal delay={160}>
              <div className="group p-8 bg-white rounded-2xl border border-transparent hover:border-black/6 hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-rouge/8 flex items-center justify-center mb-7 transition-colors duration-300 group-hover:bg-rouge/14">
                  <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <h3 className="font-semibold text-black text-[17px] leading-snug mb-3">Innovation éducative</h3>
                <div className="h-px w-7 bg-rouge/20 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-rouge/40" />
                <p className="text-sm text-black/45 leading-relaxed">
                  Tableaux interactifs, pédagogie par projets, méthodes actives
                  et outils numériques intégrés. Une école rigoureuse et résolument
                  tournée vers les défis contemporains.
                </p>
              </div>
            </Reveal>

          </div>

          {/* Activités parascolaires */}
          <Reveal>
            <div className="border-t border-black/8 pt-14">
              <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-black/25 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rouge/40 shrink-0" aria-hidden />
                Parascolaire
              </p>
              <h3
                className="font-display font-semibold tracking-tight text-black leading-tight mb-8"
                style={{ fontSize: "clamp(20px,2.5vw,30px)" }}
              >
                Au-delà des cours
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {activites.map((a, i) => (
                  <span
                    key={i}
                    className="px-4 py-2.5 bg-white border border-black/8 rounded-full text-[13px] font-medium text-black/60 hover:border-rouge/25 hover:text-black/80 transition-colors"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. RÉSULTATS & RÉPUTATION
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0A0A0A]">

        {/* Background photo — very low opacity for texture */}
        <Image
          src="/pedago-resultats.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          sizes="100vw"
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
            style={{ fontSize: "36vw", color: "rgba(255,255,255,0.025)" }}
          >
            A
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <Reveal className="max-w-2xl mb-16">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rouge/60 shrink-0" aria-hidden />
              Résultats & Réputation
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-white leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              30 ans de résultats<br />qui parlent d&apos;eux-mêmes
            </h2>
          </Reveal>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 mb-16">
            {outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`${i > 0 ? "lg:border-l lg:border-white/6 lg:pl-8" : ""}`}>
                  <div
                    className="font-display italic text-rouge leading-none mb-2 tabular-nums"
                    style={{ fontSize: "clamp(40px,4vw,58px)" }}
                  >
                    {o.value}
                  </div>
                  <p className="text-white font-semibold text-[14px] mb-0.5">{o.label}</p>
                  <p className="text-white/35 text-[12px] leading-snug">{o.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Reputation paragraphs */}
          <Reveal>
            <div className="border-t border-white/6 pt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <p className="text-white/50 text-[15px] leading-[1.75]">
                Depuis 1996, Montagne Rouge a accompagné des générations d&apos;élèves
                vers l&apos;excellence académique et personnelle. Notre réputation
                s&apos;est construite sur des résultats concrets, la confiance des
                familles dakaroises et l&apos;engagement indéfectible de nos équipes.
              </p>
              <p className="text-white/30 text-[14px] leading-[1.75]">
                Nos anciens élèves occupent aujourd&apos;hui des postes clés dans
                les secteurs publics et privés au Sénégal et à l&apos;international,
                témoignant de la qualité et de la durabilité de la formation reçue
                à Montagne Rouge, Ouakam — Cité Avion.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-rouge relative overflow-hidden">

        {/* Ghost letter */}
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

            <Reveal>
              <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-white/40 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" aria-hidden />
                Rentrée 2025 – 2026
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2
                className="font-display font-semibold text-white tracking-tight leading-tight mb-6"
                style={{ fontSize: "clamp(28px,4vw,52px)" }}
              >
                Rejoignez une école<br />
                d&apos;excellence.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-white/60 mb-10 text-[16px] leading-relaxed max-w-sm mx-auto sm:mx-0">
                Déposez votre demande d&apos;inscription pour intégrer
                Montagne Rouge. Places limitées par niveau.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
                <Link
                  href="/inscriptions/nouvelle-inscription"
                  className="cta-btn-primary group inline-flex items-center justify-center gap-2 bg-white text-rouge font-semibold px-8 py-4 rounded-full text-[13px] w-full sm:w-auto"
                >
                  Commencer ma demande
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/221770000000"
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

    </main>
  );
}
