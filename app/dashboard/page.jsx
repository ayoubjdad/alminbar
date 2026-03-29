import HomePageLayout from "../layouts/HomePageLayout/HomePageLayout";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "لوحة التحرير",
  robots: "noindex, nofollow",
};

export default function DashboardPage() {
  return (
    <HomePageLayout>
      <DashboardClient />
    </HomePageLayout>
  );
}
