import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
    label: "30 ans d'excellence",
    desc: "Fondée en 1996 à Ouakam – Cité Avion, Montagne Rouge est l'institution privée de référence à Dakar. Trois décennies de résultats prouvés au service des familles sénégalaises.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    label: "Encadrement individualisé",
    desc: "Suivi rigoureux de chaque élève, classes à effectif maîtrisé et accompagnement personnalisé de la maternelle au lycée. Chaque enfant est connu et accompagné.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z" />
      </svg>
    ),
    label: "Excellence académique",
    desc: "Un cadre exigeant et structuré qui développe la rigueur, la discipline et l'ambition. Résultats au baccalauréat parmi les meilleurs des établissements privés de Dakar.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3.157 7.582A8.959 8.959 0 0 0 3 12c0 .778.099 1.533.284 2.253" />
      </svg>
    ),
    label: "Ouverture & activités",
    desc: "Sports d'équipe, langues vivantes, arts plastiques et initiation aux nouvelles technologies. Former des élèves complets, curieux et prêts pour les défis du monde moderne.",
  },
];

export default function PourquoiNous() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <Reveal className="max-w-2xl mb-16">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
            Pourquoi nous choisir
          </p>
          <h2
            className="font-display font-semibold tracking-tight text-black leading-tight"
            style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
          >
            Ce qui fait la différence<br /> Montagne Rouge
          </h2>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group relative bg-[#F8F7F5] hover:bg-white border border-transparent hover:border-black/[0.07] hover:shadow-2xl hover:shadow-black/[0.06] transition-all duration-500 rounded-3xl p-8 h-full cursor-default">

                {/* Icon container */}
                <div className="w-12 h-12 rounded-2xl bg-rouge/8 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-rouge/14 group-hover:scale-105">
                  {p.icon}
                </div>

                {/* Accent line */}
                <div className="h-px w-8 bg-rouge/20 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-rouge/45" />

                <h3 className="font-semibold text-[16px] text-black leading-snug mb-3">
                  {p.label}
                </h3>
                <p className="text-[13px] text-black/45 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
