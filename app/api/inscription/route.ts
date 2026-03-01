import { Resend } from "resend";
import { createServerClient } from "@/lib/supabase/server";

const FROM = "Montagne Rouge <contact@montagnerouge.com>";
const TO   = process.env.EMAIL_TO ?? "montagnerouge1996@gmail.com";

/* ── Rate limiting (in-memory) ── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT     = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

/* ── Helpers ── */
function str(fd: FormData, key: string): string {
  return ((fd.get(key) as string) ?? "").trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "document";
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ── Email template ── */
function buildEmail(fields: Record<string, string>, docNames: string[]): string {
  const row = (label: string, val: string) =>
    val
      ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;width:40%;vertical-align:top">${label}</td>
           <td style="padding:8px 0;color:#111;font-size:13px;font-weight:600">${esc(val)}</td></tr>`
      : "";

  const section = (title: string, rows: string) =>
    `<div style="margin-bottom:24px">
       <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#aaa;margin:0 0 8px">${title}</p>
       <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:12px;padding:0 16px">
         <tbody>${rows}</tbody>
       </table>
     </div>`;

  const typeLbl: Record<string, string> = {
    nouvelle_inscription: "Nouvelle inscription",
    reinscription:        "Réinscription",
    transfert:            "Transfert en cours d'année",
    renseignement:        "Demande de renseignements",
  };

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:620px;margin:auto;color:#111;padding:24px">
      <h2 style="color:#960018;font-size:22px;font-weight:700;margin:0 0 4px">
        ${typeLbl[fields.type_demande] ?? fields.type_demande}
      </h2>
      <p style="color:#aaa;font-size:13px;margin:0 0 28px">
        Montagne Rouge · ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Dakar" })} (heure Dakar)
      </p>

      ${fields.eleve_prenom ? section("Élève", `
        ${row("Prénom & Nom",       `${fields.eleve_prenom} ${fields.eleve_nom}`)}
        ${row("Né(e) le",          fields.eleve_date_naissance)}
        ${row("Niveau souhaité",   fields.niveau)}
        ${row("Année",             fields.annee)}
        ${row("Classe actuelle",   fields.classe_actuelle)}
        ${row("École actuelle",    fields.eleve_ecole_actuelle)}
      `) : ""}

      ${section("Parent / tuteur", `
        ${row("Nom complet",  fields.parent_nom)}
        ${row("Lien",         fields.parent_lien)}
        ${row("Téléphone",    fields.parent_telephone)}
        ${row("Email",        fields.parent_email)}
      `)}

      ${fields.nom_ecole_origine ? section("École d'origine (transfert)", `
        ${row("École",   fields.nom_ecole_origine)}
        ${row("Ville",   fields.ville_ecole_origine)}
        ${row("Motif",   fields.motif_transfert)}
        ${row("Arrivée", fields.date_arrivee)}
      `) : ""}

      ${fields.sujets ? section("Renseignements", `
        ${row("Sujets",  fields.sujets)}
        ${row("Niveau",  fields.niveau)}
        ${row("Message", fields.message)}
      `) : ""}

      ${fields.changements ? section("Changements signalés", `
        ${row("Détails", fields.changements)}
      `) : ""}

      ${docNames.length > 0 ? `
      <div style="margin-bottom:24px">
        <p style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#aaa;margin:0 0 8px">
          Documents reçus (${docNames.length})
        </p>
        <div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:12px 16px">
          ${docNames.map((n) => `<p style="margin:4px 0;font-size:13px;color:#555">📎 ${esc(n)}</p>`).join("")}
        </div>
        <p style="font-size:11px;color:#aaa;margin:6px 0 0">
          Les fichiers sont stockés de façon sécurisée dans Supabase Storage (bucket privé).
        </p>
      </div>
      ` : `
      <p style="font-size:13px;color:#aaa;margin-bottom:24px">
        Aucun document joint — à apporter lors de la visite.
      </p>
      `}

      <p style="font-size:12px;color:#ccc;border-top:1px solid #eee;padding-top:16px;margin-top:8px">
        Dossier ID: ${fields.inscription_id}
      </p>
    </div>
  `;
}

/* ════════════════════════════════════════════════════════════
   POST /api/inscription
   ════════════════════════════════════════════════════════════ */
export async function POST(req: Request) {
  /* ── Env guard ── */
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error("[inscription] Supabase env vars manquantes");
    return Response.json({ ok: false, error: "Configuration serveur manquante." }, { status: 503 });
  }

  /* ── Rate limit ── */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  /* ── Parse multipart ── */
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return Response.json({ ok: false, error: "Corps de requête invalide." }, { status: 400 });
  }

  /* ── Honeypot ── */
  if (str(fd, "hp")) return Response.json({ ok: true });

  /* ── Extract files ── */
  const rawFiles = fd.getAll("files");
  const files    = rawFiles.filter((f): f is File => f instanceof File && f.size > 0);

  /* ── Validate files ── */
  const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
  const MAX_SIZE      = 10 * 1024 * 1024; // 10 MB
  const MAX_FILES     = 6;

  if (files.length > MAX_FILES) {
    return Response.json({ ok: false, error: `Maximum ${MAX_FILES} fichiers autorisés.` }, { status: 400 });
  }
  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json({ ok: false, error: `Type non autorisé: ${file.name} (PDF, JPG ou PNG requis).` }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return Response.json({ ok: false, error: `Fichier trop volumineux: ${file.name} (max 10 Mo).` }, { status: 400 });
    }
  }

  /* ── Extract fields ── */
  const type_demande         = str(fd, "type_demande") || "nouvelle_inscription";
  const eleve_prenom         = str(fd, "eleve_prenom");
  const eleve_nom            = str(fd, "eleve_nom");
  const eleve_date_naissance = str(fd, "eleve_date_naissance") || null;
  const eleve_sexe           = str(fd, "eleve_sexe");
  const eleve_ecole_actuelle = str(fd, "eleve_ecole_actuelle");
  const niveau               = str(fd, "niveau");
  const annee                = str(fd, "annee");
  const classe_actuelle      = str(fd, "classe_actuelle");
  const parent_nom           = str(fd, "parent_nom");
  const parent_lien          = str(fd, "parent_lien");
  const parent_telephone     = str(fd, "parent_telephone");
  const parent_email         = str(fd, "parent_email");
  const nom_ecole_origine    = str(fd, "nom_ecole_origine");
  const ville_ecole_origine  = str(fd, "ville_ecole_origine");
  const motif_transfert      = str(fd, "motif_transfert");
  const date_arrivee         = str(fd, "date_arrivee");
  const sujets_raw           = str(fd, "sujets");
  const message              = str(fd, "message");
  const changements          = str(fd, "changements");

  /* ── Basic validation ── */
  if (!parent_telephone) {
    return Response.json({ ok: false, error: "Téléphone du parent requis." }, { status: 400 });
  }

  /* ── Supabase client ── */
  const supabase = createServerClient();

  /* ── 1. Insert inscription row ── */
  const insertPayload = {
    type_demande,
    eleve_prenom:         eleve_prenom  || null,
    eleve_nom:            eleve_nom     || null,
    eleve_date_naissance: eleve_date_naissance ? new Date(eleve_date_naissance).toISOString().split("T")[0] : null,
    eleve_sexe:           eleve_sexe    || null,
    eleve_ecole_actuelle: eleve_ecole_actuelle || null,
    niveau:               niveau        || null,
    annee:                annee         || null,
    classe_actuelle:      classe_actuelle || null,
    parent_nom,
    parent_lien:          parent_lien   || null,
    parent_telephone,
    parent_email:         parent_email  || null,
    nom_ecole_origine:    nom_ecole_origine  || null,
    ville_ecole_origine:  ville_ecole_origine || null,
    motif_transfert:      motif_transfert    || null,
    date_arrivee:         date_arrivee       || null,
    sujets:               sujets_raw ? JSON.parse(sujets_raw) : [],
    message:              message      || null,
    changements:          changements  || null,
    documents:            [],
    status:               "nouveau",
  };

  const { data: row, error: insertError } = await supabase
    .from("inscriptions")
    .insert(insertPayload)
    .select("id")
    .single();

  if (insertError || !row) {
    console.error("[inscription] DB insert error:", insertError);
    return Response.json({ ok: false, error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  const inscriptionId = row.id as string;

  /* ── 2. Upload files to private Storage ── */
  const documents: Array<{ label: string; path: string; mime: string; size: number }> = [];

  for (const file of files) {
    const ext  = (file.name.split(".").pop() ?? "bin").toLowerCase();
    const slug = slugify(file.name.replace(/\.[^.]+$/, ""));
    const path = `inscriptions/${inscriptionId}/${Date.now()}-${slug}.${ext}`;

    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("inscriptions")
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (uploadError) {
      console.error(`[inscription] Storage upload error for ${file.name}:`, uploadError);
      // Continue — don't abort the whole submission for one file
    } else {
      documents.push({ label: file.name, path, mime: file.type, size: file.size });
    }
  }

  /* ── 3. Update row with document paths ── */
  if (documents.length > 0) {
    const { error: updateError } = await supabase
      .from("inscriptions")
      .update({ documents })
      .eq("id", inscriptionId);

    if (updateError) {
      console.error("[inscription] DB update (documents) error:", updateError);
      // Non-fatal — row exists, docs metadata just missing
    }
  }

  /* ── 4. Send Resend email ── */
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fields: Record<string, string> = {
        type_demande, inscription_id: inscriptionId,
        eleve_prenom, eleve_nom, eleve_date_naissance: eleve_date_naissance ?? "",
        eleve_sexe, eleve_ecole_actuelle,
        niveau, annee, classe_actuelle,
        parent_nom, parent_lien, parent_telephone, parent_email,
        nom_ecole_origine, ville_ecole_origine, motif_transfert, date_arrivee,
        sujets: sujets_raw, message, changements,
      };
      const typeLbl: Record<string, string> = {
        nouvelle_inscription: "Nouvelle inscription",
        reinscription:        "Réinscription",
        transfert:            "Transfert",
        renseignement:        "Renseignements",
      };
      await resend.emails.send({
        from:    FROM,
        to:      TO,
        replyTo: parent_email || undefined,
        subject: `[MR] ${typeLbl[type_demande] ?? type_demande} — ${eleve_prenom || parent_nom} ${eleve_nom || ""}`.trim(),
        html:    buildEmail(fields, documents.map((d) => d.label)),
      });
    } catch (emailErr) {
      console.error("[inscription] Resend error (non-fatal):", emailErr);
    }
  }

  return Response.json({ ok: true, id: inscriptionId });
}
