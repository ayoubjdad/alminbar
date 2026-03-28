"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import {
  fetchTrendingNews,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import styles from "./TrendingNowSection.module.scss";

const TITLE = "يتصدر الآن";

export default function TrendingNowSection() {
  const { data: items = [], isPending } = useQuery({
    queryKey: queryKeys.trending(),
    queryFn: fetchTrendingNews,
  });

  return (
    <section className={styles.root}>
      <div className={styles.bar}>
        <h2 className={styles.barTitle}>{TITLE}</h2>
      </div>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {isPending
            ? Array.from({ length: 6 }).map((_, i) => (
                <article key={i} className={styles.card} aria-hidden>
                  <div className={styles.skeletonThumb} />
                  <div className={styles.skeletonLine} />
                </article>
              ))
            : items.map((article) => (
                <article key={article.slug} className={styles.card}>
                  <Link
                    href={`/article/${article.slug}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.thumb}>
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        className={styles.thumbImg}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <p className={styles.headline}>{article.title}</p>
                  </Link>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
