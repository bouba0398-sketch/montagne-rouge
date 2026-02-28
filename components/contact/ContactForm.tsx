"use client";

import { useState, useRef } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status,  setStatus]  = useState<Status>("idle");
  const [errMsg,  setErrMsg]  = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");

    const fd   = new FormData(e.currentTarget);
    const body = {
      nom:     fd.get("nom")     as string,
      email:   fd.get("email")   as string,
      message: fd.get("message") as string,
    };

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrMsg(data.error ?? "Une erreur est survenue. Réessayez.");
        setStatus("error");
      } else {
        setStatus("sent");
        formRef.current?.reset();
      }
    } catch {
      setErrMsg("Impossible d'envoyer le message. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

  /* ── Success ── */
  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-black/8 bg-white p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-black text-[17px] mb-2">
          Message envoyé !
        </h3>
        <p className="text-black/50 text-[14px] leading-relaxed mb-6">
          Nous vous répondons sous 24 heures. En attendant, vous pouvez aussi nous écrire sur WhatsApp.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[13px] font-medium text-black/40 hover:text-black transition-colors underline underline-offset-2"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  /* ── Field base class ── */
  const field =
    "w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-[14px] text-black placeholder:text-black/30 outline-none transition-all duration-150 focus:border-black/25 focus:ring-2 focus:ring-black/6";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">

      {/* Nom */}
      <div>
        <label className="block text-[12px] font-semibold text-black/45 mb-1.5 tracking-wide">
          Nom complet <span className="text-rouge">*</span>
        </label>
        <input
          name="nom"
          type="text"
          required
          autoComplete="name"
          placeholder="Prénom Nom"
          className={field}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-[12px] font-semibold text-black/45 mb-1.5 tracking-wide">
          Email <span className="text-rouge">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@exemple.com"
          className={field}
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-[12px] font-semibold text-black/45 mb-1.5 tracking-wide">
          Message <span className="text-rouge">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Bonjour, je souhaite obtenir des informations sur…"
          className={`${field} resize-none`}
        />
      </div>

      {/* Error */}
      {status === "error" && errMsg && (
        <p className="text-[13px] text-red-500 font-medium flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-rouge text-white font-semibold py-4 rounded-2xl text-[14px] transition-all duration-200 hover:bg-rouge-dark active:scale-[0.98] disabled:opacity-55 flex items-center justify-center gap-2"
      >
        {status === "sending" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            Envoi en cours…
          </>
        ) : (
          "Envoyer le message"
        )}
      </button>

      <p className="text-center text-[11px] text-black/25">
        Réponse sous 24 h · Aucune donnée partagée
      </p>
    </form>
  );
}
