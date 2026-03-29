import { TRENDING_ORDER } from "../newsData";

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchNewsByCategory(category) {
  await delay();
  const data = await fetchJson(
    `/api/cms/articles?category=${encodeURIComponent(category)}`,
  );
  return data.articles ?? [];
}

export async function fetchArticleBySlug(slug) {
  await delay();
  const data = await fetchJson(
    `/api/cms/articles?slug=${encodeURIComponent(slug)}`,
  );
  return data.article ?? null;
}

export async function fetchTrendingNews() {
  await delay();
  const data = await fetchJson("/api/cms/articles?trending=1");
  return data.articles ?? [];
}

export async function fetchVarietyNews() {
  await delay();
  const data = await fetchJson("/api/cms/articles?variety=1");
  return data.articles ?? [];
}

/** قائمة كاملة للهيرو والصفحة الرئيسية */
export async function fetchAllArticles() {
  await delay();
  const data = await fetchJson("/api/cms/articles");
  return data.articles ?? [];
}

export async function fetchArticlesBySiteCategory(siteSlug) {
  await delay();
  const data = await fetchJson(
    `/api/cms/articles?siteCategory=${encodeURIComponent(siteSlug)}`,
  );
  return data.articles ?? [];
}

export const queryKeys = {
  news: (category) => ["news", category],
  article: (slug) => ["article", slug],
  trending: () => ["news", "trending"],
  variety: () => ["news", "variety"],
  allArticles: () => ["news", "all"],
  siteCategory: (slug) => ["news", "site", slug],
};

export { TRENDING_ORDER };
