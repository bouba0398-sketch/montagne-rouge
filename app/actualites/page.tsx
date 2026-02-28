import type { Metadata } from "next";
import ActualitesPage from "@/components/actualites/ActualitesPage";

export const metadata: Metadata = {
  title: "Actualités — Montagne Rouge",
  description:
    "Toutes les actualités de Montagne Rouge : événements, vie scolaire, résultats d'examens et annonces importantes.",
};

export default function Page() {
  return (
    <main className="pt-16 lg:pt-20">
      <ActualitesPage />
    </main>
  );
}
