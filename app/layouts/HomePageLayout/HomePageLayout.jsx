import AdZone from "../../components/AdZone/AdZone";
import SiteFooter from "../../components/SiteFooter/SiteFooter";
import SiteHeader from "../../components/SiteHeader/SiteHeader";
import TopBar from "../../components/TopBar/TopBar";
import { AD_SLOTS } from "../../../lib/adSlots";
import styles from "./HomePageLayout.module.scss";

export default function HomePageLayout({ children }) {
  return (
    <div className={styles.root}>
      <TopBar />
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.adTop}>
          <AdZone slot={AD_SLOTS.LEADERBOARD_TOP} variant="leaderboard" />
        </div>
        {children}
        <div className={styles.adBottom}>
          <AdZone slot={AD_SLOTS.RECTANGLE_BOTTOM} variant="rectangle" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
