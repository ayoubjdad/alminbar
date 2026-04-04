"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import postImage from "../../assets/images/post_large.webp";
import {
  fetchArticlesBySiteCategory,
  fetchNewsByCategory,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import { useStaticData } from "../../../lib/staticData";
import styles from "./TopicGridSection.module.scss";

const COLUMN_SLUGS = ["botola", "morocco", "international", "matches"];

/** @param {{ columns?: { title: string, sectionKey: string, value: string, siteSectionSlug?: string | null }[] }} props */
export default function TopicGridSection({ columns: cmsColumns }) {
  const { categories } = useStaticData();

  const bySlug = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.slug, c])),
    [categories],
  );

  const qBotola = useQuery({
    queryKey: queryKeys.siteCategory("botola"),
    queryFn: () => fetchArticlesBySiteCategory("botola"),
    enabled: !cmsColumns?.length,
  });
  const qMorocco = useQuery({
    queryKey: queryKeys.siteCategory("morocco"),
    queryFn: () => fetchArticlesBySiteCategory("morocco"),
    enabled: !cmsColumns?.length,
  });
  const qIntl = useQuery({
    queryKey: queryKeys.siteCategory("international"),
    queryFn: () => fetchArticlesBySiteCategory("international"),
    enabled: !cmsColumns?.length,
  });
  const qMatches = useQuery({
    queryKey: queryKeys.siteCategory("matches"),
    queryFn: () => fetchArticlesBySiteCategory("matches"),
    enabled: !cmsColumns?.length,
  });

  const c0 = cmsColumns?.[0];
  const c1 = cmsColumns?.[1];
  const c2 = cmsColumns?.[2];
  const c3 = cmsColumns?.[3];

  const qCms0 = useQuery({
    queryKey: queryKeys.news(c0?.sectionKey ?? ""),
    queryFn: () => fetchNewsByCategory(c0?.sectionKey ?? ""),
    enabled: Boolean(c0?.sectionKey),
  });
  const qCms1 = useQuery({
    queryKey: queryKeys.news(c1?.sectionKey ?? ""),
    queryFn: () => fetchNewsByCategory(c1?.sectionKey ?? ""),
    enabled: Boolean(c1?.sectionKey),
  });
  const qCms2 = useQuery({
    queryKey: queryKeys.news(c2?.sectionKey ?? ""),
    queryFn: () => fetchNewsByCategory(c2?.sectionKey ?? ""),
    enabled: Boolean(c2?.sectionKey),
  });
  const qCms3 = useQuery({
    queryKey: queryKeys.news(c3?.sectionKey ?? ""),
    queryFn: () => fetchNewsByCategory(c3?.sectionKey ?? ""),
    enabled: Boolean(c3?.sectionKey),
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

  const cmsColumnData = useMemo(() => {
    if (!cmsColumns?.length) return null;
    return [
      qCms0.data ?? [],
      qCms1.data ?? [],
      qCms2.data ?? [],
      qCms3.data ?? [],
    ];
  }, [cmsColumns?.length, qCms0.data, qCms1.data, qCms2.data, qCms3.data]);

  const columns = useMemo(() => {
    if (cmsColumns?.length && cmsColumnData) {
      return cmsColumns.map((col, i) => {
        const items = cmsColumnData[i] ?? [];
        return {
          key: col.value,
          label: col.title,
          sectionHref:
            col.siteSectionSlug != null && col.siteSectionSlug !== ""
              ? `/category/${col.siteSectionSlug}`
              : null,
          featured: items[0],
          rest: items.slice(1, 4),
        };
      });
    }
    return COLUMN_SLUGS.map((slug) => {
      const cat = bySlug[slug];
      const items = byColumnKey[slug] ?? [];
      return {
        key: slug,
        label: cat?.label ?? slug,
        sectionHref: `/category/${slug}`,
        featured: items[0],
        rest: items.slice(1, 4),
      };
    });
  }, [bySlug, byColumnKey, cmsColumns, cmsColumnData]);

  const gridStyle =
    columns.length > 0
      ? { gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }
      : undefined;

  return (
    <section className={styles.root}>
      <div className={styles.grid} style={gridStyle}>
        {columns.map(({ key, label, sectionHref, featured, rest }) => (
          <div key={key} className={styles.column}>
            <div className={styles.featuredStack}>
              <div className={styles.badgeRow}>
                <div className={styles.badge}>
                  {sectionHref ? (
                    <Link href={sectionHref} className={styles.badgeTitleLink}>
                      <h2 className={styles.badgeTitle}>{label}</h2>
                    </Link>
                  ) : (
                    <h2 className={styles.badgeTitle}>{label}</h2>
                  )}
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
