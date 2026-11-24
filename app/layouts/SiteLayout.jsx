import FlashBar from "../components/layout/FlashBar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Newsletter from "../components/layout/Newsletter";

/** الهيكل المشترك لكل الصفحات: شريط عاجل، رأس، محتوى، نشرة، تذييل. */
export default function SiteLayout({ children }) {
  return (
    <div className="rv">
      <a href="#main" className="rv-skip">
        انتقل إلى المحتوى
      </a>
      <FlashBar />
      <Header />
      <main id="main">{children}</main>
      <Newsletter />
      <Footer />
    </div>
  );
}
