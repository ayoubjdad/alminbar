import postImage from "../../assets/images/post_large.webp";
import styles from "./TopicGridSection.module.scss";

const COLUMNS = [
  {
    title: "رياضة",
    headerClass: styles.headSports,
    featured:
      "نهائي الكأس: موعد القمة وترقب الجماهير لحسم اللقب",
    links: [
      { t: "الدوري: جدول مباريات اليوم والقنوات الناقلة", d: "12 أكتوبر 2023" },
      { t: "انتقالات: صفقة جديدة تُثير الجدل بين الناديين", d: "12 أكتوبر 2023" },
      { t: "منتخب: قائمة المعسكر تضم وجوهاً شابة", d: "11 أكتوبر 2023" },
    ],
  },
  {
    title: "تكنولوجيا",
    headerClass: styles.headTech,
    featured:
      "الذكاء الاصطناعي: شركات عالمية تعلن أدوات جديدة للمطورين",
    links: [
      { t: "هواتف: إطلاق سلسلة جديدة بكاميرات محسّنة", d: "12 أكتوبر 2023" },
      { t: "أمن المعلومات: توصيات لتأمين الحسابات الشخصية", d: "12 أكتوبر 2023" },
      { t: "شبكات: توسعة تغطية الجيل الخامس في المدن الكبرى", d: "11 أكتوبر 2023" },
    ],
  },
  {
    title: "صحة",
    headerClass: styles.headHealth,
    featured:
      "الصحة العامة: حملة توعية حول الوقاية من الأمراض الموسمية",
    links: [
      { t: "تغذية: إرشادات خبراء حول جودة الغذاء اليومي", d: "12 أكتوبر 2023" },
      { t: "طب: دراسة تناقش أثر النوم على التركيز", d: "12 أكتوبر 2023" },
      { t: "لياقة: برامج تدريب منزلية بلا معدات", d: "11 أكتوبر 2023" },
    ],
  },
  {
    title: "بيئة",
    headerClass: styles.headEnv,
    featured:
      "المناخ: مبادرة دولية لمتابعة التزامات خفض الانبعاثات",
    links: [
      { t: "طاقة: مشاريع شمسية جديدة في عدة مناطق", d: "12 أكتوبر 2023" },
      { t: "مياه: سياسات ترشيد تُطرح للنقاش العام", d: "12 أكتوبر 2023" },
      { t: "تنوع حيوي: حماية الموائل في تقرير سنوي", d: "11 أكتوبر 2023" },
    ],
  },
];

export default function TopicGridSection() {
  return (
    <section className={styles.root}>
      <div className={styles.grid}>
        {COLUMNS.map((col, i) => (
          <div key={i} className={styles.column}>
            <div className={`${styles.columnHead} ${col.headerClass}`}>
              <h2 className={styles.columnTitle}>{col.title}</h2>
            </div>
            <article className={styles.featured}>
              <div
                className={styles.featuredImg}
                style={{ "--post-bg": `url(${postImage.src})` }}
              />
              <p className={styles.featuredText}>{col.featured}</p>
            </article>
            <ul className={styles.list}>
              {col.links.map((row, j) => (
                <li key={j} className={styles.listItem}>
                  <p className={styles.listTitle}>{row.t}</p>
                  <span className={styles.listDate}>{row.d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
