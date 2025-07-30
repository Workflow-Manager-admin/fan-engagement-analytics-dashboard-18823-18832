import React from "react";
import styles from "./WordCloud.module.css";

// PUBLIC_INTERFACE
function WordCloud({ words, maxSize = 2.6, minSize = 1, accent, primary, secondary }) {
  // Compute relative font sizes, animate shuffle
  const maxCount = Math.max(...words.map(w => w.value));
  const sorted = [...words].sort((a, b) => b.value - a.value);

  const palettes = [accent || "#ff7e5f", primary || "#4353ff", secondary || "#13cf87"];

  return (
    <section className={styles.cloudWrap} tabIndex={0} aria-label="Top Words Word Cloud">
      <div className={styles.cloudInner}>
        {sorted.map((w, i) => (
          <span
            key={w.text}
            className={styles.cloudWord}
            style={{
              fontSize: `${minSize + (w.value / maxCount) * (maxSize - minSize)}em`,
              color: palettes[i % palettes.length],
              animationDelay: `${i * 0.08}s`
            }}
            tabIndex={0}
            aria-label={`${w.text}, count ${w.value}`}
            title={`${w.text} (${w.value})`}
          >
            {w.text}
          </span>
        ))}
      </div>
    </section>
  );
}

export default WordCloud;
