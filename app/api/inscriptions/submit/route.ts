import { Resend } from "resend";

const TO   = process.env.EMAIL_TO ?? "bouba0398@gmail.com";
const FROM = "Montagne Rouge <onboarding@resend.dev>";

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

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TYPE_LBL: Record<string, string> = {
  nouvelle_inscription: "Nouvelle inscription",
  demande_information:  "Demande d'information",
  transfert:            "Transfert d'école",
};
const CANTINE_LBL: Record<string, string> = {
  non:              "Non",
  dejeuner:         "Déjeuner",
  dejeuner_gouter:  "Déjeuner + Goûter",
};

export async function POST(req: Request) {
  /* ── Env guard ── */
  if (!process.env.RESEND_API_KEY) {
    console.error("[inscriptions/submit] RESEND_API_KEY manquant — configurer la variable d'environnement sur Vercel");
    return Response.json(
      { ok: false, error: "Service d'email temporairement indisponible." },
      { status: 503 }
    );
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
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

    const body = await req.json();

    /* ── Honeypot ── */
    if (body.hp) return Response.json({ ok: true });

    /* ── Extract fields ── */
    const {
      typeDemande, classeDemandee, ageEnfant, anneeScolaire,
      prenomEleve, nomEleve, dateNaissance, sexe, nationalite, ecoleActuelle,
      nomPere, telephonePere, professionPere,
      nomMere, telephoneMere, professionMere,
      emailPrincipal, whatsapp,
      quartier, ville, pays,
      cantine, etudesDirigees, transport, packFournitures,
      tailleUniforme, packCompletUniforme,
      uploadedDocs,
    } = body;

    /* ── Validation ── */
    if (!prenomEleve || !nomEleve || !emailPrincipal || !classeDemandee) {
      return Response.json(
        { ok: false, error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(String(emailPrincipal))) {
      return Response.json(
        { ok: false, error: "Adresse email invalide." },
        { status: 400 }
      );
    }
    if (!Array.isArray(uploadedDocs) || uploadedDocs.length === 0) {
      return Response.json(
        { ok: false, error: "Au moins un document est requis." },
        { status: 400 }
      );
    }

    /* ── Sanitize docs (max 6, trim strings) ── */
    const docs = (uploadedDocs as unknown[]).slice(0, 6).map((d) => {
      const doc = d as Record<string, unknown>;
      return {
        url:  String(doc.url  ?? "").slice(0, 500),
        name: String(doc.name ?? "").slice(0, 200),
        size: Number(doc.size ?? 0),
        type: String(doc.type ?? "").slice(0, 100),
      };
    });

    /* ── Build email HTML ── */
    const row = (label: string, value: string) =>
      `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f0f0">
         <span style="color:#888;font-size:13px;font-weight:500">${label}</span>
         <span style="color:#111;font-size:13px;font-weight:600;text-align:right;max-width:60%">${value}</span>
       </div>`;

    const section = (title: string, content: string) =>
      `<div style="margin-bottom:24px">
         <h3 style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
                    color:#999;margin:0 0 8px">${title}</h3>
         <div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:0 16px">
           ${content}
         </div>
       </div>`;

    const docsHtml = docs
      .map(
        (d) =>
          `<div style="display:flex;align-items:center;justify-content:space-between;
                       padding:12px 0;border-bottom:1px solid #f0f0f0">
             <a href="${esc(d.url)}" target="_blank" rel="noopener noreferrer"
                style="color:#960018;font-weight:600;font-size:13px;text-decoration:none">
               ${esc(d.name)}
             </a>
             <span style="color:#aaa;font-size:12px;white-space:nowrap;margin-left:12px">
               ${(d.size / 1024).toFixed(0)} Ko
             </span>
           </div>`
      )
      .join("");

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                  max-width:620px;margin:auto;color:#111;padding:24px">

        <div style="margin-bottom:28px">
          <h2 style="color:#960018;font-size:22px;font-weight:700;margin:0 0 4px">
            Dossier d'inscription
          </h2>
          <p style="color:#888;font-size:13px;margin:0">Montagne Rouge — École Internationale</p>
        </div>

        ${section("Identification", `
          ${row("Type de demande",  esc(TYPE_LBL[typeDemande] ?? typeDemande))}
          ${row("Classe demandée",  esc(classeDemandee))}
          ${row("Âge de l'enfant", esc(ageEnfant) + " ans")}
          ${row("Année scolaire",   esc(anneeScolaire))}
        `)}

        ${section("Élève", `
          ${row("Prénom & Nom",       `${esc(prenomEleve)} ${esc(nomEleve)}`)}
          ${row("Date de naissance",  esc(dateNaissance))}
          ${row("Sexe",               sexe === "masculin" ? "Masculin" : "Féminin")}
          ${row("Nationalité",        esc(nationalite))}
          ${row("École actuelle",     esc(ecoleActuelle))}
        `)}

        ${section("Parents", `
          ${row("Père",      [esc(nomPere), esc(professionPere)].filter(Boolean).join(" · "))}
          ${row("Tél. père", esc(telephonePere))}
          ${row("Mère",      [esc(nomMere), esc(professionMere)].filter(Boolean).join(" · "))}
          ${row("Tél. mère", esc(telephoneMere))}
          ${row("Email",     `<a href="mailto:${esc(emailPrincipal)}" style="color:#960018">${esc(emailPrincipal)}</a>`)}
          ${row("WhatsApp",  esc(whatsapp))}
        `)}

        ${section("Adresse", `
          ${row("Quartier", esc(quartier))}
          ${row("Ville",    esc(ville))}
          ${row("Pays",     esc(pays))}
        `)}

        ${section("Options", `
          ${row("Cantine",          esc(CANTINE_LBL[cantine] ?? cantine))}
          ${row("Études dirigées",  etudesDirigees ? "Oui" : "Non")}
          ${row("Transport",        transport ? "Oui" : "Non")}
          ${row("Pack fournitures", packFournitures ? "Oui" : "Non")}
          ${tailleUniforme
            ? row("Tenue scolaire", `Taille ${esc(tailleUniforme)}${packCompletUniforme ? " · pack complet" : ""}`)
            : ""}
        `)}

        <div style="margin-bottom:24px">
          <h3 style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
                     color:#999;margin:0 0 8px">Documents (${docs.length})</h3>
          <div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:0 16px">
            ${docsHtml}
          </div>
        </div>

        <p style="color:#bbb;font-size:11px;margin-top:32px">
          Demande soumise le ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Dakar" })} (heure Dakar)
        </p>
      </div>
    `;

    /* ── Send email ── */
    const { error } = await resend.emails.send({
      from:    FROM,
      to:      TO,
      replyTo: String(emailPrincipal),
      subject: `[Montagne Rouge] Dossier inscription — ${String(prenomEleve)} ${String(nomEleve)} — ${String(classeDemandee)}`,
      html,
    });

    if (error) {
      console.error("[inscriptions/submit] resend error:", error);
      return Response.json({ ok: false, error: "Erreur d'envoi." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[inscriptions/submit] unexpected error:", err);
    return Response.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
