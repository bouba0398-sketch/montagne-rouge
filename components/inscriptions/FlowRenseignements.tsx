"use client";

import { useState, useEffect } from "react";
import FlowShell from "./FlowShell";
import { Field, Input, Textarea, ChipGroup, StepHeading, SuccessScreen } from "./FlowPrimitives";

const STORAGE_KEY = "mr_flow_renseignements";

const SUJETS  = ["Frais de scolarité", "Niveaux & classes", "Visite de l'école", "Programme pédagogique", "Calendrier", "Autre"];
const NIVEAUX = ["Maternelle", "Élémentaire", "Collège", "Lycée", "Je ne sais pas encore"];

interface FormData {
  sujets:    string[];
  niveau:    string;
  nom:       string;
  telephone: string;
  email:     string;
  message:   string;
}

const INITIAL: FormData = { sujets: [], niveau: "", nom: "", telephone: "", message: "", email: "" };

const STEPS = [
  { label: "Sujet" },
  { label: "Coordonnées" },
  { label: "Message" },
];

type Errors = Partial<Record<keyof FormData, string>>;

export default function FlowRenseignements() {
  const [step,       setStep]       = useState(0);
  const [form,       setForm]       = useState<FormData>(INITIAL);
  const [errors,     setErrors]     = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);

  /* Restore from localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setForm(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  /* Autosave */
  useEffect(() => {
    if (!done) localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form, done]);

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => { const n = { ...p }; delete n[key]; return n; });
  }

  function validateStep(): boolean {
    const e: Errors = {};
    if (step === 0) {
      if (!form.sujets.length) e.sujets = "Choisissez au moins un sujet.";
    }
    if (step === 1) {
      if (!form.nom.trim())       e.nom       = "Nom requis.";
      if (!form.telephone.trim()) e.telephone = "Téléphone requis.";
    }
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function handleNext() {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) { setStep((s) => s + 1); return; }
    // Last step — submit
    setSubmitting(true);
    try {
      await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "renseignements", ...form }),
      });
      localStorage.removeItem(STORAGE_KEY);
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  const canProceed =
    step === 0 ? form.sujets.length > 0 :
    step === 1 ? !!form.nom.trim() && !!form.telephone.trim() :
    true;

  if (done) {
    return (
      <main className="pt-16 lg:pt-20 min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-md w-full">
          <SuccessScreen
            title="Demande envoyée"
            message={`Merci ${form.nom.split(" ")[0] || ""}. Notre équipe vous répond sous 24 heures — en attendant, n'hésitez pas à nous contacter sur WhatsApp.`}
            nextSteps={[
              "Notre équipe vous contacte sous 24 h",
              "Nous répondons à toutes vos questions",
              "Nous planifions une visite si vous le souhaitez",
            ]}
          />
        </div>
      </main>
    );
  }

  return (
    <FlowShell
      title="Demande de renseignements"
      subtitle="Posez vos questions — notre équipe vous répond sous 24 h."
      estimatedMinutes={2}
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
          <StepHeading>Quel est votre sujet ?</StepHeading>
          <Field label="Je m'intéresse à…" required error={errors.sujets}>
            <div className="mt-1"><ChipGroup options={SUJETS} value={form.sujets} onChange={(v) => set("sujets", v as string[])} multi /></div>
          </Field>
          <Field label="Niveau concerné">
            <div className="mt-1"><ChipGroup options={NIVEAUX} value={form.niveau} onChange={(v) => set("niveau", v as string)} /></div>
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <StepHeading>Vos coordonnées</StepHeading>
          <Field label="Nom complet" required error={errors.nom}>
            <Input type="text" placeholder="Prénom Nom" value={form.nom} error={errors.nom}
              onChange={(e) => set("nom", e.target.value)} autoComplete="name" />
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

      {step === 2 && (
        <div className="space-y-5">
          <StepHeading>Votre message</StepHeading>
          <p className="text-sm text-black/45 -mt-3">Décrivez votre situation ou posez vos questions. (Optionnel)</p>
          <Textarea rows={5} placeholder="Bonjour, je souhaite…" value={form.message}
            onChange={(e) => set("message", e.target.value)} />
          {/* Recap */}
          <div className="rounded-2xl bg-black/[0.03] p-5 text-sm space-y-1.5">
            <p className="font-semibold text-black mb-2">Récapitulatif</p>
            <p className="text-black/55"><span className="font-medium text-black">Sujets :</span> {form.sujets.join(", ")}</p>
            {form.niveau && <p className="text-black/55"><span className="font-medium text-black">Niveau :</span> {form.niveau}</p>}
            <p className="text-black/55"><span className="font-medium text-black">Contact :</span> {form.nom} · {form.telephone}</p>
          </div>
        </div>
      )}
    </FlowShell>
  );
}
