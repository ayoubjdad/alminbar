import Link from "next/link";
import { getClub } from "../../../lib/queries";
import { IcArrowLeft } from "../ui/Icons";

/** بانر مباراة كبرى (افتراضياً: ديربي الدار البيضاء). */
export default function DerbyBanner({
  home = "raja-club-athletic",
  away = "wydad-casablanca",
  badge = "البطولة الاحترافية",
  title = "ديربي الدار البيضاء",
  href = "/article/casablanca-derby-preview",
  cta = "تابع التغطية",
}) {
  const clubs = [getClub(home), getClub(away)];
  return (
    <section className="rv-vote">
      <div className="rv-container">
        <div className="rv-vote__inner">
          <div className="rv-vote__media">
            {clubs.map((club) => (
              <Link key={club.slug} href={club.href} className="rv-vote__club">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={club.logo} alt="" />
                <span>{club.nameAr}</span>
              </Link>
            ))}
            <span className="rv-vote__vs">ضدّ</span>
          </div>
          <div className="rv-vote__body">
            <span className="rv-vote__badge">{badge}</span>
            <span className="rv-vote__live">
              <b>مباشر</b>
              <i>تغطية</i>
            </span>
            <h2 className="rv-vote__title">
              {title}: {clubs[0].nameAr} ضدّ {clubs[1].nameAr}
            </h2>
            <Link href={href} className="rv-vote__btn">
              {cta} <IcArrowLeft size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
