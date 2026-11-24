import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/layout/PageHeader";
import MatchList from "../../components/sports/MatchList";
import StandingsTable from "../../components/sports/StandingsTable";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import { IcCalendar, IcMapPin, IcStadium, IcTrophy } from "../../components/ui/Icons";
import SectionTitle from "../../components/ui/SectionTitle";
import ContentLayout from "../../layouts/ContentLayout";
import { orDash } from "../../../lib/helpers/format";
import { getClubStanding } from "../../../lib/helpers/standings";
import {
  getArticlesByClub,
  getClub,
  getClubs,
  getCompetition,
  getFixtures,
  getResults,
} from "../../../lib/queries";

export function generateStaticParams() {
  return getClubs().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const club = getClub(slug);
  return club
    ? { title: club.nameAr, description: `أخبار ${club.nameAr}: النتائج، الترتيب والمباريات القادمة.` }
    : {};
}

export default async function ClubPage({ params }) {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) notFound();

  const standing = getClubStanding(slug);
  const botola = getCompetition("botola");
  const news = getArticlesByClub(slug, 6);
  const results = getResults({ club: slug });
  const fixtures = getFixtures({ club: slug });

  const stats = standing
    ? [
        ["الترتيب", standing.rank],
        ["النقاط", standing.pts],
        ["لعب", standing.mp],
        ["فوز", standing.won],
        ["تعادل", standing.draw],
        ["خسارة", standing.lost],
        ["له", standing.goalsFor],
        ["عليه", standing.goalsAgainst],
      ]
    : [];

  return (
    <>
      <div className="rv-club-hero" style={{ "--club-a": club.colors[0], "--club-b": club.colors[1] }}>
        <PageHeader
          title={club.nameAr}
          breadcrumbs={[{ label: "الأندية", href: "/clubs" }, { label: club.nameAr }]}
          media={
            // eslint-disable-next-line @next/next/no-img-element
            <img className="rv-club-hero__logo" src={club.logo} alt="" />
          }
        >
          <ul className="rv-facts">
            <li>
              <IcMapPin size={14} /> {club.city}
            </li>
            <li>
              <IcCalendar size={14} /> التأسيس: {orDash(club.founded)}
            </li>
            <li>
              <IcStadium size={14} /> {orDash(club.stadium)}
            </li>
            <li>
              <IcTrophy size={14} />
              <Link href={botola.href}>{botola.name}</Link>
            </li>
          </ul>
        </PageHeader>
      </div>

      <ContentLayout sidebarProps={{ standings: false }}>
        {stats.length > 0 && (
          <section className="rv-block">
            <SectionTitle title="أرقام" accent="الموسم" />
            <ul className="rv-stats">
              {stats.map(([label, value]) => (
                <li key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rv-block">
          <SectionTitle title="المباريات" accent="القادمة" moreHref="/matches" />
          <MatchList matches={fixtures} empty="لا توجد مباريات مبرمجة" />
        </section>

        <section className="rv-block">
          <SectionTitle title="آخر" accent="النتائج" />
          <MatchList matches={results} empty="لا توجد نتائج بعد" />
        </section>

        <section className="rv-block">
          <SectionTitle title="أخبار" accent={club.shortName} />
          {news.length ? (
            <div className="rv-grid rv-grid--3">
              {news.map((a) => (
                <Card key={a.slug} item={a} />
              ))}
            </div>
          ) : (
            <EmptyState title={`لا توجد أخبار عن ${club.nameAr} حالياً`} />
          )}
        </section>

        <section className="rv-block">
          <SectionTitle title="ترتيب" accent="البطولة" moreHref={botola.href} />
          <div className="rv-standings__panel">
            <StandingsTable competition={botola} highlight={slug} />
          </div>
        </section>
      </ContentLayout>
    </>
  );
}
