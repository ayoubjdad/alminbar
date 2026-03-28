import {
  getArticleBySlug,
  getArticlesByCategory,
  getTrendingArticles,
  getVarietyArticles,
} from "../newsData";

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchNewsByCategory(category) {
  await delay();
  return getArticlesByCategory(category);
}

export async function fetchArticleBySlug(slug) {
  await delay();
  return getArticleBySlug(slug);
}

export async function fetchTrendingNews() {
  await delay();
  return getTrendingArticles();
}

export async function fetchVarietyNews() {
  await delay();
  return getVarietyArticles();
}

export const queryKeys = {
  news: (category) => ["news", category],
  article: (slug) => ["article", slug],
  trending: () => ["news", "trending"],
  variety: () => ["news", "variety"],
};
