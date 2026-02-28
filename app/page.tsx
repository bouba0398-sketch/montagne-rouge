import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Credibilite from "@/components/home/Credibilite";
import Stats from "@/components/home/Stats";
import Pedagogie from "@/components/home/Pedagogie";
import Actualites from "@/components/home/Actualites";
import Niveaux from "@/components/home/Niveaux";
import GaleriePreview from "@/components/home/GaleriePreview";
import InscriptionCTA from "@/components/home/InscriptionCTA";
import CampusInfra from "@/components/home/CampusInfra";
import Temoignages from "@/components/home/Temoignages";

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
      <Pedagogie />
      <Actualites />
      <Niveaux />
      <GaleriePreview />
      <InscriptionCTA />
      <CampusInfra />
      <Temoignages />
    </main>
  );
}
