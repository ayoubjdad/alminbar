/**
 * Parse Elbotola homepage HTML for the «كرونو» widget (`ul.latest-chrono-list`).
 */

import { decodeHtmlEntities } from "./hesportFlash";
import {
  elbotolaPublishedRawToMs,
  hesportTimeLabelToMs,
} from "./timeSort";

export function normalizeElbotolaUrl(href) {
  if (!href || typeof href !== "string") return href;
  try {
    return new URL(href, "https://www.elbotola.com/").href;
  } catch {
    return href;
  }
}

function extractTimeLabelFromDataValue(dataValue) {
  if (!dataValue) return "";
  const m = String(dataValue).trim().match(/\d{4}-\d{2}-\d{2}\s+(\d{1,2}:\d{2})/);
  return m ? m[1] : "";
}

function detectKind(url) {
  const u = String(url);
  if (u.includes("/video/details/")) return "video";
  return "article";
}

function extractSlugOrId(url) {
  try {
    const pathname = new URL(url, "https://www.elbotola.com/").pathname;
    if (pathname.includes("/video/details/")) {
      const parts = pathname.split("/").filter(Boolean);
      const idx = parts.indexOf("details");
      return idx >= 0 && parts[idx + 1] ? parts[idx + 1] : null;
    }
    const file = pathname.split("/").pop() || "";
    return file.replace(/\.html$/i, "") || null;
  } catch {
    return null;
  }
}

/**
 * @param {string} html
 * @returns {Array<{
 *   url: string;
 *   headline: string;
 *   timeLabel: string;
 *   publishedAtRaw: string | null;
 *   kind: 'article' | 'video';
 *   slugOrId: string | null;
 * }>}
 */
export function parseElbotolaChrono(html) {
  if (!html || typeof html !== "string") return [];

  const ulMatch = html.match(
    /<ul[^>]*\bclass=["'][^"']*\blatest-chrono-list\b[^"']*["'][^>]*>([\s\S]*?)<\/ul>/i,
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
    if (!hrefM) continue;

    const url = normalizeElbotolaUrl(hrefM[1]);
    const timeData = block.match(
      /<time[^>]*\bdata-value="([^"]*)"[^>]*>/i,
    );
    const timeDatetime = block.match(
      /<time[^>]*\bdatetime="([^"]+)"[^>]*>/i,
    );
    const publishedAtRaw = timeData
      ? timeData[1].trim()
      : timeDatetime
        ? timeDatetime[1].trim()
        : null;
    const timeLabel =
      extractTimeLabelFromDataValue(publishedAtRaw) ||
      (publishedAtRaw ? publishedAtRaw.slice(0, 16) : "");

    const h3M = block.match(/<h3>([^<]*)<\/h3>/i);
    const headline = h3M ? decodeHtmlEntities(h3M[1].trim()) : "";

    items.push({
      url,
      headline,
      title: headline,
      timeLabel,
      publishedAtRaw,
      kind: detectKind(url),
      slugOrId: extractSlugOrId(url),
    });
  }

  return items;
}

/**
 * @param {ReturnType<typeof parseElbotolaChrono>} items
 * @param {{ sourceUrl?: string; fetchedAt?: Date }} [opts]
 */
export function buildElbotolaChronoSnapshot(items, opts = {}) {
  const fetchedAt = opts.fetchedAt ?? new Date();
  const sourceUrl = opts.sourceUrl ?? "https://www.elbotola.com/";

  const y = fetchedAt.getFullYear();
  const mo = String(fetchedAt.getMonth() + 1).padStart(2, "0");
  const d = String(fetchedAt.getDate()).padStart(2, "0");
  const dateKey = `${y}-${mo}-${d}`;

  return {
    site: "elbotola.com",
    siteName: "Elbotola",
    siteNameAr: "البطولة",
    widgetTitle: "كرونو",
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
    count: items.length,
    articles: items,
  };
}

/**
 * Merge Hesport + Elbotola items for a single list (each entry tagged by source).
 * @param {import('./hesportFlash').HesportFlashArticle[]} hesport
 * @param {ReturnType<typeof parseElbotolaChrono>} elbotola
 * @param {{ hesportFetchedAt?: Date }} [opts]
 */
export function mergeSuggestionSources(hesport, elbotola, opts = {}) {
  const ref =
    opts.hesportFetchedAt instanceof Date
      ? opts.hesportFetchedAt
      : new Date();

  const fromHesport = hesport.map((s) => ({
    source: "hesport",
    sourceLabel: "هسبورت",
    widget: "فلاش رياضي",
    url: s.url,
    headline: s.headline || s.title,
    title: s.title,
    timeLabel: s.timeLabel,
    kind: "article",
    slugOrId: s.slug ?? s.articleId,
    sortAt: hesportTimeLabelToMs(s.timeLabel, ref),
  }));

  const fromElbotola = elbotola.map((s) => ({
    source: "elbotola",
    sourceLabel: "البطولة",
    widget: "كرونو",
    url: s.url,
    headline: s.headline,
    title: s.title,
    timeLabel: s.timeLabel,
    kind: s.kind,
    slugOrId: s.slugOrId,
    publishedAtRaw: s.publishedAtRaw,
    sortAt: elbotolaPublishedRawToMs(s.publishedAtRaw),
  }));

  return [...fromHesport, ...fromElbotola];
}

/** Newest first (typical for news wires); stable when timestamps tie. */
export function sortSuggestionsByDateDesc(rows) {
  return [...rows].sort((a, b) => {
    const tb = b.sortAt || 0;
    const ta = a.sortAt || 0;
    if (tb !== ta) return tb - ta;
    return String(a.url || "").localeCompare(String(b.url || ""));
  });
}
