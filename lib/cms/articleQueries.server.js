import "server-only";
import {
  getMergedArticlesServer,
  isDraftArticle,
} from "./getMergedArticlesServer";
import { inferSiteCategory } from "./inferSiteCategory";

export function getArticlesBySiteCategoryServer(siteSlug) {
  return getMergedArticlesServer().filter(
    (a) =>
      !isDraftArticle(a) && inferSiteCategory(a) === siteSlug,
  );
}

export function getArticlesByClubServer(clubSlug) {
  return getMergedArticlesServer().filter(
    (a) =>
      !isDraftArticle(a) &&
      (a.clubSlug === clubSlug ||
        (Array.isArray(a.linkedClubs) && a.linkedClubs.includes(clubSlug))),
  );
}
