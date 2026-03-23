import SectionHeading from "../SectionHeading/SectionHeading";
import NewsPost from "./NewsPost";
import styles from "./NewsSection.module.scss";

export default function NewsSection() {
  return (
    <div className={styles.root}>
      <SectionHeading title="أخبار لبنان" />
      <div className={styles.grid}>
        <NewsPost />
        <NewsPost />
        <NewsPost />
        <NewsPost />
      </div>
    </div>
  );
}
