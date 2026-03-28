import styles from "./SectionHeading.module.scss";

export default function SectionHeading({ title, variant = "default", id }) {
  const rowClass =
    variant === "inline" ? styles.rowInline : styles.row;

  return (
    <div className={rowClass}>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
    </div>
  );
}
