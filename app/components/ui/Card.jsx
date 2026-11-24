import Link from "next/link";
import { IcPlay } from "./Icons";
import Meta from "./Meta";

/**
 * بطاقة مقال عامة.
 * `item`: مقال مُهيّأ من `lib/queries.js` (href, title, image, excerpt, author, date, type).
 */
export default function Card({
  item,
  showMeta = true,
  showExcerpt = false,
  showTag = false,
  className = "",
}) {
  return (
    <article className={`rv-card ${className}`}>
      <Link href={item.href} className="rv-card__img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt="" loading="lazy" />
        {item.type === "video" && (
          <span className="rv-card__play" aria-label="فيديو">
            <IcPlay size={14} />
            {item.duration && <small>{item.duration}</small>}
          </span>
        )}
      </Link>
      {showTag && item.categoryInfo && (
        <Link href={item.categoryInfo.href} className="rv-tag">
          {item.categoryInfo.name}
        </Link>
      )}
      <h3 className="rv-card__title">
        <Link href={item.href}>{item.title}</Link>
      </h3>
      {showExcerpt && item.excerpt && (
        <p className="rv-card__excerpt">{item.excerpt}</p>
      )}
      {showMeta && item.author && <Meta author={item.author} date={item.date} />}
    </article>
  );
}
