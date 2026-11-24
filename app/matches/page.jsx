import Link from "next/link";
import PageHeader from "../components/layout/PageHeader";
import MatchList from "../components/sports/MatchList";
import TodayMatchesBar from "../components/sports/TodayMatchesBar";
import SectionTitle from "../components/ui/SectionTitle";
import { getCompetitions, getFixtures, getResults } from "../../lib/queries";

export const metadata = {
  title: "المباريات",
  description: "برنامج المباريات ونتائج البطولة الاحترافية والدوريات الأوروبية.",
};

export default function MatchesPage() {
  const competitions = getCompetitions();
  return (
    <>
      <PageHeader
        title="المباريات"
        accent="والنتائج"
        description="برنامج الجولات المقبلة وآخر النتائج حسب المسابقة."
        breadcrumbs={[{ label: "المباريات" }]}
      >
        <nav className="rv-pills" aria-label="المسابقات">
          {competitions.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="rv-pill">
              {c.shortName}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="rv-matches-today">
        <TodayMatchesBar />
      </div>

      <div className="rv-container rv-page-body">
        {competitions.map((c) => {
          const fixtures = getFixtures({ competition: c.slug });
          const results = getResults({ competition: c.slug });
          if (!fixtures.length && !results.length) return null;
          return (
            <section key={c.slug} id={c.slug} className="rv-block rv-matches-section">
              <div className="rv-matches-section__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt="" />
                <SectionTitle title={c.name} moreHref={c.href} moreLabel="الترتيب" />
              </div>
              {fixtures.length > 0 && <MatchList title="المباريات القادمة" matches={fixtures} />}
              {results.length > 0 && <MatchList title="النتائج" matches={results} />}
            </section>
          );
        })}
        <p className="rv-note">
          التوقيت بتوقيت المغرب. <Link href="/competitions">عرض كل جداول الترتيب</Link>
        </p>
      </div>
    </>
  );
}
