"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ExternalLink, ArrowRight, Layers, Cpu, Database, CheckCircle2, Lightbulb } from "lucide-react";
import type { Project } from "@/data/portfolio";

const transitionSettings = {
  component: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  section: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSettings.section,
  },
};

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;
  return (
    <motion.section
      id={id}
      className={`cs-section ${className}`}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={sectionVariants}
    >
      <div className="wrap">{children}</div>
    </motion.section>
  );
}

// Pipeline architecture breakdown
function PipelineFlow({ stack }: { stack: string[] }) {
  const steps = [
    { num: "01", name: "Data Ingestion & Context", detail: "Document normalization, raw text extraction, and domain chunking" },
    { num: "02", name: "Embedding & Indexing", detail: "Dense vector representations via fastembed and FAISS vector indices" },
    { num: "03", name: "Retrieval & Grounding", detail: "Top-k semantic similarity matching with thresholded relevance verification" },
    { num: "04", name: "Inference & Response", detail: "Constrained LLM context injection with strict source citation formatting" },
  ];

  return (
    <div className="cs-pipeline-wrap">
      <div className="cs-pipeline-grid">
        {steps.map((step) => (
          <div key={step.num} className="cs-pipeline-node">
            <span className="cs-node-num">{step.num}</span>
            <div className="cs-node-name">{step.name}</div>
            <p className="cs-node-detail">{step.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const repoUrl = project.repo || "https://github.com/SyedHasnain04";

  return (
    <div className="cs-root">
      <motion.div className="cs-progress-bar" style={{ scaleX }} />

      {/* Navigation Header */}
      <header className="cs-header">
        <div className="wrap cs-header-inner">
          <Link href="/#work" className="cs-back-link">
            <ArrowLeft size={15} />
            <span>Back to projects</span>
          </Link>
          <div className="cs-header-links">
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="cs-external-link"
            >
              <span>GitHub</span>
              <ExternalLink size={14} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="cs-external-link"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="cs-hero">
          <div className="wrap">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionSettings.component}
            >
              <div className="cs-eyebrow">
                <Layers size={14} />
                <span>{project.category}</span>
              </div>

              <h1 className="cs-title">{project.name}</h1>

              <p className="cs-lead">{project.description}</p>

              {/* Quick Info Grid */}
              <div className="cs-meta-grid">
                <div className="cs-meta-item">
                  <span className="cs-meta-label">Domain</span>
                  <span className="cs-meta-val accent">{project.category}</span>
                </div>
                <div className="cs-meta-item">
                  <span className="cs-meta-label">Role</span>
                  <span className="cs-meta-val">ML Engineer</span>
                </div>
                <div className="cs-meta-item">
                  <span className="cs-meta-label">Timeline</span>
                  <span className="cs-meta-val">2026</span>
                </div>
                <div className="cs-meta-item">
                  <span className="cs-meta-label">Code Access</span>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cs-meta-val"
                    style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--accent)" }}
                  >
                    Repository <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MOTIVATION & PROBLEM SPLIT */}
        <Section id="motivation">
          <div className="cs-card-split">
            <div className="cs-card">
              <div className="cs-card-title">
                <Lightbulb size={18} color="var(--accent)" />
                <span>Why this project?</span>
              </div>
              <p className="cs-card-body">{project.whyChosen}</p>
            </div>

            <div className="cs-card">
              <div className="cs-card-title">
                <Cpu size={18} color="var(--accent)" />
                <span>System Objective</span>
              </div>
              <p className="cs-card-body">{project.outcome}</p>
            </div>
          </div>
        </Section>

        {/* SYSTEM ARCHITECTURE / PIPELINE */}
        <Section id="architecture">
          <div className="cs-section-header">
            <span className="cs-section-label">Architecture</span>
            <h2 className="cs-section-title">End-to-end execution pipeline</h2>
          </div>
          <PipelineFlow stack={project.stack} />
        </Section>

        {/* TECH STACK */}
        <Section id="technologies">
          <div className="cs-section-header">
            <span className="cs-section-label">Tech Stack</span>
            <h2 className="cs-section-title">Core technologies & frameworks</h2>
          </div>
          <div className="cs-stack-grid">
            {project.stack.map((tech) => (
              <span key={tech} className="cs-tech-chip">
                <span className="cs-tech-dot" />
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* OUTCOME & COMMUNITY IMPACT */}
        <Section id="outcomes">
          <div className="cs-card-split">
            <div className="cs-card">
              <div className="cs-card-title">
                <CheckCircle2 size={18} color="var(--accent)" />
                <span>Impact & Validation</span>
              </div>
              <p className="cs-card-body">{project.communityImpact}</p>
            </div>

            <div className="cs-card">
              <div className="cs-card-title">
                <Database size={18} color="var(--accent)" />
                <span>Next System Iteration</span>
              </div>
              <p className="cs-card-body">{project.improvement}</p>
            </div>
          </div>
        </Section>

        {/* ENGINEERING LEARNINGS */}
        <Section id="learnings">
          <div className="cs-section-header">
            <span className="cs-section-label">Takeaways</span>
            <h2 className="cs-section-title">Key engineering learnings</h2>
          </div>
          <div className="cs-learnings-list">
            {project.learnings.map((learning, idx) => (
              <div key={idx} className="cs-learning-card">
                <span className="cs-learning-idx">0{idx + 1}</span>
                <p className="cs-learning-text">{learning}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* FOOTER CTA */}
        <section className="cs-footer-cta">
          <div className="wrap">
            <p className="cs-footer-text">
              Looking to discuss machine learning systems or architectural trade-offs?
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
              <Link href="/#work" className="btn-p">
                View all projects
                <ArrowRight size={14} />
              </Link>
              <Link href="/#contact" className="btn-s">
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="cs-footer-bar">
        <div className="wrap cs-footer-inner">
          <span>© 2026 SYED HASNAIN PEERAN</span>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/" style={{ color: "var(--ink-dim)" }}>HOME</Link>
            <Link href="/#work" style={{ color: "var(--ink-dim)" }}>WORK</Link>
            <a href="https://github.com/SyedHasnain04" target="_blank" rel="noreferrer" style={{ color: "var(--ink-dim)" }}>GITHUB</a>
            <a href="https://www.linkedin.com/in/syed-hasnain-peeran/" target="_blank" rel="noreferrer" style={{ color: "var(--ink-dim)" }}>LINKEDIN</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
