import postImage from "../../assets/images/post_large.webp";
import styles from "./TrendingNowSection.module.scss";

const TITLE = "يتصدر الآن";

const ITEMS = [
  "هذه خطة إسرائيل التي قدمتها لترامب لحرب إيران.. لماذا لم تنجح؟",
  "أمين عام الناتو: الحلف قادر على إعادة فتح مضيق هرمز",
  "قمة إقليمية: ملفات الأمن والتعاون الاقتصادي على الطاولة",
  "أسواق النفط: تقلبات مع تصاعد التوترات",
  "بيان حكومي: خطوات جديدة لدعم القطاعات الحيوية",
  "رياضة: مواجهة مرتقبة تجمع قطبي الدوري",
];

export default function TrendingNowSection() {
  return (
    <section className={styles.root}>
      <div className={styles.bar}>
        <h2 className={styles.barTitle}>{TITLE}</h2>
      </div>
      <div className={styles.grid}>
        {ITEMS.map((headline, i) => (
          <article key={i} className={styles.card}>
            <div
              className={styles.thumb}
              style={{ "--post-bg": `url(${postImage.src})` }}
            />
            <p className={styles.headline}>{headline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
