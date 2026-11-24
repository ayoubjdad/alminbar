/**
 * المباريات — بيانات تجريبية ثابتة.
 * البطولة: `home` / `away` = slug النادي (من `clubs.js`).
 * الدوريات الأوروبية: `home` / `away` = [الاسم، معرّف الشعار api-sports].
 * `status`: "finished" | "live" | "upcoming" — `score` = [المستضيف، الضيف].
 * مباريات اليوم المهمة: `important: true` + `channel` (القناة) + `period` (للمباريات الجارية:
 *   "الشوط 1" | "استراحة" | "الشوط 2") + `minute` اختياري.
 */

/** «اليوم» في البيانات الثابتة — عند ربط API استعمل تاريخ اليوم الحقيقي. */
export const TODAY = "2026-11-23";
export const MATCHES = [
  /* ---------- البطولة — الجولة 15 (نتائج) ---------- */
  { id: "b15-1", competition: "botola", round: "الجولة 15", date: "2026-11-22", time: "20:00", home: "raja-club-athletic", away: "fus-rabat", status: "finished", score: [2, 0] },
  { id: "b15-2", competition: "botola", round: "الجولة 15", date: "2026-11-22", time: "18:00", home: "as-far-rabat", away: "olympic-safi", status: "finished", score: [3, 1] },
  { id: "b15-3", competition: "botola", round: "الجولة 15", date: "2026-11-22", time: "16:00", home: "wydad-casablanca", away: "nahda-zemamra", status: "finished", score: [1, 1] },
  { id: "b15-4", competition: "botola", round: "الجولة 15", date: "2026-11-21", time: "20:00", home: "maghreb-fes", away: "union-touarga", status: "finished", score: [2, 1] },
  { id: "b15-5", competition: "botola", round: "الجولة 15", date: "2026-11-21", time: "18:00", home: "rs-berkane", away: "hassania-agadir", status: "finished", score: [1, 0] },
  { id: "b15-6", competition: "botola", round: "الجولة 15", date: "2026-11-21", time: "16:00", home: "cod-meknes", away: "olympique-dcheira", status: "finished", score: [0, 0] },
  { id: "b15-7", competition: "botola", round: "الجولة 15", date: "2026-11-20", time: "20:00", home: "dhj-el-jadida", away: "ittihad-tanger", status: "finished", score: [1, 2] },
  { id: "b15-8", competition: "botola", round: "الجولة 15", date: "2026-11-20", time: "18:00", home: "kawkab-marrakech", away: "union-yaacoub-el-mansour", status: "finished", score: [2, 2] },

  /* ---------- البطولة — الجولة 16 (قادمة) ---------- */
  { id: "b16-1", competition: "botola", round: "الجولة 16", date: "2026-11-29", time: "20:00", home: "wydad-casablanca", away: "raja-club-athletic", status: "upcoming" },
  { id: "b16-2", competition: "botola", round: "الجولة 16", date: "2026-11-29", time: "18:00", home: "olympic-safi", away: "maghreb-fes", status: "upcoming" },
  { id: "b16-3", competition: "botola", round: "الجولة 16", date: "2026-11-29", time: "16:00", home: "fus-rabat", away: "as-far-rabat", status: "upcoming" },
  { id: "b16-4", competition: "botola", round: "الجولة 16", date: "2026-11-28", time: "20:00", home: "hassania-agadir", away: "cod-meknes", status: "upcoming" },
  { id: "b16-5", competition: "botola", round: "الجولة 16", date: "2026-11-28", time: "18:00", home: "ittihad-tanger", away: "rs-berkane", status: "upcoming" },
  { id: "b16-6", competition: "botola", round: "الجولة 16", date: "2026-11-28", time: "16:00", home: "union-touarga", away: "dhj-el-jadida", status: "upcoming" },
  { id: "b16-7", competition: "botola", round: "الجولة 16", date: "2026-11-27", time: "20:00", home: "olympique-dcheira", away: "kawkab-marrakech", status: "upcoming" },
  { id: "b16-8", competition: "botola", round: "الجولة 16", date: "2026-11-27", time: "18:00", home: "union-yaacoub-el-mansour", away: "nahda-zemamra", status: "upcoming" },

  /* ---------- مباريات اليوم المهمة (23 نونبر) ---------- */
  { id: "t-1", important: true, competition: "premier-league", round: "الجولة 12", date: "2026-11-23", time: "20:00", home: ["برينتفورد", 55], away: ["إيفرتون", 45], status: "live", period: "الشوط 1", minute: 34, score: [2, 0], channel: "beIN SPORTS 1" },
  { id: "t-2", important: true, competition: "la-liga", round: "الجولة 12", date: "2026-11-23", time: "20:00", home: ["ليفانتي", 539], away: ["إلتشي", 797], status: "live", period: "الشوط 1", minute: 28, score: [0, 0], channel: "beIN SPORTS 3" },
  { id: "t-3", important: true, competition: "serie-a", round: "الجولة 12", date: "2026-11-23", time: "19:30", home: ["تورينو", 503], away: ["فيورنتينا", 502], status: "live", period: "استراحة", score: [1, 0], channel: "beIN SPORTS 4" },
  { id: "t-4", important: true, competition: "botola", round: "مباراة مؤجلة", date: "2026-11-23", time: "19:00", home: "as-far-rabat", away: "maghreb-fes", status: "live", period: "الشوط 2", minute: 71, score: [1, 1], channel: "الرياضية" },
  { id: "t-5", important: true, competition: "botola", round: "مباراة مؤجلة", date: "2026-11-23", time: "21:00", home: "rs-berkane", away: "kawkab-marrakech", status: "upcoming", channel: "الرياضية" },
  { id: "t-6", important: true, competition: "ligue-1", round: "الجولة 12", date: "2026-11-23", time: "21:05", home: ["نيس", 84], away: ["رين", 94], status: "upcoming", channel: "beIN SPORTS 5" },
  { id: "t-7", important: true, competition: "bundesliga", round: "الجولة 12", date: "2026-11-23", time: "17:30", home: ["فرايبورغ", 160], away: ["ماينتس", 164], status: "finished", score: [2, 1], channel: "beIN SPORTS 2" },

  /* ---------- الدوريات الأوروبية ---------- */
  { id: "pl-1", competition: "premier-league", round: "الجولة 12", date: "2026-11-22", time: "18:30", home: ["تشيلسي", 49], away: ["أرسنال", 42], status: "finished", score: [2, 1] },
  { id: "pl-2", competition: "premier-league", round: "الجولة 12", date: "2026-11-22", time: "16:00", home: ["ليفربول", 40], away: ["مانشستر سيتي", 50], status: "finished", score: [1, 1] },
  { id: "pl-3", competition: "premier-league", round: "الجولة 13", date: "2026-11-29", time: "17:30", home: ["مانشستر يونايتد", 33], away: ["أستون فيلا", 66], status: "upcoming" },
  { id: "ll-1", competition: "la-liga", round: "الجولة 12", date: "2026-11-22", time: "21:00", home: ["ريال مدريد", 541], away: ["إشبيلية", 536], status: "finished", score: [3, 0] },
  { id: "ll-2", competition: "la-liga", round: "الجولة 13", date: "2026-11-29", time: "21:00", home: ["برشلونة", 529], away: ["أتلتيكو مدريد", 530], status: "upcoming" },
  { id: "sa-1", competition: "serie-a", round: "الجولة 12", date: "2026-11-22", time: "20:45", home: ["ميلان", 489], away: ["نابولي", 492], status: "finished", score: [1, 0] },
  { id: "sa-2", competition: "serie-a", round: "الجولة 13", date: "2026-11-30", time: "20:45", home: ["إنتر ميلان", 505], away: ["يوفنتوس", 496], status: "upcoming" },
  { id: "bl-1", competition: "bundesliga", round: "الجولة 12", date: "2026-11-21", time: "20:30", home: ["بايرن ميونخ", 157], away: ["بوروسيا دورتموند", 165], status: "finished", score: [4, 2] },
  { id: "bl-2", competition: "bundesliga", round: "الجولة 13", date: "2026-11-28", time: "15:30", home: ["باير ليفركوزن", 168], away: ["لايبزيغ", 173], status: "upcoming" },
  { id: "l1-1", competition: "ligue-1", round: "الجولة 12", date: "2026-11-22", time: "20:45", home: ["ليل", 79], away: ["مارسيليا", 81], status: "finished", score: [2, 2] },
  { id: "l1-2", competition: "ligue-1", round: "الجولة 13", date: "2026-11-30", time: "20:45", home: ["باريس سان جيرمان", 85], away: ["موناكو", 91], status: "upcoming" },
];
