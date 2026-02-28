import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact & Admissions — Montagne Rouge",
  description:
    "Contactez l'école Montagne Rouge : WhatsApp, formulaire ou téléphone. Réponse sous 24 h ouvrées.",
};

export default function ContactPage() {
  return (
    <main className="pt-16 lg:pt-20 bg-white min-h-screen">
      <ContactPageClient />
    </main>
  );
}
