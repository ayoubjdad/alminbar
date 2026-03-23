import postImage from "../../assets/images/post_large.webp";
import styles from "./InvestigativeSection.module.scss";

const ITEMS = [
  "تحقيق: مسارات التمويل وخلفيات القرارات الاقتصادية",
  "ملف خاص: وثائق تكشف تفاصيل الاتفاق الإقليمي",
  "تحقيق ميداني: أصوات من المناطق الأكثر تأثراً",
  "قراءة تحقيقية: ماذا يعني المشهد السياسي الجديد؟",
  "تحقيق: شبكات التأثير في الفضاء الرقمي",
  "وثيقة المشهد: حوار مع مصادر مطلعة",
];

export default function InvestigativeSection() {
  return (
    <section className={styles.root}>
      <div className={styles.head}>
        <h2 className={styles.headTitle}>تحقيقات المشهد</h2>
      </div>
      <div className={styles.grid}>
        {ITEMS.map((title, i) => (
          <article key={i} className={styles.card}>
            <div
              className={styles.thumb}
              style={{ "--post-bg": `url(${postImage.src})` }}
            />
            <div className={styles.body}>
              <p className={styles.cardTitle}>{title}</p>
              <time className={styles.date} dateTime="2023-10-12">
                12 أكتوبر 2023
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
