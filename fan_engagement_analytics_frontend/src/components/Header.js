import React from "react";
import styles from "./Header.module.css";

// PUBLIC_INTERFACE
function Header({ filters, onFilterChange, loading }) {
  return (
    <header
      className={styles.stickyHeader}
      role="banner"
      aria-label="Fan Engagement Dashboard Header"
      tabIndex={0}
    >
      <div className={styles.logo} aria-label="Fanlytics Home">
        <svg viewBox="0 0 42 42" width="42" height="42" className={styles.logoIcon}>
          <defs>
            <radialGradient id="accent" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#ff7e5f" />
              <stop offset="100%" stopColor="#4353ff" />
            </radialGradient>
          </defs>
          <circle cx="21" cy="21" r="21" fill="url(#accent)" />
          <path
            d="M14 28 L21 13 L28 28 Z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 2px 8px #4353ff69)" }}
          />
        </svg>
        <span className={styles.title}>Fanlytics</span>
      </div>
      <section className={styles.filters} aria-label="Dashboard Filters">
        {filters.map((f, idx) => (
          <div key={f.key} className={styles.filterDrop}>
            <label htmlFor={f.key} className={styles.filterLabel}>
              {f.label}
            </label>
            <select
              id={f.key}
              name={f.key}
              value={f.value}
              onChange={e => onFilterChange(f.key, e.target.value)}
              className={styles.filterSelect}
              aria-label={f.label}
              tabIndex={0}
              disabled={loading}
            >
              {f.options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
        {loading && <span className={styles.loadingSpinner} aria-label="Loading data" />}
      </section>
    </header>
  );
}

export default Header;
