"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Send,
  Sparkles,
  Terminal,
  Trophy,
} from "lucide-react";
import { achievements, experiences, projects, skills } from "@/data/portfolio";
import { ContactForm } from "./contact-form";
import { GithubHeatmap, LeetCodeHeatmap } from "./activity-heatmaps";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function Socials() {
  return (
    <div className="socials" aria-label="Social links">
      <a href="mailto:iamsyedhasnain04@gmail.com" aria-label="Email">
        <Mail size={19} />
      </a>
      <a href="https://github.com/Syed8855" target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <Github size={19} />
      </a>
      <a href="https://www.linkedin.com/in/syed-hasnain-peeran/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <Linkedin size={19} />
      </a>
    </div>
  );
}

function Section({
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
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.section
      id={id}
      className="section"
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.5 }}
      variants={reveal}
    >
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      {children}
    </motion.section>
  );
}

function MobileNav() {
  return (
    <details className="mobile-nav">
      <summary aria-label="Open site navigation">Menu</summary>
      <nav aria-label="Mobile navigation">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#competitive">Coding</a>
        <a href="#opensource">Open source</a>
        <a href="#contact">Contact</a>
      </nav>
    </details>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="project-icon">{project.featured ? <Trophy size={18} /> : <Code2 size={18} />}</div>
      </div>
      <p className="project-category">{project.category}</p>
      <h3>{project.name}</h3>
      <p className="project-summary">{project.description}</p>
      <div className="tags">
        {project.stack.map((stackItem) => (
          <span key={stackItem}>{stackItem}</span>
        ))}
      </div>
      <footer>
        <p>{project.outcome}</p>
        <div className="project-links">
          {project.slug === "warehouse-execution-system" && (
            <a href="https://wesoptimizer.streamlit.app/" target="_blank" rel="noreferrer">
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

export function Portfolio() {
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />

      <header className="site-header">
        <a className="brand" href="#top">
          SHP<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#competitive">Coding</a>
          <a href="#opensource">Open source</a>
          <a href="#contact">Contact</a>
        </nav>
        <MobileNav />
        <a className="nav-cta" href="#contact">
          Let&apos;s talk <ChevronRight size={15} />
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? undefined : "visible"}
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.p variants={reveal} className="eyebrow">
              <Sparkles size={15} /> AVAILABLE FOR COLLABORATION
            </motion.p>
            <motion.h1 variants={reveal}>
              Building practical <em>intelligence</em> for real-world systems.
            </motion.h1>
            <motion.p variants={reveal} className="lede">
              I&apos;m <strong>Syed Hasnain Peeran</strong>, a Computer Science (Machine Learning) undergraduate who turns ML concepts into useful products - from warehouse optimization to retrieval-powered applications.
            </motion.p>
            <motion.div variants={reveal} className="hero-actions">
              <a className="button primary" href="#work">
                Explore selected work <ArrowUpRight size={17} />
              </a>
              <a className="button ghost" href="/documents/syed-hasnain-peeran-resume.pdf" download>
                <Download size={17} /> Download resume
              </a>
            </motion.div>
            <motion.div variants={reveal}>
              <Socials />
            </motion.div>
          </motion.div>

          <motion.div
            className="character-wrap"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Image
              className="character"
              src="/images/syed-ml-engineer.png"
              alt="Stylized animated ML engineer character representing Syed Hasnain Peeran"
              width={1024}
              height={1492}
              priority
            />
            <div className="character-badge">
              ML engineer
              <br />
              <span>in progress</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-panel"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="terminal-card">
              <div className="terminal-head">
                <Terminal size={16} /> Systems online
              </div>
              <p>
                focus = [
                <span>&quot;machine learning&quot;</span>,
                <span>&quot;optimization&quot;</span>,
                <span>&quot;useful interfaces&quot;</span>
                ]
              </p>
            </div>
            <div className="status-card">
              <strong>Based in Kurnool, India</strong>
              <span>Available for internships, collaborations, and applied AI work.</span>
            </div>
          </motion.div>
        </section>

        <Section id="about" kicker="01 / ABOUT" title="Curious by nature. Grounded in outcomes.">
          <div className="two-col">
            <div>
              <p>
                I enjoy moving from an ambiguous problem to a system people can actually use. My work spans data preparation, model development, retrieval, and the product layer around the model.
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
        </Section>

        <Section id="work" kicker="02 / SELECTED WORK" title="Applied ML, not just notebooks.">
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </Section>

        <Section id="skills" kicker="03 / TOOLKIT" title="A versatile technical foundation.">
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
        </Section>

        <Section id="competitive" kicker="04 / COMPETITIVE PROGRAMMING" title="Learning through deliberate practice.">
          <div className="activity-grid">
            <LeetCodeHeatmap />
            <div className="activity-card profile-card">
              <div className="activity-title">
                <Send size={19} />
                <div>
                  <h3>SmartInterviews</h3>
                  <a href="https://smartinterviews.in/profile/syed_hasnain33" target="_blank" rel="noreferrer">
                    View problem-solving profile <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
              <p>
                Practice, contests, and structured problem solving are part of how I sharpen core data-structures and algorithmic thinking.
              </p>
              <div className="rank-mini">
                <strong>#6,830</strong>
                <span>Overall score: 27,755</span>
              </div>
            </div>
          </div>
        </Section>

        <Section id="opensource" kicker="05 / OPEN SOURCE" title="Shipping in public.">
          <div className="activity-grid">
            <GithubHeatmap />
          </div>
        </Section>

        <Section id="journey" kicker="06 / JOURNEY" title="Learning in public, building under pressure.">
          <div className="journey-grid">
            <article className="timeline-card">
              <h3>Experience</h3>
              {experiences.map((experience) => (
                <div key={`${experience.company}-${experience.date}`} className="timeline-item">
                  <p>{experience.date}</p>
                  <strong>
                    {experience.role} @ {experience.company}
                  </strong>
                  <span>{experience.detail}</span>
                </div>
              ))}
            </article>
            <article className="timeline-card">
              <h3>Recognition</h3>
              {achievements.map((achievement) => (
                <div key={achievement.title} className="timeline-item">
                  <p>{achievement.meta}</p>
                  <strong>{achievement.title}</strong>
                  <span>{achievement.detail}</span>
                </div>
              ))}
            </article>
          </div>
        </Section>

        <Section id="contact" kicker="07 / CONTACT" title="Have a challenging problem?">
          <div className="contact-grid">
            <div className="contact-copy">
              <p>Let&apos;s make something useful. I&apos;m always interested in ML, AI, and full-stack collaborations.</p>
              <a href="mailto:iamsyedhasnain04@gmail.com" className="email-link">
                iamsyedhasnain04@gmail.com <ArrowUpRight size={16} />
              </a>
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="site-footer">
        <div>Copyright 2026 Syed Hasnain Peeran</div>
        <Socials />
        <a href="#top">Back to top</a>
      </footer>
    </>
  );
}
