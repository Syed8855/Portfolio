# Implementation Plan — Portfolio Scroll-Scatter Redesign


## 0. Inputs to give the agent
- This plan
- `index.html` (the working reference/prototype with the exact animation behavior)
- Repo access to `syed-hasnain-portfolio` (Next.js + your existing Tailwind setup)

Prompt to kick it off:
> "Read PLAN.md and reference/index.html. Implement the intro name screen, hero scatter, section-heading reassembly, and toolkit proficiency bars into our existing Next.js components using GSAP + ScrollTrigger. Preserve all existing content, routes, and data — only change presentation/animation layer. Match design tokens in PLAN.md exactly."

## 1. Dependencies
```bash
npm install gsap
```
No other new deps needed — `ScrollTrigger` ships inside the `gsap` package (`gsap/ScrollTrigger`).

## 2. Design tokens (add to `tailwind.config.ts` theme.extend or a CSS vars file)
```
bg:        #060b14
bg-2:      #0b1526
surface:   #0f1c33
surface-2: #122544
line:      #1c2f4d
ink:       #eef3fb
ink-dim:   #8ea0bd
accent:    #4f8cff
accent-2:  #7db8ff
warm:      #ffb454
```
Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels/data) — load via `next/font/google`.

## 3. Component breakdown

```
/components
  /scroll
    SplitScatter.tsx       — reusable char-split + scatter animation hook/component
    useScrollScatter.ts    — GSAP ScrollTrigger logic, extracted as a hook
  IntroName.tsx             — new: pinned name screen, scatters out as hero reveals
  Hero.tsx                  — existing hero, add scatter-out-on-scroll to headline
  SectionHeading.tsx        — existing section titles, add reassemble-on-enter
  ToolkitSkillBar.tsx       — new: animated proficiency bar
```

### 3.1 `SplitScatter.tsx` (core reusable piece)
Build once, reuse for intro name + hero headline + all section headings.

Props:
```ts
interface SplitScatterProps {
  text: string;
  as?: keyof JSX.IntrinsicElements; // h1, h2, span
  mode: 'scatter-out' | 'reassemble-in';
  trigger: React.RefObject<HTMLElement>; // ScrollTrigger trigger element
  start?: string;   // default 'top 85%' for reassemble, 'top top' for scatter-out
  end?: string;
  pin?: boolean;    // true for intro name only
  className?: string;
}
```
Internally:
1. Split `text` into word spans → char spans on mount (or use SplitType/SplitText if you have GSAP Club plugin access — otherwise hand-roll, same as prototype).
2. `mode: 'scatter-out'` — chars start opacity 1, animate to random x/y/rotation/blur/opacity 0, scrubbed to scroll.
3. `mode: 'reassemble-in'` — chars start randomized/blurred/opacity 0, animate to natural position, scrubbed to scroll on enter.
4. Register/cleanup `ScrollTrigger` in `useEffect`, kill on unmount (critical in Next.js — App Router remounts on route change).
5. Respect `prefers-reduced-motion`: skip animation, render static text if user has that OS setting on.

### 3.2 `IntroName.tsx`
- Full `100vh` section, centered, `SYED HASNAIN PEERAN` stacked 3 lines (keep stacked — see rationale below).
- Uses `SplitScatter` with `mode="scatter-out"`, `pin={true}`.
- Progress bar synced to the same ScrollTrigger's `onUpdate` (`progress` value → bar width), not a separate animation.
- Renders directly above existing `Hero.tsx` in `app/page.tsx`.

### 3.3 `Hero.tsx` (edit existing)
- Wrap headline lines ("BUILDING" / "PRACTICAL intelligence.") in `SplitScatter mode="scatter-out"`.
- Everything else (CTA buttons, sub-copy, meta row) unchanged — do not scatter body text, only display headline.

### 3.4 `SectionHeading.tsx` (edit existing, used by About/Work/Toolkit/Journey/Contact)
- Wrap the `<h2>` in `SplitScatter mode="reassemble-in"`.
- `start: 'top 85%'`, `end: 'top 55%'`, `scrub: 0.5` — matches prototype timing.

### 3.5 `ToolkitSkillBar.tsx`
```ts
interface SkillBarProps { name: string; level: number; } // level 0-100
```
- Renders label + `%` + track + fill.
- Fill animates `width: 0% → level%` via ScrollTrigger `start: 'top 90%'` when the row enters view, `duration 1.1s, ease power3.out`.
- Data lives in a typed array per category (Languages / AI-ML / Web), colocated in the Toolkit section file — **agent should ask you for real proficiency numbers before hardcoding**, don't invent them silently.

## 4. Page assembly (`app/page.tsx`)
```
<IntroName />
<Hero />
<About />        {/* SectionHeading inside */}
<Work />         {/* SectionHeading inside */}
<Toolkit />      {/* SectionHeading + ToolkitSkillBar rows */}
<Journey />      {/* SectionHeading inside */}
<Contact />      {/* SectionHeading inside */}
<Footer />
```
No route/content changes — same sections, same copy, same links/PDF/images.

## 5. GSAP/Next.js gotchas the agent must handle
- Register `gsap.registerPlugin(ScrollTrigger)` once, client-side only (`'use client'` at top of files using it, or a small `GsapProvider` that runs in `useEffect`).
- All `ScrollTrigger.create` / `.to` / `.fromTo` calls need a matching `.kill()` in the `useEffect` cleanup function — otherwise triggers duplicate on fast refresh / route changes.
- Wrap trigger creation in `useLayoutEffect` (or `gsap.context()`) scoped to the component's ref, so triggers get scoped-killed automatically on unmount — this is the standard GSAP+React pattern, use `gsap.context()`.
- SSR: char-splitting must not run during server render — guard with `useEffect`, initial server-rendered markup should be plain, unsplit text (also better for SEO/accessibility — screen readers shouldn't see 40 individual `<span>` chars).

## 6. Accessibility / quality bar
- `prefers-reduced-motion: reduce` → skip all scatter/reassemble/pin behavior, render normally.
- Keep underlying text as real text nodes (not divs of divs) for screen readers — use `aria-label` on the wrapping element with the full string, and `aria-hidden="true"` on the individual char spans.
- Verify tab order / focus states aren't affected by the pin/scatter (buttons, links still keyboard-navigable).

## 7. Rollout order (do in this sequence, test between each)
1. Install GSAP, add design tokens/fonts.
2. Build `SplitScatter` + `useScrollScatter` in isolation, test on one heading only.
3. Wire `IntroName` + pin behavior — this is the highest-risk piece (pinning), verify no layout jump/jank on mobile.
4. Apply scatter-out to `Hero` headline.
5. Apply reassemble-in to all section headings.
6. Build `ToolkitSkillBar`, get real proficiency numbers from you, wire into `Toolkit`.
7. Pass on accessibility (reduced-motion, aria) + mobile breakpoint check.
8. Lighthouse pass — GSAP scroll animations can hurt CLS/INP if not scoped correctly; check before shipping.

## 8. Known open decision
Name is stacked 3 lines (SYED / HASNAIN / PEERAN) rather than one line — kept because it lets each word scatter on independent timing, which reads more deliberate than one line dissolving at once. Single line was considered but drops font size and animation drama. Flag to revisit if you want single-line-on-desktop, stacked-on-mobile as a responsive variant.
