import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { DEFAULT_IMAGE } from "../../../../lib/cms/articles.seed";
import { slugifyTitle } from "../../../../lib/cms/normalizeArticle";
import {
  appendDismissedKey,
  readDismissedKeys,
} from "../../../../lib/suggestions/dismissedStore";

const USER_PATH = path.join(process.cwd(), "data/cms-user-articles.json");

function readUserFile() {
  try {
    if (!fs.existsSync(USER_PATH)) return [];
    const raw = fs.readFileSync(USER_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUserFile(list) {
  fs.mkdirSync(path.dirname(USER_PATH), { recursive: true });
  fs.writeFileSync(USER_PATH, JSON.stringify(list, null, 2), "utf8");
}

function uniqueSlug(base, existingSlugs) {
  let s = base;
  let n = 0;
  while (existingSlugs.has(s)) {
    n += 1;
    s = `${base}-${n}`;
  }
  return s.slice(0, 120);
}

/**
 * POST { key, source, url, headline, sourceLabel?, timeLabel? }
 * يُنشئ مقالاً مسودة ويُخفِي الاقتراح من القائمة.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const key = typeof body?.key === "string" ? body.key.trim() : "";
  const url = typeof body?.url === "string" ? body.url.trim() : "";
  const headline = typeof body?.headline === "string" ? body.headline.trim() : "";
  const source = typeof body?.source === "string" ? body.source.trim() : "";
  const sourceLabel =
    typeof body?.sourceLabel === "string" ? body.sourceLabel.trim() : "";

  if (!key || !url || !headline) {
    return Response.json(
      { ok: false, error: "key, url, headline required" },
      { status: 400 },
    );
  }

  if (readDismissedKeys().includes(key)) {
    return Response.json(
      { ok: false, error: "تمت معالجة هذا الاقتراح مسبقاً." },
      { status: 409 },
    );
  }

  const user = readUserFile();
  const slugs = new Set(user.map((a) => a.slug));

  const base = slugifyTitle(headline);
  const urlPart = Buffer.from(url)
    .toString("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 12);
  const slug = uniqueSlug(`${base}-${urlPart || "s"}`, slugs);

  const publishedAt = new Date().toISOString();
  const dateStr = new Date().toLocaleDateString("ar-MA-u-ca-gregory", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const article = {
    slug,
    title: headline,
    date: dateStr,
    publishedAt,
    excerpt: `اقتراح من ${sourceLabel || source || "المصدر"} — راجع النص والصورة قبل النشر.`,
    image: DEFAULT_IMAGE,
    body: [
      `المصدر: ${sourceLabel || source || "—"}.`,
      `رابط المصدر الأصلي: ${url}`,
      "",
      "—",
      "",
      "هذه مسودة مُولَّدة من الاقتراحات. عرّض المحتوى من الرابط أو أعد صياغته، ثم انشر من لوحة التحرير.",
    ],
    category: "morocco-sports",
    tags: [],
    linkedClubs: [],
    relatedLeagues: [],
    cmsMeta: {
      status: "draft",
      suggestionSource: source || undefined,
      suggestionUrl: url,
      suggestionKey: key,
      seoTitle: "",
      seoDescription: "",
    },
  };

  user.push(article);
  writeUserFile(user);
  appendDismissedKey(key);

  revalidatePath("/", "layout");
  revalidatePath("/article/[slug]", "page");

  return Response.json({ ok: true, slug, article });
}
