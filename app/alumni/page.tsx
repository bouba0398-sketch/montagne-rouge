import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "Le réseau des anciens élèves de Montagne Rouge. Témoignages, réussite et communauté.",
};

const temoignages = [
  {
    nom: "Aminata Diallo",
    promo: "Promotion 2018",
    poste: "Étudiante en médecine, Université Cheikh Anta Diop",
    texte:
      "Montagne Rouge m'a donné la rigueur et la méthode qui font toute la différence dans mes études de médecine. Je dois beaucoup à cette école.",
  },
  {
    nom: "Ibrahima Sow",
    promo: "Promotion 2015",
    poste: "Ingénieur logiciel, Paris",
    texte:
      "Le niveau exigé à Montagne Rouge m'a parfaitement préparé pour mes études d'ingénierie en France. La base scientifique était solide.",
  },
  {
    nom: "Fatou Ndiaye",
    promo: "Promotion 2020",
    poste: "Master en droit des affaires, Dakar",
    texte:
      "Les enseignants de Montagne Rouge ne se contentaient pas d'enseigner, ils nous apprenaient à penser. C'est inestimable.",
  },
];

const chiffres = [
  { value: "94%", label: "Taux de réussite au bac" },
  { value: "60%", label: "Poursuivent en études supérieures" },
  { value: "15+", label: "Pays représentés par nos alumni" },
  { value: "800+", label: "Anciens élèves dans notre réseau" },
];

export default function AlumniPage() {
  return (
    <main className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
            Alumni
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black max-w-2xl leading-tight">
            Une communauté d&apos;excellence.
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {chiffres.map((c, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-semibold text-rouge mb-2 tabular-nums">
                  {c.value}
                </div>
                <div className="text-sm text-white/40">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
            Témoignages
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-black mb-12">
            Ils sont passés par Montagne Rouge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temoignages.map((t, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-black/8 bg-gray-50/50"
              >
                <div className="w-6 h-0.5 bg-rouge mb-5" />
                <p className="text-black/65 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.texte}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-black text-sm">{t.nom}</p>
                  <p className="text-xs text-rouge font-medium mt-0.5">
                    {t.promo}
                  </p>
                  <p className="text-xs text-black/40 mt-0.5">{t.poste}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réseau */}
      <section className="py-20 bg-gray-50/70 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-black mb-4">
            Rejoindre le réseau alumni
          </h2>
          <p className="text-black/50 mb-8 text-base">
            Ancien élève de Montagne Rouge ? Rejoignez notre communauté et
            restez connecté.
          </p>
          <a
            href="https://wa.me/221770000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-black text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-black/80 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </main>
  );
}
