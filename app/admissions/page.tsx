import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdmissionsContactForm from "@/components/admissions/AdmissionsContactForm";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Processus d'admission à Montagne Rouge : pièces à prévoir, étapes et formulaire de demande en ligne.",
};

const etapes = [
  {
    num: "01",
    title: "Demande d'informations",
    desc: "Remplissez le formulaire ci-dessous ou contactez-nous sur WhatsApp. Notre équipe vous répond sous 24 heures.",
  },
  {
    num: "02",
    title: "Visite & échange avec l'équipe",
    desc: "Venez découvrir l'établissement, rencontrer la direction pédagogique et poser toutes vos questions.",
  },
  {
    num: "03",
    title: "Dépôt du dossier",
    desc: "Déposez les pièces requises. La décision est communiquée sous 5 jours ouvrés.",
  },
];

const pieces = [
  "Photocopie de l'acte de naissance de l'élève",
  "Bulletins scolaires des deux dernières années",
  "Photos d'identité récentes (format 4×4)",
  "Photocopie de la pièce d'identité du parent ou tuteur",
  "Certificat de radiation (si transfert depuis un autre établissement)",
];

const frais = [
  { niveau: "Maternelle",  inscription: "150 000", mensualite: "55 000" },
  { niveau: "Primaire",    inscription: "175 000", mensualite: "65 000" },
  { niveau: "Collège",     inscription: "200 000", mensualite: "80 000" },
  { niveau: "Lycée",       inscription: "225 000", mensualite: "95 000" },
];

export default function AdmissionsPage() {
  return (
    <main className="pt-16 lg:pt-20">

      {/* ── Hero header ── */}
      <section className="py-20 lg:py-28 bg-white border-b border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 lg:gap-20 items-center">

            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
                Rejoignez-nous
              </p>
              <h1
                className="font-display font-semibold tracking-tight text-black leading-tight max-w-2xl"
                style={{ fontSize: "clamp(34px,5vw,60px)" }}
              >
                Admissions 2025–2026
              </h1>
              <p className="text-black/50 mt-6 max-w-lg text-[16px] leading-relaxed">
                Les inscriptions pour la prochaine rentrée sont ouvertes. Démarrez
                en 2 minutes — notre équipe vous accompagne à chaque étape.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#formulaire"
                  className="inline-flex items-center justify-center bg-rouge text-white font-semibold px-8 py-4 rounded-full text-[13px] hover:bg-rouge-dark transition-all duration-200 hover:shadow-lg hover:shadow-rouge/25 active:scale-[0.97]"
                >
                  Démarrer une demande
                </a>
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

      {/* ── Étapes ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
            Processus
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-black mb-12">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {etapes.map((e) => (
              <div key={e.num} className="relative">
                <div
                  className="font-display italic text-rouge/25 mb-4 leading-none tabular-nums"
                  style={{ fontSize: "clamp(40px,4vw,56px)" }}
                >
                  {e.num}
                </div>
                <h3 className="font-semibold text-black mb-2 text-[16px]">{e.title}</h3>
                <div className="w-8 h-px bg-black/10 mb-3" />
                <p className="text-sm text-black/45 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pièces à prévoir ── */}
      <section className="py-20" style={{ background: "#FAFAFA" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
                Dossier
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-black mb-8">
                Pièces à prévoir
              </h2>
              <ul className="space-y-4">
                {pieces.map((piece, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-rouge/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-black/65 leading-relaxed">{piece}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-black/35">
                * Des pièces complémentaires peuvent être demandées selon le niveau et la situation de l&apos;élève.
              </p>
            </div>

            {/* Frais indicatifs */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
                Tarifs indicatifs
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-black mb-2">
                Frais de scolarité
              </h2>
              <p className="text-sm text-black/40 mb-8">Montants en Francs CFA (XOF). Tarifs 2025–2026.</p>
              <div className="overflow-x-auto rounded-2xl border border-black/6 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/6">
                      <th className="text-left py-3.5 px-5 font-semibold text-black/50 text-[11px] uppercase tracking-wider">
                        Niveau
                      </th>
                      <th className="text-right py-3.5 px-5 font-semibold text-black/50 text-[11px] uppercase tracking-wider">
                        Inscription
                      </th>
                      <th className="text-right py-3.5 px-5 font-semibold text-black/50 text-[11px] uppercase tracking-wider">
                        Mensualité
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {frais.map((f, i) => (
                      <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-gray-50/70 transition-colors">
                        <td className="py-4 px-5 font-medium text-black">{f.niveau}</td>
                        <td className="py-4 px-5 text-right text-black/55">{f.inscription} XOF</td>
                        <td className="py-4 px-5 text-right text-black/55">{f.mensualite} XOF</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-black/30 mt-3">
                * Des frais annexes (cantine, tenues, étude dirigée) s&apos;ajoutent selon les options choisies.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="formulaire" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-14 items-start">

            {/* Left — info */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
                Contact
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-black mb-5">
                Nous contacter
              </h2>
              <p className="text-sm text-black/45 leading-relaxed mb-10 max-w-sm">
                Remplissez le formulaire et notre équipe vous rappellera pour
                répondre à toutes vos questions et planifier une visite.
              </p>

              {/* Contact info block */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-rouge/8 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black/40 uppercase tracking-wider mb-0.5">Adresse</p>
                    <p className="text-sm text-black/70 leading-relaxed">
                      Ouakam – Cité Avion, Dakar, Sénégal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-rouge/8 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black/40 uppercase tracking-wider mb-0.5">Téléphone</p>
                    <p className="text-sm text-black/70">+221 77 000 00 00</p>
                    <p className="text-xs text-black/35 mt-0.5">Lun – Ven · 8 h – 17 h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-black/40 uppercase tracking-wider mb-0.5">WhatsApp</p>
                    <a
                      href="https://wa.me/221770000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black/70 hover:text-black transition-colors"
                    >
                      +221 77 000 00 00
                    </a>
                    <p className="text-xs text-black/35 mt-0.5">Réponse rapide · 7 j / 7</p>
                  </div>
                </div>

              </div>

              {/* Full form link */}
              <div className="mt-10 pt-8 border-t border-black/6">
                <p className="text-sm text-black/45 mb-3">
                  Prêt à déposer un dossier complet ?
                </p>
                <Link
                  href="/admissions/demande"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-rouge hover:text-rouge-dark transition-colors"
                >
                  Accéder au formulaire complet
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right — form */}
            <AdmissionsContactForm />

          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
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
          <h2 className="text-3xl font-semibold mb-4">Prêt à commencer ?</h2>
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
