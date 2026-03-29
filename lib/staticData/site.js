/** Navigation — موقع كرة القدم المغربية */

export const SITE = {
  name: "المنبر",
  description:
    "متابعة كرة القدم المغربية: البطولة الاحترافية، الأندية، المنتخب، المباريات والنتائج.",
};

/** روابط الأقسام — ترتيبها يتبع ترتيب مصفوفة `categories` */
export function buildSiteNav(categories) {
  return [
    ...categories.map((c) => ({
      label: typeof c.label === "string" ? c.label.trim() : c.label,
      href: `/category/${c.slug}`,
    })),
  ];
}
