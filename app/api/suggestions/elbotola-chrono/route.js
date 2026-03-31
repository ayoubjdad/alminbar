import fs from "fs";
import path from "path";
import {
  parseElbotolaChrono,
  buildElbotolaChronoSnapshot,
} from "../../../../lib/suggestions/elbotolaChrono";

const DATA_DIR = path.join(process.cwd(), "data", "suggestions");

function writeSnapshot(snapshot) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const latestPath = path.join(DATA_DIR, "elbotola-chrono-latest.json");
  fs.writeFileSync(latestPath, JSON.stringify(snapshot, null, 2), "utf8");

  const datedPath = path.join(
    DATA_DIR,
    `elbotola-chrono-${snapshot.fetchedDate}.json`,
  );
  fs.writeFileSync(datedPath, JSON.stringify(snapshot, null, 2), "utf8");

  return { latestPath, datedPath };
}

/**
 * POST { html: string, sourceUrl?: string }
 * Parses «كرونو» (`ul.latest-chrono-list`) and writes JSON under data/suggestions/.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const html = body?.html;
  if (!html || typeof html !== "string") {
    return Response.json(
      { error: "Missing or invalid `html` string" },
      { status: 400 },
    );
  }

  const articles = parseElbotolaChrono(html);
  const snapshot = buildElbotolaChronoSnapshot(articles, {
    sourceUrl:
      typeof body.sourceUrl === "string" ? body.sourceUrl : undefined,
  });

  const paths = writeSnapshot(snapshot);

  return Response.json({
    ok: true,
    count: articles.length,
    fetchedAt: snapshot.fetchedAt,
    fetchedDate: snapshot.fetchedDate,
    files: {
      latest: path.relative(process.cwd(), paths.latestPath),
      dated: path.relative(process.cwd(), paths.datedPath),
    },
  });
}

/**
 * GET — fetch Elbotola homepage server-side, parse, save.
 */
export async function GET() {
  let html;
  try {
    const res = await fetch("https://www.elbotola.com/", {
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AlminbarSuggestions/1.0; +https://localhost)",
      },
    });
    if (!res.ok) {
      return Response.json(
        { error: `Fetch failed: ${res.status}` },
        { status: 502 },
      );
    }
    html = await res.text();
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Fetch failed" },
      { status: 502 },
    );
  }

  const articles = parseElbotolaChrono(html);
  const snapshot = buildElbotolaChronoSnapshot(articles);

  const paths = writeSnapshot(snapshot);

  return Response.json({
    ok: true,
    count: articles.length,
    fetchedAt: snapshot.fetchedAt,
    fetchedDate: snapshot.fetchedDate,
    files: {
      latest: path.relative(process.cwd(), paths.latestPath),
      dated: path.relative(process.cwd(), paths.datedPath),
    },
    articles,
  });
}
