import type { Metadata } from "next";
import FlowRenseignements from "@/components/inscriptions/FlowRenseignements";

export const metadata: Metadata = {
  title: "Demande de renseignements — Montagne Rouge",
  description: "Posez vos questions sur les frais, les niveaux, les classes et le programme pédagogique. Notre équipe vous répond sous 24 h.",
};

export default function RenseignementsPage() {
  return <FlowRenseignements />;
}
