/**
 * Parse «مباريات اليوم» from Elbotola homepage (`#js_important_today`).
 */

import { decodeHtmlEntities } from "./hesportFlash";

/**
 * Elbotola: `#js_important_today` — `li.calender-match` (scores or `data-value` time).
 */
export function parseElbotolaTodaysMatches(html) {
  if (!html || typeof html !== "string") return [];

  const ulMatch = html.match(
    /<ul[^>]*\bid=["']js_important_today["'][^>]*>([\s\S]*?)<\/ul>/i,
  );
  if (!ulMatch) return [];

  const inner = ulMatch[1];
  const liBlocks =
    inner.match(
      /<li[^>]*class="[^"]*calender-match[^"]*"[^>]*>[\s\S]*?<\/li>/gi,
    ) || [];
  const out = [];

  liBlocks.forEach((block, idx) => {
    const hrefM = block.match(/<a[^>]+href="([^"]+)"/i);
    const path = hrefM ? hrefM[1] : "";
    const url = path.startsWith("http")
      ? path
      : `https://www.elbotola.com${path.startsWith("/") ? path : `/${path}`}`;

    const spans = [
      ...block.matchAll(
        /<div class="calender-team"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi,
      ),
    ];
    let home = "";
    let away = "";
    if (spans.length >= 2) {
      home = decodeHtmlEntities(
        String(spans[0][1]).replace(/\s+/g, " ").trim(),
      );
      away = decodeHtmlEntities(
        String(spans[1][1]).replace(/\s+/g, " ").trim(),
      );
    }

    let timeOrScore = "";
    const scoreM = block.match(
      /<div class="calender-info"[^>]*>[\s\S]*?<span>\s*([^<]+)\s*<\/span>/i,
    );
    if (scoreM && /\d/.test(scoreM[1])) {
      timeOrScore = scoreM[1].replace(/\s+/g, " ").trim();
    } else {
      const dataVal = block.match(/data-value="([^"]+)"/i);
      if (dataVal) {
        const dv = dataVal[1].trim();
        const tm = dv.match(/\d{4}-\d{2}-\d{2}\s+(\d{1,2}:\d{2})/);
        timeOrScore = tm ? tm[1] : dv;
      }
    }

    if (!home && !away) return;

    const id = `elbotola-${idx}-${home}-${away}`.replace(/\s+/g, "-").slice(0, 120);

    out.push({
      id,
      source: "elbotola",
      home,
      away,
      time: timeOrScore || "—",
      league: "مباريات اليوم — البطولة",
      venue:
        timeOrScore.includes(":") && timeOrScore.length <= 8 ? "قادمة" : "اليوم",
      url,
      sortAt: parseElbotolaMatchSortAt(block, idx),
    });
  });

  return out;
}

function parseElbotolaMatchSortAt(block, idx) {
  const dataVal = block.match(/data-value="([^"]+)"/i);
  if (dataVal) {
    const raw = dataVal[1].trim();
    const d = Date.parse(raw.replace(/\+0000$/, "Z"));
    if (!Number.isNaN(d)) return d;
  }
  return Date.now() - idx;
}
