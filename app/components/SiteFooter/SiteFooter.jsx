import Image from "next/image";
import { SITE } from "../../../lib/staticData/site";
import styles from "./SiteFooter.module.scss";

export default function SiteFooter() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <Image
            src="https://www.almashhad.com/static/images/LogoBlue.svg"
            width={180}
            height={42}
            alt={SITE.name}
            className={styles.logo}
          />
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="X">
              X
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              f
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              in
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              ▶
            </a>
          </div>
          <p className={styles.tagline}>{SITE.description}</p>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.
          </p>
        </div>

        <div className={styles.col}>
          <p className={styles.newsletterTitle}>اشترك في نشرتنا الإخبارية</p>
          <div className={styles.form}>
            <input
              type="email"
              className={styles.input}
              placeholder="بريدك الإلكتروني"
              aria-label="البريد الإلكتروني"
            />
            <button type="button" className={styles.subscribe}>
              اشترك
            </button>
          </div>
          <button type="button" className={styles.ctaYellow}>
            حمّل تطبيق {SITE.name}
          </button>
        </div>

        <div className={styles.col}>
          <p className={styles.blockTitle}>تطبيقات الجوال</p>
          <div className={styles.storeRow}>
            <span className={styles.storeBadge}>App Store</span>
            <span className={styles.storeBadge}>Google Play</span>
          </div>
          <ul className={styles.links}>
            <li>
              <a href="#">من نحن</a>
            </li>
            <li>
              <a href="#">اتصل بنا</a>
            </li>
            <li>
              <a href="#">شروط الاستخدام</a>
            </li>
            <li>
              <a href="#">سياسة الخصوصية</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
