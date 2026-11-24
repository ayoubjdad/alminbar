import PageHeader from "../components/layout/PageHeader";
import ReelCard from "../components/sports/ReelCard";
import { REELS } from "../../lib/data/reels";
import { SITE, SOCIAL_LINKS } from "../../lib/data/site";

export const metadata = { title: "ريلز", description: "ريلز المنبر الرياضي: لقطات قصيرة من الملاعب." };

export default function ReelsPage() {
  return (
    <>
      <PageHeader
        title="ريلز"
        accent="المنبر"
        description="لقطات قصيرة، تصريحات وأجواء الملاعب — تابعنا على إنستغرام."
        breadcrumbs={[{ label: "ريلز" }]}
      >
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="rv-btn rv-btn--red rv-page-header__cta"
        >
          {SITE.handle}
        </a>
      </PageHeader>
      <div className="rv-container rv-page-body">
        <ul className="rv-reels-grid">
          {REELS.map((r) => (
            <li key={r.id}>
              <ReelCard reel={r} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
