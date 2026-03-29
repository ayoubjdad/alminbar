import userArticles from "../data/cms-user-articles.json";
import { mergeArticleLists } from "./cms/mergeArticles";
import { SEED_ARTICLES, DEFAULT_IMAGE } from "./cms/articles.seed";
import { inferSiteCategory } from "./cms/inferSiteCategory";

export { DEFAULT_IMAGE, inferSiteCategory };

/** ترتيب شريط الترند — يُستبدل لاحقاً بإعداد من الـ backend */
export const TRENDING_ORDER = [
  "casablanca-derby-preview",
  "wydad-cup-run",
  "atlas-lions-camp-march",
  "caf-cl-group-stage-morocco",
  "berkane-cup-win",
  "fes-home-form",
  "as-far-midfield",
  "ittihad-tanger-survival",
];

/** قائمة مدمجة: بذرة + `data/cms-user-articles.json` (للبناء والـ client context) */
export const ARTICLES = mergeArticleLists(SEED_ARTICLES, userArticles);

export function getArticlesBySiteCategory(slug) {
  return ARTICLES.filter((a) => inferSiteCategory(a) === slug);
}

export function getArticlesByClub(clubSlug) {
  return ARTICLES.filter(
    (a) =>
      a.clubSlug === clubSlug ||
      (Array.isArray(a.linkedClubs) && a.linkedClubs.includes(clubSlug)),
  );
}

export function getArticlesByCategory(category) {
  return ARTICLES.filter((a) => a.category === category);
}

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getAllSlugs() {
  return ARTICLES.map((a) => a.slug);
}

export function getTrendingArticles() {
  const map = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
  return TRENDING_ORDER.map((slug) => map[slug]).filter(Boolean);
}

export function getVarietyArticles() {
  return getArticlesByCategory("variety");
}
