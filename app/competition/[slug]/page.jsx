import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/layout/PageHeader";
import MatchList from "../../components/sports/MatchList";
import StandingsTable from "../../components/sports/StandingsTable";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionTitle from "../../components/ui/SectionTitle";
import ContentLayout from "../../layouts/ContentLayout";
import { SEASON } from "../../../lib/data/competitions";
import {
  getArticlesByCompetition,
  getCompetition,
  getCompetitions,
  getFixtures,
  getResults,
} from "../../../lib/queries";

export function generateStaticParams() {
  return getCompetitions().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCompetition(slug);
  return c ? { title: `${c.name}: الترتيب والنتائج`, description: c.description } : {};
}

export default async function CompetitionPage({ params }) {
  const { slug } = await params;
  const competition = getCompetition(slug);
  if (!competition) notFound();

  const news = getArticlesByCompetition(slug, 6);
  const results = getResults({ competition: slug });
  const fixtures = getFixtures({ competition: slug });

  return (
    <>
      <PageHeader
        title={competition.name}
        description={competition.description}
        breadcrumbs={[{ label: "المسابقات", href: "/competitions" }, { label: competition.name }]}
        media={
          <span className="rv-page-header__badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={competition.logo} alt="" />
          </span>
        }
      >
        <ul className="rv-facts">
          <li>{competition.country}</li>
          <li>الموسم {SEASON}</li>
          <li>{competition.rows.length} نادياً</li>
        </ul>
        <nav className="rv-pills" aria-label="المسابقات">
          {getCompetitions().map((c) => (
            <Link key={c.slug} href={c.href} className={`rv-pill ${c.slug === slug ? "is-active" : ""}`}>
              {c.shortName}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <ContentLayout sidebarProps={{ standings: false }}>
        <section className="rv-block">
          <SectionTitle title="جدول" accent="الترتيب" />
          <div className="rv-standings__panel">
            <StandingsTable competition={competition} variant="full" />
          </div>
        </section>

        <section className="rv-block">
          <SectionTitle title="المباريات" accent="القادمة" moreHref="/matches" />
          <MatchList matches={fixtures} empty="لا توجد مباريات مبرمجة" />
        </section>

        <section className="rv-block">
          <SectionTitle title="آخر" accent="النتائج" />
          <MatchList matches={results} empty="لا توجد نتائج بعد" />
        </section>

        <section className="rv-block">
          <SectionTitle title="آخر" accent="الأخبار" />
          {news.length ? (
            <div className="rv-grid rv-grid--3">
              {news.map((a) => (
                <Card key={a.slug} item={a} />
              ))}
            </div>
          ) : (
            <EmptyState title="لا توجد أخبار عن هذه المسابقة حالياً" />
          )}
        </section>
      </ContentLayout>
    </>
  );
}
