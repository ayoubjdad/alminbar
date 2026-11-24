import Link from "next/link";
import { getMostRead } from "../../../lib/queries";
import { formatNumber } from "../../../lib/helpers/format";
import StandingsWidget from "../sports/StandingsWidget";
import { IcEye } from "../ui/Icons";

/** العمود الجانبي المشترك: الأكثر قراءة + الترتيب. */
export default function Sidebar({ standings = true, mostRead = true, children }) {
  const top = mostRead ? getMostRead(5) : [];
  return (
    <aside className="rv-sidebar">
      {children}
      {mostRead && (
        <section className="rv-widget">
          <h2 className="rv-underline">الأكثر قراءة</h2>
          <ol className="rv-most-read">
            {top.map((a, i) => (
              <li key={a.slug}>
                <span className="rv-most-read__num">{i + 1}</span>
                <div>
                  <Link href={a.href} className="rv-most-read__title">
                    {a.title}
                  </Link>
                  <span className="rv-most-read__views">
                    <IcEye size={11} /> {formatNumber(a.views)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
      {standings && <StandingsWidget />}
    </aside>
  );
}
