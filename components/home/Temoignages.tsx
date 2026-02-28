import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const temoignages = [
  {
    content:
      "Depuis que mon fils est inscrit à Montagne Rouge, sa discipline et ses résultats ont considérablement progressé. L'encadrement est exigeant mais vraiment bienveillant.",
    role: "Parent d'élève — Primaire",
  },
  {
    content:
      "J'ai passé sept ans à Montagne Rouge, du collège au bac. L'école m'a donné des bases solides qui m'ont permis d'intégrer une université à l'étranger sans difficultés.",
    role: "Ancien élève — Lycée",
  },
  {
    content:
      "La qualité des professeurs et le suivi personnalisé sont incomparables. Mes deux enfants y sont scolarisés et les progrès parlent d'eux-mêmes chaque année.",
    role: "Parent d'élève — Collège & Primaire",
  },
  {
    content:
      "Ce que j'apprécie le plus, c'est que les enseignants connaissent vraiment chaque élève. Mon fils ne se perd pas dans la masse — il est accompagné individuellement.",
    role: "Parent d'élève — Maternelle",
  },
  {
    content:
      "Montagne Rouge m'a appris la rigueur. Aujourd'hui en licence à Dakar, je réalise à quel point l'école nous a bien préparés aux exigences du supérieur.",
    role: "Ancienne élève — Collège",
  },
  {
    content:
      "Les activités extrascolaires et les événements de l'école créent une vraie dynamique de groupe. Mon enfant adore y aller, ce qui dit beaucoup sur l'ambiance.",
    role: "Parent d'élève — Primaire",
  },
];

export default function Temoignages() {
  const WHATSAPP_URL = "https://wa.me/221770000000";

  return (
    <>
      {/* ── Testimonials ── */}
      <section className="py-24 lg:py-32 bg-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <Reveal className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
                Témoignages
              </p>
              <h2
                className="font-display font-semibold tracking-tight text-black leading-tight"
                style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
              >
                Ce que disent<br /> les familles
              </h2>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {temoignages.map((t, i) => (
              <Reveal key={i} delay={i * 60}>
                <article className="group bg-white border border-black/[0.055] hover:border-black/10 hover:shadow-xl hover:shadow-black/[0.05] hover:-translate-y-1 transition-all duration-400 rounded-3xl p-8 h-full flex flex-col">

                  {/* Quote mark */}
                  <div className="mb-5">
                    <svg className="w-7 h-7 text-rouge/25" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.76-3 .66-1.06 1.5-1.85 2.5-2.37l-1.07-1.5c-1.4.78-2.5 1.9-3.24 3.35C5.82 10.57 5.5 12.06 5.5 13.61c0 1.02.27 1.87.82 2.54.55.68 1.24 1.02 2.07 1.02.84 0 1.54-.3 2.09-.9.55-.6.83-1.35.83-2.25l-.1-.26zm7.5 0c0-.88-.23-1.618-.69-2.217-.326-.42-.768-.692-1.327-.82-.55-.127-1.07-.136-1.54-.028-.16-.95.1-1.95.76-3 .66-1.05 1.5-1.847 2.5-2.37L17.12 5.82c-1.4.78-2.5 1.9-3.24 3.35-.77 1.46-1.09 2.95-1.09 4.5 0 1.02.27 1.87.82 2.54.55.67 1.24 1.01 2.07 1.01.84 0 1.54-.3 2.09-.9.55-.6.83-1.35.83-2.25l-.1-.26z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <p className="text-[14px] text-black/65 leading-[1.8] flex-1 mb-6 font-display italic">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  {/* Role */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" />
                    <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-black/35">
                      {t.role}
                    </span>
                  </div>

                </article>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA Visite ── */}
      <section className="py-20 lg:py-24 bg-white border-t border-black/[0.055]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* Text */}
            <Reveal className="max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
                Bienvenue sur place
              </p>
              <h2
                className="font-display font-semibold tracking-tight text-black leading-tight mb-4"
                style={{ fontSize: "clamp(26px,3vw,40px)" }}
              >
                Venez visiter<br /> Montagne Rouge
              </h2>
              <p className="text-black/45 text-[15px] leading-relaxed">
                Rencontrez notre équipe pédagogique, découvrez le campus et posez toutes vos questions. Nous accueillons les familles sur rendez-vous.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal delay={80} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-7 py-4 rounded-full text-[13px] hover:bg-black/85 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-px"
              >
                Planifier une visite
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-black/12 text-black font-medium px-7 py-4 rounded-full text-[13px] hover:border-black/25 hover:bg-black/[0.03] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  );
}
