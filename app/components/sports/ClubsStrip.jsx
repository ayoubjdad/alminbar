import Link from "next/link";
import { getClubs } from "../../../lib/queries";

/** شريط شعارات جميع أندية البطولة الاحترافية. */
export default function ClubsStrip() {
  return (
    <section className="rv-logos" aria-label="أندية البطولة الاحترافية">
      <div className="rv-container">
        <ul className="rv-logos__track">
          {getClubs().map((club) => (
            <li key={club.slug}>
              <Link
                href={club.href}
                className="rv-logos__item"
                title={club.nameAr}
                aria-label={club.nameAr}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={club.logo} alt="" width={40} height={40} loading="lazy" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
