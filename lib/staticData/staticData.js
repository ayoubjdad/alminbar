/** Single static snapshot of “collections” (Mongo-shaped) for the app */

import { CATEGORIES } from "../categories";
import { ARTICLES, TRENDING_ORDER } from "../newsData";
import { TAGS } from "./tags";
import { CLUBS } from "./clubs";
import {
  DEFAULT_LEAGUE_TABS,
  DEFAULT_BOTOLA_STANDINGS,
} from "../data/footballRankings";
import { STATIC_MATCHES } from "./matches";
import { SITE, buildSiteNav } from "./site";

export const staticData = {
  site: SITE,
  siteNav: buildSiteNav(CATEGORIES),
  categories: CATEGORIES,
  tags: TAGS,
  clubs: CLUBS,
  articles: ARTICLES,
  trendingOrder: TRENDING_ORDER,
  leagueTabs: DEFAULT_LEAGUE_TABS,
  botolaStandings: DEFAULT_BOTOLA_STANDINGS,
  matches: STATIC_MATCHES,
};

export function getStaticData() {
  return staticData;
}
