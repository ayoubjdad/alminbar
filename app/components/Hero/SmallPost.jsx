import postImage from "../../assets/images/post_large.webp";
import styles from "./SmallPost.module.scss";

export default function SmallPost() {
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
