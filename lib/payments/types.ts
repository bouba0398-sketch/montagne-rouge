export type Devise = "XOF";

export type NiveauScolaire = "maternelle" | "primaire" | "college" | "lycee";

export type StatutPaiement =
  | "en_attente"
  | "paye"
  | "retard"
  | "annule"
  | "rembourse";

export interface PaiementBase {
  id: string;
  eleveId: string;
  montant: number; // en XOF
  devise: Devise;
  statut: StatutPaiement;
  dateEcheance: Date;
  datePaiement?: Date;
  reference?: string; // référence transaction
  notes?: string;
  createdAt: Date;
}

// ── Mensualité ────────────────────────────────────────────
export interface Mensualite extends PaiementBase {
  type: "mensualite";
  mois: number; // 1–12
  annee: number;
  niveau: NiveauScolaire;
  anneeScolaire: string; // ex: "2025-2026"
}

// ── Inscription ───────────────────────────────────────────
export interface FraisInscription extends PaiementBase {
  type: "inscription";
  anneeScolaire: string;
  niveau: NiveauScolaire;
  dossierComplet: boolean;
  fraisDossier: number; // sous-montant frais de dossier (XOF)
}

// ── Cantine ───────────────────────────────────────────────
export type FormuleCantine = "dejeuner" | "dejeuner_gouter";

export interface Cantine extends PaiementBase {
  type: "cantine";
  mois: number;
  annee: number;
  formule: FormuleCantine;
}

// ── Tenues scolaires ──────────────────────────────────────
export interface ArticleTenue {
  reference: string;
  designation: string;
  taille: string;
  quantite: number;
  prixUnitaire: number; // XOF
}

export interface Tenue extends PaiementBase {
  type: "tenue";
  articles: ArticleTenue[];
}

// ── Étude dirigée ─────────────────────────────────────────
export type JourEtude = "mercredi" | "samedi" | "mercredi_samedi";

export interface EtudeDirigee extends PaiementBase {
  type: "etude_dirigee";
  jour: JourEtude;
  mois: number;
  annee: number;
  niveau: NiveauScolaire;
}

// ── Cours de vacances ─────────────────────────────────────
export interface CoursVacances extends PaiementBase {
  type: "cours_vacances";
  periode: string; // ex: "Juillet 2025"
  matieres: string[];
  nombreHeures: number;
  niveau: NiveauScolaire;
}

// ── Union type ────────────────────────────────────────────
export type Paiement =
  | Mensualite
  | FraisInscription
  | Cantine
  | Tenue
  | EtudeDirigee
  | CoursVacances;

// ── Résumé compte élève ───────────────────────────────────
export interface ComptabiliteEleve {
  eleveId: string;
  solde: number; // négatif = dette (XOF)
  paiements: Paiement[];
  prochainEcheance?: Date;
}
