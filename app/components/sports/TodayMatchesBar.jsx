import { getTodayMatches } from "../../../lib/queries";
import TodayMatchesStrip from "./TodayMatchesStrip";

/**
 * شريط «مباريات اليوم» (مكوّن خادم): يجهّز بيانات خفيفة ويمرّرها للجزء التفاعلي.
 * يختفي إن لم تكن هناك مباريات.
 */
export default function TodayMatchesBar() {
  const matches = getTodayMatches().map(({ competitionInfo: c, ...m }) => ({
    ...m,
    competitionInfo: { href: c.href, shortName: c.shortName, logo: c.logo },
  }));

  if (!matches.length) return null;
  return <TodayMatchesStrip matches={matches} />;
}
