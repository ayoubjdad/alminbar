import EmptyState from "../ui/EmptyState";
import MatchCard from "./MatchCard";

/** شبكة مباريات مع عنوان فرعي اختياري. */
export default function MatchList({ title, matches, showCompetition = false, empty }) {
  return (
    <div className="rv-matches">
      {title && <h3 className="rv-matches__title">{title}</h3>}
      {matches.length ? (
        <div className="rv-matches__grid">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} showCompetition={showCompetition} />
          ))}
        </div>
      ) : (
        <EmptyState title={empty ?? "لا توجد مباريات"} />
      )}
    </div>
  );
}
