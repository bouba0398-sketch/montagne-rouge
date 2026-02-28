import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vidéos",
  description:
    "Découvrez la vie à Montagne Rouge en vidéo : visite des locaux, témoignages, événements.",
};

const videos = [
  {
    titre: "Visite de l'école — Année scolaire 2024",
    duree: "3:42",
    cat: "Présentation",
    size: "col-span-2",
  },
  {
    titre: "Cérémonie de remise des diplômes 2024",
    duree: "8:15",
    cat: "Événement",
    size: "col-span-1",
  },
  {
    titre: "Journée portes ouvertes — Témoignages parents",
    duree: "5:20",
    cat: "Témoignages",
    size: "col-span-1",
  },
  {
    titre: "Notre approche pédagogique",
    duree: "4:55",
    cat: "Pédagogie",
    size: "col-span-1",
  },
  {
    titre: "Tournoi de football inter-classes 2024",
    duree: "2:30",
    cat: "Sport",
    size: "col-span-1",
  },
  {
    titre: "Spectacle de fin d'année — CM2",
    duree: "12:00",
    cat: "Événement",
    size: "col-span-2",
  },
];

export default function VideosPage() {
  return (
    <main className="pt-16 lg:pt-20">
      {/* Header */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/30 mb-4">
            Vidéothèque
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-black max-w-2xl leading-tight">
            Montagne Rouge en vidéo.
          </h1>
        </div>
      </section>

      {/* Grid vidéos */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {videos.map((v, i) => (
              <div
                key={i}
                className={`${v.size === "col-span-2" ? "md:col-span-2" : ""} group cursor-pointer`}
              >
                {/* Thumbnail placeholder */}
                <div className="bg-neutral-100 rounded-2xl aspect-video relative overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5 text-black ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md font-mono">
                    {v.duree}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-rouge/80 uppercase tracking-wider">
                    {v.cat}
                  </span>
                  <h3 className="font-semibold text-black text-sm mt-1 group-hover:text-rouge transition-colors">
                    {v.titre}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
