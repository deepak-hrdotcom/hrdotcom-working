---
name: education-pages-revamp
description: Master strategy, behavioral psychology framework, component architecture, low-fi prototype conventions, and CMS implementation guidelines for the HR.com Education & Certification 2026 Redesign. The old 7-page structure has been consolidated into 3 conversion hubs. Activate when working on critique-app, low-fi prototypes, or certification CMS pages.
---

# HR.com Education & Certification 2026 Redesign — Master Strategy & UX Blueprint

## Core Persona
You operate as the **Triple-Threat Specialist**:
1. **Legendary UX/UI Designer**: Master of visual hierarchy, scannability, cognitive load reduction, progressive disclosure, and frictionless desktop-first layouts (min-width: 1440px).
2. **Master Conversion Copywriter**: Direct, punchy, empathetic, WIIFM-driven (What's In It For Me), zero corporate fluff. Plain English always — never use academic law names in user-facing copy or explanations.
3. **Senior HR Certification Leader & Lead Instructor**: Authentic insider understanding of HRCI (`aPHR`, `PHR`, `SPHR`, `PHRi`, `SPHRi`) & SHRM (`SHRM-CP`, `SHRM-SCP`), test anxiety, adult learning schedules, employer reimbursement hurdles, and recertification credit rules.

---

## Architecture — 3-Hub Consolidation (Replaces Old 7-Page Structure)

The original 7 standalone pages have been consolidated into **3 conversion-focused hubs**:

```
OLD (7 pages)                      NEW (3 hubs)
-----------------                  -----------------
1. Understanding HR Cert      \
2. Preparation Options         |-->  HUB 1: Master Certification & Prep
3. Pass Assurance Program      |     (10 sections: Hero, Pillars, Matcher, Catalog,
6. Testimonials               /      Video, Boss Pay, Proof, Roadmap, Resources, FAQ)

4. HR Group Certification     \
7. Ask My Employer            /-->  HUB 2: Employer Funding & Teams
                                     (4 sections: Hero, Calculator, CFO Case, Email Kit)

5. HR Recertification         \-->  HUB 3: Recertification & Credits
                                     (3 sections: Hero, Pricing, Credit Tracker)
```

---

## Hub 1: Master Certification & Prep — Full 10-Section Blueprint

Based on **Eric Anderson's** and **Shelley Marsland's** strategic content requirements:

### Section Architecture
1. **Career Value Hero**: 2-column (text left, image right). Headline from Eric: *"HR Certification: What You NEED to Know"*. Trust strip: 93% pass rate | 10,000+ certified | 100% guarantee | 74% employer paid.
2. **Eric's 4 Value Pillars**: +$10k–$20k salary | Strategic expertise | 90%+ employer preference | Career confidence.
3. **Important Choice #1 — Exam Matcher**: 3 chips (0–1yr → aPHR, 1–3yr → PHR/SHRM-CP, 4–7+yr → SPHR/SHRM-SCP). 1-click instant recommendation with salary boost displayed.
4. **Important Choice #2 — 3-Tier Course Catalog**: Tier 1 (Live Cohort $1,065 | 93% pass | 100% guarantee), Tier 2 (Self-Paced $890 | 88% pass), Tier 3 (Books Only $480).
5. **Greg's Video Explainer**: Landscape video slot — *"Pros & Cons of Every Prep Option"*. Greg Osmond is producing a fresh landscape version. Do not use the old vertical mobile cut.
6. **'Get Your Boss to Pay' Trigger**: 1-Click Boss Pitch Email + 1-Page Business Case PDF + Direct Employer Invoice option.
7. **Verified Graduate Proof**: Real alumni cards. Feature Gabriella Talentino (SPHR, +$18,500), Rochelle Harris (PHR, Score: 560/700), Marky Hyde (aPHR, career changer). Photo frames mandatory.
8. **Eric's 7-Step Best Practices Roadmap**: Steps 1–7. Critical rule on Step 6: *"Don't activate your 180-day testing window until you are midway through prep!"*
9. **Shelley's 5 Certification Authority Resource Cards** (opens `target="_blank"`):
   - *Why Get HR Certified in 2026?* (Career salary boost & employer demand)
   - *Get the Facts on HR Certification* (Pass rates, requirements, governing bodies)
   - *HRCI vs SHRM: Top 3 Differences* (Exam formats, question styles, employer preference)
   - *Secrets to Passing the SHRM-CP & SHRM-SCP* (BASK framework, situational judgment)
   - *Secrets to Passing the HRCI aPHR, PHR & SPHR* (Federal law, strategic management traps)
10. **Honest FAQ & Advisor Reassurance**: Searchable FAQ by category. Direct hotline: 1-877-472-6648 (Mon–Fri 8am–7pm ET).

---

## Hub 2: Employer Funding & Teams — 4-Section Blueprint

1. **Dual-Audience Hero**: 2-column. Audience toggle chips: "I'm an Employee Asking My Boss" / "I'm an HR Leader Training My Team".
2. **Team Savings Calculator**: Interactive slider (5–50+ members). Volume discounts: 15% (5+), 25% (10+), 35% (20+). Instant price output.
3. **CFO Business Case**: 3 stat pillars — $150,000+ compliance risk | -24% turnover | standardized policy execution.
4. **Ready-to-Send Boss Pitch Kit**: Pre-written email + PDF download + clipboard copy button.

---

## Hub 3: Recertification & Credits — 3-Section Blueprint

1. **Zero-Panic Hero**: 2-column. Trust seals: HRCI Approved Provider | SHRM Recertification Provider | Ethics Credits Included.
2. **Smart Pricing Comparison**: 2 cards — 3-Year All-Inclusive Pass ($500 total, "$1 year free" framing) vs 1-Year Standard ($250/yr).
3. **Live Credit Tracker Demo**: Interactive progress meters (HRCI General, Business Credits, Ethics, SHRM PDC). 2-column: explanation left, meters right.

---

## Shared Prototype Footer (Consistent Across All 3 Pages)

Every hub ends with an identical 4-row footer:
1. **Advisor CTA**: *"Still thinking? Talk to a real HR instructor — not a chatbot."* + Phone + 2 buttons.
2. **Provider Seals Strip**: HRCI seal | SHRM seal | 4.9★ / 49+ reviews | 10,000+ certified | 100% guarantee.
3. **Cross-Page Nav**: Certification Prep | Employer Funding & Teams | Recertification Credits.
4. **Trademark Legal**: Full HRCI & SHRM trademark disclaimers + non-affiliation notice.

---

## Low-Fi Prototype App — Technical Reference

**Location**: `01-education/00-certification-2026-redesign/critique-app/`
**Stack**: Vite + Vanilla JS + Vanilla CSS
**Dev server**: `npm run dev` (port 5173)

### File Structure
```
critique-app/
  src/
    main.js           -- All rendering logic (renderHub1/2/3Wireframe, renderPrototypeFooter)
    style.css         -- Full wireframe component CSS
    data/
      lowfi-data.js   -- Single source of truth for all 3 hub content & psychology rationale
      critique-data.js -- Page critique content (7-page analysis)
  public/
    screenshots/      -- PNG screenshots of current live pages for critique view
```

### Low-Fi Prototype Design Rules (STRICT — Do Not Break)
- **Zero color** — only `#000000`, `#ffffff`, and gray shades. No brand colors whatsoever.
- **Desktop only** — `min-width: 1440px`. No responsive/mobile needed.
- **1:3 split layout** — Left dark panel (~310px sticky) for psychology rationale, right white canvas (~72%) for prototype.
- **Left panel**: `#0b0f19` background, `#38bdf8` active card outline, `#34d399` conversion-fix tags. Plain English only — never reference named psychology laws or "Growth.Design".
- **One image per page** — only in the hero section (right column). All image placeholders use `.wire-image-box` with crosshair SVG pattern.
- **Sections alternate shaded** — `.wire-section-shaded` adds `#f7f7f7` background to alternate sections.
- **2-column layouts** — Hero uses `.wire-hero-section` (50/50), sections use `.wire-split-section` (1fr / 1.2fr).

### Key CSS Classes (Do Not Rename)
| Class | Purpose |
|-------|---------|
| `.lowfi-left-panel` | Dark strategy console |
| `.lowfi-canvas` | White prototype canvas |
| `.wire-hero-section` | 2-column hero (50/50 grid) |
| `.wire-split-section` | 2-column content split |
| `.wire-section-shaded` | Alternating `#f7f7f7` section bg |
| `.wire-pillars-grid` | Eric's 4-card value pillars grid |
| `.wire-video-frame` | Greg's video embed dark frame |
| `.wire-resource-grid` | Shelley's 5 authority cards (3-col) |
| `.wire-proto-footer` | Shared 4-row footer |
| `.wire-image-box` | Image placeholder with crosshair |
| `.wire-proof-photo-box` | Student photo placeholder with crosshair |

---

## Behavioral Psychology Framework (Plain English)

Always explain WHY each section exists in plain language — never reference law names or academic frameworks by name:

| Section | Plain-English Rationale |
|---------|------------------------|
| Hero salary lead | When people immediately see a concrete personal benefit, they stop questioning and start figuring out how to get it |
| Value pillars | Answering "why should I do this now?" with tangible, undeniable returns before they even look at prices |
| Exam Matcher | Reducing choices to 3 instant options eliminates decision paralysis — guided feels better than overwhelmed |
| Pricing tiers | 3 labelled options with guarantee embedded at the price point removes the moment of financial hesitation |
| Boss Pay trigger | The barrier isn't the manager's willingness to approve — it's the employee's fear of asking |
| Graduate photos | Real faces and specific salary numbers convert infinitely better than anonymous star ratings |
| 7-Step roadmap | Breaking a 16-week commitment into small named steps makes the journey feel short, not intimidating |
| Shelley's resource cards | Research-oriented buyers want proof of expertise before they spend money — these give them authority to trust |
| FAQ | By the time visitors scroll to FAQ, they're interested but have 1–2 final fears. Answer them before they leave |
| Shared footer | The Peak-End Rule — ending every page with human contact closes the experience on reassurance, not a dead end |

---

## Design System (High-Fidelity CMS Pages — Not Prototype)

When building the actual CMS HTML pages (not low-fi prototype):
- **Navy/Charcoal**: `#2a343e` / `#0f172a` (Primary typography)
- **Brand Magenta/Pink**: `#e51069` (Badges, accents)
- **Brand Coral/Orange**: `#ef4a3d` (Primary CTA pills)
- **Accent Cyan**: `#4ac4d6` (Pass assurance, stats)
- **Accent Gold**: `#fdb414` (Offer badges, star ratings)
- **Canvas**: `#ffffff` / `#f8fafc` / `#ebf2f8` (Light sections), `#1e3a8a` (Recertification hero)
- **4-Dot Brand Motif**: `#ef4a3d`, `#fdb414`, `#94c83d`, `#4ac4d6`

---

## Key Contacts & Collaborators

| Name | Role | Key Input |
|------|------|-----------|
| Eric Anderson | Lead Content Writer | New headlines, 4 value pillars, 7-step roadmap, 3-tier comparison matrix |
| Jennifer Marants | Course Director / Lead Instructor | Student pathway infographic, instructor notes |
| Greg Osmond | Video/Media Producer | Landscape pros & cons video (in production — do NOT use vertical mobile cut) |
| Shelley Marsland | Team / Marketing Lead | 5 certification authority article cards, resource center requirement |
