# Portfolio UI Redesign — Existing Website

## ROLE

You are a **Senior Product Designer, Creative Frontend Engineer, Motion Designer, and Design Systems Architect** specializing in high-end developer and engineering portfolios.

You have experience creating websites inspired by premium digital studios, Awwwards-level websites, Vercel, Stripe, Linear, and editorial portfolio experiences such as TRIONN.

Your task is **NOT to rebuild my portfolio from scratch**.

Your task is to **redesign the UI/UX of my existing portfolio while preserving its existing functionality, content, routes, integrations, and technical behavior**.

---

# EXISTING WEBSITE

The current portfolio is already deployed:

**https://syed-hasnain-portfolio-opal.vercel.app/**

The current website already contains:

- Hero
- About
- Selected Work
- Toolkit
- Competitive Programming
- Open Source
- Journey / Experience
- Recognition
- Contact

It already contains real project information, GitHub links, project stories, resume functionality, competitive programming information, GitHub contribution data, and contact functionality.

Do NOT remove these capabilities.

---

# DESIGN REFERENCE

Use:

**https://trionn.com/**

as a **design and interaction reference only**.

Do NOT copy:

- Their branding
- Their exact layouts
- Their colors
- Their text
- Their assets
- Their proprietary visual identity

Instead, study and adapt the following principles:

- Editorial layouts
- Large typography
- Strong whitespace
- Minimal navigation
- Premium project presentation
- Asymmetric layouts
- Intentional motion
- Strong visual hierarchy
- Large visual compositions
- Scroll-based storytelling
- Subtle interactions
- High-quality transitions
- Clear content hierarchy

The result must feel like **Syed Hasnain's portfolio**, not a TRIONN clone.

---

# PRIMARY OBJECTIVE

Transform the existing portfolio from:

> "A well-designed developer resume website"

into:

> "A premium interactive engineering portfolio that tells the story behind the work."

The website should communicate:

**I don't just build projects. I understand problems, design systems, implement solutions, and learn from them.**

---

# IMPORTANT — PRESERVE EXISTING FUNCTIONALITY

Before modifying anything:

1. Inspect the existing codebase.
2. Understand the current architecture.
3. Identify all pages and routes.
4. Identify reusable components.
5. Identify existing data sources.
6. Identify GitHub/API integrations.
7. Identify forms.
8. Identify animations.
9. Identify external links.
10. Identify project detail pages.
11. Identify responsive behavior.

Do NOT unnecessarily rewrite working functionality.

Do NOT replace working integrations with static mock data.

Do NOT remove existing content.

Do NOT break:

- GitHub links
- Project links
- Resume download
- Contact form
- LeetCode links
- SmartInterviews links
- GitHub contribution data
- Project story routes
- Mobile navigation
- Existing API functionality

---

# DESIGN DIRECTION

## Overall Style

Create a:

- Dark-first
- Editorial
- Minimal
- Premium
- Technical
- Typography-driven
- Motion-rich
- High-whitespace

experience.

The portfolio should feel closer to a **digital engineering publication / creative developer portfolio** than a conventional resume.

---

# SECTION 1 — NAVIGATION

Redesign the current navbar.

Desktop:

```text
SYED HASNAIN                         WORK   ABOUT   CONTACT
```

Keep it minimal.

Optional:

```text
● AVAILABLE FOR COLLABORATION
```

Behavior:

- Fixed/sticky
- Transparent at page top
- Subtle backdrop blur after scrolling
- Smooth transitions
- Minimal height
- Strong typography
- No excessive borders

Mobile:

```text
SYED HASNAIN                         MENU
```

Clicking MENU should open a premium full-screen navigation overlay.

Navigation:

```text
WORK
ABOUT
CODING
OPEN SOURCE
CONTACT
GITHUB
LINKEDIN
RESUME
```

---

# SECTION 2 — HERO REDESIGN

The existing hero already communicates the ML-engineering positioning.

Preserve the content but dramatically improve its visual presentation.

Current positioning:

> Building practical intelligence for real-world systems.

Keep the underlying message but make it visually dominant.

Recommended composition:

```text
AVAILABLE FOR COLLABORATION

BUILDING
PRACTICAL
INTELLIGENCE.

for real-world systems.

ML ENGINEER · BUILDER · PROBLEM SOLVER

[ EXPLORE WORK ↓ ]    [ RESUME ↗ ]
```

Use extremely large typography.

Desktop hero heading:

```text
clamp(64px, 9vw, 160px)
```

Do not use giant text if it causes layout problems.

The hero should occupy approximately:

```text
85–100vh
```

---

# SECTION 3 — HERO VISUAL

The existing animated ML engineer illustration should NOT automatically be removed.

Instead:

- Integrate it into the composition
- Give it more breathing room
- Reduce visual clutter around it
- Use subtle parallax
- Add a soft ambient glow
- Add subtle grain/noise
- Make it feel like part of the brand

Possible composition:

```text
LEFT

BUILDING
PRACTICAL
INTELLIGENCE.

RIGHT

[ ML ENGINEER VISUAL ]
```

On mobile:

```text
BUILDING
PRACTICAL
INTELLIGENCE.

[ VISUAL ]

ML ENGINEER
```

---

# SECTION 4 — ABOUT

The existing About section contains:

- CGPA
- Education
- Datathon
- ML engineering background

Do not remove this information.

Redesign it as an editorial statement.

Example:

```text
01 / ABOUT

CURIOUS BY NATURE.
GROUNDED IN OUTCOMES.

I enjoy moving from an ambiguous problem
to a system people can actually use.
```

Then create a small information block:

```text
EDUCATION
B.Tech — CSE (Machine Learning)

G. Pulla Reddy Engineering College

2023 — PRESENT
```

And statistics:

```text
8.74 / 10
CGPA

2023
STARTED B.TECH

2026
DATATHON WINNER
```

Use typography and whitespace instead of conventional cards.

---

# SECTION 5 — SELECTED WORK

This should become the visual centerpiece of the website.

The current projects are:

- Warehouse Execution System Optimization
- EcoBazarX
- Library RAG System
- Image Similarity Search

Do not display them as ordinary equal-sized cards.

Use large editorial project sections.

---

## Project 01

```text
01

AI / OPTIMIZATION

WAREHOUSE
EXECUTION SYSTEM
OPTIMIZATION

A decision-support system combining
productivity prediction, SKU clustering,
and quantum-inspired order sequencing.

[ EXPLORE PROJECT → ]

[ LARGE PROJECT VISUAL ]
```

---

## Project 02

Reverse the composition:

```text
[ LARGE PROJECT VISUAL ]

02

FULL STACK

ECOBAZARX

A sustainable e-commerce platform
for environmentally responsible alternatives.

[ EXPLORE PROJECT → ]
```

---

## Project 03

Use a full-width visual:

```text
03

AI / RAG

LIBRARY RAG SYSTEM

[ LARGE FULL-WIDTH VISUAL ]

Intelligent book search and
grounded questions over library data.

[ EXPLORE PROJECT → ]
```

---

## Project 04

Use an asymmetric layout:

```text
04

COMPUTER VISION

IMAGE SIMILARITY SEARCH

[ VISUAL ]

CNN feature extraction + FAISS
nearest-neighbor retrieval.
```

---

# PROJECT HOVER EFFECT

When hovering over a project:

1. Image scale: `1 → 1.04`
2. Project title moves slightly
3. Arrow rotates
4. Cursor becomes a circular `VIEW`
5. Background subtly changes
6. Project metadata becomes more prominent

Example cursor:

```text
      ┌─────────┐
      │  VIEW ↗ │
      └─────────┘
```

Keep the animation between:

```text
200–400ms
```

Do not create distracting effects.

---

# SECTION 6 — PROJECT DETAIL PAGES

This is the most important redesign.

When clicking:

```text
EXPLORE PROJECT →
```

the user should enter an **interactive engineering case study**.

Do NOT simply display:

```text
Project
Description
Tech Stack
GitHub
```

Instead structure the page:

```text
PROJECT HERO
      ↓
WHY THIS PROJECT
      ↓
PROBLEM
      ↓
APPROACH
      ↓
ARCHITECTURE
      ↓
INPUT → PROCESSING → OUTPUT
      ↓
FEATURES
      ↓
ENGINEERING DECISIONS
      ↓
CHALLENGES
      ↓
RESULTS
      ↓
KEY LEARNINGS
      ↓
FUTURE IMPROVEMENTS
```

---

# PROJECT CONTENT SOURCE

The existing project information should be preserved.

However, when improving project pages, use the project's actual GitHub repository as the source of truth.

For every project:

1. Analyze the repository.
2. Analyze README.
3. Analyze source code.
4. Analyze folder structure.
5. Analyze dependencies.
6. Analyze API routes.
7. Analyze database.
8. Analyze model architecture if applicable.
9. Analyze deployment configuration.
10. Analyze tests.
11. Analyze commit history where available.

Do not invent features.

Do not invent metrics.

Do not claim technologies that are not actually used.

---

# PROJECT HERO

Create:

```text
BREATHEWISH

AI-powered pneumonia detection
for chest X-ray analysis.

AI / COMPUTER VISION / ML

ROLE
Developer

YEAR
2026

[ LIVE DEMO ↗ ]
[ GITHUB ↗ ]
```

Use a large project visual.

---

# WHY THIS PROJECT

Create a large editorial section:

```text
WHY THIS PROJECT?

What problem made this worth building?
```

Explain:

- Motivation
- Real-world problem
- Target users
- Existing limitations
- Why the project matters

The writing should be professional engineering literature.

---

# PROBLEM STATEMENT

Create a large typographic section:

```text
THE PROBLEM

Existing workflows can be:

SLOW
COMPLEX
RESOURCE-INTENSIVE
```

Then explain the actual problem based on repository/project evidence.

---

# SOLUTION

Show:

```text
THE APPROACH

INPUT
   ↓
PROCESSING
   ↓
MODEL / LOGIC
   ↓
RESULT
```

Use visual storytelling rather than a wall of text.

---

# ARCHITECTURE ANIMATION

Create an interactive architecture diagram based on the actual repository.

Example:

```text
USER
 ↓
FRONTEND
 ↓
API
 ↓
BACKEND
 ↓
BUSINESS LOGIC
 ↓
DATABASE
 ↓
MODEL
 ↓
OUTPUT
```

Animate a small particle moving between components.

When the user hovers a component:

```text
BACKEND

Responsible for:
Request handling
Business logic
Model orchestration
```

Architecture should be generated from actual project implementation.

---

# INPUT → PROCESSING → OUTPUT

Create a signature interactive animation.

Example:

```text
INPUT
   ↓
VALIDATION
   ↓
PREPROCESSING
   ↓
PROCESSING
   ↓
MODEL / BUSINESS LOGIC
   ↓
POSTPROCESSING
   ↓
OUTPUT
```

Each step should become highlighted as the user scrolls.

Show:

- What happens
- Why it happens
- Technology involved

On mobile, convert the flow into a vertical timeline.

---

# FEATURES

Do not create a huge grid of tiny cards.

Instead use large feature sections.

Each feature:

```text
FEATURE

Name

Short professional description.

Technical implementation.

[ SCREENSHOT ]
```

---

# TECHNOLOGY STACK

Replace the existing toolkit-style badge presentation for project pages.

Use categories:

```text
FRONTEND
Next.js · React · TypeScript

BACKEND
FastAPI · Flask · Node.js

AI / ML
PyTorch · TensorFlow · FAISS

DATABASE
PostgreSQL · MongoDB

INFRASTRUCTURE
Docker · AWS · Vercel
```

Only display technologies actually used by that project.

---

# ENGINEERING DECISIONS

Create an editorial section:

```text
ENGINEERING DECISIONS

WHY THIS ARCHITECTURE?

WHY THIS MODEL?

WHY THIS DATABASE?

WHY THIS FRAMEWORK?
```

Each explanation must be grounded in repository evidence.

If something is inferred, explicitly identify it as an inference.

---

# CHALLENGES

Use:

```text
THE CHALLENGE
        ↓
WHAT I TRIED
        ↓
WHAT FAILED
        ↓
WHAT WORKED
```

This is more compelling than a generic "Challenges" card.

---

# KEY LEARNINGS

Create a large visual section:

```text
KEY LEARNINGS

01
SYSTEM DESIGN

02
PERFORMANCE

03
AI / ML

04
DEBUGGING

05
PRODUCT THINKING
```

Each learning should have a concise explanation.

Avoid generic statements.

---

# RESULTS

Only use verified metrics.

If metrics exist:

```text
95%
ACCURACY

40%
LATENCY IMPROVEMENT

10K+
REQUESTS
```

If metrics do not exist, do not fabricate them.

Use qualitative outcomes instead.

---

# FUTURE

Create:

```text
WHAT'S NEXT?

01
Scale the architecture

02
Improve performance

03
Add monitoring

04
Improve UX

05
Expand functionality
```

---

# SECTION 7 — TOOLKIT

The current toolkit section should remain.

However, redesign it from a conventional skill list into an editorial technical foundation.

Instead of:

```text
Python
SQL
React
Node.js
...
```

Use:

```text
03 / TOOLKIT

A VERSATILE
TECHNICAL FOUNDATION.

I work across:

AI / ML
WEB
SYSTEMS
DATA
TOOLS
```

Clicking/hovering each category reveals technologies.

Example:

```text
AI / ML

Machine Learning
LLM Fundamentals
RAG
Clustering
Computer Vision
```

---

# SECTION 8 — COMPETITIVE PROGRAMMING

Keep:

- LeetCode
- SmartInterviews
- Current statistics

But reduce the visual dominance.

The purpose is to demonstrate problem-solving ability, not make the site look like a competitive-programming dashboard.

Use:

```text
04 / PROBLEM SOLVING

LEARNING THROUGH
DELIBERATE PRACTICE.
```

Then display the statistics in a minimal editorial layout.

---

# SECTION 9 — OPEN SOURCE

Keep the GitHub contribution heatmap.

Redesign the section as:

```text
05 / OPEN SOURCE

SHIPPING
IN PUBLIC.
```

Use:

- Contribution heatmap
- GitHub link
- Selected repositories
- Contribution statistics

Avoid excessive GitHub widgets.

---

# SECTION 10 — JOURNEY

The existing:

- Intel Unnati
- Infosys SpringBoard
- Datathon
- V3 National Hackathon
- AI Ignite
- Devnovate

information should remain.

Redesign it as a vertical timeline.

Example:

```text
06 / JOURNEY

2025
│
├── Intel Unnati
│   CNN + FAISS
│
├── Infosys SpringBoard
│   NLP + Recommendation
│
2026
│
├── Datathon 2.0
│   Winner
│
├── V3 National Hackathon
│   RAG System
│
└── AI Ignite / Devnovate
    Semantic Segmentation
```

Make the timeline interactive.

Hovering a milestone should reveal additional information.

---

# SECTION 11 — CONTACT

Replace the conventional contact section with a large final CTA.

```text
07 / CONTACT

HAVE A
CHALLENGING
PROBLEM?

LET'S MAKE
SOMETHING
USEFUL.

[ LET'S TALK ↗ ]
```

Keep the existing:

- Email
- Contact form

functionality.

Do not break form submission.

---

# FOOTER

Minimal:

```text
SYED HASNAIN

ML ENGINEER · BUILDER · PROBLEM SOLVER

GitHub
LinkedIn
Email

© 2026
```

---

# DESIGN SYSTEM

## Colors

Use a dark-first palette.

```text
Background
#050505

Primary Text
#F5F5F5

Secondary Text
#8A8A8A

Border
#222222
```

Choose ONE accent color.

Recommended:

```text
Electric Blue
```

Do not use many unrelated gradients.

---

# TYPOGRAPHY

Use one primary typeface.

Recommended:

- Geist
- Inter
- Manrope
- Satoshi

Suggested scale:

```text
Hero:
clamp(64px, 9vw, 160px)

Section:
clamp(48px, 6vw, 96px)

Project:
clamp(42px, 5vw, 80px)

Body:
18–20px

Metadata:
12–14px
```

Typography must remain responsive.

---

# GRID

Desktop:

```text
12 columns
24px gutter
5–8vw margins
```

Tablet:

```text
8 columns
20px gutter
4vw margins
```

Mobile:

```text
4 columns
16px gutter
20px margins
```

Maintain strict alignment across all sections.

---

# SPACING

Use a consistent spacing scale.

Avoid random:

```text
37px
53px
91px
```

Prefer a consistent system such as:

```text
8
16
24
32
48
64
96
128
```

---

# MOTION

Use Framer Motion for:

- Page transitions
- Text reveals
- Project hover
- Scroll reveals
- Architecture animations
- Timeline animations

Use GSAP only if necessary.

Do not introduce unnecessary dependencies.

---

# MOTION PRINCIPLES

Animations must be:

- Smooth
- Fast
- Intentional
- Subtle

Micro:

```text
150–250ms
```

Component:

```text
400–700ms
```

Section:

```text
700–1200ms
```

Support:

```text
prefers-reduced-motion
```

Users who disable animations must still receive all content.

---

# RESPONSIVE REQUIREMENTS

Test:

```text
320px
375px
425px
768px
1024px
1280px
1440px
1920px
```

Check:

- Alignment
- Typography
- Overflow
- Navigation
- Images
- Buttons
- Cards
- Architecture
- Timelines
- Animations
- Forms

There must be no horizontal scrolling.

---

# ACCESSIBILITY

Maintain:

- Semantic HTML
- Keyboard navigation
- Focus states
- ARIA labels
- Alt text
- WCAG AA contrast
- Reduced motion
- Accessible navigation

Do not make important information dependent only on hover.

---

# PERFORMANCE

Do not allow the redesign to significantly reduce performance.

Target:

```text
Lighthouse > 95
```

Use:

- Next.js Image
- Lazy loading
- Dynamic imports
- Optimized assets
- Code splitting
- Minimal JavaScript
- GPU-friendly animations

Avoid unnecessary WebGL/Three.js unless it provides significant value.

---

# IMPORTANT — DO NOT REBUILD

This is an **existing portfolio redesign**.

Before modifying code:

1. Inspect the current implementation.
2. Identify existing components.
3. Identify current styles.
4. Identify current routes.
5. Identify existing data.
6. Identify existing integrations.
7. Identify project detail pages.
8. Identify responsive behavior.

Then modify the existing implementation.

Do not create a completely separate application.

Do not delete working functionality simply to achieve the new design.

---

# IMPLEMENTATION PRIORITY

Implement in this order:

## Phase 1 — Design Foundation

- Typography
- Colors
- Grid
- Spacing
- Buttons
- Navigation
- Global transitions

## Phase 2 — Homepage

- Hero
- About
- Selected Work
- Toolkit
- Coding
- Open Source
- Journey
- Contact

## Phase 3 — Project Experience

- Project hero
- Why project
- Problem
- Solution
- Architecture
- Input → Processing → Output
- Features
- Engineering decisions
- Challenges
- Results
- Learnings
- Future

## Phase 4 — Motion

- Page transitions
- Scroll animations
- Project hover
- Architecture animation
- Timeline

## Phase 5 — Responsive

Test every breakpoint.

## Phase 6 — Polish

Fix:

- Alignment
- Spacing
- Typography
- Animation timing
- Overflow
- Accessibility
- Performance

---

# SUCCESS CRITERIA

The redesign is successful only if:

### Visual

- The portfolio feels premium.
- Typography is strong.
- Layout has excellent whitespace.
- Alignment is consistent.
- Projects dominate the experience.

### UX

- Navigation is obvious.
- Projects are easy to explore.
- Project stories are easy to understand.
- Animations improve comprehension.

### Engineering

- Existing functionality remains intact.
- Existing integrations continue working.
- Project information remains accurate.
- Code remains maintainable.

### Recruiter Experience

Within 30 seconds, a recruiter should understand:

```text
WHO IS THIS PERSON?
        ↓
WHAT DO THEY BUILD?
        ↓
WHAT ARE THEY GOOD AT?
        ↓
WHAT PROJECTS PROVE IT?
```

Within 3 minutes, they should be able to understand:

```text
WHY THE PROJECTS EXIST
        ↓
HOW THEY WORK
        ↓
HOW THE DEVELOPER THINKS
        ↓
WHAT THEY LEARNED
```

---

# FINAL DESIGN PRINCIPLE

Do not optimize the portfolio for:

> "How many sections can I show?"

Optimize it for:

> "How clearly can I communicate the quality of my thinking and engineering?"

The final website should feel like:

**TRIONN-inspired visual storytelling**

+

**Vercel-level technical polish**

+

**Interactive engineering case studies**

+

**Syed Hasnain's personal identity**

The final experience should communicate:

> **I don't just know technologies. I know how to use them to solve problems.**