import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./TodaysGamesSection.module.scss";

/** عيّنة ثابتة — استبدلها لاحقاً ببيانات API */
const MATCHES = [
  {
    id: "1",
    home: "الوداد الرياضي",
    away: "نهضة بركان",
    time: "16:00",
    league: "البطولة الاحترافية — الدوري المغربي",
    venue: "الدار البيضاء",
  },
  {
    id: "2",
    home: "الرجاء الرياضي",
    away: "المغرب التطواني",
    time: "18:15",
    league: "البطولة الاحترافية — الدوري المغربي",
    venue: "الدار البيضاء",
  },
  {
    id: "3",
    home: "ريال مدريد",
    away: "مانشستر سيتي",
    time: "21:00",
    league: "دوري أبطال أوروبا — ربع النهائي",
    venue: "مدريد",
  },
  {
    id: "4",
    home: "أرسنال",
    away: "بايرن ميونخ",
    time: "21:00",
    league: "دوري أبطال أوروبا — ربع النهائي",
    venue: "لندن",
  },
  {
    id: "5",
    home: "المنتخب المغربي",
    away: "ودية",
    time: "22:30",
    league: "مباراة ودية — تحضيرية",
    venue: "الرباط",
  },
];

export default function TodaysGamesSection() {
  const todayLabel = new Intl.DateTimeFormat("ar-MA-u-ca-gregory", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className={styles.root} aria-labelledby="todays-games-heading">
      <div className={styles.head}>
        <SectionHeading id="todays-games-heading" title="مباريات اليوم" />
        <p className={styles.dateLine}>{todayLabel}</p>
      </div>
      <div className={styles.track} role="list">
        {MATCHES.map((m) => (
          <article key={m.id} className={styles.card} role="listitem">
            <div className={styles.league}>{m.league}</div>
            <div className={styles.teams}>
              <span className={styles.team}>{m.home}</span>
              <span className={styles.vs}>ضد</span>
              <span className={styles.team}>{m.away}</span>
            </div>
            <div className={styles.meta}>
              <time className={styles.time}>{m.time}</time>
              <span className={styles.dot} aria-hidden />
              <span className={styles.venue}>{m.venue}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
