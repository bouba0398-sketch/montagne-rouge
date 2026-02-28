import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO   = "bouba0398@gmail.com";
const FROM = "Montagne Rouge <onboarding@resend.dev>";

/* ── Rate limiting (in-memory, resets on server restart) ── */
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT     = 5;
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

export async function POST(req: Request) {
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

    /* ── Honeypot — silently succeed to avoid leaking detection ── */
    if (body.hp) {
      return Response.json({ ok: true });
    }

    const nom     = (body.nom     ?? "").trim();
    const email   = (body.email   ?? "").trim();
    const message = (body.message ?? "").trim();

    /* ── Validation ── */
    if (!nom || !email || !message) {
      return Response.json(
        { ok: false, error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return Response.json(
        { ok: false, error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return Response.json(
        { ok: false, error: "Message trop court." },
        { status: 400 }
      );
    }

    /* ── Send ── */
    const { error } = await resend.emails.send({
      from:    FROM,
      to:      TO,
      replyTo: email,
      subject: `[Montagne Rouge] Nouveau message - ${nom}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#960018;margin-bottom:4px">Nouveau message — Montagne Rouge</h2>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p><strong>Nom :</strong> ${escHtml(nom)}</p>
          <p><strong>Email :</strong> <a href="mailto:${escHtml(email)}">${escHtml(email)}</a></p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap;color:#333">${escHtml(message)}</p>
        </div>
      `,
      text: `Nom: ${nom}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return Response.json({ ok: false, error: "Erreur d'envoi." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return Response.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

function escHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
