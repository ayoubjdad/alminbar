import postImage from "../../assets/images/post_large.webp";
import styles from "./TopicGridSection.module.scss";

const COLUMNS = [
  {
    title: "رياضة",
    featured: "نهائي الكأس: موعد القمة وترقب الجماهير لحسم اللقب",
    featuredTime: "اليوم: 12:04",
    links: [
      { t: "الدوري: جدول مباريات اليوم والقنوات الناقلة", d: "اليوم: 09:41" },
      { t: "انتقالات: صفقة جديدة تُثير الجدل بين الناديين", d: "أمس: 18:20" },
      { t: "منتخب: قائمة المعسكر تضم وجوهاً شابة", d: "11 أكتوبر 2023" },
    ],
  },
  {
    title: "تكنولوجيا",
    featured: "الذكاء الاصطناعي: شركات عالمية تعلن أدوات جديدة للمطورين",
    featuredTime: "اليوم: 11:22",
    links: [
      { t: "هواتف: إطلاق سلسلة جديدة بكاميرات محسّنة", d: "اليوم: 08:15" },
      { t: "أمن المعلومات: توصيات لتأمين الحسابات الشخصية", d: "أمس: 16:45" },
      {
        t: "شبكات: توسعة تغطية الجيل الخامس في المدن الكبرى",
        d: "11 أكتوبر 2023",
      },
    ],
  },
  {
    title: "صحة",
    featured: "الصحة العامة: حملة توعية حول الوقاية من الأمراض الموسمية",
    featuredTime: "اليوم: 10:05",
    links: [
      { t: "تغذية: إرشادات خبراء حول جودة الغذاء اليومي", d: "اليوم: 07:30" },
      { t: "طب: دراسة تناقش أثر النوم على التركيز", d: "أمس: 14:10" },
      { t: "لياقة: برامج تدريب منزلية بلا معدات", d: "11 أكتوبر 2023" },
    ],
  },
  {
    title: "بيئة",
    featured: "المناخ: مبادرة دولية لمتابعة التزامات خفض الانبعاثات",
    featuredTime: "اليوم: 09:18",
    links: [
      { t: "طاقة: مشاريع شمسية جديدة في عدة مناطق", d: "اليوم: 06:55" },
      { t: "مياه: سياسات ترشيد تُطرح للنقاش العام", d: "أمس: 19:00" },
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
            <div className={styles.featuredStack}>
              <div className={styles.badgeRow}>
                <div className={styles.badge}>
                  <h2 className={styles.badgeTitle}>{col.title}</h2>
                </div>
              </div>
              <div
                className={styles.featuredImg}
                style={{ "--post-bg": `url(${postImage.src})` }}
              />
            </div>

            <article className={styles.featuredArticle}>
              <p className={styles.featuredText}>{col.featured}</p>
              <time className={styles.featuredTime}>{col.featuredTime}</time>
            </article>

            <ul className={styles.list}>
              {col.links.map((row, j) => (
                <li key={j} className={styles.listItem}>
                  <a href="#" className={styles.listLink}>
                    <p className={styles.listTitle}>{row.t}</p>
                    <span className={styles.listDate}>{row.d}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
