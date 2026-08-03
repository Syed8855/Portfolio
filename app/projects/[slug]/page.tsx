import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/portfolio";

export function generateStaticParams() {
	return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const project = projects.find((entry) => entry.slug === slug);

	if (!project) {
		return {};
	}

	return {
		title: project.name,
		description: project.description,
		openGraph: {
			title: project.name,
			description: project.description,
			type: "article",
		},
		twitter: {
			card: "summary",
			title: project.name,
			description: project.description,
		},
		alternates: {
			canonical: `/projects/${project.slug}`,
		},
	};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const project = projects.find((entry) => entry.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<main className="project-page">
			<header className="project-header">
				<Link href="/#work" className="back">
					<ArrowLeft size={16} /> Back to work
				</Link>
				<Link href="/" className="brand">
					SHP<span>.</span>
				</Link>
			</header>
			<article>
				<p className="eyebrow">{project.category}</p>
				<h1>{project.name}</h1>
				<p className="project-intro">{project.description}</p>
				<div className="tags">
					{project.stack.map((tech) => (
						<span key={tech}>{tech}</span>
					))}
				</div>
				<div className="story-grid">
					<Story title="Project description" body={project.description} />
					<Story title="Why I chose it" body={project.whyChosen} />
					<Story title="Community contribution" body={project.communityImpact} />
					<Story title="Improvement" body={project.improvement} />
				</div>
				<section className="learnings">
					<p className="eyebrow">KNOWLEDGE GAINED</p>
					<h2>What this project taught me.</h2>
					<ul>
						{project.learnings.map((learning) => (
							<li key={learning}>
								<CheckCircle2 size={18} />
								{learning}
							</li>
						))}
					</ul>
				</section>
			</article>
		</main>
	);
}

function Story({ title, body }: { title: string; body: string }) {
	return (
		<section className="story">
			<h2>{title}</h2>
			<p>{body}</p>
		</section>
	);
}
