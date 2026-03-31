import { useEffect, useMemo, useState } from "react";
import styles from "./ArticlesSuggestions.module.scss";
import {
  parseHesportFlashArticles,
  buildHesportFlashSnapshot,
} from "../../../lib/suggestions/hesportFlash";
import {
  mergeSuggestionSources,
  sortSuggestionsByDateDesc,
} from "../../../lib/suggestions/elbotolaChrono";

const HESPORT_HOME = "https://www.hesport.com/";

export default function ArticlesSuggestions() {
  const [hesportHtml, setHesportHtml] = useState("");
  /** Loaded via same-origin API (server fetches elbotola.com — avoids browser CORS). */
  const [elbotolaChrono, setElbotolaChrono] = useState([]);
  const [errHesport, setErrHesport] = useState(null);
  const [errElbotola, setErrElbotola] = useState(null);

  const hesportSuggestions = useMemo(
    () => (hesportHtml ? parseHesportFlashArticles(hesportHtml) : []),
    [hesportHtml]
  );

  const combinedSuggestions = useMemo(() => {
    const hesportFetchedAt = hesportHtml
      ? new Date(
          buildHesportFlashSnapshot(hesportSuggestions, {
            sourceUrl: HESPORT_HOME,
          }).fetchedAt
        )
      : new Date();
    const merged = mergeSuggestionSources(hesportSuggestions, elbotolaChrono, {
      hesportFetchedAt,
    });
    return sortSuggestionsByDateDesc(merged);
  }, [hesportHtml, hesportSuggestions, elbotolaChrono]);

  function timestampToDate(ts) {
    return new Date(ts);
  }

  /** Fetches are independent: if Elbotola fails (CORS/network), Hesport still loads. */
  useEffect(() => {
    let cancelled = false;
    fetch(HESPORT_HOME)
      .then((r) => r.text())
      .then((data) => {
        if (!cancelled) setHesportHtml(data);
      })
      .catch((err) => console.error("Hesport fetch failed:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  /** Server-side fetch in Route Handler — no CORS in the browser. */
  useEffect(() => {
    let cancelled = false;
    fetch("/api/suggestions/elbotola-chrono", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || res.statusText);
        if (!cancelled) {
          setElbotolaChrono(Array.isArray(data.articles) ? data.articles : []);
          setErrElbotola(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setElbotolaChrono([]);
          setErrElbotola(e instanceof Error ? e.message : String(e));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hesportHtml) return;
    let cancelled = false;
    fetch("/api/suggestions/hesport-flash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: hesportHtml, sourceUrl: HESPORT_HOME }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || res.statusText);
        if (!cancelled) setErrHesport(null);
      })
      .catch((e) => {
        if (!cancelled) {
          setErrHesport(e instanceof Error ? e.message : String(e));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [hesportHtml]);

  return (
    <section className={styles.listSection}>
      <div className={styles.combinedPanel}>
        <h2 className={styles.combinedH2}>
          قائمة الاقتراحات الموحّدة ({combinedSuggestions.length})
        </h2>
        <p className={styles.combinedLead}>
          دمج فلاش هسبورت + كرونو البطولة — مرتبة حسب التاريخ (الأحدث أولاً).
        </p>
        {errHesport || errElbotola ? (
          <p className={styles.flashErr} role="alert">
            {errHesport ? `هسبورت: ${errHesport}` : ""}
            {errHesport && errElbotola ? " · " : ""}
            {errElbotola ? `البطولة: ${errElbotola}` : ""}
          </p>
        ) : null}
        <div className={styles.combinedTableWrap}>
          <table className={styles.combinedTable}>
            <thead>
              <tr>
                <th>الوقت</th>
                <th>المصدر</th>
                <th>العنوان</th>
              </tr>
            </thead>
            <tbody>
              {combinedSuggestions.map((row) => (
                <tr key={`${row.source}-${row.url}`}>
                  <td className={styles.combinedTime}>
                    {timestampToDate(row.sortAt).toLocaleString()}
                  </td>
                  <td>{row.sourceLabel}</td>
                  <td>
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.combinedLink}
                    >
                      {row.headline}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
