"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
import { achievements, experiences, projects, skills } from "@/data/portfolio";
import { ContactForm } from "./contact-form";
import { GithubHeatmap, LeetCodeHeatmap } from "./activity-heatmaps";
import { useState, useEffect, useRef } from "react";

/* ─── Animations ─────────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Shared Components ──────────────────────────────────────── */

function Socials() {
  return (
    <div className="socials" aria-label="Social links">
      <a href="mailto:iamsyedhasnain04@gmail.com" aria-label="Email">
        <Mail size={18} />
      </a>
      <a
        href="https://github.com/Syed8855"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <Github size={18} />
      </a>
      <a
        href="https://www.linkedin.com/in/syed-hasnain-peeran/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin size={18} />
      </a>
    </div>
  );
}

function SectionBlock({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.section
      id={id}
      className="section"
      style={{ maxWidth: 1240, margin: "auto", padding: "112px 32px", borderTop: "1px solid var(--line)" }}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
      variants={reveal}
    >
      <p className="eyebrow" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 18, textTransform: "uppercase" }}>
        {kicker}
      </p>
      <h2 style={{ fontSize: "clamp(34px, 4.5vw, 59px)", letterSpacing: "-0.055em", lineHeight: 1.06, marginBottom: 52 }}>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          background: scrolled ? "rgba(5,5,5,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <a href="#top" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          SYED HASNAIN
        </a>

        {/* desktop */}
        <nav className="desktop-nav" aria-label="Primary" style={{ display: "flex", gap: 28, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted)" }}>
          <a href="#work" style={{ transition: "color 0.2s" }}>Work</a>
          <a href="#about" style={{ transition: "color 0.2s" }}>About</a>
          <a href="#contact" style={{ transition: "color 0.2s" }}>Contact</a>
        </nav>

        {/* mobile toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{ display: "none", background: "none", border: "none", color: "var(--ink)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          MENU
        </button>
      </header>

      {/* full-screen mobile overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed", inset: 0, background: "var(--bg-primary)", zIndex: 1000,
            display: "flex", flexDirection: "column", padding: "20px 32px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 64 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>SYED HASNAIN</span>
            <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: "var(--ink)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              CLOSE
            </button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              ["#work", "WORK"],
              ["#about", "ABOUT"],
              ["#competitive", "CODING"],
              ["#opensource", "OPEN SOURCE"],
              ["#contact", "CONTACT"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "clamp(32px, 8vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, transition: "color 0.2s" }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div style={{ marginTop: "auto", paddingBottom: 40 }}>
            <Socials />
          </div>
        </motion.div>
      )}
    </>
  );
}

/* ─── Hero with parallax scroll dispersal ────────────────────── */

function Hero() {
  const reduced = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Each line moves in a different direction as you scroll
  const line1X = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const line2X = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const line3X = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={heroRef}
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: 100,
        paddingBottom: 80,
      }}
    >
      {/* subtle gradient orb */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900,
        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* grain overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat", opacity: 0.5, pointerEvents: "none", zIndex: 1,
      }} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 6vw", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", alignItems: "center", gap: 40 }}>
        {/* Left: Text */}
        <motion.div
          style={{ opacity: heroOpacity }}
          initial={reduced ? false : "hidden"}
          animate={reduced ? undefined : "visible"}
          variants={stagger}
        >
          {/* Availability badge */}
          <motion.div
            variants={reveal}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em",
              color: "var(--accent)", textTransform: "uppercase", marginBottom: 32,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }} />
            AVAILABLE FOR COLLABORATION
          </motion.div>

          {/* Main headline - each line moves differently on scroll */}
          <div style={{ overflow: "visible" }}>
            <motion.div variants={reveal} style={{ x: reduced ? 0 : line1X }}>
              <span style={{ fontSize: "var(--text-hero)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.04em", display: "block", textTransform: "uppercase" }}>
                BUILDING
              </span>
            </motion.div>
            <motion.div variants={reveal} style={{ x: reduced ? 0 : line2X }}>
              <span style={{ fontSize: "var(--text-hero)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.04em", display: "block", textTransform: "uppercase" }}>
                PRACTICAL
              </span>
            </motion.div>
            <motion.div variants={reveal} style={{ x: reduced ? 0 : line3X }}>
              <span style={{
                fontSize: "var(--text-hero)", fontWeight: 300, lineHeight: 0.95,
                letterSpacing: "-0.04em", display: "block", textTransform: "uppercase",
                fontStyle: "italic",
                background: "linear-gradient(120deg, #fff, var(--accent))",
                backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent",
              }}>
                INTELLIGENCE.
              </span>
            </motion.div>
          </div>

          {/* subtitle */}
          <motion.p
            variants={reveal}
            style={{
              y: reduced ? 0 : subtitleY,
              color: "var(--muted)", fontSize: 18, maxWidth: 420,
              marginTop: 32, marginBottom: 40, lineHeight: 1.6,
            }}
          >
            for real-world systems.
          </motion.p>

          {/* Descriptor */}
          <motion.p
            variants={reveal}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em",
              color: "var(--muted)", textTransform: "uppercase", marginBottom: 32,
            }}
          >
            ML ENGINEER &middot; BUILDER &middot; PROBLEM SOLVER
          </motion.p>

          {/* CTAs */}
          <motion.div variants={reveal} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#work" className="btn btn-primary">
              Explore Work <ArrowUpRight size={16} />
            </a>
            <a href="/documents/syed-hasnain-peeran-resume.pdf" download className="btn">
              <Download size={16} /> Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Character Visual */}
        <motion.div
          style={{
            position: "relative", alignSelf: "end",
            scale: reduced ? 1 : imageScale,
            y: reduced ? 0 : imageY,
            opacity: heroOpacity,
          }}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
        >
          <div style={{
            position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)",
            width: "140%", height: "60%",
            background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none",
          }} />
          <Image
            src="/images/syed-ml-engineer.png"
            alt="Stylized ML engineer character representing Syed Hasnain Peeran"
            width={1024}
            height={1492}
            priority
            style={{
              width: "100%", height: "auto", maxHeight: "70vh",
              objectFit: "contain",
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))",
              position: "relative", zIndex: 1,
            }}
          />
          <div style={{
            position: "absolute", right: 0, bottom: "22%",
            padding: "10px 14px", border: "1px solid var(--line)",
            borderRadius: 8, background: "rgba(5,5,5,0.8)",
            backdropFilter: "blur(12px)",
            fontFamily: "var(--font-mono)", fontSize: 11, color: "#c9daff",
          }}>
            ML engineer<br /><span style={{ color: "#45d984" }}>in progress</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Project Card ───────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="project-icon">
          {project.featured ? <Trophy size={18} /> : <Code2 size={18} />}
        </div>
      </div>
      <p className="project-category">{project.category}</p>
      <h3>{project.name}</h3>
      <p className="project-summary">{project.description}</p>
      <div className="tags">
        {project.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <footer>
        <p>{project.outcome}</p>
        <div className="project-links">
          {project.slug === "warehouse-execution-system" && (
            <a
              href="https://wesoptimizer.streamlit.app/"
              target="_blank"
              rel="noreferrer"
            >
              Live demo <ArrowUpRight size={15} />
            </a>
          )}
          <Link href={`/projects/${project.slug}`}>
            Project story <ArrowUpRight size={15} />
          </Link>
        </div>
      </footer>
    </article>
  );
}

/* ─── Main Portfolio ─────────────────────────────────────────── */

export function Portfolio() {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <>
      <motion.div
        className="progress"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--accent), #6C63FF)",
          height: 3,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          transformOrigin: "left",
        }}
      />

      <Navbar />

      <main>
        <Hero />

        {/* About */}
        <SectionBlock id="about" kicker="01 / ABOUT" title="Curious by nature. Grounded in outcomes.">
          <div className="two-col">
            <div>
              <p>
                I enjoy moving from an ambiguous problem to a system people can
                actually use. My work spans data preparation, model development,
                retrieval, and the product layer around the model.
              </p>
              <div className="stat-row">
                <div>
                  <strong>8.74</strong>
                  <span>CGPA / 10</span>
                </div>
                <div>
                  <strong>2023</strong>
                  <span>Started B.Tech</span>
                </div>
                <div>
                  <strong>2026</strong>
                  <span>Datathon winner</span>
                </div>
              </div>
            </div>
            <div className="education-card">
              <GraduationCap size={20} />
              <div>
                <strong>B.Tech, Computer Science &amp; Engineering (Machine Learning)</strong>
                <p>G. Pulla Reddy Engineering College, Kurnool - Aug 2023 to Present</p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* Work */}
        <SectionBlock id="work" kicker="02 / SELECTED WORK" title="Applied ML, not just notebooks.">
          <div className="project-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </SectionBlock>

        {/* Toolkit */}
        <SectionBlock id="skills" kicker="03 / TOOLKIT" title="A versatile technical foundation.">
          <div className="skill-grid">
            {skills.map(([label, items]) => (
              <article key={label} className="skill-card">
                <h3>{label}</h3>
                <div>
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionBlock>

        {/* Competitive */}
        <SectionBlock id="competitive" kicker="04 / COMPETITIVE PROGRAMMING" title="Learning through deliberate practice.">
          <div className="activity-grid">
            <LeetCodeHeatmap />
            <div className="activity-card profile-card">
              <div className="activity-title">
                <Send size={19} />
                <div>
                  <h3>SmartInterviews</h3>
                  <a
                    href="https://smartinterviews.in/profile/syed_hasnain33"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View problem-solving profile <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
              <p>
                Practice, contests, and structured problem solving are part of how I
                sharpen core data-structures and algorithmic thinking.
              </p>
              <div className="rank-mini">
                <strong>#6,830</strong>
                <span>Overall score: 27,755</span>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* Open Source */}
        <SectionBlock id="opensource" kicker="05 / OPEN SOURCE" title="Shipping in public.">
          <div className="activity-grid">
            <GithubHeatmap />
          </div>
        </SectionBlock>

        {/* Journey */}
        <SectionBlock id="journey" kicker="06 / JOURNEY" title="Learning in public, building under pressure.">
          <div className="journey-grid">
            <article className="timeline-card">
              <h3>Experience</h3>
              {experiences.map((exp) => (
                <div key={`${exp.company}-${exp.date}`} className="timeline-item">
                  <p>{exp.date}</p>
                  <strong>
                    {exp.role} @ {exp.company}
                  </strong>
                  <span>{exp.detail}</span>
                </div>
              ))}
            </article>
            <article className="timeline-card">
              <h3>Recognition</h3>
              {achievements.map((ach) => (
                <div key={ach.title} className="timeline-item">
                  <p>{ach.meta}</p>
                  <strong>{ach.title}</strong>
                  <span>{ach.detail}</span>
                </div>
              ))}
            </article>
          </div>
        </SectionBlock>

        {/* Contact */}
        <SectionBlock id="contact" kicker="07 / CONTACT" title="Have a challenging problem?">
          <div className="contact-grid">
            <div className="contact-copy">
              <p>
                Let&apos;s make something useful. I&apos;m always interested in
                ML, AI, and full-stack collaborations.
              </p>
              <a href="mailto:iamsyedhasnain04@gmail.com" className="email-link">
                iamsyedhasnain04@gmail.com <ArrowUpRight size={16} />
              </a>
            </div>
            <ContactForm />
          </div>
        </SectionBlock>
      </main>

      <footer className="site-footer">
        <div>Copyright 2026 Syed Hasnain Peeran</div>
        <Socials />
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}
