import { notFound } from "next/navigation";
import AuthorSocials from "../../components/article/AuthorSocials";
import PageHeader from "../../components/layout/PageHeader";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionTitle from "../../components/ui/SectionTitle";
import ContentLayout from "../../layouts/ContentLayout";
import { formatNumber } from "../../../lib/helpers/format";
import { getArticlesByAuthor, getAuthor, getAuthors } from "../../../lib/queries";

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  return author ? { title: author.name, description: author.bio } : {};
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const articles = getArticlesByAuthor(slug);
  const totalViews = articles.reduce((s, a) => s + a.views, 0);

  return (
    <>
      <PageHeader
        title={author.name}
        description={author.bio}
        breadcrumbs={[{ label: "الكتّاب", href: "/authors" }, { label: author.name }]}
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img className="rv-author-hero__avatar" src={author.avatar} alt="" />
        }
      >
        <p className="rv-author-hero__role">{author.role}</p>
        <ul className="rv-facts">
          <li>{articles.length} مقالاً</li>
          <li>{formatNumber(totalViews)} قراءة</li>
        </ul>
        <AuthorSocials author={author} />
      </PageHeader>

      <ContentLayout>
        <SectionTitle title="مقالات" accent={author.name} />
        {articles.length ? (
          <div className="rv-grid rv-grid--3">
            {articles.map((a) => (
              <Card key={a.slug} item={a} showExcerpt showTag showMeta={false} />
            ))}
          </div>
        ) : (
          <EmptyState title="لا توجد مقالات لهذا الكاتب بعد" />
        )}
      </ContentLayout>
    </>
  );
}
