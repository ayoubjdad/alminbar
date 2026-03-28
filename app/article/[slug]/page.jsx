import HomePageLayout from "../../layouts/HomePageLayout/HomePageLayout";
import { getAllSlugs, getArticleBySlug } from "../../../lib/newsData";
import ArticleContent from "./ArticleContent";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "المقال غير موجود" };
  }
  return {
    title: `${article.title} | المشهد`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  return (
    <HomePageLayout>
      <ArticleContent slug={slug} />
    </HomePageLayout>
  );
}
