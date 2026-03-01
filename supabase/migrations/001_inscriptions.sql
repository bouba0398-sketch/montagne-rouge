-- =========================================================
--  Montagne Rouge — Migration 001
--  À exécuter dans Supabase Dashboard → SQL Editor
-- =========================================================

-- 1. Table inscriptions
-- ─────────────────────
CREATE TABLE IF NOT EXISTS public.inscriptions (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           TIMESTAMPTZ NOT NULL    DEFAULT NOW(),

  -- Demande
  type_demande         TEXT        NOT NULL
    CHECK (type_demande IN ('nouvelle_inscription', 'reinscription', 'transfert', 'renseignement')),
  status               TEXT        NOT NULL    DEFAULT 'nouveau',

  -- Élève
  eleve_prenom         TEXT,
  eleve_nom            TEXT,
  eleve_date_naissance DATE,
  eleve_sexe           TEXT,
  eleve_ecole_actuelle TEXT,
  niveau               TEXT,
  annee                TEXT,
  classe_actuelle      TEXT,

  -- Parent / tuteur
  parent_nom           TEXT,
  parent_lien          TEXT,
  parent_telephone     TEXT,
  parent_email         TEXT,

  -- Transfert-specific
  nom_ecole_origine    TEXT,
  ville_ecole_origine  TEXT,
  motif_transfert      TEXT,
  date_arrivee         TEXT,

  -- Renseignements-specific
  sujets               JSONB       DEFAULT '[]',
  message              TEXT,

  -- Réinscription-specific
  changements          TEXT,

  -- Options (all flows)
  options              JSONB       DEFAULT '{}',

  -- Documents uploadés (rempli après upload Storage)
  documents            JSONB       DEFAULT '[]'
);

-- Index utile pour la recherche/admin
CREATE INDEX IF NOT EXISTS idx_inscriptions_type     ON public.inscriptions (type_demande);
CREATE INDEX IF NOT EXISTS idx_inscriptions_status   ON public.inscriptions (status);
CREATE INDEX IF NOT EXISTS idx_inscriptions_created  ON public.inscriptions (created_at DESC);

-- 2. RLS — aucun accès public
-- ────────────────────────────
-- Toutes les opérations passent par la service_role key (côté serveur),
-- qui bypasse RLS. Aucune policy n'est nécessaire pour l'instant.
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
-- Pas de policies → aucun accès via anon/authenticated JWT.

-- 3. Storage bucket "inscriptions" (PRIVATE)
-- ────────────────────────────────────────────
-- À exécuter manuellement OU via le SQL Editor Supabase :
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'inscriptions',
  'inscriptions',
  false,                          -- PRIVATE
  10485760,                       -- 10 MB
  ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
  public             = false,
  file_size_limit    = 10485760,
  allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

-- Storage RLS — aucune policy publique.
-- Les uploads se font via la service_role key (côté serveur), qui bypasse RLS.
-- =========================================================
