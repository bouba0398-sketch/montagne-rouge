import type { Metadata } from "next";
import GalerieGrid from "@/components/galerie/GalerieGrid";
import PageHero from "@/components/layout/PageHero";
import { SCHOOL } from "@/lib/school-config";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    `La vie au ${SCHOOL.name} en images — ${SCHOOL.addressShort} : salles de classe, sport, arts, événements et campus.`,
};

export default function GaleriePage() {
  return (
    <main>

      <PageHero
        eyebrow="Galerie photo · Montagne Rouge"
        title={<>La vie à Montagne Rouge<br className="hidden sm:block" /> en images.</>}
        subtitle="Vie scolaire, classes, sport, arts, campus et événements — l'école telle qu'elle est au quotidien."
        image={{ src: "/galerie-vie-scolaire.jpg", alt: "Élèves de Montagne Rouge lors d'une activité scolaire" }}
        decorativeLetter="G"
      />

      {/* Filter + Grid (client component) */}
      <GalerieGrid />

    </main>
  );
}
