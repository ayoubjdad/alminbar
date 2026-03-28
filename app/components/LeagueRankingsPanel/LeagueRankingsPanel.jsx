"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { DEFAULT_LEAGUE_TABS } from "../../../lib/data/footballRankings";
import styles from "./LeagueRankingsPanel.module.scss";

/**
 * تبويبات بشعارات الدوريات (صف أفقي) + لوحة ترتيب واحدة.
 * `tabs`: مصفوفة من `DEFAULT_LEAGUE_TABS` أو بياناتك.
 */
export default function LeagueRankingsPanel({ tabs = DEFAULT_LEAGUE_TABS }) {
  const baseId = useId();
  const defaultIdx = useMemo(() => {
    const i = tabs.findIndex((t) => t.id === "botola");
    return i >= 0 ? i : 0;
  }, [tabs]);

  const [activeIdx, setActiveIdx] = useState(defaultIdx);
  const active = tabs[activeIdx] ?? tabs[0];
  const panelId = `${baseId}-panel`;

  if (!active) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.tabStrip}>
        <div
          className={styles.logoTabRow}
          dir="ltr"
          role="tablist"
          aria-label="اختر الدوري"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={activeIdx === i}
              aria-controls={panelId}
              className={`${styles.logoTab} ${
                activeIdx === i ? styles.logoTabActive : ""
              }`}
              onClick={() => setActiveIdx(i)}
              title={tab.name}
              aria-label={tab.name}
            >
              <span className={styles.logoFrame}>
                <Image
                  src={tab.logo}
                  alt=""
                  width={56}
                  height={56}
                  className={styles.logoImg}
                  sizes="56px"
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className={styles.panel}
      >
        {active.kind === "botola" ? (
          <section className={styles.block}>
            <div className={styles.blockHead}>
              <h3 className={styles.blockTitle}>
                {active.label ?? active.name}
              </h3>
              {active.seasonLabel ? (
                <span className={styles.season}>{active.seasonLabel}</span>
              ) : null}
            </div>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">الفريق</th>
                    <th scope="col">لعب</th>
                    <th scope="col">نقاط</th>
                    <th scope="col">±</th>
                  </tr>
                </thead>
                <tbody>
                  {active.rows.map((row) => (
                    <tr key={`${row.rank}-${row.team}`}>
                      <td className={styles.rank}>{row.rank}</td>
                      <td className={styles.team}>{row.team}</td>
                      <td className={styles.num}>{row.mp ?? "—"}</td>
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
        ) : (
          <section className={styles.worldBlock}>
            <div className={styles.worldHead}>
              <h3 className={styles.worldTitle}>{active.name}</h3>
              {active.country ? (
                <span className={styles.worldCountry}>{active.country}</span>
              ) : null}
            </div>
            <div className={styles.miniScroll}>
              <table className={styles.miniTable}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">الفريق</th>
                    <th scope="col">لعب</th>
                    <th scope="col">نقاط</th>
                    <th scope="col">±</th>
                  </tr>
                </thead>
                <tbody>
                  {active.rows.map((r) => (
                    <tr key={`${active.id}-${r.rank}-${r.team}`}>
                      <td className={styles.miniRank}>{r.rank}</td>
                      <td className={styles.miniTeam}>{r.team}</td>
                      <td className={styles.miniNum}>{r.mp ?? "—"}</td>
                      <td className={styles.miniPts}>{r.pts}</td>
                      <td className={styles.miniGd}>
                        {r.gd != null ? (r.gd > 0 ? `+${r.gd}` : r.gd) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      <p className={styles.note}>بيانات عيّنة — جاهزة لاستبدالها بمصدر حيّ.</p>
    </div>
  );
}
