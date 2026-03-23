import Hero from "./components/Hero/Hero";
import HomePageLayout from "./layouts/HomePageLayout/HomePageLayout";
import NewsSection from "./components/NewsSection/NewsSection";
import TrendingSection from "./components/TrendingSection/TrendingSection";

export default function Home() {
  return (
    <HomePageLayout>
      <Hero />
      <NewsSection />
      <NewsSection />
      <TrendingSection />
      <NewsSection />
      <NewsSection />
    </HomePageLayout>
  );
}
