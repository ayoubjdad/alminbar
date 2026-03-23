import postImage from "../../assets/images/post_large.webp";
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
  { text: "وزير الخارجية: نعمل على تهدئة الوضع عبر الحوار", time: "منذ 32 دقيقة" },
  { text: "البنك المركزي يصدر بياناً حول السياسة النقدية", time: "منذ ساعة" },
  { text: "انتخابات نقابية تسجل إقبالاً ملحوظاً في العاصمة", time: "منذ ساعتين" },
  { text: "تقرير: الاستثمارات الأجنبية تنمو في القطاع الرقمي", time: "منذ 3 ساعات" },
];

const VIDEOS = [
  "تغطية مباشرة: أبرز مستجدات الملف الإقليمي",
  "لقاء خاص: قراءة في المشهد الاقتصادي",
  "وثائقي المشهد: ملف الطاقة والممرات البحرية",
  "تحليل: ماذا بعد القمة؟",
  "رياضة المشهد: ملخص الجولة وترتيب الدوري",
];

export default function ReadingLatestVideo() {
  return (
    <section className={styles.root}>
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

      <div className={styles.videoCol}>
        <div className={styles.videoHeader}>
          <h2 className={styles.videoTitle}>فيديو</h2>
        </div>
        <ul className={styles.videoList}>
          {VIDEOS.map((line, i) => (
            <li key={i} className={styles.videoRow}>
              <span className={styles.videoRank}>{i + 1}</span>
              <p className={styles.videoText}>{line}</p>
              <div
                className={styles.videoThumb}
                style={{ "--post-bg": `url(${postImage.src})` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
