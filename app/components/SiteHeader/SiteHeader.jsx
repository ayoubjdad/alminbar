"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import styles from "./SiteHeader.module.scss";

const NAV = [
  { label: "الرئيسية", href: "/" },
  { label: "سياسة", href: "/article/israel-trump-plan-iran" },
  { label: "اقتصاد", href: "/article/oil-markets-volatility" },
  { label: "رياضة", href: "/article/lebanon-sports-preview" },
  { label: "أخبار لبنان", href: "/article/nato-hormuz-lebanon" },
  { label: "العالم العربي", href: "/article/arab-summit-day-two" },
  { label: "منوعات", href: "/article/variety-media-profiles" },
  { label: "تكنولوجيا", href: "/article/regional-security-summit" },
  { label: "صحة", href: "/article/lebanon-government-steps" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== "undefined" && window.innerWidth > 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((v) => !v)}
          >
            <i className={`fi fi-rr-menu-burger ${styles.menuIcon}`} />
          </button>
          <Link href="/" className={styles.logoLink} aria-label="الرئيسية">
            <Image
              src="https://www.almashhad.com/static/images/LogoBlue.svg"
              width={220}
              height={50}
              alt="المشهد"
              priority
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.liveBtn}>
            بث مباشر
          </button>
          <div className={styles.searchWrap}>
            <input
              type="search"
              className={styles.search}
              placeholder="ابحث في المشهد"
              aria-label="بحث"
            />
            <button type="button" className={styles.searchBtn}>
              ابحث
            </button>
          </div>
          <i className={`fi fi-rr-bell ${styles.bell}`} aria-hidden />
        </div>
      </div>

      <nav className={styles.nav} aria-label="التصنيفات">
        {NAV.map((item) => (
          <Link key={item.href + item.label} href={item.href} className={styles.navItem}>
            <span className={styles.navLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {open ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="إغلاق القائمة"
          onClick={close}
        />
      ) : null}

      <div
        id={panelId}
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal={open}
        aria-label="القائمة"
        aria-hidden={!open}
        inert={!open}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>القائمة</span>
          <button
            type="button"
            className={styles.drawerClose}
            aria-label="إغلاق"
            onClick={close}
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>
        <nav className={styles.drawerNav} aria-label="التصنيفات">
          {NAV.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={styles.drawerLink}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
