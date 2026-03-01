import type { Metadata } from "next";
import ActualitesPage from "@/components/actualites/ActualitesPage";
import PageHero from "@/components/layout/PageHero";
import { SCHOOL } from "@/lib/school-config";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    `Actualités du ${SCHOOL.name} : événements, vie scolaire, résultats d'examens et annonces importantes.`,
};

export default function Page() {
  return (
    <main>
      <PageHero
        variant="dark"
        eyebrow="Informations & vie de l'école"
        title="Actualités de Montagne Rouge"
        subtitle="La vie de l'école au quotidien — événements, résultats, annonces et informations pratiques."
        decorativeLetter="A"
      />
      <ActualitesPage />
    </main>
  );
}
