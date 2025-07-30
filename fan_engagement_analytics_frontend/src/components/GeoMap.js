import React from "react";
import styles from "./GeoMap.module.css";

// PUBLIC_INTERFACE
// This is a stylized placeholder - for real use, integrate a library like react-simple-maps.
function GeoMap({ regions, label }) {
  // regions: array of {name, value, highlight}
  return (
    <div className={styles.mapWrap} tabIndex={0} aria-label={label || "Fan Regions"}>
      <svg height="130" width="230" viewBox="0 0 230 130" className={styles.svg}>
        {/* Abstract stylized map "regions" */}
        <circle
          cx={57}
          cy={60}
          r={36}
          fill="#4353ff"
          opacity={0.36}
          stroke="#4353ff"
        />
        <circle
          cx={165}
          cy={40}
          r={32}
          fill="#13cf87"
          opacity={0.30}
          stroke="#13cf87"
        />
        <ellipse
          cx={135}
          cy={100}
          rx={38}
          ry={18}
          fill="#ff7e5f"
          opacity={0.22}
          stroke="#ff7e5f"
        />
        {regions.map((r, i) => (
          <g key={r.name}>
            <circle
              className={styles.region}
              cx={50 + i * 40}
              cy={50 + (i % 2) * 40}
              r={15 + r.value / 6}
              fill={r.highlight ? "#ff7e5f" : "#4353ff"}
              opacity={r.highlight ? 0.85 : 0.44}
              aria-label={r.name}
              tabIndex={0}
              stroke={r.highlight ? "#fff" : "#13cf87"}
              strokeWidth={r.highlight ? 3 : 1.1}
              style={{
                transition: "filter 0.27s, fill 0.19s",
                filter: r.highlight ? "drop-shadow(0 1px 10px #ff7e5f88)" : undefined
              }}
            />
            <text
              x={50 + i * 40}
              y={47 + (i % 2) * 40}
              fontSize="12"
              textAnchor="middle"
              fill="#222"
              fontWeight="bold"
            >
              {r.name}
            </text>
          </g>
        ))}
      </svg>
      <div className={styles.legend} aria-label="Regions Legend">
        {regions.map((r, i) => (
          <span
            key={r.name}
            className={styles.legendItem}
            style={{
              color: r.highlight ? "#ff7e5f" : "#4353ff",
              fontWeight: r.highlight ? 700 : 400
            }}
          >
            {r.name}: {r.value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GeoMap;
