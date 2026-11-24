import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "../../components/article/ArticleBody";
import ArticleTags from "../../components/article/ArticleTags";
import AuthorBox from "../../components/article/AuthorBox";
import ShareBar from "../../components/article/ShareBar";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Card from "../../components/ui/Card";
import { IcEye, IcPlay } from "../../components/ui/Icons";
import Meta from "../../components/ui/Meta";
import SectionTitle from "../../components/ui/SectionTitle";
import ContentLayout from "../../layouts/ContentLayout";
import { formatNumber } from "../../../lib/helpers/format";
import { getArticle, getArticles, getRelatedArticles } from "../../../lib/queries";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [article.image] },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 4);
  const isVideo = article.type === "video";

  return (
    <div className="rv-article-page">
      <ContentLayout>
        <article className="rv-article">
          <Breadcrumbs
            items={[
              { label: article.categoryInfo.name, href: article.categoryInfo.href },
              { label: article.title },
            ]}
          />
          <header className="rv-article__header">
            <Link href={article.categoryInfo.href} className="rv-tag">
              {isVideo ? "فيديو" : article.categoryInfo.name}
            </Link>
            <h1 className="rv-article__title">{article.title}</h1>
            <p className="rv-article__lead">{article.excerpt}</p>
            <Meta author={article.author} date={article.date}>
              <span className="rv-meta__item">{article.readTime} دقائق قراءة</span>
              <span className="rv-meta__item">
                <IcEye size={12} /> {formatNumber(article.views)}
              </span>
            </Meta>
          </header>

          <figure className={`rv-article__hero ${isVideo ? "is-video" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.image} alt="" />
            {isVideo && (
              <span className="rv-video__play" aria-hidden>
                <IcPlay size={22} />
              </span>
            )}
            {isVideo && article.duration && (
              <span className="rv-article__duration">{article.duration}</span>
            )}
          </figure>

          <ShareBar title={article.title} />
          <ArticleBody blocks={article.body} />
          <ArticleTags article={article} />
          <ShareBar title={article.title} />
          <AuthorBox author={article.author} />
        </article>
      </ContentLayout>

      {related.length > 0 && (
        <section className="rv-related">
          <div className="rv-container">
            <SectionTitle title="مقالات" accent="ذات صلة" />
            <div className="rv-four__grid">
              {related.map((r) => (
                <Card key={r.slug} item={r} showTag />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
