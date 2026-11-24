"use client";

import { useRef } from "react";
import { IcEye, IcPlay } from "../ui/Icons";

/** بطاقة ريل عمودية (9:16) — تشغّل الفيديو صامتاً عند التمرير إن وُجد. */
export default function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const play = () => videoRef.current?.play().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <a
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      className="rv-reel"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rv-reel__cover" src={reel.cover} alt="" loading="lazy" />
      {reel.video ? (
        <video
          ref={videoRef}
          className="rv-reel__cover"
          src={reel.video}
          muted
          loop
          playsInline
          preload="none"
        />
      ) : null}
      <span className="rv-reel__overlay" aria-hidden />
      <span className="rv-reel__duration">
        <IcPlay size={10} />
        {reel.duration}
      </span>
      <span className="rv-reel__play" aria-hidden>
        <IcPlay size={20} />
      </span>
      <span className="rv-reel__body">
        <span className="rv-tag">{reel.category}</span>
        <span className="rv-reel__title">{reel.title}</span>
        <span className="rv-reel__views">
          <IcEye size={12} /> {reel.views} مشاهدة
        </span>
      </span>
    </a>
  );
}
