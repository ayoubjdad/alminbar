import TopBar from "../../components/TopBar/TopBar";
import SiteHeader from "../../components/SiteHeader/SiteHeader";
import styles from "./HomePageLayout.module.scss";

export default function HomePageLayout({ children }) {
  return (
    <div className={styles.root}>
      <TopBar />
      <SiteHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
