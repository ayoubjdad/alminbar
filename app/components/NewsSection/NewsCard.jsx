import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.scss";

export default function NewsCard({ title, date, slug, imageUrl }) {
  const href = slug ? `/article/${slug}` : "#";

  const inner = (
    <>
      <div className={styles.thumb}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            className={styles.thumbImg}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 25vw"
          />
        ) : null}
      </div>
      <div className={styles.body}>
        <p className={styles.headline}>{title}</p>
        {date ? <time className={styles.date}>{date}</time> : null}
      </div>
    </>
  );

  if (!slug) {
    return <article className={styles.card}>{inner}</article>;
  }

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.link}>
        {inner}
      </Link>
    </article>
  );
}
