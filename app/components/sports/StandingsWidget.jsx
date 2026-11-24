"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { STANDINGS } from "../../../lib/helpers/standings";
import { IcArrowLeft } from "../ui/Icons";
import StandingsTable from "./StandingsTable";

/** ترتيب البطولة + الدوريات الخمس الكبرى بتبويبات (للأعمدة الجانبية). */
export default function StandingsWidget({ title = "الترتيب", initial = "botola" }) {
  const [activeKey, setActiveKey] = useState(initial);
  const baseId = useId();
  const league = STANDINGS.find((l) => l.slug === activeKey) ?? STANDINGS[0];

  return (
    <div className="rv-standings">
      <div className="rv-standings__head">
        <h2 className="rv-underline">{title}</h2>
      </div>

      <div className="rv-standings__tabs" role="tablist" aria-label="الدوريات">
        {STANDINGS.map((l) => {
          const selected = l.slug === league.slug;
          return (
            <button
              key={l.slug}
              type="button"
              role="tab"
              id={`${baseId}-${l.slug}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              title={l.name}
              className={`rv-standings__tab ${selected ? "is-active" : ""}`}
              onClick={() => setActiveKey(l.slug)}
            >
              <span className="rv-standings__tab-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.logo} alt="" width={22} height={22} />
              </span>
              {l.shortName}
            </button>
          );
        })}
      </div>

      <div
        className="rv-standings__panel"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-${league.slug}`}
      >
        <Link href={league.href} className="rv-standings__league">
          {league.name}
          <IcArrowLeft size={12} />
        </Link>
        <StandingsTable competition={league} />
      </div>
    </div>
  );
}
