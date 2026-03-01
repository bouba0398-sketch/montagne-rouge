import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";
import PageHero from "@/components/layout/PageHero";
import { SCHOOL } from "@/lib/school-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Contactez le ${SCHOOL.name} : WhatsApp ${SCHOOL.whatsapp}, tél. ${SCHOOL.phone}, ou par email. Réponse sous 24 h ouvrées.`,
};

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <PageHero
        eyebrow="Nous joindre"
        title="Contact"
        subtitle="WhatsApp est le moyen le plus rapide. Sinon, nous répondons sous 24 h ouvrées."
        ctas={[
          { label: "Ouvrir WhatsApp", href: SCHOOL.whatsappUrl, variant: "primary", external: true },
        ]}
      />
      <ContactPageClient />
    </main>
  );
}
