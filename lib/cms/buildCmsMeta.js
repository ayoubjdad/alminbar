import fs from "fs";
import path from "path";
import { EDITORIAL_CATEGORIES } from "./referenceData";
import { STATIC_LEAGUES } from "./fullLeagues";

const REGISTRY_PATH = path.join(process.cwd(), "data/cms-registry.json");

function readRegistryFile() {
  try {
    if (!fs.existsSync(REGISTRY_PATH)) {
      return { categories: [], tags: [], clubs: [], leagues: [] };
    }
    const raw = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    return {
      categories: Array.isArray(raw.categories) ? raw.categories : [],
      tags: Array.isArray(raw.tags) ? raw.tags : [],
      clubs: Array.isArray(raw.clubs) ? raw.clubs : [],
      leagues: Array.isArray(raw.leagues) ? raw.leagues : [],
    };
  } catch {
    return { categories: [], tags: [], clubs: [], leagues: [] };
  }
}

/** حقول اختيارية من السجل لكل تصنيف (عرض لوحة التحرير، الصفحة الرئيسية، روابط الأقسام) */
export function normalizeCategoryFields(c) {
  if (!c?.value) return null;
  const showOnHome = c.showOnHome;
  return {
    value: c.value,
    label: c.label ?? c.value,
    description: c.description ?? undefined,
    sectionKey: c.sectionKey ?? c.value,
    order: typeof c.order === "number" ? c.order : undefined,
    showOnHome: showOnHome === undefined ? true : Boolean(showOnHome),
    homeTitle: c.homeTitle ?? c.label ?? c.value,
    siteSectionSlug: c.siteSectionSlug ?? undefined,
    iconHint: c.iconHint ?? undefined,
  };
}

/** أقسام شريط الأخبار في الصفحة الرئيسية — من `categories` في السجل فقط، مرتبة بـ `order` */
export function getHomePageNewsSections() {
  const r = readRegistryFile();
  return (r.categories ?? [])
    .filter((c) => c?.value && c.showOnHome !== false)
    .map((c) => {
      const n = normalizeCategoryFields(c);
      return {
        title: n.homeTitle,
        sectionKey: n.sectionKey,
        order: n.order ?? 999,
        value: n.value,
        siteSectionSlug: n.siteSectionSlug ?? null,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ title, sectionKey, value, siteSectionSlug }) => ({
      title,
      sectionKey,
      value,
      siteSectionSlug: siteSectionSlug ?? null,
    }));
}

/** دمج التصنيفات التحريرية مع السجل — بدون بيانات بذرة للوسوم والأندية */
export function getCmsMetaMerged() {
  const r = readRegistryFile();

  const registryByValue = new Map(
    (r.categories ?? []).filter((c) => c?.value).map((c) => [c.value, c]),
  );

  const catSeen = new Set();
  const categories = [];

  for (const c of EDITORIAL_CATEGORIES) {
    if (!c?.value || catSeen.has(c.value)) continue;
    catSeen.add(c.value);
    const reg = registryByValue.get(c.value);
    const merged = reg
      ? { ...c, ...reg, label: c.label ?? reg.label }
      : c;
    const normalized = normalizeCategoryFields(merged);
    if (normalized) categories.push(normalized);
  }

  for (const c of r.categories ?? []) {
    if (!c?.value || catSeen.has(c.value)) continue;
    catSeen.add(c.value);
    const normalized = normalizeCategoryFields(c);
    if (normalized) categories.push(normalized);
  }

  const tags = [...r.tags]
    .filter((t) => t?.slug)
    .map((t) => ({ slug: t.slug, nameAr: t.nameAr ?? t.slug }))
    .sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));

  const clubs = [...r.clubs]
    .filter((c) => c?.slug)
    .map((c) => ({
      slug: c.slug,
      name: c.name ?? c.slug,
      nameAr: c.nameAr ?? c.name ?? c.slug,
      id: c.id,
      logo: c.logo,
    }))
    .sort((a, b) =>
      (a.nameAr ?? a.name).localeCompare(b.nameAr ?? b.name, "ar"),
    );

  const leagueMap = new Map();
  for (const l of STATIC_LEAGUES) {
    leagueMap.set(l.slug, {
      slug: l.slug,
      labelAr: l.labelAr,
      group: l.group,
    });
  }
  for (const l of r.leagues) {
    if (l?.slug) {
      leagueMap.set(l.slug, {
        slug: l.slug,
        labelAr: l.labelAr ?? l.slug,
        group: l.group ?? "custom",
      });
    }
  }
  const leagues = [...leagueMap.values()].sort((a, b) =>
    a.labelAr.localeCompare(b.labelAr, "ar"),
  );

  return {
    categories,
    editorialCategories: categories,
    tags,
    clubs,
    leagues,
  };
}

export function writeRegistryFile(data) {
  fs.mkdirSync(path.dirname(REGISTRY_PATH), { recursive: true });
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(data, null, 2), "utf8");
}

export function readRegistryRaw() {
  return readRegistryFile();
}
