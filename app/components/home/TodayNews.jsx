import Link from "next/link";
import { getArticle, getArticles } from "../../../lib/queries";
import StandingsWidget from "../sports/StandingsWidget";
import Card from "../ui/Card";
import Meta from "../ui/Meta";
import SectionTitle from "../ui/SectionTitle";

const FEATURED = "raja-top-of-botola";

/** «أخبار اليوم»: خبر رئيسي + 3 بطاقات + الترتيب في العمود الجانبي. */
export default function TodayNews() {
  const featured = getArticle(FEATURED);
  const cards = getArticles({ type: "article" })
    .filter((a) => a.slug !== FEATURED)
    .slice(0, 3);

  return (
    <section className="rv-today">
      <div className="rv-container">
        <SectionTitle title="أخبار" accent="اليوم" />

        <div className="rv-today__grid">
          <div className="rv-today__main">
            <div className="rv-today__top">
              <div className="rv-today__feature">
                <Link href={featured.categoryInfo.href} className="rv-tag">
                  {featured.categoryInfo.name}
                </Link>
                <h1>
                  <Link href={featured.href}>{featured.title}</Link>
                </h1>
                <Meta author={featured.author} date={featured.date} />
                <p>
                  {featured.excerpt}{" "}
                  <Link href={featured.href} className="rv-readmore">
                    اقرأ المزيد
                  </Link>
                </p>
              </div>
              <Link href={featured.href} className="rv-today__hero">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image} alt="" />
              </Link>
            </div>

            <div className="rv-today__cards">
              {cards.map((c) => (
                <Card key={c.slug} item={c} showExcerpt />
              ))}
            </div>
          </div>

          <aside className="rv-today__aside" id="standings">
            <StandingsWidget />
          </aside>
        </div>
      </div>
    </section>
  );
}
