import Link from "next/link";
import { getArticles } from "../../../lib/queries";
import { formatNumber } from "../../../lib/helpers/format";
import { IcCalendar, IcEye, IcPlayRtl } from "../ui/Icons";

/** «المزيد والمزيد...»: قائمة مقالات مصغّرة. */
export default function MoreList({ title = "المزيد والمزيد...", items = null, limit = 9 }) {
  const list = items ?? getArticles({ type: "article" }).slice(4, 4 + limit);
  return (
    <section className="rv-more">
      <div className="rv-container">
        <h2 className="rv-more__head">
          <IcPlayRtl size={14} /> {title}
        </h2>
        <div className="rv-more__grid">
          {list.map((m) => (
            <article key={m.slug} className="rv-more__item">
              <Link href={m.href} className="rv-more__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt="" loading="lazy" />
              </Link>
              <div>
                <h3 className="rv-more__title">
                  <Link href={m.href}>{m.title}</Link>
                </h3>
                <div className="rv-more__stats">
                  <span>
                    <IcEye size={12} /> {formatNumber(m.views)}
                  </span>
                  <span>
                    <IcCalendar size={12} /> {m.readTime} دقائق
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
