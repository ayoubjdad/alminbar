"use client";

import { useState } from "react";

/** نموذج تواصل — واجهة فقط، لا يُرسل أي بيانات حالياً (اربطه بخدمتك لاحقاً). */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="rv-note">شكراً لتواصلك! سنعود إليك قريباً.</p>;
  return (
    <form
      className="rv-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label>
        الاسم
        <input type="text" name="name" required />
      </label>
      <label>
        البريد الإلكتروني
        <input type="email" name="email" required />
      </label>
      <label className="is-full">
        الموضوع
        <input type="text" name="subject" />
      </label>
      <label className="is-full">
        الرسالة
        <textarea name="message" rows={6} required />
      </label>
      <button type="submit" className="rv-btn rv-btn--red">
        إرسال
      </button>
    </form>
  );
}
