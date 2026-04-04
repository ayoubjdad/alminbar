/**
 * يوجّه المقال إلى قسم الموقع (`/category/[slug]`) — يطابق `CATEGORIES` الحالية.
 */

const SITE_CATEGORY_BY_SLUG = {
  "women-botola-roundup": "morocco",
  "transfer-window-rumors-march": "morocco",
  "frmf-calendar-update": "morocco",
  "trending-sports-governance": "morocco",
  "trending-var-discussion": "international",
};

const LEGACY_SITE_CATEGORY = {
  sports: "botola",
  society: "morocco",
  world: "international",
  politics: "morocco",
  economy: "morocco",
  tech: "international",
  culture: "morocco",
  health: "morocco",
  "main-news": "botola",
  "morocco-news": "morocco",
  "botola-news": "botola",
  "national-team": "morocco",
  "professional-players": "international",
  "voice-and-image": "matches",
  "flash-sports": "matches",
  "all-news": "botola",
};

export function inferSiteCategory(article) {
  if (article.siteCategory) {
    const s = article.siteCategory;
    return LEGACY_SITE_CATEGORY[s] ?? s;
  }
  const bySlug = SITE_CATEGORY_BY_SLUG[article.slug];
  if (bySlug) return bySlug;
  if (article.clubSlug) return "botola";
  switch (article.category) {
    case "botola":
      return "botola";
    case "national-team":
      return "morocco";
    case "caf":
      return "botola";
    case "morocco-sports":
      return "morocco";
    case "club":
      return "botola";
    case "arab-world":
      return "international";
    case "moroccan-league":
      return "botola";
    case "professionals":
      return "international";
    case "international-news":
      return "international";
    case "arab-news":
      return "morocco";
    case "variety":
      return "matches";
    case "trending":
      if (article.slug === "trending-sports-governance") return "morocco";
      if (article.slug === "trending-var-discussion") return "international";
      return "morocco";
    default:
      return "botola";
  }
}
