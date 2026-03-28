"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
          <p key={i} className={styles.paragraph}>
            {para}
          </p>
        ))}
      </div>
    </article>
  );
}
