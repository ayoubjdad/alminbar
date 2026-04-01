import "server-only";
import fs from "fs";
import path from "path";
import { mergeArticleLists } from "./mergeArticles";
import { sortArticlesByDateDesc } from "./sortArticles";
import { SEED_ARTICLES } from "./articles.seed";

const USER_PATH = path.join(process.cwd(), "data/cms-user-articles.json");

export function getMergedArticlesServer() {
  let user = [];
  try {
    if (fs.existsSync(USER_PATH)) {
      const raw = fs.readFileSync(USER_PATH, "utf8");
      const parsed = JSON.parse(raw);
      user = Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    user = [];
  }
  return sortArticlesByDateDesc(mergeArticleLists(SEED_ARTICLES, user));
}

export function isDraftArticle(a) {
  return a?.cmsMeta?.status === "draft";
}

export function getArticleBySlugServer(slug) {
  return getMergedArticlesServer().find((a) => a.slug === slug) ?? null;
}

/** للموقع العام — المسودات مخفية */
export function getArticleBySlugPublic(slug) {
  const a = getArticleBySlugServer(slug);
  if (!a || isDraftArticle(a)) return null;
  return a;
}
