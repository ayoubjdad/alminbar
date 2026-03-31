/**
 * Helpers for ordering merged suggestion rows by real clock time.
 */

/** Arabic-Indic (٠١٢…) and Persian (۰۱…) → ASCII digits. */
export function normalizeDigitsForParse(s) {
  if (s == null || s === "") return "";
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  let out = String(s);
  for (let i = 0; i < 10; i++) {
    out = out.split(arabic[i]).join(String(i));
    out = out.split(persian[i]).join(String(i));
  }
  return out;
}

/**
 * Hesport «فلاش» time label (often HH:mm, sometimes Arabic digits) + reference day.
 */
export function hesportTimeLabelToMs(timeLabel, refDate) {
  if (!(refDate instanceof Date) || Number.isNaN(refDate.getTime())) return 0;
  const normalized = normalizeDigitsForParse(timeLabel);
  const m = normalized.match(/(\d{1,2}):(\d{2})/);
  if (!m) return refDate.getTime();
  const d = new Date(refDate);
  d.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
  return d.getTime();
}

/**
 * Elbotola `<time data-value="…">` — often `YYYY-MM-DD HH:mm…+0000` (space, not `T`).
 */
export function elbotolaPublishedRawToMs(publishedAtRaw) {
  if (!publishedAtRaw) return 0;
  let s = String(publishedAtRaw).trim();
  if (/^\d{4}-\d{2}-\d{2}\s+\d/.test(s)) {
    s = s.replace(/^(\d{4}-\d{2}-\d{2})\s+/, "$1T");
  }
  s = s.replace(/\s*\+0000\s*$/, "Z");
  let t = Date.parse(s);
  if (!Number.isNaN(t)) return t;
  s = String(publishedAtRaw).trim();
  if (/^\d{4}-\d{2}-\d{2}\s+\d/.test(s)) {
    s = s.replace(/^(\d{4}-\d{2}-\d{2})\s+/, "$1T");
  }
  t = Date.parse(s);
  return Number.isNaN(t) ? 0 : t;
}
