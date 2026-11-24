import Sidebar from "../components/layout/Sidebar";

/**
 * صفحة داخلية: محتوى رئيسي + عمود جانبي.
 * `sidebar`: false لإخفائه، أو عنصر مخصص، أو true (العمود الافتراضي).
 */
export default function ContentLayout({ children, sidebar = true, sidebarProps }) {
  return (
    <div className="rv-container">
      <div className={`rv-content ${sidebar ? "" : "is-full"}`}>
        <div className="rv-content__main">{children}</div>
        {sidebar === true ? <Sidebar {...sidebarProps} /> : sidebar || null}
      </div>
    </div>
  );
}
