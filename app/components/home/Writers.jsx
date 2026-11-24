import Link from "next/link";
import { getAuthors } from "../../../lib/queries";
import Logo from "../layout/Logo";
import AuthorSocials from "../article/AuthorSocials";

/** الكتّاب. */
export default function Writers() {
  return (
    <section className="rv-writers">
      <div className="rv-container">
        <div className="rv-writers__head">
          <h2 className="rv-underline">
            <Link href="/authors">الكتّاب</Link>
          </h2>
          <Logo small />
        </div>
        <div className="rv-writers__grid">
          {getAuthors().map((w) => (
            <div key={w.slug} className="rv-writers__item">
              <Link href={w.href} className="rv-writers__avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.avatar} alt={w.name} />
              </Link>
              <h3 className="rv-writers__name">
                <Link href={w.href}>{w.name}</Link>
              </h3>
              <AuthorSocials author={w} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
