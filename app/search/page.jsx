import { Suspense } from "react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { getCategories, searchArticles } from "../../lib/queries";
import Link from "next/link";

export const metadata = { title: "بحث", description: "ابحث في أخبار المنبر الرياضي." };

/** النتائج تعتمد على `searchParams` (بيانات وقت الطلب) ⇒ داخل Suspense. */
async function Results({ searchParams }) {
  const { q = "" } = await searchParams;
  const term = Array.isArray(q) ? q[0] : q;
  const results = searchArticles(term);

  return (
    <>
      <form action="/search" className="rv-search-form" role="search">
        <input type="search" name="q" defaultValue={term} placeholder="ابحث عن خبر، نادٍ أو لاعب…" aria-label="بحث" />
        <button type="submit" className="rv-btn rv-btn--red">
          ابحث
        </button>
      </form>

      {!term ? (
        <EmptyState title="اكتب كلمة للبحث">
          جرّب مثلاً: الرجاء، الديربي، المنتخب المغربي…
        </EmptyState>
      ) : results.length ? (
        <>
          <p className="rv-note">
            {results.length} نتيجة لـ «{term}»
          </p>
          <div className="rv-grid rv-grid--3">
            {results.map((a) => (
              <Card key={a.slug} item={a} showExcerpt showTag />
            ))}
          </div>
        </>
      ) : (
        <EmptyState title={`لا توجد نتائج لـ «${term}»`}>تصفّح الأقسام أدناه.</EmptyState>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }) {
  return (
    <>
      <PageHeader title="بحث" breadcrumbs={[{ label: "بحث" }]}>
        <nav className="rv-pills" aria-label="الأقسام">
          {getCategories().map((c) => (
            <Link key={c.slug} href={c.href} className="rv-pill">
              {c.name}
            </Link>
          ))}
        </nav>
      </PageHeader>
      <div className="rv-container rv-page-body">
        <Suspense fallback={<p className="rv-note">جارٍ البحث…</p>}>
          <Results searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
