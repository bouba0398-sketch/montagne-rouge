"use client";

import { useState, useEffect } from "react";
import FlowShell from "./FlowShell";
import { Field, Input, Select, ChipGroup, StepHeading, SuccessScreen } from "./FlowPrimitives";
import FileUploadStep, { type SelectedFile } from "./FileUploadStep";

const STORAGE_KEY = "mr_flow_nouvelle_inscription";

const NIVEAUX = ["Maternelle (PS·MS·GS)", "Élémentaire (CP→CM2)", "Collège (6e→3e)", "Lycée (2nde→Terminale)"];
const ANNEES  = ["2025–2026", "2026–2027"];
const SEXES   = ["Masculin", "Féminin"];

interface FormData {
  niveau:        string;
  annee:         string;
  prenomEleve:   string;
  nomEleve:      string;
  dateNaissance: string;
  sexe:          string;
  ecoleActuelle: string;
  nomParent:     string;
  lienParente:   string;
  telephone:     string;
  email:         string;
}

const INITIAL: FormData = {
  niveau: "", annee: "", prenomEleve: "", nomEleve: "", dateNaissance: "",
  sexe: "", ecoleActuelle: "", nomParent: "", lienParente: "", telephone: "", email: "",
};

const STEPS = [
  { label: "Niveau" },
  { label: "Élève" },
  { label: "Parent" },
  { label: "Documents" },
  { label: "Validation" },
];

type Errors = Partial<Record<keyof FormData, string>>;

export default function FlowNouvelleInscription() {
  const [step,       setStep]       = useState(0);
  const [form,       setForm]       = useState<FormData>(INITIAL);
  const [files,      setFiles]      = useState<SelectedFile[]>([]);
  const [errors,     setErrors]     = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    if (step === 0) {
      if (!form.niveau) e.niveau = "Choisissez un niveau.";
      if (!form.annee)  e.annee  = "Choisissez une année.";
    }
    if (step === 1) {
      if (!form.prenomEleve.trim()) e.prenomEleve   = "Prénom requis.";
      if (!form.nomEleve.trim())    e.nomEleve      = "Nom requis.";
      if (!form.dateNaissance)      e.dateNaissance = "Date de naissance requise.";
      if (!form.sexe)               e.sexe          = "Veuillez sélectionner.";
    }
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

    // Last step — submit
    const hasFileErrors = files.some((f) => f.error);
    if (hasFileErrors) return; // block if file errors present

    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      fd.append("hp",                   "");
      fd.append("type_demande",         "nouvelle_inscription");
      fd.append("niveau",               form.niveau);
      fd.append("annee",                form.annee);
      fd.append("eleve_prenom",         form.prenomEleve);
      fd.append("eleve_nom",            form.nomEleve);
      fd.append("eleve_date_naissance", form.dateNaissance);
      fd.append("eleve_sexe",           form.sexe);
      fd.append("eleve_ecole_actuelle", form.ecoleActuelle);
      fd.append("parent_nom",           form.nomParent);
      fd.append("parent_lien",          form.lienParente);
      fd.append("parent_telephone",     form.telephone);
      fd.append("parent_email",         form.email);
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
    step === 0 ? !!form.niveau && !!form.annee :
    step === 1 ? !!form.prenomEleve.trim() && !!form.nomEleve.trim() && !!form.dateNaissance && !!form.sexe :
    step === 2 ? !!form.nomParent.trim() && !!form.telephone.trim() :
    step === 3 ? !hasFileErrors :   // docs encouraged, not required; block on errors
    !hasFileErrors;                 // validation step

  if (done) {
    return (
      <main className="pt-16 lg:pt-20 min-h-screen bg-white flex items-center justify-center px-5">
        <div className="max-w-md w-full">
          <SuccessScreen
            title="Dossier reçu"
            message={`Le dossier de ${form.prenomEleve} a bien été enregistré. Notre équipe vous contactera sous 5 jours ouvrés.`}
            nextSteps={[
              "Confirmation de réception sous 24 h",
              "Visite de l'établissement (si souhaitée)",
              "Décision communiquée sous 5 jours ouvrés",
              "Signature du contrat et règlement des frais",
            ]}
          />
        </div>
      </main>
    );
  }

  return (
    <FlowShell
      title="Nouvelle inscription"
      subtitle="Pour un élève qui rejoint Montagne Rouge pour la première fois."
      estimatedMinutes={8}
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
          <StepHeading>Niveau &amp; année scolaire</StepHeading>
          <Field label="Niveau souhaité" required error={errors.niveau}>
            <div className="mt-1"><ChipGroup options={NIVEAUX} value={form.niveau} onChange={(v) => set("niveau", v as string)} /></div>
          </Field>
          <Field label="Année scolaire" required error={errors.annee}>
            <div className="mt-1"><ChipGroup options={ANNEES} value={form.annee} onChange={(v) => set("annee", v as string)} /></div>
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <StepHeading>Informations sur l&apos;élève</StepHeading>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom" required error={errors.prenomEleve}>
              <Input type="text" placeholder="Prénom" value={form.prenomEleve} error={errors.prenomEleve}
                onChange={(e) => set("prenomEleve", e.target.value)} />
            </Field>
            <Field label="Nom" required error={errors.nomEleve}>
              <Input type="text" placeholder="Nom de famille" value={form.nomEleve} error={errors.nomEleve}
                onChange={(e) => set("nomEleve", e.target.value)} />
            </Field>
          </div>
          <Field label="Date de naissance" required error={errors.dateNaissance}>
            <Input type="date" value={form.dateNaissance} error={errors.dateNaissance}
              onChange={(e) => set("dateNaissance", e.target.value)} />
          </Field>
          <Field label="Sexe" required error={errors.sexe}>
            <div className="mt-1"><ChipGroup options={SEXES} value={form.sexe} onChange={(v) => set("sexe", v as string)} /></div>
          </Field>
          <Field label="École actuelle (optionnel)">
            <Input type="text" placeholder="Nom de l'école" value={form.ecoleActuelle}
              onChange={(e) => set("ecoleActuelle", e.target.value)} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <StepHeading>Informations parent / tuteur</StepHeading>
          <Field label="Nom complet" required error={errors.nomParent}>
            <Input type="text" placeholder="Prénom Nom" value={form.nomParent} error={errors.nomParent}
              onChange={(e) => set("nomParent", e.target.value)} autoComplete="name" />
          </Field>
          <Field label="Lien de parenté">
            <Select value={form.lienParente} onChange={(e) => set("lienParente", e.target.value)}>
              <option value="">Sélectionner</option>
              <option>Père</option><option>Mère</option><option>Tuteur / Tutrice</option><option>Autre</option>
            </Select>
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
            <p className="text-black/55"><span className="font-medium text-black">Élève :</span> {form.prenomEleve} {form.nomEleve}</p>
            <p className="text-black/55"><span className="font-medium text-black">Niveau :</span> {form.niveau} · {form.annee}</p>
            <p className="text-black/55"><span className="font-medium text-black">Parent :</span> {form.nomParent}</p>
            <p className="text-black/55"><span className="font-medium text-black">Téléphone :</span> {form.telephone}</p>
            {files.filter((f) => !f.error).length > 0 && (
              <p className="text-black/55">
                <span className="font-medium text-black">Documents :</span>{" "}
                {files.filter((f) => !f.error).length} fichier{files.filter((f) => !f.error).length > 1 ? "s" : ""} joint{files.filter((f) => !f.error).length > 1 ? "s" : ""}
              </p>
            )}
          </div>

          <p className="text-sm text-black/45 leading-relaxed">
            En soumettant ce formulaire, vous autorisez Montagne Rouge à traiter ces informations dans le cadre de votre demande d&apos;inscription.
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
