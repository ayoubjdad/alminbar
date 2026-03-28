export { staticData, getStaticData } from "./staticData";
export { StaticDataProvider, useStaticData } from "./StaticDataContext";
export { TAGS } from "./tags";
export { CLUBS } from "./clubs";
export { STATIC_MATCHES } from "./matches";
export { SITE, buildSiteNav } from "./site";

export {
  DEFAULT_IMAGE,
  inferSiteCategory,
  getArticlesBySiteCategory,
  getArticlesByClub,
  getArticlesByCategory,
  getArticleBySlug,
  getAllSlugs,
  getTrendingArticles,
  getVarietyArticles,
  TRENDING_ORDER,
} from "../newsData";

export {
  CATEGORIES,
  getCategoryBySlug,
  getAllCategorySlugs,
} from "../categories";

export {
  MOROCCAN_CLUBS,
  getClubBySlug,
  getAllClubSlugs,
} from "../moroccanClubs";

export {
  DEFAULT_LEAGUE_TABS,
  DEFAULT_BOTOLA_STANDINGS,
  DEFAULT_TOP_FIVE_LEAGUES,
} from "../data/footballRankings";
