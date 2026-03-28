import Image from "next/image";
import Link from "next/link";
import { MOROCCAN_CLUBS } from "../../../lib/moroccanClubs";
import styles from "./MoroccanClubsSection.module.scss";

export default function MoroccanClubsSection() {
  return (
    <section
      className={styles.root}
      id="moroccan-clubs"
      aria-labelledby="moroccan-clubs-heading"
    >
      <div className={styles.track} role="list">
        {MOROCCAN_CLUBS.map((c, i) => (
          <Link
            // key={c.slug}
            key={i}
            href={`/club/${c.slug}`}
            className={styles.chip}
            role="listitem"
          >
            <span className={styles.logoWrap}>
              <Image
                // src={c.logo}
                src="https://img.sofascore.com/api/v1/team/41757/image"
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
