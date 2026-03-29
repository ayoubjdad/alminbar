/** تحويل نص الفقرات من المحرر إلى مصفوفة جاهزة للـ API */
export function parseBodyFromEditorText(text) {
  if (!text || typeof text !== "string") return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function slugifyTitle(title) {
  const t = (title || "").trim();
  const latin = t
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  if (latin.length >= 3) return latin.slice(0, 80);
  return `post-${Date.now()}`;
}
