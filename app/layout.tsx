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
    default: "Montagne Rouge — École Internationale Privée à Dakar",
    template: "%s | Montagne Rouge",
  },
  description:
    "Montagne Rouge est l'école internationale privée de référence à Dakar, Sénégal. Excellence académique de la maternelle au lycée.",
  keywords: [
    "école Dakar",
    "école internationale Sénégal",
    "école privée Dakar",
    "Montagne Rouge",
    "inscription scolaire Dakar",
  ],
  openGraph: {
    title: "Montagne Rouge — École Internationale Privée à Dakar",
    description: "L'excellence académique au cœur de Dakar, Sénégal.",
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
