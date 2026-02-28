import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Toutes les actualités de l'école Montagne Rouge : inscriptions, cantine, vacances, événements.",
};

const categories = ["Toutes", "Inscriptions", "Cantine", "Vacances", "Étude dirigée", "Événements"];

const articles = [
  {
    tag: "Inscriptions",
    urgent: true,
    titre: "Inscriptions 2025–2026 officiellement ouvertes",
    resume:
      "Les dossiers d'inscription pour la rentrée scolaire 2025–2026 sont désormais acceptés pour tous les niveaux. Places limitées.",
    date: "24 février 2025",
    readTime: "2 min",
  },
  {
    tag: "Étude dirigée",
    urgent: false,
    titre: "Programme d'étude dirigée mercredi & samedi — Fév. 2025",
    resume:
      "Retrouvez les horaires et la liste des matières couvertes lors des séances d'étude dirigée ce mois-ci.",
    date: "18 février 2025",
    readTime: "1 min",
  },
  {
    tag: "Cantine",
    urgent: false,
    titre: "Menu cantine — semaine du 24 fév.",
    resume:
      "Notre chef a conçu cette semaine des menus équilibrés et variés. Nouveauté : une option végétarienne disponible chaque jour.",
    date: "22 février 2025",
    readTime: "1 min",
  },
  {
    tag: "Vacances",
    urgent: false,
    titre: "Calendrier officiel des vacances 2024–2025",
    resume:
      "Dates des congés de Toussaint, Noël, février, Pâques et grandes vacances. Téléchargez le calendrier complet.",
    date: "1 septembre 2024",
    readTime: "2 min",
  },
  {
    tag: "Événements",
    urgent: false,
    titre: "Journée portes ouvertes — samedi 15 mars 2025",
    resume:
      "Venez découvrir nos locaux, rencontrer nos enseignants et poser toutes vos questions lors de notre journée portes ouvertes.",
    date: "10 février 2025",
    readTime: "2 min",
  },
  {
    tag: "Inscriptions",
    urgent: false,
    titre: "Cours de vacances juillet 2025 — inscriptions ouvertes",
    resume:
      "Préparez la rentrée avec nos cours de vacances intensifs en mathématiques, français et anglais.",
    date: "5 février 2025",
    readTime: "2 min",
  },
];

export default function ActualitesPage() {
  return (
    <main className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
            Informations
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black max-w-2xl leading-tight">
            Actualités de l&apos;école
          </h1>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-6 bg-white border-b border-black/5 sticky top-[64px] lg:top-[80px] z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`shrink-0 text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                  i === 0
                    ? "bg-black text-white border-black"
                    : "border-black/12 text-black/50 hover:border-black/25 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <article
                key={i}
                className={`p-6 rounded-2xl border transition-all cursor-pointer hover:shadow-sm ${
                  article.urgent
                    ? "border-rouge/20 bg-rouge/[0.02]"
                    : "border-black/8 hover:border-black/14"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      article.urgent
                        ? "bg-rouge text-white"
                        : "bg-black/8 text-black/55"
                    }`}
                  >
                    {article.tag}
                  </span>
                  <span className="text-[11px] text-black/30">
                    {article.readTime}
                  </span>
                </div>
                <h2 className="font-semibold text-black text-sm leading-snug mb-3">
                  {article.titre}
                </h2>
                <p className="text-xs text-black/45 leading-relaxed mb-5">
                  {article.resume}
                </p>
                <p className="text-[11px] text-black/30">{article.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
