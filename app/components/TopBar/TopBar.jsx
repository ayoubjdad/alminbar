import styles from "./TopBar.module.scss";

const ITEMS = [
  "البطولة الاحترافية",
  "المنتخب المغربي",
  "الكأس العرش",
  "أندية الدوري",
  "مباريات اليوم",
];

export default function TopBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.links}>
        {ITEMS.map((item, i) => (
          <span key={item} className={styles.item}>
            <p>{item}</p>
            {i !== ITEMS.length - 1 && <span className={styles.sep}>|</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
