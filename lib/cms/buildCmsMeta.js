import fs from "fs";
import path from "path";
import { TAGS } from "../staticData/tags";
import { CLUBS } from "../staticData/clubs";
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

/** دمج البذرة مع ملف التسجيل — يُستخدم في /api/cms/meta */
export function getCmsMetaMerged() {
  const r = readRegistryFile();

  const catSeen = new Set();
  const categories = [];
  for (const c of [...EDITORIAL_CATEGORIES, ...r.categories]) {
    if (!c?.value || catSeen.has(c.value)) continue;
    catSeen.add(c.value);
    categories.push({ value: c.value, label: c.label ?? c.value });
  }

  const tagMap = new Map();
  for (const t of TAGS) {
    tagMap.set(t.slug, { slug: t.slug, nameAr: t.nameAr });
  }
  for (const t of r.tags) {
    if (t?.slug) {
      tagMap.set(t.slug, { slug: t.slug, nameAr: t.nameAr ?? t.slug });
    }
  }
  const tags = [...tagMap.values()].sort((a, b) =>
    a.nameAr.localeCompare(b.nameAr, "ar"),
  );

  const clubMap = new Map();
  for (const c of CLUBS) {
    clubMap.set(c.slug, {
      slug: c.slug,
      name: c.shortName ?? c.name,
      nameAr: c.fieldTranslations?.nameTranslation?.ar ?? c.name,
    });
  }
  for (const c of r.clubs) {
    if (c?.slug) {
      clubMap.set(c.slug, {
        slug: c.slug,
        name: c.name ?? c.slug,
        nameAr: c.nameAr ?? c.name ?? c.slug,
      });
    }
  }
  const clubs = [...clubMap.values()].sort((a, b) =>
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
