"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import { useStaticData } from "../../../lib/staticData";
import styles from "./TodaysGamesSection.module.scss";
import Image from "next/image";

const CAROUSEL_GAP_PX = 14;

export default function TodaysGamesSection() {
  const scrollRef = useRef(null);
  const { matches: staticMatches } = useStaticData();
  const [liveMatches, setLiveMatches] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/matches/today", { cache: "no-store" })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (cancelled) return;
        const arr = Array.isArray(data.matches) ? data.matches : [];
        setLiveMatches(arr);
      })
      .catch(() => {
        if (!cancelled) setLiveMatches([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const matches =
    liveMatches === undefined
      ? staticMatches
      : liveMatches.length > 0
      ? liveMatches
      : staticMatches;
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
          {matches.map((m) => (
            <div
              key={m.id}
              className={styles.slide}
              data-game-slide
              role="listitem"
            >
              <article className={styles.card}>
                {/* <div className={styles.league}>{m.league}</div> */}
                <div className={styles.teams}>
                  <div className={styles.teamContainer}>
                    {/* <Image
                      src={`https://images.elbotola.com/stats/logos/j1l4rjnho9jm7vx.png`}
                      alt={m.home}
                      width={48}
                      height={48}
                      className={styles.teamLogo}
                    /> */}
                    <span className={styles.team}>{m.home}</span>
                  </div>
                  <span className={styles.vs}>ضد</span>
                  <div className={styles.teamContainer}>
                    {/* <Image
                      // src={`https://img.sofascore.com/api/v1/team/${m.away.id}/image`}
                      src="https://img.sofascore.com/api/v1/team/41757/image"
                      alt={m.away}
                      width={48}
                      height={48}
                      className={styles.teamLogo}
                    /> */}
                    <span className={styles.team}>{m.away}</span>
                  </div>
                </div>
                <div className={styles.meta}>
                  <time className={styles.time}>{m.time}</time>
                  <span className={styles.dot} aria-hidden />
                  <span className={styles.venue}>{m.venue}</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
