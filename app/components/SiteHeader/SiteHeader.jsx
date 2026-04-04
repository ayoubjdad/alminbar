"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { useTheme } from "../../ThemeProvider";
import { useStaticData } from "../../../lib/staticData";
import { THEME_DARK } from "../../../lib/theme/constants";
import styles from "./SiteHeader.module.scss";
import logo from "../../assets/logos/logo.png";

export default function SiteHeader() {
  const { categories, site } = useStaticData();
  const { theme, toggleTheme } = useTheme();
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
          <Link
            href="/"
            className={styles.logoLink}
            aria-label={`الرئيسية — ${site.name}`}
          >
            <Image
              src={logo}
              alt={site.name}
              priority
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-pressed={theme !== THEME_DARK}
            aria-label={
              theme === THEME_DARK
                ? "تفعيل الوضع الفاتح"
                : "تفعيل الوضع الداكن"
            }
            title={
              theme === THEME_DARK
                ? "الوضع الفاتح"
                : "الوضع الداكن"
            }
          >
            <i
              className={`fi ${theme === THEME_DARK ? "fi-rr-brightness" : "fi-rr-moon"} ${styles.themeToggleIcon}`}
              aria-hidden
            />
          </button>
          <div className={styles.searchWrap}>
            <input
              type="search"
              className={styles.search}
              placeholder={`ابحث في ${site.name}`}
              aria-label="بحث"
            />
            <button type="button" className={styles.searchBtn}>
              ابحث
            </button>
          </div>
          {/* <i className={`fi fi-rr-bell ${styles.bell}`} aria-hidden /> */}
        </div>
      </div>

      <nav className={styles.nav} aria-label="التصنيفات">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={styles.navItem}
          >
            <span className={styles.navLabel}>{c.label}</span>
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
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={styles.drawerLink}
              onClick={close}
            >
              {c.label}
            </Link>
          ))}
          <button
            type="button"
            className={styles.drawerThemeBtn}
            onClick={() => {
              toggleTheme();
              close();
            }}
          >
            <i
              className={`fi ${theme === THEME_DARK ? "fi-rr-brightness" : "fi-rr-moon"} ${styles.drawerThemeIcon}`}
              aria-hidden
            />
            {theme === THEME_DARK ? "الوضع الفاتح" : "الوضع الداكن"}
          </button>
        </nav>
      </div>
    </div>
  );
}
