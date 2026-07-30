---
name: hr-west-2027-redesign-strategy
description: Strategic UX/UI blueprint, Information Architecture, Design System, Content Inventory, and Technical Architecture for the HRWest 2027 ultra-modern Web Application. Continuously updated during brainstorming, design, and development.
---

# HR West 2027 - Senior UX/UI Design & Technical Architecture Strategy

## 👑 MANDATORY DESIGN OPERATING PRINCIPLE: Senior UX/UI Leadership & Push-Back Rule
> **CRITICAL DIRECTIVE**: You are acting as a **World-Class Lead UX/UI Designer, Product Architect, and Conversion Copywriter**. 
> - **DO NOT blindly follow user suggestions** if they compromise conversion rate, visual hierarchy, user friction, or accessibility.
> - **CHALLENGE WEAK IDEAS & PUSH BACK**: When user ideas conflict with first-principles design or event conversion goals, politely push back, explain *why* the suggestion introduces friction, and propose a superior, high-converting design alternative.
> - **NO GENERIC AI SITES**: Every layout, component, and interaction must feel custom, intentional, and high-end. Never produce generic Bootstrap-like templates.
> - **STRICT READ-ONLY DIRECTIVE FOR LIVE CMS**: Under NO circumstances should files inside `00-hrwest-2027/01-live-cms/` (`00-template/`, `02-pages/`, `css/`) be modified, edited, or refactored unless the user explicitly asks to edit those live files. All web application development, experimentation, and refactoring MUST occur exclusively inside `00-hrwest-2027/02-hrwest-2027-revamped/`.

---

## 1. Product Vision & Strategic Positioning
**HR West 2027** is the premier West Coast HR conference hosted in South San Francisco. This platform transitions HRWest from a traditional CMS landing page into an **interactive, ultra-modern Next.js 15 Web Application**.

### Dual-Engine Conversion Objectives
1. **Engine A (Attendee Engine)**: Convert HR Professionals into registered attendees by highlighting high-value tracks, recertification credits, world-class speakers (e.g., Jason Averbook, Allison West), interactive schedule builders, and boss justification tools.
2. **Engine B (Sponsor/Exhibitor Engine)**: Convert HR Solution Providers into high-tier sponsors by showcasing audience demographics, booth foot traffic value, and direct access to decision-makers.

---

## 2. Recommended Technology Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Scoped Custom CSS Variable System
- **3D & Canvas**: Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`) for subtle, ambient Silicon Valley mesh/particle canvas backgrounds
- **Animation & Motion**: Framer Motion for scroll reveals, layout animations, and tab transitions
- **UI Primitives**: Radix UI / Lucide React icons
- **State Management**: Zustand / React Context

---

## 3. Product Design Lifecycle (Step-by-Step Workflow)
- **Step 1: Content & Information Architecture Inventory** (Cataloging exact text, CTAs, data fields for all 10 pages).
- **Step 2: Low-Fidelity (Lo-Fi) Structural Wireframes** (Validating layout hierarchy, content density, and user flow before code).
- **Step 3: High-Fidelity (Hi-Fi) Interactive Design Spec** (Defining design tokens, micro-interactions, dark/light modes, 3D ambient canvas).
- **Step 4: Next.js Implementation & Production Code** (Building component primitives, Next.js routes, and responsive polish).

---

## 4. Comprehensive Content Inventory Across All 10 Pages

### Page 1: Homepage (`/`)
- **Hero Header**: `HRWest 2027: Imagine What's Possible` + Subtitle: `Where fresh ideas meet practical expertise...` + Event Date (`March 23-24, 2027`) + Location (`South San Francisco Conference Center`).
- **Primary CTAs**: `Pre-register for 2027` (Gradient Glow) & `Why Sponsor / Exhibit` (Glass Outline).
- **Social Proof Banner**: Photo marquee of HRWest 2026 attendees + stats (`1000+ HR Leaders`, `50+ Sessions`, `20+ Recert Credits`).
- **Featured Speakers Section**: `Real Experts Who Help HR Move Forward` featuring Jason Averbook & Allison West cards with cutout badges.
- **6-Track Interactive Matrix**: HR Strategy & AI, Legal & Compliance, HR Tech, Talent, Leadership, Health & Wellness.
- **Venue Spotlight**: South San Francisco Conference Center features & interactive map teaser.

### Page 2: Speakers Directory (`/speakers`)
- **Hero Title**: `HRWest Conference Speakers` + Call for Speakers banner (`Deadline: October 30, 2026`).
- **Filter Suite**: Filter by Track (AI, Legal, Tech, Talent, Leadership, Wellness), Search bar by name/company.
- **Speaker Cards Grid**: Headshot, Name pill, Job Title, Company Logo, Session Title, View Bio modal CTA.

### Page 3: Interactive Agenda (`/agenda`)
- **Hero Title**: `HRWest Agenda` + Subtitle: `Stay tuned for the 2027 Schedule.`
- **Interactive Time Grid**: Day 1 & Day 2 tabs, Track filter toggles, Time slot accordion cards with speaker links and bookmarking.

### Page 4: Sponsor Hall (`/sponsors`)
- **Hero Title**: `Sponsors` + Subtitle: `Companies that have used HRWest to connect with the HR community`.
- **Deduplicated Past Sponsors Showcase**: SAP SuccessFactors (horizontal logo), Alliant, Insperity, Robert Half, UKG, Rippling, etc.

### Page 5: Why Sponsor / Exhibit (`/sponsor`)
- **Hero Title**: `Reach & Connect with HR Decision-Makers`.
- **Audience Metrics Dashboard**: Attendee seniority breakdown, company size chart, purchasing authority metrics.
- **Prospectus CTA**: Download Sponsorship Brochure & Reserve Exhibit Booth form.

### Page 6: Attend as a Team (`/attend/team`)
- **Hero Title**: `Bring Your Team to HRWest`.
- **Interactive Discount Calculator**: Select team size (3-5: 15% off, 6-10: 25% off, 10+: Custom Enterprise tier) -> Instant savings calculation.

### Page 7: Convince Your Boss (`/attend/convince-boss`)
- **Hero Title**: `Get Your Employer to Send You to HRWest`.
- **Justification Toolkit**: ROI bullet list, expense estimator, and customizable email/letter generator for manager sign-off.

### Page 8: Venue & Location (`/attend/location`)
- **Hero Title**: `South San Francisco Conference Center`.
- **Travel Guide**: Hotel discount codes, airport distances (SFO), BART/shuttle directions, parking details.

### Page 9: Volunteer Program (`/attend/volunteer`)
- **Hero Title**: `Volunteer at HRWest for a Free Pass`.
- **Application Portal**: Roles description, time commitment, online application form.

### Page 10: Pre-Registration (`/register`)
- **Hero Title**: `Pre-Register for HRWest 2027`.
- **Registration Form**: Ticket type selection, attendee details, team addon, secure checkout summary.

---

## 5. Visual Design Tokens & Component Library

### HSL Color Tokens
- **Brand Purple**: `#91278c` | `hsl(302, 58%, 36%)`
- **Vibrant Pink**: `#ef146e` | `hsl(335, 89%, 51%)`
- **Surface Dark**: `#0b0f17` | `hsl(220, 35%, 7%)`
- **Surface Light**: `#fbfbfe` | `hsl(240, 33%, 99%)`
- **Glass Border**: `rgba(255, 255, 255, 0.12)`

---

## 6. Workspace Directory Structure & File Paths
- **Live CMS Assets** (`00-hrwest-2027/01-live-cms/`): Preserved, read-only live HTML templates (`00-template/`), subpages (`02-pages/`), and CSS style sheets (`css/`).
- **Revamped Application Workspace** (`00-hrwest-2027/02-hrwest-2027-revamped/`): Target directory for the web application codebase.
  - **IA & Content Spec**: `00-hrwest-2027/02-hrwest-2027-revamped/docs/information-architecture.md`
  - **Design Reference Assets**: `00-hrwest-2027/02-hrwest-2027-revamped/docs/reference-assets/`

