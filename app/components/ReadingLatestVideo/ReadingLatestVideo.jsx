import { DEFAULT_LEAGUE_TABS } from "../../../lib/data/footballRankings";
import LeagueRankingsPanel from "../LeagueRankingsPanel/LeagueRankingsPanel";
import styles from "./ReadingLatestVideo.module.scss";

const MOST_READ = [
  "هذه خطة إسرائيل التي قدمتها لترامب لحرب إيران.. لماذا لم تنجح؟",
  "أمين عام الناتو: الحلف قادر على إعادة فتح مضيق هرمز",
  "الدوري الإيطالي - فيورنتينا يتعادل مع إنتر ميلان ويشعل الصراع على اللقب",
  "اجتماع طارئ في بيروت بشأن التطورات الإقليمية",
  "أسعار النفط ترتفع مع تصاعد التوترات في المنطقة",
];

const LATEST = [
  { text: "قمة عربية تبحث ملفات الأمن الغذائي والمائي", time: "منذ 15 دقيقة" },
  {
    text: "وزير الخارجية: نعمل على تهدئة الوضع عبر الحوار",
    time: "منذ 32 دقيقة",
  },
  { text: "البنك المركزي يصدر بياناً حول السياسة النقدية", time: "منذ ساعة" },
  {
    text: "انتخابات نقابية تسجل إقبالاً ملحوظاً في العاصمة",
    time: "منذ ساعتين",
  },
];

export default function ReadingLatestVideo({
  leagueTabs = DEFAULT_LEAGUE_TABS,
}) {
  return (
    <section className={styles.root}>
      <div className={styles.rankingsCol}>
        <h2 className={styles.colTitle}>ترتيب الدوريات</h2>
        <LeagueRankingsPanel tabs={leagueTabs} />
      </div>

      <div className={styles.col}>
        <h2 className={styles.colTitle}>الأكثر قراءة</h2>
        <ol className={styles.mostReadList}>
          {MOST_READ.map((line, i) => (
            <li key={i} className={styles.mostReadItem}>
              <span className={styles.num}>{i + 1}</span>
              <span className={styles.mostReadText}>{line}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.col}>
        <h2 className={styles.colTitle}>أحدث الأخبار</h2>
        <ul className={styles.latestList}>
          {LATEST.map((row, i) => (
            <li key={i} className={styles.latestItem}>
              <p className={styles.latestText}>{row.text}</p>
              <span className={styles.latestTime}>{row.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
