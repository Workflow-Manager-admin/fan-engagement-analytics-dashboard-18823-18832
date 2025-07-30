import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import AnimatedSection from "./helpers/AnimatedSection";
import "./helpers/AnimatedSection.css";
import CircularProgressBar from "./components/CircularProgressBar";
import BarChart from "./components/BarChart";
import DonutChart from "./components/DonutChart";
import HeatMap from "./components/HeatMap";
import WordCloud from "./components/WordCloud";
import GeoMap from "./components/GeoMap";
import SkeletonLoader from "./components/SkeletonLoader";
import RefreshButton from "./components/RefreshButton";
import MetricCard from "./components/MetricCard";
import {
  FireIcon,
  UsersIcon,
  ChartIcon,
  VoteIcon,
  MsgIcon,
  EyeIcon
} from "./assets/Icons";

const PALETTE = {
  accent: "#ff7e5f",
  primary: "#4353ff",
  secondary: "#13cf87"
};

const FILTERS_INITIAL = [
  {
    key: "period",
    label: "Period",
    value: "Last 7 Days",
    options: ["Last 7 Days", "Last 28 Days", "This Year"]
  },
  {
    key: "region",
    label: "Region",
    value: "Global",
    options: ["Global", "US", "Europe", "Asia", "Other"]
  },
  {
    key: "channel",
    label: "Channel",
    value: "All",
    options: ["All", "Twitter", "YouTube", "Instagram", "Web"]
  }
];

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [filters, setFilters] = useState(FILTERS_INITIAL);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // For simulating section collapse (on small screens)
  const [collapse, setCollapse] = useState({
    metrics: false,
    word: false,
    charts: false
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setLoading(true);
    // Simulate async fetch, real code fetches from backend here. Data example:
    setTimeout(() => {
      setData({
        metrics: [
          {
            value: 54_200,
            label: "Active Fans",
            color: PALETTE.primary,
            accent: PALETTE.accent,
            icon: <UsersIcon />
          },
          {
            value: 2_137,
            label: "Audience Messages",
            color: PALETTE.accent,
            accent: PALETTE.primary,
            icon: <MsgIcon />
          },
          {
            value: "1.24M",
            label: "Total Votes",
            color: PALETTE.secondary,
            accent: PALETTE.accent,
            icon: <VoteIcon />
          },
          {
            value: "97%",
            label: "Engagement",
            color: PALETTE.primary,
            accent: PALETTE.secondary,
            icon: <FireIcon />
          }
        ],
        pollChart: [
          { value: 10, label: "Poll #1" },
          { value: 25, label: "Poll #2", highlight: true },
          { value: 7, label: "Poll #3" },
          { value: 18, label: "Poll #4" }
        ],
        votesDonut: [
          { value: 42, label: "Option A" },
          { value: 28, label: "Option B" },
          { value: 14, label: "Option C" },
          { value: 18, label: "Option D" }
        ],
        engagementHeat: [
          67, 76, 58, 32, 21, 10, 18,
          15, 7, 25, 47, 89, 91, 38,
          96, 49, 29, 78, 84, 23, 53,
          40, 42, 46, 93, 81, 65, 20,
          25, 35, 88, 51, 75
        ],
        wordCloud: [
          { text: "music", value: 51 },
          { text: "vote", value: 37 },
          { text: "fun", value: 31 },
          { text: "awesome", value: 29 },
          { text: "live", value: 25 },
          { text: "hype", value: 19 },
          { text: "energy", value: 15 },
          { text: "trending", value: 12 },
          { text: "fans", value: 9 }
        ],
        geoMap: [
          { name: "US", value: 58, highlight: true },
          { name: "EU", value: 40 },
          { name: "AS", value: 22 }
        ]
      });
      setLoading(false);
    }, 1800);
  }, [filters]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const updateFilter = (key, value) => {
    setFilters(fs =>
      fs.map(f => (f.key === key ? { ...f, value } : f))
    );
  };

  // PUBLIC_INTERFACE
  const handleRefresh = () => {
    setLoading(true);
    // Simulate network fetch again
    setTimeout(() => setLoading(false), 1600);
  };

  // Responsive collapsible
  const toggleCollapse = s =>
    setCollapse(prev => ({
      ...prev,
      [s]: !prev[s]
    }));

  return (
    <div className="App" tabIndex={0} aria-label="Fan Engagement Analytics Dashboard">
      <Header
        filters={filters}
        onFilterChange={updateFilter}
        loading={loading}
      />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        tabIndex={0}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <main className="dashboard-main" aria-label="Main Dashboard Content" tabIndex={0}>
        <AnimatedSection open>
          {/* Headline metrics, show skeletons if loading */}
          <section
            className="dashboard-panel headline-metrics"
            aria-label="Headline Fan Metrics"
          >
            <div className="dashboard-panel-header">
              <span>Key Metrics</span>
              <RefreshButton
                onClick={handleRefresh}
                loading={loading}
                aria-label="Refresh Metrics"
              />
              <button
                className="collapse-btn"
                aria-label={
                  collapse.metrics
                    ? "Expand key metrics"
                    : "Collapse key metrics"
                }
                onClick={() => toggleCollapse("metrics")}
                tabIndex={0}
              >
                {collapse.metrics ? "▼" : "▲"}
              </button>
            </div>
            {!collapse.metrics && (
              <div className="metrics-row" role="region" aria-live="polite">
                {loading
                  ? <SkeletonLoader count={4} height={112} variant="rect" />
                  : data.metrics &&
                    data.metrics.map((m, i) => (
                      <MetricCard key={m.label} {...m} loading={loading} />
                    ))}
              </div>
            )}
          </section>
        </AnimatedSection>

        <AnimatedSection open>
          {/* Engagement Heatmap, Word Cloud, Voting Donut */}
          <section className="dashboard-panel analytics-panels" aria-label="Analytics Charts">
            <div className="dashboard-panel-header">
              <span>Analytics</span>
              <button
                className="collapse-btn"
                aria-label={
                  collapse.charts
                    ? "Expand analytics charts"
                    : "Collapse analytics charts"
                }
                onClick={() => toggleCollapse("charts")}
                tabIndex={0}
              >
                {collapse.charts ? "▼" : "▲"}
              </button>
            </div>
            {!collapse.charts && (
              <div className="analytics-panels-row">
                <div className="analytics-panel">
                  <div className="analytics-subtitle">Heatmap</div>
                  {loading
                    ? <SkeletonLoader count={1} height={120} />
                    : <HeatMap
                        data={data.engagementHeat || []}
                        label="Live Engagement Heatmap"
                        rows={5}
                        cols={7}
                      />}
                </div>
                <div className="analytics-panel">
                  <div className="analytics-subtitle">Voting Donut</div>
                  {loading
                    ? <SkeletonLoader count={1} height={166} />
                    : <DonutChart
                        data={data.votesDonut || []}
                        label="Vote Breakdown"
                        colors={[
                          PALETTE.primary,
                          PALETTE.accent,
                          PALETTE.secondary,
                          "#7b77db"
                        ]}
                      />}
                </div>
                <div className="analytics-panel">
                  <div className="analytics-subtitle">Word Cloud</div>
                  {loading
                    ? <SkeletonLoader count={1} height={90} />
                    : <WordCloud
                        words={data.wordCloud || []}
                        accent={PALETTE.accent}
                        primary={PALETTE.primary}
                        secondary={PALETTE.secondary}
                      />}
                </div>
              </div>
            )}
          </section>
        </AnimatedSection>

        <AnimatedSection open>
          {/* Bar chart, Geo Map, Circular Progress */}
          <section className="dashboard-panel advanced-stats" aria-label="Advanced Voting Stats">
            <div className="dashboard-panel-header">
              <span>Voting Stats, Regions & Polls</span>
              <button
                className="collapse-btn"
                aria-label={
                  collapse.word
                    ? "Expand advanced stats"
                    : "Collapse advanced stats"
                }
                onClick={() => toggleCollapse("word")}
                tabIndex={0}
              >
                {collapse.word ? "▼" : "▲"}
              </button>
            </div>
            {!collapse.word && (
              <div className="advanced-stats-row">
                <div className="stat-visual">
                  <div className="analytics-subtitle">
                    Polls Bar Chart
                  </div>
                  {loading
                    ? <SkeletonLoader count={1} height={120} />
                    : <BarChart
                        data={data.pollChart || []}
                        color={PALETTE.primary}
                        accentColor={PALETTE.accent}
                        label="Poll Participation"
                      />}
                </div>
                <div className="stat-visual">
                  <div className="analytics-subtitle">
                    Circular Progress
                  </div>
                  {loading
                    ? <SkeletonLoader count={1} height={120} />
                    : <CircularProgressBar
                        value={82}
                        max={100}
                        color={PALETTE.secondary}
                        accentColor={PALETTE.accent}
                        label="Goal Completion"
                        sublabel="82% of voting target"
                        animate
                      />}
                </div>
                <div className="stat-visual">
                  <div className="analytics-subtitle">
                    Audience by Region
                  </div>
                  {loading
                    ? <SkeletonLoader count={1} height={130} />
                    : <GeoMap
                        regions={data.geoMap || []}
                        label="Audience by Region"
                      />}
                </div>
              </div>
            )}
          </section>
        </AnimatedSection>

        <AnimatedSection open>
          <footer className="dashboard-footer">
            <span>
              &copy; {new Date().getFullYear()} Fanlytics &mdash; Built with <span aria-label="love">❤️</span>
            </span>
          </footer>
        </AnimatedSection>
      </main>
    </div>
  );
}

export default App;
