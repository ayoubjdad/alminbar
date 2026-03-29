"use client";

import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import AdZone from "../../components/AdZone/AdZone";
import { AD_SLOTS } from "../../../lib/adSlots";
import {
  fetchArticleBySlug,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import styles from "./ArticleContent.module.scss";

export default function ArticleContent({ slug }) {
  const { data: article, isPending } = useQuery({
    queryKey: queryKeys.article(slug),
    queryFn: () => fetchArticleBySlug(slug),
  });

  if (isPending) {
    return (
      <div className={styles.root}>
        <div className={styles.skeletonHero} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.root}>
        <p className={styles.notFound}>المقال غير موجود.</p>
        <Link href="/" className={styles.back}>
          العودة إلى الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <article className={styles.root}>
      <Link href="/" className={styles.back}>
        العودة إلى الرئيسية
      </Link>
      <header className={styles.header}>
        <time className={styles.date}>{article.date}</time>
        <h1 className={styles.title}>{article.title}</h1>
        {article.excerpt ? (
          <p className={styles.excerpt}>{article.excerpt}</p>
        ) : null}
        <div className={styles.metaRow}>
          {article.authorNameAr ? (
            <span className={styles.metaItem}>بقلم: {article.authorNameAr}</span>
          ) : null}
          {article.readTimeMinutes ? (
            <span className={styles.metaItem}>{article.readTimeMinutes} دقيقة قراءة</span>
          ) : null}
          {article.cmsMeta?.status === "draft" ? (
            <span className={styles.draftBadge}>مسودة</span>
          ) : null}
        </div>
        {article.tags?.length ? (
          <ul className={styles.tagList} aria-label="وسوم">
            {article.tags.map((t) => (
              <li key={t} className={styles.tag}>
                #{t}
              </li>
            ))}
          </ul>
        ) : null}
        {article.linkedClubs?.length ? (
          <div className={styles.relatedBlock}>
            <span className={styles.relatedLabel}>أندية ذات صلة:</span>
            <ul className={styles.relatedList}>
              {article.linkedClubs.map((clubSlug) => (
                <li key={clubSlug}>
                  <Link href={`/club/${clubSlug}`} className={styles.relatedLink}>
                    {clubSlug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {article.relatedLeagues?.length ? (
          <div className={styles.relatedBlock}>
            <span className={styles.relatedLabel}>مسابقات:</span>
            <ul className={styles.relatedList}>
              {article.relatedLeagues.map((lg) => (
                <li key={lg.slug}>{lg.labelAr ?? lg.slug}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </header>
      <div className={styles.hero}>
        <Image
          src={article.image}
          alt=""
          fill
          className={styles.heroImg}
          sizes="(max-width: 768px) 100vw, 900px"
          priority
        />
      </div>
      <div className={styles.body}>
        {article.body?.map((para, i) => (
          <Fragment key={i}>
            <p className={styles.paragraph}>{para}</p>
            {i === 0 ? (
              <div className={styles.adInline}>
                <AdZone slot={AD_SLOTS.ARTICLE_INLINE} variant="rectangle" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className={styles.adBottom}>
        <AdZone slot={AD_SLOTS.ARTICLE_BOTTOM} variant="leaderboard" />
      </div>
    </article>
  );
}
