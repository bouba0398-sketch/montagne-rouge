import type { ArticleTenue, Tenue } from "./types";

export const CATALOGUE_TENUES: Record<string, { designation: string; prix: number }> = {
  "UNI-HAU-001": { designation: "Chemise/Chemisette école (lot de 2)", prix: 12_000 },
  "UNI-PAN-001": { designation: "Pantalon/Jupe école (pièce)", prix: 8_000 },
  "UNI-PUL-001": { designation: "Pull ou gilet siglé", prix: 14_000 },
  "UNI-CHA-001": { designation: "Chaussettes (lot de 3)", prix: 3_500 },
  "UNI-SPO-001": { designation: "Tenue EPS complète", prix: 18_000 },
  "UNI-SAC-001": { designation: "Sac à dos siglé", prix: 22_000 },
};

export function calculerTotalTenue(articles: ArticleTenue[]): number {
  return articles.reduce(
    (acc, article) => acc + article.prixUnitaire * article.quantite,
    0
  );
}

export function creerCommandeTenue(
  eleveId: string,
  articles: ArticleTenue[]
): Omit<Tenue, "id" | "reference" | "datePaiement" | "notes"> {
  return {
    type: "tenue",
    eleveId,
    montant: calculerTotalTenue(articles),
    devise: "XOF",
    statut: "en_attente",
    articles,
    dateEcheance: new Date(),
    createdAt: new Date(),
  };
}
