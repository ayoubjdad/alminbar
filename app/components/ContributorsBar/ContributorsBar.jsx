import styles from "./ContributorsBar.module.scss";

const CONTRIBUTORS = [
  { name: "أحمد المنصوري" },
  { name: "ليلى الحسين" },
  { name: "محمد الخطيب" },
  { name: "سارة القاضي" },
  { name: "عمر الزين" },
  { name: "نورا الدين" },
  { name: "كريم صالح" },
  { name: "هند المصري" },
];

export default function ContributorsBar() {
  return (
    <div className={styles.root}>
      <div className={styles.track}>
        {CONTRIBUTORS.map((c, i) => (
          <button key={i} type="button" className={styles.item}>
            <span className={styles.avatar} aria-hidden>
              {c.name.charAt(0)}
            </span>
            <span className={styles.name}>{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
