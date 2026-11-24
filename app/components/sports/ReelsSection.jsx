import Link from "next/link";
import { REELS } from "../../../lib/data/reels";
import { SITE, SOCIAL_LINKS } from "../../../lib/data/site";
import { BRAND_LOGO } from "../../../lib/helpers/images";
import SectionTitle from "../ui/SectionTitle";
import ReelCard from "./ReelCard";

/** شريط الريلز (الرئيسية): بطاقات + بطاقة «المزيد». */
export default function ReelsSection({ limit = 3 }) {
  return (
    <section className="rv-reels">
      <div className="rv-container">
        <div className="rv-reels__head">
          <SectionTitle title="ريلز" accent="المنبر" moreHref="/reels" moreLabel="كل الريلز" />
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rv-btn rv-btn--red rv-reels__follow"
          >
            {SITE.handle}
          </a>
        </div>

        <ul className="rv-reels__track">
          {REELS.slice(0, limit).map((reel) => (
            <li key={reel.id} className="rv-reels__item">
              <ReelCard reel={reel} />
            </li>
          ))}
          <li className="rv-reels__item">
            <Link href="/reels" className="rv-reel rv-reel--cta">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rv-reel__logo" src={BRAND_LOGO} alt="" />
              <span className="rv-reel__cta-text">شاهد المزيد من الريلز</span>
              <span className="rv-tag">{SITE.handle}</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
