import type { FormuleCantine, Cantine } from "./types";

export const TARIFS_CANTINE: Record<FormuleCantine, number> = {
  dejeuner: 25_000,          // XOF/mois
  dejeuner_gouter: 32_000,   // XOF/mois
};

export const LABELS_FORMULE: Record<FormuleCantine, string> = {
  dejeuner: "Déjeuner",
  dejeuner_gouter: "Déjeuner + Goûter",
};

export function creerAbonnementCantine(
  eleveId: string,
  formule: FormuleCantine,
  mois: number,
  annee: number
): Omit<Cantine, "id" | "reference" | "datePaiement" | "notes"> {
  return {
    type: "cantine",
    eleveId,
    montant: TARIFS_CANTINE[formule],
    devise: "XOF",
    statut: "en_attente",
    formule,
    mois,
    annee,
    dateEcheance: new Date(annee, mois - 1, 1),
    createdAt: new Date(),
  };
}
