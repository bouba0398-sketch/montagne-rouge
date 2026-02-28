import type { Metadata } from "next";
import InscriptionsHub from "@/components/inscriptions/InscriptionsHub";

export const metadata: Metadata = {
  title: "Inscriptions — Montagne Rouge",
  description:
    "Démarrez votre demande d'inscription en ligne : nouvelle inscription, réinscription, transfert ou demande de renseignements.",
};

export default function InscriptionsPage() {
  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-white">
      <InscriptionsHub />
    </main>
  );
}
