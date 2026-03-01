# Déploiement Vercel — Montagne Rouge

## Variables d'environnement requises

À configurer dans **Vercel → Project → Settings → Environment Variables**.

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `RESEND_API_KEY` | ✅ Oui | Clé API Resend — envoi des emails contact & inscription |
| `EMAIL_TO` | ⚠️ Recommandé | Email destinataire des formulaires (défaut : `bouba0398@gmail.com`) |
| `UPLOADTHING_TOKEN` | ✅ Oui | Token UploadThing — upload de documents du dossier d'inscription |

> Cocher les 3 environnements : **Production**, **Preview**, **Development**.

---

## Étapes de déploiement

### 1. Créer le projet sur Vercel

1. Aller sur https://vercel.com/new
2. **"Import Git Repository"** → sélectionner `montagne-rouge`
3. Vercel détecte Next.js automatiquement — ne pas modifier les paramètres

### 2. Paramètres de build (auto-détectés, ne pas toucher)

| Paramètre | Valeur attendue |
|-----------|----------------|
| Framework | Next.js |
| Build command | `npm run build` |
| Output directory | `.next` |
| Node.js version | 20.x |

### 3. Configurer les variables d'environnement

Avant de cliquer "Deploy" :
- Ajouter `RESEND_API_KEY` → valeur depuis resend.com
- Ajouter `EMAIL_TO` → adresse email de réception (ex: `contact@montagnerouge.sn`)
- Ajouter `UPLOADTHING_TOKEN` → valeur depuis uploadthing.com

### 4. Déployer

Cliquer **"Deploy"**. La build prend ~45 secondes.

Résultat attendu :
```
✓ Compiled successfully
✓ Generating static pages (31/31)
```

---

## Check sécurité

| Point | Status |
|-------|--------|
| `.env.local` ignoré par git | ✅ `.gitignore` contient `.env*` |
| Aucune clé API dans le code | ✅ Vérifié — zéro secret en dur |
| Honeypot anti-spam sur les formulaires | ✅ Champ `hp` vérifié côté API |
| Rate limiting contact | ✅ 5 req / 10 min par IP |
| Rate limiting inscriptions | ✅ 3 req / 10 min par IP |
| Headers de sécurité HTTP | ✅ Configurés dans `next.config.ts` |
| Variables manquantes → 503 clair | ✅ Guard explicite dans chaque route |
| Sanitisation HTML dans les emails | ✅ `escHtml()` sur tous les inputs |

---

## Check email

### Tester le formulaire de contact

```bash
curl -X POST https://VOTRE_DOMAINE.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@example.com","message":"Ceci est un test de 20 caractères minimum."}'
```

Réponse attendue : `{"ok":true}`

### Tester le formulaire d'inscription

Aller sur `/inscriptions/nouvelle-inscription` → remplir tous les champs → uploader un document → soumettre.

Email attendu sur `EMAIL_TO` avec :
- Récapitulatif complet du dossier
- Lien(s) vers le(s) document(s) uploadé(s)

### Si `RESEND_API_KEY` est manquant

Les routes `/api/contact` et `/api/inscriptions/submit` retournent :
```json
{ "ok": false, "error": "Service d'email temporairement indisponible." }
```
HTTP 503 — visible dans Vercel → Logs → Runtime.

---

## Avant la mise en prod — points bloquants

- [ ] Vérifier un domaine dans Resend et remplacer `onboarding@resend.dev` dans :
  - `app/api/contact/route.ts` ligne `FROM`
  - `app/api/inscriptions/submit/route.ts` ligne `FROM`
- [ ] Configurer `EMAIL_TO` sur Vercel avec l'email de l'école
- [ ] Remplacer le numéro WhatsApp placeholder `+221 77 000 00 00` dans :
  - `components/layout/WhatsAppButton.tsx`
  - `components/layout/Footer.tsx`
  - `components/home/InscriptionCTA.tsx`
  - `app/contact/page.tsx`
