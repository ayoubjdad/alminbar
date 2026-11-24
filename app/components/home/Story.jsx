import Link from "next/link";
import { getArticle } from "../../../lib/queries";
import { formatDate } from "../../../lib/helpers/format";
import { IcClock } from "../ui/Icons";

/** ملف خاص (نص + صورة). */
export default function Story({ slug = "moroccan-talents-europe", kicker = "ملف: مواهب مغربية" }) {
  const story = getArticle(slug);
  return (
    <section className="rv-story">
      <div className="rv-container">
        <div className="rv-story__grid">
          <div className="rv-story__text">
            <h2 className="rv-underline">{kicker}</h2>
            <h3 className="rv-story__title">
              <Link href={story.href}>{story.title}</Link>
            </h3>
            <div className="rv-story__author">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={story.author.avatar} alt="" />
              <div>
                <Link href={story.author.href}>
                  <strong>{story.author.name}</strong>
                </Link>
                <small>{story.author.role}</small>
              </div>
              <span className="rv-meta__item rv-story__date">
                <IcClock size={12} /> {formatDate(story.date)}
              </span>
            </div>
            <p className="rv-story__excerpt">
              {story.excerpt}{" "}
              <Link href={story.href} className="rv-readmore">
                اقرأ المزيد
              </Link>
            </p>
          </div>
          <Link href={story.href} className="rv-story__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.image} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
