"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import {
  fetchVarietyNews,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./VarietiesSection.module.scss";

export default function VarietiesSection() {
  const { data: items = [], isPending } = useQuery({
    queryKey: queryKeys.variety(),
    queryFn: fetchVarietyNews,
  });

  return (
    <section className={styles.root}>
      <SectionHeading title="ملفات ومنوعات كروية" />
      <div className={styles.grid}>
        {isPending
          ? Array.from({ length: 5 }).map((_, i) => (
              <article key={i} className={styles.card} aria-hidden>
                <div className={styles.skeletonPortrait} />
                <div className={styles.skeletonCaption} />
              </article>
            ))
          : items.map((item) => (
              <article key={item.slug} className={styles.card}>
                <Link
                  href={`/article/${item.slug}`}
                  className={styles.cardLink}
                >
                  <div className={styles.portraitWrap}>
                    <div className={styles.portrait}>
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className={styles.portraitImg}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                    <div className={styles.videoOverlay} aria-hidden />
                    <div className={styles.playRing} aria-hidden>
                      <span className={styles.playIcon}>
                        <i className="fi fi-rr-play" />
                      </span>
                    </div>
                  </div>
                  <p className={styles.caption}>{item.title}</p>
                </Link>
              </article>
            ))}
      </div>
    </section>
  );
}
