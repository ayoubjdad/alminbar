import AdZone from "./components/AdZone/AdZone";
import GalleriesFeature from "./components/GalleriesFeature/GalleriesFeature";
import Hero from "./components/Hero/Hero";
import HomePageLayout from "./layouts/HomePageLayout/HomePageLayout";
import MoroccanClubsSection from "./components/MoroccanClubsSection/MoroccanClubsSection";
import { AD_SLOTS } from "../lib/adSlots";
import { getHomePageNewsSections } from "../lib/cms/buildCmsMeta";
import NewsSection from "./components/NewsSection/NewsSection";
import OpinionSection from "./components/OpinionSection/OpinionSection";
import PollSection from "./components/PollSection/PollSection";
import ReadingLatestVideo from "./components/ReadingLatestVideo/ReadingLatestVideo";
import TodaysGamesSection from "./components/TodaysGamesSection/TodaysGamesSection";
import TopicGridSection from "./components/TopicGridSection/TopicGridSection";
import TrendingNowSection from "./components/TrendingNowSection/TrendingNowSection";

export default async function Home() {
  const homeNewsSections = getHomePageNewsSections();
  const newsAfterHero = homeNewsSections.slice(0, 2);
  const newsAfterAd = homeNewsSections.slice(2, 3);
  const topicGridColumns = homeNewsSections.slice(3, 7);

  return (
    <HomePageLayout>
      <TodaysGamesSection />
      <MoroccanClubsSection />
      <Hero />
      {newsAfterHero.map(({ title, sectionKey, value }) => (
        <NewsSection key={value} title={title} sectionKey={sectionKey} />
      ))}
      <ReadingLatestVideo />
      <AdZone slot={AD_SLOTS.HOME_INLINE_SECONDARY} variant="leaderboard" />
      {newsAfterAd.map(({ title, sectionKey, value }) => (
        <NewsSection key={value} title={title} sectionKey={sectionKey} />
      ))}
      <PollSection />
      <OpinionSection />
      <TopicGridSection columns={topicGridColumns} />
      <TrendingNowSection />
      <GalleriesFeature />
    </HomePageLayout>
  );
}
