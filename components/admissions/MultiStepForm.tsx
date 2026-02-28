"use client";

import { useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────

type TypeDemande = "nouvelle_inscription" | "demande_information" | "transfert" | "";
type SexeOption  = "masculin" | "feminin" | "";
type CantineOption = "non" | "dejeuner" | "dejeuner_gouter";

interface EnrollmentData {
  // Step 1 — Identification
  typeDemande:    TypeDemande;
  classeDemandee: string;
  ageEnfant:      string;
  anneeScolaire:  string;
  // Step 2 — Élève
  prenomEleve:  string;
  nomEleve:     string;
  dateNaissance: string;
  sexe:         SexeOption;
  nationalite:  string;
  ecoleActuelle: string;
  photoEleve:   File | null;
  // Step 3 — Parents
  nomPere:        string;
  telephonePere:  string;
  professionPere: string;
  nomMere:        string;
  telephoneMere:  string;
  professionMere: string;
  emailPrincipal: string;
  whatsapp:       string;
  // Step 4 — Adresse
  quartier: string;
  ville:    string;
  pays:     string;
  // Step 5 — Options
  cantine:            CantineOption;
  etudesDirigees:     boolean;
  transport:          boolean;
  packFournitures:    boolean;
  tailleUniforme:     string;
  packCompletUniforme: boolean;
  // Step 6 — Documents
  documents: Record<string, File | null>;
}

const INITIAL: EnrollmentData = {
  typeDemande: "", classeDemandee: "", ageEnfant: "", anneeScolaire: "",
  prenomEleve: "", nomEleve: "", dateNaissance: "", sexe: "",
  nationalite: "", ecoleActuelle: "", photoEleve: null,
  nomPere: "", telephonePere: "", professionPere: "",
  nomMere: "", telephoneMere: "", professionMere: "",
  emailPrincipal: "", whatsapp: "",
  quartier: "", ville: "", pays: "Sénégal",
  cantine: "non", etudesDirigees: false, transport: false,
  packFournitures: false, tailleUniforme: "", packCompletUniforme: false,
  documents: {},
};

// ─────────────────────────────────────────────────────────
// STEP CONFIG
// ─────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Identification" },
  { id: 2, label: "Élève" },
  { id: 3, label: "Parents" },
  { id: 4, label: "Adresse" },
  { id: 5, label: "Options" },
  { id: 6, label: "Documents" },
  { id: 7, label: "Récapitulatif" },
] as const;

const TOTAL = STEPS.length;

// ─────────────────────────────────────────────────────────
// DOCUMENT LIST
// ─────────────────────────────────────────────────────────

const DOCS = [
  { key: "acte_naissance",       label: "Acte de naissance",        required: true,  accept: "image/*,.pdf" },
  { key: "photos_identite",      label: "Photos d'identité (× 2)",  required: true,  accept: "image/*" },
  { key: "bulletins_scolaires",  label: "Bulletins scolaires",      required: false, accept: "image/*,.pdf" },
  { key: "certificat_radiation", label: "Certificat de radiation",  required: false, accept: "image/*,.pdf" },
  { key: "carnet_vaccination",   label: "Carnet de vaccination",    required: true,  accept: "image/*,.pdf" },
  { key: "cni_parent",           label: "CNI du parent / tuteur",   required: true,  accept: "image/*,.pdf" },
];

// ─────────────────────────────────────────────────────────
// SHARED UI
// ─────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle }: {
  eyebrow: string; title: string; subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-rouge/70 mb-3">
        {eyebrow}
      </p>
      <h2
        className="font-display font-semibold tracking-tight text-black leading-tight mb-2"
        style={{ fontSize: "clamp(24px,3vw,36px)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-black/40 text-[14px] leading-relaxed max-w-lg">{subtitle}</p>
      )}
    </div>
  );
}

function Field({ label, required, children }: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-black/45 uppercase tracking-[0.08em]">
        {label}{required && <span className="text-rouge ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = [
  "w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] text-black",
  "placeholder:text-black/20 focus:outline-none focus:border-rouge/50",
  "focus:ring-2 focus:ring-rouge/6 transition-all bg-white",
].join(" ");

const selectCls = inputCls + " appearance-none cursor-pointer";

function Btn({ children, onClick, disabled, submit }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  submit?: boolean;
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 bg-rouge text-white font-semibold px-8 py-4 rounded-full text-[13px] hover:bg-rouge-dark transition-all duration-200 hover:shadow-lg hover:shadow-rouge/25 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-rouge disabled:active:scale-100"
    >
      {children}
    </button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-8 inline-flex items-center gap-1.5 text-[12px] font-medium text-black/30 hover:text-black/70 transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Retour
    </button>
  );
}

function Arrow() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 ${on ? "bg-rouge" : "bg-black/15"}`}
    >
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${on ? "left-6" : "left-1"}`} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  if (step === 0 || step > TOTAL) return null;
  const pct = Math.round((step / TOTAL) * 100);

  return (
    <div className="sticky top-[64px] lg:top-[72px] z-40 bg-white/96 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-4">

        {/* Mobile */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] text-black/35 font-medium">
              Étape {step}/{TOTAL} — {STEPS[step - 1]?.label}
            </p>
            <p className="text-[11px] text-rouge font-semibold">{pct}%</p>
          </div>
          <div className="h-1 bg-black/6 rounded-full overflow-hidden">
            <div
              className="h-full bg-rouge rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Desktop: dots + labels */}
        <div className="hidden sm:flex items-center">
          {STEPS.map((s, i) => {
            const done   = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                    done   ? "bg-rouge text-white" :
                    active ? "bg-rouge text-white ring-4 ring-rouge/15" :
                             "bg-black/6 text-black/30"
                  }`}>
                    {done ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : s.id}
                  </div>
                  <span className={`text-[9px] font-semibold uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                    active ? "text-rouge" : done ? "text-black/40" : "text-black/20"
                  }`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 mb-4 transition-colors duration-500 ${done ? "bg-[rgba(196,30,58,0.35)]" : "bg-[rgba(0,0,0,0.07)]"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 0 — INTRO
// ─────────────────────────────────────────────────────────

function StepIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-lg">
      <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-rouge/70 mb-5">
        Admissions 2025–2026
      </p>
      <h1
        className="font-display font-semibold tracking-tight text-black mb-5 leading-tight"
        style={{ fontSize: "clamp(40px,5vw,64px)" }}
      >
        Demande<br className="sm:hidden" />{" "}d&apos;inscription
      </h1>
      <p className="text-black/45 text-[17px] leading-[1.7] mb-10 max-w-sm">
        Un processus en 7 étapes, entièrement en ligne.
        Préparez les documents de votre enfant avant de commencer.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Btn onClick={onNext}>
          Commencer <Arrow />
        </Btn>
        <a
          href="https://wa.me/221770000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-black/10 text-black/55 font-medium px-8 py-4 rounded-full text-[13px] hover:border-black/20 hover:text-black transition-all"
        >
          <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Besoin d&apos;aide ?
        </a>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-black/6 pt-6">
        {["7 étapes guidées", "100% en ligne", "Réponse en 5 jours ouvrables"].map((t) => (
          <div key={t} className="flex items-center gap-1.5 text-xs text-black/35">
            <svg className="w-3.5 h-3.5 text-rouge/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 1 — IDENTIFICATION
// ─────────────────────────────────────────────────────────

const TYPE_OPTIONS: { value: Exclude<TypeDemande,"">; label: string; desc: string }[] = [
  { value: "nouvelle_inscription", label: "Nouvelle inscription",   desc: "Mon enfant n'a jamais été à Montagne Rouge." },
  { value: "demande_information",  label: "Demande d'information",  desc: "Je souhaite en savoir plus avant de m'engager." },
  { value: "transfert",            label: "Transfert d'école",      desc: "Mon enfant vient d'un autre établissement." },
];

const CLASSES = [
  "Petite Section (PS)","Moyenne Section (MS)","Grande Section (GS)",
  "CP","CE1","CE2","CM1","CM2",
  "6ème","5ème","4ème","3ème",
  "2nde","1ère","Terminale",
];

function Step1({ d, u, onNext, onBack }: {
  d: EnrollmentData;
  u: (p: Partial<EnrollmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const ok = d.typeDemande && d.classeDemandee && d.ageEnfant && d.anneeScolaire;

  return (
    <div>
      <BackBtn onClick={onBack} />
      <SectionHeader
        eyebrow="Étape 1 — Identification"
        title="Type de demande"
        subtitle="Dites-nous ce que vous recherchez pour que nous puissions adapter votre dossier."
      />

      {/* Type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {TYPE_OPTIONS.map((opt) => {
          const sel = d.typeDemande === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => u({ typeDemande: opt.value })}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                sel
                  ? "border-rouge bg-[rgba(196,30,58,0.04)]"
                  : "border-black/8 hover:border-black/18 hover:-translate-y-0.5"
              }`}
            >
              {sel && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-rouge flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              <p className="font-semibold text-black text-[14px] mb-1">{opt.label}</p>
              <p className="text-[12px] text-black/40 leading-snug">{opt.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Other fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <Field label="Classe demandée" required>
          <select value={d.classeDemandee} onChange={(e) => u({ classeDemandee: e.target.value })} className={selectCls}>
            <option value="">Sélectionner</option>
            {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Âge de l'enfant" required>
          <input
            type="number" min="3" max="20"
            value={d.ageEnfant}
            onChange={(e) => u({ ageEnfant: e.target.value })}
            placeholder="Ex: 10"
            className={inputCls}
          />
        </Field>
        <Field label="Année scolaire" required>
          <select value={d.anneeScolaire} onChange={(e) => u({ anneeScolaire: e.target.value })} className={selectCls}>
            <option value="">Sélectionner</option>
            <option value="2025-2026">2025 – 2026</option>
            <option value="2026-2027">2026 – 2027</option>
          </select>
        </Field>
      </div>

      <Btn onClick={onNext} disabled={!ok}>Continuer <Arrow /></Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 2 — ÉLÈVE
// ─────────────────────────────────────────────────────────

function Step2({ d, u, onNext, onBack }: {
  d: EnrollmentData;
  u: (p: Partial<EnrollmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const ok = d.prenomEleve && d.nomEleve && d.dateNaissance && d.sexe;

  return (
    <div>
      <BackBtn onClick={onBack} />
      <SectionHeader
        eyebrow="Étape 2 — Informations Élève"
        title="Parlez-nous de votre enfant"
        subtitle="Ces informations constitueront le dossier officiel d'inscription."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <Field label="Prénom" required>
          <input type="text" value={d.prenomEleve} onChange={(e) => u({ prenomEleve: e.target.value })} placeholder="Prénom de l'élève" className={inputCls} autoComplete="given-name" autoFocus />
        </Field>
        <Field label="Nom de famille" required>
          <input type="text" value={d.nomEleve} onChange={(e) => u({ nomEleve: e.target.value })} placeholder="Nom de famille" className={inputCls} autoComplete="family-name" />
        </Field>
        <Field label="Date de naissance" required>
          <input type="date" value={d.dateNaissance} onChange={(e) => u({ dateNaissance: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Nationalité">
          <input type="text" value={d.nationalite} onChange={(e) => u({ nationalite: e.target.value })} placeholder="Ex: Sénégalaise" className={inputCls} />
        </Field>
        <Field label="École actuelle">
          <input type="text" value={d.ecoleActuelle} onChange={(e) => u({ ecoleActuelle: e.target.value })} placeholder="Nom de l'école actuelle" className={inputCls} />
        </Field>
      </div>

      {/* Sexe */}
      <div className="mb-6">
        <Field label="Sexe" required>
          <div className="flex gap-3 mt-1">
            {(["masculin", "feminin"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => u({ sexe: s })}
                className={`flex-1 py-3 px-5 rounded-xl border-2 text-[13px] font-semibold transition-all duration-200 ${
                  d.sexe === s
                    ? "border-rouge text-rouge bg-[rgba(196,30,58,0.04)]"
                    : "border-black/8 text-black/40 hover:border-black/20"
                }`}
              >
                {s === "masculin" ? "Masculin" : "Féminin"}
              </button>
            ))}
          </div>
        </Field>
      </div>

      {/* Photo */}
      <div className="mb-10">
        <Field label="Photo de l'élève (optionnel)">
          <label className="mt-1 flex items-center gap-4 p-4 border border-dashed border-black/15 rounded-xl cursor-pointer hover:border-rouge/40 hover:bg-rouge/[0.02] transition-all group">
            <div className="w-10 h-10 rounded-xl bg-black/4 flex items-center justify-center shrink-0 group-hover:bg-rouge/8 transition-colors">
              <svg className="w-5 h-5 text-black/25 group-hover:text-rouge/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-medium text-black/60">
                {d.photoEleve ? d.photoEleve.name : "Choisir une photo"}
              </p>
              <p className="text-[11px] text-black/30 mt-0.5">JPG, PNG — max 5 Mo</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => u({ photoEleve: e.target.files?.[0] ?? null })} />
          </label>
        </Field>
      </div>

      <Btn onClick={onNext} disabled={!ok}>Continuer <Arrow /></Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 3 — PARENTS
// ─────────────────────────────────────────────────────────

function Step3({ d, u, onNext, onBack }: {
  d: EnrollmentData;
  u: (p: Partial<EnrollmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const ok = d.emailPrincipal && d.whatsapp;

  return (
    <div>
      <BackBtn onClick={onBack} />
      <SectionHeader
        eyebrow="Étape 3 — Informations Parents"
        title="Coordonnées des parents"
        subtitle="Ces informations nous permettront de vous contacter pour la suite du dossier."
      />

      {/* Père */}
      <div className="mb-6">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-black/25 mb-4">Père / Tuteur</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Nom complet">
            <input type="text" value={d.nomPere} onChange={(e) => u({ nomPere: e.target.value })} placeholder="Nom du père" className={inputCls} />
          </Field>
          <Field label="Téléphone">
            <input type="tel" value={d.telephonePere} onChange={(e) => u({ telephonePere: e.target.value })} placeholder="+221 77 000 00 00" className={inputCls} />
          </Field>
          <Field label="Profession">
            <input type="text" value={d.professionPere} onChange={(e) => u({ professionPere: e.target.value })} placeholder="Ex: Ingénieur" className={inputCls} />
          </Field>
        </div>
      </div>

      {/* Mère */}
      <div className="mb-6">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-black/25 mb-4">Mère / Tutrice</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Nom complet">
            <input type="text" value={d.nomMere} onChange={(e) => u({ nomMere: e.target.value })} placeholder="Nom de la mère" className={inputCls} />
          </Field>
          <Field label="Téléphone">
            <input type="tel" value={d.telephoneMere} onChange={(e) => u({ telephoneMere: e.target.value })} placeholder="+221 77 000 00 00" className={inputCls} />
          </Field>
          <Field label="Profession">
            <input type="text" value={d.professionMere} onChange={(e) => u({ professionMere: e.target.value })} placeholder="Ex: Médecin" className={inputCls} />
          </Field>
        </div>
      </div>

      {/* Contact principal */}
      <div className="mb-10">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-black/25 mb-4">Contact principal</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" required>
            <input type="email" value={d.emailPrincipal} onChange={(e) => u({ emailPrincipal: e.target.value })} placeholder="vous@exemple.com" className={inputCls} autoComplete="email" />
          </Field>
          <Field label="WhatsApp" required>
            <input type="tel" value={d.whatsapp} onChange={(e) => u({ whatsapp: e.target.value })} placeholder="+221 77 000 00 00" className={inputCls} />
          </Field>
        </div>
      </div>

      <Btn onClick={onNext} disabled={!ok}>Continuer <Arrow /></Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 4 — ADRESSE
// ─────────────────────────────────────────────────────────

function Step4({ d, u, onNext, onBack }: {
  d: EnrollmentData;
  u: (p: Partial<EnrollmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const ok = d.quartier && d.ville;

  return (
    <div>
      <BackBtn onClick={onBack} />
      <SectionHeader
        eyebrow="Étape 4 — Adresse"
        title="Où résidez-vous ?"
        subtitle="Votre adresse nous aide à évaluer l'accessibilité et les options de transport disponibles."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <Field label="Quartier" required>
          <input type="text" value={d.quartier} onChange={(e) => u({ quartier: e.target.value })} placeholder="Ex: Ouakam, Almadies…" className={inputCls} autoFocus />
        </Field>
        <Field label="Ville" required>
          <input type="text" value={d.ville} onChange={(e) => u({ ville: e.target.value })} placeholder="Ex: Dakar" className={inputCls} />
        </Field>
        <Field label="Pays">
          <input type="text" value={d.pays} onChange={(e) => u({ pays: e.target.value })} placeholder="Ex: Sénégal" className={inputCls} />
        </Field>
      </div>

      <Btn onClick={onNext} disabled={!ok}>Continuer <Arrow /></Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 5 — OPTIONS
// ─────────────────────────────────────────────────────────

const TAILLES = ["2 ans","3 ans","4 ans","6 ans","8 ans","10 ans","12 ans","14 ans","16 ans","Adulte S","Adulte M","Adulte L"];

const CANTINE_OPTS: { value: CantineOption; label: string }[] = [
  { value: "non",            label: "Non merci" },
  { value: "dejeuner",       label: "Déjeuner — 25 000 XOF/mois" },
  { value: "dejeuner_gouter", label: "Déjeuner + Goûter — 32 000 XOF/mois" },
];

function Step5({ d, u, onNext, onBack }: {
  d: EnrollmentData;
  u: (p: Partial<EnrollmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <BackBtn onClick={onBack} />
      <SectionHeader
        eyebrow="Étape 5 — Options École"
        title="Services complémentaires"
        subtitle="Sélectionnez les services souhaités. Ils seront inclus dans votre dossier et pourront être ajustés à la rentrée."
      />

      <div className="space-y-4 mb-10">

        {/* Cantine */}
        <div className="rounded-2xl border border-black/8 p-5">
          <p className="font-semibold text-black text-[14px] mb-0.5">Cantine scolaire</p>
          <p className="text-[12px] text-black/40 mb-4">Repas préparés sur place chaque jour scolaire.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            {CANTINE_OPTS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => u({ cantine: opt.value })}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-[12px] font-medium transition-all ${
                  d.cantine === opt.value
                    ? "border-rouge text-rouge bg-rouge/[0.05]"
                    : "border-black/8 text-black/50 hover:border-black/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Études dirigées */}
        <div className="rounded-2xl border border-black/8 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-black text-[14px] mb-0.5">Études dirigées</p>
            <p className="text-[12px] text-black/40">Encadrement après les cours (mercredis et/ou samedis).</p>
          </div>
          <Toggle on={d.etudesDirigees} onChange={(v) => u({ etudesDirigees: v })} />
        </div>

        {/* Transport */}
        <div className="rounded-2xl border border-black/8 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-black text-[14px] mb-0.5">Transport scolaire</p>
            <p className="text-[12px] text-black/40">Service de ramassage selon disponibilité dans votre quartier.</p>
          </div>
          <Toggle on={d.transport} onChange={(v) => u({ transport: v })} />
        </div>

        {/* Pack fournitures */}
        <div className="rounded-2xl border border-black/8 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-black text-[14px] mb-0.5">Pack fournitures scolaires</p>
            <p className="text-[12px] text-black/40">Fournitures adaptées au niveau, livrées à la rentrée.</p>
          </div>
          <Toggle on={d.packFournitures} onChange={(v) => u({ packFournitures: v })} />
        </div>

        {/* Tenue */}
        <div className="rounded-2xl border border-black/8 p-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="font-semibold text-black text-[14px] mb-0.5">Tenue scolaire</p>
              <p className="text-[12px] text-black/40">Commandez le pack complet ou indiquez uniquement la taille.</p>
            </div>
            <Toggle on={d.packCompletUniforme} onChange={(v) => u({ packCompletUniforme: v })} />
          </div>
          <Field label="Taille de l'enfant">
            <select value={d.tailleUniforme} onChange={(e) => u({ tailleUniforme: e.target.value })} className={selectCls}>
              <option value="">Sélectionner une taille</option>
              {TAILLES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

      </div>

      <Btn onClick={onNext}>Continuer <Arrow /></Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 6 — DOCUMENTS
// ─────────────────────────────────────────────────────────

function FileZone({ docKey, label, required, accept, file, onUpload }: {
  docKey: string; label: string; required: boolean; accept: string;
  file: File | null;
  onUpload: (key: string, f: File | null) => void;
}) {
  const ok = !!file;
  return (
    <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all group ${
      ok ? "border-green-400/60 bg-green-50/40" : "border-black/10 hover:border-rouge/40 hover:bg-rouge/[0.02]"
    }`}>

      {/* Status icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
        ok ? "bg-green-100" : "bg-black/4 group-hover:bg-rouge/8"
      }`}>
        {ok ? (
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-black/25 group-hover:text-rouge/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className={`text-[13px] font-semibold truncate ${ok ? "text-green-700" : "text-black/70"}`}>
            {label}
          </p>
          {required && !ok && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-rouge/60 border border-rouge/20 px-1.5 py-0.5 rounded-full shrink-0">Requis</span>
          )}
          {ok && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-green-600 border border-green-300 px-1.5 py-0.5 rounded-full shrink-0">Déposé</span>
          )}
        </div>
        <p className="text-[11px] text-black/35 truncate">
          {ok ? `${file!.name} · ${(file!.size / 1024).toFixed(0)} Ko` : "Cliquer ou glisser-déposer — PDF ou image"}
        </p>
      </div>

      {/* Remove */}
      {ok && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onUpload(docKey, null); }}
          className="w-7 h-7 rounded-full bg-black/6 flex items-center justify-center shrink-0 hover:bg-red-100 hover:text-red-500 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <input type="file" accept={accept} className="hidden" onChange={(e) => onUpload(docKey, e.target.files?.[0] ?? null)} />
    </label>
  );
}

function Step6({ d, u, onNext, onBack }: {
  d: EnrollmentData;
  u: (p: Partial<EnrollmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const handleUpload = (key: string, file: File | null) =>
    u({ documents: { ...d.documents, [key]: file } });

  const uploadedCount = DOCS.filter((doc) => !!d.documents[doc.key]).length;
  const allRequired   = DOCS.filter((doc) => doc.required).every((doc) => !!d.documents[doc.key]);

  return (
    <div>
      <BackBtn onClick={onBack} />
      <SectionHeader
        eyebrow="Étape 6 — Documents"
        title="Pièces justificatives"
        subtitle="Déposez les documents requis. Les éléments marqués « Requis » sont obligatoires pour valider le dossier."
      />

      <div className="inline-flex items-center gap-2 bg-black/4 rounded-full px-4 py-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-rouge/60 shrink-0" />
        <span className="text-[12px] font-medium text-black/50">
          {uploadedCount} / {DOCS.length} documents déposés
        </span>
      </div>

      <div className="space-y-3 mb-10">
        {DOCS.map((doc) => (
          <FileZone
            key={doc.key}
            docKey={doc.key}
            label={doc.label}
            required={doc.required}
            accept={doc.accept}
            file={d.documents[doc.key] ?? null}
            onUpload={handleUpload}
          />
        ))}
      </div>

      <Btn onClick={onNext} disabled={!allRequired}>
        Voir le récapitulatif <Arrow />
      </Btn>
      {!allRequired && (
        <p className="mt-3 text-[11px] text-black/30">
          Déposez les documents marqués « Requis » pour continuer.
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// STEP 7 — RÉCAPITULATIF
// ─────────────────────────────────────────────────────────

const TYPE_LBL: Record<string, string> = {
  nouvelle_inscription: "Nouvelle inscription",
  demande_information:  "Demande d'information",
  transfert:            "Transfert d'école",
};
const CANTINE_LBL: Record<string, string> = {
  non:              "Non",
  dejeuner:         "Déjeuner (25 000 XOF/mois)",
  dejeuner_gouter:  "Déjeuner + Goûter (32 000 XOF/mois)",
};

function RecapBlock({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <div className="mb-3 rounded-2xl border border-black/8 overflow-hidden">
      <div className="bg-black/[0.025] px-5 py-3 border-b border-black/5">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black/40">{title}</p>
      </div>
      {rows.map(({ label, value }, i) => (
        <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i < rows.length - 1 ? "border-b border-black/[0.04]" : ""}`}>
          <span className="text-[12px] text-black/40 font-medium shrink-0 mr-4">{label}</span>
          <span className="text-[13px] font-semibold text-black text-right">{value || "—"}</span>
        </div>
      ))}
    </div>
  );
}

function Step7({ d, onSubmit, onBack }: {
  d: EnrollmentData;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <BackBtn onClick={onBack} />
      <SectionHeader
        eyebrow="Étape 7 — Récapitulatif"
        title="Vérifiez votre dossier"
        subtitle="Relisez les informations avant d'envoyer votre demande. Vous pouvez revenir en arrière pour corriger."
      />

      <RecapBlock title="Identification" rows={[
        { label: "Type de demande",  value: TYPE_LBL[d.typeDemande] ?? "" },
        { label: "Classe demandée",  value: d.classeDemandee },
        { label: "Âge de l'enfant", value: d.ageEnfant ? `${d.ageEnfant} ans` : "" },
        { label: "Année scolaire",   value: d.anneeScolaire },
      ]} />

      <RecapBlock title="Élève" rows={[
        { label: "Prénom",           value: d.prenomEleve },
        { label: "Nom",              value: d.nomEleve },
        { label: "Date naissance",   value: d.dateNaissance },
        { label: "Sexe",             value: d.sexe === "masculin" ? "Masculin" : d.sexe === "feminin" ? "Féminin" : "" },
        { label: "Nationalité",      value: d.nationalite },
        { label: "École actuelle",   value: d.ecoleActuelle },
      ]} />

      <RecapBlock title="Parents" rows={[
        { label: "Père",      value: [d.nomPere, d.professionPere].filter(Boolean).join(" · ") },
        { label: "Tél. père", value: d.telephonePere },
        { label: "Mère",      value: [d.nomMere, d.professionMere].filter(Boolean).join(" · ") },
        { label: "Tél. mère", value: d.telephoneMere },
        { label: "Email",     value: d.emailPrincipal },
        { label: "WhatsApp",  value: d.whatsapp },
      ]} />

      <RecapBlock title="Adresse" rows={[
        { label: "Quartier", value: d.quartier },
        { label: "Ville",    value: d.ville },
        { label: "Pays",     value: d.pays },
      ]} />

      <RecapBlock title="Options" rows={[
        { label: "Cantine",          value: CANTINE_LBL[d.cantine] },
        { label: "Études dirigées",  value: d.etudesDirigees ? "Oui" : "Non" },
        { label: "Transport",        value: d.transport ? "Oui" : "Non" },
        { label: "Pack fournitures", value: d.packFournitures ? "Oui" : "Non" },
        { label: "Tenue scolaire",   value: d.tailleUniforme ? `Taille ${d.tailleUniforme}${d.packCompletUniforme ? " · pack complet" : ""}` : "Non" },
      ]} />

      {/* Documents status */}
      <div className="mb-6 rounded-2xl border border-black/8 overflow-hidden">
        <div className="bg-black/[0.025] px-5 py-3 border-b border-black/5">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black/40">Documents</p>
        </div>
        <div className="p-4 space-y-2.5">
          {DOCS.map((doc) => {
            const uploaded = !!d.documents[doc.key];
            return (
              <div key={doc.key} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${uploaded ? "bg-green-100" : "bg-black/5"}`}>
                  {uploaded ? (
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : <span className="w-1.5 h-1.5 rounded-full bg-black/20" />}
                </div>
                <span className={`text-[13px] font-medium flex-1 ${uploaded ? "text-black/70" : "text-black/30"}`}>{doc.label}</span>
                {!uploaded && doc.required && <span className="text-[10px] text-rouge/70 font-semibold">Manquant</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal note */}
      <div className="rounded-2xl p-5 mb-6 bg-[rgba(196,30,58,0.04)] border border-[rgba(196,30,58,0.10)]">
        <p className="text-[13px] text-black/55 leading-relaxed mb-1">
          En envoyant ce dossier, vous confirmez que les informations fournies sont exactes et complètes.
        </p>
        <p className="text-[12px] text-black/35">
          Notre équipe vous contactera dans les <strong className="text-black/50">5 jours ouvrables</strong> suivants.
        </p>
      </div>

      <Btn onClick={onSubmit}>
        Envoyer la demande d&apos;inscription <Arrow />
      </Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// CONFIRMATION
// ─────────────────────────────────────────────────────────

function Confirmation({ d }: { d: EnrollmentData }) {
  return (
    <div className="max-w-lg text-center mx-auto py-8">
      <div className="w-20 h-20 rounded-full bg-rouge/8 flex items-center justify-center mx-auto mb-8">
        <svg className="w-10 h-10 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      </div>

      <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-rouge/70 mb-4">Dossier envoyé</p>
      <h1
        className="font-display font-semibold tracking-tight text-black leading-tight mb-4"
        style={{ fontSize: "clamp(28px,4vw,44px)" }}
      >
        Demande reçue<br />avec succès
      </h1>
      <p className="text-black/50 text-[16px] leading-relaxed mb-3 max-w-sm mx-auto">
        Nous avons bien reçu la demande pour{" "}
        <strong className="text-black/70">{d.prenomEleve} {d.nomEleve}</strong>.
      </p>
      <p className="text-black/35 text-[14px] leading-relaxed mb-10 max-w-sm mx-auto">
        Notre équipe vous contactera sous{" "}
        <strong className="text-black/50">5 jours ouvrables</strong>{" "}
        à l&apos;adresse {d.emailPrincipal} ou via le numéro WhatsApp fourni.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`https://wa.me/221770000000?text=${encodeURIComponent(`Bonjour, je viens de soumettre une demande d'inscription pour ${d.prenomEleve} ${d.nomEleve}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full text-[13px] hover:opacity-90 active:scale-[0.97] transition-all"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Contacter via WhatsApp
        </a>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 border border-black/10 text-black/55 font-medium px-8 py-4 rounded-full text-[13px] hover:border-black/20 hover:text-black transition-all active:scale-[0.97]"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────

export default function MultiStepForm() {
  const [step, setStep] = useState(0); // 0=intro, 1-7=steps, 8=confirmation
  const [data, setData] = useState<EnrollmentData>(INITIAL);

  const u = useCallback(
    (patch: Partial<EnrollmentData>) => setData((d) => ({ ...d, ...patch })),
    []
  );
  const next = () => { setStep((s) => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const back = () => { setStep((s) => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const screens: Record<number, React.ReactNode> = {
    0: <StepIntro onNext={next} />,
    1: <Step1 d={data} u={u} onNext={next} onBack={back} />,
    2: <Step2 d={data} u={u} onNext={next} onBack={back} />,
    3: <Step3 d={data} u={u} onNext={next} onBack={back} />,
    4: <Step4 d={data} u={u} onNext={next} onBack={back} />,
    5: <Step5 d={data} u={u} onNext={next} onBack={back} />,
    6: <Step6 d={data} u={u} onNext={next} onBack={back} />,
    7: <Step7 d={data} onSubmit={next} onBack={back} />,
    8: <Confirmation d={data} />,
  };

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar step={step} />
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-12 pb-28">
        <div key={step} className="step-animate">
          {screens[step]}
        </div>
      </div>
    </div>
  );
}
