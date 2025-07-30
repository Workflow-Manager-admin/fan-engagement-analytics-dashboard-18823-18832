import React from "react";
import styles from "./SkeletonLoader.module.css";

// PUBLIC_INTERFACE
function SkeletonLoader({ count = 3, height = 120, width = "100%", variant = "rect", style = {} }) {
  return (
    <div className={styles.loaderWrap}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${styles.skeleton} ${styles[variant]}`}
          style={{ height, width, ...style }}
          aria-busy="true"
          aria-label="Loading"
        />
      ))}
    </div>
  );
}

export default SkeletonLoader;
