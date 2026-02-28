import Link from "next/link";
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
  {
    tag: "Événement",
    urgent: false,
    title: "Journée portes ouvertes — samedi 15 mars",
    description:
      "Venez découvrir notre établissement, rencontrer les enseignants et visiter nos installations.",
    date: "Mar. 2025",
  },
  {
    tag: "Résultats",
    urgent: false,
    title: "Résultats du 1er trimestre disponibles",
    description:
      "Les bulletins du premier trimestre sont consultables via l'espace parents dès aujourd'hui.",
    date: "Jan. 2025",
  },
];

/*
  Pure CSS infinite carousel — Server Component safe.
  .news-carousel-track in globals.css runs the animation.
  :hover pauses via animation-play-state.
  Track = items × 2 → animates 0 → -50% → seamless snap back.
*/
export default function Actualites() {
  return (
    <section
      className="py-16 lg:py-20 overflow-hidden relative"
      style={{ background: "#0f1115" }}
    >

      {/* Top border rule */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }}
        aria-hidden
      />

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-9">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-rouge/60 shrink-0" aria-hidden />
              Informations
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-white leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
            >
              Actualités de l&apos;école
            </h2>
          </div>
          <Link
            href="/actualites"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-white/35 hover:text-white transition-colors duration-200"
          >
            Tout voir
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>

      {/* ── Carousel ── */}
      <div className="relative">

        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #0f1115, transparent)" }}
          aria-hidden
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, #0f1115, transparent)" }}
          aria-hidden
        />

        <div className="overflow-hidden">
          {/* news-carousel-track defined in globals.css */}
          <div
            className="news-carousel-track flex gap-5 py-3 pl-6 lg:pl-10"
            style={{ width: "max-content" }}
          >
            {[...actualites, ...actualites].map((actu, i) => (
              <article
                key={i}
                className={`news-card w-72 sm:w-80 shrink-0 rounded-3xl p-7 cursor-pointer${actu.urgent ? " news-card-urgent" : ""}`}
                style={{
                  background: "#1c1f26",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.30)",
                }}
              >
                {/* Tag + date */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide"
                    style={
                      actu.urgent
                        ? { background: "#960018", color: "#fff" }
                        : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }
                    }
                  >
                    {actu.tag}
                  </span>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    {actu.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-semibold text-[14px] leading-snug mb-4"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
                  {actu.title}
                </h3>

                {/* Accent line */}
                <div
                  className="h-px w-8 mb-4"
                  style={{
                    background: actu.urgent
                      ? "rgba(150,0,24,0.60)"
                      : "rgba(255,255,255,0.08)",
                  }}
                />

                {/* Description */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {actu.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile link */}
      <div className="mt-8 md:hidden text-center px-6">
        <Link
          href="/actualites"
          className="text-sm font-medium text-white/35 hover:text-white transition-colors duration-200"
        >
          Toutes les actualités →
        </Link>
      </div>

      {/* Bottom border rule */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }}
        aria-hidden
      />

    </section>
  );
}
