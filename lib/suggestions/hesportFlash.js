/**
 * Parse Hesport homepage HTML for the «فلاش رياضي» widget (`ul.h24`).
 * Works in Node and the browser (no DOM dependency).
 */

/** @typedef {{
 *   url: string;
 *   title: string;
 *   headline: string;
 *   timeLabel: string;
 *   slug: string | null;
 *   articleId: string | null;
 * }} HesportFlashArticle */

export function decodeHtmlEntities(text) {
  if (text == null || text === "") return "";
  return String(text)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function extractArticleIdFromUrl(url) {
  const m = String(url).match(/-(\d+)\.html(?:\?.*)?$/i);
  return m ? m[1] : null;
}

function extractSlugFromUrl(url) {
  try {
    const pathname = new URL(url, "https://www.hesport.com").pathname;
    const file = pathname.split("/").pop() || "";
    const base = file.replace(/\.html$/i, "");
    if (!base) return null;
    try {
      return decodeURIComponent(base);
    } catch {
      return base;
    }
  } catch {
    return null;
  }
}

/**
 * @param {string} html — full page or fragment containing `<ul class="h24">…</ul>`
 * @returns {HesportFlashArticle[]}
 */
export function parseHesportFlashArticles(html) {
  if (!html || typeof html !== "string") return [];

  const ulMatch = html.match(
    /<ul[^>]*\bclass=["'][^"']*\bh24\b[^"']*["'][^>]*>([\s\S]*?)<\/ul>/i,
  );
  if (!ulMatch) return [];

  const inner = ulMatch[1];
  const items = [];
  const liBlocks = inner.match(/<li[^>]*>[\s\S]*?<\/li>/gi) || [];

  for (const block of liBlocks) {
    const aOpen = block.match(/<a\s+([^>]+)>/i);
    if (!aOpen) continue;
    const attrs = aOpen[1];
    const hrefM = attrs.match(/\bhref="([^"]+)"/i);
    const titleM = attrs.match(/\btitle="([^"]*)"/i);
    if (!hrefM) continue;

    const url = hrefM[1];
    const titleAttr = titleM ? titleM[1] : "";

    const timeM = block.match(
      /<span[^>]*class="time-label"[^>]*>([^<]*)<\/span>/i,
    );
    const h3M = block.match(/<h3>([^<]*)<\/h3>/i);

    items.push({
      url,
      title: decodeHtmlEntities(titleAttr),
      timeLabel: timeM ? timeM[1].trim() : "",
      headline: h3M ? decodeHtmlEntities(h3M[1].trim()) : "",
      slug: extractSlugFromUrl(url),
      articleId: extractArticleIdFromUrl(url),
    });
  }

  return items;
}

/**
 * @param {HesportFlashArticle[]} articles
 * @param {{ sourceUrl?: string; fetchedAt?: Date }} [opts]
 */
export function buildHesportFlashSnapshot(articles, opts = {}) {
  const fetchedAt = opts.fetchedAt ?? new Date();
  const sourceUrl = opts.sourceUrl ?? "https://www.hesport.com/";

  const y = fetchedAt.getFullYear();
  const mo = String(fetchedAt.getMonth() + 1).padStart(2, "0");
  const d = String(fetchedAt.getDate()).padStart(2, "0");
  const dateKey = `${y}-${mo}-${d}`;

  return {
    site: "hesport.com",
    siteName: "Hesport",
    siteNameAr: "هسبورت",
    widgetTitle: "فلاش رياضي",
    widgetCategoryUrl: "https://www.hesport.com/akhbar",
    sourceUrl,
    fetchedAt: fetchedAt.toISOString(),
    fetchedDate: dateKey,
    fetchedAtLocaleAr: fetchedAt.toLocaleString("ar-MA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    count: articles.length,
    articles,
  };
}
