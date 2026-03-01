/**
 * Groupe Scolaire Montagne Rouge — configuration unique.
 * Modifiez CE SEUL FICHIER pour mettre à jour les informations
 * de contact, les statistiques et les textes clés sur tout le site.
 *
 * @see content/school.ts — alias public (réexporte ce fichier)
 */
export const SCHOOL = {
  // ── Identité ────────────────────────────────────────────
  name:         "Groupe Scolaire Montagne Rouge",
  shortName:    "Montagne Rouge",
  founded:      1996,
  /** Année scolaire en cours */
  year:         "2025–2026",

  // ── Adresse ─────────────────────────────────────────────
  address:      "Rue OKM 188, Ouakam, Cité Avion, Dakar, Sénégal",
  addressShort: "Ouakam – Cité Avion, Dakar",
  city:         "Dakar",
  district:     "Ouakam, Cité Avion",
  country:      "Sénégal",

  // ── Contact ──────────────────────────────────────────────
  phone:        "+221 77 790 43 43",
  phoneHref:    "tel:+221777904343",
  email:        "montagnerouge1996@gmail.com",
  emailHref:    "mailto:montagnerouge1996@gmail.com",
  /** WhatsApp professionnel (numéro français du directeur) */
  whatsapp:     "+33 7 62 53 43 21",
  whatsappUrl:  "https://wa.me/33762534321",

  // ── Délais de réponse ────────────────────────────────────
  responseDelay:        "5 jours ouvrés",
  renseignementsDelay:  "24 heures",

  // ── Statistiques officielles ─────────────────────────────
  stats: {
    eleves:      "+350",
    elevesLabel: "élèves",
    elevesSub:   "de la crèche à la Terminale",

    annees:      "30",
    anneesLabel: "ans",
    anneesSub:   "d'existence — fondée en 1996",

    bfem:        "100%",
    bfemLabel:   "BFEM",
    bfemSub:     "taux de réussite — 6 ans de suite",

    cfee:        "100%",
    cfeeLabel:   "CFEE",
    cfeeSub:     "taux de réussite au certificat",
  },

  // ── Niveaux ──────────────────────────────────────────────
  levels:         "Crèche, Garderie, Maternelle, Primaire, Collège, Lycée (jusqu'à la Terminale)",
  levelsShort:    "Crèche → Terminale",

  // ── Baccalauréat ─────────────────────────────────────────
  /** Formuler prudemment : première promo bac l'an prochain */
  bacNote:        "Première promotion au baccalauréat prochainement",
} as const;
