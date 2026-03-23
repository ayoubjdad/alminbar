import styles from "./SectionHeading.module.scss";

export default function SectionHeading({ title }) {
  return (
    <div className={styles.row}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
