import SectionHeading from "../SectionHeading/SectionHeading";
import NewsCard from "./NewsCard";
import styles from "./NewsSection.module.scss";

const DEFAULT_TITLE =
  "أمين عام الناتو: الحلف قادر على إعادة فتح مضيق هرمز";
const DEFAULT_DATE = "12 أكتوبر 2023";

export default function NewsSection({
  title = "أخبار لبنان",
  items,
  showCarouselNav = true,
}) {
  const cards =
    items ??
    Array.from({ length: 4 }, () => ({
      title: DEFAULT_TITLE,
      date: DEFAULT_DATE,
    }));

  return (
    <section className={styles.root}>
      <div className={styles.headerRow}>
        <SectionHeading title={title} variant="inline" />
        {showCarouselNav ? (
          <button type="button" className={styles.carouselBtn} aria-label="التالي">
            <i className="fi fi-rr-angle-small-left" />
          </button>
        ) : null}
      </div>
      <div className={styles.grid}>
        {cards.map((item, i) => (
          <NewsCard key={i} title={item.title} date={item.date} />
        ))}
      </div>
    </section>
  );
}
