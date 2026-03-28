"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStaticData } from "../../../lib/staticData";
import SmallPost from "./SmallPost";
import styles from "./Hero.module.scss";

export default function Hero() {
  const { articles, trendingOrder } = useStaticData();

  const pool = useMemo(() => {
    const map = Object.fromEntries(articles.map((a) => [a.slug, a]));
    const ordered = trendingOrder.map((slug) => map[slug]).filter(Boolean);
    const rest = articles.filter((a) => !trendingOrder.includes(a.slug));
    return [...ordered, ...rest];
  }, [articles, trendingOrder]);

  const featured = pool[0];
  const side = pool.slice(1, 5);

  if (!featured) {
    return null;
  }

  return (
    <div className={styles.root}>
      <Link
        href={`/article/${featured.slug}`}
        className={styles.featured}
        style={{ "--post-bg": `url(${featured.image})` }}
      >
        <p className={styles.featuredTitle}>{featured.title}</p>
      </Link>
      <div className={styles.column}>
        {side.slice(0, 2).map((a) => (
          <SmallPost
            key={a.slug}
            title={a.title}
            slug={a.slug}
            imageUrl={a.image}
          />
        ))}
      </div>
      <div className={styles.column}>
        {side.slice(2, 4).map((a) => (
          <SmallPost
            key={a.slug}
            title={a.title}
            slug={a.slug}
            imageUrl={a.image}
          />
        ))}
      </div>
    </div>
  );
}
