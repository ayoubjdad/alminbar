import { getArticle } from "../../../lib/queries";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

const SLUGS = [
  "premier-league-top-four-race",
  "la-liga-madrid-leads",
  "serie-a-milan-ahead",
  "bundesliga-bayern-dominates",
];

/** أربع بطاقات: الدوريات الأوروبية. */
export default function FourCards() {
  return (
    <section className="rv-four">
      <div className="rv-container">
        <SectionTitle title="الدوريات" accent="الأوروبية" moreHref="/category/international" />
        <div className="rv-four__grid">
          {SLUGS.map(getArticle).map((c) => (
            <Card key={c.slug} item={c} showExcerpt showMeta={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
