import Link from "next/link";
import AdZone from "./components/AdZone/AdZone";
import HomePageLayout from "./layouts/HomePageLayout/HomePageLayout";
import { AD_SLOTS } from "../lib/adSlots";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <HomePageLayout>
      <div className={styles.root}>
        <h1 className={styles.title}>الصفحة غير موجودة</h1>
        <p className={styles.text}>
          لم نعثر على العنوان المطلوب. يمكنك العودة إلى الصفحة الرئيسية.
        </p>
        <Link href="/" className={styles.link}>
          الصفحة الرئيسية
        </Link>
        <div className={styles.ad}>
          <AdZone slot={AD_SLOTS.NOT_FOUND_INLINE} variant="rectangle" />
        </div>
      </div>
    </HomePageLayout>
  );
}
