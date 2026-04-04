"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchNewsByCategory,
  fetchTrendingNews,
  queryKeys,
} from "../../../lib/queries/newsQueries";
import LeagueRankingsPanel from "../LeagueRankingsPanel/LeagueRankingsPanel";
import styles from "./ReadingLatestVideo.module.scss";

export default function ReadingLatestVideo() {
  const { data: mostRead = [] } = useQuery({
    queryKey: queryKeys.trending(),
    queryFn: fetchTrendingNews,
  });

  const { data: arabWorld = [] } = useQuery({
    queryKey: queryKeys.news("arab-world"),
    queryFn: () => fetchNewsByCategory("arab-world"),
  });

  const { data: moroccoSports = [] } = useQuery({
    queryKey: queryKeys.news("morocco-sports"),
    queryFn: () => fetchNewsByCategory("morocco-sports"),
  });

  const latest = useMemo(() => {
    const rows = [...arabWorld, ...moroccoSports];
    return rows.slice(0, 5);
  }, [arabWorld, moroccoSports]);

  const trendingSlice = useMemo(
    () => mostRead.slice(0, 5),
    [mostRead],
  );

  return (
    <section className={styles.root} id="league-rankings">
      <div className={styles.rankingsCol}>
        <h2 className={styles.colTitle}>ترتيب الدوري المغربي</h2>
        <LeagueRankingsPanel />
      </div>

      <div className={styles.col}>
        <h2 className={styles.colTitle}>الأكثر متابعة</h2>
        <ol className={styles.mostReadList}>
          {trendingSlice.map((article, i) => (
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
