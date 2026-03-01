"use client";

import { useRef, useState, useCallback } from "react";

export interface SelectedFile {
  id:    string; // local key for rendering
  file:  File;
  error: string | null;
}

interface FileUploadStepProps {
  files:    SelectedFile[];
  onChange: (files: SelectedFile[]) => void;
}

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const ALLOWED_EXT   = [".pdf", ".jpg", ".jpeg", ".png"];
const MAX_SIZE_MB   = 10;
const MAX_SIZE      = MAX_SIZE_MB * 1024 * 1024;
const MAX_FILES     = 6;

const DOC_HINTS = [
  { label: "Acte de naissance",              required: true  },
  { label: "Photo d'identité",               required: true  },
  { label: "Bulletin(s) récent(s)",          required: true  },
  { label: "Pièce d'identité du parent",     required: false },
  { label: "Autre document",                 required: false },
];

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `Type non autorisé (PDF, JPG ou PNG requis)`;
  }
  if (file.size > MAX_SIZE) {
    return `Fichier trop volumineux (max ${MAX_SIZE_MB} Mo)`;
  }
  return null;
}

function formatSize(bytes: number): string {
  if (bytes < 1024)       return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function FileIcon({ type }: { type: string }) {
  const isPdf = type === "application/pdf";
  return (
    <span
      className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold"
      style={{
        background: isPdf ? "rgba(150,0,24,0.08)" : "rgba(0,0,0,0.05)",
        color:      isPdf ? "#960018"             : "rgba(0,0,0,0.45)",
      }}
    >
      {isPdf ? "PDF" : "IMG"}
    </span>
  );
}

export default function FileUploadStep({ files, onChange }: FileUploadStepProps) {
  const inputRef           = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const remaining = MAX_FILES - files.length;
    if (remaining <= 0) return;

    const toAdd: SelectedFile[] = arr.slice(0, remaining).map((file) => ({
      id:    uid(),
      file,
      error: validateFile(file),
    }));

    onChange([...files, ...toAdd]);
  }, [files, onChange]);

  const removeFile = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
  };

  /* ── Drag & drop handlers ── */
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const hasErrors   = files.some((f) => f.error);
  const validFiles  = files.filter((f) => !f.error);
  const atLimit     = files.length >= MAX_FILES;

  return (
    <div className="space-y-6">

      {/* ── Document hints ── */}
      <div className="rounded-2xl border border-black/8 bg-black/[0.02] p-5">
        <p className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-3">
          Documents recommandés
        </p>
        <ul className="space-y-2">
          {DOC_HINTS.map((d) => (
            <li key={d.label} className="flex items-center gap-2.5 text-sm">
              <span
                className="shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: d.required ? "#960018" : "rgba(0,0,0,0.2)" }}
              />
              <span className="text-black/70">{d.label}</span>
              {!d.required && (
                <span className="text-[11px] text-black/30 ml-auto">optionnel</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Drop zone ── */}
      {!atLimit && (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className="relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-10 px-6"
          style={{
            borderColor:     dragging ? "#960018"              : "rgba(0,0,0,0.12)",
            background:      dragging ? "rgba(150,0,24,0.04)" : "rgba(0,0,0,0.01)",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ALLOWED_EXT.join(",")}
            className="sr-only"
            onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
          />

          {/* Upload icon */}
          <span
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: dragging ? "rgba(150,0,24,0.10)" : "rgba(0,0,0,0.05)" }}
          >
            <svg
              className="w-5 h-5 transition-colors"
              style={{ color: dragging ? "#960018" : "rgba(0,0,0,0.35)" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </span>

          <div className="text-center">
            <p className="text-sm font-semibold text-black/70">
              {dragging ? "Déposez ici" : "Glissez-déposez ou cliquez"}
            </p>
            <p className="text-xs text-black/35 mt-1">
              PDF, JPG ou PNG · max {MAX_SIZE_MB} Mo par fichier · {files.length}/{MAX_FILES} fichiers
            </p>
          </div>
        </div>
      )}

      {/* ── File list ── */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((sf) => (
            <li
              key={sf.id}
              className="flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors"
              style={{
                borderColor: sf.error ? "rgba(239,68,68,0.3)" : "rgba(0,0,0,0.08)",
                background:  sf.error ? "rgba(239,68,68,0.04)" : "#fff",
              }}
            >
              <FileIcon type={sf.file.type} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">{sf.file.name}</p>
                {sf.error ? (
                  <p className="text-[11px] text-red-500 font-medium mt-0.5">{sf.error}</p>
                ) : (
                  <p className="text-[11px] text-black/35 mt-0.5">{formatSize(sf.file.size)}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeFile(sf.id)}
                aria-label="Supprimer ce fichier"
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-black/8"
              >
                <svg className="w-3.5 h-3.5 text-black/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── Errors banner ── */}
      {hasErrors && (
        <div className="flex gap-2.5 rounded-2xl bg-red-50 border border-red-200 px-4 py-3">
          <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
          </svg>
          <p className="text-xs text-red-600 font-medium leading-relaxed">
            Certains fichiers ne peuvent pas être ajoutés. Retirez-les (×) puis sélectionnez des fichiers PDF, JPG ou PNG de moins de {MAX_SIZE_MB} Mo.
          </p>
        </div>
      )}

      {/* ── No files warning ── */}
      {files.length === 0 && (
        <div className="flex gap-2.5 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
          <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p className="text-xs text-amber-700 leading-relaxed">
            Les documents accélèrent le traitement de votre dossier. Vous pouvez également les apporter lors de votre visite.
          </p>
        </div>
      )}

      {/* ── Valid count summary ── */}
      {validFiles.length > 0 && !hasErrors && (
        <div className="flex items-center gap-2 text-xs text-black/45">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {validFiles.length} fichier{validFiles.length > 1 ? "s" : ""} prêt{validFiles.length > 1 ? "s" : ""} à l'envoi
        </div>
      )}

    </div>
  );
}
