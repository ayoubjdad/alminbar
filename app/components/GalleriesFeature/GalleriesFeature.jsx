import postImage from "../../assets/images/post_large.webp";
import styles from "./GalleriesFeature.module.scss";

export default function GalleriesFeature() {
  return (
    <section className={styles.root}>
      <div className={styles.grid}>
        <article className={styles.card}>
          <div
            className={styles.media}
            style={{ "--post-bg": `url(${postImage.src})` }}
          >
            <div className={styles.overlay}>
              <span className={styles.icon} aria-hidden>
                <i className="fi fi-rr-play" />
              </span>
              <h2 className={styles.title}>معرض الفيديو</h2>
              <p className={styles.sub}>
                أبرز اللقطات والتقارير المصورة من المشهد
              </p>
            </div>
          </div>
        </article>
        <article className={styles.card}>
          <div
            className={styles.media}
            style={{ "--post-bg": `url(${postImage.src})` }}
          >
            <div className={styles.overlay}>
              <span className={styles.icon} aria-hidden>
                <i className="fi fi-rr-shop" />
              </span>
              <h2 className={styles.title}>سوق اليوم</h2>
              <p className={styles.sub}>
                تغطية اقتصادية لأهم الأسعار والمستجدات
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
