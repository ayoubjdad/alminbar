/** بيانات العرض — أقسام الموقع من `categories` فقط؛ باقي المحتوى من الـ API. */

import { CATEGORIES } from "../categories";
import { SITE, buildSiteNav } from "./site";

export const staticData = {
  site: SITE,
  siteNav: buildSiteNav(CATEGORIES),
  categories: CATEGORIES,
  tags: [],
  clubs: [],
  articles: [],
  trendingOrder: [],
  leagueTabs: [],
  botolaStandings: [],
  matches: [],
};

export function getStaticData() {
  return staticData;
}
