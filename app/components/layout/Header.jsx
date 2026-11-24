"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { MAIN_NAV, SOCIAL_LINKS } from "../../../lib/data/site";
import { IcClose, IcMenu, IcSearch, IcUser } from "../ui/Icons";
import Logo from "./Logo";

/** رأس الموقع: الشعار، القائمة، البحث، وقائمة جانبية على الجوال. */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const drawerId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className="rv-header">
      <div className="rv-container">
        <Logo />
        <button
          type="button"
          className="rv-header__menu"
          aria-label="فتح القائمة"
          aria-expanded={menuOpen}
          aria-controls={drawerId}
          onClick={() => setMenuOpen(true)}
        >
          <IcMenu size={22} />
        </button>
        <nav className="rv-header__nav" aria-label="القائمة الرئيسية">
          {MAIN_NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="rv-header__actions">
          <button
            type="button"
            className="rv-header__icon"
            aria-label="بحث"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <IcSearch size={18} />
          </button>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rv-btn rv-btn--red rv-header__login"
          >
            <IcUser size={15} /> تابعنا
          </a>
        </div>
      </div>

      {searchOpen && (
        <form action="/search" className="rv-header__search" role="search">
          <div className="rv-container">
            <input
              type="search"
              name="q"
              placeholder="ابحث عن خبر، نادٍ أو لاعب…"
              aria-label="بحث"
              autoFocus
            />
            <button type="submit" className="rv-btn rv-btn--red">
              ابحث
            </button>
          </div>
        </form>
      )}

      {/* قائمة الجوال */}
      <div
        className={`rv-drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          className="rv-drawer__backdrop"
          aria-label="إغلاق القائمة"
          onClick={close}
          tabIndex={-1}
        />
        <div
          id={drawerId}
          className="rv-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="القائمة"
        >
          <div className="rv-drawer__head">
            <Logo small />
            <button type="button" aria-label="إغلاق" onClick={close}>
              <IcClose size={22} />
            </button>
          </div>
          <form action="/search" className="rv-drawer__search" role="search">
            <input type="search" name="q" placeholder="ابحث…" aria-label="بحث" />
          </form>
          <nav className="rv-drawer__nav" aria-label="القائمة الرئيسية">
            {MAIN_NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={close}>
                {n.label}
              </Link>
            ))}
            <Link href="/clubs" onClick={close}>
              الأندية
            </Link>
            <Link href="/authors" onClick={close}>
              الكتّاب
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
