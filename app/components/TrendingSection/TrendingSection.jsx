import SectionHeading from "../SectionHeading/SectionHeading";
import MiniPost from "./MiniPost";
import styles from "./TrendingSection.module.scss";

function TrendingColumn({ highlight }) {
  return (
    <div className={highlight ? styles.columnHighlight : styles.column}>
      <SectionHeading title="أخبار لبنان" />
      <MiniPost />
      <MiniPost />
      <MiniPost />
    </div>
  );
}

export default function TrendingSection() {
  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <TrendingColumn highlight />
        <TrendingColumn />
        <TrendingColumn />
      </div>
    </div>
  );
}
