"use client";

import Image from "next/image";
import Link from "next/link";
import { useStaticData } from "../../../lib/staticData";
import styles from "./MoroccanClubsSection.module.scss";

export default function MoroccanClubsSection() {
  const { clubs } = useStaticData();

  return (
    <section
      className={styles.root}
      id="moroccan-clubs"
      aria-labelledby="moroccan-clubs-heading"
    >
      <div className={styles.track} role="list">
        {clubs.map((c) => (
          <Link
            key={c.slug}
            href={`/club/${c.slug}`}
            className={styles.chip}
            role="listitem"
          >
            <span className={styles.logoWrap}>
              <Image
                // src={c.logo}
                src={`https://img.sofascore.com/api/v1/team/${c.id}/image`}
                alt=""
                width={48}
                height={48}
                className={styles.logo}
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
