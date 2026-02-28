import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const actualites = [
  {
    tag: "Inscriptions",
    urgent: true,
    title: "Inscriptions 2025–2026 officiellement ouvertes",
    description:
      "Les dossiers d'inscription pour la rentrée 2025–2026 sont désormais acceptés. Places limitées par niveau.",
    date: "Fév. 2025",
  },
  {
    tag: "Cantine",
    urgent: false,
    title: "Menu cantine — semaine du 24 fév.",
    description:
      "Découvrez les menus élaborés par notre chef, avec les nouvelles options équilibrées de la semaine.",
    date: "Fév. 2025",
  },
  {
    tag: "Vacances",
    urgent: false,
    title: "Calendrier des vacances 2024–2025",
    description:
      "Consultez le calendrier officiel des congés, jours fériés et dates clés de l'année scolaire.",
    date: "Sep. 2024",
  },
  {
    tag: "Étude dirigée",
    urgent: false,
    title: "Étude dirigée mer. & sam. — reprise",
    description:
      "Les séances du mercredi après-midi et du samedi matin reprennent dès cette semaine.",
    date: "Jan. 2025",
  },
];

export default function Actualites() {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
              Informations
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
            >
              Actualités de l&apos;école
            </h2>
          </div>
          <Link
            href="/actualites"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-black/35 hover:text-black transition-colors"
          >
            Tout voir
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>

        <Reveal className="mb-10">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/5] lg:aspect-[21/5]">
            <Image
              src="/actualites-ecole.jpg"
              alt="Élèves en activité à Montagne Rouge"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F7F5]/70" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actualites.map((actu, i) => (
            <Reveal key={i} delay={i * 60}>
              <article
                className={`group h-full p-7 rounded-3xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  actu.urgent
                    ? "border-rouge/15 bg-white hover:border-rouge/30 hover:shadow-lg hover:shadow-rouge/8"
                    : "border-black/6 bg-white hover:border-black/12 hover:shadow-lg hover:shadow-black/5"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide ${
                      actu.urgent
                        ? "bg-rouge text-white"
                        : "bg-black/6 text-black/55"
                    }`}
                  >
                    {actu.tag}
                  </span>
                  <span className="text-[10px] text-black/30 font-medium">{actu.date}</span>
                </div>
                <h3 className="font-semibold text-black text-[14px] leading-snug mb-3">
                  {actu.title}
                </h3>
                <p className="text-xs text-black/45 leading-relaxed">
                  {actu.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/actualites"
            className="text-sm font-medium text-black/40 hover:text-black transition-colors"
          >
            Toutes les actualités →
          </Link>
        </div>
      </div>
    </section>
  );
}
