import Link from "next/link";
import { getArticle } from "../../../lib/queries";
import Card from "../ui/Card";
import Meta from "../ui/Meta";
import SectionTitle from "../ui/SectionTitle";

const PICK = {
  main: "zayat-team-building",
  left: ["berkane-continental-ambition", "mas-youth-project"],
  right: ["ucl-debut-badge", "wydad-seeks-balance"],
};

/** «اختيار المحرّر». */
export default function EditorPick() {
  const main = getArticle(PICK.main);
  const left = PICK.left.map(getArticle);
  const right = PICK.right.map(getArticle);

  return (
    <section className="rv-editor">
      <div className="rv-container">
        <SectionTitle title="اختيار" accent="المحرّر" center />
        <div className="rv-editor__grid">
          <div className="rv-editor__col">
            {left.map((c) => (
              <Card key={c.slug} item={c} />
            ))}
          </div>

          <article className="rv-editor__main rv-card">
            <Link href={main.href} className="rv-card__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={main.image} alt="" />
            </Link>
            <Meta author={main.author} date={main.date} />
            <h3>
              <Link href={main.href}>{main.title}</Link>
            </h3>
            <p>
              {main.excerpt}{" "}
              <Link href={main.href} className="rv-readmore">
                اقرأ المزيد
              </Link>
            </p>
          </article>

          <div className="rv-editor__col">
            {right.map((c) => (
              <Card key={c.slug} item={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
