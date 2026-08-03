import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./extra.css";
import "./activity.css";
import "./rank.css";
import "./overrides.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Syed Hasnain Peeran | ML Engineer",
		template: "%s | Syed Hasnain Peeran",
	},
	description:
		"Portfolio of Syed Hasnain Peeran, a Computer Science (Machine Learning) undergraduate building practical AI systems.",
	keywords: ["Syed Hasnain Peeran", "Machine Learning", "AI Engineer", "Python"],
	alternates: { canonical: "/" },
	openGraph: {
		title: "Syed Hasnain Peeran | ML Engineer",
		description: "Practical ML systems, RAG applications, and optimization projects.",
		url: siteUrl,
		siteName: "Syed Hasnain Peeran",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Syed Hasnain Peeran | ML Engineer",
		description: "Practical ML systems, RAG applications, and optimization projects.",
	},
	robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#07111f", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
