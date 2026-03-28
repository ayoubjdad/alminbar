"use client";

import styles from "./AdZone.module.scss";

const VARIANTS = {
  /** ~728×90 — شريط علوي */
  leaderboard: styles.leaderboard,
  /** ~300×250 — وسط */
  rectangle: styles.rectangle,
  /** ~320×50 أو 320×100 — موبايل */
  mobile: styles.mobile,
  /** ~160×600 — عمودي (سطح مكتب) */
  skyscraper: styles.skyscraper,
  /** مربع صغير ~300×100 */
  banner: styles.banner,
};

/**
 * منطقة إعلان — placeholder جاهز لربط شبكة إعلانات (ضع السكربت داخل الطفل لاحقاً).
 * @param {object} props
 * @param {string} props.slot — معرف فريد (انظر `lib/adSlots.js`)
 * @param {'leaderboard'|'rectangle'|'mobile'|'skyscraper'|'banner'} [props.variant='rectangle']
 * @param {string} [props.label='إعلان']
 * @param {string} [props.className]
 */
export default function AdZone({
  slot,
  variant = "rectangle",
  label = "إعلان",
  className = "",
}) {
  const variantClass = VARIANTS[variant] ?? VARIANTS.rectangle;

  return (
    <aside
      className={`${styles.root} ${variantClass} ${className}`.trim()}
      data-ad-slot={slot}
      aria-label={label}
    >
      <div className={styles.inner}>
        <span className={styles.placeholder}>{label}</span>
        <span className={styles.slotId}>{slot}</span>
      </div>
    </aside>
  );
}
