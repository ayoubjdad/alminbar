/** أقسام الموقع — تُستخدم في `/category/[slug]` */
export const CATEGORIES = [
  {
    slug: "politics",
    label: "سياسة",
    description: "تغطية الملفات السياسية والتحليلات",
  },
  {
    slug: "economy",
    label: "اقتصاد",
    description: "أسواق ومال وسياسات",
  },
  {
    slug: "sports",
    label: "رياضة",
    description: "مباريات، نتائج، وتحليلات",
  },
  {
    slug: "tech",
    label: "تكنولوجيا",
    description: "ابتكار ومنصات وأمن رقمي",
  },
  {
    slug: "health",
    label: "صحة",
    description: "مجتمع ووقاية وطب",
  },
  {
    slug: "society",
    label: "مجتمع",
    description: "قضايا يومية وبيئة",
  },
  {
    slug: "culture",
    label: "ثقافة",
    description: "فنون وإصدارات وفعاليات",
  },
  {
    slug: "world",
    label: "العالم العربي",
    description: "ملفات إقليمية وعربية",
  },
  {
    slug: "lebanon",
    label: "أخبار لبنان",
    description: "متابعة يومية للمشهد اللبناني",
  },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getAllCategorySlugs() {
  return CATEGORIES.map((c) => c.slug);
}
