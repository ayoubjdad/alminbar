"use client";

import { useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import { IcChevronLeft, IcChevronRight } from "../ui/Icons";
import MatchCard from "./MatchCard";

const FILTERS = [
  { value: "all", label: "الكل" },
  { value: "live", label: "مباشر" },
  { value: "upcoming", label: "القادمة" },
  { value: "finished", label: "انتهت" },
];

/** شريط مباريات اليوم: عنوان + فلتر + بطاقات المباريات المعتادة في صف قابل للتمرير. */
export default function TodayMatchesStrip({ matches }) {
  const [filter, setFilter] = useState("all");
  const trackRef = useRef(null);

  const list = filter === "all" ? matches : matches.filter((m) => m.status === filter);

  // في RTL: «التالي» = التمرير نحو اليسار (scrollLeft سالب).
  const scroll = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * -el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="rv-today-matches">
      <div className="rv-container">
        <div className="rv-today-matches__head">
          <SectionTitle title="مباريات" accent="اليوم" moreHref="/matches" moreLabel="عرض الكل" />
          <div className="rv-today-matches__tools">
            <div className="rv-pills" role="group" aria-label="تصفية المباريات">
              {FILTERS.map((f) => {
                const count =
                  f.value === "all" ? matches.length : matches.filter((m) => m.status === f.value).length;
                if (!count) return null;
                return (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={filter === f.value}
                    className={`rv-pill ${filter === f.value ? "is-active" : ""} ${
                      f.value === "live" ? "is-live" : ""
                    }`}
                    onClick={() => setFilter(f.value)}
                  >
                    {f.label} <small>{count}</small>
                  </button>
                );
              })}
            </div>
            <div className="rv-today-matches__arrows">
              <button type="button" aria-label="المباريات السابقة" onClick={() => scroll(-1)}>
                <IcChevronRight size={14} />
              </button>
              <button type="button" aria-label="المباريات التالية" onClick={() => scroll(1)}>
                <IcChevronLeft size={14} />
              </button>
            </div>
          </div>
        </div>

        <ul className="rv-today-matches__track" ref={trackRef}>
          {list.map((m) => (
            <li key={m.id}>
              <MatchCard match={m} showCompetition showChannel />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
