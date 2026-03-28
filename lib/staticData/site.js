/** Navigation — موقع كرة القدم المغربية */

export const SITE = {
  name: "المنبر",
  description:
    "متابعة كرة القدم المغربية: البطولة الاحترافية، الأندية، المنتخب، المباريات والنتائج.",
};

/** ترتيب يضع الرياضة والملف المغربي أولاً */
export function buildSiteNav(categories) {
  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  const order = [
    "sports",
    "world",
    "culture",
    "society",
    "politics",
    "economy",
    "tech",
    "health",
    "lebanon",
  ];
  return [
    { label: "الرئيسية", href: "/" },
    { label: "أندية مغربية", href: "/#moroccan-clubs" },
    { label: "مباريات اليوم", href: "/#todays-games" },
    { label: "الترتيب والدوريات", href: "/#league-rankings" },
    ...order.map((slug) => {
      const c = bySlug[slug];
      return { label: c.label, href: `/category/${slug}` };
    }),
  ];
}
