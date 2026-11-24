/** إعدادات الموقع العامة + روابط التنقل (بيانات ثابتة). */

export const SITE = {
  name: "المنبر الرياضي",
  shortName: "المنبر",
  description:
    "المنبر الرياضي: أخبار البطولة الاحترافية، المنتخب المغربي، المحترفين وأبرز الدوريات العالمية.",
  handle: "@alminbarsports",
  email: null, // ← أضف بريد التواصل هنا
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/alminbarsports/",
  facebook: "https://www.facebook.com/alminbarsports",
  x: "https://x.com/alminbarsports",
  youtube: "https://www.youtube.com/@alminbarsports",
};

/** شريط الأخبار العاجلة (أعلى الصفحة). */
export const FLASH_NEWS = [
  {
    text: "الرجاء الرياضي يعتلي صدارة البطولة الاحترافية بعد فوزه في الجولة الخامسة عشرة.",
    href: "/article/raja-top-of-botola",
  },
  {
    text: "إسماعيل الصيباري يثير إعجاب كومباني بسرعة تأقلمه مع بايرن ميونخ.",
    href: "/article/saibari-impresses-kompany",
  },
  {
    text: "ديربي الدار البيضاء: كل ما تحتاج معرفته قبل المواجهة المرتقبة.",
    href: "/article/casablanca-derby-preview",
  },
];

/** القائمة الرئيسية (الرأس + القائمة الجانبية على الجوال). */
export const MAIN_NAV = [
  { label: "البطولة", href: "/category/botola" },
  { label: "المنتخب", href: "/category/national-team" },
  { label: "محترفون", href: "/category/pros" },
  { label: "أخبار دولية", href: "/category/international" },
  { label: "تحليلات", href: "/category/analysis" },
  { label: "الترتيب", href: "/competitions" },
  { label: "المباريات", href: "/matches" },
  { label: "ريلز", href: "/reels" },
  { label: "فيديو", href: "/videos" },
];

/** أعمدة روابط التذييل. */
export const FOOTER_COLUMNS = [
  {
    head: "الأقسام",
    links: [
      { label: "البطولة", href: "/category/botola" },
      { label: "المنتخب", href: "/category/national-team" },
      { label: "محترفون", href: "/category/pros" },
      { label: "أخبار دولية", href: "/category/international" },
      { label: "تحليلات", href: "/category/analysis" },
    ],
  },
  {
    head: "المنبر",
    links: [
      { label: "الأندية", href: "/clubs" },
      { label: "الترتيب", href: "/competitions" },
      { label: "المباريات", href: "/matches" },
      { label: "الكتّاب", href: "/authors" },
      { label: "ريلز", href: "/reels" },
    ],
  },
  {
    head: "معلومات",
    links: [
      { label: "من نحن", href: "/about" },
      { label: "اتصل بنا", href: "/contact" },
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "شروط الاستخدام", href: "/terms" },
    ],
  },
];
