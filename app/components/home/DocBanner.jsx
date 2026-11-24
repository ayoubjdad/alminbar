import Link from "next/link";
import { BRAND_LOGO_WHITE, img } from "../../../lib/helpers/images";

/** بانر ملف خاص (فوق صورة). */
export default function DocBanner({
  href = "/category/national-team",
  image = img("football-national-team", 1600, 700),
  kicker = "وثائقي",
  small = "أسـود",
  big = "الأطلس",
  sub = "الـقـصـة الـكـامـلـة",
  logos = ["FRMF", "CAF", "FIFA"],
}) {
  return (
    <section className="rv-doc">
      <div className="rv-container">
        <Link href={href} className="rv-doc__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rv-doc__img" src={image} alt="" />
          <span className="rv-doc__overlay" />
          <div className="rv-doc__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rv-doc__brand-logo" src={BRAND_LOGO_WHITE} alt="المنبر الرياضي" />
            <span className="rv-tag">{kicker}</span>
          </div>
          <div className="rv-doc__content">
            <span className="rv-doc__small">{small}</span>
            <strong className="rv-doc__big">{big}</strong>
            <span className="rv-doc__sub">{sub}</span>
          </div>
          <div className="rv-doc__logos">
            {logos.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}
