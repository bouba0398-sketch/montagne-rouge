"use client";

import { useState, useCallback, useRef } from "react";
import type { DragEvent } from "react";
import { useUploadThing } from "@/lib/uploadthing";

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────

export interface UploadedDoc {
  url:  string;
  name: string;
  size: number;
  type: string;
}

interface Props {
  uploadedDocs: UploadedDoc[];
  onChange: (docs: UploadedDoc[]) => void;
}

// ─────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────

const MAX_FILES = 6;
const MAX_SIZE  = 10 * 1024 * 1024; // 10 MB
const ALLOWED   = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

const REQUIRED_DOCS  = [
  "Acte de naissance",
  "Photos d'identité (× 2)",
  "Carnet de vaccination",
  "CNI du parent / tuteur",
];
const OPTIONAL_DOCS = [
  "Bulletins scolaires",
  "Certificat de radiation",
];

// ─────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────

export default function DocumentUpload({ uploadedDocs, onChange }: Props) {
  const [dragging, setDragging]   = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [uploadFailed, setUploadFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("inscriptionDocs", {
    onClientUploadComplete: (res) => {
      const newDocs: UploadedDoc[] = res.map((f) => ({
        url:  f.serverData.url,
        name: f.serverData.name,
        size: f.serverData.size,
        type: f.serverData.type,
      }));
      onChange([...uploadedDocs, ...newDocs]);
      setError(null);
      setUploadFailed(false);
    },
    onUploadError: (err) => {
      setError(err.message || "L'upload a échoué. Réessayez.");
      setUploadFailed(true);
    },
  });

  const validate = (files: File[]): string | null => {
    for (const file of files) {
      if (!ALLOWED.includes(file.type)) {
        return `Type non autorisé : ${file.name}. Formats acceptés : PDF, JPG, PNG.`;
      }
      if (file.size > MAX_SIZE) {
        return `Fichier trop volumineux : ${file.name}. Maximum 10 Mo.`;
      }
    }
    if (uploadedDocs.length + files.length > MAX_FILES) {
      return `Maximum ${MAX_FILES} fichiers. Retirez des fichiers avant d'en ajouter.`;
    }
    return null;
  };

  const handleFiles = useCallback(async (files: File[]) => {
    setError(null);
    setUploadFailed(false);
    const err = validate(files);
    if (err) { setError(err); return; }
    await startUpload(files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedDocs, startUpload]);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }, [handleFiles]);

  const removeDoc = (index: number) =>
    onChange(uploadedDocs.filter((_, i) => i !== index));

  const fileLabel = (type: string) =>
    type.includes("pdf") ? "PDF" : "Image";

  return (
    <div className="space-y-4">

      {/* ── Required docs checklist ── */}
      <div className="rounded-2xl border border-black/8 p-5 bg-black/[0.015]">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black/35 mb-4">
          Pièces attendues
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
          {REQUIRED_DOCS.map((doc) => (
            <div key={doc} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rouge/60 shrink-0" />
              <span className="text-[12.5px] text-black/65 leading-snug">{doc}</span>
              <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-rouge/60 shrink-0">
                Requis
              </span>
            </div>
          ))}
          {OPTIONAL_DOCS.map((doc) => (
            <div key={doc} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0" />
              <span className="text-[12.5px] text-black/40 leading-snug">{doc}</span>
              <span className="ml-auto text-[9px] font-medium text-black/25 shrink-0">Optionnel</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Drop zone ── */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && !isUploading && inputRef.current?.click()}
        className={[
          "border-2 border-dashed rounded-2xl px-8 py-12 text-center cursor-pointer select-none",
          "transition-all duration-200",
          dragging
            ? "border-rouge bg-rouge/[0.04] scale-[0.99]"
            : "border-black/10 hover:border-rouge/35 hover:bg-rouge/[0.015]",
          isUploading ? "pointer-events-none opacity-60" : "",
        ].join(" ")}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            handleFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-rouge/20 border-t-rouge animate-spin" />
            <p className="text-[13px] text-black/40 font-medium">Upload en cours…</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-black/[0.04] flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-[14px] font-semibold text-black/55 mb-1">
              Glisser-déposer vos fichiers ici
            </p>
            <p className="text-[12px] text-black/30">
              ou cliquer pour sélectionner · PDF, JPG, PNG · max 10 Mo · max {MAX_FILES} fichiers
            </p>
          </>
        )}
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 border border-red-100">
          <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-[12.5px] text-red-600 font-medium">{error}</p>
            {uploadFailed && (
              <p className="text-[11.5px] text-red-500/70 mt-1">
                Si le problème persiste, envoyez vos documents par{" "}
                <a href="https://wa.me/221770000000" className="underline underline-offset-2 hover:text-red-600 transition-colors">
                  WhatsApp
                </a>{" "}
                ou à{" "}
                <a href="mailto:contact@montagnerouge.sn" className="underline underline-offset-2 hover:text-red-600 transition-colors">
                  contact@montagnerouge.sn
                </a>.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Uploaded files list ── */}
      {uploadedDocs.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/30">
            {uploadedDocs.length} fichier{uploadedDocs.length > 1 ? "s" : ""} uploadé{uploadedDocs.length > 1 ? "s" : ""}
          </p>
          {uploadedDocs.map((doc, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-black/6 bg-green-50/40 hover:border-black/10 transition-colors"
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-black/70 truncate leading-tight">
                  {doc.name}
                </p>
                <p className="text-[11px] text-black/30 mt-0.5">
                  {(doc.size / 1024).toFixed(0)} Ko · {fileLabel(doc.type)}
                </p>
              </div>
              {/* Remove */}
              <button
                type="button"
                onClick={() => removeDoc(i)}
                aria-label={`Retirer ${doc.name}`}
                className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-500 transition-all shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Security note ── */}
      <div className="flex items-center gap-2 pt-1">
        <svg className="w-3.5 h-3.5 text-black/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <p className="text-[11px] text-black/25">
          Vos documents sont transmis de façon sécurisée.
        </p>
      </div>

    </div>
  );
}
