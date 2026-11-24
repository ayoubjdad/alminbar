import Link from "next/link";
import AuthorSocials from "./AuthorSocials";

/** بطاقة الكاتب أسفل المقال. */
export default function AuthorBox({ author }) {
  return (
    <aside className="rv-author-box">
      <Link href={author.href} className="rv-author-box__avatar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={author.avatar} alt="" />
      </Link>
      <div className="rv-author-box__body">
        <small>كتب بواسطة</small>
        <Link href={author.href} className="rv-author-box__name">
          {author.name}
        </Link>
        <span className="rv-author-box__role">{author.role}</span>
        <p>{author.bio}</p>
        <AuthorSocials author={author} />
      </div>
    </aside>
  );
}
