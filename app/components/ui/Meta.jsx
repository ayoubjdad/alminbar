import Link from "next/link";
import { formatDate } from "../../../lib/helpers/format";
import { IcClock } from "./Icons";

/** سطر التاريخ + الكاتب أسفل العناوين. */
export default function Meta({ author, date, light = false, children }) {
  return (
    <div className={`rv-meta ${light ? "rv-meta--light" : ""}`}>
      {date && (
        <span className="rv-meta__item">
          <IcClock size={12} />
          <time dateTime={date}>{formatDate(date)}</time>
        </span>
      )}
      {author && (
        <span className="rv-meta__item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rv-meta__avatar" src={author.avatar} alt="" />
          بقلم{" "}
          <Link href={author.href} className="rv-meta__author">
            {author.name}
          </Link>
        </span>
      )}
      {children}
    </div>
  );
}
