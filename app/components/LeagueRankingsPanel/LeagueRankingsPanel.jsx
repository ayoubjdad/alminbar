"use client";

import Image from "next/image";
import { rowMatchesNames } from "../../../lib/data/botolaStandingsMatch";
import { DEFAULT_BOTOLA_STANDINGS } from "../../../lib/data/footballRankings";
import styles from "./LeagueRankingsPanel.module.scss";

/**
 * جدول ترتيب البطولة الاحترافية (البوتولا) فقط.
 * `standings`: اختياري — الافتراضي `DEFAULT_BOTOLA_STANDINGS`.
 * `highlightTeamNames`: أسماء لمطابقة صف الفريق الحالي (مثل صفحة النادي).
 */
export default function LeagueRankingsPanel({
  standings: standingsProp,
  highlightTeamNames,
} = {}) {
  const data = standingsProp ?? DEFAULT_BOTOLA_STANDINGS;
  const rows = data.rows ?? [];
  const showGoalCols = rows.some(
    (r) => r.goalsFor != null && r.goalsAgainst != null
  );

  if (!rows.length) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.panel}>
        <section className={styles.block}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">الفريق</th>
                  <th scope="col">لعب</th>
                  {showGoalCols ? (
                    <>
                      <th scope="col">له</th>
                      <th scope="col">عليه</th>
                    </>
                  ) : null}
                  <th scope="col">نقاط</th>
                  <th scope="col">±</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={`${row.rank}-${row.team}`}
                    className={
                      rowMatchesNames(row.team, highlightTeamNames)
                        ? styles.rowHighlight
                        : undefined
                    }
                  >
                    <td className={styles.rank}>{row.rank}</td>
                    <td className={styles.team}>
                      {row.logo ? (
                        row.teamUrl ? (
                          <a
                            href={row.teamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.teamLink}
                          >
                            <Image
                              src={row.logo}
                              alt=""
                              width={22}
                              height={22}
                              className={styles.teamRowLogo}
                              sizes="22px"
                            />
                            <span className={styles.teamName}>{row.team}</span>
                          </a>
                        ) : (
                          <span className={styles.teamLink}>
                            <Image
                              src={row.logo}
                              alt=""
                              width={22}
                              height={22}
                              className={styles.teamRowLogo}
                              sizes="22px"
                            />
                            <span className={styles.teamName}>{row.team}</span>
                          </span>
                        )
                      ) : (
                        row.team
                      )}
                    </td>
                    <td className={styles.num}>{row.mp ?? "—"}</td>
                    {showGoalCols ? (
                      <>
                        <td className={styles.num}>{row.goalsFor ?? "—"}</td>
                        <td className={styles.num}>
                          {row.goalsAgainst ?? "—"}
                        </td>
                      </>
                    ) : null}
                    <td className={styles.pts}>{row.pts}</td>
                    <td className={styles.gd}>
                      {row.gd != null
                        ? row.gd > 0
                          ? `+${row.gd}`
                          : row.gd
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
