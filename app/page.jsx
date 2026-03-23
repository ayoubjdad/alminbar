import GalleriesFeature from "./components/GalleriesFeature/GalleriesFeature";
import Hero from "./components/Hero/Hero";
import HomePageLayout from "./layouts/HomePageLayout/HomePageLayout";
import InvestigativeSection from "./components/InvestigativeSection/InvestigativeSection";
import NewsSection from "./components/NewsSection/NewsSection";
import OpinionSection from "./components/OpinionSection/OpinionSection";
import PollSection from "./components/PollSection/PollSection";
import ProgramsSection from "./components/ProgramsSection/ProgramsSection";
import ReadingLatestVideo from "./components/ReadingLatestVideo/ReadingLatestVideo";
import TopicGridSection from "./components/TopicGridSection/TopicGridSection";
import TrendingNowSection from "./components/TrendingNowSection/TrendingNowSection";
import VarietiesSection from "./components/VarietiesSection/VarietiesSection";

const ARAB_WORLD_ITEMS = [
  {
    title:
      "قمة عربية: ملفات مشتركة على طاولة المناقشات في اليوم الثاني",
    date: "12 أكتوبر 2023",
  },
  {
    title: "بيان مشترك يؤكد أهمية التنسيق في الملفات الإقليمية",
    date: "12 أكتوبر 2023",
  },
  {
    title: "تقارير: اجتماعات ثنائية على هامش أعمال القمة",
    date: "12 أكتوبر 2023",
  },
  {
    title: "خبراء: المشهد الاقتصادي يبقى محور الاهتمام الإعلامي",
    date: "11 أكتوبر 2023",
  },
];

export default function Home() {
  return (
    <HomePageLayout>
      <Hero />
      <NewsSection title="أخبار لبنان" />
      <NewsSection title="العالم العربي" items={ARAB_WORLD_ITEMS} />
      <ReadingLatestVideo />
      <VarietiesSection />
      <PollSection />
      <OpinionSection />
      <TopicGridSection />
      <TrendingNowSection />
      <InvestigativeSection />
      <ProgramsSection />
      <GalleriesFeature />
    </HomePageLayout>
  );
}
