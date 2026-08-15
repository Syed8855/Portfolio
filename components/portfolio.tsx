"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Send,
  Trophy,
} from "lucide-react";
import { achievements, experiences, projects } from "@/data/portfolio";
import { ContactForm } from "./contact-form";
import { GithubHeatmap, LeetCodeHeatmap } from "./activity-heatmaps";
import { IntroName } from "./IntroName";
import { SectionHeading } from "./SectionHeading";
import { ToolkitSkillBar } from "./ToolkitSkillBar";
import { SplitScatter } from "./scroll/SplitScatter";

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
        <Mail size={18} />
      </a>
      <a
        href="https://github.com/Syed8855"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        style={{ color: "var(--ink-dim)", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-dim)")}
      >
        <Github size={18} />
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
        <Linkedin size={18} />
      </a>
    </div>
  );
}

/* ─── Navigation ─────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
          padding: "20px 48px",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled
            ? "linear-gradient(to bottom, rgba(6,11,20,0.92), rgba(6,11,20,0.75))"
            : "linear-gradient(to bottom, rgba(6,11,20,0.85), transparent)",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <a
          href="#top"
          className="display"
          style={{
            fontWeight: 600,
            letterSpacing: "0.02em",
            fontSize: "15px",
          }}
        >
          SYED HASNAIN
        </a>

        <div
          className="navlinks"
          style={{
            display: "flex",
            gap: "36px",
            fontSize: "13px",
            color: "var(--ink-dim)",
          }}
        >
          <a
            href="#work"
            style={{ letterSpacing: "0.04em", transition: "color 0.2s" }}
          >
            Work
          </a>
          <a
            href="#about"
            style={{ letterSpacing: "0.04em", transition: "color 0.2s" }}
          >
            About
          </a>
          <a
            href="#toolkit"
            style={{ letterSpacing: "0.04em", transition: "color 0.2s" }}
          >
            Toolkit
          </a>
          <a
            href="#contact"
            style={{ letterSpacing: "0.04em", transition: "color 0.2s" }}
          >
            Contact
          </a>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--ink-dim)",
            border: "1px solid var(--line)",
            padding: "6px 14px",
            borderRadius: "100px",
            background: "rgba(11,21,38,0.4)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
            }}
          />
          AVAILABLE FOR COLLABORATION
        </div>
      </nav>
    </>
  );
}

/* ─── Hero Section with Scatter ──────────────────────────────── */

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      id="top"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "140px 0 80px",
        position: "relative",
      }}
    >
      <div className="wrap">
        <div
          className="mono"
          style={{
            fontSize: "12px",
            letterSpacing: "0.18em",
            color: "var(--accent-2)",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: "24px",
              height: "1px",
              background: "var(--accent-2)",
              display: "inline-block",
            }}
          />
          ML ENGINEER · BUILDER · PROBLEM SOLVER
        </div>

        <h1
          className="display"
          style={{
            fontSize: "clamp(48px, 9vw, 118px)",
            fontWeight: 700,
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ display: "block" }}>
            <SplitScatter
              text="BUILDING"
              as="span"
              mode="scatter-out"
              triggerRef={heroRef}
              start="top top"
              end="+=90%"
              scrub={0.6}
            />
          </span>
          <span style={{ display: "block" }}>
            <SplitScatter
              text="PRACTICAL"
              as="span"
              mode="scatter-out"
              triggerRef={heroRef}
              start="top top"
              end="+=90%"
              scrub={0.6}
            />{" "}
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 600,
                color: "var(--accent)",
              }}
            >
              <SplitScatter
                text="intelligence."
                as="span"
                mode="scatter-out"
                triggerRef={heroRef}
                start="top top"
                end="+=90%"
                scrub={0.6}
              />
            </span>
          </span>
        </h1>

        <p
          style={{
            marginTop: "34px",
            fontSize: "17px",
            color: "var(--ink-dim)",
            maxWidth: "520px",
            lineHeight: 1.6,
          }}
        >
          for real-world systems — from data preparation and model development
          to retrieval and the product layer around the model.
        </p>

        <div style={{ display: "flex", gap: "16px", marginTop: "44px" }}>
          <a href="#work" className="btn btn-primary">
            Explore Work →
          </a>
          <a
            href="/documents/syed-hasnain-peeran-resume.pdf"
            download
            className="btn btn-ghost"
          >
            <Download size={15} /> Resume
          </a>
        </div>
      </div>

      <div
        className="mono"
        style={{
          position: "absolute",
          bottom: "40px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          color: "var(--ink-dim)",
          letterSpacing: "0.06em",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <span>KURNOOL, INDIA</span>
        <span>01 / INTRO</span>
      </div>
    </section>
  );
}

/* ─── Main Portfolio Component ───────────────────────────────── */

export function Portfolio() {
  return (
    <>
      <Navbar />

      <main>
        {/* Pinned 100vh Intro Name Screen */}
        <IntroName />

        {/* Hero Section */}
        <Hero />

        {/* 01 / ABOUT */}
        <section id="about">
          <div className="wrap">
            <SectionHeading
              num="01 / ABOUT"
              title="Curious by nature. Grounded in outcomes."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "64px",
                alignItems: "start",
                marginTop: "48px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: "16px",
                    lineHeight: 1.75,
                    maxWidth: "520px",
                  }}
                >
                  I enjoy moving from an ambiguous problem to a system people
                  can actually use. My work spans data preparation, model
                  development, retrieval, and the product layer around the
                  model.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "40px",
                    marginTop: "40px",
                  }}
                >
                  <div>
                    <div
                      className="display"
                      style={{
                        fontSize: "34px",
                        fontWeight: 700,
                        color: "var(--accent-2)",
                      }}
                    >
                      8.74
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: "11px",
                        color: "var(--ink-dim)",
                        marginTop: "4px",
                      }}
                    >
                      CGPA / 10
                    </div>
                  </div>
                  <div>
                    <div
                      className="display"
                      style={{
                        fontSize: "34px",
                        fontWeight: 700,
                        color: "var(--accent-2)",
                      }}
                    >
                      2023
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: "11px",
                        color: "var(--ink-dim)",
                        marginTop: "4px",
                      }}
                    >
                      STARTED B.TECH
                    </div>
                  </div>
                  <div>
                    <div
                      className="display"
                      style={{
                        fontSize: "34px",
                        fontWeight: 700,
                        color: "var(--accent-2)",
                      }}
                    >
                      2026
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: "11px",
                        color: "var(--ink-dim)",
                        marginTop: "4px",
                      }}
                    >
                      DATATHON WINNER
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <GraduationCap size={22} color="var(--accent)" />
                  <div style={{ fontWeight: 600, fontSize: "15px" }}>
                    B.Tech, Computer Science & Engineering (Machine Learning)
                  </div>
                </div>
                <div
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    paddingLeft: "34px",
                  }}
                >
                  G. Pulla Reddy Engineering College, Kurnool
                  <br />
                  Aug 2023 — Present
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / SELECTED WORK */}
        <section id="work">
          <div className="wrap">
            <SectionHeading
              num="02 / SELECTED WORK"
              title="Applied ML, not just notebooks."
            />

            <div style={{ marginTop: "40px" }}>
              {projects.map((project, i) => (
                <article
                  key={project.slug}
                  style={{
                    borderTop: "1px solid var(--line)",
                    borderBottom:
                      i === projects.length - 1
                        ? "1px solid var(--line)"
                        : undefined,
                    padding: "40px 0",
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 220px",
                    gap: "32px",
                    alignItems: "start",
                    transition: "background 0.3s",
                  }}
                >
                  <div
                    className="mono"
                    style={{ color: "var(--ink-dim)", fontSize: "13px" }}
                  >
                    0{i + 1}
                  </div>

                  <div>
                    <span
                      className="mono"
                      style={{
                        fontSize: "10px",
                        color: "var(--accent-2)",
                        letterSpacing: "0.08em",
                        marginBottom: "10px",
                        display: "block",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.category}
                    </span>

                    <h3
                      className="display"
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        marginBottom: "10px",
                      }}
                    >
                      {project.name}
                    </h3>

                    <p
                      style={{
                        color: "var(--ink-dim)",
                        fontSize: "14.5px",
                        lineHeight: 1.6,
                        maxWidth: "480px",
                      }}
                    >
                      {project.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginTop: "16px",
                      }}
                    >
                      {project.stack.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      alignItems: "flex-end",
                    }}
                  >
                    {project.slug === "warehouse-execution-system" && (
                      <a
                        href="https://wesoptimizer.streamlit.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="mono"
                        style={{
                          fontSize: "12px",
                          color: "var(--ink-dim)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Live demo <ArrowUpRight size={13} />
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="mono"
                      style={{
                        fontSize: "12px",
                        color: "var(--accent-2)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      Project story →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 / TOOLKIT */}
        <section id="toolkit">
          <div className="wrap">
            <SectionHeading
              num="03 / TOOLKIT"
              title="A versatile technical foundation."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1px",
                background: "var(--line)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                marginTop: "40px",
              }}
            >
              {/* Languages */}
              <div style={{ background: "var(--bg-2)", padding: "28px 24px" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    marginBottom: "18px",
                  }}
                >
                  LANGUAGES
                </div>
                <ToolkitSkillBar name="Python" level={92} />
                <ToolkitSkillBar name="SQL" level={78} />
              </div>

              {/* AI / ML */}
              <div style={{ background: "var(--bg-2)", padding: "28px 24px" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    marginBottom: "18px",
                  }}
                >
                  AI / ML
                </div>
                <ToolkitSkillBar name="Machine Learning" level={88} />
                <ToolkitSkillBar name="RAG" level={72} />
                <ToolkitSkillBar name="Computer Vision" level={75} />
                <ToolkitSkillBar name="LLM Fundamentals" level={65} />
              </div>

              {/* WEB */}
              <div style={{ background: "var(--bg-2)", padding: "28px 24px" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    marginBottom: "18px",
                  }}
                >
                  WEB
                </div>
                <ToolkitSkillBar name="Flask / Django" level={60} />
                <ToolkitSkillBar name="React" level={55} />
                <ToolkitSkillBar name="Node.js / Express" level={50} />
              </div>

              {/* TOOLS */}
              <div style={{ background: "var(--bg-2)", padding: "28px 24px" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    marginBottom: "18px",
                  }}
                >
                  TOOLS
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {["Git / GitHub", "Linux", "Jupyter", "VS Code", "FAISS"].map(
                    (t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 / COMPETITIVE PROGRAMMING */}
        <section id="competitive">
          <div className="wrap">
            <SectionHeading
              num="04 / PROBLEM SOLVING"
              title="Learning through deliberate practice."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "32px",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  padding: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className="display"
                    style={{ fontSize: "18px", fontWeight: 600 }}
                  >
                    LeetCode Submissions
                  </div>
                  <a
                    href="https://leetcode.com/u/iamhasnain04/"
                    target="_blank"
                    rel="noreferrer"
                    className="mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--accent-2)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    iamhasnain04 <ArrowUpRight size={12} />
                  </a>
                </div>
                <LeetCodeHeatmap />
              </div>

              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Send size={18} color="var(--accent)" />
                      <div
                        className="display"
                        style={{ fontSize: "18px", fontWeight: 600 }}
                      >
                        SmartInterviews
                      </div>
                    </div>
                    <a
                      href="https://smartinterviews.in/profile/syed_hasnain33"
                      target="_blank"
                      rel="noreferrer"
                      className="mono"
                      style={{
                        fontSize: "11px",
                        color: "var(--accent-2)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Profile <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--ink-dim)",
                      lineHeight: 1.6,
                    }}
                  >
                    Practice, contests, and structured problem solving are part of
                    how I sharpen core data-structures and algorithmic thinking.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--line)",
                    paddingTop: "18px",
                    marginTop: "24px",
                  }}
                >
                  <div>
                    <div
                      className="display"
                      style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "var(--accent-2)",
                      }}
                    >
                      #6,830
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: "11px", color: "var(--ink-dim)" }}
                    >
                      GLOBAL RANK
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      className="display"
                      style={{ fontSize: "24px", fontWeight: 700 }}
                    >
                      27,755
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: "11px", color: "var(--ink-dim)" }}
                    >
                      OVERALL SCORE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 / OPEN SOURCE */}
        <section id="opensource">
          <div className="wrap">
            <SectionHeading
              num="05 / OPEN SOURCE"
              title="Shipping in public."
            />

            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                padding: "28px",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="display"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  GitHub Contributions
                </div>
                <a
                  href="https://github.com/Syed8855"
                  target="_blank"
                  rel="noreferrer"
                  className="mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--accent-2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  github.com/Syed8855 <ArrowUpRight size={12} />
                </a>
              </div>
              <GithubHeatmap />
            </div>
          </div>
        </section>

        {/* 06 / JOURNEY */}
        <section id="journey">
          <div className="wrap">
            <SectionHeading
              num="06 / JOURNEY"
              title="Learning in public, building under pressure."
            />

            <div
              style={{
                borderLeft: "1px solid var(--line)",
                paddingLeft: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "36px",
                marginTop: "44px",
                marginLeft: "8px",
              }}
            >
              {experiences.map((exp, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "-37px",
                      top: "6px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      boxShadow: "0 0 0 4px rgba(79,140,255,0.15)",
                    }}
                  />
                  <div
                    className="mono"
                    style={{
                      fontSize: "11.5px",
                      color: "var(--accent-2)",
                      marginBottom: "6px",
                    }}
                  >
                    {exp.date.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      marginBottom: "4px",
                    }}
                  >
                    {exp.role} @ {exp.company}
                  </div>
                  <p
                    style={{
                      color: "var(--ink-dim)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      maxWidth: "520px",
                    }}
                  >
                    {exp.detail}
                  </p>
                </div>
              ))}

              {achievements.map((ach, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "-37px",
                      top: "6px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: "var(--warm)",
                      boxShadow: "0 0 0 4px rgba(255,180,84,0.15)",
                    }}
                  />
                  <div
                    className="mono"
                    style={{
                      fontSize: "11.5px",
                      color: "var(--warm)",
                      marginBottom: "6px",
                    }}
                  >
                    {ach.meta.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      marginBottom: "4px",
                    }}
                  >
                    {ach.title}
                  </div>
                  <p
                    style={{
                      color: "var(--ink-dim)",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      maxWidth: "520px",
                    }}
                  >
                    {ach.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 / CONTACT */}
        <section id="contact">
          <div className="wrap">
            <SectionHeading
              num="07 / CONTACT"
              title="Have a challenging problem? Let's make something useful."
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                alignItems: "start",
                marginTop: "40px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "var(--ink-dim)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  I&apos;m always interested in ML, AI, and full-stack
                  collaborations. Whether you have an ambiguous problem or a
                  concrete system in mind, let&apos;s connect.
                </p>

                <a
                  href="mailto:iamsyedhasnain04@gmail.com"
                  className="mono"
                  style={{
                    color: "var(--accent-2)",
                    fontSize: "15px",
                    borderBottom: "1px solid var(--line)",
                    paddingBottom: "4px",
                    display: "inline-block",
                  }}
                >
                  iamsyedhasnain04@gmail.com
                </a>
              </div>

              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  padding: "28px",
                }}
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--line)",
          marginTop: "100px",
          padding: "32px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "11.5px",
          color: "var(--ink-dim)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span>© 2026 SYED HASNAIN PEERAN</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <a
            href="https://github.com/Syed8855"
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
          <a href="#top" style={{ color: "var(--accent-2)" }}>
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </>
  );
}
