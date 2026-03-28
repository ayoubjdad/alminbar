import Link from "next/link";
import { notFound } from "next/navigation";
import HomePageLayout from "../../layouts/HomePageLayout/HomePageLayout";
import NewsCard from "../../components/NewsSection/NewsCard";
import { getAllCategorySlugs, getCategoryBySlug } from "../../../lib/categories";
import { getArticlesBySiteCategory } from "../../../lib/newsData";
import styles from "./categoryPage.module.scss";

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "القسم غير موجود" };
  return {
    title: `${cat.label} | المشهد`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const articles = getArticlesBySiteCategory(slug);

  return (
    <HomePageLayout>
      <div className={styles.root}>
        <nav className={styles.breadcrumb} aria-label="مسار التصفح">
          <Link href="/">الرئيسية</Link>
          <span className={styles.sep} aria-hidden>
            /
          </span>
          <span>{cat.label}</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>{cat.label}</h1>
          <p className={styles.desc}>{cat.description}</p>
        </header>

        {articles.length === 0 ? (
          <p className={styles.empty}>لا توجد مواد في هذا القسم حالياً.</p>
        ) : (
          <div className={styles.grid}>
            {articles.map((a) => (
              <NewsCard
                key={a.slug}
                title={a.title}
                date={a.date}
                slug={a.slug}
                imageUrl={a.image}
              />
            ))}
          </div>
        )}
      </div>
    </HomePageLayout>
  );
}
