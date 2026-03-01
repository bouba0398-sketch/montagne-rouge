/**
 * Centralise les chemins d'images du site.
 *
 * Pour remplacer les photos :
 *   Déposez vos images dans /public/images/... en conservant exactement
 *   les mêmes noms de fichiers. Le site les affichera automatiquement.
 *
 * Structure :
 *   /public/images/hero/       — images de fond des pages
 *   /public/images/galerie/    — photos de la galerie (gal-01.jpg … gal-12.jpg)
 *   /public/images/actus/      — visuels des articles (actu-01.jpg … actu-06.jpg)
 *   /public/images/placeholders/placeholder.svg — fallback automatique
 */

export const PLACEHOLDER = "/images/placeholders/placeholder.svg";

export const heroImages = {
  home:      "/images/hero/home.jpg",
  ecole:     "/images/hero/ecole-exterieur.jpg",
  creche:    "/images/hero/creche.jpg",
  pedagogie: "/images/hero/pedagogie.jpg",
  galerie:   "/images/hero/galerie-vie-scolaire.jpg",
} as const;

export const galleryImages: string[] = Array.from(
  { length: 12 },
  (_, i) => `/images/galerie/gal-${String(i + 1).padStart(2, "0")}.jpg`
);

export const newsImages: string[] = Array.from(
  { length: 6 },
  (_, i) => `/images/actus/actu-${String(i + 1).padStart(2, "0")}.jpg`
);
