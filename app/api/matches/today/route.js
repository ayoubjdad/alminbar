import { parseElbotolaTodaysMatches } from "../../../../lib/suggestions/todaysMatches";

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
 * GET — server-fetch Elbotola homepage, parse «مباريات اليوم» (#js_important_today).
 */
export async function GET() {
  let elbotolaHtml = "";
  let error = null;

  try {
    elbotolaHtml = await fetchHtml(ELBOTOLA_HOME);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  const rows = parseElbotolaTodaysMatches(elbotolaHtml);
  rows.sort((a, b) => (a.sortAt || 0) - (b.sortAt || 0));
  const matches = rows.map(toPublicMatch);

  return Response.json({
    ok: !error,
    matches,
    counts: {
      elbotola: rows.length,
      total: matches.length,
    },
    ...(error ? { errors: [`elbotola: ${error}`] } : {}),
  });
}
