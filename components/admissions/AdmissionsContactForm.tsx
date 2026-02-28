"use client";

import { useState } from "react";

interface FormData {
  nomParent: string;
  telephone: string;
  niveau:    string;
  message:   string;
}

interface FormErrors {
  nomParent?: string;
  telephone?: string;
  niveau?:    string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

const NIVEAUX = ["Maternelle", "Élémentaire", "Collège", "Lycée"];

function validate(f: FormData): FormErrors {
  const e: FormErrors = {};
  if (!f.nomParent.trim())
    e.nomParent = "Nom complet requis.";
  if (!f.telephone.trim())
    e.telephone = "Numéro de téléphone requis.";
  else if (!/^[+\d\s()\-]{7,}$/.test(f.telephone))
    e.telephone = "Format invalide (ex. +221 77 000 00 00).";
  if (!f.niveau)
    e.niveau = "Veuillez sélectionner un niveau.";
  return e;
}

export default function AdmissionsContactForm() {
  const [form, setForm] = useState<FormData>({
    nomParent: "",
    telephone: "",
    niveau:    "",
    message:   "",
  });
  const [errors, setErrors]           = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error on change
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field as keyof FormErrors]; return next; });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitState("loading");
    try {
      const res = await fetch("/api/admissions", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      setSubmitState(res.ok ? "success" : "error");
    } catch {
      setSubmitState("error");
    }
  }

  /* ── Success state ── */
  if (submitState === "success") {
    return (
      <div className="rounded-3xl border border-black/8 bg-white p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-rouge/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-black text-[17px] mb-2">Demande reçue</h3>
        <p className="text-sm text-black/45 leading-relaxed max-w-xs mx-auto">
          Merci {form.nomParent.split(" ")[0]}. Notre équipe vous contactera sous 24 h
          au {form.telephone}.
        </p>
      </div>
    );
  }

  /* ── Field helper ── */
  const fieldClass = (err?: string) =>
    `w-full rounded-2xl border px-5 py-3.5 text-sm text-black placeholder:text-black/30 outline-none transition-all duration-150 focus:ring-2 ${
      err
        ? "border-red-400 bg-red-50/40 focus:ring-red-200"
        : "border-black/10 bg-white focus:border-black/25 focus:ring-black/8"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-black/8 bg-white p-8 lg:p-10 space-y-5"
    >
      <h3 className="font-semibold text-black text-[17px] mb-1">
        Demande de renseignements
      </h3>
      <p className="text-sm text-black/40 !mt-1 !mb-6">
        Réponse garantie sous 24 heures ouvrées.
      </p>

      {/* Nom parent */}
      <div>
        <label className="block text-[12px] font-semibold text-black/50 mb-1.5 tracking-wide">
          Nom complet du parent <span className="text-rouge">*</span>
        </label>
        <input
          type="text"
          placeholder="Prénom Nom"
          value={form.nomParent}
          onChange={(e) => set("nomParent", e.target.value)}
          className={fieldClass(errors.nomParent)}
          autoComplete="name"
        />
        {errors.nomParent && (
          <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.nomParent}</p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label className="block text-[12px] font-semibold text-black/50 mb-1.5 tracking-wide">
          Téléphone <span className="text-rouge">*</span>
        </label>
        <input
          type="tel"
          placeholder="+221 77 000 00 00"
          value={form.telephone}
          onChange={(e) => set("telephone", e.target.value)}
          className={fieldClass(errors.telephone)}
          autoComplete="tel"
        />
        {errors.telephone && (
          <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.telephone}</p>
        )}
      </div>

      {/* Niveau */}
      <div>
        <label className="block text-[12px] font-semibold text-black/50 mb-1.5 tracking-wide">
          Niveau souhaité <span className="text-rouge">*</span>
        </label>
        <select
          value={form.niveau}
          onChange={(e) => set("niveau", e.target.value)}
          className={`${fieldClass(errors.niveau)} cursor-pointer`}
        >
          <option value="">Sélectionner un niveau</option>
          {NIVEAUX.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        {errors.niveau && (
          <p className="mt-1.5 text-[11px] text-red-500 font-medium">{errors.niveau}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-[12px] font-semibold text-black/50 mb-1.5 tracking-wide">
          Message <span className="text-black/25">(optionnel)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Votre question ou remarque…"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${fieldClass()} resize-none`}
        />
      </div>

      {/* Submit */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={submitState === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 bg-rouge text-white font-semibold px-8 py-4 rounded-full text-[13px] transition-all duration-200 hover:bg-rouge-dark hover:shadow-lg hover:shadow-rouge/25 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitState === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        {submitState === "error" && (
          <p className="mt-3 text-center text-sm text-red-500 font-medium">
            Une erreur s&apos;est produite. Réessayez ou contactez-nous sur WhatsApp.
          </p>
        )}
      </div>
    </form>
  );
}
