import Link from "next/link";
import PageHeader from "../components/layout/PageHeader";
import StandingsTable from "../components/sports/StandingsTable";
import { IcArrowLeft } from "../components/ui/Icons";
import { SEASON } from "../../lib/data/competitions";
import { getCompetitions } from "../../lib/queries";

export const metadata = {
  title: "الترتيب",
  description: "ترتيب البطولة الاحترافية والدوريات الأوروبية الخمس الكبرى.",
};

export default function CompetitionsPage() {
  return (
    <>
      <PageHeader
        title="جداول"
        accent="الترتيب"
        description={`البطولة الاحترافية والدوريات الأوروبية الكبرى — الموسم ${SEASON}.`}
        breadcrumbs={[{ label: "الترتيب" }]}
      />
      <div className="rv-container rv-page-body">
        <div className="rv-comp-grid">
          {getCompetitions().map((c) => (
            <section key={c.slug} className="rv-comp-card">
              <header className="rv-comp-card__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.logo} alt="" />
                <div>
                  <h2>
                    <Link href={c.href}>{c.name}</Link>
                  </h2>
                  <span>{c.country}</span>
                </div>
              </header>
              <div className="rv-standings__panel">
                <StandingsTable competition={c} limit={6} showLegend={false} />
              </div>
              <Link href={c.href} className="rv-comp-card__more">
                الترتيب الكامل والنتائج <IcArrowLeft size={12} />
              </Link>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
