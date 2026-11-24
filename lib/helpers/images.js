/** مصادر الصور (تجريبية) — استبدلها بصورك عند ربط البيانات الحقيقية. */

/** صورة عشوائية ثابتة حسب `seed` (picsum). */
export const img = (seed, w = 900, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** صورة شخصية تجريبية. */
export const avatar = (n) => `https://i.pravatar.cc/300?img=${n}`;

/** شعار فريق أوروبي (api-sports). */
export const teamLogo = (id) =>
  `https://media.api-sports.io/football/teams/${id}.png`;

/** شعار مسابقة (api-sports). */
export const leagueLogo = (id) =>
  `https://media.api-sports.io/football/leagues/${id}.png`;

/** شعار الموقع. */
export const BRAND_LOGO = "/logos/logo.png";
export const BRAND_LOGO_WHITE = "/logos/logo-white.png";
