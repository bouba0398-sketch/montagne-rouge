import type { NiveauScolaire, FraisInscription } from "./types";

export const FRAIS_INSCRIPTION: Record<NiveauScolaire, number> = {
  maternelle: 150_000,
  primaire: 175_000,
  college: 200_000,
  lycee: 225_000,
};

/** Frais de dossier (non remboursables) inclus dans l'inscription */
export const FRAIS_DOSSIER = 25_000;

export const DOCUMENTS_REQUIS: Record<NiveauScolaire, string[]> = {
  maternelle: [
    "Acte de naissance",
    "Carnet de vaccination",
    "2 photos d'identité",
    "Certificat médical",
  ],
  primaire: [
    "Acte de naissance",
    "Bulletins scolaires (2 dernières années)",
    "2 photos d'identité",
    "Certificat de radiation",
  ],
  college: [
    "Acte de naissance",
    "Bulletins scolaires CM2 et 6ème",
    "Résultats CFEE si applicable",
    "2 photos d'identité",
    "Certificat de radiation",
  ],
  lycee: [
    "Acte de naissance",
    "Bulletins 3ème et 2nde",
    "Résultats BFEM si applicable",
    "2 photos d'identité",
    "Certificat de radiation",
  ],
};

export function creerDossierInscription(
  eleveId: string,
  niveau: NiveauScolaire,
  anneeScolaire: string
): Omit<FraisInscription, "id" | "reference" | "datePaiement" | "notes"> {
  return {
    type: "inscription",
    eleveId,
    montant: FRAIS_INSCRIPTION[niveau],
    devise: "XOF",
    statut: "en_attente",
    niveau,
    anneeScolaire,
    dossierComplet: false,
    fraisDossier: FRAIS_DOSSIER,
    dateEcheance: new Date(),
    createdAt: new Date(),
  };
}
