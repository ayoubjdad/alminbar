import postImage from "../../assets/images/post_large.webp";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./VarietiesSection.module.scss";

const ITEMS = [
  {
    title: "ملفات خاصة: وجوه تُعيد تشكيل المشهد الإعلامي",
  },
  {
    title: "تحقيق: قصص من الخلفية تكشف تفاصيل جديدة",
  },
  {
    title: "لقاء: قراءة ثقافية في أحداث الأسبوع",
  },
  {
    title: "تقرير: نمط حياة ومجتمع في عدد اليوم",
  },
];

export default function VarietiesSection() {
  return (
    <section className={styles.root}>
      <SectionHeading title="منوعات" />
      <div className={styles.grid}>
        {ITEMS.map((item, i) => (
          <article key={i} className={styles.card}>
            <div
              className={styles.portrait}
              style={{ "--post-bg": `url(${postImage.src})` }}
            />
            <p className={styles.caption}>{item.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
