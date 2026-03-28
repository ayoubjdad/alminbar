"use client";

import { useMemo } from "react";
import Link from "next/link";
import postImage from "../../assets/images/post_large.webp";
import {
  getArticlesBySiteCategory,
  useStaticData,
} from "../../../lib/staticData";
import styles from "./TopicGridSection.module.scss";

const COLUMN_SLUGS = ["sports", "tech", "health", "society"];

export default function TopicGridSection() {
  const { categories } = useStaticData();

  const bySlug = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, c])),
    [categories],
  );

  const columns = useMemo(
    () =>
      COLUMN_SLUGS.map((slug) => {
        const cat = bySlug[slug];
        const items = getArticlesBySiteCategory(slug);
        return {
          cat,
          featured: items[0],
          rest: items.slice(1, 4),
        };
      }),
    [bySlug],
  );

  return (
    <section className={styles.root}>
      <div className={styles.grid}>
        {columns.map(({ cat, featured, rest }) => (
          <div key={cat.slug} className={styles.column}>
            <div className={styles.featuredStack}>
              <div className={styles.badgeRow}>
                <div className={styles.badge}>
                  <h2 className={styles.badgeTitle}>{cat.label}</h2>
                </div>
              </div>
              <div
                className={styles.featuredImg}
                style={{
                  "--post-bg": `url(${featured?.image ?? postImage.src})`,
                }}
              />
            </div>

            {featured ? (
              <>
                <article className={styles.featuredArticle}>
                  <Link href={`/article/${featured.slug}`} className={styles.featuredLink}>
                    <p className={styles.featuredText}>{featured.title}</p>
                    <time className={styles.featuredTime}>{featured.date}</time>
                  </Link>
                </article>

                <ul className={styles.list}>
                  {rest.map((row) => (
                    <li key={row.slug} className={styles.listItem}>
                      <Link href={`/article/${row.slug}`} className={styles.listLink}>
                        <p className={styles.listTitle}>{row.title}</p>
                        <span className={styles.listDate}>{row.date}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className={styles.empty}>لا توجد مواد في هذا القسم حالياً.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
