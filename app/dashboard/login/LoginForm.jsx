"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "فشل تسجيل الدخول.");
        return;
      }
      const from = searchParams.get("from");
      router.push(from && from.startsWith("/dashboard") ? from : "/dashboard");
      router.refresh();
    } catch {
      setError("تعذّر الاتصال بالخادم.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>لوحة التحرير</h1>
        <p className={styles.lead}>أدخل كلمة المرور للمتابعة.</p>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label}>
            <span className={styles.labelText}>كلمة المرور</span>
            <input
              className={styles.input}
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
              required
            />
          </label>
          {error ? (
            <p className={styles.err} role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className={styles.submit}
            disabled={pending}
          >
            {pending ? "جاري الدخول…" : "دخول"}
          </button>
        </form>
        <p className={styles.footer}>
          <Link href="/" className={styles.home}>
            ← العودة للموقع
          </Link>
        </p>
      </div>
    </div>
  );
}
