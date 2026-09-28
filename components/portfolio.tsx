"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
} from "lucide-react";
import { achievements, experiences, projects, skills } from "@/data/portfolio";
import { ContactForm } from "./contact-form";
import { GithubHeatmap, LeetCodeHeatmap } from "./activity-heatmaps";
import { SectionHeading } from "./SectionHeading";
import HeroSection from "./HeroSection";

/* ─── Social links ───────────────────────────────────────────── */

function Socials() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <a
        href="mailto:iamsyedhasnain04@gmail.com"
        aria-label="Email"
        style={{ color: "var(--ink-dim)", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
      >
        <Mail size={17} />
      </a>
      <a
        href="https://github.com/SyedHasnain04"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        style={{ color: "var(--ink-dim)", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
      >
        <Github size={17} />
      </a>
      <a
        href="https://www.linkedin.com/in/syed-hasnain-peeran/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        style={{ color: "var(--ink-dim)", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
      >
        <Linkedin size={17} />
      </a>
    </div>
  );
}

/* ─── Navigation ─────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("work");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ["contact", "journey", "problem-solving", "toolkit", "about", "work"];
      const scrollPos = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        background: scrolled
          ? "rgba(10, 13, 18, 0.88)"
          : "linear-gradient(to bottom, rgba(10, 13, 18, 0.8), transparent)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <a
        href="#top"
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: "13px",
          letterSpacing: "0.08em",
          color: "var(--ink)",
        }}
      >
        SHP
      </a>

      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {[
          { id: "work", label: "Work" },
          { id: "about", label: "About" },
          { id: "toolkit", label: "Toolkit" },
          { id: "journey", label: "Journey" },
          { id: "contact", label: "Contact" },
        ].map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-link ${activeSection === id ? "active" : ""}`}
          >
            {label}
          </a>
        ))}
      </div>

      <Socials />
    </nav>
  );
}

/* ─── Main Portfolio Component ───────────────────────────────── */

export function Portfolio() {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const compactProjects = projects.filter((p) => p.slug !== featuredProject.slug);

  return (
    <>
      <Navbar />

      <HeroSection />

      <main id="main-content">
        {/* ── ABOUT ── */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <div className="wrap">
            <SectionHeading
              label="About"
              title="Datathon 2.0 winner building verified ML systems from simulation to API."
            />

            <div className="about-layout">
              <div>
                <p className="about-lead">
                  I focus on moving from ambiguous real-world requirements to
                  reliable production systems. My work spans data preparation,
                  dense embedding retrieval, interpretability analysis, and
                  decoupled API architectures.
                </p>

                <p className="about-stats-line">
                  Final-year B.Tech in CS (Machine Learning) at GPREC (CGPA 8.74 /
                  10), graduating 2027 · Datathon 2.0 winner at IIITDM Kurnool.
                </p>
              </div>

              <div className="education-card">
                <div className="education-title-row">
                  <GraduationCap size={20} color="var(--accent)" />
                  <span className="education-degree">
                    B.Tech, CS & Engineering (Machine Learning)
                  </span>
                </div>
                <div className="education-meta">
                  G. Pulla Reddy Engineering College, Kurnool
                  <br />
                  Aug 2023 — Present (Graduating 2027)
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── SELECTED WORK ── */}
        <motion.section
          id="work"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <div className="wrap">
            <SectionHeading
              label="Selected work"
              title="Production RAG, federated architectures, and interpretability experiments."
            />

            <div className="work-wrap">
              {/* Featured Asymmetric Project */}
              {featuredProject && (
                <div className="featured-project">
                  <div className="featured-copy">
                    <span className="compact-category">
                      {featuredProject.category}
                    </span>
                    <h3>{featuredProject.name}</h3>
                    <p>{featuredProject.description}</p>
                    <div className="project-chips">
                      {featuredProject.stack.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="featured-meta">
                    <div>
                      <span className="text-meta">Outcome</span>
                      <p
                        style={{
                          color: "var(--ink-dim)",
                          fontSize: "14px",
                          marginTop: "4px",
                          lineHeight: 1.6,
                        }}
                      >
                        {featuredProject.outcome}
                      </p>
                    </div>

                    <div className="project-links">
                      <Link
                        href={`/projects/${featuredProject.slug}`}
                        className="project-link"
                      >
                        Read case study <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Compact Rows */}
              <div className="compact-projects">
                {compactProjects.map((project, idx) => (
                  <article key={project.slug} className="compact-row">
                    <span className="compact-num">0{idx + 2}</span>

                    <div className="compact-main">
                      <span className="compact-category">
                        {project.category}
                        {project.originNote ? ` · ${project.originNote}` : ""}
                      </span>
                      <h4 className="compact-title">{project.name}</h4>
                      <p className="compact-desc">{project.description}</p>
                      <div className="project-chips" style={{ marginTop: "6px" }}>
                        {project.stack.map((item) => (
                          <span key={item} className="chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="compact-actions">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                        >
                          Code repository <ArrowUpRight size={12} />
                        </a>
                      )}
                      {project.slug === "warehouse-execution-system" && (
                        <a
                          href="https://wesoptimizer.streamlit.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                        >
                          Live simulation <ArrowUpRight size={12} />
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="project-link"
                      >
                        Case study <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── TOOLKIT (Four plain text columns, no boxes) ── */}
        <motion.section
          id="toolkit"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <div className="wrap">
            <SectionHeading
              label="Toolkit"
              title="Core technologies and research tools."
            />

            <div className="toolkit-columns">
              {skills.map(([category, items]) => (
                <div key={category} className="toolkit-col">
                  <div className="toolkit-col-title">{category}</div>
                  <ul className="toolkit-list">
                    {items.map((skill) => (
                      <li key={skill} className="toolkit-item">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── PROBLEM SOLVING ── */}
        <motion.section
          id="problem-solving"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <div className="wrap">
            <SectionHeading
              label="Problem solving"
              title="Algorithmic practice and deliberate problem solving."
            />

            <div className="problem-grid">
              <LeetCodeHeatmap />
              <GithubHeatmap />
            </div>
          </div>
        </motion.section>

        {/* ── JOURNEY ── */}
        <motion.section
          id="journey"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <div className="wrap">
            <SectionHeading
              label="Journey"
              title="Experience across industry internships and research communities."
            />

            <div className="journey-timeline">
              {experiences.map((exp, i) => (
                <div key={i} className="journey-node">
                  <span className="journey-node-dot" />
                  <div className="journey-meta">
                    {exp.company.toUpperCase()}
                  </div>
                  <div className="journey-title">{exp.role}</div>
                  <p className="journey-desc">{exp.detail}</p>
                </div>
              ))}

              {achievements.map((ach, i) => (
                <div key={i} className="journey-node">
                  <span
                    className="journey-node-dot"
                    style={{
                      background: "var(--warm)",
                      boxShadow: "0 0 0 4px rgba(255,180,84,0.15)",
                    }}
                  />
                  <div
                    className="journey-meta"
                    style={{ color: "var(--warm)" }}
                  >
                    {ach.meta.toUpperCase()}
                  </div>
                  <div className="journey-title">{ach.title}</div>
                  <p className="journey-desc">{ach.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── CONTACT ── */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={sectionVariants}
        >
          <div className="wrap">
            <SectionHeading
              label="Contact"
              title="Open for ML, RAG, and backend collaboration."
            />

            <div className="contact-layout">
              <div>
                <p className="contact-info-lead">
                  I am interested in applied ML, retrieval-augmented generation,
                  and backend systems collaboration. If you have an ambiguous
                  problem or an engineering roadmap to discuss, reach out.
                </p>

                <a
                  href="mailto:iamsyedhasnain04@gmail.com"
                  className="contact-email-link"
                >
                  iamsyedhasnain04@gmail.com
                </a>
              </div>

              <ContactForm />
            </div>
          </div>
        </motion.section>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--line)",
          marginTop: "80px",
          padding: "32px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--ink-dim)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span>© 2026 SYED HASNAIN PEERAN</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <a
            href="https://github.com/SyedHasnain04"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--ink-dim)" }}
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/syed-hasnain-peeran/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--ink-dim)" }}
          >
            LINKEDIN
          </a>
          <a href="#top" style={{ color: "var(--accent)" }}>
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </>
  );
}
