import Link from "next/link";
import PageHeader from "../components/layout/PageHeader";
import { getClubStanding } from "../../lib/helpers/standings";
import { getClubs } from "../../lib/queries";

export const metadata = {
  title: "أندية البطولة الاحترافية",
  description: "جميع أندية البطولة الاحترافية: الأخبار، الترتيب والمباريات.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        title="أندية"
        accent="البطولة الاحترافية"
        description="16 نادياً يتنافسون على لقب البطولة الاحترافية."
        breadcrumbs={[{ label: "الأندية" }]}
      />
      <div className="rv-container rv-page-body">
        <ul className="rv-club-grid">
          {getClubs().map((club) => {
            const s = getClubStanding(club.slug);
            return (
              <li key={club.slug}>
                <Link
                  href={club.href}
                  className="rv-club-card"
                  style={{ "--club-a": club.colors[0] }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={club.logo} alt="" loading="lazy" />
                  <strong>{club.nameAr}</strong>
                  <span>{club.city}</span>
                  {s && (
                    <small>
                      المركز {s.rank} · {s.pts} نقطة
                    </small>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
