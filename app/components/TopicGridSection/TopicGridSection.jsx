"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import postImage from "../../assets/images/post_large.webp";
import {
  fetchArticlesBySiteCategory,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import { useStaticData } from "../../../lib/staticData";
import styles from "./TopicGridSection.module.scss";

const COLUMN_SLUGS = ["botola", "morocco", "international", "matches"];

export default function TopicGridSection() {
  const { categories } = useStaticData();

  const bySlug = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, c])),
    [categories],
  );

  const qBotola = useQuery({
    queryKey: queryKeys.siteCategory("botola"),
    queryFn: () => fetchArticlesBySiteCategory("botola"),
  });
  const qMorocco = useQuery({
    queryKey: queryKeys.siteCategory("morocco"),
    queryFn: () => fetchArticlesBySiteCategory("morocco"),
  });
  const qIntl = useQuery({
    queryKey: queryKeys.siteCategory("international"),
    queryFn: () => fetchArticlesBySiteCategory("international"),
  });
  const qMatches = useQuery({
    queryKey: queryKeys.siteCategory("matches"),
    queryFn: () => fetchArticlesBySiteCategory("matches"),
  });

  const byColumnKey = useMemo(
    () => ({
      botola: qBotola.data ?? [],
      morocco: qMorocco.data ?? [],
      international: qIntl.data ?? [],
      matches: qMatches.data ?? [],
    }),
    [qBotola.data, qMorocco.data, qIntl.data, qMatches.data],
  );

  const columns = useMemo(
    () =>
      COLUMN_SLUGS.map((slug) => {
        const cat = bySlug[slug];
        const items = byColumnKey[slug] ?? [];
        return {
          cat,
          featured: items[0],
          rest: items.slice(1, 4),
        };
      }),
    [bySlug, byColumnKey],
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
