import { revalidatePath } from "next/cache";
import {
  readRegistryRaw,
  writeRegistryFile,
  getCmsMetaMerged,
} from "../../../../lib/cms/buildCmsMeta";

/**
 * GET — نفس شكل /api/cms/meta (للتحقق)
 * POST — { type: 'categories'|'tags'|'clubs'|'leagues', item: {...} }
 * DELETE — ?type=&slug=&value= (للتصنيفات value بدل slug)
 */
export async function GET() {
  return Response.json(getCmsMetaMerged());
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { type, item } = body;
  if (!type || !item) {
    return Response.json({ ok: false, error: "type and item required" }, { status: 400 });
  }

  const reg = readRegistryRaw();

  if (type === "categories") {
    if (!item.value || !item.label) {
      return Response.json(
        { ok: false, error: "category needs value and label" },
        { status: 400 },
      );
    }
    reg.categories = reg.categories.filter((c) => c.value !== item.value);
    const value = String(item.value).trim();
    const row = {
      value,
      label: String(item.label).trim(),
    };
    if (item.description != null && item.description !== "") {
      row.description = String(item.description).trim();
    }
    if (item.sectionKey != null && item.sectionKey !== "") {
      row.sectionKey = String(item.sectionKey).trim();
    }
    if (item.homeTitle != null && item.homeTitle !== "") {
      row.homeTitle = String(item.homeTitle).trim();
    }
    if (item.siteSectionSlug != null && item.siteSectionSlug !== "") {
      row.siteSectionSlug = String(item.siteSectionSlug).trim();
    }
    if (item.iconHint != null && item.iconHint !== "") {
      row.iconHint = String(item.iconHint).trim();
    }
    if (typeof item.order === "number" && !Number.isNaN(item.order)) {
      row.order = item.order;
    }
    if (item.showOnHome === false) row.showOnHome = false;
    reg.categories.push(row);
  } else if (type === "tags") {
    if (!item.slug || !item.nameAr) {
      return Response.json(
        { ok: false, error: "tag needs slug and nameAr" },
        { status: 400 },
      );
    }
    const slug = String(item.slug).trim().toLowerCase().replace(/\s+/g, "-");
    reg.tags = reg.tags.filter((t) => t.slug !== slug);
    reg.tags.push({ slug, nameAr: String(item.nameAr).trim() });
  } else if (type === "clubs") {
    if (!item.slug || !item.nameAr) {
      return Response.json(
        { ok: false, error: "club needs slug and nameAr" },
        { status: 400 },
      );
    }
    const slug = String(item.slug).trim().toLowerCase().replace(/\s+/g, "-");
    reg.clubs = reg.clubs.filter((c) => c.slug !== slug);
    reg.clubs.push({
      slug,
      name: item.name ? String(item.name) : slug,
      nameAr: String(item.nameAr).trim(),
    });
  } else if (type === "leagues") {
    if (!item.slug || !item.labelAr) {
      return Response.json(
        { ok: false, error: "league needs slug and labelAr" },
        { status: 400 },
      );
    }
    const slug = String(item.slug).trim().toLowerCase().replace(/\s+/g, "-");
    reg.leagues = reg.leagues.filter((l) => l.slug !== slug);
    reg.leagues.push({
      slug,
      labelAr: String(item.labelAr).trim(),
      group: item.group ? String(item.group) : "custom",
    });
  } else {
    return Response.json({ ok: false, error: "invalid type" }, { status: 400 });
  }

  writeRegistryFile(reg);
  revalidatePath("/dashboard");
  revalidatePath("/");

  return Response.json({ ok: true });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");
  const value = searchParams.get("value");

  if (!type) {
    return Response.json({ ok: false, error: "type required" }, { status: 400 });
  }

  const reg = readRegistryRaw();

  if (type === "categories" && value) {
    reg.categories = reg.categories.filter((c) => c.value !== value);
  } else if (type === "tags" && slug) {
    reg.tags = reg.tags.filter((t) => t.slug !== slug);
  } else if (type === "clubs" && slug) {
    reg.clubs = reg.clubs.filter((c) => c.slug !== slug);
  } else if (type === "leagues" && slug) {
    reg.leagues = reg.leagues.filter((l) => l.slug !== slug);
  } else {
    return Response.json({ ok: false, error: "invalid delete" }, { status: 400 });
  }

  writeRegistryFile(reg);
  revalidatePath("/dashboard");
  revalidatePath("/");

  return Response.json({ ok: true });
}
