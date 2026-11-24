import Link from "next/link";
import { getVideos } from "../../../lib/queries";
import Card from "../ui/Card";
import { IcArrowLeft, IcPlay } from "../ui/Icons";

/** «معرض الفيديو»: فيديو رئيسي + فيديوهان جانبيان. */
export default function VideoGallery() {
  const [main, ...rest] = getVideos(3);
  return (
    <section className="rv-video">
      <div className="rv-container">
        <h2 className="rv-video__title">
          <span>
            <i className="rv-video__q rv-video__q--start">“</i>
            معرض الفيديو
            <i className="rv-video__q rv-video__q--end">”</i>
          </span>
        </h2>

        <div className="rv-video__grid">
          <Link href={main.href} className="rv-video__player">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={main.image} alt="" />
            <span className="rv-video__play">
              <IcPlay size={20} />
            </span>
          </Link>
          <div className="rv-video__side">
            {rest.map((c) => (
              <Card key={c.slug} item={c} showMeta={false} className="rv-card--dark" />
            ))}
          </div>
        </div>

        <div className="rv-video__bottom">
          <div className="rv-video__info">
            <h3>
              <Link href={main.href}>{main.title}</Link>
            </h3>
            <p>{main.excerpt}</p>
          </div>
          <Link href="/videos" className="rv-video__more">
            <span className="rv-video__circle">
              <IcArrowLeft size={20} />
            </span>
            المزيد من الفيديو
          </Link>
        </div>
      </div>
    </section>
  );
}
