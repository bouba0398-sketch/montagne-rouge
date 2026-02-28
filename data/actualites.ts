export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  dateISO: string;
  category: "Événements" | "Vie scolaire" | "Examens" | "Annonces";
  urgent?: boolean;
  gradient: string;
}

export const CATEGORIES = [
  "Tous",
  "Événements",
  "Vie scolaire",
  "Examens",
  "Annonces",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ARTICLES: Article[] = [
  {
    slug: "inscriptions-2025-2026-ouvertes",
    title: "Inscriptions 2025–2026 officiellement ouvertes",
    excerpt:
      "Les dossiers d'inscription pour la rentrée scolaire 2025–2026 sont désormais acceptés pour tous les niveaux, de la Maternelle au Lycée. Places limitées par section.",
    content: [
      "Nous avons le plaisir d'informer toutes les familles que les inscriptions pour l'année scolaire 2025–2026 sont officiellement ouvertes à compter du 24 février 2025.",
      "Les dossiers sont acceptés pour tous les niveaux — de la Maternelle (PS·MS·GS) jusqu'au Lycée (2nde·1ère·Terminale) — dans la limite des places disponibles par section. Chaque classe dispose d'un effectif maîtrisé pour garantir un encadrement personnalisé de qualité.",
      "Le dossier d'inscription doit comprendre : photocopie de l'acte de naissance, bulletins des deux dernières années, 2 photos d'identité (4×4, fond blanc), copie de la CNI du parent ou tuteur. Pour les transferts, le certificat de radiation de l'établissement précédent est également requis.",
      "Notre équipe pédagogique étudiera chaque dossier dans un délai de 5 jours ouvrés. Les familles seront contactées par téléphone pour confirmer l'admission ou planifier un entretien de connaissance.",
      "N'attendez pas — les places se remplissent rapidement, en particulier aux niveaux Maternelle et Terminale. Notre équipe est disponible du lundi au vendredi de 8 h à 17 h, au secrétariat ou sur WhatsApp.",
    ],
    date: "24 février 2025",
    dateISO: "2025-02-24",
    category: "Annonces",
    urgent: true,
    gradient: "linear-gradient(135deg, #960018 0%, #5C000F 100%)",
  },
  {
    slug: "portes-ouvertes-mars-2025",
    title: "Journée portes ouvertes — samedi 15 mars 2025",
    excerpt:
      "Venez découvrir nos locaux, rencontrer nos enseignants et poser toutes vos questions lors de notre grande journée portes ouvertes annuelle.",
    content: [
      "Montagne Rouge organise sa journée portes ouvertes annuelle le samedi 15 mars 2025 de 9 h à 13 h. Cet événement est ouvert à toutes les familles souhaitant découvrir notre établissement, sans inscription préalable.",
      "Au programme : visite guidée des salles de classe, du laboratoire informatique, de la bibliothèque et des espaces de vie scolaire ; présentation des méthodes pédagogiques par nos enseignants titulaires ; rencontre avec la direction et l'équipe éducative ; ateliers de démonstration animés par nos élèves.",
      "C'est l'occasion idéale pour les futures familles de poser leurs questions dans un cadre convivial et d'observer l'atmosphère unique qui fait la réputation de Montagne Rouge. Nos élèves ambassadeurs seront présents pour partager leur expérience.",
      "Entrée libre. Un parking est disponible à proximité de l'établissement. Rafraîchissements offerts. Nous vous attendons nombreux pour cette matinée placée sous le signe de l'échange et de la découverte.",
    ],
    date: "10 février 2025",
    dateISO: "2025-02-10",
    category: "Événements",
    gradient: "linear-gradient(135deg, #1c2535 0%, #0a101a 100%)",
  },
  {
    slug: "resultats-bfem-2024",
    title: "BFEM 2024 — Taux de réussite de 95 %",
    excerpt:
      "Nos élèves de 3ème ont brillé lors du Brevet de Fin d'Études Moyennes 2024 avec un taux de réussite exceptionnel de 95 % — parmi les meilleurs établissements privés de Dakar.",
    content: [
      "C'est avec une immense fierté que nous partageons les résultats du Brevet de Fin d'Études Moyennes (BFEM) session 2024. Nos élèves de 3ème ont obtenu un taux de réussite de 95 %, plaçant Montagne Rouge parmi les meilleurs établissements privés de la région de Dakar.",
      "Parmi les lauréats, plusieurs élèves ont obtenu des mentions Très Bien et Bien, témoignant de la qualité de l'encadrement pédagogique et du travail acharné mené tout au long de l'année. Nous félicitons chaleureusement chaque candidat pour son engagement et sa rigueur.",
      "Ce résultat est le fruit d'un travail collectif : l'implication sans faille de nos enseignants, le soutien constant des familles, et la détermination exemplaire des élèves. Les séances d'étude dirigée du mercredi et du samedi ont joué un rôle central dans cette préparation.",
      "À tous les lauréats : Jërëjëf pour votre travail et votre persévérance. Vous portez haut les couleurs de Montagne Rouge. Nous vous souhaitons plein succès dans vos études en classe de Seconde.",
    ],
    date: "15 juillet 2024",
    dateISO: "2024-07-15",
    category: "Examens",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)",
  },
  {
    slug: "calendrier-vacances-2024-2025",
    title: "Calendrier officiel des vacances 2024–2025",
    excerpt:
      "Retrouvez toutes les dates des congés scolaires, jours fériés et fermetures de l'établissement pour l'intégralité de l'année scolaire en cours.",
    content: [
      "Voici le calendrier officiel des vacances et congés scolaires pour l'année 2024–2025, conformément aux directives du Ministère de l'Éducation Nationale du Sénégal.",
      "Vacances de Toussaint : du 28 octobre au 3 novembre 2024. Vacances de Noël : du 23 décembre 2024 au 5 janvier 2025. Vacances de mi-février : du 17 au 23 février 2025. Vacances de Pâques : du 14 au 27 avril 2025. Grandes vacances : à partir du 4 juillet 2025.",
      "Jours fériés à retenir : Magal de Touba (date variable selon le calendrier lunaire), Tamkharit, Korité et Tabaski. Pour ces jours à dates variables, les familles seront informées au moins deux semaines à l'avance par SMS et via ce site.",
      "L'établissement peut être amené à modifier ce calendrier en cas de circonstances exceptionnelles. Toute modification sera communiquée en priorité par SMS. Conservez ces dates précieusement pour organiser au mieux votre année familiale.",
    ],
    date: "1 septembre 2024",
    dateISO: "2024-09-01",
    category: "Annonces",
    gradient: "linear-gradient(135deg, #1f1a2e 0%, #130f1e 100%)",
  },
  {
    slug: "reunion-parents-enseignants-mars",
    title: "Réunion parents-enseignants — vendredi 28 mars",
    excerpt:
      "Une réunion parents-enseignants est organisée le 28 mars pour le bilan du deuxième trimestre. Les bulletins seront remis lors de cette rencontre.",
    content: [
      "Dans le cadre du suivi scolaire de nos élèves, Montagne Rouge organise sa réunion parents-enseignants du deuxième trimestre le vendredi 28 mars 2025 à partir de 15 h.",
      "Chaque parent ou tuteur pourra s'entretenir individuellement avec les enseignants de son enfant pendant 10 à 15 minutes selon le niveau. Les bulletins du 2ème trimestre seront remis lors de cette rencontre. Merci de vous munir de votre carnet de suivi.",
      "Les rendez-vous seront attribués par ordre d'arrivée à partir de 14 h 30 au secrétariat. Nous encourageons fortement la présence de tous les parents — le dialogue entre la famille et l'école est un pilier fondamental de notre projet éducatif.",
      "Pour les parents ne pouvant pas se déplacer, une session de rattrapage téléphonique sera organisée la semaine suivante. Merci de contacter le secrétariat avant le 25 mars pour vous inscrire à cette option.",
    ],
    date: "3 mars 2025",
    dateISO: "2025-03-03",
    category: "Vie scolaire",
    gradient: "linear-gradient(135deg, #0f2018 0%, #091510 100%)",
  },
  {
    slug: "concours-lecture-voix-haute",
    title: "Concours inter-classes de lecture à voix haute",
    excerpt:
      "Les élèves du CE2 au CM2 participent à notre concours annuel de lecture. La grande finale, ouverte aux familles, se tiendra le samedi 15 mars.",
    content: [
      "Chaque année, Montagne Rouge organise son concours inter-classes de lecture à voix haute. Cette édition 2025 promet d'être particulièrement intense : les élèves ont travaillé sur des textes issus de la littérature africaine et francophone contemporaine.",
      "Le concours se déroulera en deux phases : des demi-finales par niveau du 3 au 7 mars dans les classes, suivies d'une grande finale ouverte aux familles le samedi 15 mars — dans le cadre de notre journée portes ouvertes. Les finalistes représenteront leur classe avec fierté.",
      "Les critères d'évaluation incluent la fluidité, l'expression, la maîtrise du texte et la présence. Un jury composé d'enseignants et d'invités extérieurs remettra des prix aux trois premiers de chaque niveau.",
      "Cet événement incarne les valeurs de Montagne Rouge : excellence académique, épanouissement personnel et amour de la langue française. Félicitations à tous les participants pour leur préparation.",
    ],
    date: "28 février 2025",
    dateISO: "2025-02-28",
    category: "Vie scolaire",
    gradient: "linear-gradient(135deg, #1e1a0f 0%, #12100a 100%)",
  },
  {
    slug: "resultats-cfee-2024",
    title: "CFEE 2024 — 97 % de réussite pour nos CM2",
    excerpt:
      "Nos élèves de CM2 ont décroché un taux de réussite de 97 % au Certificat de Fin d'Études Élémentaires — une performance historique pour l'école.",
    content: [
      "Le Certificat de Fin d'Études Élémentaires (CFEE) 2024 s'est soldé par un résultat historique : 97 % de taux de réussite pour nos élèves de CM2. Sur 35 candidats, 34 ont obtenu leur certificat, dont 12 avec mention — un bilan exceptionnel.",
      "Ce succès reflète l'excellence pédagogique portée par toute l'équipe du cycle élémentaire. Les cours de renforcement hebdomadaires, les dictées quotidiennes et les révisions méthodiques des dernières semaines ont fait la différence lors des épreuves.",
      "Nous sommes particulièrement fiers des élèves qui ont réalisé des progrès spectaculaires entre septembre et juin. Certains ont surmonté des difficultés réelles avec une détermination admirable — une transformation dont leurs familles peuvent être légitimement fières.",
      "Les lauréats entrent l'année prochaine en classe de 6ème. Montagne Rouge leur souhaite plein succès dans ce nouveau cycle, qu'ils poursuivent chez nous ou ailleurs. Ils portent en eux les valeurs de Montagne Rouge.",
    ],
    date: "20 juin 2024",
    dateISO: "2024-06-20",
    category: "Examens",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)",
  },
  {
    slug: "cours-vacances-juillet-2025",
    title: "Cours de vacances juillet 2025 — inscriptions ouvertes",
    excerpt:
      "Préparez la rentrée avec nos cours de vacances intensifs en mathématiques, français et anglais, du 7 au 25 juillet 2025.",
    content: [
      "Montagne Rouge propose ses cours de vacances intensifs pour l'été 2025, du lundi 7 juillet au vendredi 25 juillet. Ces sessions sont ouvertes à tous les élèves du CP à la Terminale, qu'ils soient ou non élèves de Montagne Rouge.",
      "Matières proposées : Mathématiques, Français (orthographe, grammaire, rédaction), Anglais (oral et écrit). Les cours se déroulent en petits groupes de 8 à 12 élèves maximum, encadrés par nos enseignants permanents.",
      "Horaires : du lundi au vendredi, de 8 h à 12 h. Une option après-midi (14 h – 17 h) est disponible pour les élèves en préparation intensive aux examens de septembre ou en situation de grand rattrapage.",
      "Places limitées — les inscriptions sont déjà ouvertes au secrétariat. Tarifs communiqués sur demande. Offrez à votre enfant les meilleures conditions pour aborder la rentrée avec confiance.",
    ],
    date: "5 février 2025",
    dateISO: "2025-02-05",
    category: "Annonces",
    gradient: "linear-gradient(135deg, #7A0014 0%, #3D0008 100%)",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
