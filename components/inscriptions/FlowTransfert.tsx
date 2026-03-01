"use client";

import { useState, useEffect } from "react";
import FlowShell from "./FlowShell";
import { Field, Input, Textarea, ChipGroup, StepHeading, SuccessScreen } from "./FlowPrimitives";
import FileUploadStep, { type SelectedFile } from "./FileUploadStep";

const STORAGE_KEY = "mr_flow_transfert";

const NIVEAUX = ["Maternelle", "Élémentaire", "Collège", "Lycée"];

interface FormData {
  niveau:      string;
  dateArrivee: string;
  nomEcole:    string;
  villeEcole:  string;
  motif:       string;
  nomParent:   string;
  telephone:   string;
  email:       string;
}

const INITIAL: FormData = {
  niveau: "", dateArrivee: "", nomEcole: "", villeEcole: "", motif: "",
  nomParent: "", telephone: "", email: "",
};

const STEPS = [
  { label: "Niveau" },
  { label: "École actuelle" },
  { label: "Coordonnées" },
  { label: "Documents" },
  { label: "Validation" },
];

type Errors = Partial<Record<keyof FormData, string>>;

export default function FlowTransfert() {
  const [step,        setStep]        = useState(0);
  const [form,        setForm]        = useState<FormData>(INITIAL);
  const [files,       setFiles]       = useState<SelectedFile[]>([]);
  const [errors,      setErrors]      = useState<Errors>({});
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done,        setDone]        = useState(false);

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
    if (step === 0) { if (!form.niveau)           e.niveau    = "Choisissez un niveau."; }
    if (step === 1) { if (!form.nomEcole.trim())   e.nomEcole  = "Nom de l'école requis."; }
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

    const hasFileErrors = files.some((f) => f.error);
    if (hasFileErrors) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      fd.append("hp",                  "");
      fd.append("type_demande",        "transfert");
      fd.append("niveau",              form.niveau);
      fd.append("date_arrivee",        form.dateArrivee);
      fd.append("nom_ecole_origine",   form.nomEcole);
      fd.append("ville_ecole_origine", form.villeEcole);
      fd.append("motif_transfert",     form.motif);
      fd.append("parent_nom",          form.nomParent);
      fd.append("parent_telephone",    form.telephone);
      fd.append("parent_email",        form.email);
      files.filter((f) => !f.error).forEach((f) => fd.append("files", f.file));

      const res  = await fetch("/api/inscription", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Erreur serveur.");

      localStorage.removeItem(STORAGE_KEY);
      setDone(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur réseau. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  const hasFileErrors = files.some((f) => f.error);

  const canProceed =
    step === 0 ? !!form.niveau :
    step === 1 ? !!form.nomEcole.trim() :
    step === 2 ? !!form.nomParent.trim() && !!form.telephone.trim() :
    step === 3 ? !hasFileErrors :
    !hasFileErrors;

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
          <StepHeading>Niveau &amp; date souhaitée</StepHeading>
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
        <div className="space-y-2">
          <StepHeading>Documents justificatifs</StepHeading>
          <FileUploadStep files={files} onChange={setFiles} />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <StepHeading>Validation du dossier</StepHeading>

          <div className="rounded-2xl bg-black/[0.03] p-5 space-y-2 text-sm">
            <p className="font-semibold text-black mb-3">Récapitulatif</p>
            <p className="text-black/55"><span className="font-medium text-black">Niveau :</span> {form.niveau}</p>
            <p className="text-black/55"><span className="font-medium text-black">École actuelle :</span> {form.nomEcole}{form.villeEcole ? ` · ${form.villeEcole}` : ""}</p>
            <p className="text-black/55"><span className="font-medium text-black">Contact :</span> {form.nomParent} · {form.telephone}</p>
            {files.filter((f) => !f.error).length > 0 && (
              <p className="text-black/55">
                <span className="font-medium text-black">Documents :</span>{" "}
                {files.filter((f) => !f.error).length} fichier{files.filter((f) => !f.error).length > 1 ? "s" : ""} joint{files.filter((f) => !f.error).length > 1 ? "s" : ""}
              </p>
            )}
          </div>

          {submitError && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-600 font-medium">{submitError}</p>
            </div>
          )}
        </div>
      )}
    </FlowShell>
  );
}
