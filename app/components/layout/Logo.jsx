import Link from "next/link";
import { SITE } from "../../../lib/data/site";
import { BRAND_LOGO, BRAND_LOGO_WHITE } from "../../../lib/helpers/images";

/** شعار الموقع. `white` = النسخة البيضاء (فوق الصور فقط). */
export default function Logo({ small = false, white = false }) {
  return (
    <Link
      href="/"
      className={`rv-logo ${small ? "rv-logo--small" : ""}`}
      aria-label={`${SITE.name} — الرئيسية`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={white ? BRAND_LOGO_WHITE : BRAND_LOGO} alt={SITE.name} />
    </Link>
  );
}
