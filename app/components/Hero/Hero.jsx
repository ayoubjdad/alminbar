import postImage from "../../assets/images/post_large.webp";
import SmallPost from "./SmallPost";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <div className={styles.root}>
      <div
        className={styles.featured}
        style={{ "--post-bg": `url(${postImage.src})` }}
      >
        <p className={styles.featuredTitle}>
          هذه خطة إسرائيل التي قدمتها لترامب لحرب إيران.. لماذا لم تنجح؟
        </p>
      </div>
      <div className={styles.column}>
        <SmallPost />
        <SmallPost />
      </div>
      <div className={styles.column}>
        <SmallPost />
        <SmallPost />
      </div>
    </div>
  );
}
