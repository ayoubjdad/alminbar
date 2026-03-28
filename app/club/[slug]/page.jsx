import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HomePageLayout from "../../layouts/HomePageLayout/HomePageLayout";
import NewsCard from "../../components/NewsSection/NewsCard";
import { getAllClubSlugs, getClubBySlug } from "../../../lib/moroccanClubs";
import { getArticlesByClub } from "../../../lib/newsData";
import { SITE } from "../../../lib/staticData/site";
import styles from "./clubPage.module.scss";

export async function generateStaticParams() {
  return getAllClubSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) return { title: "النادي غير موجود" };
  return {
    title: `${club.name} | ${SITE.name}`,
    description: `أخبار وترتيب ${club.name}`,
  };
}

export default async function ClubPage({ params }) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const articles = getArticlesByClub(slug);
  const r = club.ranking;

  return (
    <HomePageLayout>
      <div className={styles.root}>
        <nav className={styles.breadcrumb} aria-label="مسار التصفح">
          <Link href="/">الرئيسية</Link>
          <span className={styles.sep} aria-hidden>
            /
          </span>
          <Link href="/#moroccan-clubs">أندية مغربية</Link>
          <span className={styles.sep} aria-hidden>
            /
          </span>
          <span>{club.shortName}</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.logoWrap}>
            <Image
              src={club.logo}
              alt=""
              width={88}
              height={88}
              className={styles.logo}
            />
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{club.name}</h1>
            <p className={styles.city}>{club.city}</p>
          </div>
        </header>

        <section className={styles.rankSection} aria-labelledby="club-rank-heading">
          <h2 id="club-rank-heading" className={styles.sectionTitle}>
            الترتيب في الدوري (تجريبي)
          </h2>
          <div className={styles.rankCard}>
            <div className={styles.rankHighlight}>
              <span className={styles.rankLabel}>المركز</span>
              <span className={styles.rankValue}>#{r.leagueRank}</span>
              <span className={styles.rankPts}>{r.points} نقطة</span>
            </div>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th scope="row">لعب</th>
                  <td>{r.played}</td>
                  <th scope="row">فوز</th>
                  <td>{r.won}</td>
                </tr>
                <tr>
                  <th scope="row">تعادل</th>
                  <td>{r.draw}</td>
                  <th scope="row">خسارة</th>
                  <td>{r.lost}</td>
                </tr>
                <tr>
                  <th scope="row">له</th>
                  <td>{r.goalsFor}</td>
                  <th scope="row">عليه</th>
                  <td>{r.goalsAgainst}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.articles} aria-labelledby="club-articles-heading">
          <h2 id="club-articles-heading" className={styles.sectionTitle}>
            أخبار النادي
          </h2>
          {articles.length === 0 ? (
            <p className={styles.empty}>لا توجد مواد مرتبطة بهذا النادي بعد.</p>
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
        </section>
      </div>
    </HomePageLayout>
  );
}
