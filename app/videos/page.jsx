import Link from "next/link";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import { IcPlay } from "../components/ui/Icons";
import Meta from "../components/ui/Meta";
import { getVideos } from "../../lib/queries";

export const metadata = { title: "فيديو", description: "ملخصات، تصريحات وأهداف بالفيديو." };

export default function VideosPage() {
  const [main, ...rest] = getVideos();
  return (
    <>
      <PageHeader
        title="معرض"
        accent="الفيديو"
        description="ملخصات المباريات، التصريحات وأجمل الأهداف."
        breadcrumbs={[{ label: "فيديو" }]}
      />
      <div className="rv-container rv-page-body">
        {main && (
          <article className="rv-lead rv-lead--video">
            <Link href={main.href} className="rv-lead__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={main.image} alt="" />
              <span className="rv-video__play">
                <IcPlay size={20} />
              </span>
            </Link>
            <div className="rv-lead__body">
              <span className="rv-tag">فيديو · {main.duration}</span>
              <h2>
                <Link href={main.href}>{main.title}</Link>
              </h2>
              <p>{main.excerpt}</p>
              <Meta author={main.author} date={main.date} />
            </div>
          </article>
        )}
        <div className="rv-grid rv-grid--3">
          {rest.map((v) => (
            <Card key={v.slug} item={v} showExcerpt />
          ))}
        </div>
      </div>
    </>
  );
}
