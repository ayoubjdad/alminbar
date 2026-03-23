import postImage from "../../assets/images/post_large.webp";
import styles from "./NewsPost.module.scss";

export default function NewsPost() {
  return (
    <div
      className={styles.root}
      style={{ "--post-bg": `url(${postImage.src})` }}
    >
      <p className={styles.title}>
        أمين عام الناتو: الحلف قادر على إعادة فتح مضيق هرمز
      </p>
    </div>
  );
}
