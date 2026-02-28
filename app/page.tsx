import type { Metadata } from "next";
import Hero          from "@/components/home/Hero";
import Credibilite   from "@/components/home/Credibilite";
import Stats         from "@/components/home/Stats";
import Niveaux       from "@/components/home/Niveaux";
import GaleriePreview from "@/components/home/GaleriePreview";
import Actualites    from "@/components/home/Actualites";
import InscriptionCTA from "@/components/home/InscriptionCTA";

/*
  Homepage narrative order (7 sections):
  1. Hero           — cinematic video
  2. Credibilite    — "Pourquoi Montagne Rouge" (4 proof cards, bordeaux bg)
  3. Stats          — Chiffres clés animated (bordeaux bg, visually joined)
  4. Niveaux        — Parcours élève maternelle → lycée
  5. GaleriePreview — Vie à l'école (chips + 9 images)
  6. Actualites     — Actualités récentes
  7. InscriptionCTA — Final CTA admissions (bordeaux bg)

  Removed (redundant):
  - Pedagogie    → 4 method cards = Credibilite, journey = Niveaux, stats = Stats
  - CampusInfra  → campus shown in gallery; doesn't advance narrative
  - Temoignages  → second CTA block duplicated InscriptionCTA
*/
export const metadata: Metadata = {
  title: "Montagne Rouge — École Internationale Privée à Dakar",
  description:
    "École internationale privée de référence à Dakar, Sénégal. Excellence académique de la maternelle au lycée. Inscriptions 2025–2026 ouvertes.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Credibilite />
      <Stats />
      <Niveaux />
      <GaleriePreview />
      <Actualites />
      <InscriptionCTA />
    </main>
  );
}
