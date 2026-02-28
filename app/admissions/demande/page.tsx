import type { Metadata } from "next";
import MultiStepForm from "@/components/admissions/MultiStepForm";

export const metadata: Metadata = {
  title: "Demande d'admission",
  description:
    "Déposez votre demande d'admission à Montagne Rouge en quelques minutes. Formulaire en ligne simple et rapide.",
};

export default function DemandePage() {
  return <MultiStepForm />;
}
