import Link from "next/link";
import { routes } from "../../../lib/helpers/routes";

/** وسوم المقال + الأندية + المسابقة المرتبطة. */
export default function ArticleTags({ article }) {
  const { clubsInfo, competitionInfo, tags } = article;
  if (!clubsInfo.length && !competitionInfo && !tags.length) return null;
  return (
    <div className="rv-article-tags">
      {(clubsInfo.length > 0 || competitionInfo) && (
        <div className="rv-article-tags__row">
          <span className="rv-article-tags__label">مرتبط بـ:</span>
          {competitionInfo && (
            <Link href={competitionInfo.href} className="rv-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={competitionInfo.logo} alt="" />
              {competitionInfo.name}
            </Link>
          )}
          {clubsInfo.map((c) => (
            <Link key={c.slug} href={c.href} className="rv-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt="" />
              {c.nameAr}
            </Link>
          ))}
        </div>
      )}
      {tags.length > 0 && (
        <div className="rv-article-tags__row">
          <span className="rv-article-tags__label">وسوم:</span>
          {tags.map((t) => (
            <Link key={t} href={routes.search(t)} className="rv-chip rv-chip--tag">
              #{t}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
