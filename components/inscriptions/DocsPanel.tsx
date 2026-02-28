"use client";

import { useState } from "react";

const docs = [
  "Photocopie de l'acte de naissance de l'élève",
  "Bulletins scolaires des deux dernières années",
  "Photos d'identité récentes (format 4×4, fond blanc)",
  "Photocopie de la pièce d'identité du parent ou tuteur",
  "Certificat de radiation si transfert depuis un autre établissement",
];

export default function DocsPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-14 max-w-2xl mx-auto">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-black/8 bg-white hover:border-black/14 transition-colors text-left group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          {/* File icon */}
          <svg className="w-4 h-4 text-rouge shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-semibold text-black">Documents généralement nécessaires</span>
        </span>
        <svg
          className="w-4 h-4 text-black/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "320px" : "0px", opacity: open ? 1 : 0 }}
      >
        <ul className="px-6 pt-4 pb-6 space-y-3">
          {docs.map((doc, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-rouge/10 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-black/60 leading-snug">{doc}</span>
            </li>
          ))}
          <li className="pt-1">
            <p className="text-xs text-black/35">
              * Des pièces complémentaires peuvent être demandées selon le niveau et la situation de l&apos;élève.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
