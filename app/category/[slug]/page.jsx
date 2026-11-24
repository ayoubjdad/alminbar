import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import Meta from "../../components/ui/Meta";
import ContentLayout from "../../layouts/ContentLayout";
import { getArticlesByCategory, getCategories, getCategory } from "../../../lib/queries";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  return category ? { title: category.title, description: category.description } : {};
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const [lead, ...rest] = getArticlesByCategory(slug);

  return (
    <>
      <PageHeader
        title={category.title}
        description={category.description}
        breadcrumbs={[{ label: "الأقسام" }, { label: category.name }]}
      >
        <nav className="rv-pills" aria-label="الأقسام">
          {getCategories().map((c) => (
            <Link key={c.slug} href={c.href} className={`rv-pill ${c.slug === slug ? "is-active" : ""}`}>
              {c.name}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <ContentLayout>
        {!lead ? (
          <EmptyState title="لا توجد مقالات في هذا القسم حالياً" />
        ) : (
          <>
            <article className="rv-lead">
              <Link href={lead.href} className="rv-lead__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.image} alt="" />
              </Link>
              <div className="rv-lead__body">
                <span className="rv-tag">{lead.type === "video" ? "فيديو" : category.name}</span>
                <h2>
                  <Link href={lead.href}>{lead.title}</Link>
                </h2>
                <p>{lead.excerpt}</p>
                <Meta author={lead.author} date={lead.date} />
              </div>
            </article>

            <div className="rv-grid rv-grid--3">
              {rest.map((a) => (
                <Card key={a.slug} item={a} showExcerpt />
              ))}
            </div>
          </>
        )}
      </ContentLayout>
    </>
  );
}
