import GalleriesFeature from "./components/GalleriesFeature/GalleriesFeature";
import Hero from "./components/Hero/Hero";
import HomePageLayout from "./layouts/HomePageLayout/HomePageLayout";
import NewsSection from "./components/NewsSection/NewsSection";
import OpinionSection from "./components/OpinionSection/OpinionSection";
import PollSection from "./components/PollSection/PollSection";
import ReadingLatestVideo from "./components/ReadingLatestVideo/ReadingLatestVideo";
import TopicGridSection from "./components/TopicGridSection/TopicGridSection";
import TrendingNowSection from "./components/TrendingNowSection/TrendingNowSection";
import VarietiesSection from "./components/VarietiesSection/VarietiesSection";

export default function Home() {
  return (
    <HomePageLayout>
      <Hero />
      <NewsSection title="أخبار لبنان" sectionKey="lebanon" />
      <NewsSection title="العالم العربي" sectionKey="arab-world" />
      <ReadingLatestVideo />
      <NewsSection title="أخبار لبنان" sectionKey="lebanon" />
      <NewsSection title="العالم العربي" sectionKey="arab-world" />
      <VarietiesSection />
      <PollSection />
      <OpinionSection />
      <TopicGridSection />
      <TrendingNowSection />
      <GalleriesFeature />
    </HomePageLayout>
  );
}
