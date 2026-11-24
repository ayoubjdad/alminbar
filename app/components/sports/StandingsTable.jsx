import Link from "next/link";
import { formatGoalDiff } from "../../../lib/helpers/format";

/**
 * جدول ترتيب.
 * `variant`: "compact" (عمود جانبي: #، الفريق، لعب، ±، نقاط) أو "full" (+ ف/ت/خ/له/عليه).
 * `highlight`: slug نادٍ يُبرز صفّه. `limit`: عدد الصفوف.
 */
export default function StandingsTable({
  competition,
  variant = "compact",
  highlight,
  limit,
  showLegend = true,
}) {
  const full = variant === "full";
  const rows = limit ? competition.rows.slice(0, limit) : competition.rows;

  return (
    <>
      <div className="rv-table-wrap">
        <table className={`rv-table ${full ? "rv-table--full" : ""}`}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="is-team">
                الفريق
              </th>
              <th scope="col" title="لعب">لعب</th>
              {full && (
                <>
                  <th scope="col" title="فوز">ف</th>
                  <th scope="col" title="تعادل">ت</th>
                  <th scope="col" title="خسارة">خ</th>
                  <th scope="col" title="له">له</th>
                  <th scope="col" title="عليه">عليه</th>
                </>
              )}
              <th scope="col" title="فارق الأهداف">±</th>
              <th scope="col">نقاط</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.team}
                className={[
                  row.zone ? `is-${row.zone}` : "",
                  highlight && row.slug === highlight ? "is-highlight" : "",
                ].join(" ")}
              >
                <td>
                  <span className="rv-table__rank">{row.rank}</span>
                </td>
                <td className="is-team">
                  {row.href ? (
                    <Link href={row.href} className="rv-table__team">
                      <TeamCell row={row} />
                    </Link>
                  ) : (
                    <span className="rv-table__team">
                      <TeamCell row={row} />
                    </span>
                  )}
                </td>
                <td className="is-num">{row.mp}</td>
                {full && (
                  <>
                    <td className="is-num">{row.won}</td>
                    <td className="is-num">{row.draw}</td>
                    <td className="is-num">{row.lost}</td>
                    <td className="is-num">{row.goalsFor}</td>
                    <td className="is-num">{row.goalsAgainst}</td>
                  </>
                )}
                <td className="is-num" dir="ltr">
                  {formatGoalDiff(row.gd)}
                </td>
                <td className="is-pts">{row.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showLegend && (
        <ul className="rv-standings__legend">
          {Object.entries(competition.zoneLabels).map(([zone, label]) => (
            <li key={zone}>
              <span className={`rv-standings__dot is-${zone}`} />
              {label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function TeamCell({ row }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rv-table__logo"
        src={row.logo}
        alt=""
        width={20}
        height={20}
        loading="lazy"
      />
      <span className="rv-table__name">{row.team}</span>
    </>
  );
}
