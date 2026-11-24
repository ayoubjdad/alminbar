import Link from "next/link";
import AuthorSocials from "../components/article/AuthorSocials";
import PageHeader from "../components/layout/PageHeader";
import { getArticlesByAuthor, getAuthors } from "../../lib/queries";

export const metadata = { title: "الكتّاب", description: "فريق تحرير المنبر الرياضي." };

export default function AuthorsPage() {
  return (
    <>
      <PageHeader title="الكتّاب" description="تعرّف على فريق تحرير المنبر الرياضي." />
      <div className="rv-container rv-page-body">
        <div className="rv-people">
          {getAuthors().map((a) => (
            <article key={a.slug} className="rv-person">
              <Link href={a.href} className="rv-writers__avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.avatar} alt="" />
              </Link>
              <h2>
                <Link href={a.href}>{a.name}</Link>
              </h2>
              <span className="rv-person__role">{a.role}</span>
              <p>{a.bio}</p>
              <span className="rv-person__count">{getArticlesByAuthor(a.slug).length} مقالاً</span>
              <AuthorSocials author={a} />
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
