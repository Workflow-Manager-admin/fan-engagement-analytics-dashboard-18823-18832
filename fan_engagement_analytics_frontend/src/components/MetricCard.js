import React from "react";
import styles from "./MetricCard.module.css";

// PUBLIC_INTERFACE
function MetricCard({ icon, value, label, color = "#4353ff", accent = "#ff7e5f", loading = false, children }) {
  return (
    <div
      className={styles.card}
      tabIndex={0}
      aria-label={`${label}: ${value}`}
      style={{ "--card-color": color, "--card-accent": accent }}
    >
      <div className={styles.iconWrap}>{icon}</div>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
      {loading && <span className={styles.loadingBar} aria-label="loading" />}
      {children}
    </div>
  );
}

export default MetricCard;
