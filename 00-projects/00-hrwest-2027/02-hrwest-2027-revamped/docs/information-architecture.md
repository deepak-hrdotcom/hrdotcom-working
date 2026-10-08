# HR West 2027 — Content Inventory & Information Architecture (IA) Specification

> **Document Status**: Production Specification  
> **Target Application**: HR West 2027 Web Application  
> **Last Updated**: July 30, 2026  

---

## 1. Product Vision & Conversion Architecture

**HR West 2027** is designed as a high-converting, interactive web application serving two distinct user personas through a **Dual-Engine Architecture**:

1. **Attendee Engine (Engine A)**: Converts HR Professionals, Managers, and CHROs into registered attendees by emphasizing HR strategy, recertification credits (SHRM & HRCI), world-class speakers, interactive track builders, and boss justification toolkits.
2. **Sponsor/Exhibitor Engine (Engine B)**: Converts HR Solution Providers and Vendors into sponsors by proving audience seniority, decision-making authority, and direct engagement opportunities.

---

## 2. Sitemap & Navigation Hierarchy

```
HR West 2027 Web App (Root: /)
├── 01. Homepage (/)
├── 02. Speakers Directory (/speakers)
├── 03. Interactive Agenda (/agenda)
├── 04. Sponsor Hall (/sponsors)
├── 05. Why Sponsor / Exhibit (/sponsor)
├── 06. Attend as a Team (/attend/team)
├── 07. Convince Your Boss (/attend/convince-boss)
├── 08. Venue & Location (/attend/location)
├── 09. Volunteer Program (/attend/volunteer)
└── 10. Pre-Registration & Checkout (/register)
```

---

## 3. Comprehensive Content Inventory Across All 10 Pages

### Page 1: Homepage (`/`)
* **Hero Title**: `HRWest 2027: Imagine What's Possible`
* **Subtitle**: `Where fresh ideas meet practical expertise. Join West Coast HR leaders for two transformative days of AI-driven strategy, legal compliance, and talent innovation.`
* **Event Metadata**: `March 23-24, 2027` | `South San Francisco Conference Center`
* **Primary CTAs**:
  - `Pre-Register for 2027` (Gradient Glow Primary Button)
  - `Why Sponsor / Exhibit` (Glass Outline Secondary Button)
* **Social Proof Marquee**:
  - Metrics: `1,000+ HR Leaders`, `50+ Sessions`, `20+ Recert Credits`, `60+ Exhibitors`
  - Attendee Photo Carousel & Testimonial Snippets
* **Featured Speakers Section**: `Real Experts Who Help HR Move Forward`
  - Featured Cards: Jason Averbook, Allison West + cutout speaker pills.
* **6-Track Interactive Matrix**:
  1. HR Strategy & AI
  2. Legal & Compliance
  3. HR Technology & Analytics
  4. Talent Acquisition & Retention
  5. Leadership & Organizational Culture
  6. Employee Health & Wellness
* **Venue Teaser**: Highlight of South San Francisco Conference Center + interactive map preview.

---

### Page 2: Speakers Directory (`/speakers`)
* **Hero Header**: `HRWest 2027 Keynotes & Speakers`
* **Call for Speakers Banner**: `Submit Your Speaker Proposal — Deadline: October 30, 2026` + `Submit Proposal` CTA button.
* **Filter Suite**:
  - Filter by Track dropdown / pills
  - Real-time search input (by Speaker Name, Title, or Company)
* **Speaker Grid Cards**:
  - High-res Speaker Headshot
  - Track Tag Pill
  - Speaker Full Name & Title
  - Company Logo & Name
  - Session Title & Short Abstract
  - `View Bio & Sessions` Modal Trigger

---

### Page 3: Interactive Agenda (`/agenda`)
* **Hero Header**: `HRWest 2027 Conference Schedule`
* **Day Selector Tabs**: `Day 1 — March 23, 2027` | `Day 2 — March 24, 2027`
* **Track Filters**: Toggle pills for all 6 tracks.
* **Interactive Time Slot Grid**:
  - Keynote Sessions (Full Width)
  - Concurrent Breakout Cards (Time slot, Track badge, Room location, Speaker info, Bookmark CTA button)
  - Personal Schedule Builder drawer/counter.

---

### Page 4: Sponsor Hall (`/sponsors`)
* **Hero Header**: `HRWest 2027 Sponsors & Exhibitors`
* **Subtitle**: `Industry-leading solution providers driving the future of HR technology and services.`
* **Sponsor Tier Layout**:
  - Diamond / Platinum Sponsors (Featured large cards with company overview)
  - Gold & Silver Sponsors (Grid layout with logo, category, booth number, and web link)
  - Deduplicated Past Sponsors Marquee (SAP SuccessFactors, UKG, Rippling, Alliant, Robert Half, Insperity).

---

### Page 5: Why Sponsor / Exhibit (`/sponsor`)
* **Hero Header**: `Connect Directly with HR Decision-Makers`
* **Audience Metrics Dashboard**:
  - Seniority Breakdown: `68% Manager & Above`, `24% Director/VP/CHRO`
  - Purchasing Authority Chart
  - Company Size Breakdown (`100–5,000+ employees`)
* **Interactive Prospectus Form**:
  - Name, Work Email, Company, Phone, Estimated Budget Range
  - `Download Sponsorship Prospectus` CTA.

---

### Page 6: Attend as a Team (`/attend/team`)
* **Hero Header**: `Bring Your HR Team & Save`
* **Interactive Team Discount Calculator**:
  - Team Size Slider / Selector (1 to 20+ attendees)
  - Discount Tier Rules:
    - 3–5 Attendees: `15% Off`
    - 6–10 Attendees: `25% Off`
    - 10+ Attendees: `Custom Enterprise Group Pricing`
  - Dynamic Savings Summary ($ saved total, per-ticket final rate)
  - `Register Your Team` CTA.

---

### Page 7: Convince Your Boss (`/attend/convince-boss`)
* **Hero Header**: `Get Your Manager to Approve Your HRWest Trip`
* **ROI Justification Toolkit**:
  - Recertification Credits ROI breakdown (SHRM/HRCI)
  - Expense Estimator Widget (Ticket + Hotel + Travel total)
* **Interactive Letter Generator**:
  - Inputs: Attendee Name, Boss Name, Company, Selected Key Tracks
  - Live Preview & One-Click `Copy Email Template` / `Download PDF Justification`.

---

### Page 8: Venue & Location (`/attend/location`)
* **Hero Header**: `South San Francisco Conference Center`
* **Venue Overview**: Address, photos, transit logistics (SFO Airport distance, BART, Shuttle info).
* **Accommodations & Hotels**: Discounted partner hotel blocks, booking links, and cutoff dates.

---

### Page 9: Volunteer Program (`/attend/volunteer`)
* **Hero Header**: `Volunteer at HRWest 2027`
* **Program Benefits**: Free full-conference registration in exchange for shift support.
* **Application Intake Form**:
  - Personal info, HR status, preferred volunteer roles, shift availability.

---

### Page 10: Pre-Registration (`/register`)
* **Hero Header**: `HRWest 2027 Pre-Registration`
* **Ticket Tier Cards**:
  - Super Early Bird / Standard / Team Pass / Virtual Option
* **Intake Form**:
  - Contact Details, HR Title, Company Size, Industry, Recertification Needs (SHRM/HRCI), Payment/Invoice Summary.

---

## 4. Visual Design System & HSL Tokens

### Color Tokens
```css
:root {
  --color-brand-purple: HSL(302, 58%, 36%); /* #91278c */
  --color-brand-pink: HSL(335, 89%, 51%);   /* #ef146e */
  --color-surface-dark: HSL(220, 35%, 7%);  /* #0b0f17 */
  --color-surface-light: HSL(240, 33%, 99%);/* #fbfbfe */
  --color-glass-border: rgba(255, 255, 255, 0.12);
  --color-glass-bg: rgba(11, 15, 23, 0.75);
}
```

---

## 5. Technical Next Steps for Development

1. Initialize app boilerplate inside [`00-hrwest-2027/03-app/`](file:///e:/HR/00-html/00-hrwest-2027/03-app/).
2. Create reusable component primitives (Button, Card, Badge, Modal, Input, Slider).
3. Implement dynamic interactive widgets (Team Discount Calculator, Convince Your Boss Generator, Agenda Filter).
