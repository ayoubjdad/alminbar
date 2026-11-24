"use client";

import { useState } from "react";
import { SITE } from "../../../lib/data/site";

/** الاشتراك في النشرة — واجهة فقط (لا يُرسل أي شيء حالياً). */
export default function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="rv-newsletter">
      <div className="rv-container">
        <span className="rv-newsletter__kicker">{SITE.name}</span>
        <h2 className="rv-newsletter__title">
          اشترك في
          <strong>نشرتنا الإخبارية</strong>
        </h2>
        {sent ? (
          <p className="rv-newsletter__done">شكراً! سنوافيك بآخر الأخبار قريباً.</p>
        ) : (
          <form
            className="rv-newsletter__form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input
              className="rv-newsletter__input"
              type="email"
              required
              placeholder="البريد الإلكتروني"
              aria-label="البريد الإلكتروني"
            />
            <button type="submit" className="rv-btn rv-btn--red rv-newsletter__btn">
              إرسال
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
