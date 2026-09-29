import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./hero.css";
import "./extra.css";
import "./activity.css";
import "./rank.css";
import "./overrides.css";
import "./case-study.css";

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://syed-hasnain-portfolio-opal.vercel.app";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Syed Hasnain Peeran | ML Engineer",
		template: "%s | Syed Hasnain Peeran",
	},
	description:
		"Portfolio of Syed Hasnain Peeran, a Computer Science (Machine Learning) undergraduate building practical AI systems.",
	keywords: ["Syed Hasnain Peeran", "Machine Learning", "AI Engineer", "Python", "RAG"],
	alternates: { canonical: "/" },
	openGraph: {
		title: "Syed Hasnain Peeran | ML Engineer",
		description: "Practical ML systems, RAG applications, and optimization projects.",
		url: siteUrl,
		siteName: "Syed Hasnain Peeran",
		type: "website",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Syed Hasnain Peeran | ML Engineer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Syed Hasnain Peeran | ML Engineer",
		description: "Practical ML systems, RAG applications, and optimization projects.",
		images: ["/opengraph-image"],
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0a0d12", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<a href="#main-content" className="skip-link">
					Skip to content
				</a>
				<div className="grain-overlay" aria-hidden="true" />
				{children}
			</body>
		</html>
	);
}
