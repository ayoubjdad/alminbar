import Breadcrumbs from "../ui/Breadcrumbs";

/** رأس الصفحات الداخلية: مسار التنقل + عنوان + وصف + محتوى إضافي (شعار…). */
export default function PageHeader({ title, accent, description, breadcrumbs = [], media, children }) {
  return (
    <section className="rv-page-header">
      <div className="rv-container">
        <Breadcrumbs items={breadcrumbs.length ? breadcrumbs : [{ label: title }]} />
        <div className="rv-page-header__row">
          {media && <div className="rv-page-header__media">{media}</div>}
          <div className="rv-page-header__text">
            <h1 className="rv-title">
              {title} {accent && <span>{accent}</span>}
            </h1>
            {description && <p className="rv-page-header__desc">{description}</p>}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
