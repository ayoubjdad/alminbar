import { CLUBS } from "./staticData/clubs";

/** أندية مغربية — مصدر واحد مع `lib/staticData/clubs.js` */

const DEMO_RANKING = {
  leagueRank: 8,
  points: 32,
  played: 22,
  won: 9,
  draw: 5,
  lost: 8,
  goalsFor: 28,
  goalsAgainst: 26,
};

function cityForSlug(slug) {
  if (slug === "raja-club-athletic" || slug.includes("casablanca")) {
    return "الدار البيضاء";
  }
  if (slug.includes("fes")) return "فاس";
  if (slug.includes("rabat") || slug.includes("touarga")) return "الرباط";
  if (slug.includes("meknes")) return "مكناس";
  if (slug.includes("berkane")) return "بركان";
  if (slug.includes("jadidi")) return "الجديدة";
  if (slug.includes("marrakech")) return "مراكش";
  if (slug.includes("tanger")) return "طنجة";
  if (slug.includes("dagadir")) return "أكادير";
  if (slug.includes("safi")) return "آسفي";
  if (slug.includes("zemamra")) return "الزمامرة";
  if (slug.includes("yacoub")) return "الرباط";
  if (slug.includes("dcheira")) return "الدار البيضاء";
  return "المغرب";
}

function enrichClub(raw) {
  if (!raw) return null;
  return {
    ...raw,
    logo:
      raw.logo ??
      `https://img.sofascore.com/api/v1/team/${raw.id}/image`,
    city: raw.city ?? cityForSlug(raw.slug),
    ranking: raw.ranking ?? DEMO_RANKING,
  };
}

export const MOROCCAN_CLUBS = CLUBS;

export function getClubBySlug(slug) {
  const raw = MOROCCAN_CLUBS.find((c) => c.slug === slug) ?? null;
  return enrichClub(raw);
}

export function getAllClubSlugs() {
  return MOROCCAN_CLUBS.map((c) => c.slug);
}
