import type { NiveauScolaire, CoursVacances } from "./types";

export interface SessionCoursVacances {
  periode: string;
  dateDebut: Date;
  dateFin: Date;
  matieres: string[];
  niveaux: NiveauScolaire[];
  tarif: number; // XOF pour 2 semaines
}

export const SESSIONS_VACANCES: SessionCoursVacances[] = [
  {
    periode: "Juillet 2025",
    dateDebut: new Date(2025, 6, 7),
    dateFin: new Date(2025, 6, 18),
    matieres: ["Mathématiques", "Français", "Anglais", "Sciences"],
    niveaux: ["primaire", "college", "lycee"],
    tarif: 45_000,
  },
  {
    periode: "Août 2025",
    dateDebut: new Date(2025, 7, 4),
    dateFin: new Date(2025, 7, 15),
    matieres: ["Mathématiques", "Français", "Anglais"],
    niveaux: ["primaire", "college", "lycee"],
    tarif: 45_000,
  },
];

export const TARIF_HEURE_SUPP = 5_000; // XOF/heure supplémentaire

export function creerCoursVacances(
  eleveId: string,
  session: SessionCoursVacances,
  matieres: string[],
  niveau: NiveauScolaire
): Omit<CoursVacances, "id" | "reference" | "datePaiement" | "notes"> {
  const heuresParMatiere = 10;
  return {
    type: "cours_vacances",
    eleveId,
    montant: session.tarif,
    devise: "XOF",
    statut: "en_attente",
    periode: session.periode,
    matieres,
    nombreHeures: matieres.length * heuresParMatiere,
    niveau,
    dateEcheance: session.dateDebut,
    createdAt: new Date(),
  };
}
