import type { JourEtude, NiveauScolaire, EtudeDirigee } from "./types";

export const TARIFS_ETUDE: Record<JourEtude, number> = {
  mercredi: 15_000,         // XOF/mois
  samedi: 15_000,           // XOF/mois
  mercredi_samedi: 25_000,  // XOF/mois (tarif groupé)
};

export const HORAIRES_ETUDE: Record<JourEtude, string> = {
  mercredi: "Mercredi 14h00 – 17h00",
  samedi: "Samedi 08h00 – 12h00",
  mercredi_samedi: "Mer. 14h–17h + Sam. 08h–12h",
};

export function creerEtudeDirigee(
  eleveId: string,
  jour: JourEtude,
  niveau: NiveauScolaire,
  mois: number,
  annee: number
): Omit<EtudeDirigee, "id" | "reference" | "datePaiement" | "notes"> {
  return {
    type: "etude_dirigee",
    eleveId,
    montant: TARIFS_ETUDE[jour],
    devise: "XOF",
    statut: "en_attente",
    jour,
    niveau,
    mois,
    annee,
    dateEcheance: new Date(annee, mois - 1, 1),
    createdAt: new Date(),
  };
}
