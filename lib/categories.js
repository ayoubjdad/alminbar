/** أقسام الموقع — تُستخدم في `/category/[slug]` (كرة القدم المغربية) */
export const CATEGORIES = [
  {
    label: "البطولة الوطنية",
    slug: "botola",
    description:
      "كل أخبار ونتائج البطولة الاحترافية المغربية، ترتيب الفرق وأبرز المباريات.",
    subcategories: [
      {
        label: "القسم الأول",
        slug: "botola-pro-1",
        description:
          "متابعة شاملة لمباريات ونتائج البطولة الاحترافية القسم الأول.",
      },
      {
        label: "القسم الثاني",
        slug: "botola-pro-2",
        description: "أخبار ونتائج فرق القسم الثاني وترتيب البطولة.",
      },
      {
        label: "ترتيب الفرق",
        slug: "botola-standings",
        description: "جدول ترتيب فرق البطولة الوطنية محدث باستمرار.",
      },
      {
        label: "الهدافين",
        slug: "top-scorers",
        description: "قائمة هدافي البطولة الوطنية وأبرز المهاجمين.",
      },
    ],
  },
  {
    label: "المنتخب الوطني",
    slug: "morocco",
    description: "آخر أخبار المنتخب المغربي، المباريات، والتشكيلات الرسمية.",
    subcategories: [
      {
        label: "المنتخب الأول",
        slug: "senior-team",
        description: "تغطية شاملة لمباريات وأخبار المنتخب المغربي الأول.",
      },
      {
        label: "منتخب أقل من 23",
        slug: "u23",
        description: "متابعة منتخب المغرب لأقل من 23 سنة ومشاركاته الدولية.",
      },
      {
        label: "منتخب أقل من 20",
        slug: "u20",
        description: "أخبار ونتائج منتخب الشباب المغربي.",
      },
    ],
  },
  {
    label: "الدوريات العالمية",
    slug: "international",
    description: "أخبار أبرز الدوريات العالمية الأوروبية والعربية.",
    subcategories: [
      {
        label: "الدوري الإسباني",
        slug: "laliga",
        description:
          "نتائج وأخبار الدوري الإسباني وأهم الأندية مثل ريال مدريد وبرشلونة.",
      },
      {
        label: "الدوري الإنجليزي",
        slug: "premier-league",
        description: "تغطية الدوري الإنجليزي الممتاز وأبرز نجومه.",
      },
      {
        label: "الدوري الإيطالي",
        slug: "serie-a",
        description: "متابعة مباريات وأخبار الكالتشيو الإيطالي.",
      },
      {
        label: "الدوري الفرنسي",
        slug: "ligue-1",
        description: "أخبار ونتائج الدوري الفرنسي وأداء اللاعبين المغاربة.",
      },
    ],
  },
  {
    label: "المباريات",
    slug: "matches",
    description: "جميع مباريات اليوم، النتائج المباشرة والبرامج الكروية.",
    subcategories: [
      {
        label: "مباريات اليوم",
        slug: "today-matches",
        description: "جدول مباريات اليوم في مختلف البطولات.",
      },
      {
        label: "النتائج",
        slug: "results",
        description: "نتائج المباريات لحظة بلحظة بعد نهاية اللقاءات.",
      },
      {
        label: "الجدول",
        slug: "fixtures",
        description: "برنامج المباريات القادمة في جميع البطولات.",
      },
    ],
  },
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getAllCategorySlugs() {
  return CATEGORIES.map((c) => c.slug);
}
