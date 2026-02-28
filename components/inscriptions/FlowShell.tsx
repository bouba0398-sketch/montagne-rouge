"use client";

import Link from "next/link";
import { SCHOOL } from "@/lib/school-config";

interface Step { label: string; }

interface FlowShellProps {
  title:            string;
  subtitle?:        string;
  estimatedMinutes: number;
  steps:            Step[];
  currentStep:      number;       // 0-indexed
  canProceed:       boolean;
  isLastStep:       boolean;
  isSubmitting:     boolean;
  onBack:           () => void;
  onNext:           () => void;
  children:         React.ReactNode;
}

/* ── Stepper dot ── */
function Dot({ state }: { state: "done" | "current" | "upcoming" }) {
  if (state === "done") {
    return (
      <span className="w-7 h-7 rounded-full bg-rouge flex items-center justify-center shrink-0">
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (state === "current") {
    return (
      <span className="w-7 h-7 rounded-full border-2 border-rouge bg-white flex items-center justify-center shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-rouge" />
      </span>
    );
  }
  return (
    <span className="w-7 h-7 rounded-full border-2 border-black/12 bg-white flex items-center justify-center shrink-0" />
  );
}

export default function FlowShell({
  title, subtitle, estimatedMinutes,
  steps, currentStep,
  canProceed, isLastStep, isSubmitting,
  onBack, onNext, children,
}: FlowShellProps) {
  const total = steps.length;

  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 lg:py-14">

        {/* ── Back to hub ── */}
        <Link
          href="/inscriptions"
          className="inline-flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors mb-8"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux inscriptions
        </Link>

        {/* ── Flow title ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1
              className="font-display font-semibold tracking-tight text-black"
              style={{ fontSize: "clamp(22px,3.5vw,30px)" }}
            >
              {title}
            </h1>
            <span className="text-[11px] font-medium text-black/30 bg-black/[0.05] px-2.5 py-1 rounded-full whitespace-nowrap">
              ≈ {estimatedMinutes} min
            </span>
          </div>
          {subtitle && (
            <p className="text-sm text-black/45 leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* ── Stepper ── */}
        <div className="mb-10">
          {/* Desktop: dots + labels */}
          <div className="hidden sm:flex items-start">
            {steps.map((step, i) => {
              const state = i < currentStep ? "done" : i === currentStep ? "current" : "upcoming";
              return (
                <div key={i} className="flex items-start flex-1 min-w-0">
                  <div className="flex flex-col items-center min-w-0 w-full">
                    <Dot state={state} />
                    <span
                      className="mt-2 text-[11px] text-center font-medium leading-tight px-1"
                      style={{
                        color: state === "upcoming" ? "rgba(10,10,10,0.28)" : state === "current" ? "#960018" : "#0a0a0a",
                        maxWidth: "80px",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="h-[2px] flex-1 mt-[13px] mx-1"
                      style={{ background: i < currentStep ? "#960018" : "rgba(0,0,0,0.08)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: text progress */}
          <div className="sm:hidden flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-black/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-rouge transition-all duration-500"
                style={{ width: `${((currentStep + 1) / total) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-black/40 whitespace-nowrap">
              Étape {currentStep + 1} sur {total}
            </span>
          </div>
        </div>

        {/* ── Step content — key triggers step-animate on change ── */}
        <div key={currentStep} className="step-animate mb-10">
          {children}
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between pt-6 border-t border-black/6">
          {currentStep > 0 ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black/45 hover:text-black transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
          ) : <span />}

          <button
            onClick={onNext}
            disabled={!canProceed || isSubmitting}
            className="inline-flex items-center gap-2 bg-rouge text-white font-semibold px-7 py-3.5 rounded-full text-[13px] transition-all duration-200 hover:bg-rouge-dark hover:shadow-lg hover:shadow-rouge/25 hover:-translate-y-px active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Envoi…
              </>
            ) : isLastStep ? (
              <>
                Envoyer
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            ) : (
              <>
                Continuer
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* ── Help ── */}
        <div className="mt-10 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-black/35">
            Besoin d&apos;aide ? <span className="text-black/50 not-italic">Jàmm rekk</span>, on est là.
          </p>
          <a
            href={SCHOOL.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#25D366] hover:text-[#1fba58] transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contacter sur WhatsApp
          </a>
        </div>

      </div>
    </main>
  );
}
