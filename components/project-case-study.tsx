"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ExternalLink, Sparkles, Check, Copy } from "lucide-react";
import type { Project } from "@/data/portfolio";

// --- Design System Transitions ---
const transitionSettings = {
  micro: { duration: 0.25, ease: "easeOut" },
  component: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  section: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const revealSection = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitionSettings.section
  },
};

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;
  return (
    <motion.section
      id={id}
      className={`container ${className}`}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-10%" }}
      variants={revealSection}
      style={{ paddingTop: "var(--sp-7)", paddingBottom: "var(--sp-7)", borderBottom: "1px solid var(--border-color)" }}
    >
      {children}
    </motion.section>
  );
}

// --- Animated Flow Component (IPO) ---
function FlowAnimation({ stack }: { stack: string[] }) {
  const steps = ["INPUT", "PREPROCESSING", "MODEL / LOGIC", "POSTPROCESSING", "OUTPUT"];
  
  return (
    <div style={{ padding: "var(--sp-5)", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", opacity: 0.3, pointerEvents: "none" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)", position: "relative", zIndex: 1 }}>
        {steps.map((step, i) => (
          <motion.div 
            key={step}
            initial={{ opacity: 0.3, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "var(--text-secondary)" }}>
              {i + 1}
            </div>
            <div style={{ flex: 1, padding: "var(--sp-2) var(--sp-3)", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.02)", borderRadius: "4px" }}>
              <div className="text-meta" style={{ color: "var(--text-primary)" }}>{step}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Page Components ---

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <motion.div style={{ scaleX, background: "var(--accent-color)", height: "3px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, transformOrigin: "left" }} />
      
      {/* Navbar (Minimal) */}
      <header style={{ padding: "var(--sp-4) 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/#work" className="text-meta hover-text" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ArrowLeft size={16} /> BACK TO WORK
          </Link>
          <a href="https://github.com/Syed8855/Portfolio" target="_blank" rel="noreferrer" className="text-meta hover-text" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            GITHUB <ExternalLink size={16} />
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transitionSettings.component}>
            <div className="text-meta" style={{ marginBottom: "var(--sp-4)", color: "var(--accent-color)" }}>
              {project.category.toUpperCase()}
            </div>
            <h1 style={{ fontSize: "var(--text-hero)", lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "var(--sp-5)", textTransform: "uppercase" }}>
              {project.name}
            </h1>
            
            <div className="grid grid-12" style={{ gap: "var(--sp-5)", marginTop: "var(--sp-6)" }}>
              <div style={{ gridColumn: "span 4" }}>
                <div className="text-meta" style={{ marginBottom: "8px" }}>ROLE</div>
                <div className="text-body" style={{ color: "var(--text-primary)" }}>Developer</div>
              </div>
              <div style={{ gridColumn: "span 4" }}>
                <div className="text-meta" style={{ marginBottom: "8px" }}>YEAR</div>
                <div className="text-body" style={{ color: "var(--text-primary)" }}>2026</div>
              </div>
              <div style={{ gridColumn: "span 4", display: "flex", gap: "16px", alignItems: "flex-end" }}>
                <a href="https://github.com/Syed8855" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
                  VIEW CODE <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* HERO VISUAL PLACEHOLDER */}
        <div className="container" style={{ paddingBottom: "var(--sp-7)" }}>
          <div style={{ width: "100%", aspectRatio: "21/9", background: "var(--border-color)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
             <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(45deg, rgba(0,102,255,0.1), transparent)", zIndex: 1 }} />
             <Sparkles size={48} opacity={0.2} style={{ zIndex: 2 }} />
          </div>
        </div>

        {/* WHY THIS PROJECT */}
        <Section id="why">
          <div className="grid grid-12">
            <div style={{ gridColumn: "span 4" }}>
              <h2 className="text-meta" style={{ color: "var(--text-primary)" }}>WHY THIS PROJECT?</h2>
              <p className="text-body" style={{ fontSize: "14px", marginTop: "8px" }}>What problem made this worth building?</p>
            </div>
            <div style={{ gridColumn: "span 8" }}>
              <p className="text-body" style={{ fontSize: "24px", color: "var(--text-primary)" }}>
                {project.whyChosen}
              </p>
            </div>
          </div>
        </Section>

        {/* PROBLEM */}
        <Section id="problem">
          <div className="grid grid-12">
            <div style={{ gridColumn: "span 4" }}>
              <h2 className="text-meta" style={{ color: "var(--text-primary)" }}>THE PROBLEM</h2>
            </div>
            <div style={{ gridColumn: "span 8" }}>
              <p className="text-body" style={{ fontSize: "32px", color: "var(--text-primary)", lineHeight: 1.2 }}>
                {project.description}
              </p>
            </div>
          </div>
        </Section>

        {/* APPROACH / IPO */}
        <Section id="approach">
          <div className="grid grid-12" style={{ alignItems: "center" }}>
            <div style={{ gridColumn: "span 5" }}>
              <h2 className="text-meta" style={{ color: "var(--text-primary)", marginBottom: "var(--sp-4)" }}>THE APPROACH</h2>
              <p className="text-body" style={{ marginBottom: "var(--sp-5)" }}>
                A structured breakdown of the system architecture from data ingestion to final output.
              </p>
            </div>
            <div style={{ gridColumn: "span 7" }}>
              <FlowAnimation stack={project.stack} />
            </div>
          </div>
        </Section>

        {/* TECH STACK */}
        <Section id="tech">
           <div className="grid grid-12">
            <div style={{ gridColumn: "span 4" }}>
              <h2 className="text-meta" style={{ color: "var(--text-primary)" }}>TECHNOLOGY STACK</h2>
            </div>
            <div style={{ gridColumn: "span 8" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {project.stack.map(tech => (
                  <span key={tech} style={{ padding: "12px 24px", border: "1px solid var(--border-color)", borderRadius: "100px", fontSize: "16px", color: "var(--text-primary)" }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* RESULTS & IMPACT */}
        <Section id="results">
          <div className="grid grid-12">
            <div style={{ gridColumn: "span 12", marginBottom: "var(--sp-6)" }}>
              <h2 className="text-meta" style={{ color: "var(--text-primary)", textAlign: "center" }}>RESULTS & IMPACT</h2>
            </div>
            <div style={{ gridColumn: "span 6", paddingRight: "var(--sp-4)", borderRight: "1px solid var(--border-color)" }}>
              <div className="text-meta" style={{ marginBottom: "var(--sp-3)" }}>OUTCOME</div>
              <p className="text-body" style={{ fontSize: "20px", color: "var(--text-primary)" }}>{project.outcome}</p>
            </div>
            <div style={{ gridColumn: "span 6", paddingLeft: "var(--sp-4)" }}>
              <div className="text-meta" style={{ marginBottom: "var(--sp-3)" }}>COMMUNITY IMPACT</div>
              <p className="text-body" style={{ fontSize: "20px", color: "var(--text-primary)" }}>{project.communityImpact}</p>
            </div>
          </div>
        </Section>

        {/* LEARNINGS */}
        <Section id="learnings">
          <div className="grid grid-12">
             <div style={{ gridColumn: "span 12", marginBottom: "var(--sp-6)" }}>
              <h2 style={{ fontSize: "var(--text-section)", textAlign: "center", textTransform: "uppercase" }}>KEY LEARNINGS</h2>
            </div>
            <div style={{ gridColumn: "span 12" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {project.learnings.map((learning, i) => (
                  <div key={i} style={{ padding: "var(--sp-4) 0", borderTop: "1px solid var(--border-color)", display: "flex", gap: "var(--sp-4)" }}>
                    <div className="text-meta" style={{ width: "40px" }}>0{i+1}</div>
                    <p className="text-body" style={{ fontSize: "24px", color: "var(--text-primary)", margin: 0 }}>{learning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* FUTURE */}
        <Section id="future">
          <div className="grid grid-12">
            <div style={{ gridColumn: "span 4" }}>
              <h2 className="text-meta" style={{ color: "var(--text-primary)" }}>WHAT&apos;S NEXT?</h2>
            </div>
            <div style={{ gridColumn: "span 8" }}>
              <p className="text-body" style={{ fontSize: "24px", color: "var(--text-primary)" }}>
                {project.improvement}
              </p>
            </div>
          </div>
        </Section>
        
        {/* Next Project / CTA */}
        <section style={{ padding: "120px 0", textAlign: "center" }}>
          <Link href="/#work" className="btn btn-primary">
            BACK TO ALL PROJECTS
          </Link>
        </section>
      </main>
      
      <footer className="container" style={{ padding: "var(--sp-5) 0", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="text-meta">© 2026 SYED HASNAIN</div>
        <div style={{ display: "flex", gap: "24px" }}>
           <a href="https://github.com/Syed8855" target="_blank" rel="noreferrer" className="text-meta hover-text">GITHUB</a>
           <a href="https://www.linkedin.com/in/syed-hasnain-peeran/" target="_blank" rel="noreferrer" className="text-meta hover-text">LINKEDIN</a>
        </div>
      </footer>
    </div>
  );
}
