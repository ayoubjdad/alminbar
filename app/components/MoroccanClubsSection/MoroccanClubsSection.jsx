"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import styles from "./MoroccanClubsSection.module.scss";

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

  const clubs = data?.clubs ?? [];

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
                src={
                  c.logo ||
                  (c.id != null
                    ? `https://img.sofascore.com/api/v1/team/${c.id}/image`
                    : `https://ui-avatars.com/api/?background=0f172a&color=fff&size=96&name=${encodeURIComponent(c.nameAr ?? c.name ?? c.slug)}`)
                }
                alt=""
                width={48}
                height={48}
                className={styles.logo}
                unoptimized={!c.logo && c.id == null}
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
