"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MOROCCAN_BOTOLA_SLUGS } from "../../../lib/moroccanBotolaSlugs";
import styles from "./MoroccanClubsSection.module.scss";
import { useMemo } from "react";

async function fetchMeta() {
  const res = await fetch("/api/cms/meta", { cache: "no-store" });
  if (!res.ok) throw new Error("meta");
  return res.json();
}

export default function MoroccanClubsSection() {
  const { data, isPending } = useQuery({
    queryKey: ["cms-meta", "clubs-strip"],
    queryFn: fetchMeta,
  });

  const clubs = useMemo(() => {
    const filtered = (data?.clubs ?? []).filter((c) =>
      MOROCCAN_BOTOLA_SLUGS.has(c.slug)
    );

    return filtered.sort((a, b) => a.slug.localeCompare(b.slug, "ar"));
  }, [data?.clubs]);

  if (isPending) {
    return (
      <section
        className={styles.root}
        id="moroccan-clubs"
        aria-busy="true"
        aria-label="أندية مغربية"
      >
        <div className={styles.track} />
      </section>
    );
  }

  if (!clubs.length) {
    return null;
  }

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
            title={c.nameAr ?? c.name}
          >
            <span className={styles.logoWrap}>
              <Image
                src={`https://img.sofascore.com/api/v1/team/${c.id}/image`}
                alt=""
                width={48}
                height={48}
                className={styles.logo}
                unoptimized
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
