import PageHeader from "../components/layout/PageHeader";

/** قالب الصفحات النصية (من نحن، الخصوصية…). `sections`: [{ title, text }]. */
export default function StaticPage({ title, description, sections = [], children }) {
  return (
    <>
      <PageHeader title={title} description={description} breadcrumbs={[{ label: title }]} />
      <div className="rv-container rv-page-body">
        <div className="rv-prose rv-static">
          {sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {[].concat(s.text).map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </section>
          ))}
          {children}
        </div>
      </div>
    </>
  );
}
