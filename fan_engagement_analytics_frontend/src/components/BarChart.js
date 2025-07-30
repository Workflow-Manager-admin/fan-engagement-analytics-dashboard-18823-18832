import React from "react";
import styles from "./BarChart.module.css";

// PUBLIC_INTERFACE
function BarChart({ data, max = null, color = "#4353ff", accentColor = "#ff7e5f", label, height = 170 }) {
  const computedMax = max !== null ? max : Math.max(...data.map(d => d.value));
  return (
    <div className={styles.chartWrapper} aria-label={label} tabIndex={0}>
      <div className={styles.chartArea} style={{ height }}>
        {data.map((d, idx) => (
          <div
            className={styles.barGroup}
            key={idx}
            title={d.label + ": " + d.value}
            tabIndex={0}
            aria-label={`${d.label}: ${d.value}`}
          >
            <div className={styles.barOuter}>
              <div
                className={styles.bar}
                style={{
                  width: `${Math.round((d.value / computedMax) * 100)}%`,
                  background: `linear-gradient(90deg, ${accentColor}33 0%, ${color} 90%)`,
                  filter: d.highlight
                    ? "drop-shadow(0 0 10px #ffad7585)"
                    : undefined
                }}
              />
            </div>
            <span className={styles.barLabel}>{d.label}</span>
            <span className={styles.barValue}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
