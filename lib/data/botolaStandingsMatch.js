/** مطابقة أسماء الأندية مع صفوف جدول الترتيب (هسبورت / DEFAULT_BOTOLA_STANDINGS). */

export function normalizeTeamLabel(s) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

/** تطبيع خفيف لزيادة تطابق أسماء العربية (إ/أ/آ، ة/ه، ى/ي). */
function looseArabicKey(s) {
  return normalizeTeamLabel(s)
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

export function rowMatchesNames(rowTeam, names) {
  if (!names?.length) return false;
  const t = normalizeTeamLabel(rowTeam);
  const tLoose = looseArabicKey(rowTeam);
  for (const n of names) {
    const x = normalizeTeamLabel(n);
    if (!x) continue;
    if (t === x || t.includes(x) || x.includes(t)) return true;
    const xLoose = looseArabicKey(n);
    if (
      tLoose &&
      xLoose &&
      (tLoose === xLoose || tLoose.includes(xLoose) || xLoose.includes(tLoose))
    ) {
      return true;
    }
  }
  return false;
}

/** أسماء إضافية عندما لا يطابق اسم السجل صيغة جدول الترتيب. */
const STANDING_LABELS_BY_SLUG = {
  "olympique-dcheira": ["Olympique Dcheïra"],
  "hassania-agadir": ["حسنية أكادير"],
  "kawkab-marrakech": ["الكوكب المراكشي"],
  "union-yaacoub-el-mansour": ["Yacoub El Mansour"],
};

function clubNameCandidates(club) {
  if (!club) return [];
  const extra = STANDING_LABELS_BY_SLUG[club.slug] ?? [];
  const raw = [...extra, club.name, club.shortName, club.nameAr].filter(
    Boolean,
  );
  return [...new Set(raw.map(normalizeTeamLabel).filter(Boolean))];
}

/**
 * أول صف في `rows` يطابق أسماء النادي.
 * @param {Array<{ team: string }>} rows
 * @param {{ name?: string, shortName?: string, nameAr?: string }} club
 */
export function findStandingRowForClub(rows, club) {
  if (!Array.isArray(rows) || !rows.length || !club) return null;
  const names = clubNameCandidates(club);
  if (!names.length) return null;
  for (const row of rows) {
    if (row?.team && rowMatchesNames(row.team, names)) return row;
  }
  return null;
}
