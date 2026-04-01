import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ArticlesSuggestions.module.scss";
import {
  parseHesportFlashArticles,
  buildHesportFlashSnapshot,
} from "../../../lib/suggestions/hesportFlash";
import {
  mergeSuggestionSources,
  sortSuggestionsByDateDesc,
} from "../../../lib/suggestions/elbotolaChrono";
import { makeSuggestionKey } from "../../../lib/suggestions/suggestionKey";

const HESPORT_HOME = "https://www.hesport.com/";

export default function ArticlesSuggestions() {
  const [hesportHtml, setHesportHtml] = useState("");
  const [elbotolaChrono, setElbotolaChrono] = useState([]);
  const [errHesport, setErrHesport] = useState(null);
  const [errElbotola, setErrElbotola] = useState(null);
  const [dismissed, setDismissed] = useState(new Set());
  const [pendingKey, setPendingKey] = useState(null);
  const [notice, setNotice] = useState(null);

  const hesportSuggestions = useMemo(
    () => (hesportHtml ? parseHesportFlashArticles(hesportHtml) : []),
    [hesportHtml],
  );

  const combinedSuggestions = useMemo(() => {
    const hesportFetchedAt = hesportHtml
      ? new Date(
          buildHesportFlashSnapshot(hesportSuggestions, {
            sourceUrl: HESPORT_HOME,
          }).fetchedAt,
        )
      : new Date();
    const merged = mergeSuggestionSources(hesportSuggestions, elbotolaChrono, {
      hesportFetchedAt,
    });
    return sortSuggestionsByDateDesc(merged);
  }, [hesportHtml, hesportSuggestions, elbotolaChrono]);

  const visibleRows = useMemo(() => {
    return combinedSuggestions.filter((row) => {
      const k = makeSuggestionKey(row);
      return !dismissed.has(k);
    });
  }, [combinedSuggestions, dismissed]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/suggestions/state", { cache: "no-store" })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (cancelled) return;
        const arr = Array.isArray(data.dismissed) ? data.dismissed : [];
        setDismissed(new Set(arr));
      })
      .catch(() => {
        if (!cancelled) setDismissed(new Set());
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

  const onDismiss = useCallback(async (row) => {
    const key = makeSuggestionKey(row);
    setPendingKey(key);
    setNotice(null);
    try {
      const res = await fetch("/api/suggestions/dismiss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "فشل الرفض");
      setDismissed((prev) => new Set([...prev, key]));
    } catch (e) {
      setNotice(e instanceof Error ? e.message : String(e));
    } finally {
      setPendingKey(null);
    }
  }, []);

  const onAccept = useCallback(async (row) => {
    const key = makeSuggestionKey(row);
    setPendingKey(key);
    setNotice(null);
    try {
      const res = await fetch("/api/suggestions/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          source: row.source,
          url: row.url,
          headline: row.headline || row.title,
          sourceLabel: row.sourceLabel,
          timeLabel: row.timeLabel,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "فشل الإضافة");
      setDismissed((prev) => new Set([...prev, key]));
      setNotice(
        `تمت إضافة مسودة «${data.slug || ""}» — يمكنك تعديلها من تبويب المقالات.`,
      );
    } catch (e) {
      setNotice(e instanceof Error ? e.message : String(e));
    } finally {
      setPendingKey(null);
    }
  }, []);

  function formatTime(row) {
    if (row.timeLabel) return row.timeLabel;
    if (row.sortAt != null) {
      try {
        return new Date(row.sortAt).toLocaleString("ar-MA", {
          dateStyle: "short",
          timeStyle: "short",
        });
      } catch {
        return "—";
      }
    }
    return "—";
  }

  return (
    <section className={styles.listSection}>
      <div className={styles.combinedPanel}>
        <h2 className={styles.combinedH2}>
          قائمة الاقتراحات الموحّدة ({visibleRows.length})
        </h2>
        <p className={styles.combinedLead}>
          دمج فلاش هسبورت + كرونو البطولة — قبول يُنشئ مسودة في المقالات؛ رفض يُخفيه
          من القائمة.
        </p>
        {notice ? (
          <p className={styles.noticeBanner} role="status">
            {notice}
          </p>
        ) : null}
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
                <th className={styles.actionsTh}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => {
                const key = makeSuggestionKey(row);
                const busy = pendingKey === key;
                return (
                  <tr key={key}>
                    <td className={styles.combinedTime}>{formatTime(row)}</td>
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
                    <td className={styles.actionsCell}>
                      <button
                        type="button"
                        className={styles.acceptBtn}
                        disabled={busy}
                        onClick={() => onAccept(row)}
                      >
                        {busy ? "…" : "قبول (مسودة)"}
                      </button>
                      <button
                        type="button"
                        className={styles.declineBtn}
                        disabled={busy}
                        onClick={() => onDismiss(row)}
                      >
                        رفض
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
