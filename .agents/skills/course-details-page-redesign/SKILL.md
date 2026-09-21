---
name: course-details-page-redesign
description: Production design blueprint, UI/UX architecture, component skeleton, and styling standards for HR.com certification course detail pages (16-week, 8-week, aPHR, SHRM prep). Activate when redesigning, creating, or polishing individual certification course detail pages.
---

# HR.com Certification Course Detail Pages — 2026 Redesign Blueprint & Skill

## 1. Role, Purpose & Master Reference

### A. Purpose
This skill governs the redesign and production of all individual **HR.com Certification Course Detail Pages** (e.g., 16-Week Online Prep, 8-Week Accelerated Prep, aPHR Exam Prep, SHRM-CP/SCP Prep, Self-Paced Prep).

### B. The Living Golden Benchmark (`16-weeks-dev.html`)
- **Master Design & Layout Benchmark**: [`01-education/02-certification-pages/16-weeks-dev.html`](file:///e:/HR/00-html/01-education/02-certification-pages/16-weeks-dev.html)
- **CMS Outer Master Template**: [`01-education/02-certification-pages/00-template-dev/2026_CertificationDetailsPages-dev.html`](file:///e:/HR/00-html/01-education/02-certification-pages/00-template-dev/2026_CertificationDetailsPages-dev.html)

> [!IMPORTANT]
> **MANDATORY DESIGN & LAYOUT BENCHMARK RULE (16-WEEKS-DEV.HTML)**:
> - **1:1 Design & Layout Mirroring**: `16-weeks-dev.html` is the **exclusive, non-negotiable benchmark for all visual design, layout structures, CSS token hierarchies, responsive grid ratios, UI component skeletons, and JavaScript interactions**.
> - **Never Alter Layout Architecture**: Do NOT alter, re-invent, or deviate from the component layouts established in `16-weeks-dev.html` when building other course pages (`8-weeks-dev.html`, `aphr-prep-dev.html`, `shrm-prep-dev.html`, etc.).
> - **Strict Separation of Design vs Text/Data**:
>   - **Design & Layout**: Inherited 1:1 identically from `16-weeks-dev.html` (CSS tokens, hero 3-button cluster, obsidian seal card, sticky subnav, overview master box, 3-tab segmented dock, 6 progressive disclosure cards with read more/less, 3-tier porcelain slate pricing, cohort enrollment schedule master card with early bird bar, VIP refer-a-friend strip, Prime HR bundle banner, 90px circular avatar testimonial slider, related products grid, modals).
>   - **Text & Data (Course-Specific ONLY)**: Text is NOT copied from 16-week if the target course has its own copy. Course-specific title, description, curriculum hours, study manual counts, pricing amounts, product IDs, cohort schedules, instructors, and credential targets must come directly from the course's verified legacy source file.

### C. Target Course Detail Suite
| Course | Legacy Source File | Target Production File | Primary Target Credentials |
|--------|-------------------|------------------------|---------------------------|
| **16-Week Prep** | `cert-prep-tracker/16-week/16-week.html` | `02-certification-pages/16-weeks-dev.html` | PHR, SPHR, SHRM-CP, SHRM-SCP |
| **8-Week Prep** | `cert-prep-tracker/8-week/8-week.html` | `02-certification-pages/8-weeks-dev.html` | PHR, SPHR, SHRM-CP, SHRM-SCP (Accelerated) |
| **aPHR Prep** | `cert-prep-tracker/aphr-prep/aphr-prep.html` | `02-certification-pages/aphr-prep-dev.html` | aPHR (Foundational) |
| **SHRM Prep** | `cert-prep-tracker/shrm-prep/shrm-prep.html` | `02-certification-pages/shrm-prep-dev.html` | SHRM-CP, SHRM-SCP |
| **Materials Only / Self-Paced** | `cert-prep-tracker/...` | `02-certification-pages/...` | Self-paced / LMS self-study |

---

## 2. Strict Content & Design Directives

1. **🚫 STRICT CONTENT INTEGRITY (NON-NEGOTIABLE)**:
   - **Zero Copywriting / Zero Text Alteration**: Never modify, paraphrase, or rewrite approved text, curriculum descriptions, or policies. Maintain exact course copy from its authentic source file.
   - **Zero Invented Stats**: Do NOT fabricate pass rates, student counts, or guarantee percentages. Only display verified figures (e.g., official **95.6%** pass rate, **100% Money-Back Guarantee**).
   - **Zero Fake Promises**: No artificial timers, countdowns, or manufactured urgency.
   - **CDN Image Paths**: Always use `https://public-cdn.hr.com/` for all images (replace any `$public` tokens).
2. **Design System Tokens (Identical across Suite)**:
   - **Typography**: `Plus Jakarta Sans` exclusively (`font-family: 'Plus Jakarta Sans', -apple-system, sans-serif !important;`).
   - **Primary Action (Trust)**: International Cobalt (`#2563EB`, hover `#1D4ED8`).
   - **Prestige Anchor**: Midnight Obsidian (`#090D1A` / `#0F172A`).
   - **Success / Passing**: Growth Emerald (`#059669` / `#10B981`, badges `#6EE7B7`).
   - **Honors / Guarantee**: Burnished Honor Gold (`#D97706` / `#F59E0B`, badges `#FCD34D`).
   - **Canvases**: Pure White (`#FFFFFF`), Soft Porcelain Slate (`#F8FAFC`), Soft Slate Tint (`#F1F5F9`). Hairline borders (`#E2E8F0`).
3. **Scoping & Layout**:
   - Page container must use a unique scoped wrapper class (e.g. `.edu-16week-page`, `.edu-8week-page`, `.edu-aphr-page`, `.edu-shrm-page`).
   - Overrides must use `!important` to isolate against global legacy CMS stylesheet bleed.

---

## 3. The 9-Section Modular Course Anatomy

Every certification course detail page consists of the following 9 modules in exact sequence:

```
[1. Hero Stage & Concierge Support Desk]
           ↓
[2. Sticky Landmark In-Page Subnav]
           ↓
[3. Course Overview Inclusions Master Box]
           ↓
[4. Features & Benefits with Progressive Disclosure (3 Tabs)]
           ↓
[5. Pricing Section — Option A (Porcelain Slate Canvas)]
           ↓
[6. Cohort Enrollment Schedule Master Card]
           ↓
[7. Refer-a-Friend VIP Perks Strip]
           ↓
[8. Prime HR Membership Bundle Banner]
           ↓
[9. Testimonials Slider + Related Products + Legal Disclaimers]
```

---

### Section 1: Executive Hero Stage & Support Concierge Line
- **Canvas & Spacing**:
  - Background: Multi-stop atmospheric light gradient with subtle radial glow:
    ```css
    background: 
      radial-gradient(circle at 85% 15%, rgba(37, 99, 235, 0.05) 0%, transparent 45%),
      radial-gradient(circle at 10% 85%, rgba(79, 70, 229, 0.04) 0%, transparent 50%),
      linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%) !important;
    border-bottom: 1px solid var(--color-border) !important;
    padding: 76px 0 44px 0 !important;
    ```
  - Container: `width: min(100% - 48px, 1220px); margin: 0 auto;`
- **2-Column Grid**:
  - `grid-template-columns: 1.32fr 0.68fr !important; gap: 48px !important; margin-bottom: 38px !important;`
- **Left Column (Value Proposition)**:
  - **Minimal Back Link**: Inline link (`← Exam Prep`) with clean underline and slate coloring (`#64748B`, hover `#2563EB`). No bulky pill box.
  - **Credentials Eyebrow**: Uppercase bold text in Cobalt Blue (`font-size: 14.5px; font-weight: 800; letter-spacing: 0.05em; color: #2563EB;`).
  - **H1 Course Title**: Tight letter-spacing (`-0.03em`), bold weight (`800`), font size `42px`, line-height `1.18`.
  - **H2 Subhead**: `font-size: 21px; font-weight: 600; color: #334155; line-height: 1.4;`.
  - **Lead Value Paragraph**: `font-size: 16px; line-height: 1.65; color: #475569; max-width: 640px; margin-bottom: 32px;`.
  - **Single-Row 3-Button Action Cluster**:
    - Wrapper: `display: flex; align-items: center; gap: 10px; flex-wrap: wrap;`
    - Primary CTA (`View upcoming classes →`): `padding: 11.5px 20px; font-size: 14px; font-weight: 700; white-space: nowrap;`
    - Secondary CTA 1 (`📅 Join an Information Session`): `padding: 10.5px 14px; font-size: 13px; font-weight: 700; background: #FFF; border: 1.5px solid #CBD5E1; white-space: nowrap;`
    - Secondary CTA 2 (`📥 Download brochure`): `padding: 10.5px 14px; font-size: 13px; font-weight: 700; background: #FFF; border: 1.5px solid #CBD5E1; white-space: nowrap;`
- **Right Column (Prestige Visual Card)**:
  - Container: Midnight Obsidian gradient (`linear-gradient(150deg, #090D1A 0%, #0F172A 50%, #1E1B4B 100%)`), `border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; padding: 36px 30px; max-width: 400px;`.
  - Top: White circular seal container (`padding: 10px; border-radius: 50%; box-shadow: 0 8px 24px rgba(0,0,0,0.25);`) holding the accreditation logo (`max-width: 140px`).
  - Bottom: Divider with twin dark-glass stat badges:
    - **100% Money Back**: Gold tint (`rgba(217, 119, 6, 0.16)`), border (`rgba(245, 158, 11, 0.35)`), number `#FCD34D`.
    - **95.6% Pass Rate**: Emerald tint (`rgba(16, 185, 129, 0.16)`), border (`rgba(52, 211, 153, 0.35)`), number `#6EE7B7`.
- **Support Concierge Line**:
  - Non-competing subtle strip anchored below the hero grid: `border-top: 1px solid rgba(203, 213, 225, 0.7); padding: 22px 6px 0 6px;`.
  - Displays: Phone (`1-877-472-6648 Ext. 102`), Email (`certification@hr.com`), FAQ modal link, Refer a friend link.

---

### Section 2: In-Page Sticky Landmark Subnav
- **Fixed Offset**: Calculated dynamically via JS: `stickyTop = mainNavHeight + 10px` to sit with a crisp 10px gap below the fixed CMS navigation header.
- **Scrollspy Links**:
  - `Overview` (`#eduOverview`)
  - `Features & Benefits` (`#eduFandB`)
  - `Pricing` (`#eduPricing`)
  - `Enroll` (`#eduEnroll`)
  - `Testimonials` (`#eduTestimonials`)
  - `Related Products` (`#eduRproduct`)
- **Visuals**: Frosted glass (`background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border);`). Active link receives Cobalt pill background.

---

### Section 3: Course Overview Inclusions Master Box
- **Unified Container**: Replaces fragmented separate boxes with **one integrated master card container** (`.edu-overview-card-container`).
- **Integrated Header**: Section title (`Course overview`) is positioned *inside* the master card header (`.edu-overview-card-header`), establishing clean encapsulation.
- **Bold Scannable Metrics**:
  - Highlight key numbers in dark obsidian bolding (`#0F172A`, font-weight `800`):
    - **35+ hours** of live online instruction
    - **6 study manuals** (or course-specific quantity)
    - **800+ practice exam questions**
    - **100% Money Back** Pass Assurance Guarantee
    - **1-year access** to LMS and recorded sessions
- **Right Media Column Image Sizing Restraint**:
  - Container `.edu-materials-display-card`: `background: transparent; border: none; padding: 0; display: flex; align-items: center; justify-content: center;`.
  - Image `.edu-materials-hero-img`: Strictly constrain with `width: 100%; max-width: 340px; height: auto; object-fit: contain;` (with soft drop-shadow `0 14px 28px rgba(15, 23, 42, 0.1)` and subtle hover transition) so it sits proportionally balanced and only slightly taller than the text block rather than expanding to fill the entire grid column.

---

### Section 4: Features & Benefits with Progressive Disclosure
- **3 Tab Panes**:
  1. `Features & Benefits`
  2. `Why become certified?` (Includes salary stats and infographic)
  3. `System Requirements` (Google Meet download link and instructions)
- **6 Feature Cards with Progressive Disclosure**:
  - Each card contains:
    - Dedicated icon badge (Cobalt, Indigo, Emerald, Gold)
    - Feature title (e.g., *100% money back guarantee*, *Live, interactive sessions*, *95.6% exam success rate*)
    - **2-Line Lead Preview**: Clean summary sentence in `#475569`.
    - **Animated Toggle**: `<button class="edu-toggle-readmore" onclick="toggleFeatureReadMore(this)"><span>Read more</span> <svg chevron></svg></button>`
    - **Hidden Expansion Content**: Reveals full details, terms, and eligibility on click with zero page jump.
  - **Symmetrical Card Heights**: When collapsed, all 6 cards maintain uniform, scannable heights.

---

### Section 5: Pricing Section (Option A — Soft Porcelain Slate Canvas)
- **Visual Rhythm**: Replaces heavy pitch-black backdrops with a refined, executive **Soft Porcelain Slate canvas (`#F8FAFC`)** bounded by hairline borders (`#E2E8F0`).
- **Title**: High-contrast obsidian (`color: #0F172A; font-weight: 800; text-align: center;`).
- **3-Tier Card Grid**:
  - Tier 1: **HR.com Prime members** (e.g., `$1065 US + shipping`)
  - Tier 2 (Highlighted): **Bundle + Prime Membership + Course** (e.g., `$1155 US + shipping`):
    - Border: `2px solid var(--color-primary) !important;` (`#2563EB`)
    - Scale: `transform: scale(1.02);`
    - Shadow: `0 10px 30px rgba(37, 99, 235, 0.12)`
    - Badge: Positioned at top center (`Popular Choice` uppercase pill in `#2563EB`).
  - Tier 3: **Non HR.com Prime members** (e.g., `$1365 US + shipping`)
- **Bottom CTA**: Centered primary button (`Check out the HR.com Prime member`) with high-trust shadow glow.

---

### Section 6: Cohort Enrollment Schedule Master Card
- **Master Enclosing Card Container**: Encloses the announcement bar, table header, cohort cards, and policy footer inside one master card (`.edu-enroll-master-card`).
- **Unified Early Bird Bar**: Top announcement strip (`EARLYBIRD50`, save $50 with red/amber accent).
- **Multi-Column Cohort Grid**:
  - Columns: `Group Name` (with deadline tag) | `Date & Scheduling` (Dates, days of week, time ET) | `Instructor` | `Actions`
  - Cohort Actions:
    - Primary CTA: `Purchase Course →`
    - Bundle CTA: `Purchase Course + HR Prime Bundle` (Secondary blue-tinted action button)
    - Direct modal trigger: `Map shipment` link.
- **Integrated Enrollment Footer**:
  - Secondary CTA button: `BE THE FIRST TO SEE NEW CLASSES`.
  - Clean two-paragraph withdrawal policies and contact info (`certification@hr.com`, `1-877-472-6648 Ext. 102`).

---

### Section 7: Refer A Friend Strip
- **Prestige Obsidian Bar**: Midnight Obsidian (`#090D1A`) with hairline borders.
- Gift icon in blue rounded container.
- Text: "Join an HR certification prep course and earn **up to 200** points!"
- Action: White pill button (`Refer a friend →`, hover turns `#2563EB`).

---

### Section 8: Prime HR Membership Bundle Banner
- **2-Column Layout**:
  - Left: Clean WebP image of tablet/compliance tools (`edu_bundlebox_bg.png`).
  - Right: "HR.com Prime" badge, heading "Bundle with Prime HR", value copy, and 5-point emerald checkmark list.
  - CTA Button: `Check out the HR.com Prime member →`.

---

### Section 9: Testimonials Slider, Related Products & Legal Disclaimers
- **Testimonials Slider**:
  - Customer quote, 5 emerald/gold star rating, graduate headshot circle (`90x90px`), credential badge (`PHR`, `SPHR`, etc.).
  - Nav controls: Previous/Next circular arrow buttons + interactive pill dot indicator.
  - Auto-rotates every 6 seconds, pauses on hover and touch.
- **Related Products Grid**:
  - 3-card scannable catalog featuring complementary options (e.g., 8-Week Course, aPHR Course, Self-Study Materials).
- **Legal Disclaimers**:
  - Footnote block detailing HRCI and SHRM trademarks, non-affiliation, and pass rate disclosures.

---

## 4. Standard JavaScript Controllers

Include these standard lightweight vanilla JS controllers at the bottom of each course detail page:

```javascript
// 1. Progressive Disclosure (Read More / Read Less)
function toggleFeatureReadMore(btn) {
  var body = btn.closest('.edu-feature-body');
  if (!body) return;
  var moreContent = body.querySelector('.edu-feature-more');
  var span = btn.querySelector('span');
  if (!moreContent) return;

  var isExpanded = btn.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    moreContent.classList.remove('is-expanded');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('is-active');
    if (span) span.textContent = 'Read more';
  } else {
    moreContent.classList.add('is-expanded');
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('is-active');
    if (span) span.textContent = 'Read less';
  }
}

// 2. Tab Navigation Controller
function switchEduTab(tabId, btnElement) {
  var container = btnElement.closest('.edu-features-section');
  if (!container) return;
  container.querySelectorAll('.edu-tab-nav-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  container.querySelectorAll('.edu-tab-pane').forEach(function(pane) {
    pane.classList.remove('active');
  });
  btnElement.classList.add('active');
  var target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}

// 3. Testimonials Carousel Controller (Auto-advance, touch, pause on hover)
// [Reference 16-weeks-dev.html lines 3360-3469]

// 4. Sticky Landmark In-Page Subnav with ScrollSpy
// [Reference 16-weeks-dev.html lines 3471-3650]
```

---

## 5. Course Page Conversion Checklist

When converting an existing course tracker page (e.g., `8-week.html`, `aphr-prep.html`, `shrm-prep.html`) into the new 2026 design:

- [ ] **Step 1: Create Scoped File**: Create `[course]-dev.html` in `01-education/02-certification-pages/` (e.g. `8-weeks-dev.html`).
- [ ] **Step 2: Inherit 16-Week Architecture**: Copy the complete 9-section structure and CSS from `16-weeks-dev.html`. Update the scoped wrapper (e.g. `.edu-8week-page`).
- [ ] **Step 3: Update Course Identity**:
  - Credentials pill (e.g., `aPHR`, `SHRM-CP, SHRM-SCP`).
  - H1 & H2 titles matching approved course copy.
  - Hero lead paragraph.
  - Verify 3 hero buttons sit on a single row.
- [ ] **Step 4: Update Course Overview Inclusions**:
  - Update instruction hours (e.g., 8-week = 20 hours; 16-week = 35+ hours).
  - Bold lead metrics (`#0F172A`, 800 weight).
- [ ] **Step 5: Port Verified Cohorts**:
  - Extract active groups from legacy tracker file (Group name, dates, days/times, instructor, LMS purchase links).
  - Populate into the `.edu-cohort-grid` rows inside the master schedule card.
- [ ] **Step 6: Update Pricing Tiers**:
  - Input exact verified prices for Prime, Bundle, and Non-Prime.
  - Ensure center bundle card has the Cobalt Blue highlighted border and "Popular Choice" badge.
- [ ] **Step 7: Verify Interactivity**:
  - Test `Read more` / `Read less` progressive disclosure on all feature cards.
  - Test sticky in-page subnav offset (`+10px` below main header).
  - Test smooth scrolling to all landmark sections (`#eduOverview`, `#eduFandB`, `#eduPricing`, `#eduEnroll`, `#eduTestimonials`, `#eduRproduct`).
  - Test testimonials slider controls and touch gestures.
