import postImage from "../../assets/images/post_large.webp";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./PollSection.module.scss";

const POLLS = [
  {
    q: "من يفوز بالبطولة الاحترافية هذا الموسم؟",
    pct: 62,
  },
  {
    q: "هل ترى أن المنتخب المغربي جاهز للمنافسة القارية؟",
    pct: 48,
  },
  {
    q: "ما مدى اهتمامك بمتابعة الدوري المغربي أسبوعياً؟",
    pct: 74,
  },
  {
    q: "كيف تقيّم تغطيتنا لأخبار الأندية والبطولة؟",
    pct: 55,
  },
];

export default function PollSection() {
  return (
    <section className={styles.root}>
      <SectionHeading title="استطلاع المنبر" />
      <div className={styles.grid}>
        {POLLS.map((poll, i) => (
          <article key={i} className={styles.card}>
            <div
              className={styles.media}
              style={{ "--post-bg": `url(${postImage.src})` }}
            />
            <div className={styles.panel}>
              <span className={styles.badge}>استطلاع</span>
              <p className={styles.question}>{poll.q}</p>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${poll.pct}%` }}
                />
              </div>
              <span className={styles.pctLabel}>{poll.pct}%</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
