import React from "react";
import styles from "./DonutChart.module.css";

// PUBLIC_INTERFACE
function DonutChart({ data, size = 166, width = 22, label, colors }) {
  // Colors: use palette, fallback gradient for extras
  const palette = colors || [
    "#4353ff", "#13cf87", "#ff7e5f", "#ffd232", "#7b77db", "#f48024"
  ];
  const total = data.reduce((a, b) => a + b.value, 0);
  let offset = 0;
  return (
    <div className={styles.donutWrap} aria-label={label} tabIndex={0}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.donutSvg}
      >
        {data.map((seg, idx) => {
          const r = (size - width) / 2;
          const circ = 2 * Math.PI * r;
          const length = circ * (seg.value / total);
          const dasharray = `${length} ${circ - length}`;
          const dashoffset = offset;
          offset -= length;
          return (
            <circle
              key={seg.label}
              className={styles.segment}
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={palette[idx % palette.length]}
              strokeWidth={width}
              fill="none"
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
              tabIndex={0}
              aria-label={`${seg.label}: ${seg.value}`}
              style={{
                transition: "stroke-dasharray 1s cubic-bezier(.3,.72,.17,.98)",
                filter: idx === 0 ? "drop-shadow(0px 0px 8px #ff7e5f88)" : undefined
              }}
            />
          );
        })}
      </svg>
      <div className={styles.innerLabel}>
        <span className={styles.title}>{label}</span>
      </div>
      <ul className={styles.legend}>
        {data.map((seg, idx) => (
          <li key={seg.label} className={styles.legendItem}>
            <span
              className={styles.legendSwatch}
              style={{ background: palette[idx % palette.length] }}
              aria-hidden
            />
            {seg.label} <span className={styles.legendNum}>{seg.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DonutChart;
