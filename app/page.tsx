import DerbyBanner from "./components/home/DerbyBanner";
import DocBanner from "./components/home/DocBanner";
import EditorPick from "./components/home/EditorPick";
import FourCards from "./components/home/FourCards";
import LatestGrid from "./components/home/LatestGrid";
import MoreList from "./components/home/MoreList";
import Story from "./components/home/Story";
import TodayNews from "./components/home/TodayNews";
import VideoGallery from "./components/home/VideoGallery";
import Writers from "./components/home/Writers";
import ClubsStrip from "./components/sports/ClubsStrip";
import ReelsSection from "./components/sports/ReelsSection";
import TodayMatchesBar from "./components/sports/TodayMatchesBar";

export default function HomePage() {
  return (
    <>
      <TodayMatchesBar />
      <ClubsStrip />
      <TodayNews />
      <DocBanner />
      <EditorPick />
      <DerbyBanner />
      <ReelsSection />
      <FourCards />
      <VideoGallery />
      <Story />
      <MoreList />
      <Writers />
      <LatestGrid />
    </>
  );
}
