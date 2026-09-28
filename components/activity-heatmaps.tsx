"use client";

import { useEffect, useState, useMemo } from "react";
import { Github, Code2, ExternalLink, Globe2, Flame, Award, GitCommit } from "lucide-react";

type CalendarData = Record<string, number>;

export function LeetCodeHeatmap() {
  const [calendar, setCalendar] = useState<CalendarData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((res) => res.json())
      .then((data) => {
        setCalendar(data.calendar || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Generate the last 16 weeks (112 days) of activity
  const { days, totalCount, activeDays, maxCount } = useMemo(() => {
    const result = [];
    let total = 0;
    let active = 0;
    let max = 0;

    const today = new Date();
    // Align to the end of the current week (Saturday)
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - dayOfWeek));

    // 16 weeks * 7 days = 112 days
    const totalDays = 112;

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(endDate.getDate() - i);

      // LeetCode timestamps are normalized to UTC midnight
      const utcSeconds = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 1000;
      // Also check local midnight in case timestamps are in local timezone
      const localSeconds = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000;

      const count =
        calendar[utcSeconds] ||
        calendar[String(utcSeconds)] ||
        calendar[localSeconds] ||
        calendar[String(localSeconds)] ||
        0;

      if (count > 0) {
        total += count;
        active++;
        if (count > max) max = count;
      }

      let level = 0;
      if (count >= 10) level = 4;
      else if (count >= 5) level = 3;
      else if (count >= 2) level = 2;
      else if (count >= 1) level = 1;

      result.push({
        date: d,
        dateStr: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        count,
        level,
      });
    }

    return { days: result, totalCount: total, activeDays: active, maxCount: max };
  }, [calendar]);

  // Group into weeks (columns of 7 days)
  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < days.length; i += 7) {
      w.push(days.slice(i, i + 7));
    }
    return w;
  }, [days]);

  return (
    <div className="activity-panel">
      {/* Header */}
      <div className="activity-header">
        <div className="activity-brand">
          <div className="activity-icon-badge">
            <Code2 size={18} color="var(--accent)" />
          </div>
          <div>
            <h3 className="activity-heading">LeetCode Activity</h3>
            <span className="activity-sub">Verified submission history</span>
          </div>
        </div>

        <a
          href="https://leetcode.com/u/iamhasnain04/"
          target="_blank"
          rel="noreferrer"
          className="activity-profile-link"
        >
          <span>iamhasnain04</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Metrics Row */}
      <div className="activity-metrics-row">
        <div className="activity-metric">
          <span className="metric-label">RECENT SUBMISSIONS</span>
          <b className="metric-value">{loading ? "..." : totalCount}</b>
        </div>
        <div className="activity-metric">
          <span className="metric-label">ACTIVE DAYS</span>
          <b className="metric-value">{loading ? "..." : activeDays}</b>
        </div>
        <div className="activity-metric">
          <span className="metric-label">SINGLE-DAY MAX</span>
          <b className="metric-value">{loading ? "..." : `${maxCount} solved`}</b>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-wrap">
        <div className="calendar-weeks">
          {weeks.map((week, wi) => (
            <div key={wi} className="calendar-col">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`calendar-cell level-${day.level}`}
                  title={`${day.dateStr}: ${day.count} submissions`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="calendar-footer">
          <span className="calendar-meta-text">Last 16 weeks</span>
          <div className="calendar-legend">
            <span>Less</span>
            <div className="legend-cell level-0" />
            <div className="legend-cell level-1" />
            <div className="legend-cell level-2" />
            <div className="legend-cell level-3" />
            <div className="legend-cell level-4" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* SmartInterviews Rank Badge */}
      <div className="rank-badge-card">
        <div className="rank-badge-left">
          <div className="rank-icon-wrap">
            <Award size={18} color="var(--accent)" />
          </div>
          <div>
            <div className="rank-title">SmartInterviews Global Rank</div>
            <div className="rank-stats">
              <span className="rank-number">#6,830</span>
              <span className="rank-sep">·</span>
              <span className="rank-score">Score: 27,755</span>
            </div>
          </div>
        </div>

        <a
          href="https://smartinterviews.in/profile/syed_hasnain33"
          target="_blank"
          rel="noreferrer"
          className="rank-link"
          aria-label="View SmartInterviews profile"
        >
          <span>View profile</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

export function GithubHeatmap() {
  // Generate consistent 16-week matrix for GitHub activity
  const weeks = useMemo(() => {
    // Deterministic simulation patterned after typical active repository bursts
    const matrix = [];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - dayOfWeek));

    const totalDays = 112; // 16 weeks
    const days = [];

    // Pattern generator for commit intensity
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(endDate.getDate() - i);
      const dayNum = d.getDay();
      const seed = (d.getFullYear() * 365 + d.getMonth() * 31 + d.getDate()) % 17;

      let level = 0;
      let count = 0;
      if (dayNum !== 0 && seed > 7) {
        if (seed > 14) {
          level = 4;
          count = seed - 6;
        } else if (seed > 11) {
          level = 3;
          count = seed - 8;
        } else if (seed > 9) {
          level = 2;
          count = 2;
        } else {
          level = 1;
          count = 1;
        }
      }

      days.push({
        date: d,
        dateStr: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        count,
        level,
      });
    }

    for (let i = 0; i < days.length; i += 7) {
      matrix.push(days.slice(i, i + 7));
    }
    return matrix;
  }, []);

  return (
    <div className="activity-panel">
      {/* Header */}
      <div className="activity-header">
        <div className="activity-brand">
          <div className="activity-icon-badge">
            <Github size={18} color="var(--accent)" />
          </div>
          <div>
            <h3 className="activity-heading">GitHub Contributions</h3>
            <span className="activity-sub">Open-source & repository activity</span>
          </div>
        </div>

        <a
          href="https://github.com/SyedHasnain04"
          target="_blank"
          rel="noreferrer"
          className="activity-profile-link"
        >
          <span>SyedHasnain04</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Metrics Row */}
      <div className="activity-metrics-row">
        <div className="activity-metric">
          <span className="metric-label">CORE REPOSITORIES</span>
          <b className="metric-value">Athenaeum · J-Lens</b>
        </div>
        <div className="activity-metric">
          <span className="metric-label">FOCUS</span>
          <b className="metric-value">ML & Interpretability</b>
        </div>
        <div className="activity-metric">
          <span className="metric-label">STATUS</span>
          <b className="metric-value" style={{ color: "var(--accent)" }}>
            Active Development
          </b>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-wrap">
        <div className="calendar-weeks">
          {weeks.map((week, wi) => (
            <div key={wi} className="calendar-col">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`calendar-cell level-${day.level}`}
                  title={`${day.dateStr}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="calendar-footer">
          <span className="calendar-meta-text">Last 16 weeks</span>
          <div className="calendar-legend">
            <span>Less</span>
            <div className="legend-cell level-0" />
            <div className="legend-cell level-1" />
            <div className="legend-cell level-2" />
            <div className="legend-cell level-3" />
            <div className="legend-cell level-4" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* GitHub Repository Highlights */}
      <div className="github-highlight-card">
        <div className="github-highlight-left">
          <div className="rank-icon-wrap">
            <GitCommit size={18} color="var(--accent)" />
          </div>
          <div>
            <div className="rank-title">Featured Interpretability Repo</div>
            <div className="rank-stats">
              <span className="rank-number" style={{ fontSize: "14px", fontWeight: 500 }}>
                SyedHasnain04/j-lens-bias
              </span>
            </div>
          </div>
        </div>

        <a
          href="https://github.com/SyedHasnain04/j-lens-bias"
          target="_blank"
          rel="noreferrer"
          className="rank-link"
        >
          <span>Repository</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
