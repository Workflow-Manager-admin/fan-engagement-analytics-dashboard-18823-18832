import React from "react";
import styles from "./HeatMap.module.css";

// PUBLIC_INTERFACE
function HeatMap({ data, rows = 5, cols = 7, min = 0, max = 100, color0 = "#c6e1ff", color1 = "#4353ff", label }) {
  // Flatten or pad data to match size
  const flat = [...data];
  while (flat.length < rows * cols) flat.push(0);

  function lerpColor(a, b, t) {
    // Linear interpolate from color a to color b
    const pa = parseInt(a.replace(/^#/, ""), 16);
    const pb = parseInt(b.replace(/^#/, ""), 16);
    const r = pa >> 16,
      g = (pa >> 8) & 0xff,
      b0 = pa & 0xff,
      r1 = pb >> 16,
      g1 = (pb >> 8) & 0xff,
      b1 = pb & 0xff;
    const nr = Math.round(r + (r1 - r) * t),
      ng = Math.round(g + (g1 - g) * t),
      nb = Math.round(b0 + (b1 - b0) * t);
    return (
      "#" +
      ((1 << 24) + (nr << 16) + (ng << 8) + nb)
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
  }

  return (
    <div
      className={styles.heatmapWrap}
      aria-label={label}
      tabIndex={0}
      role="presentation"
    >
      <div className={styles.heatmapGrid}>
        {flat.map((val, i) => {
          const t = (val - min) / (max - min);
          return (
            <div
              key={i}
              tabIndex={0}
              className={styles.cell}
              aria-label={`Cell ${i + 1}, value: ${val}`}
              style={{
                background: lerpColor(color0, color1, t),
                transition: "background 0.46s cubic-bezier(.6,.7,.5,1.2)",
                filter: val / max > 0.71 ? "drop-shadow(0 0 8px #ff7e5f66)" : undefined
              }}
              title={val}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HeatMap;
