"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: Connect to API route or email service
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start justify-center py-12">
        <div className="w-10 h-10 rounded-full bg-rouge/10 flex items-center justify-center mb-5">
          <svg className="w-5 h-5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-black text-lg mb-2">
          Message envoyé !
        </h3>
        <p className="text-black/50 text-sm">
          Nous vous répondrons dans les 24h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-black/50 mb-1.5">
            Prénom
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-black/12 text-sm text-black focus:outline-none focus:border-black/30 transition-colors bg-white placeholder:text-black/30"
            placeholder="Aminata"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-black/50 mb-1.5">
            Nom
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-black/12 text-sm text-black focus:outline-none focus:border-black/30 transition-colors bg-white placeholder:text-black/30"
            placeholder="Diallo"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-black/50 mb-1.5">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-black/12 text-sm text-black focus:outline-none focus:border-black/30 transition-colors bg-white placeholder:text-black/30"
          placeholder="aminata@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-black/50 mb-1.5">
          Téléphone (WhatsApp)
        </label>
        <input
          type="tel"
          className="w-full px-4 py-3 rounded-xl border border-black/12 text-sm text-black focus:outline-none focus:border-black/30 transition-colors bg-white placeholder:text-black/30"
          placeholder="+221 77 000 00 00"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-black/50 mb-1.5">
          Sujet
        </label>
        <select className="w-full px-4 py-3 rounded-xl border border-black/12 text-sm text-black/70 focus:outline-none focus:border-black/30 transition-colors bg-white">
          <option value="">Choisir un sujet</option>
          <option>Demande d&apos;admission</option>
          <option>Informations générales</option>
          <option>Frais de scolarité</option>
          <option>Cantine & services</option>
          <option>Autre</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-black/50 mb-1.5">
          Message
        </label>
        <textarea
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-black/12 text-sm text-black focus:outline-none focus:border-black/30 transition-colors bg-white placeholder:text-black/30 resize-none"
          placeholder="Votre message..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-rouge text-white font-semibold py-4 rounded-xl text-sm hover:bg-rouge-dark transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
