import type { Metadata } from "next";
import FlowTransfert from "@/components/inscriptions/FlowTransfert";

export const metadata: Metadata = {
  title: "Transfert en cours d'année — Montagne Rouge",
  description: "Demande de transfert pour un élève qui rejoint Montagne Rouge depuis un autre établissement en cours d'année scolaire.",
};

export default function TransfertPage() {
  return <FlowTransfert />;
}
