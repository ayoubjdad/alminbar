import postImage from "../../assets/images/post_large.webp";
import styles from "./NewsCard.module.scss";

export default function NewsCard({ title, date }) {
  return (
    <article className={styles.card}>
      <div
        className={styles.thumb}
        style={{ "--post-bg": `url(${postImage.src})` }}
      />
      <div className={styles.body}>
        <p className={styles.headline}>{title}</p>
        {date ? <time className={styles.date}>{date}</time> : null}
      </div>
    </article>
  );
}
