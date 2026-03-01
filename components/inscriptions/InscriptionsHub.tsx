import Link from "next/link";
import { SCHOOL } from "@/lib/school-config";
import DocsPanel from "./DocsPanel";
import PageHero from "@/components/layout/PageHero";

const cards = [
  {
    href:  "/inscriptions/renseignements",
    color: "rouge",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title:    "Renseignements",
    desc:     "Question sur les niveaux, les coûts, une visite ou notre programme.",
    cta:      "Poser une question",
    duration: "2 min",
  },
  {
    href:  "/inscriptions/nouvelle-inscription",
    color: "rouge",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    title:    "Nouvelle inscription",
    desc:     "Votre enfant n'est pas encore inscrit à Montagne Rouge. Dossier complet.",
    cta:      "Démarrer le dossier",
    duration: "8 min",
    featured: true,
  },
  {
    href:  "/inscriptions/reinscription",
    color: "rouge",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title:    "Réinscription",
    desc:     "Élève déjà inscrit à Montagne Rouge. Confirmation rapide pour la rentrée.",
    cta:      "Confirmer la réinscription",
    duration: "4 min",
  },
  {
    href:  "/inscriptions/transfert",
    color: "rouge",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title:    "Transfert",
    desc:     "Arrivée en cours d'année depuis un autre établissement.",
    cta:      "Déclarer un transfert",
    duration: "6 min",
  },
];

const reassurances = [
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "100 % en ligne",
    desc:  "Depuis votre téléphone ou ordinateur.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: `Réponse sous ${SCHOOL.responseDelay}`,
    desc:  "Notre équipe confirme chaque demande.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "Assistance WhatsApp",
    desc:  "Une question ? On répond 7 j / 7.",
  },
];

export default function InscriptionsHub() {
  return (
    <div>

      <PageHero
        eyebrow={SCHOOL.year}
        title={`Inscriptions ${SCHOOL.year}`}
        subtitle="Choisissez votre démarche. Démarrez en 2 minutes."
      />

      {/* ── 4 choice cards ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-3xl mx-auto">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group relative flex flex-col p-7 rounded-3xl border transition-all duration-250 card-hover ${
                  card.featured
                    ? "border-rouge/20 bg-rouge/[0.03] hover:border-rouge/35"
                    : "border-black/8 bg-white hover:border-black/14"
                }`}
              >
                {card.featured && (
                  <span className="absolute top-5 right-5 text-[10px] font-bold tracking-[0.12em] uppercase bg-rouge text-white px-2.5 py-1 rounded-full">
                    Recommandé
                  </span>
                )}

                {/* Icon */}
                <div className="w-11 h-11 rounded-2xl bg-rouge/8 flex items-center justify-center mb-5 text-rouge transition-colors duration-300 group-hover:bg-rouge/14">
                  {card.icon}
                </div>

                {/* Text */}
                <h2 className="font-semibold text-black text-[16px] mb-2">{card.title}</h2>
                <p className="text-sm text-black/45 leading-relaxed flex-1 mb-5">{card.desc}</p>

                {/* CTA row */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[13px] font-semibold text-rouge group-hover:underline underline-offset-2">
                    {card.cta}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-black/30">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {card.duration}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Reassurance row ── */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {reassurances.map((r, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0">
                  {r.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{r.label}</p>
                  <p className="text-xs text-black/40 mt-0.5 leading-snug">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Documents collapsible ── */}
          <DocsPanel />

        </div>
      </section>

    </div>
  );
}
