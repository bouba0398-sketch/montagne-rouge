"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  "Tout",
  "Vie scolaire",
  "Classes",
  "Sport",
  "Arts",
  "Campus",
  "Événements",
];

type Photo = {
  src: string;
  label: string;
  cat: string;
  featured?: boolean;
};

const photos: Photo[] = [
  // Featured — large hero tile
  {
    src: "/galerie-vie-scolaire.jpg",
    label: "Vie au quotidien",
    cat: "Vie scolaire",
    featured: true,
  },
  // Regular tiles
  { src: "/galerie-evenement.jpg", label: "Cérémonie de diplômes", cat: "Événements" },
  { src: "/galerie-sport.jpg", label: "Sport & équipes", cat: "Sport" },
  { src: "/galerie-cour.jpg", label: "Cour de récréation", cat: "Vie scolaire" },
  { src: "/galerie-lecture.jpg", label: "Cours en classe", cat: "Classes" },
  { src: "/galerie-campus.jpg", label: "Campus & couloirs", cat: "Campus" },
  { src: "/galerie-arts.jpg", label: "Arts plastiques", cat: "Arts" },
  { src: "/galerie-activite.jpg", label: "Activités sportives", cat: "Sport" },
  { src: "/galerie-bibliotheque.jpg", label: "Bibliothèque", cat: "Campus" },
  { src: "/galerie-sciences.jpg", label: "Laboratoire de sciences", cat: "Classes" },
  { src: "/niveaux-maternelle.jpg", label: "Classe de maternelle", cat: "Vie scolaire" },
  { src: "/niveaux-primaire.jpg", label: "Primaire en action", cat: "Classes" },
  { src: "/niveaux-college.jpg", label: "Collège", cat: "Classes" },
  { src: "/niveaux-lycee.jpg", label: "Remise des prix lycée", cat: "Événements" },
  { src: "/actualites-ecole.jpg", label: "Rentrée scolaire", cat: "Vie scolaire" },
  { src: "/pedago-hero.jpg", label: "Apprentissage en classe", cat: "Classes" },
  { src: "/credibilite-enseignant.jpg", label: "Enseignement individualisé", cat: "Classes" },
  { src: "/pedagogie-cours.jpg", label: "Atelier pédagogique", cat: "Classes" },
];

export default function GalerieGrid() {
  const [active, setActive] = useState("Tout");

  const filtered =
    active === "Tout" ? photos : photos.filter((p) => p.cat === active);

  const isAll = active === "Tout";

  return (
    <>
      {/* ── Filter bar — sticky ── */}
      <section className="py-6 bg-[#F8F7F5] border-b border-black/5 sticky top-[64px] lg:top-[80px] z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                  active === cat
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

      {/* ── Photo grid ── */}
      <section className="py-10 lg:py-14 bg-[#F8F7F5] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Count */}
          <p className="text-[11px] font-medium text-black/30 mb-6 uppercase tracking-wider">
            {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            {active !== "Tout" ? ` · ${active}` : ""}
          </p>

          <div
            className={`grid gap-3 ${
              isAll
                ? "grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px]"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px]"
            }`}
          >
            {filtered.map((photo) => {
              const isFeatured = isAll && photo.featured;
              return (
                <div
                  key={photo.src}
                  className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                    isFeatured ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes={
                      isFeatured
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    }
                  />
                  {/* Category badge — always visible on featured */}
                  {isFeatured && (
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 text-white text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-rouge shrink-0" aria-hidden />
                        {photo.cat}
                      </span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs font-semibold leading-snug">
                      {photo.label}
                    </p>
                    <p className="text-white/55 text-[10px] mt-0.5">{photo.cat}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-black/30 text-sm">Aucune photo dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
