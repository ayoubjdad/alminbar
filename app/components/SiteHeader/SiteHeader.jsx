import Image from "next/image";
import ContributorsBar from "../ContributorsBar/ContributorsBar";
import styles from "./SiteHeader.module.scss";

const NAV = [
  "الرئيسية",
  "سياسة",
  "اقتصاد",
  "رياضة",
  "أخبار لبنان",
  "العالم العربي",
  "منوعات",
  "تكنولوجيا",
  "صحة",
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
            alt="المشهد"
            priority
          />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.liveBtn}>
            بث مباشر
          </button>
          <div className={styles.searchWrap}>
            <input
              type="search"
              className={styles.search}
              placeholder="ابحث في المشهد"
              aria-label="بحث"
            />
            <button type="button" className={styles.searchBtn}>
              ابحث
            </button>
          </div>
          <i className="fi fi-rr-bell" />
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item) => (
          <span key={item} className={styles.navItem}>
            <span className={styles.navLabel}>{item}</span>
          </span>
        ))}
      </nav>

      <ContributorsBar />
    </div>
  );
}
