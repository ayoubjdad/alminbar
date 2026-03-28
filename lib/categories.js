/** أقسام الموقع — تُستخدم في `/category/[slug]` (كرة القدم المغربية + تغطية عامة) */
export const CATEGORIES = [
  {
    slug: "politics",
    label: "سياسة",
    description: "ملفات عامة وتأثيرها على الرياضة والمجتمع",
  },
  {
    slug: "economy",
    label: "اقتصاد",
    description: "الاستثمار في الأندية والبنية التحتية الرياضية",
  },
  {
    slug: "sports",
    label: "رياضة مغربية",
    description: "البطولة الاحترافية، الكأس، والمنتخب المغربي",
  },
  {
    slug: "tech",
    label: "تكنولوجيا",
    description: "تطبيقات النقل والبث والتحليل الرياضي",
  },
  {
    slug: "health",
    label: "صحة ولياقة",
    description: "إصابات اللاعبين ولياقة الأداء",
  },
  {
    slug: "society",
    label: "مجتمع",
    description: "الجماهير والملاعب والبيئة المحيطة بالكرة",
  },
  {
    slug: "culture",
    label: "ثقافة رياضية",
    description: "تاريخ الأندية والهوية الكروية في المغرب",
  },
  {
    slug: "world",
    label: "عالم كرة القدم",
    description: "الدوريات العربية والعالمية والمنافسات القارية",
  },
  {
    slug: "lebanon",
    label: "عربي ودولي",
    description: "أخبار عربية ودولية مختارة (محتوى تجريبي)",
  },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getAllCategorySlugs() {
  return CATEGORIES.map((c) => c.slug);
}
