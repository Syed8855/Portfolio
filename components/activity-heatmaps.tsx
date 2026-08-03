"use client";
import { useEffect, useState } from "react";
import { Github, Code2, ExternalLink, Globe2 } from "lucide-react";
type Calendar = Record<string, number>;
export function GithubHeatmap() {
	return (
		<div className="activity-card">
			<div className="activity-title">
				<Github size={19} />
				<div>
					<h3>GitHub contributions</h3>
					<a href="https://github.com/Syed8855" target="_blank" rel="noreferrer">
						github.com/Syed8855 <ExternalLink size={13} />
					</a>
				</div>
			</div>
			<img
				className="github-heatmap"
				src="https://ghchart.rshah.org/4f8cff/Syed8855"
				alt="GitHub contribution heatmap for Syed8855"
				loading="lazy"
				decoding="async"
			/>
			<p>Live public contribution history.</p>
		</div>
	);
}

export function LeetCodeHeatmap() {
	const [calendar, setCalendar] = useState<Calendar>({});

	useEffect(() => {
		fetch("/api/leetcode")
			.then((response) => response.json())
			.then((data) => setCalendar(data.calendar || {}))
			.catch(() => {});
	}, []);

	const days = Array.from({ length: 84 }, (_, index) => {
		const date = new Date();
		date.setDate(date.getDate() - 83 + index);
		const value = calendar[Math.floor(date.getTime() / 1000)] || 0;

		return (
			<i
				key={date.toISOString()}
				className={`heat level-${Math.min(4, value)}`}
				title={`${date.toLocaleDateString()}: ${value} submissions`}
				aria-hidden="true"
			/>
		);
	});

	return (
		<div className="activity-card">
			<div className="activity-title">
				<Code2 size={19} />
				<div>
					<h3>LeetCode activity</h3>
					<a href="https://leetcode.com/u/iamhasnain04/" target="_blank" rel="noreferrer">
						iamhasnain04 <ExternalLink size={13} />
					</a>
				</div>
			</div>
			<div className="heatmap" aria-label="LeetCode submission activity for the last 12 weeks">
				{days}
			</div>
			<p>Live public submission activity, refreshed hourly.</p>
			<div className="rank-stat">
				<Globe2 size={18} />
				<div>
					<span>SmartInterviews global rank</span>
					<b>#6,830</b>
					<small>Overall score: 27,755</small>
				</div>
				<a href="https://smartinterviews.in/profile/syed_hasnain33" target="_blank" rel="noreferrer" aria-label="Open SmartInterviews profile">
					<ExternalLink size={16} />
				</a>
			</div>
		</div>
	);
}
