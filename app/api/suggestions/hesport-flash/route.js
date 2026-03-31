import fs from "fs";
import path from "path";
import {
  parseHesportFlashArticles,
  buildHesportFlashSnapshot,
} from "../../../../lib/suggestions/hesportFlash";

const DATA_DIR = path.join(process.cwd(), "data", "suggestions");

function writeSnapshot(snapshot) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const latestPath = path.join(DATA_DIR, "hesport-flash-latest.json");
  fs.writeFileSync(latestPath, JSON.stringify(snapshot, null, 2), "utf8");

  const datedPath = path.join(
    DATA_DIR,
    `hesport-flash-${snapshot.fetchedDate}.json`,
  );
  fs.writeFileSync(datedPath, JSON.stringify(snapshot, null, 2), "utf8");

  return { latestPath, datedPath };
}

/**
 * POST { html: string, sourceUrl?: string }
 * Parses «فلاش رياضي» (`ul.h24`) and writes JSON snapshots under data/suggestions/.
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

  const articles = parseHesportFlashArticles(html);
  const snapshot = buildHesportFlashSnapshot(articles, {
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
 * GET — fetch Hesport homepage server-side, parse, save (same JSON as POST).
 */
export async function GET() {
  let html;
  try {
    const res = await fetch("https://www.hesport.com/", {
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

  const articles = parseHesportFlashArticles(html);
  const snapshot = buildHesportFlashSnapshot(articles);

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
