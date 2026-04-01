import { appendDismissedKey } from "../../../../lib/suggestions/dismissedStore";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const key = typeof body?.key === "string" ? body.key.trim() : "";
  if (!key) {
    return Response.json({ ok: false, error: "key required" }, { status: 400 });
  }

  appendDismissedKey(key);
  return Response.json({ ok: true });
}
