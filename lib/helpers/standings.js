/** بناء جداول الترتيب من البيانات الخام في `lib/data/competitions.js`. */
import { CLUBS } from "../data/clubs";
import { BOTOLA_ROWS, COMPETITIONS, EUROPEAN_ROWS } from "../data/competitions";
import { leagueLogo, teamLogo } from "./images";
import { routes } from "./routes";

const CLUB_BY_SLUG = new Map(CLUBS.map((c) => [c.slug, c]));

const toRow = ({ team, logo, href, slug }, w, d, l, gf, ga) => ({
  team,
  logo,
  href,
  slug,
  mp: w + d + l,
  won: w,
  draw: d,
  lost: l,
  goalsFor: gf,
  goalsAgainst: ga,
  gd: gf - ga,
  pts: w * 3 + d,
});

function rawRows(slug) {
  if (slug === "botola") {
    return BOTOLA_ROWS.map(([clubSlug, , ...stats]) => {
      const club = CLUB_BY_SLUG.get(clubSlug);
      return toRow(
        {
          team: club.nameAr,
          logo: club.logo,
          href: routes.club(club.slug),
          slug: club.slug,
        },
        ...stats
      );
    });
  }
  return (EUROPEAN_ROWS[slug] ?? []).map(([team, id, ...stats]) =>
    toRow({ team, logo: teamLogo(id) }, ...stats)
  );
}

function zoneFor(rank, total, zones) {
  if (rank <= zones.ucl) return "ucl";
  if (rank <= zones.uel) return "uel";
  if (rank > total - zones.relegation) return "relegation";
  return null;
}

const DEFAULT_ZONE_LABELS = {
  ucl: "دوري الأبطال",
  uel: "مسابقات قارية",
  relegation: "الهبوط",
};

function build(meta) {
  const sorted = rawRows(meta.slug).sort(
    (a, b) =>
      b.pts - a.pts ||
      b.gd - a.gd ||
      b.goalsFor - a.goalsFor ||
      a.team.localeCompare(b.team, "ar")
  );
  return {
    ...meta,
    logo: leagueLogo(meta.leagueLogoId),
    href: routes.competition(meta.slug),
    zoneLabels: meta.zoneLabels ?? DEFAULT_ZONE_LABELS,
    rows: sorted.map((r, i) => ({
      ...r,
      rank: i + 1,
      zone: zoneFor(i + 1, sorted.length, meta.zones),
    })),
  };
}

/** كل المسابقات مع جداولها المرتّبة (تُحسب مرة واحدة). */
export const STANDINGS = COMPETITIONS.map(build);

export const getStandings = (slug) =>
  STANDINGS.find((s) => s.slug === slug) ?? null;

/** صفّ نادٍ في ترتيب البطولة. */
export const getClubStanding = (clubSlug) =>
  getStandings("botola")?.rows.find((r) => r.slug === clubSlug) ?? null;
