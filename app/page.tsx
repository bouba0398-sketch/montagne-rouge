import type { Metadata } from "next";
import Hero            from "@/components/home/Hero";
import Actualites      from "@/components/home/Actualites";
import Niveaux         from "@/components/home/Niveaux";
import Stats           from "@/components/home/Stats";
import Credibilite     from "@/components/home/Credibilite";
import GaleriePreview  from "@/components/home/GaleriePreview";
import AdmissionsCTA   from "@/components/home/AdmissionsCTA";
import StickyAdmissionBar from "@/components/home/StickyAdmissionBar";

/*
  Homepage narrative order:
  1. Hero             — cinematic video
  2. Actualités       — dark carousel, engagement hook
  3. Niveaux          — Formation maternelle → lycée
  4. Stats            — Chiffres clés animated (carmin bg)
  5. Credibilite      — Pourquoi Montagne Rouge (4 proof cards)
  6. GaleriePreview   — Vie à l'école
  7. AdmissionsCTA    — Conversion: 3-step + CTA (carmin bg)

  Sticky bar: appears after hero scroll, dismisses via sessionStorage.
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
      <Actualites />
      <Niveaux />
      <Stats />
      <Credibilite />
      <GaleriePreview />
      <AdmissionsCTA />
      <StickyAdmissionBar />
    </main>
  );
}
