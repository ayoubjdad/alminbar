import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./OpinionSection.module.scss";

const WRITERS = [
  { name: "يوسف الإدريسي", role: "تحليل تكتيكي" },
  { name: "فاطمة الزهراء العمراني", role: "كرة مغربية" },
  { name: "كريم بنعلي", role: "البطولة الاحترافية" },
  { name: "سارة المرابط", role: "المنتخب والأندية" },
  { name: "عمر التازي", role: "احتراف وانتقالات" },
  { name: "نور الدين الصقلي", role: "شؤون الجماهير" },
];

export default function OpinionSection() {
  return (
    <section className={styles.root}>
      <SectionHeading title="رأي وتحليل" />
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
