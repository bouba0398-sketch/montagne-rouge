"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────── */
const WA_NUMBER  = "33762534321";
const EMAIL_TO   = "bouba0398@gmail.com";
const PHONE_DISP = "+33 7 62 53 43 21";
const PHONE_HREF = "tel:+33762534321";

const TOPICS = [
  {
    label: "Inscription",
    text:  "Bonjour, je souhaite obtenir des informations pour inscrire mon enfant à Montagne Rouge pour l'année 2025–2026.",
  },
  {
    label: "Réinscription",
    text:  "Bonjour, mon enfant est déjà élève à Montagne Rouge et je souhaite procéder à sa réinscription pour l'année 2025–2026.",
  },
  {
    label: "Transfert",
    text:  "Bonjour, mon enfant est actuellement dans un autre établissement et je souhaite le transférer à Montagne Rouge en cours d'année.",
  },
  {
    label: "Renseignements",
    text:  "Bonjour, je souhaite obtenir des renseignements généraux sur votre école : frais de scolarité, niveaux, programme pédagogique…",
  },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

/* ─────────────────────────────────────────────────────────
   WA link builder — encodes current form values
───────────────────────────────────────────────────────── */
function buildWALink(nom: string) {
  const text = nom.trim()
    ? `Bonjour, je suis ${nom.trim()}. Je souhaite des informations sur …`
    : "Bonjour, je souhaite des informations sur …";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
export default function ContactPageClient() {
  /* Shared form state (used by both cards and form) */
  const [nom,     setNom]     = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [topic,   setTopic]   = useState<string | null>(null);

  /* Submit state */
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  /* Modal state */
  const [showModal, setShowModal] = useState(false);
  const [copied,    setCopied]    = useState(false);

  /* Refs */
  const emailRef      = useRef<HTMLInputElement>(null);
  const formSection   = useRef<HTMLElement>(null);
  const firstModalBtn = useRef<HTMLAnchorElement>(null);
  const hpRef         = useRef<HTMLInputElement>(null);

  /* Lock body scroll while modal open */
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    if (showModal) firstModalBtn.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  /* Close modal on Escape */
  useEffect(() => {
    if (!showModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showModal]);

  /* Scroll to form section */
  const scrollToForm = useCallback((focusEmail = false) => {
    formSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (focusEmail) setTimeout(() => emailRef.current?.focus(), 480);
  }, []);

  /* Topic chip select */
  function selectTopic(t: typeof TOPICS[number]) {
    setTopic(t.label);
    setMessage(t.text);
    scrollToForm(false);
  }

  /* Form submit */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ nom, email, message, hp: hpRef.current?.value ?? "" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrMsg(data.error ?? "Une erreur est survenue.");
        setStatus("error");
      } else {
        setStatus("sent");
        setShowModal(true);
      }
    } catch {
      setErrMsg("Impossible d'envoyer. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

  /* Copy message to clipboard */
  async function copyMessage() {
    const text = nom.trim()
      ? `Bonjour, je suis ${nom.trim()}. Je souhaite des informations sur …`
      : "Bonjour, je souhaite des informations sur …";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* user may have denied clipboard — silently ignore */ }
  }

  function closeModal() {
    setShowModal(false);
    setStatus("idle");
    setNom("");
    setEmail("");
    setMessage("");
    setTopic(null);
  }

  const waLink = buildWALink(nom);

  /* Field base className */
  const fieldCls =
    "w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-[14px] text-black " +
    "placeholder:text-black/28 outline-none transition-all duration-150 " +
    "focus:border-black/25 focus:ring-2 focus:ring-black/6 " +
    "focus-visible:ring-2 focus-visible:ring-rouge/40";

  /* ─── render ──────────────────────────────────────────── */
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-24 border-b border-black/5"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-black/28 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-rouge shrink-0" aria-hidden="true" />
            Nous joindre
          </p>

          {/* H1 */}
          <h1
            id="contact-heading"
            className="font-display font-semibold text-black tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(32px,5vw,60px)" }}
          >
            Contact
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] text-black/45 leading-relaxed max-w-md mb-8">
            WhatsApp est le moyen le plus rapide.{" "}
            Sinon, nous répondons sous 24 h ouvrées.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full text-[14px] font-semibold px-6 py-3.5 bg-rouge text-white transition-all duration-200 hover:bg-rouge-dark hover:shadow-lg hover:-translate-y-px active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rouge/50 focus-visible:ring-offset-2"
            >
              <WaIcon cls="w-4 h-4" />
              Ouvrir WhatsApp
            </a>

            <button
              type="button"
              onClick={() => scrollToForm()}
              className="inline-flex items-center justify-center gap-2 rounded-full text-[14px] font-semibold px-6 py-3.5 border border-black/12 text-black/65 bg-white transition-all duration-200 hover:border-black/25 hover:text-black active:scale-[0.97]"
            >
              Envoyer un message
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══ CARDS ═══════════════════════════════════════════ */}
      <section className="py-12 lg:py-16 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">

            {/* 1 — WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-3xl p-6 lg:p-7 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/12 hover:-translate-y-1 active:scale-[0.98]"
              style={{ background: "#f0fdf4", border: "1px solid rgba(37,211,102,0.18)" }}
              aria-label="Écrire sur WhatsApp — ouvre WhatsApp"
            >
              <span
                className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{ background: "rgba(37,211,102,0.15)", color: "#16a34a" }}
              >
                Le plus rapide
              </span>
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 text-white shrink-0"
                style={{ background: "#25D366" }}
              >
                <WaIcon cls="w-5 h-5" />
              </div>
              <p className="font-semibold text-[16px] text-black mb-1">Écrire sur WhatsApp</p>
              <p className="text-[12px] text-black/45 mb-5">Réponse en quelques minutes</p>
              <div className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#16a34a]">
                Ouvrir WhatsApp
                <ArrowRight cls="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 2 — Email */}
            <a
              href={`mailto:${EMAIL_TO}`}
              className="group flex flex-col rounded-3xl p-6 lg:p-7 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 hover:shadow-lg hover:shadow-black/8 hover:-translate-y-1 active:scale-[0.98]"
              style={{ background: "#fafafa", border: "1px solid rgba(0,0,0,0.08)" }}
              aria-label={`Envoyer un email à ${EMAIL_TO}`}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 text-white shrink-0"
                style={{ background: "#0a0a0a" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-semibold text-[16px] text-black mb-1">Envoyer un email</p>
              <p className="text-[12px] text-black/45 mb-5 break-all">{EMAIL_TO}</p>
              <div className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-black/50 group-hover:text-black transition-colors">
                Ouvrir la messagerie
                <ArrowRight cls="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 3 — Phone */}
            <a
              href={PHONE_HREF}
              className="group flex flex-col rounded-3xl p-6 lg:p-7 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rouge/30 hover:shadow-lg hover:shadow-rouge/10 hover:-translate-y-1 active:scale-[0.98]"
              style={{ background: "rgba(150,0,24,0.03)", border: "1px solid rgba(150,0,24,0.10)" }}
              aria-label={`Appeler ${PHONE_DISP}`}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 text-white shrink-0"
                style={{ background: "#960018" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="font-semibold text-[16px] text-black mb-1">Appeler directement</p>
              <p className="text-[12px] text-black/45 mb-5">{PHONE_DISP}</p>
              <div className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-rouge/70 group-hover:text-rouge transition-colors">
                Lancer l&apos;appel
                <ArrowRight cls="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ══ FORM ════════════════════════════════════════════ */}
      <section
        id="message"
        ref={formSection as React.RefObject<HTMLElement>}
        className="py-16 lg:py-24 scroll-mt-20"
        style={{ background: "rgba(0,0,0,0.015)" }}
        aria-labelledby="form-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-lg mx-auto">

            {/* Section heading */}
            <div className="text-center mb-7">
              <h2 id="form-heading" className="font-semibold text-black text-[20px] mb-2">
                Envoyez un message
              </h2>
              <p className="text-[13px] text-black/40">
                Réponse sous 24 h ouvrées.
              </p>
            </div>

            {/* Topic chips */}
            <div className="flex flex-wrap gap-2 justify-center mb-6" role="group" aria-label="Sujet du message">
              {TOPICS.map((t) => {
                const active = topic === t.label;
                return (
                  <button
                    key={t.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectTopic(t)}
                    className="rounded-full text-[12px] font-semibold px-4 py-2 border transition-all duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rouge/40"
                    style={
                      active
                        ? { background: "#960018", color: "#fff",                   borderColor: "#960018" }
                        : { background: "#fff",    color: "rgba(10,10,10,0.55)",    borderColor: "rgba(0,0,0,0.10)" }
                    }
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Form card */}
            <div
              className="rounded-3xl p-7 lg:p-9"
              style={{
                background: "#fff",
                border:    "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.04)",
              }}
            >
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Nom */}
                <div>
                  <label htmlFor="contact-nom" className="block text-[12px] font-semibold text-black/45 mb-1.5 tracking-wide">
                    Nom complet <span className="text-rouge" aria-hidden="true">*</span>
                    <span className="sr-only">(requis)</span>
                  </label>
                  <input
                    id="contact-nom"
                    name="nom"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Prénom Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className={fieldCls}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-[12px] font-semibold text-black/45 mb-1.5 tracking-wide">
                    Email <span className="text-rouge" aria-hidden="true">*</span>
                    <span className="sr-only">(requis)</span>
                  </label>
                  <input
                    id="contact-email"
                    ref={emailRef}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldCls}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-[12px] font-semibold text-black/45 mb-1.5 tracking-wide">
                    Message <span className="text-rouge" aria-hidden="true">*</span>
                    <span className="sr-only">(requis)</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Bonjour, je souhaite obtenir des informations sur…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${fieldCls} resize-none`}
                  />
                </div>

                {/* Honeypot — invisible to humans, filled by bots */}
                <input
                  ref={hpRef}
                  type="text"
                  name="hp"
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  defaultValue=""
                  style={{ display: "none" }}
                />

                {/* Error */}
                {status === "error" && errMsg && (
                  <p role="alert" className="text-[13px] text-red-500 font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    {errMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-rouge text-white font-semibold py-4 rounded-2xl text-[14px] transition-all duration-200 hover:bg-rouge-dark active:scale-[0.98] disabled:opacity-55 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rouge/50 focus-visible:ring-offset-2"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
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
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER INFO ═════════════════════════════════════ */}
      <section className="py-10 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-[13px] text-black/35">
          <span>Lun – Ven&nbsp;: 7 h 30 – 17 h 00</span>
          <span className="hidden sm:inline text-black/15" aria-hidden="true">·</span>
          <span>Sam&nbsp;: 8 h 00 – 13 h 00</span>
          <span className="hidden sm:inline text-black/15" aria-hidden="true">·</span>
          <span>Ouakam – Cité Avion, Dakar, Sénégal</span>
        </div>
      </section>

      {/* ══ SUCCESS MODAL ═══════════════════════════════════ */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Sheet — bottom on mobile, centered on sm+ */}
          <div
            className="relative w-full sm:max-w-md sm:mx-4 rounded-t-3xl sm:rounded-3xl bg-white overflow-hidden"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.20)" }}
          >
            {/* Drag handle (mobile only) */}
            <div className="sm:hidden flex justify-center pt-3 pb-0.5" aria-hidden="true">
              <div className="w-9 h-1 rounded-full bg-black/10" />
            </div>

            <div className="p-8">
              {/* Check */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(37,211,102,0.10)" }}
              >
                <svg className="w-7 h-7 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 id="modal-title" className="font-semibold text-black text-[20px] text-center mb-2">
                Message envoyé !
              </h3>
              <p className="text-[14px] text-black/45 text-center leading-relaxed mb-8">
                Nous vous répondons sous 24 h ouvrées. Pour une réponse immédiate, continuez sur WhatsApp avec votre message prêt.
              </p>

              {/* Primary — WhatsApp */}
              <a
                ref={firstModalBtn}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full text-white font-semibold py-4 rounded-2xl text-[14px] mb-3 transition-all duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                style={{ background: "#25D366" }}
              >
                <WaIcon cls="w-5 h-5" />
                Ouvrir WhatsApp
              </a>

              {/* Secondary — Copy */}
              <button
                type="button"
                onClick={copyMessage}
                className="flex items-center justify-center gap-2 w-full border border-black/10 font-medium py-3.5 rounded-2xl text-[14px] text-black/55 mb-6 transition-all duration-150 hover:border-black/20 hover:text-black active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copié !
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copier le message
                  </>
                )}
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={closeModal}
                className="w-full text-center text-[13px] font-medium text-black/35 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-lg py-1"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Micro icon helpers (avoid re-importing in TSX)
───────────────────────────────────────────────────────── */
function WaIcon({ cls }: { cls: string }) {
  return (
    <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function ArrowRight({ cls }: { cls: string }) {
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}
