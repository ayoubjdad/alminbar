import {
  parseHesportTodaysMatches,
  parseElbotolaTodaysMatches,
  mergeTodaysMatches,
} from "../../../../lib/suggestions/todaysMatches";

const HESPORT_HOME = "https://www.hesport.com/";
const ELBOTOLA_HOME = "https://www.elbotola.com/";

async function fetchHtml(url) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AlminbarMatches/1.0; +https://localhost)",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function toPublicMatch(m) {
  return {
    id: m.id,
    home: m.home,
    away: m.away,
    time: m.time,
    league: m.league,
    venue: m.venue,
  };
}

/**
 * GET — server-fetch Hesport + Elbotola homepages, parse «مباريات اليوم», merge.
 */
export async function GET() {
  let hesportHtml = "";
  let elbotolaHtml = "";
  const errors = [];

  try {
    hesportHtml = await fetchHtml(HESPORT_HOME);
  } catch (e) {
    errors.push(
      `hesport: ${e instanceof Error ? e.message : String(e)}`,
    );
  }

  try {
    elbotolaHtml = await fetchHtml(ELBOTOLA_HOME);
  } catch (e) {
    errors.push(
      `elbotola: ${e instanceof Error ? e.message : String(e)}`,
    );
  }

  const hesport = parseHesportTodaysMatches(hesportHtml);
  const elbotola = parseElbotolaTodaysMatches(elbotolaHtml);
  const merged = mergeTodaysMatches(hesport, elbotola);
  const matches = merged.map(toPublicMatch);

  return Response.json({
    ok: true,
    matches,
    counts: {
      hesport: hesport.length,
      elbotola: elbotola.length,
      total: matches.length,
    },
    ...(errors.length ? { errors } : {}),
  });
}
