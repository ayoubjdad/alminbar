"use client";

import Link from "next/link";
import { useState } from "react";
import { FLASH_NEWS } from "../../../lib/data/site";
import { IcBolt, IcChevronLeft, IcChevronRight } from "../ui/Icons";

/** شريط الأخبار العاجلة مع التنقل بين العناوين. */
export default function FlashBar() {
  const [i, setI] = useState(0);
  const n = FLASH_NEWS.length;
  const item = FLASH_NEWS[i];

  return (
    <div className="rv-flash">
      <div className="rv-container">
        <span className="rv-flash__badge">
          <IcBolt size={12} /> عاجل
        </span>
        <p className="rv-flash__text" aria-live="polite">
          <Link href={item.href}>{item.text}</Link>
        </p>
        <div className="rv-flash__arrows">
          <button
            type="button"
            className="rv-flash__arrow"
            aria-label="الخبر السابق"
            onClick={() => setI((i - 1 + n) % n)}
          >
            <IcChevronRight size={12} />
          </button>
          <button
            type="button"
            className="rv-flash__arrow"
            aria-label="الخبر التالي"
            onClick={() => setI((i + 1) % n)}
          >
            <IcChevronLeft size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
