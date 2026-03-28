"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import {
  fetchNewsByCategory,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import SectionHeading from "../SectionHeading/SectionHeading";
import NewsCard from "./NewsCard";
import styles from "./NewsSection.module.scss";

export default function NewsSection({
  title = "أخبار لبنان",
  sectionKey = "lebanon",
  showCarouselNav = true,
}) {
  const scrollRef = useRef(null);

  const { data: cards = [], isPending } = useQuery({
    queryKey: queryKeys.news(sectionKey),
    queryFn: () => fetchNewsByCategory(sectionKey),
  });

  const scrollStep = useCallback(() => {
    const root = scrollRef.current;
    const slide = root?.querySelector("[data-news-slide]");
    if (!slide) return 300;
    const gap = 20;
    return slide.getBoundingClientRect().width + gap;
  }, []);

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const step = scrollStep();
    el.scrollBy({ left: rtl ? -step : step, behavior: "smooth" });
  }, [scrollStep]);

  const scrollPrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const step = scrollStep();
    el.scrollBy({ left: rtl ? step : -step, behavior: "smooth" });
  }, [scrollStep]);

  return (
    <section className={styles.root}>
      <div className={styles.headerRow}>
        <SectionHeading title={title} variant="inline" />
        {showCarouselNav ? (
          <div className={styles.carouselControls} aria-label="تصفح الأخبار">
            <button
              type="button"
              className={styles.carouselBtn}
              aria-label="السابق"
              onClick={scrollPrev}
            >
              <i className="fi fi-rr-angle-small-right" />
            </button>
            <button
              type="button"
              className={styles.carouselBtn}
              aria-label="التالي"
              onClick={scrollNext}
            >
              <i className="fi fi-rr-angle-small-left" />
            </button>
          </div>
        ) : null}
      </div>
      <div
        className={styles.carousel}
        ref={scrollRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
      >
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={styles.slide}
                data-news-slide
                aria-hidden
              >
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonThumb} />
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLineShort} />
                </div>
              </div>
            ))
          : cards.map((item) => (
              <div
                key={item.slug}
                className={styles.slide}
                data-news-slide
              >
                <NewsCard
                  title={item.title}
                  date={item.date}
                  slug={item.slug}
                  imageUrl={item.image}
                />
              </div>
            ))}
      </div>
    </section>
  );
}
