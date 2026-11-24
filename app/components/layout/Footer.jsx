import Link from "next/link";
import { FOOTER_COLUMNS, SITE, SOCIAL_LINKS } from "../../../lib/data/site";
import { IcFacebook, IcInstagram, IcX, IcYoutube } from "../ui/Icons";
import Logo from "./Logo";

const SOCIALS = [
  { key: "facebook", label: "Facebook", Icon: IcFacebook, cls: "is-fb" },
  { key: "x", label: "X", Icon: IcX, cls: "is-x" },
  { key: "instagram", label: "Instagram", Icon: IcInstagram, cls: "is-ig" },
  { key: "youtube", label: "YouTube", Icon: IcYoutube, cls: "is-yt" },
];

export default function Footer() {
  return (
    <footer className="rv-footer">
      <div className="rv-container">
        <div className="rv-footer__grid">
          <div className="rv-footer__about">
            <Logo />
            <p>
              {SITE.name}: متابعة يومية للبطولة الاحترافية، المنتخب الوطني،
              المحترفين المغاربة وأبرز الدوريات العالمية.
            </p>
            <div className="rv-footer__socials">
              {SOCIALS.map(({ key, label, Icon, cls }) => (
                <a
                  key={key}
                  href={SOCIAL_LINKS[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
              <span className="is-ltr rv-footer__handle">{SITE.handle}</span>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.head} className="rv-footer__col">
              <h4>{col.head}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="rv-footer__copy">
          © 2026 {SITE.name}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
