"use client";

import { useState, useEffect } from "react";
import FlowShell from "./FlowShell";
import { Field, Input, ChipGroup, StepHeading, SuccessScreen } from "./FlowPrimitives";
import FileUploadStep, { type SelectedFile } from "./FileUploadStep";

const STORAGE_KEY = "mr_flow_reinscription";

const CLASSES_ACTUELLES = ["PS", "MS", "GS", "CP", "CE1", "CE2", "CM1", "CM2",
  "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"];

interface FormData {
  prenomEleve:    string;
  nomEleve:       string;
  classeActuelle: string;
  telephone:      string;
  email:          string;
  changements:    string;
}

const INITIAL: FormData = {
  prenomEleve: "", nomEleve: "", classeActuelle: "",
  telephone: "", email: "", changements: "",
};

const STEPS = [
  { label: "Identification" },
  { label: "Mise à jour" },
  { label: "Documents" },
  { label: "Confirmation" },
];

type Errors = Partial<Record<keyof FormData, string>>;

export default function FlowReinscription() {
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
    if (step === 0) {
      if (!form.prenomEleve.trim())    e.prenomEleve    = "Prénom requis.";
      if (!form.nomEleve.trim())       e.nomEleve       = "Nom requis.";
      if (!form.classeActuelle)        e.classeActuelle = "Classe actuelle requise.";
    }
    if (step === 1) {
      if (!form.telephone.trim()) e.telephone = "Téléphone requis.";
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
      fd.append("hp",              "");
      fd.append("type_demande",    "reinscription");
      fd.append("eleve_prenom",    form.prenomEleve);
      fd.append("eleve_nom",       form.nomEleve);
      fd.append("classe_actuelle", form.classeActuelle);
      fd.append("parent_nom",      `${form.prenomEleve} ${form.nomEleve} (parent)`);
      fd.append("parent_telephone", form.telephone);
      fd.append("parent_email",    form.email);
      fd.append("changements",     form.changements);
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
    step === 0 ? !!form.prenomEleve.trim() && !!form.nomEleve.trim() && !!form.classeActuelle :
    step === 1 ? !!form.telephone.trim() :
    step === 2 ? !hasFileErrors :
    !hasFileErrors;

  if (done) {
    return (
      <main className="pt-16 lg:pt-20 min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-md w-full">
          <SuccessScreen
            title="Réinscription confirmée"
            message={`La réinscription de ${form.prenomEleve} a bien été reçue. Nous vous confirmons la suite sous peu.`}
            nextSteps={[
              "Réception de la confirmation par SMS",
              "Règlement des frais de réinscription",
              "Récupération du dossier rentrée",
            ]}
          />
        </div>
      </main>
    );
  }

  return (
    <FlowShell
      title="Réinscription"
      subtitle="Pour un élève déjà inscrit à Montagne Rouge. Rapide et simple."
      estimatedMinutes={4}
      steps={STEPS}
      currentStep={step}
      canProceed={canProceed}
      isLastStep={step === STEPS.length - 1}
      isSubmitting={submitting}
      onBack={() => setStep((s) => s - 1)}
      onNext={handleNext}
    >
      {step === 0 && (
        <div className="space-y-5">
          <StepHeading>Identification de l&apos;élève</StepHeading>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom" required error={errors.prenomEleve}>
              <Input type="text" placeholder="Prénom" value={form.prenomEleve} error={errors.prenomEleve}
                onChange={(e) => set("prenomEleve", e.target.value)} />
            </Field>
            <Field label="Nom" required error={errors.nomEleve}>
              <Input type="text" placeholder="Nom" value={form.nomEleve} error={errors.nomEleve}
                onChange={(e) => set("nomEleve", e.target.value)} />
            </Field>
          </div>
          <Field label="Classe actuelle" required error={errors.classeActuelle}>
            <div className="mt-1">
              <ChipGroup options={CLASSES_ACTUELLES} value={form.classeActuelle}
                onChange={(v) => set("classeActuelle", v as string)} />
            </div>
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <StepHeading>Mise à jour des informations</StepHeading>
          <p className="text-sm text-black/45 -mt-3">
            Mettez à jour vos coordonnées si elles ont changé depuis l&apos;an dernier.
          </p>
          <Field label="Téléphone" required error={errors.telephone}>
            <Input type="tel" placeholder="+221 77 000 00 00" value={form.telephone} error={errors.telephone}
              onChange={(e) => set("telephone", e.target.value)} autoComplete="tel" />
          </Field>
          <Field label="Email (optionnel)">
            <Input type="email" placeholder="vous@exemple.com" value={form.email}
              onChange={(e) => set("email", e.target.value)} autoComplete="email" />
          </Field>
          <Field label="Changements à signaler (optionnel)">
            <Input type="text" placeholder="Ex. nouveau domicile, changement de tuteur…"
              value={form.changements} onChange={(e) => set("changements", e.target.value)} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <StepHeading>Documents justificatifs</StepHeading>
          <FileUploadStep files={files} onChange={setFiles} />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <StepHeading>Confirmation</StepHeading>
          <div className="rounded-2xl bg-black/[0.03] p-5 space-y-2 text-sm">
            <p className="font-semibold text-black mb-3">Récapitulatif</p>
            <p className="text-black/55"><span className="font-medium text-black">Élève :</span> {form.prenomEleve} {form.nomEleve}</p>
            <p className="text-black/55"><span className="font-medium text-black">Classe :</span> {form.classeActuelle}</p>
            <p className="text-black/55"><span className="font-medium text-black">Téléphone :</span> {form.telephone}</p>
            {form.email && <p className="text-black/55"><span className="font-medium text-black">Email :</span> {form.email}</p>}
            {form.changements && <p className="text-black/55"><span className="font-medium text-black">Changements :</span> {form.changements}</p>}
            {files.filter((f) => !f.error).length > 0 && (
              <p className="text-black/55">
                <span className="font-medium text-black">Documents :</span>{" "}
                {files.filter((f) => !f.error).length} fichier{files.filter((f) => !f.error).length > 1 ? "s" : ""} joint{files.filter((f) => !f.error).length > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <p className="text-sm text-black/45 leading-relaxed">
            En soumettant ce formulaire, vous confirmez la réinscription de votre enfant pour l&apos;année 2025–2026.
            Notre équipe vous contactera pour finaliser.
          </p>
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
