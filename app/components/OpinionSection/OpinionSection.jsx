import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./OpinionSection.module.scss";

const WRITERS = [
  { name: "د. أحمد المنصوري", role: "كتاب الرأي" },
  { name: "ليلى الحسين", role: "كتاب الرأي" },
  { name: "محمد الخطيب", role: "كتاب الرأي" },
  { name: "سارة القاضي", role: "كتاب الرأي" },
  { name: "عمر الزين", role: "كتاب الرأي" },
  { name: "نورا الدين", role: "كتاب الرأي" },
];

export default function OpinionSection() {
  return (
    <section className={styles.root}>
      <SectionHeading title="كتاب الرأي" />
      <div className={styles.grid}>
        {WRITERS.map((w, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.avatar} aria-hidden>
              {w.name.charAt(0)}
            </div>
            <p className={styles.name}>{w.name}</p>
            <p className={styles.role}>{w.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
