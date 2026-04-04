/** أقسام الموقع — مأخوذة من `data/cms-registry.json` (`siteSectionSlug`) لـ `/category/[slug]` */
import cmsRegistry from "../data/cms-registry.json";

function pickPrimaryRow(rows) {
  let best = null;
  let bestOrder = Infinity;
  for (const row of rows) {
    const o = typeof row.order === "number" ? row.order : 999;
    if (o < bestOrder) {
      bestOrder = o;
      best = row;
    }
  }
  return best;
}

function buildCategoriesFromRegistry(registryCategories) {
  if (!Array.isArray(registryCategories)) return [];

  const bySlug = new Map();
  for (const row of registryCategories) {
    const slug =
      typeof row.siteSectionSlug === "string"
        ? row.siteSectionSlug.trim()
        : "";
    if (!slug) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug).push(row);
  }

  const sections = [...bySlug.entries()].map(([slug, rows]) => {
    const row = pickPrimaryRow(rows);
    const label =
      (typeof row.homeTitle === "string" && row.homeTitle.trim()) ||
      (typeof row.label === "string" && row.label.trim()) ||
      slug;
    const description =
      typeof row.description === "string" ? row.description.trim() : "";
    return {
      slug,
      label,
      description,
      subcategories: [],
    };
  });

  sections.sort((a, b) => {
    const rowsA = bySlug.get(a.slug);
    const rowsB = bySlug.get(b.slug);
    const oA = pickPrimaryRow(rowsA)?.order ?? 999;
    const oB = pickPrimaryRow(rowsB)?.order ?? 999;
    return oA - oB;
  });

  return sections;
}

export const CATEGORIES = buildCategoriesFromRegistry(cmsRegistry.categories);

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getAllCategorySlugs() {
  return CATEGORIES.map((c) => c.slug);
}
