import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { ProjectCaseStudy } from "@/components/project-case-study";

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

	return <ProjectCaseStudy project={project} />;
}
