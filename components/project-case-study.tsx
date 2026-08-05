"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  MapPinned,
  MonitorSmartphone,
  Rocket,
  Sparkles,
  Check,
} from "lucide-react";
import type { Project } from "@/data/portfolio";
import styles from "./project-case-study.module.css";

// ── Types ─────────────────────────────────────────────────────────

type CaseStudy = {
  title: string;
  category: string;
  heroNote: string;
  docs: { label: string; href: string };
  whyThisProject: string;
  problemStatement: string;
  solutionOverview: string;
  techStack: string[];
  impact: string;
  improvement: string;
  learnings: string[];
  recruiterSummary: string;
};

// ── Configuration ─────────────────────────────────────────────────

const sectionNav = [
  ["why", "Why this project"],
  ["problem", "Problem & Solution"],
  ["tech", "Tech stack"],
  ["impact", "Impact & Improvements"],
  ["learn", "Key learnings"],
  ["summary", "Recruiter summary"],
] as const;

const sectionIds = sectionNav.map(([id]) => id);

// ── Helpers ───────────────────────────────────────────────────────

function useActiveSection(): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-15% 0px -68% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return activeId;
}

// Map the generic Project data straight into the CaseStudy type, without fabrication.
function buildCaseStudy(project: Project): CaseStudy {
  const repoUrl = "https://github.com/Syed8855/Portfolio";
  
  return {
    title: project.name,
    category: project.category,
    heroNote: "The details below represent the factual implementation and outcomes of this project without fabricated narratives.",
    docs: { label: "Repository README", href: `${repoUrl}#readme` },
    whyThisProject: project.whyChosen,
    problemStatement: project.description,
    solutionOverview: project.outcome,
    techStack: project.stack,
    impact: project.communityImpact,
    improvement: project.improvement,
    learnings: project.learnings,
    recruiterSummary: `${project.name} (${project.category}): ${project.description} Outcome: ${project.outcome}`,
  };
}

// ── Layout Components ─────────────────────────────────────────────

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className={styles.section}>
      {children}
    </section>
  );
}

function SectionHeading({ eyebrow, title, summary }: { eyebrow: string; title: string; summary: string }) {
  return (
    <header className={styles.sectionHeader}>
      <p className={styles.galleryEyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{summary}</p>
    </header>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

function Pill({ tone, children }: { tone: "verified" | "inferred" | "availability"; children: React.ReactNode }) {
  const tClass = tone === "verified" ? styles.badgeVerified : tone === "inferred" ? styles.badgeInferred : styles.badgeAvailability;
  return <span className={`${styles.pill} ${tClass}`}>{children}</span>;
}

function StickyNav({ items, activeId }: { items: readonly (readonly [string, string])[]; activeId: string }) {
  return (
    <aside className={styles.stickyNav} aria-label="Project sections">
      <div className={styles.stickyNavCard}>
        <p className={styles.navLabel}>Project navigation</p>
        <nav>
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={activeId === id ? styles.activeNavLink : ""}>
              {label}
              <ChevronRight size={14} />
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// ── Sections ──────────────────────────────────────────────────────

function HeroSection({ study, project }: { study: CaseStudy; project: Project }) {
  const reducedMotion = useReducedMotion() ?? false;
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.heroCopy}
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.heroTopRow}>
          <Link href="/#work" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to work
          </Link>
          <div className={styles.heroLinks}>
            <a href={study.docs.href} target="_blank" rel="noreferrer">
              {study.docs.label} <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <h1>{study.title}</h1>
        <p className={styles.leadCopy}>{study.category}</p>
        
        <div className={styles.heroMeta}>
          <Card>
            <span>Tech Stack</span>
            <strong>{project.stack.join(", ")}</strong>
          </Card>
          <Card>
            <span>Status</span>
            <strong>Completed</strong>
          </Card>
        </div>
      </motion.div>
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.18 }}
      >
        <Card className={styles.heroVisual}>
          <div className={styles.heroVisualTop}>
            <div>
              <p className={styles.visualLabel}>Case study visual</p>
              <h3>Engineering story at a glance</h3>
            </div>
            <Sparkles size={18} />
          </div>
          <div className={styles.floatingBadges} aria-hidden="true">
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech}
                className={styles.floatingBadge}
                animate={reducedMotion ? {} : {
                  y: [0, -6 + (i % 3) * 3, 0],
                  opacity: [0.65, 1, 0.65],
                }}
                transition={{
                  duration: 2.6 + i * 0.45,
                  repeat: Infinity,
                  delay: i * 0.38,
                  ease: "easeInOut",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <div className={styles.visualGrid}>
            <div>
              <span>Project</span>
              <strong>{project.name}</strong>
            </div>
            <div>
              <span>Technology focus</span>
              <strong>{project.stack.join(" / ")}</strong>
            </div>
            <div>
              <span>Evidence quality</span>
              <strong>Repository-backed</strong>
            </div>
          </div>
          <p className={styles.heroNote}>{study.heroNote}</p>
        </Card>
      </motion.div>
    </section>
  );
}

function WhyThisProject({ study }: { study: CaseStudy }) {
  return (
    <Section id="why">
      <SectionHeading eyebrow="01 / CONTEXT" title="Why this project?" summary="The core motivation behind selecting and building this project." />
      <Card className={styles.featureCard}>
        <p>{study.whyThisProject}</p>
      </Card>
    </Section>
  );
}

function ProblemSolution({ study }: { study: CaseStudy }) {
  return (
    <Section id="problem">
      <SectionHeading eyebrow="02 / PROBLEM & SOLUTION" title="What was built" summary="The specific problem addressed and the resulting solution." />
      <div className={styles.tableLike}>
        <Card className={`${styles.tableCell} ${styles.challengeCell}`}>
          <p className={styles.tableLabel}>The Problem</p>
          <p>{study.problemStatement}</p>
        </Card>
        <Card className={`${styles.tableCell} ${styles.solutionCell}`}>
          <p className={styles.tableLabel}>The Solution</p>
          <p>{study.solutionOverview}</p>
        </Card>
      </div>
    </Section>
  );
}

function TechStack({ study }: { study: CaseStudy }) {
  return (
    <Section id="tech">
      <SectionHeading eyebrow="03 / TECHNOLOGY STACK" title="Technologies used" summary="The core stack used to implement this project." />
      <div className={styles.stackGrid}>
        {study.techStack.map((tech) => (
          <Card key={tech} className={`${styles.stackCard} ${styles.catDefault}`}>
            <div className={styles.stackCardTop}>
              <h3>{tech}</h3>
              <Code2 size={18} />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ImpactImprovements({ study }: { study: CaseStudy }) {
  return (
    <Section id="impact">
      <SectionHeading eyebrow="04 / OUTCOME" title="Impact & Improvements" summary="The resulting impact of the project and areas for improvement." />
      <div className={styles.tableLike}>
        <Card className={styles.tableCell}>
          <p className={styles.tableLabel}>Community Impact</p>
          <p>{study.impact}</p>
        </Card>
        <Card className={styles.tableCell}>
          <p className={styles.tableLabel}>Project Improvements</p>
          <p>{study.improvement}</p>
        </Card>
      </div>
    </Section>
  );
}

function KeyLearnings({ study }: { study: CaseStudy }) {
  return (
    <Section id="learn">
      <SectionHeading eyebrow="05 / REFLECTION" title="Key learnings" summary="Engineering and product lessons taken away from this project." />
      <div className={styles.gridTwo}>
        {study.learnings.map((learning, i) => (
          <Card key={i} className={styles.learningCard}>
            <BookOpen size={18} />
            <p>{learning}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function RecruiterSummary({ study }: { study: CaseStudy }) {
  const [copied, setCopied] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const fullText = study.recruiterSummary;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
          let i = 0;
          const tick = setInterval(() => {
            i++;
            setDisplayed(fullText.slice(0, i));
            if (i >= fullText.length) clearInterval(tick);
          }, 16);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, fullText, started]);

  function handleCopy() {
    void navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <Section id="summary">
      <SectionHeading eyebrow="06 / RECRUITER SUMMARY" title="One-minute summary" summary="A quick factual overview of the project." />
      <Card className={styles.summaryCard}>
        <div className={styles.summaryTop}>
          <MonitorSmartphone size={18} />
          <div ref={ref} className={styles.summaryTextWrap}>
            <p className={styles.summaryText}>
              {reducedMotion ? fullText : (displayed || fullText.slice(0, 1))}
              {!reducedMotion && started && displayed.length < fullText.length && (
                <span className={styles.typingCursor} aria-hidden="true">|</span>
              )}
            </p>
          </div>
          <button type="button" className={styles.copyBtn} onClick={handleCopy} aria-label="Copy recruiter summary to clipboard">
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
      </Card>
    </Section>
  );
}

// ── Root Page ─────────────────────────────────────────────────────

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  const study = buildCaseStudy(project);
  const activeId = useActiveSection();

  return (
    <div className={styles.page}>
      <motion.div className={styles.progress} style={{ scaleX }} />
      <main className={styles.main}>
        <HeroSection study={study} project={project} />
        <div className={styles.bodyGrid}>
          <div className={styles.contentColumn}>
            <WhyThisProject study={study} />
            <ProblemSolution study={study} />
            <TechStack study={study} />
            <ImpactImprovements study={study} />
            <KeyLearnings study={study} />
            <RecruiterSummary study={study} />
          </div>
          <StickyNav items={sectionNav} activeId={activeId} />
        </div>
      </main>
      <footer className={styles.footer}>
        <Link href="/#work">Back to work</Link>
        <Link href="/">Portfolio home</Link>
        <a href={study.docs.href} target="_blank" rel="noreferrer">GitHub repo</a>
      </footer>
    </div>
  );
}
