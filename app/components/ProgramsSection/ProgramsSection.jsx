import postImage from "../../assets/images/post_large.webp";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./ProgramsSection.module.scss";

const PROGRAMS = [
  "وجهة المشهد",
  "ملف اليوم",
  "حديث المساء",
  "تحليل المشهد",
  "رياضة المشهد",
];

export default function ProgramsSection() {
  return (
    <section className={styles.root}>
      <SectionHeading title="البرامج الأكثر مشاهدة" />
      <div className={styles.track}>
        {PROGRAMS.map((name, i) => (
          <article key={i} className={styles.poster}>
            <div
              className={styles.posterImg}
              style={{ "--post-bg": `url(${postImage.src})` }}
            />
            <p className={styles.posterTitle}>{name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
