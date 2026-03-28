"use client";

import Link from "next/link";
import { useStaticData } from "../../../lib/staticData";
import styles from "./CategoriesStrip.module.scss";

export default function CategoriesStrip() {
  const { categories } = useStaticData();

  return (
    <nav className={styles.root} aria-label="أقسام الموقع">
      <div className={styles.inner}>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={styles.pill}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
