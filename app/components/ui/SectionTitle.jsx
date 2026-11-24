import Link from "next/link";
import { IcArrowLeft } from "./Icons";

/**
 * عنوان قسم بنمط الموقع: «أخبار <span>اليوم</span>».
 * `title` + `accent` (الجزء الملوّن) + رابط «المزيد» اختياري.
 */
export default function SectionTitle({
  title,
  accent,
  as: Tag = "h2",
  center = false,
  moreHref,
  moreLabel = "المزيد",
  className = "",
}) {
  return (
    <div className={`rv-section-head ${center ? "is-center" : ""} ${className}`}>
      <Tag className={`rv-title ${center ? "rv-title--center" : ""}`}>
        {title} {accent && <span>{accent}</span>}
      </Tag>
      {moreHref && (
        <Link href={moreHref} className="rv-section-head__more">
          {moreLabel} <IcArrowLeft size={12} />
        </Link>
      )}
    </div>
  );
}
