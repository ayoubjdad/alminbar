import Link from "next/link";
import { CATEGORIES } from "../../../lib/categories";
import styles from "./CategoriesStrip.module.scss";

export default function CategoriesStrip() {
  return (
    <nav className={styles.root} aria-label="أقسام الموقع">
      <div className={styles.inner}>
        {CATEGORIES.map((c) => (
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
