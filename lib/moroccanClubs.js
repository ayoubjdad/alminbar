import fs from "fs";
import path from "path";
import { CLUBS } from "./staticData/clubs";

const REGISTRY_PATH = path.join(process.cwd(), "data/cms-registry.json");

function readRegistryClubs() {
  try {
    if (!fs.existsSync(REGISTRY_PATH)) return [];
    const raw = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    return Array.isArray(raw.clubs) ? raw.clubs : [];
  } catch {
    return [];
  }
}

function mergedClubs() {
  const reg = readRegistryClubs();
  const map = new Map();
  for (const c of CLUBS) {
    if (c?.slug) map.set(c.slug, c);
  }
  for (const c of reg) {
    if (c?.slug) {
      const prev = map.get(c.slug);
      map.set(c.slug, { ...prev, ...c });
    }
  }
  return [...map.values()];
}

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
  const logo =
    raw.logo ??
    (raw.id != null
      ? `https://img.sofascore.com/api/v1/team/${raw.id}/image`
      : undefined);
  return {
    ...raw,
    name: raw.name ?? raw.nameAr ?? raw.slug,
    shortName: raw.shortName ?? raw.nameAr ?? raw.name ?? raw.slug,
    logo,
    city: raw.city ?? cityForSlug(raw.slug),
    ranking: raw.ranking ?? DEMO_RANKING,
  };
}

export const MOROCCAN_CLUBS = mergedClubs();

export function getClubBySlug(slug) {
  const raw = mergedClubs().find((c) => c.slug === slug) ?? null;
  return enrichClub(raw);
}

export function getAllClubSlugs() {
  return mergedClubs().map((c) => c.slug);
}
