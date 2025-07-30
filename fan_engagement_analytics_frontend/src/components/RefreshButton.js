import React from "react";
import styles from "./RefreshButton.module.css";

// PUBLIC_INTERFACE
function RefreshButton({ onClick, loading = false, "aria-label": ariaLabel }) {
  return (
    <button
      className={styles.refreshBtn}
      onClick={onClick}
      disabled={loading}
      aria-label={ariaLabel || "Refresh"}
      tabIndex={0}
    >
      <svg
        width="32"
        height="32"
        className={loading ? styles.spin : undefined}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        focusable="false"
      >
        <path
          d="M5.82 22.18A12 12 0 1 0 8.71 7.05m0 0V3.5m0 3.55h-4"
          stroke="#4353ff"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {loading && <span className={styles.srOnly}>Loading...</span>}
    </button>
  );
}

export default RefreshButton;
