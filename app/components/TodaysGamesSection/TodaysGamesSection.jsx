"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./TodaysGamesSection.module.scss";

const CAROUSEL_GAP_PX = 14;

export default function TodaysGamesSection() {
  const scrollRef = useRef(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/matches/today", { cache: "no-store" })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (cancelled) return;
        const arr = Array.isArray(data.matches) ? data.matches : [];
        setMatches(arr);
      })
      .catch(() => {
        if (!cancelled) setMatches([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const todayLabel = new Intl.DateTimeFormat("ar-MA-u-ca-gregory", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const scrollStep = useCallback(() => {
    const root = scrollRef.current;
    const slide = root?.querySelector("[data-game-slide]");
    if (!slide) return 300;
    return slide.getBoundingClientRect().width + CAROUSEL_GAP_PX;
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
    <section
      className={styles.root}
      id="todays-games"
      aria-labelledby="todays-games-heading"
    >
      <div className={styles.head}>
        <SectionHeading id="todays-games-heading" title="مباريات اليوم" />
        <p className={styles.dateLine}>{todayLabel}</p>
      </div>
      <div className={styles.carouselViewport}>
        <button
          type="button"
          className={styles.carouselBtnPrev}
          aria-label="السابق"
          onClick={scrollPrev}
        >
          <i className="fi fi-rr-angle-small-right" aria-hidden />
        </button>
        <button
          type="button"
          className={styles.carouselBtnNext}
          aria-label="التالي"
          onClick={scrollNext}
        >
          <i className="fi fi-rr-angle-small-left" aria-hidden />
        </button>
        <div
          className={styles.carousel}
          ref={scrollRef}
          role="list"
          aria-label="مباريات اليوم"
        >
          {loading ? (
            <p className={styles.empty} role="status">
              جاري تحميل المباريات…
            </p>
          ) : matches.length === 0 ? (
            <p className={styles.empty} role="status">
              لا توجد مباريات معروضة حالياً.
            </p>
          ) : (
            matches.map((m) => (
              <div
                key={m.id}
                className={styles.slide}
                data-game-slide
                role="listitem"
              >
                <article className={styles.card}>
                  <div className={styles.teams}>
                    <div className={styles.teamContainer}>
                      <span className={styles.team}>{m.home}</span>
                    </div>
                    <span className={styles.vs}>ضد</span>
                    <div className={styles.teamContainer}>
                      <span className={styles.team}>{m.away}</span>
                    </div>
                  </div>
                  <div className={styles.meta}>
                    <time className={styles.time}>{m.time}</time>
                  </div>
                </article>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
