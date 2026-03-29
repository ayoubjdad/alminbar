import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import {
  getMergedArticlesServer,
  getArticleBySlugServer,
} from "../../../../lib/cms/getMergedArticlesServer";
import { inferSiteCategory } from "../../../../lib/cms/inferSiteCategory";
import { sortArticlesByDateDesc } from "../../../../lib/cms/sortArticles";
import { TRENDING_ORDER } from "../../../../lib/newsData";

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

/**
 * GET /api/cms/articles
 * - بدون معاملات: كل المقالات المدمجة
 * - ?slug= — مقال واحد
 * - ?category= — حقل category التحريري
 * - ?siteCategory= — حسب inferSiteCategory (قسم الموقع)
 * - ?trending=1 — شريط الترند
 * - ?variety=1 — منوعات
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  let list = getMergedArticlesServer();

  if (slug) {
    const article = getArticleBySlugServer(slug);
    return Response.json({ article: article ?? null });
  }

  const category = searchParams.get("category");
  if (category) {
    list = list.filter((a) => a.category === category);
  }

  const siteCategory = searchParams.get("siteCategory");
  if (siteCategory) {
    list = list.filter((a) => inferSiteCategory(a) === siteCategory);
  }

  if (searchParams.get("trending") === "1") {
    const map = Object.fromEntries(list.map((a) => [a.slug, a]));
    list = TRENDING_ORDER.map((s) => map[s]).filter(Boolean);
  }

  if (searchParams.get("variety") === "1") {
    list = list.filter((a) => a.category === "variety");
  }

  if (!searchParams.get("trending")) {
    list = sortArticlesByDateDesc(list);
  }

  return Response.json({ articles: list });
}

/** POST — إنشاء أو تحديث مقال (يُخزَّن في data/cms-user-articles.json) */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const article = body.article;
  if (!article?.slug || !article?.title) {
    return Response.json(
      { ok: false, error: "slug and title required" },
      { status: 400 },
    );
  }

  let user = readUserFile();
  const idx = user.findIndex((a) => a.slug === article.slug);
  if (idx >= 0) user[idx] = article;
  else user.push(article);
  writeUserFile(user);

  revalidatePath("/", "layout");
  revalidatePath("/article/[slug]", "page");
  revalidatePath("/category/[slug]", "page");
  revalidatePath("/club/[slug]", "page");

  return Response.json({ ok: true });
}

/** DELETE ?slug=... — حذف من الملف فقط (لا يحذف البذرة) */
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return Response.json({ ok: false, error: "slug required" }, { status: 400 });
  }

  const user = readUserFile().filter((a) => a.slug !== slug);
  writeUserFile(user);

  revalidatePath("/", "layout");
  revalidatePath("/article/[slug]", "page");

  return Response.json({ ok: true });
}
