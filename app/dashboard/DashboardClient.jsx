"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  parseBodyFromEditorText,
  slugifyTitle,
} from "../../lib/cms/normalizeArticle";
import styles from "./dashboard.module.scss";

const TABS = [
  { id: "posts", label: "مقالات" },
  { id: "categories", label: "تصنيفات" },
  { id: "tags", label: "وسوم" },
  { id: "clubs", label: "أندية" },
  { id: "leagues", label: "دوريات" },
];

const emptyForm = () => ({
  slug: "",
  title: "",
  date: "",
  publishedAt: "",
  excerpt: "",
  image: "",
  bodyText: "",
  category: "morocco-sports",
  tags: "",
  linkedClubs: [],
  relatedLeagueSlugs: [],
  clubSlug: "",
  siteCategory: "",
  authorNameAr: "",
  readTimeMinutes: "",
  seoTitle: "",
  seoDescription: "",
  status: "published",
});

function formatArticleDate(a) {
  if (a.publishedAt) {
    try {
      return new Date(a.publishedAt).toLocaleString("ar-MA", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      /* ignore */
    }
  }
  return a.date ?? "—";
}

function toDatetimeLocal(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 16);
  } catch {
    return "";
  }
}

export default function DashboardClient() {
  const router = useRouter();
  const [tab, setTab] = useState("posts");
  const [meta, setMeta] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyForm);

  const [catForm, setCatForm] = useState({ value: "", label: "" });
  const [tagForm, setTagForm] = useState({ slug: "", nameAr: "" });
  const [clubForm, setClubForm] = useState({ slug: "", nameAr: "" });
  const [leagueForm, setLeagueForm] = useState({
    slug: "",
    labelAr: "",
    group: "custom",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [m, a] = await Promise.all([
        fetch("/api/cms/meta").then((r) => r.json()),
        fetch("/api/cms/articles").then((r) => r.json()),
      ]);
      setMeta(m);
      setArticles(a.articles ?? []);
    } catch {
      setMessage("تعذر تحميل البيانات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const registry = meta?.registry ?? {
    categories: [],
    tags: [],
    clubs: [],
    leagues: [],
  };

  const leagueOptions = meta?.leagues ?? [];
  const clubOptions = meta?.clubs ?? [];
  const editorial = meta?.categories ?? meta?.editorialCategories ?? [];

  const toggleClub = (slug) => {
    setForm((f) => {
      const set = new Set(f.linkedClubs);
      if (set.has(slug)) set.delete(slug);
      else set.add(slug);
      return { ...f, linkedClubs: [...set] };
    });
  };

  const toggleLeague = (slug) => {
    setForm((f) => {
      const set = new Set(f.relatedLeagueSlugs);
      if (set.has(slug)) set.delete(slug);
      else set.add(slug);
      return { ...f, relatedLeagueSlugs: [...set] };
    });
  };

  const relatedLeaguesPayload = useMemo(() => {
    return form.relatedLeagueSlugs.map((slug) => {
      const row = leagueOptions.find((l) => l.slug === slug);
      return { slug, labelAr: row?.labelAr ?? slug };
    });
  }, [form.relatedLeagueSlugs, leagueOptions]);

  const appendTag = (slug) => {
    setForm((f) => {
      const parts = f.tags
        .split(/[,،]/)
        .map((t) => t.trim())
        .filter(Boolean);
      if (parts.includes(slug)) return f;
      return { ...f, tags: [...parts, slug].join(", ") };
    });
  };

  const postRegistry = async (type, item) => {
    const res = await fetch("/api/cms/registry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, item }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "فشل الحفظ");
    await load();
    router.refresh();
  };

  const deleteRegistry = async (type, params) => {
    const q = new URLSearchParams({ type, ...params });
    const res = await fetch(`/api/cms/registry?${q}`, { method: "DELETE" });
    if (!res.ok) return;
    await load();
    router.refresh();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const slug =
        form.slug.trim() || slugifyTitle(form.title || "article");
      const publishedAt = form.publishedAt
        ? new Date(form.publishedAt).toISOString()
        : new Date().toISOString();

      const article = {
        slug,
        title: form.title.trim(),
        date:
          form.date.trim() ||
          new Date(publishedAt).toLocaleDateString("ar-MA-u-ca-gregory", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        publishedAt,
        excerpt: form.excerpt.trim(),
        image:
          form.image.trim() ||
          "https://media.almashhad.com/vod/1750278622627_SeZAk_large.webp",
        body: parseBodyFromEditorText(form.bodyText),
        category: form.category,
        tags: form.tags
          .split(/[,،]/)
          .map((t) => t.trim())
          .filter(Boolean),
        linkedClubs: form.linkedClubs,
        relatedLeagues: relatedLeaguesPayload,
        clubSlug: form.clubSlug.trim() || undefined,
        siteCategory: form.siteCategory.trim() || undefined,
        authorNameAr: form.authorNameAr.trim() || undefined,
        readTimeMinutes: form.readTimeMinutes
          ? Number(form.readTimeMinutes)
          : undefined,
        cmsMeta: {
          seoTitle: form.seoTitle.trim() || undefined,
          seoDescription: form.seoDescription.trim() || undefined,
          status: form.status,
        },
      };

      const res = await fetch("/api/cms/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "save failed");
      setMessage("تم حفظ المقال.");
      setForm(emptyForm());
      await load();
      router.refresh();
    } catch (err) {
      setMessage(err.message || "خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (slug) => {
    if (!confirm(`حذف «${slug}» من الملف المحلي؟`)) return;
    const res = await fetch(`/api/cms/articles?slug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await load();
      router.refresh();
    }
  };

  const onEdit = (a) => {
    setForm({
      slug: a.slug,
      title: a.title ?? "",
      date: a.date ?? "",
      publishedAt: toDatetimeLocal(a.publishedAt),
      excerpt: a.excerpt ?? "",
      image: a.image ?? "",
      bodyText: Array.isArray(a.body) ? a.body.join("\n\n") : "",
      category: a.category ?? "morocco-sports",
      tags: Array.isArray(a.tags) ? a.tags.join(", ") : "",
      linkedClubs: Array.isArray(a.linkedClubs) ? [...a.linkedClubs] : [],
      relatedLeagueSlugs: Array.isArray(a.relatedLeagues)
        ? a.relatedLeagues.map((r) => r.slug)
        : [],
      clubSlug: a.clubSlug ?? "",
      siteCategory: a.siteCategory ?? "",
      authorNameAr: a.authorNameAr ?? "",
      readTimeMinutes: a.readTimeMinutes != null ? String(a.readTimeMinutes) : "",
      seoTitle: a.cmsMeta?.seoTitle ?? "",
      seoDescription: a.cmsMeta?.seoDescription ?? "",
      status: a.cmsMeta?.status ?? "published",
    });
    setTab("posts");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && !meta) {
    return <p className={styles.hint}>جاري التحميل…</p>;
  }

  return (
    <div className={styles.layout}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.h1}>لوحة تحرير الأخبار</h1>
          <p className={styles.lead}>
            المقالات: <code className={styles.code}>data/cms-user-articles.json</code>
            {" — "}
            السجل: <code className={styles.code}>data/cms-registry.json</code>
          </p>
        </div>
        <Link href="/" className={styles.homeLink}>
          ← الموقع
        </Link>
      </header>

      {message ? <p className={styles.banner}>{message}</p> : null}

      <div className={styles.tabs} role="tablist" aria-label="أقسام اللوحة">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? styles.tabActive : styles.tab}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "posts" ? (
        <>
          <form className={styles.form} onSubmit={onSubmit}>
            <fieldset className={styles.fieldset}>
              <legend>المحتوى</legend>
              <label className={styles.label}>
                العنوان *
                <input
                  className={styles.input}
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  required
                />
              </label>
              <label className={styles.label}>
                المسار (slug)
                <input
                  className={styles.input}
                  dir="ltr"
                  placeholder="يُولَّد تلقائياً إن تُرك فارغاً"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                تاريخ النشر (للترتيب)
                <input
                  className={styles.input}
                  type="datetime-local"
                  value={form.publishedAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, publishedAt: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                التاريخ المعروض (نص عربي)
                <input
                  className={styles.input}
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                المقدمة (excerpt)
                <textarea
                  className={styles.textarea}
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, excerpt: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                رابط الصورة
                <input
                  className={styles.input}
                  dir="ltr"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                النص — فقرة لكل كتلة، فارغ بين الفقرات
                <textarea
                  className={styles.textarea}
                  rows={10}
                  value={form.bodyText}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bodyText: e.target.value }))
                  }
                />
              </label>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>تصنيف ووسوم</legend>
              <label className={styles.label}>
                التصنيف التحريري
                <select
                  className={styles.select}
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                >
                  {editorial.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.label}>
                الوسوم (مفصولة بفاصلة أو أضف من الأزرار)
                <input
                  className={styles.input}
                  value={form.tags}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tags: e.target.value }))
                  }
                />
              </label>
              <div className={styles.tagPickRow}>
                <span className={styles.tagPickLabel}>إضافة سريعة:</span>
                {(meta?.tags ?? []).slice(0, 24).map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    className={styles.tagPickBtn}
                    onClick={() => appendTag(t.slug)}
                  >
                    + {t.nameAr}
                  </button>
                ))}
              </div>
              <label className={styles.label}>
                قسم الموقع (اختياري)
                <input
                  className={styles.input}
                  placeholder="botola | morocco | international | matches"
                  value={form.siteCategory}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, siteCategory: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                نادي رئيسي (slug)
                <input
                  className={styles.input}
                  dir="ltr"
                  placeholder="wydad-casablanca"
                  value={form.clubSlug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, clubSlug: e.target.value }))
                  }
                />
              </label>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>أندية مرتبطة</legend>
              <div className={styles.chips}>
                {clubOptions.map((c) => (
                  <label key={c.slug} className={styles.chip}>
                    <input
                      type="checkbox"
                      checked={form.linkedClubs.includes(c.slug)}
                      onChange={() => toggleClub(c.slug)}
                    />
                    <span>{c.nameAr ?? c.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>دوريات / مسابقات</legend>
              <div className={styles.chipsScroll}>
                <div className={styles.chips}>
                  {leagueOptions.map((l) => (
                    <label key={l.slug} className={styles.chip}>
                      <input
                        type="checkbox"
                        checked={form.relatedLeagueSlugs.includes(l.slug)}
                        onChange={() => toggleLeague(l.slug)}
                      />
                      <span>{l.labelAr}</span>
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>

            <fieldset className={styles.fieldset}>
              <legend>ميتا إضافية</legend>
              <label className={styles.label}>
                اسم المحرر
                <input
                  className={styles.input}
                  value={form.authorNameAr}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, authorNameAr: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                زمن القراءة (دقائق)
                <input
                  className={styles.input}
                  type="number"
                  min={1}
                  value={form.readTimeMinutes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, readTimeMinutes: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                SEO — عنوان
                <input
                  className={styles.input}
                  value={form.seoTitle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, seoTitle: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                SEO — وصف
                <textarea
                  className={styles.textarea}
                  rows={2}
                  value={form.seoDescription}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, seoDescription: e.target.value }))
                  }
                />
              </label>
              <label className={styles.label}>
                الحالة
                <select
                  className={styles.select}
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="published">منشور</option>
                  <option value="draft">مسودة</option>
                </select>
              </label>
            </fieldset>

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={saving}>
                {saving ? "جاري الحفظ…" : "حفظ المقال"}
              </button>
            </div>
          </form>

          <section className={styles.listSection}>
            <h2 className={styles.h2}>
              المقالات (الأحدث أولاً — {articles.length})
            </h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>المسار</th>
                    <th>العنوان</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a) => (
                    <tr key={a.slug}>
                      <td className={styles.dateCell}>{formatArticleDate(a)}</td>
                      <td className={styles.mono} dir="ltr">
                        {a.slug}
                      </td>
                      <td>{a.title}</td>
                      <td className={styles.rowActions}>
                        <button
                          type="button"
                          className={styles.linkBtn}
                          onClick={() => onEdit(a)}
                        >
                          تعديل
                        </button>
                        <a className={styles.linkBtn} href={`/article/${a.slug}`}>
                          عرض
                        </a>
                        <button
                          type="button"
                          className={styles.danger}
                          onClick={() => onDelete(a.slug)}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}

      {tab === "categories" ? (
        <section className={styles.registrySection}>
          <h2 className={styles.h2}>تصنيفات تحريرية إضافية</h2>
          <p className={styles.registryHint}>
            تُدمج مع التصنيفات الافتراضية في نموذج «مقال جديد». القيمة (value) بالإنجليزية
            بدون مسافات.
          </p>
          <form
            className={styles.inlineForm}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await postRegistry("categories", {
                  value: catForm.value.trim(),
                  label: catForm.label.trim(),
                });
                setCatForm({ value: "", label: "" });
                setMessage("تمت إضافة التصنيف.");
              } catch (err) {
                setMessage(err.message);
              }
            }}
          >
            <input
              className={styles.input}
              placeholder="value (مثال: transfers)"
              dir="ltr"
              value={catForm.value}
              onChange={(e) =>
                setCatForm((f) => ({ ...f, value: e.target.value }))
              }
            />
            <input
              className={styles.input}
              placeholder="العنوان بالعربية"
              value={catForm.label}
              onChange={(e) =>
                setCatForm((f) => ({ ...f, label: e.target.value }))
              }
            />
            <button type="submit" className={styles.submitSmall}>
              إضافة
            </button>
          </form>
          <ul className={styles.registryList}>
            {registry.categories.map((c) => (
              <li key={c.value} className={styles.registryItem}>
                <code dir="ltr">{c.value}</code> — {c.label}
                <button
                  type="button"
                  className={styles.danger}
                  onClick={() =>
                    deleteRegistry("categories", { value: c.value })
                  }
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "tags" ? (
        <section className={styles.registrySection}>
          <h2 className={styles.h2}>وسوم إضافية</h2>
          <form
            className={styles.inlineForm}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await postRegistry("tags", {
                  slug: tagForm.slug,
                  nameAr: tagForm.nameAr,
                });
                setTagForm({ slug: "", nameAr: "" });
                setMessage("تمت إضافة الوسم.");
              } catch (err) {
                setMessage(err.message);
              }
            }}
          >
            <input
              className={styles.input}
              placeholder="slug"
              dir="ltr"
              value={tagForm.slug}
              onChange={(e) =>
                setTagForm((f) => ({ ...f, slug: e.target.value }))
              }
            />
            <input
              className={styles.input}
              placeholder="الاسم بالعربية"
              value={tagForm.nameAr}
              onChange={(e) =>
                setTagForm((f) => ({ ...f, nameAr: e.target.value }))
              }
            />
            <button type="submit" className={styles.submitSmall}>
              إضافة
            </button>
          </form>
          <ul className={styles.registryList}>
            {registry.tags.map((t) => (
              <li key={t.slug} className={styles.registryItem}>
                <code dir="ltr">{t.slug}</code> — {t.nameAr}
                <button
                  type="button"
                  className={styles.danger}
                  onClick={() => deleteRegistry("tags", { slug: t.slug })}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "clubs" ? (
        <section className={styles.registrySection}>
          <h2 className={styles.h2}>أندية إضافية</h2>
          <p className={styles.registryHint}>
            تُضاف إلى قائمة الأندية المغربية الافتراضية. استخدم slug فريد (إنجليزي).
          </p>
          <form
            className={styles.inlineForm}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await postRegistry("clubs", {
                  slug: clubForm.slug,
                  nameAr: clubForm.nameAr,
                });
                setClubForm({ slug: "", nameAr: "" });
                setMessage("تمت إضافة النادي.");
              } catch (err) {
                setMessage(err.message);
              }
            }}
          >
            <input
              className={styles.input}
              placeholder="slug"
              dir="ltr"
              value={clubForm.slug}
              onChange={(e) =>
                setClubForm((f) => ({ ...f, slug: e.target.value }))
              }
            />
            <input
              className={styles.input}
              placeholder="الاسم بالعربية"
              value={clubForm.nameAr}
              onChange={(e) =>
                setClubForm((f) => ({ ...f, nameAr: e.target.value }))
              }
            />
            <button type="submit" className={styles.submitSmall}>
              إضافة
            </button>
          </form>
          <ul className={styles.registryList}>
            {registry.clubs.map((c) => (
              <li key={c.slug} className={styles.registryItem}>
                <code dir="ltr">{c.slug}</code> — {c.nameAr}
                <button
                  type="button"
                  className={styles.danger}
                  onClick={() => deleteRegistry("clubs", { slug: c.slug })}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "leagues" ? (
        <section className={styles.registrySection}>
          <h2 className={styles.h2}>دوريات إضافية</h2>
          <p className={styles.registryHint}>
            قائمة كبيرة مدمجة في النظام (كأس العالم، الدوريات الأوروبية، العربية…). هنا
            يمكنك إضافة مسابقة مخصصة.
          </p>
          <form
            className={styles.inlineForm}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await postRegistry("leagues", {
                  slug: leagueForm.slug,
                  labelAr: leagueForm.labelAr,
                  group: leagueForm.group,
                });
                setLeagueForm({ slug: "", labelAr: "", group: "custom" });
                setMessage("تمت إضافة الدوري.");
              } catch (err) {
                setMessage(err.message);
              }
            }}
          >
            <input
              className={styles.input}
              placeholder="slug"
              dir="ltr"
              value={leagueForm.slug}
              onChange={(e) =>
                setLeagueForm((f) => ({ ...f, slug: e.target.value }))
              }
            />
            <input
              className={styles.input}
              placeholder="الاسم بالعربية"
              value={leagueForm.labelAr}
              onChange={(e) =>
                setLeagueForm((f) => ({ ...f, labelAr: e.target.value }))
              }
            />
            <input
              className={styles.input}
              placeholder="مجموعة (اختياري)"
              value={leagueForm.group}
              onChange={(e) =>
                setLeagueForm((f) => ({ ...f, group: e.target.value }))
              }
            />
            <button type="submit" className={styles.submitSmall}>
              إضافة
            </button>
          </form>
          <ul className={styles.registryList}>
            {registry.leagues.map((l) => (
              <li key={l.slug} className={styles.registryItem}>
                <code dir="ltr">{l.slug}</code> — {l.labelAr}
                <button
                  type="button"
                  className={styles.danger}
                  onClick={() => deleteRegistry("leagues", { slug: l.slug })}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
