import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Groupe Scolaire Montagne Rouge — École privée à Ouakam, Dakar",
    template: "%s | Groupe Scolaire Montagne Rouge",
  },
  description:
    "Groupe Scolaire Montagne Rouge — école privée à Ouakam, Cité Avion, Dakar. De la crèche à la Terminale depuis 1996. 100 % de réussite au BFEM 6 ans de suite.",
  keywords: [
    "école privée Dakar",
    "groupe scolaire Ouakam",
    "Montagne Rouge Dakar",
    "école Ouakam Cité Avion",
    "inscription scolaire Dakar",
    "BFEM CFEE Dakar",
  ],
  openGraph: {
    title: "Groupe Scolaire Montagne Rouge — École privée à Ouakam, Dakar",
    description:
      "De la crèche à la Terminale depuis 1996. 100 % au BFEM 6 ans de suite. +350 élèves à Ouakam, Cité Avion, Dakar.",
    locale: "fr_SN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
      >
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
      </body>
    </html>
  );
}
