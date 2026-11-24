import Link from "next/link";
import { getMostRead } from "../lib/queries";
import Card from "./components/ui/Card";

export const metadata = { title: "الصفحة غير موجودة" };

export default function NotFound() {
  return (
    <div className="rv-container rv-page-body">
      <div className="rv-404">
        <strong className="rv-404__code">404</strong>
        <h1 className="rv-title">
          الصفحة <span>غير موجودة</span>
        </h1>
        <p>ربما تم نقل هذه الصفحة أو حذفها. جرّب البحث أو العودة إلى الرئيسية.</p>
        <div className="rv-404__actions">
          <Link href="/" className="rv-btn rv-btn--red">
            العودة إلى الرئيسية
          </Link>
          <Link href="/search" className="rv-btn rv-btn--ghost">
            بحث
          </Link>
        </div>
      </div>
      <div className="rv-grid rv-grid--4">
        {getMostRead(4).map((a) => (
          <Card key={a.slug} item={a} showMeta={false} />
        ))}
      </div>
    </div>
  );
}
