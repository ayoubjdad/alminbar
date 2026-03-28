/**
 * معرفات مناطق الإعلانات — اربطها بـ GAM / AdSense أو أي شبكة لاحقاً.
 * استخدم نفس القيم في data-ad-slot أو id في DOM.
 */
export const AD_SLOTS = {
  /** شريط علوي كامل العرض (728×90 تقريباً) */
  LEADERBOARD_TOP: "leaderboard-top",
  /** أسفل المحتوى الرئيسي */
  RECTANGLE_BOTTOM: "rectangle-bottom",
  /** داخل الصفحة الرئيسية — بين الأقسام */
  HOME_INLINE_PRIMARY: "home-inline-primary",
  HOME_INLINE_SECONDARY: "home-inline-secondary",
  /** صفحة المقال — تحت العنوان */
  ARTICLE_UNDER_TITLE: "article-under-title",
  /** صفحة المقال — بين الفقرات */
  ARTICLE_INLINE: "article-inline",
  /** صفحة المقال — أسفل المقال */
  ARTICLE_BOTTOM: "article-bottom",
  /** صفحة 404 */
  NOT_FOUND_INLINE: "not-found-inline",
};
