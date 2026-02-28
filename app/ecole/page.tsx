import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "L'École",
  description:
    "Découvrez l'histoire, les valeurs et la vision de l'école Montagne Rouge à Dakar — institution de référence depuis 1996.",
};

const stats = [
  { value: "30", label: "ans d'expertise", sub: "Fondée en 1996" },
  { value: "500+", label: "élèves", sub: "par année scolaire" },
  { value: "98%", label: "au baccalauréat", sub: "depuis plus de 10 ans" },
  { value: "1 500+", label: "diplômés", sub: "accompagnés depuis 1996" },
];

const histoire = [
  {
    year: "1996",
    title: "Fondation",
    desc: "Création de l'école Montagne Rouge à Ouakam – Cité Avion, Dakar. Une vision : offrir une éducation d'excellence aux familles sénégalaises.",
  },
  {
    year: "2005",
    title: "Expansion du campus",
    desc: "Ouverture du collège et construction de nouvelles salles de classe, laboratoires et bibliothèque. L'effectif franchit les 200 élèves.",
  },
  {
    year: "2012",
    title: "Ouverture du lycée",
    desc: "Le cycle complet maternelle–lycée est désormais proposé. Premiers bacheliers de Montagne Rouge avec 96% de réussite.",
  },
  {
    year: "2020",
    title: "Modernisation numérique",
    desc: "Intégration du numérique dans toutes les classes. Tableau interactifs, espace multimédia et accès WiFi sur l'ensemble du campus.",
  },
  {
    year: "2026",
    title: "Aujourd'hui",
    desc: "Plus de 500 élèves, 30 ans de résultats prouvés, 98% au bac. Montagne Rouge s'impose comme l'institution privée de référence à Dakar.",
  },
];

const valeurs = [
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    label: "Excellence",
    desc: "Viser le meilleur dans chaque discipline. Encourager chaque élève à dépasser ses propres limites, année après année.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "Rigueur",
    desc: "Un cadre exigeant et structuré qui développe la discipline et la persévérance. La réussite se construit dans la durée.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    label: "Humanisme",
    desc: "Former des êtres humains complets, respectueux et engagés dans leur communauté. L'élève est au centre de tout ce que nous faisons.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    label: "Innovation",
    desc: "Des méthodes modernes et un environnement numérique au service de l'apprentissage. Montagne Rouge prépare ses élèves aux défis du monde contemporain.",
  },
];

export default function EcolePage() {
  return (
    <main className="pt-16 lg:pt-20">

      {/* ── Hero — cinematic ── */}
      <section className="relative min-h-[60vh] lg:min-h-[72vh] flex items-end overflow-hidden">
        <Image
          src="/ecole-hero.jpg"
          alt="Campus de l'école Montagne Rouge à Dakar"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

        {/* Ghost letter */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
          aria-hidden
          style={{ lineHeight: 0.8 }}
        >
          <span
            className="font-display italic"
            style={{ fontSize: "30vw", color: "rgba(255,255,255,0.04)" }}
          >
            É
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24 w-full">
          <Reveal>
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/45 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" aria-hidden />
              Notre identité · Depuis 1996
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="font-display font-semibold tracking-tight text-white leading-tight max-w-3xl"
              style={{ fontSize: "clamp(36px,5.5vw,72px)" }}
            >
              Une école bâtie<br />
              sur l&apos;excellence.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-white/55 mt-6 max-w-xl text-[16px] leading-relaxed">
              Institution privée de référence à Dakar, Montagne Rouge forme les
              futures générations depuis 30 ans avec rigueur, humanisme et ambition.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-10 bg-white border-b border-black/6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className={`lg:px-8 ${i > 0 ? "lg:border-l lg:border-black/6" : ""}`}>
                  <div
                    className="font-display italic text-rouge leading-none mb-1 tabular-nums"
                    style={{ fontSize: "clamp(32px,3vw,46px)" }}
                  >
                    {s.value}
                  </div>
                  <p className="text-[13px] font-semibold text-black mb-0.5">{s.label}</p>
                  <p className="text-[11px] text-black/35">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Text */}
            <div>
              <Reveal>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-4">
                  Mission
                </p>
              </Reveal>
              <Reveal delay={70}>
                <h2
                  className="font-display font-semibold tracking-tight text-black leading-tight mb-6"
                  style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
                >
                  Former les leaders<br /> de demain
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="text-black/55 leading-[1.8] text-[16px] mb-5">
                  Fondée en 1996, Montagne Rouge s&apos;est imposée comme
                  l&apos;établissement privé de référence à Dakar. Notre mission est
                  de donner à chaque élève les outils intellectuels, humains et
                  culturels pour réussir dans un monde en constante évolution.
                </p>
                <p className="text-black/55 leading-[1.8] text-[16px] mb-8">
                  Notre programme conjugue les exigences du curriculum sénégalais
                  avec une ouverture internationale, préparant nos élèves aussi
                  bien pour les grandes écoles africaines que pour les universités
                  du monde entier.
                </p>
                <blockquote className="border-l-2 border-rouge/30 pl-5">
                  <p className="font-display italic text-[17px] text-black/50 leading-relaxed">
                    &ldquo;Former l&apos;élève d&apos;aujourd&apos;hui pour en faire
                    le citoyen de demain.&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            </div>

            {/* Photo */}
            <Reveal delay={80}>
              <div className="relative aspect-[4/3] lg:aspect-[5/6] rounded-3xl overflow-hidden">
                <Image
                  src="/galerie-vie-scolaire.jpg"
                  alt="Élèves de Montagne Rouge en activité"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Histoire ── */}
      <section className="py-24 lg:py-32 bg-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
              Histoire
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              30 ans de construction
            </h2>
          </Reveal>

          {/* Desktop: horizontal */}
          <div className="relative hidden lg:block">
            <div
              className="absolute h-px bg-black/8"
              style={{ top: "11px", left: "calc(10% + 12px)", right: "calc(10% + 12px)" }}
              aria-hidden
            />
            <div className="grid grid-cols-5 gap-6">
              {histoire.map((h, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div>
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-rouge flex items-center justify-center mb-5 transition-shadow duration-300 hover:shadow-md hover:shadow-rouge/20">
                      <span className="w-2 h-2 rounded-full bg-rouge" />
                    </div>
                    <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-rouge mb-1">
                      {h.year}
                    </p>
                    <h3 className="font-semibold text-black text-[15px] leading-snug mb-2">
                      {h.title}
                    </h3>
                    <p className="text-[12px] text-black/40 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden">
            {histoire.map((h, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-rouge flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-rouge" />
                    </div>
                    {i < histoire.length - 1 && (
                      <div className="w-px flex-1 bg-black/8 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-rouge mb-0.5">
                      {h.year}
                    </p>
                    <h3 className="font-semibold text-black text-[15px] mb-1">
                      {h.title}
                    </h3>
                    <p className="text-[13px] text-black/45 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
              Valeurs
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              Ce qui nous définit
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {valeurs.map((v, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group bg-[#F8F7F5] border border-transparent hover:bg-white hover:border-black/6 hover:shadow-xl hover:shadow-black/[0.05] transition-all duration-400 p-8 rounded-2xl h-full">
                  <div className="w-10 h-10 rounded-xl bg-rouge/8 flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-rouge/14">
                    <span className="block transition-transform duration-500 group-hover:scale-110">
                      {v.icon}
                    </span>
                  </div>
                  <div className="h-px w-7 bg-rouge/20 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-rouge/40" />
                  <h3 className="font-semibold text-black text-[16px] mb-2">{v.label}</h3>
                  <p className="text-sm text-black/45 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo strip ── */}
      <Reveal>
        <div className="relative aspect-[4/3] sm:aspect-[16/6] lg:aspect-[21/6] overflow-hidden">
          <Image
            src="/credibilite-enseignant.jpg"
            alt="Enseignant Montagne Rouge avec ses élèves"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>
      </Reveal>

      {/* ── Campus & Infos pratiques ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <Reveal className="mb-14">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
              Campus
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
            >
              Où nous trouver
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Info blocks */}
            <div className="space-y-8">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  ),
                  label: "Adresse",
                  content: "Ouakam – Cité Avion, Dakar, Sénégal",
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  ),
                  label: "Horaires d'accueil",
                  content: "Lundi – vendredi : 7h30 – 18h00\nSamedi : 8h00 – 13h00",
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
                    </svg>
                  ),
                  label: "Contact",
                  content: "+221 77 000 00 00\ncontact@montagne-rouge.sn",
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>
                  ),
                  label: "Équipements",
                  content: "Salles de classe · Bibliothèque · Laboratoires\nSalle multimédias · Cantine · Cour de récréation",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rouge/8 flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-black/30 mb-1">
                        {item.label}
                      </p>
                      {item.content.split("\n").map((line, j) => (
                        <p key={j} className="text-[14px] text-black/70 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Campus photo */}
            <Reveal delay={100}>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  <Image
                    src="/galerie-campus.jpg"
                    alt="Campus de Montagne Rouge à Ouakam"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 text-white text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-rouge shrink-0" aria-hidden />
                      Ouakam – Cité Avion
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="/galerie-bibliotheque.jpg"
                      alt="Bibliothèque de Montagne Rouge"
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="/galerie-sciences.jpg"
                      alt="Laboratoire de sciences"
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── CTA — rouge ── */}
      <section className="py-24 bg-rouge relative overflow-hidden text-center">
        <Image
          src="/admissions-cta.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.08]"
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
            style={{ fontSize: "28vw", color: "rgba(255,255,255,0.05)" }}
          >
            M
          </span>
        </div>
        <div className="relative max-w-2xl mx-auto px-6">
          <Reveal>
            <h2
              className="font-display font-semibold tracking-tight text-white leading-tight mb-4"
              style={{ fontSize: "clamp(28px,4vw,48px)" }}
            >
              Rejoignez la communauté<br /> Montagne Rouge
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-white/65 mb-10 text-[16px] leading-relaxed">
              Déposez votre demande d&apos;admission dès aujourd&apos;hui.
              Places limitées pour la rentrée 2025–2026.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions/demande"
                className="inline-flex items-center justify-center bg-white text-rouge font-semibold px-8 py-4 rounded-full text-[13px] hover:bg-white/90 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 active:scale-[0.97]"
              >
                Demande d&apos;admission
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center border border-white/30 text-white font-medium px-8 py-4 rounded-full text-[13px] hover:bg-white/10 transition-all"
              >
                En savoir plus
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
