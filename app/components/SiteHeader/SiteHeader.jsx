import Image from "next/image";
import styles from "./SiteHeader.module.scss";

const NAV = [
  "الرئيسية",
  "أخبار إيران",
  "أخبار لبنان",
  "رمضان",
  "اقتصاد",
  "أخبار",
  "اختبر معلوماتك",
  "استطلاع المشهد",
];

export default function SiteHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <i className={`fi fi-rr-menu-burger ${styles.menuIcon}`} />
          <Image
            src="https://www.almashhad.com/static/images/LogoBlue.svg"
            width={220}
            height={50}
            alt="Logo"
          />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.liveBtn}>
            بث مباشر
          </button>
          <input
            type="search"
            className={styles.search}
            placeholder="Search"
          />
          <i className="fi fi-rr-bell" />
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item) => (
          <span key={item} className={styles.navItem}>
            <p className={styles.navLabel}>{item}</p>
          </span>
        ))}
      </nav>
    </div>
  );
}
