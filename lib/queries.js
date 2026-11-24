/**
 * طبقة الوصول إلى البيانات.
 * كل الصفحات تقرأ من هنا فقط: عند ربط API/CMS لاحقًا، يكفي تعديل هذا الملف
 * (مع الحفاظ على شكل الكائنات المُرجعة).
 */
import { ARTICLES } from "./data/articles";
import { AUTHORS } from "./data/authors";
import { CATEGORIES } from "./data/categories";
import { CLUBS } from "./data/clubs";
import { MATCHES, TODAY } from "./data/matches";
import { teamLogo } from "./helpers/images";
import { routes } from "./helpers/routes";
import { STANDINGS, getStandings } from "./helpers/standings";

const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

/* ---------------- Authors / Categories / Clubs ---------------- */
const withAuthorHref = (au) => au && { ...au, href: routes.author(au.slug) };
const withCategoryHref = (c) => c && { ...c, href: routes.category(c.slug) };
const withClubHref = (c) => c && { ...c, href: routes.club(c.slug) };

export const getAuthors = () => AUTHORS.map(withAuthorHref);
export const getAuthor = (slug) =>
  withAuthorHref(AUTHORS.find((au) => au.slug === slug));

export const getCategories = () => CATEGORIES.map(withCategoryHref);
export const getCategory = (slug) =>
  withCategoryHref(CATEGORIES.find((c) => c.slug === slug));

export const getClubs = () => CLUBS.map(withClubHref);
export const getClub = (slug) => withClubHref(CLUBS.find((c) => c.slug === slug));

/* ---------------- Articles ---------------- */
function hydrate(article) {
  if (!article) return null;
  return {
    ...article,
    href: routes.article(article.slug),
    author: getAuthor(article.author),
    categoryInfo: getCategory(article.category),
    clubsInfo: article.clubs.map(getClub).filter(Boolean),
    competitionInfo: article.competition ? getStandings(article.competition) : null,
  };
}

const ALL = [...ARTICLES].sort(byDateDesc);

export const getArticles = ({ type, limit } = {}) => {
  const list = ALL.filter((x) => !type || x.type === type).map(hydrate);
  return limit ? list.slice(0, limit) : list;
};

export const getArticle = (slug) => hydrate(ARTICLES.find((x) => x.slug === slug));

export const getArticlesByCategory = (slug, limit) =>
  getArticles().filter((x) => x.category === slug).slice(0, limit);

export const getArticlesByAuthor = (slug, limit) =>
  getArticles().filter((x) => x.author?.slug === slug).slice(0, limit);

export const getArticlesByClub = (slug, limit) =>
  getArticles().filter((x) => x.clubs.includes(slug)).slice(0, limit);

export const getArticlesByCompetition = (slug, limit) =>
  getArticles().filter((x) => x.competition === slug).slice(0, limit);

export const getMostRead = (limit = 5) =>
  getArticles({ type: "article" })
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);

export const getVideos = (limit) => getArticles({ type: "video", limit });

/** مقالات ذات صلة: نفس القسم أولًا ثم نفس الأندية. */
export function getRelatedArticles(article, limit = 4) {
  return getArticles({ type: "article" })
    .filter((x) => x.slug !== article.slug)
    .map((x) => ({
      x,
      score:
        (x.category === article.category ? 2 : 0) +
        x.clubs.filter((c) => article.clubs.includes(c)).length,
    }))
    .sort((p, q) => q.score - p.score)
    .slice(0, limit)
    .map((p) => p.x);
}

/** بحث بسيط في العناوين والمقتطفات والوسوم. */
export function searchArticles(q) {
  const term = q?.trim();
  if (!term) return [];
  return getArticles().filter((x) =>
    [x.title, x.excerpt, ...x.tags].some((s) => s.includes(term))
  );
}

/* ---------------- Competitions ---------------- */
export const getCompetitions = () => STANDINGS;
export const getCompetition = (slug) => getStandings(slug);

/* ---------------- Matches ---------------- */
function team(ref) {
  if (typeof ref === "string") {
    const club = getClub(ref);
    return { name: club.nameAr, shortName: club.shortName, logo: club.logo, href: club.href, slug: club.slug };
  }
  const [name, id] = ref;
  return { name, shortName: name, logo: teamLogo(id) };
}

const hydrateMatch = (m) => ({
  ...m,
  home: team(m.home),
  away: team(m.away),
  competitionInfo: getStandings(m.competition),
});

const byKickoff = (a, b) =>
  `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`);

export const getMatches = ({ competition, club, status } = {}) =>
  MATCHES.filter(
    (m) =>
      (!competition || m.competition === competition) &&
      (!club || m.home === club || m.away === club) &&
      (!status || m.status === status)
  )
    .sort(byKickoff)
    .map(hydrateMatch);

/** النتائج الأحدث أولًا. */
export const getResults = (opts) =>
  getMatches({ ...opts, status: "finished" }).reverse();

export const getFixtures = (opts) => getMatches({ ...opts, status: "upcoming" });

const STATUS_ORDER = { live: 0, upcoming: 1, finished: 2 };

/** أهم مباريات اليوم: الجارية أولًا، ثم القادمة، ثم المنتهية. */
export const getTodayMatches = () =>
  getMatches()
    .filter((m) => m.important && m.date === TODAY)
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.time.localeCompare(b.time));
