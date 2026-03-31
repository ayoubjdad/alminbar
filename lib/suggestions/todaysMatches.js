/**
 * Parse «مباريات اليوم» from Hesport + Elbotola homepages.
 */

import { decodeHtmlEntities } from "./hesportFlash";

/**
 * Hesport: `#match-bar` items (`data-status`, `data-utctime`, `span.team-name`).
 * @returns {Array<{
 *   id: string;
 *   source: 'hesport';
 *   home: string;
 *   away: string;
 *   time: string;
 *   league: string;
 *   venue: string;
 *   url: string;
 *   sortAt: number;
 * }>}
 */
export function parseHesportTodaysMatches(html) {
  if (!html || typeof html !== "string") return [];
  if (!html.includes('id="match-bar"') && !html.includes("id='match-bar'")) {
    return [];
  }

  const parts = html.split('<div data-status="');
  const out = [];

  for (let i = 1; i < parts.length; i++) {
    const segment = parts[i];
    if (!segment.includes('class="item')) continue;

    const block = segment.slice(0, 6000);
    const statusMatch = block.match(/^([^"]+)"/);
    const dataStatus = statusMatch ? statusMatch[1] : "";

    const utcM = block.match(/data-utctime="([^"]+)"/);
    const utc = utcM ? utcM[1] : null;

    const teams = [...block.matchAll(/<span class="team-name">([^<]*)<\/span>/gi)];
    if (teams.length < 2) continue;

    const home = decodeHtmlEntities(String(teams[0][1]).trim());
    const away = decodeHtmlEntities(String(teams[1][1]).trim());

    let url = "";
    const stretched = block.match(
      /<a[^>]*class="[^"]*stretched-link[^"]*"[^>]*href="([^"]+)"/i,
    );
    if (stretched) url = stretched[1];
    if (!url) {
      const h2 = block.match(/href="([^"]+)"[^>]*class="[^"]*stretched-link/i);
      if (h2) url = h2[1];
    }

    const timeM = block.match(/<time[^>]*class="[^"]*time[^"]*"[^>]*>([^<]*)<\/time>/i);
    const timeDisplay = timeM ? timeM[1].trim() : "";

    let venueLabel = "";
    if (dataStatus === "Played") venueLabel = "انتهت";
    else if (dataStatus === "Fixture") venueLabel = "قادمة";
    else if (dataStatus) venueLabel = dataStatus;

    const sortAt = utc ? Date.parse(utc) : 0;
    const id = `hesport-${utc || i}-${home}-${away}`.replace(/\s+/g, "-").slice(0, 120);

    out.push({
      id,
      source: "hesport",
      home,
      away,
      time: timeDisplay,
      league: "مباريات اليوم — هسبورت",
      venue: venueLabel,
      url,
      sortAt,
    });
  }

  return out;
}

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
  const liBlocks = inner.match(/<li[^>]*class="[^"]*calender-match[^"]*"[^>]*>[\s\S]*?<\/li>/gi) || [];
  const out = [];

  liBlocks.forEach((block, idx) => {
    const hrefM = block.match(/<a[^>]+href="([^"]+)"/i);
    const path = hrefM ? hrefM[1] : "";
    const url = path.startsWith("http")
      ? path
      : `https://www.elbotola.com${path.startsWith("/") ? path : `/${path}`}`;

    const spans = [...block.matchAll(/<div class="calender-team"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi)];
    let home = "";
    let away = "";
    if (spans.length >= 2) {
      home = decodeHtmlEntities(String(spans[0][1]).replace(/\s+/g, " ").trim());
      away = decodeHtmlEntities(String(spans[1][1]).replace(/\s+/g, " ").trim());
    }

    let timeOrScore = "";
    const scoreM = block.match(/<div class="calender-info"[^>]*>[\s\S]*?<span>\s*([^<]+)\s*<\/span>/i);
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
      venue: timeOrScore.includes(":") && timeOrScore.length <= 8 ? "قادمة" : "اليوم",
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

/**
 * Merge + sort by kickoff time (earlier first).
 */
export function mergeTodaysMatches(hesport, elbotola) {
  const all = [...(hesport || []), ...(elbotola || [])];
  all.sort((a, b) => (a.sortAt || 0) - (b.sortAt || 0));
  return all;
}
