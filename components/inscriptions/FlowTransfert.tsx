"use client";

import { useState, useEffect } from "react";
import FlowShell from "./FlowShell";
import { Field, Input, Textarea, ChipGroup, StepHeading, SuccessScreen } from "./FlowPrimitives";

const STORAGE_KEY = "mr_flow_transfert";

const NIVEAUX = ["Maternelle", "Élémentaire", "Collège", "Lycée"];

interface FormData {
  niveau:          string;
  dateArrivee:     string;
  nomEcole:        string;
  villeEcole:      string;
  motif:           string;
  nomParent:       string;
  telephone:       string;
  email:           string;
  docsConfirmed:   boolean;
}

const INITIAL: FormData = {
  niveau: "", dateArrivee: "", nomEcole: "", villeEcole: "", motif: "",
  nomParent: "", telephone: "", email: "", docsConfirmed: false,
};

const STEPS = [
  { label: "Niveau" },
  { label: "École actuelle" },
  { label: "Coordonnées" },
  { label: "Validation" },
];

type Errors = Partial<Record<keyof FormData, string>>;

const DOCS_TRANSFERT = [
  "Certificat de radiation de l'établissement actuel",
  "Bulletins des 2 dernières années",
  "Acte de naissance",
  "2 photos d'identité (4×4, fond blanc)",
  "Copie CNI parent ou tuteur",
];

export default function FlowTransfert() {
  const [step,       setStep]       = useState(0);
  const [form,       setForm]       = useState<FormData>(INITIAL);
  const [errors,     setErrors]     = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) setForm(JSON.parse(s)); } catch { /**/ }
  }, []);
  useEffect(() => { if (!done) localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); }, [form, done]);

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  }

  function validateStep(): boolean {
    const e: Errors = {};
    if (step === 0) { if (!form.niveau) e.niveau = "Choisissez un niveau."; }
    if (step === 1) { if (!form.nomEcole.trim()) e.nomEcole = "Nom de l'école requis."; }
    if (step === 2) {
      if (!form.nomParent.trim())  e.nomParent  = "Nom requis.";
      if (!form.telephone.trim())  e.telephone  = "Téléphone requis.";
    }
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function handleNext() {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) { setStep((s) => s + 1); return; }
    setSubmitting(true);
    try {
      await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "transfert", ...form }),
      });
      localStorage.removeItem(STORAGE_KEY);
      setDone(true);
    } finally { setSubmitting(false); }
  }

  const canProceed =
    step === 0 ? !!form.niveau :
    step === 1 ? !!form.nomEcole.trim() :
    step === 2 ? !!form.nomParent.trim() && !!form.telephone.trim() :
    form.docsConfirmed;

  if (done) {
    return (
      <main className="pt-16 lg:pt-20 min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-md w-full">
          <SuccessScreen
            title="Demande de transfert reçue"
            message={`Merci ${form.nomParent.split(" ")[0] || ""}. Notre équipe étudie votre demande et vous contactera rapidement.`}
            nextSteps={[
              "Vérification de la disponibilité de la place",
              "Contact de notre équipe sous 48 h",
              "Visite et remise des documents",
              "Décision communiquée sous 5 jours ouvrés",
            ]}
          />
        </div>
      </main>
    );
  }

  return (
    <FlowShell
      title="Transfert en cours d'année"
      subtitle="Pour un élève qui arrive depuis un autre établissement."
      estimatedMinutes={6}
      steps={STEPS}
      currentStep={step}
      canProceed={canProceed}
      isLastStep={step === STEPS.length - 1}
      isSubmitting={submitting}
      onBack={() => setStep((s) => s - 1)}
      onNext={handleNext}
    >
      {step === 0 && (
        <div className="space-y-7">
          <StepHeading>Niveau & date souhaitée</StepHeading>
          <Field label="Niveau souhaité" required error={errors.niveau}>
            <div className="mt-1"><ChipGroup options={NIVEAUX} value={form.niveau} onChange={(v) => set("niveau", v as string)} /></div>
          </Field>
          <Field label="Date d'arrivée souhaitée (optionnel)">
            <Input type="date" value={form.dateArrivee} onChange={(e) => set("dateArrivee", e.target.value)} />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <StepHeading>École actuelle</StepHeading>
          <Field label="Nom de l'école" required error={errors.nomEcole}>
            <Input type="text" placeholder="Ex. Groupe Scolaire XYZ" value={form.nomEcole} error={errors.nomEcole}
              onChange={(e) => set("nomEcole", e.target.value)} />
          </Field>
          <Field label="Ville">
            <Input type="text" placeholder="Dakar, Thiès…" value={form.villeEcole}
              onChange={(e) => set("villeEcole", e.target.value)} />
          </Field>
          <Field label="Motif du transfert (optionnel)">
            <Textarea rows={3} placeholder="Déménagement, raisons pédagogiques…" value={form.motif}
              onChange={(e) => set("motif", e.target.value)} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <StepHeading>Coordonnées parent / tuteur</StepHeading>
          <Field label="Nom complet" required error={errors.nomParent}>
            <Input type="text" placeholder="Prénom Nom" value={form.nomParent} error={errors.nomParent}
              onChange={(e) => set("nomParent", e.target.value)} autoComplete="name" />
          </Field>
          <Field label="Téléphone" required error={errors.telephone}>
            <Input type="tel" placeholder="+221 77 000 00 00" value={form.telephone} error={errors.telephone}
              onChange={(e) => set("telephone", e.target.value)} autoComplete="tel" />
          </Field>
          <Field label="Email (optionnel)">
            <Input type="email" placeholder="vous@exemple.com" value={form.email}
              onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <StepHeading>Documents & validation</StepHeading>

          <div className="rounded-2xl bg-black/[0.03] p-5 space-y-2 text-sm mb-2">
            <p className="font-semibold text-black mb-3">Récapitulatif</p>
            <p className="text-black/55"><span className="font-medium text-black">Niveau :</span> {form.niveau}</p>
            <p className="text-black/55"><span className="font-medium text-black">École actuelle :</span> {form.nomEcole}{form.villeEcole ? ` · ${form.villeEcole}` : ""}</p>
            <p className="text-black/55"><span className="font-medium text-black">Contact :</span> {form.nomParent} · {form.telephone}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-3">Documents à remettre</p>
            <ul className="space-y-2.5">
              {DOCS_TRANSFERT.map((doc, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-black/60">
                  <span className="w-4 h-4 rounded-full bg-rouge/10 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.docsConfirmed}
              onChange={(e) => set("docsConfirmed", e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-black/20 accent-rouge cursor-pointer"
            />
            <span className="text-sm text-black/60 leading-relaxed group-hover:text-black/70 transition-colors">
              Je confirme avoir pris note des documents nécessaires et accepte d&apos;être contacté par Montagne Rouge.
            </span>
          </label>
        </div>
      )}
    </FlowShell>
  );
}
