"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const categories = ["Tout", "Vie scolaire", "Classes", "Sport", "Arts", "Campus", "Événements"];

const photos = [
  { src: "/galerie-vie-scolaire.jpg",  label: "La vie au quotidien",       cat: "Vie scolaire", featured: true },
  { src: "/galerie-sport.jpg",         label: "Sport & équipes",            cat: "Sport" },
  { src: "/galerie-arts.jpg",          label: "Arts & culture",             cat: "Arts" },
  { src: "/galerie-evenement.jpg",     label: "Cérémonie de diplômes",      cat: "Événements" },
  { src: "/galerie-cour.jpg",          label: "Cour de récréation",         cat: "Vie scolaire" },
  { src: "/galerie-lecture.jpg",       label: "Cours en classe",            cat: "Classes" },
  { src: "/galerie-campus.jpg",        label: "Campus",                     cat: "Campus" },
  { src: "/galerie-bibliotheque.jpg",  label: "Bibliothèque",               cat: "Campus" },
  { src: "/galerie-sciences.jpg",      label: "Laboratoire de sciences",    cat: "Classes" },
  { src: "/galerie-activite.jpg",      label: "Activités sportives",        cat: "Sport" },
  { src: "/niveaux-maternelle.jpg",    label: "Classe de maternelle",       cat: "Vie scolaire" },
  { src: "/niveaux-primaire.jpg",      label: "Primaire en action",         cat: "Classes" },
];

export default function GaleriePreview() {
  const [active, setActive] = useState("Tout");

  const visible =
    active === "Tout"
      ? photos.slice(0, 9)
      : photos.filter((p) => p.cat === active);

  const isAll = active === "Tout";

  return (
    <section className="py-24 lg:py-32" style={{ background: "#F5F3F0" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <Reveal className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/30 mb-3">
              Galerie
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-black leading-tight"
              style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
            >
              La vie à Montagne Rouge
            </h2>
          </div>
          <Link
            href="/galerie"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-black/35 hover:text-black transition-colors"
          >
            Voir tout
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>

        {/* ── Category chips ── */}
        <Reveal className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-[11px] font-semibold tracking-wide px-4 py-2 rounded-full border transition-all duration-200 ${
                  active === cat
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black/45 border-black/15 hover:border-black/30 hover:text-black/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Grid ── */}
        <Reveal>
          {isAll ? (
            /* Featured asymmetric grid — desktop: 4-col, first tile 2×2 */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[190px]">
              {visible.map((photo, i) => {
                const isFeatured = i === 0;
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
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes={
                        isFeatured
                          ? "(min-width: 768px) 50vw, 100vw"
                          : "(min-width: 768px) 25vw, 50vw"
                      }
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Category badge on featured */}
                    {isFeatured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/10 text-white text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                          <span className="w-1 h-1 rounded-full bg-rouge shrink-0" aria-hidden />
                          {photo.cat}
                        </span>
                      </div>
                    )}
                    {/* Label on hover */}
                    <div className="absolute bottom-3 left-3 right-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-xs font-semibold leading-snug">{photo.label}</p>
                      <p className="text-white/55 text-[10px] mt-0.5">{photo.cat}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Filtered view — regular responsive grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
              {visible.length === 0 ? (
                <p className="col-span-4 py-16 text-center text-black/30 text-sm">
                  Aucune photo dans cette catégorie.
                </p>
              ) : (
                visible.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative overflow-hidden rounded-2xl group cursor-pointer"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-xs font-semibold leading-snug">{photo.label}</p>
                      <p className="text-white/55 text-[10px] mt-0.5">{photo.cat}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </Reveal>

        {/* ── Mobile CTA ── */}
        <div className="mt-10 text-center">
          <Link
            href="/galerie"
            className="text-sm font-medium text-black/40 hover:text-black transition-colors"
          >
            Voir toute la galerie →
          </Link>
        </div>

      </div>
    </section>
  );
}
