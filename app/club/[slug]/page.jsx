import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HomePageLayout from "../../layouts/HomePageLayout/HomePageLayout";
import NewsCard from "../../components/NewsSection/NewsCard";
import { findStandingRowForClub } from "../../../lib/data/botolaStandingsMatch";
import { DEFAULT_BOTOLA_STANDINGS } from "../../../lib/data/footballRankings";
import { getAllClubSlugs, getClubBySlug } from "../../../lib/moroccanClubs";
import { getArticlesByClubServer } from "../../../lib/cms/articleQueries.server";
import { SITE } from "../../../lib/staticData/site";
import styles from "./clubPage.module.scss";

export const dynamic = "force-dynamic";

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

function formatGd(gd) {
  if (gd == null || Number.isNaN(gd)) return "—";
  return gd > 0 ? `+${gd}` : String(gd);
}

export default async function ClubPage({ params }) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const articles = getArticlesByClubServer(slug);
  const standings = DEFAULT_BOTOLA_STANDINGS;
  const row = findStandingRowForClub(standings.rows, club);

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
            {/* <p className={styles.city}>{club.city}</p> */}
          </div>
        </header>

        <section
          className={styles.rankSection}
          aria-labelledby="club-stats-heading"
        >
          <h2 id="club-stats-heading" className={styles.sectionTitle}>
            إحصائيات النادي في الدوري
          </h2>
          {row ? (
            <div className={styles.rankCard}>
              <div className={styles.rankHighlight}>
                <span className={styles.rankLabel}>المركز</span>
                <span className={styles.rankValue}>#{row.rank}</span>
                <span className={styles.rankPts}>{row.pts} نقطة</span>
              </div>
              <table className={styles.statsTable}>
                <tbody>
                  <tr>
                    <th scope="row">لعب</th>
                    <td>{row.mp ?? "—"}</td>
                    <th scope="row">له</th>
                    <td>{row.goalsFor ?? "—"}</td>
                  </tr>
                  <tr>
                    <th scope="row">عليه</th>
                    <td>{row.goalsAgainst ?? "—"}</td>
                    <th scope="row">الفارق</th>
                    <td className={styles.gdCell}>{formatGd(row.gd)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.statsMissing}>
              لا يوجد صف مطابق لهذا النادي في جدول الترتيب الحالي.
            </p>
          )}
        </section>

        <section
          className={styles.articles}
          aria-labelledby="club-articles-heading"
        >
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
