import AdZone from "./components/AdZone/AdZone";
import GalleriesFeature from "./components/GalleriesFeature/GalleriesFeature";
import Hero from "./components/Hero/Hero";
import HomePageLayout from "./layouts/HomePageLayout/HomePageLayout";
import MoroccanClubsSection from "./components/MoroccanClubsSection/MoroccanClubsSection";
import { AD_SLOTS } from "../lib/adSlots";
import NewsSection from "./components/NewsSection/NewsSection";
import OpinionSection from "./components/OpinionSection/OpinionSection";
import PollSection from "./components/PollSection/PollSection";
import ReadingLatestVideo from "./components/ReadingLatestVideo/ReadingLatestVideo";
import TodaysGamesSection from "./components/TodaysGamesSection/TodaysGamesSection";
import TopicGridSection from "./components/TopicGridSection/TopicGridSection";
import TrendingNowSection from "./components/TrendingNowSection/TrendingNowSection";
import VarietiesSection from "./components/VarietiesSection/VarietiesSection";

export default function Home() {
  return (
    <HomePageLayout>
      <TodaysGamesSection />
      <MoroccanClubsSection />
      <Hero />
      <NewsSection title="الدوري والأندية المغربية" sectionKey="club" />
      <NewsSection title="عالم كرة القدم" sectionKey="arab-world" />
      <ReadingLatestVideo />
      <AdZone slot={AD_SLOTS.HOME_INLINE_SECONDARY} variant="leaderboard" />
      <NewsSection title="رياضة مغربية" sectionKey="morocco-sports" />
      <NewsSection title="منوعات رياضية" sectionKey="variety" />
      <VarietiesSection />
      <PollSection />
      <OpinionSection />
      <TopicGridSection />
      <TrendingNowSection />
      <GalleriesFeature />
    </HomePageLayout>
  );
}
