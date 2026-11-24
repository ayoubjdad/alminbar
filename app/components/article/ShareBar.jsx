"use client";

import { useState } from "react";
import { IcFacebook, IcLink, IcWhatsapp, IcX } from "../ui/Icons";

const TARGETS = [
  { key: "facebook", label: "فيسبوك", Icon: IcFacebook, url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { key: "x", label: "إكس", Icon: IcX, url: (u, t) => `https://x.com/intent/post?url=${u}&text=${t}` },
  { key: "whatsapp", label: "واتساب", Icon: IcWhatsapp, url: (u, t) => `https://wa.me/?text=${t}%20${u}` },
];

/** أزرار المشاركة — الرابط يُقرأ من المتصفح عند النقر. */
export default function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);

  const share = (target) => {
    const u = encodeURIComponent(window.location.href);
    const t = encodeURIComponent(title);
    window.open(target.url(u, t), "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard غير متاح */
    }
  };

  return (
    <div className="rv-share">
      <span className="rv-share__label">شارك:</span>
      {TARGETS.map((t) => (
        <button
          key={t.key}
          type="button"
          className={`rv-share__btn is-${t.key}`}
          aria-label={`مشاركة عبر ${t.label}`}
          onClick={() => share(t)}
        >
          <t.Icon size={15} />
        </button>
      ))}
      <button type="button" className="rv-share__btn" aria-label="نسخ الرابط" onClick={copy}>
        <IcLink size={15} />
      </button>
      {copied && <span className="rv-share__copied" role="status">تم نسخ الرابط</span>}
    </div>
  );
}
