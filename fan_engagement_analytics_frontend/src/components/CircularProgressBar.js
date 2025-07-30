import React from "react";
import styles from "./CircularProgressBar.module.css";

// PUBLIC_INTERFACE
function CircularProgressBar({
  value,
  max = 100,
  size = 104,
  stroke = 14,
  color = "#4353ff",
  label,
  accentColor = "#ff7e5f",
  sublabel = "",
  animate = true,
  id
}) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const percent = Math.max(0, Math.min(1, value / max));
  const offset = circ * (1 - percent);

  return (
    <div
      className={styles.wrapper}
      tabIndex={0}
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-describedby={id && `${id}-desc`}
      role="progressbar"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={animate ? styles.circleSvg + " " + styles.animated : styles.circleSvg}
      >
        <circle
          className={styles.trail}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color + "22"}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className={styles.progress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: animate
              ? "stroke-dashoffset 1s cubic-bezier(.6,.7,.22,1.2)"
              : "none"
          }}
        />
      </svg>
      <div className={styles.label}>
        <span className={styles.value}>{Math.round((value / max) * 100)}%</span>
        <span className={styles.sublabel}>{label}</span>
        {sublabel && (
          <span id={id && `${id}-desc`} className={styles.desc}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default CircularProgressBar;
