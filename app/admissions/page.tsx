import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Processus d'admission à Montagne Rouge : critères, calendrier, frais et formulaire de demande en ligne.",
};

const etapes = [
  {
    num: "01",
    title: "Demande en ligne",
    desc: "Remplissez le formulaire de demande d'admission en quelques minutes depuis votre téléphone.",
  },
  {
    num: "02",
    title: "Constitution du dossier",
    desc: "Fournissez les bulletins scolaires, copie d'acte de naissance et photos d'identité.",
  },
  {
    num: "03",
    title: "Entretien",
    desc: "Un entretien avec la direction est organisé pour mieux vous connaître et répondre à vos questions.",
  },
  {
    num: "04",
    title: "Décision & inscription",
    desc: "Réception de la décision sous 5 jours ouvrés. Confirmation par règlement des frais d'inscription.",
  },
];

const frais = [
  {
    niveau: "Maternelle",
    inscription: "150 000",
    mensualite: "55 000",
  },
  {
    niveau: "Primaire",
    inscription: "175 000",
    mensualite: "65 000",
  },
  {
    niveau: "Collège",
    inscription: "200 000",
    mensualite: "80 000",
  },
  {
    niveau: "Lycée",
    inscription: "225 000",
    mensualite: "95 000",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="py-20 lg:py-28 bg-white border-b border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 lg:gap-20 items-center">

            {/* Left — text */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
                Rejoignez-nous
              </p>
              <h1 className="font-display font-semibold tracking-tight text-black leading-tight max-w-2xl"
                style={{ fontSize: "clamp(34px,5vw,60px)" }}>
                Admissions 2025–2026
              </h1>
              <p className="text-black/50 mt-6 max-w-lg text-[16px] leading-relaxed">
                Les inscriptions pour la prochaine rentrée sont ouvertes. Découvrez
                le processus et déposez votre dossier en ligne.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/admissions/demande"
                  className="inline-flex items-center justify-center bg-rouge text-white font-semibold px-8 py-4 rounded-full text-[13px] hover:bg-rouge-dark transition-all duration-200 hover:shadow-lg hover:shadow-rouge/25 active:scale-[0.97]"
                >
                  Déposer ma demande maintenant
                </Link>
                <a
                  href="https://wa.me/221770000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-black/10 text-black/55 font-medium px-8 py-4 rounded-full text-[13px] hover:border-black/20 hover:text-black transition-all"
                >
                  Une question ?
                </a>
              </div>
            </div>

            {/* Right — photo (desktop only) */}
            <div className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <Image
                  src="/admissions-hero.jpg"
                  alt="Documents et fournitures scolaires pour les admissions"
                  fill
                  className="object-cover"
                  sizes="400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Badge overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" />
                    <span className="text-white text-[12px] font-medium">
                      Rentrée 2025–2026 · Places limitées
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
            Processus
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-black mb-12">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {etapes.map((e) => (
              <div key={e.num} className="relative">
                <div className="text-2xl font-bold text-rouge tabular-nums mb-4">
                  {e.num}
                </div>
                <h3 className="font-semibold text-black mb-2">{e.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frais indicatifs */}
      <section className="py-20 bg-gray-50/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
            Tarifs indicatifs
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-black mb-2">
            Frais de scolarité
          </h2>
          <p className="text-sm text-black/40 mb-10">
            Montants en Francs CFA (XOF). Tarifs 2025–2026.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8">
                  <th className="text-left py-3 pr-8 font-semibold text-black/60 text-[11px] uppercase tracking-wider">
                    Niveau
                  </th>
                  <th className="text-right py-3 px-8 font-semibold text-black/60 text-[11px] uppercase tracking-wider">
                    Inscription
                  </th>
                  <th className="text-right py-3 pl-8 font-semibold text-black/60 text-[11px] uppercase tracking-wider">
                    Mensualité
                  </th>
                </tr>
              </thead>
              <tbody>
                {frais.map((f, i) => (
                  <tr
                    key={i}
                    className="border-b border-black/5 hover:bg-white transition-colors"
                  >
                    <td className="py-4 pr-8 font-medium text-black">
                      {f.niveau}
                    </td>
                    <td className="py-4 px-8 text-right text-black/60">
                      {f.inscription} XOF
                    </td>
                    <td className="py-4 pl-8 text-right text-black/60">
                      {f.mensualite} XOF
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-black/30 mt-4">
            * Des frais annexes (cantine, tenues, étude dirigée) s&apos;ajoutent
            selon les options choisies.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-black text-white text-center relative overflow-hidden">
        <Image
          src="/admissions-cta.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.10]"
          sizes="100vw"
          aria-hidden
        />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-white/50 mb-8">
            Le formulaire prend moins de 3 minutes. Places limitées.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions/demande"
              className="inline-flex items-center justify-center bg-rouge text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-rouge-dark transition-colors"
            >
              Commencer la demande
            </Link>
            <a
              href="https://wa.me/221770000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white/20 text-white font-medium px-8 py-4 rounded-full text-sm hover:bg-white/8 transition-colors"
            >
              Question sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
