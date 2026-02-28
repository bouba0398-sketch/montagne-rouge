import type { NiveauScolaire, Mensualite, StatutPaiement } from "./types";

// Tarifs mensuels XOF par niveau — à mettre à jour chaque rentrée
export const TARIFS_MENSUALITE: Record<NiveauScolaire, number> = {
  maternelle: 55_000,
  primaire: 65_000,
  college: 80_000,
  lycee: 95_000,
};

/** Mois de scolarité sur 10 mois (oct → juil) */
export const MOIS_SCOLAIRES = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7];

/** Génère les 10 échéances d'une année scolaire pour un élève */
export function genererEcheancesMensuelles(
  eleveId: string,
  niveau: NiveauScolaire,
  anneeScolaire: string // ex: "2025-2026"
): Omit<Mensualite, "id" | "reference" | "datePaiement" | "notes">[] {
  const [anneeDebut, anneeFin] = anneeScolaire.split("-").map(Number);
  const montant = TARIFS_MENSUALITE[niveau];

  return MOIS_SCOLAIRES.map((mois) => {
    const annee = mois >= 10 ? anneeDebut : anneeFin;
    return {
      type: "mensualite",
      eleveId,
      montant,
      devise: "XOF",
      statut: "en_attente" as StatutPaiement,
      mois,
      annee,
      niveau,
      anneeScolaire,
      dateEcheance: new Date(annee, mois - 1, 5), // 5 du mois
      createdAt: new Date(),
    };
  });
}

/** Calcule le solde restant dû pour un élève */
export function calculerSolde(mensualites: Mensualite[]): number {
  return mensualites
    .filter((m) => m.statut === "en_attente" || m.statut === "retard")
    .reduce((acc, m) => acc + m.montant, 0);
}

/** Retourne les mensualités en retard */
export function getMensualitesEnRetard(mensualites: Mensualite[]): Mensualite[] {
  const aujourd = new Date();
  return mensualites.filter(
    (m) => m.statut === "en_attente" && m.dateEcheance < aujourd
  );
}
