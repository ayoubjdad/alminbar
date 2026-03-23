import SiteFooter from "../../components/SiteFooter/SiteFooter";
import SiteHeader from "../../components/SiteHeader/SiteHeader";
import TopBar from "../../components/TopBar/TopBar";
import styles from "./HomePageLayout.module.scss";

export default function HomePageLayout({ children }) {
  return (
    <div className={styles.root}>
      <TopBar />
      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
