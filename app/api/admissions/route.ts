import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[Admissions] New contact request:", {
      nomParent: body.nomParent,
      telephone: body.telephone,
      niveau:    body.niveau,
      message:   body.message ?? "(none)",
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
