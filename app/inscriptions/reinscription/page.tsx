import type { Metadata } from "next";
import FlowReinscription from "@/components/inscriptions/FlowReinscription";

export const metadata: Metadata = {
  title: "Réinscription — Montagne Rouge",
  description: "Réinscrivez votre enfant déjà élève à Montagne Rouge pour l'année 2025–2026. Simple et rapide.",
};

export default function ReinscriptionPage() {
  return <FlowReinscription />;
}
