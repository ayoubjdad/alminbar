import Link from "next/link";
import { formatDay } from "../../../lib/helpers/format";

function Side({ team, align }) {
  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={team.logo} alt="" width={36} height={36} loading="lazy" />
      <span>{team.shortName}</span>
    </>
  );
  return team.href ? (
    <Link href={team.href} className={`rv-match__team is-${align}`}>
      {content}
    </Link>
  ) : (
    <span className={`rv-match__team is-${align}`}>{content}</span>
  );
}

function statusLabel(match) {
  if (match.status === "finished") return "انتهت";
  if (match.status === "live") {
    const minute = match.minute ? ` · ${match.minute}′` : "";
    return `${match.period ?? "مباشر"}${minute}`;
  }
  return "لم تبدأ";
}

/**
 * بطاقة مباراة: نتيجة (جارية / منتهية) أو توقيت (قادمة).
 * `showCompetition`: اسم المسابقة بدل الجولة في الرأس.
 * `showChannel`: القناة بدل التاريخ في الرأس (شريط مباريات اليوم).
 */
export default function MatchCard({ match, showCompetition = false, showChannel = false }) {
  const live = match.status === "live";
  const hasScore = match.status !== "upcoming" && match.score;
  const comp = match.competitionInfo;

  return (
    <article className={`rv-match is-${match.status}`}>
      <header className="rv-match__head">
        {showCompetition ? (
          <Link href={comp.href} className="rv-match__comp">
            {comp.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={comp.logo} alt="" width={16} height={16} />
            )}
            {comp.shortName}
          </Link>
        ) : (
          <span>{match.round}</span>
        )}
        {showChannel && match.channel ? (
          <span className="rv-match__channel">{match.channel}</span>
        ) : (
          <time dateTime={match.date}>{formatDay(match.date)}</time>
        )}
      </header>
      <div className="rv-match__body">
        <Side team={match.home} align="home" />
        <div className="rv-match__center">
          {hasScore ? (
            // RTL: نتيجة المستضيف (يمين) ثم الضيف (يسار)
            <strong
              className="rv-match__score"
              aria-label={`${match.home.name} ${match.score[0]}، ${match.away.name} ${match.score[1]}`}
            >
              <span>{match.score[0]}</span>
              <span aria-hidden>-</span>
              <span>{match.score[1]}</span>
            </strong>
          ) : (
            <strong className="rv-match__time">{match.time}</strong>
          )}
          <small className={live ? "rv-match__live" : undefined}>
            {live && <i aria-hidden />}
            {statusLabel(match)}
          </small>
        </div>
        <Side team={match.away} align="away" />
      </div>
    </article>
  );
}
