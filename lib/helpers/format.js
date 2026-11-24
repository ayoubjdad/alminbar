/** تنسيق التواريخ والأرقام بالعربية (المغرب). */

const DATE_FMT = new Intl.DateTimeFormat("ar-MA", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Casablanca",
});

const DAY_FMT = new Intl.DateTimeFormat("ar-MA", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "Africa/Casablanca",
});

const NUM_FMT = new Intl.NumberFormat("ar-MA");

/** "2026-11-23" → «23 نونبر 2026» */
export const formatDate = (iso) => (iso ? DATE_FMT.format(new Date(iso)) : "");

/** "2026-11-23" → «الإثنين 23 نونبر» */
export const formatDay = (iso) => (iso ? DAY_FMT.format(new Date(iso)) : "");

export const formatNumber = (n) => (n == null ? "—" : NUM_FMT.format(n));

/** فارق الأهداف بإشارة: 5 → «+5» */
export const formatGoalDiff = (gd) => (gd > 0 ? `+${gd}` : `${gd}`);

/** قيمة أو «—» */
export const orDash = (v) => (v == null || v === "" ? "—" : v);
