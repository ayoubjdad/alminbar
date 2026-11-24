import { getArticles } from "../../../lib/queries";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

/** شبكة «آخر الأخبار» (8 بطاقات). */
export default function LatestGrid({ limit = 8 }) {
  const list = getArticles({ type: "article" }).slice(-limit);
  return (
    <section className="rv-gallery">
      <div className="rv-container">
        <SectionTitle title="آخر" accent="الأخبار" />
        <div className="rv-gallery__grid">
          {list.map((c) => (
            <Card key={c.slug} item={c} showMeta={false} showTag />
          ))}
        </div>
      </div>
    </section>
  );
}
