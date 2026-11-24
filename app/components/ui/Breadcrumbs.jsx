import Link from "next/link";
import { IcChevronLeft } from "./Icons";

/** مسار التنقل: [{ label, href? }] — العنصر الأخير بدون رابط. */
export default function Breadcrumbs({ items }) {
  const all = [{ label: "الرئيسية", href: "/" }, ...items];
  return (
    <nav className="rv-breadcrumbs" aria-label="مسار التنقل">
      <ol>
        {all.map((it, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${it.label}-${i}`}>
              {it.href && !last ? (
                <Link href={it.href}>{it.label}</Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>{it.label}</span>
              )}
              {!last && <IcChevronLeft size={12} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
