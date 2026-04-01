import HomePageLayout from "../../layouts/HomePageLayout/HomePageLayout";
import {
  getMergedArticlesServer,
  getArticleBySlugPublic,
  isDraftArticle,
} from "../../../lib/cms/getMergedArticlesServer";
import { SITE } from "../../../lib/staticData/site";
import ArticleContent from "./ArticleContent";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getMergedArticlesServer().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlugPublic(slug);
  if (!article) {
    return { title: "المقال غير موجود" };
  }
  return {
    title: `${article.title} | ${SITE.name}`,
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
