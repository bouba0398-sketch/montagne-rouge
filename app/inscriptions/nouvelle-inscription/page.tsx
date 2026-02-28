import type { Metadata } from "next";
import FlowNouvelleInscription from "@/components/inscriptions/FlowNouvelleInscription";

export const metadata: Metadata = {
  title: "Nouvelle inscription — Montagne Rouge",
  description: "Inscrivez votre enfant à Montagne Rouge pour la première fois. Formulaire en ligne rapide — réponse sous 5 jours ouvrés.",
};

export default function NouvelleInscriptionPage() {
  return <FlowNouvelleInscription />;
}
