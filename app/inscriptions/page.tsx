import type { Metadata } from "next";
import InscriptionsHub from "@/components/inscriptions/InscriptionsHub";
import { SCHOOL } from "@/lib/school-config";

export const metadata: Metadata = {
  title: "Inscriptions",
  description:
    `Inscriptions ${SCHOOL.year} au ${SCHOOL.name} — nouvelle inscription, réinscription, transfert ou demande de renseignements. ${SCHOOL.levelsShort}.`,
};

export default function InscriptionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <InscriptionsHub />
    </main>
  );
}
