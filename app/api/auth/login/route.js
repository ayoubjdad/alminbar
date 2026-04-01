import { cookies } from "next/headers";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const expected = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.DASHBOARD_SESSION_SECRET;

  if (!expected || !secret) {
    return Response.json(
      { error: "لوحة التحرير غير مُهيأة (متغيرات البيئة)." },
      { status: 503 },
    );
  }

  const password = typeof body?.password === "string" ? body.password : "";
  if (password !== expected) {
    return Response.json({ error: "كلمة المرور غير صحيحة." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("dashboard_auth", secret, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return Response.json({ ok: true });
}
