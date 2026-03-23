import styles from "./TopBar.module.scss";

const ITEMS = ["أخبار", "برامج", "المشهد سبورتس", "بودكاست", "ترندات"];

export default function TopBar() {
  return (
    <div className={styles.bar}>
      {ITEMS.map((item, i) => (
        <span key={item} className={styles.item}>
          <p>{item}</p>
          {i !== ITEMS.length - 1 && <span>|</span>}
        </span>
      ))}
    </div>
  );
}
