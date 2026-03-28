import { CLUBS } from "./staticData/clubs";

/** أندية مغربية — مصدر واحد مع `lib/staticData/clubs.js` */
export const MOROCCAN_CLUBS = CLUBS;

export function getClubBySlug(slug) {
  return MOROCCAN_CLUBS.find((c) => c.slug === slug) ?? null;
}

export function getAllClubSlugs() {
  return MOROCCAN_CLUBS.map((c) => c.slug);
}
