import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const facilities = [
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Bibliothèque & multimédia",
    desc: "Espace de lecture et de recherche documentaire, salle multimédia équipée, accès WiFi sur l'ensemble du campus.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.31 48.31 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "Laboratoires de sciences",
    desc: "Laboratoires de physique, chimie et SVT entièrement équipés. Expérimentation pratique intégrée aux programmes dès le collège.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
    title: "Cantine & services intégrés",
    desc: "Cantine scolaire avec menus élaborés, service de tenues, fournitures, étude dirigée et cours de vacances — tout sur place.",
  },
];

export default function CampusInfra() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <Reveal className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
            Campus
          </p>
          <h2
            className="font-display font-semibold tracking-tight text-black leading-tight max-w-xl"
            style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
          >
            Un cadre pensé<br /> pour réussir
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Facility list ── */}
          <div className="space-y-8">
            {facilities.map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group flex gap-5">
                  <div className="w-11 h-11 rounded-2xl bg-rouge/8 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-400 group-hover:bg-rouge/14">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black text-[15px] mb-1.5">{f.title}</h3>
                    <p className="text-[13px] text-black/45 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Campus photos ── */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {/* Large tile */}
              <div className="col-span-2 relative aspect-[16/7] rounded-2xl overflow-hidden group">
                <Image
                  src="/galerie-campus.jpg"
                  alt="Campus de Montagne Rouge à Ouakam"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 text-white text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-rouge shrink-0" aria-hidden />
                    Ouakam – Cité Avion
                  </span>
                </div>
              </div>
              {/* Two small tiles */}
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/galerie-bibliotheque.jpg"
                  alt="Bibliothèque de Montagne Rouge"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/galerie-sciences.jpg"
                  alt="Laboratoire de sciences"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="25vw"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
