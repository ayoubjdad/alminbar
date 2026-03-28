"use client";

import SectionHeading from "../SectionHeading/SectionHeading";
import { useStaticData } from "../../../lib/staticData";
import styles from "./TodaysGamesSection.module.scss";

export default function TodaysGamesSection() {
  const { matches } = useStaticData();
  const todayLabel = new Intl.DateTimeFormat("ar-MA-u-ca-gregory", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

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
      <div className={styles.track} role="list">
        {matches.map((m) => (
          <article key={m.id} className={styles.card} role="listitem">
            <div className={styles.league}>{m.league}</div>
            <div className={styles.teams}>
              <span className={styles.team}>{m.home}</span>
              <span className={styles.vs}>ضد</span>
              <span className={styles.team}>{m.away}</span>
            </div>
            <div className={styles.meta}>
              <time className={styles.time}>{m.time}</time>
              <span className={styles.dot} aria-hidden />
              <span className={styles.venue}>{m.venue}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
