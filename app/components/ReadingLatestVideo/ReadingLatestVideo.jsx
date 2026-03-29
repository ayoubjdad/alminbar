"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  getArticlesByCategory,
  getTrendingArticles,
  useStaticData,
} from "../../../lib/staticData";
import LeagueRankingsPanel from "../LeagueRankingsPanel/LeagueRankingsPanel";
import styles from "./ReadingLatestVideo.module.scss";

export default function ReadingLatestVideo({ leagueTabs: leagueTabsProp }) {
  const { leagueTabs: leagueTabsFromContext } = useStaticData();
  const leagueTabs = leagueTabsProp ?? leagueTabsFromContext;

  const mostRead = useMemo(() => getTrendingArticles().slice(0, 5), []);

  const latest = useMemo(() => {
    const rows = [
      ...getArticlesByCategory("arab-world"),
      ...getArticlesByCategory("morocco-sports"),
    ];
    return rows.slice(0, 5);
  }, []);

  return (
    <section className={styles.root} id="league-rankings">
      <div className={styles.rankingsCol}>
        <h2 className={styles.colTitle}>ترتيب الدوريات</h2>
        <LeagueRankingsPanel tabs={leagueTabs} />
      </div>

      <div className={styles.col}>
        <h2 className={styles.colTitle}>الأكثر متابعة</h2>
        <ol className={styles.mostReadList}>
          {mostRead.map((article, i) => (
            <li key={article.slug} className={styles.mostReadItem}>
              <Link href={`/article/${article.slug}`} className={styles.mostReadRow}>
                <span className={styles.num}>{i + 1}</span>
                <span className={styles.mostReadText}>{article.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.col}>
        <h2 className={styles.colTitle}>آخر الأخبار الكروية</h2>
        <ul className={styles.latestList}>
          {latest.map((article) => (
            <li key={article.slug} className={styles.latestItem}>
              <Link href={`/article/${article.slug}`} className={styles.latestLink}>
                <p className={styles.latestText}>{article.title}</p>
                <span className={styles.latestTime}>{article.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
