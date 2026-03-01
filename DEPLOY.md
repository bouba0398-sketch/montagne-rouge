# Déploiement Vercel — Montagne Rouge

## Prérequis

- Compte Vercel (gratuit suffit) : https://vercel.com
- Repo GitHub poussé et à jour (`main`)
- Clés API prêtes (voir section Variables d'environnement)

---

## 1. Import du projet

1. Connectez-vous sur https://vercel.com/new
2. Cliquez **"Import Git Repository"** → sélectionnez le repo `montagne-rouge`
3. Vercel détecte automatiquement **Next.js** — ne pas toucher les paramètres par défaut

---

## 2. Paramètres de build

Vercel les renseigne automatiquement. Vérifiez qu'ils correspondent à ceci :

| Paramètre | Valeur |
|-----------|--------|
| Framework preset | **Next.js** |
| Build command | `npm run build` |
| Output directory | `.next` *(auto)* |
| Install command | `npm ci` |
| Node.js version | **20.x** (pinné via `.nvmrc`) |

> Rien à modifier manuellement. Si Vercel propose de changer, refuser.

---

## 3. Variables d'environnement

À renseigner dans **Vercel → Project → Settings → Environment Variables** avant le premier déploiement.

### Obligatoires

| Variable | Description | Où l'obtenir |
|----------|-------------|--------------|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails (formulaire contact + inscriptions) | [resend.com](https://resend.com) → API Keys |
| `UPLOADTHING_TOKEN` | Token UploadThing pour l'upload de documents (dossier d'inscription) | [uploadthing.com](https://uploadthing.com) → Dashboard → API Keys |

**Cochez les trois environnements** : Production, Preview, Development.

> Un exemple des variables requises est disponible dans `.env.example` à la racine du repo.

### Comportement si une variable est manquante

| Variable manquante | Comportement |
|--------------------|-------------|
| `RESEND_API_KEY` | Les routes `/api/contact` et `/api/inscriptions/submit` retournent HTTP 503 avec message clair. L'erreur est loggée dans Vercel Logs. Le reste du site fonctionne normalement. |
| `UPLOADTHING_TOKEN` | La route `/api/uploadthing` échoue au niveau SDK. L'upload de documents est impossible mais le reste du site est intact. |

---

## 4. Avant la mise en ligne (checklist)

Ces points sont dans le code et doivent être mis à jour **avant** le premier déploiement en production :

### Adresse email FROM (Resend)

Dans les deux fichiers suivants, remplacez `onboarding@resend.dev` par une adresse sur un domaine vérifié dans Resend :

```
app/api/contact/route.ts         ligne 6
app/api/inscriptions/submit/route.ts  ligne 6
```

```ts
// Avant (domaine sandbox Resend — ne fonctionne qu'en test)
const FROM = "Montagne Rouge <onboarding@resend.dev>";

// Après (domaine vérifié — ex: votre domaine ou sous-domaine dédié)
const FROM = "Montagne Rouge <contact@montagnerouge.sn>";
```

Pour vérifier un domaine : Resend → Domains → Add Domain → suivre les instructions DNS.

### Adresse email TO (destinataire)

Dans les mêmes fichiers, `bouba0398@gmail.com` est l'adresse qui reçoit les emails. Vérifier que c'est bien la bonne boîte de réception de l'école.

### Numéro WhatsApp

Le numéro `+221 77 000 00 00` est un placeholder. À remplacer dans :
- `components/layout/WhatsAppButton.tsx`
- `components/layout/Footer.tsx`
- `components/home/InscriptionCTA.tsx`
- `app/contact/page.tsx`
- Recap du formulaire d'inscription

---

## 5. Premier déploiement

Après avoir configuré les variables d'environnement, cliquez **"Deploy"**. La build prend environ 30–60 secondes.

Output attendu en fin de build :
```
✓ Compiled successfully
✓ Generating static pages (31/31)
```

Si la build échoue, consulter l'onglet **"Build Logs"** dans Vercel.

---

## 6. Post-deploy — Smoke tests

Effectuer ces vérifications dans l'ordre après chaque déploiement en production.

### Pages statiques

| URL | Quoi vérifier |
|-----|---------------|
| `/` | Page d'accueil charge, hero visible, stats affichées |
| `/ecole` | Contenu, section "En bref", stats bar |
| `/pedagogie` | Hero, section outcomes |
| `/galerie` | Hero, grille de galerie |
| `/actualites` | Liste d'articles, filtres fonctionnels |
| `/alumni` | Témoignages, stats affichés |
| `/contact` | Page charge sans erreur |
| `/inscriptions` | Hub avec les 3 cards |
| `/inscriptions/nouvelle-inscription` | Formulaire multi-step charge |
| `/inscriptions/reinscription` | Formulaire charge |
| `/inscriptions/transfert` | Formulaire charge |

### Navigation

- [ ] Menu desktop : tous les liens pointent vers les bonnes pages
- [ ] Menu mobile : s'ouvre et se ferme, tous les liens fonctionnent
- [ ] Bouton WhatsApp (coin bas-droit) : ouvre WhatsApp avec le bon numéro
- [ ] Logo → retour accueil

### Formulaire de contact (`/contact`)

- [ ] Remplir Nom + Email + Message → Envoyer
- [ ] Email reçu sur `bouba0398@gmail.com` avec les bonnes informations
- [ ] Message d'erreur affiché si un champ est vide
- [ ] Message de succès affiché après envoi

### Formulaire d'inscription (`/inscriptions/nouvelle-inscription`)

- [ ] Parcourir les 10 étapes jusqu'à l'upload
- [ ] Uploader un fichier PDF ou image → progress bar visible → fichier confirmé
- [ ] Soumettre → email de dossier reçu sur `bouba0398@gmail.com`
- [ ] Email contient le récapitulatif complet et le lien vers le document uploadé

### Formulaires flow (`/inscriptions/reinscription`, `/inscriptions/transfert`)

- [ ] Compléter les étapes → dernière étape → soumettre
- [ ] Pas d'erreur console dans les DevTools

### Performance & SEO

- [ ] Lighthouse sur `/` : Performance > 85, Accessibility > 90
- [ ] `<title>` correct sur chaque page (visible dans l'onglet du navigateur)
- [ ] Pas d'erreurs 404 dans la console réseau

### Vercel Logs

- [ ] Aucune erreur rouge dans **Vercel → Logs → Runtime** lors des tests ci-dessus
- [ ] Les requêtes POST aux API apparaissent avec status 200

---

## Commandes utiles

```bash
# Build local (même comportement que Vercel)
npm run build

# Vérifier les types TypeScript
npx tsc --noEmit

# Vérifier le linting
npm run lint

# Démarrer le serveur de prod en local
npm run build && npm run start
```
