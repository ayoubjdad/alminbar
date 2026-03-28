import Link from "next/link";
import postImage from "../../assets/images/post_large.webp";
import styles from "./SmallPost.module.scss";

export default function SmallPost({ title, slug, imageUrl }) {
  const bg = imageUrl ?? postImage.src;
  return (
    <Link
      href={`/article/${slug}`}
      className={styles.root}
      style={{ "--post-bg": `url(${bg})` }}
    >
      <p className={styles.title}>{title}</p>
    </Link>
  );
}
