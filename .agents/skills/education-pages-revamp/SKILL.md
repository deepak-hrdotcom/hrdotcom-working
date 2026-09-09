---
name: education-pages-revamp
description: Production CMS guidelines, UI/UX architecture, visual design system, and implementation workflow for the 8 HR.com Education & Certification pages in 01-education/02-certification-pages/. Activate when working on, creating, or polishing any of the 8 certification landing pages.
---

# HR.com Education & Certification 2026 Redesign — Master Strategy & UX/UI Architecture

## 1. Operating Directives & Collaboration Model

### A. Team Roles & Strict Rules
- **User Role**: Provides authentic, verified text content, curriculum details, pricing tiers, and business requirements.
- **AI Role (World-Class Lead UI/UX Designer & Visual Architect)**:
  - **🚫 STRICT CONTENT INTEGRITY RULE**:
    - You are strictly **NOT** supposed to write new copy, modify copy, or paraphrase approved business text.
    - **NEVER invent stats, numbers, or metrics**: Do NOT fabricate pass rates, student enrollments, salary boosts, or star ratings. Only display verified, existing numbers provided in official source files.
    - **NEVER make fake promises**: No fabricated guarantees, artificial timers, or exaggerated outcome claims.
  - Prioritize **stunning, modern, high-converting visual design**:
    - Master visual ergonomics, visual hierarchy, aesthetic-usability effect, and scannable chunking.
    - Deploy high-end UI components: structured cards (12–16px radius), restrained button controls (8px radius), hairline borders (`#E5E7EB`), soft elevation, and clear focal points. Reserve full pill radius (`999px`) strictly for tags, status badges, and metadata chips.
    - Stacked Pricing Architecture: Track 1 (PHR/SPHR/SHRM) stacked directly above Track 2 (aPHR) without collapsed sliding doors.
    - Ensure frictionless mobile and desktop responsiveness (baseline: 95vw, max-width 1350px).

---

## 2. File Organization & Directory Structure

All new production pages live in the dedicated certification folder:
**Target Directory**: `01-education/02-certification-pages/`
**Living Brand Guidelines HTML**: [`brand-guidelines.html`](file:///e:/HR/00-html/01-education/02-certification-pages/brand-guidelines.html)

### The 8-Page Certification Suite:
| # | Page File Name | Status | Purpose & Key Components |
|---|----------------|--------|--------------------------|
| 1 | `understanding-hr-certification-dev.html` | **Completed (Baseline Standard)** | Master decision hub, 2-step interactive experience matcher, 4 value pillars, 7-step roadmap, video slot, 5 authority resources. |
| 2 | `preparation-options.html` | Next Up | Comprehensive prep course catalog (16-wk live, 8-wk accelerated, self-paced eLearning, HRCP materials), cohort schedules, comparison matrix. |
| 3 | `pass-assurance-program.html` | Queued | 100% Money-Back Guarantee hub, 3-point eligibility checklist, confidence cues, FAQ on retakes/refunds. |
| 4 | `hr-group-certification.html` | Queued | B2B enterprise training, volume team discount calculator (5+ / 12+), business case for CFOs, team lead form. |
| 5 | `hr-recertification.html` | Queued | Post-certification credit renewal, 1-yr ($250) vs 3-yr ($500) passes, interactive credit tracker, ethics requirement courses. |
| 6 | `testimonials.html` | Queued | Social proof engine, 49+ verified graduate review database, credential filtering (aPHR / PHR / SPHR / SHRM), salary accelerator stories. |
| 7 | `ask-my-employer.html` | Queued | Employer funding toolkit, interactive 1-click boss pitch email generator, customizable business justification case. |
| 8 | `book-a-call.html` | Queued | 1-on-1 advisor consultation, video consultation scheduler, course demo preview, advisor reassurance. |

---

## 3. Design System Tokens & Styling Standards

The new **International Executive Education & Modern Credential System** established in [`brand-guidelines.html`](file:///e:/HR/00-html/01-education/02-certification-pages/brand-guidelines.html) serves as the universal standard for all 8 certification pages:

### A. Modern International Color Palette
- **Canvases & Neutral Surfaces**:
  - Pure Canvas: `#FFFFFF`
  - Porcelain Slate: `#F8FAFC`
  - Cool Stone Tint: `#F1F5F9`
  - Hairline Borders: `#E2E8F0` / `#CBD5E1`
- **Dark Anchor & Executive Typography**:
  - Midnight Obsidian: `#090D1A` (Prestige anchors, executive contrast)
  - Deep Slate Headings: `#0F172A` (H1-H4 headings)
  - Slate Body Text: `#334155`
  - Muted Slate: `#64748B` / `#94A3B8`
- **International Action & Value Accents**:
  - **Primary Action (International Cobalt)**: `#2563EB` (Hover: `#1D4ED8`, Glow: `rgba(37,99,235,0.28)`) - Global standard of trust, institutional clarity, and primary enrollment CTA pill.
  - **Growth & Salary Emerald**: `#059669` (Tint: `#ECFDF5`, Border: `#A7F3D0`) - Anchors the +$10k-$20k salary boost, 93% pass rate, and verified graduate checkmarks.
  - **Burnished Honor Gold**: `#D97706` (Tint: `#FFFBEB`, Border: `#FDE68A`) - 100% Pass Assurance Guarantee shield and top-tier alumni proof.
  - **Electric Indigo**: `#4F46E5` / `#6366F1` - Milestone roadmap steps and catalog tier accents.

### B. International Typography (Plus Jakarta Sans)
- **Primary Font Family**: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;`
- **Font Import**: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`
```css
--edu-fs-display: 46px; /* Line-height: 1.18, Tracking: -0.035em */
--edu-fs-h1: 38px;      /* Line-height: 1.25, Tracking: -0.03em */
--edu-fs-h2: 28px;      /* Line-height: 1.3, Tracking: -0.025em */
--edu-fs-h3: 20px;      /* Line-height: 1.35, Tracking: -0.015em */
--edu-fs-h4: 16px;      /* Line-height: 1.4 */
--edu-fs-lead: 16px;    /* Line-height: 1.65 */
--edu-fs-body: 14.5px;  /* Line-height: 1.65 */
--edu-fs-caption: 12px;
--edu-fs-micro: 11.5px;
```
*(On mobile <768px: H1 scales to 28-32px, H2 to 22-24px).*

### C. Signature Components & Micro-Animations
1. **Zero FOUC Block**:
   ```html
   <style>.edu-[page]-page{visibility:hidden;}</style>
   <script>document.addEventListener('DOMContentLoaded',function(){var p=document.querySelector('.edu-[page]-page');if(p)p.style.visibility='visible';});</script>
   ```
2. **Container Width**:
   ```css
   .edu-[page]-wrap {
     width: 95vw !important;
     max-width: 1350px !important;
     margin: 0 auto !important;
     padding: 0 20px !important;
     box-sizing: border-box !important;
   }
   ```
3. **Executive CTA Pill Buttons**:
   Primary buttons strictly use International Cobalt (`#2563EB`, hover `#1D4ED8`) with `border-radius: 999px !important;` and high-trust shadow glow (`rgba(37,99,235,0.25)`).
4. **Pulse-Dot Executive Eyebrows**:
   Eyebrow chips use `.edu-eyebrow` with `.edu-eyebrow-beacon` (luminous pulsing beacon dot in Cobalt or Emerald), completely replacing any legacy multi-color dot clusters.
5. **Scroll Entrance Reveal**:
   Utilize `.edu-reveal` with `IntersectionObserver` and staggered delays (`.edu-reveal-d1`, `.edu-reveal-d2`, etc.).

---

## 4. CMS Technical Guidelines

1. **Full-Width Canvas Overrides**:
   Always include the `.ContentArea` and `.container` 100% reset to break free of legacy CMS margin constraints:
   ```css
   body > .ContentArea { margin: 0 !important; }
   body > .ContentArea > .container { width: 100% !important; max-width: 100% !important; padding: 0 !important; }
   ```
2. **Self-Contained Code**:
   All CSS must be embedded in `<style>` blocks strictly scoped to the page wrapper (e.g. `.edu-prep-page`).
   Use `!important` on fonts and reset properties to protect against global CMS bleed.
3. **Icons & Graphics**:
   Use clean, inline SVG icons for crispness and zero HTTP latency. Constrain SVG width/height explicitly.
4. **Component Architecture & Layout Gotchas**:
   - **Responsive Video Aspect Ratios**: Always define `aspect-ratio: 16 / 9; max-width: 860px; overflow: hidden;` on video player wrappers. Explicitly size play button SVGs (`width: 24px; height: 24px;`) to prevent SVG blow-up bugs.
   - **Slider Document Flow**: Never apply `position: absolute` to slider containers or `.edu-uc-story-box` wrappers. Always use `position: relative` so subsequent elements (like CTAs and footers) maintain natural document flow with zero overlap.
   - **Anchor Target Alignment**: Verify that in-page navigation anchors (e.g. `#prep-options`, `#exam-matcher`, `#certification-journey`, `#cta-banner`) match exact element `id` attributes.
   - **Unified Feature Cards**: When structuring cards with tags, descriptions, and proof badges, organize them into a clean single vertical hierarchy and suppress redundant duplicate wrapper labels via CSS.
5. **ASCII Clean Comments Only**:
   Never use box-drawing symbols or emojis in code comments.
6. **Forbidden Directories**:
   - NEVER touch `01-live-cms/`.
   - NEVER modify `02-hrwest-2027-revamped/`.
   - NEVER run `git push` unless explicitly asked.

---

## 5. Page-by-Page Design Checklists

When building or updating each of the remaining 7 pages:
- [ ] Receive approved content, copy, and specifics from user.
- [ ] Establish unique, scoped wrapper class (e.g. `.edu-prep-page`, `.edu-pass-page`).
- [ ] Apply the universal typography tokens, 4-dot brand motif, and button styles.
- [ ] Build desktop-first layout (min-width: 1350px container) with fluid responsive breakpoints at 1024px, 768px, and 480px.
- [ ] Add dynamic micro-interactions (tabs, filters, tooltips, calculators, sheen hover states).
- [ ] Incorporate relevant trust cues: Pass Assurance badge, HRCI/SHRM seals, 93% pass rate, 4.9-star rating.
- [ ] Close page with high-trust human advisor consultation block and trademark legal disclaimers.

---

## 6. Official Imagery & Visual Media Directives (Photography Standard Across All 8 Pages)

To maintain absolute brand consistency, international executive authority, and high conversion, all images across the 8-page certification suite must adhere to these unified specifications:

### A. Core Art Direction & Aesthetic Benchmark
- **Visual Style**: High-end corporate editorial photography benchmarking **Stanford Executive Education**, **McKinsey Academy**, **Wharton**, and **Reforge**.
- **Setting & Environment**: Bright, modern, architecturally refined corporate offices, executive boardrooms, or minimalist collaborative study lounges. Clean natural daylight, soft slate surfaces, subtle glass reflections, and warm wooden accents.
- **Lighting & Color Grading**: Warm, natural diffuse daylight. Clean neutral color balance (slate, porcelain, deep indigo accents). No artificial colored gels, no neon rim lighting, and no dark dingy environments.
- **Talent & Poses**: Real working HR professionals (specialists, HR business partners, managers, and directors). Natural, candid, and authentic expressions of focused concentration, thoughtful analysis, or warm, approachable confidence.
- **🚫 STRICT PROHIBITIONS**:
  - **NO cheesy stock poses**: No thumbs-up, no pointing at empty air or headlines, no exaggerated shock/gasping faces.
  - **NO isolated PNG cutouts**: Avoid cutout people floating on plain white or flat colored cards with harsh feathered edges. All photography must have rich, natural environmental depth.
  - **NO uncanny AI artifacts**: No distorted hands, extra fingers, unnatural glossy plastic skin, or asymmetric eyes.
  - **NO clip-art or cartoon doodles**: Maintain an adult, professional executive posture at all times.

### B. Standard Photo Archetypes Across the 8 Pages
1. **Hero Ambience / Learner Portrait**:
   - **Role**: Inspires ambition and career elevation.
   - **Specs**: Confident, well-dressed HR professional in a modern office or thoughtful leadership pose with laptop or notebook.
   - **Aspect Ratio**: `16:9` (horizontal banner) or `4:3` / `3:2`.
2. **Diagnostic & Interactive Feature Cards ("Which exam is right for you?")**:
   - **Role**: Scannable diagnostic trigger encouraging self-assessment.
   - **Specs**: A focused HR practitioner working attentively on an ultra-slim modern laptop, reviewing notes or dashboards.
   - **Aspect Ratio**: `4:3` or `1:1`.
3. **1-on-1 Executive Mentorship & Coaching**:
   - **Role**: Demonstrates human-centered, high-touch support and personalized guidance.
   - **Specs**: A senior HR mentor/coach in an engaging, supportive conversation with an ambitious professional in a modern advisory setting.
   - **Aspect Ratio**: `16:9` or `3:2`.
4. **Comparison & Career Frameworks**:
   - **Role**: Elevates strategic decision-making.
   - **Specs**: An HR director or leader analyzing strategic frameworks, career matrices, or planning documents.
   - **Aspect Ratio**: `4:3` or `3:2`.
5. **Verified Graduate Proof & Social Proof**:
   - **Role**: Concrete proof of passing and career boost.
   - **Specs**: Authentic, diverse certified HR professionals holding framed certificates or badges in actual office settings.
   - **Aspect Ratio**: `1:1` square.
