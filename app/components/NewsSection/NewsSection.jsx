"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  fetchNewsByCategory,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import SectionHeading from "../SectionHeading/SectionHeading";
import NewsCard from "./NewsCard";
import styles from "./NewsSection.module.scss";

export default function NewsSection({
  title = "أخبار رياضية",
  sectionKey = "moroccan-league",
  showCarouselNav = true,
}) {
  const scrollRef = useRef(null);
  /** مسافة من أعلى الكاروسيل إلى منتصف صورة البطاقة الأولى (لتمركز أزرار التمرير على الصور فقط) */
  const [thumbCenterY, setThumbCenterY] = useState(0);

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

  useLayoutEffect(() => {
    const carousel = scrollRef.current;
    if (!carousel) return;

    const measure = () => {
      const thumb = carousel.querySelector("[data-news-thumb]");
      if (thumb && thumb.offsetHeight > 0) {
        setThumbCenterY(thumb.offsetHeight / 2);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    const thumb = carousel.querySelector("[data-news-thumb]");
    if (thumb) ro.observe(thumb);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isPending, cards.length]);

  const navTop =
    thumbCenterY > 0
      ? thumbCenterY
      : undefined;

  return (
    <section className={styles.root}>
      <div className={styles.headerRow}>
        <SectionHeading title={title} variant="inline" />
      </div>
      <div className={styles.carouselViewport}>
        {showCarouselNav ? (
          <>
            <button
              type="button"
              className={styles.carouselBtnPrev}
              aria-label="السابق"
              style={
                navTop != null
                  ? { top: navTop, transform: "translateY(-50%)" }
                  : undefined
              }
              onClick={scrollPrev}
            >
              <i className="fi fi-rr-angle-small-right" aria-hidden />
            </button>
            <button
              type="button"
              className={styles.carouselBtnNext}
              aria-label="التالي"
              style={
                navTop != null
                  ? { top: navTop, transform: "translateY(-50%)" }
                  : undefined
              }
              onClick={scrollNext}
            >
              <i className="fi fi-rr-angle-small-left" aria-hidden />
            </button>
          </>
        ) : null}
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
                    <div className={styles.skeletonThumb} data-news-thumb />
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
      </div>
    </section>
  );
}
