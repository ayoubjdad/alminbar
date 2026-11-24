import ContactForm from "../components/layout/ContactForm";
import StaticPage from "../layouts/StaticPage";
import { SITE, SOCIAL_LINKS } from "../../lib/data/site";

export const metadata = { title: "اتصل بنا", description: `تواصل مع فريق ${SITE.name}.` };

export default function ContactPage() {
  return (
    <StaticPage
      title="اتصل بنا"
      description="لأي استفسار، اقتراح أو شراكة، يسعدنا تواصلك معنا."
      sections={[
        {
          title: "عبر الشبكات الاجتماعية",
          text: `راسلنا مباشرة على حساباتنا ${SITE.handle}.`,
        },
      ]}
    >
      <ul className="rv-contact-links">
        {Object.entries(SOCIAL_LINKS).map(([k, href]) => (
          <li key={k}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="is-ltr">
              {k}
            </a>
          </li>
        ))}
      </ul>
      <h2>أرسل رسالة</h2>
      <ContactForm />
    </StaticPage>
  );
}
