# HR.com Certification Experience — UI Design System & Page Design Rules

## 0. Purpose

This document is the visual and interaction source of truth for redesigning HR.com certification pages.

The content, messaging, certification facts, course information, pricing, and SEO copy already exist.

**Your job is NOT to rewrite the content.**
Your job is to transform the existing content into a **world-class, modern, credible certification-learning experience** through:

- Information hierarchy
- Layout
- Typography
- Spacing
- Visual rhythm
- Components
- Interaction patterns
- Responsive behavior
- Conversion-focused UX
- Trust and credibility
- Accessibility
- Polished visual details

The final result should feel like a premium modern education/SaaS product rather than a traditional corporate training website.

---

# 1. Design North Star

### Core impression

The website should communicate:

> **"I can trust this platform to help me prepare seriously for my HR certification exam."**

The experience should feel:

- Premium
- Professional
- Intelligent
- Modern
- Calm
- Structured
- Credible
- Human
- Conversion-focused
- Easy to scan

Avoid making it feel:

- Generic corporate
- Like an old LMS
- Like a university website from 2015
- Overly playful
- Visually noisy
- AI-generated
- Template-like
- Excessively rounded
- Excessively gradient-heavy
- Like a marketing landing page with no substance

---

# 2. Design Philosophy

Use a **content-first product design approach**.

The page should not be designed as a collection of decorative sections.

Every section must answer one of these questions:

1. What is this?
2. Is this certification right for me?
3. Why should I trust HR.com?
4. What exactly will I learn?
5. How will this help me pass?
6. What does the learning experience look like?
7. What is included?
8. How much does it cost?
9. What do other professionals say?
10. What should I do next?

If a section does not serve a clear user need, simplify it or remove visual prominence.

---

# 3. Visual Direction

## Recommended visual language

Think:

**Modern B2B SaaS + premium professional education + certification authority**

Reference qualities, not direct copies:

- Linear-style clarity
- Stripe-style hierarchy
- Notion-style simplicity
- Modern Coursera-style learning credibility
- Premium SaaS dashboard information architecture

Do NOT copy any brand.

---

# 4. Brand Personality

The interface should feel:

### 70% Professional
Strong hierarchy, serious typography, credible information.

### 20% Modern
Contemporary layouts, subtle motion, cards, responsive grids.

### 10% Human
Testimonials, instructor imagery, learner outcomes, approachable microcopy.

Do not let visual effects overpower credibility.

---

# 5. Design Tokens

Use CSS variables / design tokens.

Do not hard-code values repeatedly.

## Color system

Use a restrained palette.

```css
:root {
  --color-primary: #4F46E5;
  --color-primary-hover: #4338CA;
  --color-primary-soft: #EEF2FF;

  --color-text-primary: #111827;
  --color-text-secondary: #4B5563;
  --color-text-muted: #6B7280;

  --color-background: #FFFFFF;
  --color-background-subtle: #F8FAFC;
  --color-background-soft: #F1F5F9;

  --color-border: #E5E7EB;
  --color-border-strong: #D1D5DB;

  --color-success: #15803D;
  --color-warning: #B45309;
  --color-error: #DC2626;

  --color-white: #FFFFFF;
}
```

### Color rules

Primary color should be used for:

- Primary CTAs
- Important links
- Selected states
- Progress indicators
- Key interactive elements
- Important highlights

Do not use the primary color everywhere.

Use mostly neutral surfaces and allow the primary color to create focus.

Avoid:

- Rainbow gradients
- Excessive colored cards
- Multiple competing accent colors
- Large decorative gradients behind every section

---

# 6. Typography

Typography is one of the most important parts of the redesign.

Use a modern sans-serif font.

Preferred:

- Inter
- Geist
- Manrope
- Plus Jakarta Sans

If the existing HR.com brand specifies a font, use the brand font instead.

## Type scale

Desktop:

```css
--text-xs: 12px;
--text-sm: 14px;
--text-md: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 32px;
--text-4xl: 40px;
--text-5xl: 52px;
--text-6xl: 64px;
```

Do not use huge headings simply because modern websites use large typography.

Certification pages need **clarity over spectacle**.

---

# 7. Typography Hierarchy

### H1

Use for the primary certification value proposition.

Recommended:

- 48–60px desktop
- 36–44px tablet
- 32–38px mobile
- Weight: 650–750
- Line-height: 1.05–1.12

### H2

32–40px desktop.

### H3

22–28px.

### Body

16–18px.

Body copy should generally have:

```css
line-height: 1.6;
```

Do not create giant paragraphs.

Keep text measure around:

```css
max-width: 680px;
```

for comfortable reading.

---

# 8. Spacing System

Use a consistent 4px/8px-based system.

```text
4
8
12
16
20
24
32
40
48
64
80
96
120
```

Recommended section spacing:

Desktop:
- Compact section: 64px
- Standard section: 80px
- Major section: 96–120px

Mobile:
- 40px
- 48px
- 64px

Do not create huge empty spaces simply to make the page look premium.

Whitespace should improve comprehension.

---

# 9. Container

Use a consistent maximum content width.

```css
.container {
  width: min(100% - 40px, 1200px);
  margin-inline: auto;
}
```

For wider visual sections:

```css
max-width: 1280px;
```

For reading-heavy sections:

```css
max-width: 760px;
```

Do not make every section full-width.

---

# 10. Border Radius

Use restrained rounding.

Recommended:

```text
Small controls: 8px
Inputs: 8–10px
Cards: 12–16px
Large feature panels: 20px
```

Avoid making every element pill-shaped.

Pills should primarily indicate:

- Tags
- Status
- Category
- Certification type
- Small metadata

---

# 11. Shadows

Use subtle shadows.

Prefer borders + very light shadows over floating cards.

Example:

```css
box-shadow:
  0 1px 2px rgba(15, 23, 42, 0.04),
  0 8px 24px rgba(15, 23, 42, 0.06);
```

Avoid:

- Strong black shadows
- Huge floating shadows
- Every card having a shadow

---

# 12. Grid System

Use CSS Grid/Flexbox.

Desktop:

```text
12-column conceptual grid
```

Common layouts:

```text
6 / 6
7 / 5
8 / 4
4 / 4 / 4
3 / 9
```

Mobile:

```text
1 column
```

Tablet:

```text
2 columns where appropriate
```

---

# 13. Certification Page Architecture

A strong certification page should generally follow this hierarchy.

## 01 — Hero

Purpose:

Immediately explain:

- Certification
- Who it is for
- Core value
- Primary action

Recommended structure:

```text
[Certification category / eyebrow]

H1:
Prepare for your [Certification] exam with confidence.

Supporting description

[Primary CTA] [Secondary CTA]

Trust / exam metadata

                    Certification visual
                    OR
                    Exam preparation summary card
```

Do NOT overload the hero.

Avoid placing 5–7 competing CTAs.

---

# 14. Hero Content Hierarchy

Priority:

### Level 1
Certification name + value proposition

### Level 2
Short explanation

### Level 3
Primary CTA

### Level 4
Trust indicators / exam facts

Everything else belongs below the fold.

---

# 15. Certification Snapshot

Immediately after the hero, consider a compact information strip.

Example:

```text
Exam
HRCI

Level
Professional

Format
Self-paced / Live

Duration
XX hours

Access
XX months
```

Use compact metadata rather than another large marketing section.

This helps users understand the offering quickly.

---

# 16. Why This Certification?

Use a structured section.

Avoid generic three-card marketing blocks.

Instead use:

```text
Why pursue this certification?

[01]
Career credibility
Short explanation

[02]
Professional knowledge
Short explanation

[03]
Career advancement
Short explanation
```

Use strong typography and simple visual markers.

Icons should be minimal.

---

# 17. What You'll Learn

This is a major content section.

Do NOT display 15–20 topics as random cards.

Use a structured curriculum interface.

Recommended:

```text
Course curriculum

[01] HR Strategy
     Description
     Topics
     Duration

[02] Workforce Planning
     Description
     Topics
     Duration

[03] Employee Relations
     Description
     Topics
     Duration
```

Possible UI:

- Accordion
- Vertical curriculum
- Tabs
- Timeline
- Structured expandable modules

Prefer accordion if there is substantial content.

---

# 18. Exam Preparation Section

This should feel different from generic course marketing.

The user wants to know:

> "Will this actually help me prepare for the exam?"

Use a strong visual section:

```text
Designed around the exam

[Concept learning]
Understand the subject

[Practice]
Apply what you learned

[Exam readiness]
Build confidence

[Final preparation]
Review and reinforce
```

Show actual preparation mechanics where content supports them:

- Practice questions
- Mock exams
- Exam simulations
- Study guides
- Learning objectives
- Review sessions
- Instructor guidance

Do not invent features that do not exist.

---

# 19. Learning Experience

Show the experience visually.

Possible layout:

```text
Learn
↓
Practice
↓
Review
↓
Assess
↓
Prepare
```

This can be represented as a horizontal flow on desktop and vertical flow on mobile.

Use subtle connectors.

---

# 20. Instructor Section

Instructor credibility matters heavily for professional certification.

Recommended:

```text
Meet your instructor

[Large professional portrait]

Name
Credentials

Short bio

Years of experience
Relevant expertise
Certification / credentials
```

Do not use a tiny circular headshot buried in a card.

The instructor should feel like a credible expert.

---

# 21. Social Proof

Do not make testimonials look like generic carousel widgets.

Use:

```text
What professionals say

★★★★★

"Short testimonial..."

Name
Role
Certification / industry
```

If available, include useful context:

- Job title
- Organization
- Certification achieved
- Career outcome

Avoid fabricated statistics.

---

# 22. Outcomes

Prefer tangible outcomes over vague statements.

Weak:

> Take your career to the next level.

Better:

> Build the knowledge required to prepare for the HRCI exam and apply core HR concepts in your work.

Use existing approved content.

Do not invent outcomes.

---

# 23. Pricing / Enrollment

Pricing should be extremely clear.

Recommended:

```text
Choose your learning option

──────────────────────

Option name
Short description

$XXX

What's included
✓
✓
✓

[Enroll now]

──────────────────────

Alternative option
...
```

Make the recommended option visually obvious.

Avoid dark, overly decorative pricing tables.

---

# 24. Sticky CTA

For long certification pages, consider a sticky bottom CTA on mobile.

Example:

```text
[Course name]                 [Enroll now]
```

Rules:

- Do not obscure content.
- Do not appear immediately if it feels aggressive.
- Respect mobile safe areas.
- Keep it compact.

---

# 25. FAQ

Use accordion.

Each question should have:

```text
Question
+
```

On open:

```text
Question
−

Answer
```

Avoid placing FAQ content into visually heavy cards.

---

# 26. Final CTA

The final CTA should summarize the decision.

Example structure:

```text
Ready to start preparing?

Short supporting statement

[Start preparing]
```

Keep this section visually strong but simple.

---

# 27. Navigation

The navigation should feel like a mature SaaS/product website.

Priorities:

1. Logo
2. Key navigation
3. Search / useful utility
4. Login
5. Primary CTA

Do not overcrowd the header.

On mobile:

```text
Logo
Menu
```

Keep navigation sticky only if it improves usability.

---

# 28. Component System

Create reusable components.

Minimum component library:

```text
Button
ButtonGroup
Badge
Breadcrumb
Card
CertificationBadge
CourseMeta
Accordion
Tabs
Avatar
Testimonial
InstructorCard
CurriculumItem
ProgressIndicator
PricingCard
FAQ
CTA
SectionHeader
Stat
Icon
Input
Select
Modal
Toast
Tooltip
```

Components must have:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading where relevant

---

# 29. Buttons

Primary:

```text
Solid primary color
Strong contrast
```

Secondary:

```text
Neutral / outlined
```

Tertiary:

```text
Text button
```

Button hierarchy should be obvious.

Avoid having multiple primary-looking buttons in one section.

Recommended height:

```text
44–48px
```

Large hero CTA:

```text
48–52px
```

---

# 30. Cards

Cards should group meaningful information.

Do NOT use cards merely because cards are fashionable.

Good uses:

- Course options
- Curriculum modules
- Instructor information
- Testimonials
- Pricing
- Exam information

Bad uses:

- Every paragraph
- Every statistic
- Every section
- Decorative empty boxes

---

# 31. Icons

Use one consistent icon family.

Recommended style:

- 1.5–2px stroke
- Simple
- Geometric
- Minimal

Avoid mixing:

- Filled icons
- Cartoon icons
- 3D icons
- Emoji
- Different icon families

Icons should support comprehension, not decorate empty space.

---

# 32. Images

Photography should feel:

- Professional
- Authentic
- Diverse
- Human
- High quality

Avoid generic corporate stock photography showing:

- Handshakes
- People pointing at laptops
- Fake meetings
- Excessive smiling office groups

For certification pages, prioritize:

1. Instructor
2. Learner
3. Certification/exam visual
4. Learning environment
5. Supporting imagery

---

# 33. Visual Treatments

Use visual depth carefully.

Allowed:

- Very subtle gradients
- Soft background shapes
- Thin borders
- Light blur
- Layered cards
- Subtle grid patterns
- Abstract professional shapes

Avoid:

- Giant glowing gradients
- Excessive glassmorphism
- Neon colors
- Heavy 3D
- Random blobs
- Decorative AI-looking backgrounds

---

# 34. Motion

Motion should communicate hierarchy and feedback.

Use:

- 150–250ms hover transitions
- 200–350ms dropdown/accordion transitions
- Subtle fade/slide on page entrance

Avoid:

- Excessive parallax
- Bouncing cards
- Continuous animations
- Distracting floating objects

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 35. Responsive Design

Design mobile intentionally.

Do NOT simply stack the desktop page.

Desktop:

```text
Hero: 2 columns
Curriculum: structured grid
Stats: horizontal
Pricing: multi-column
```

Mobile:

```text
Hero: single column
Stats: 2-column grid
Curriculum: accordion
Pricing: single column
CTA: full-width
```

Minimum mobile target:

```text
320px
```

Optimize especially for:

```text
360px
390px
430px
768px
1024px
1280px
1440px
```

---

# 36. Accessibility

Target WCAG 2.2 AA where practical.

Requirements:

- Proper semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible labels
- Sufficient contrast
- Alt text
- Correct heading hierarchy
- Do not rely only on color
- Touch targets approximately 44px or larger

---

# 37. Conversion Principles

The primary conversion is likely:

**Start / Enroll / Learn / Register**

The user should never wonder:

> "What am I supposed to do next?"

Use one dominant CTA.

CTA wording should use the actual approved product language.

Do not invent aggressive conversion copy.

Avoid:

- Fake urgency
- Fake countdown timers
- Fake scarcity
- Fake testimonials
- Fake statistics

---

# 38. Content Preservation Rule

This is critical.

### DO NOT:

- Rewrite approved content
- Invent claims
- Invent course features
- Invent statistics
- Change certification requirements
- Change pricing
- Change exam information
- Remove important content merely to make the page prettier

### DO:

- Reorganize content visually
- Improve hierarchy
- Split large blocks
- Convert suitable content into accordions
- Convert lists into structured layouts
- Highlight important facts
- Improve scanning
- Create stronger visual relationships

**Content accuracy always wins over visual design.**

---

# 39. Avoid the "AI Website" Look

The final design must NOT look AI-generated.

Avoid predictable AI design patterns:

- Giant centered headline + gradient blob
- 3 identical feature cards
- Excessive rounded rectangles
- Random purple/blue gradients
- Floating glass cards everywhere
- Decorative sparkles
- Huge meaningless statistics
- Generic stock illustrations
- Repeated "Everything you need..." marketing sections

The interface should look like it was designed by an experienced product designer.

---

# 40. Page Rhythm

A high-quality page should alternate between visual densities.

Example:

```text
HERO
↓
Compact certification facts
↓
Large editorial section
↓
Curriculum / structured content
↓
Visual learning experience
↓
Instructor
↓
Social proof
↓
Pricing
↓
FAQ
↓
Final CTA
```

Do not make every section identical.

Vary:

- Background
- Column structure
- Content density
- Visual emphasis
- Alignment

But maintain a consistent design system.

---

# 41. Visual Hierarchy Test

Before finalizing a page, squint at the page or view it at 25%.

You should immediately see:

1. Certification
2. Main value proposition
3. Primary CTA
4. Major content sections
5. Pricing / enrollment

If everything has equal visual weight, the design failed.

---

# 42. 5-Second Test

A first-time visitor should understand within approximately 5 seconds:

> What certification is this?

> Who is it for?

> What can I do here?

> Where do I start?

If not, simplify the hero.

---

# 43. Desktop Layout Example

```text
┌─────────────────────────────────────────────────────────────┐
│ LOGO       Certifications   Resources   ...    Login  CTA   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  EYEBROW                                                    │
│                                                             │
│  Prepare for your                                           │
│  certification exam                                        │
│                                                             │
│  Supporting content...              ┌─────────────────────┐ │
│                                     │ Certification       │ │
│  [Start preparing] [Learn more]     │ summary             │ │
│                                     │                     │ │
│                                     └─────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ EXAM    LEVEL    FORMAT    DURATION    ACCESS               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Why this certification?                                     │
│                                                             │
│ Structured explanation / benefits                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ What you'll learn                                           │
│                                                             │
│ Curriculum / accordion / modules                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Designed around the exam                                   │
│                                                             │
│ Learn → Practice → Review → Assess → Prepare                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Instructor / credibility                                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Testimonials                                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Pricing / enrollment                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ FAQ                                                         │
├─────────────────────────────────────────────────────────────┤
│ Final CTA                                                   │
└─────────────────────────────────────────────────────────────┘
```

This is a conceptual hierarchy, NOT a requirement to reproduce this exact layout.

---

# 44. Implementation Rules for Gemini

When generating the UI:

### Step 1
First inspect all existing content and identify:

- Content hierarchy
- User intent
- Primary conversion
- Important facts
- Repeated content
- Long content
- Supporting content

### Step 2
Create a page information architecture.

### Step 3
Create the design system tokens.

### Step 4
Create reusable components.

### Step 5
Build desktop layout.

### Step 6
Build mobile layout intentionally.

### Step 7
Review visual hierarchy.

### Step 8
Review accessibility.

### Step 9
Review conversion flow.

### Step 10
Polish spacing, typography, borders, states and micro-interactions.

---

# 45. Important Gemini Instruction

**Do not immediately start coding the page.**

First reason about:

1. User
2. Goal
3. Content hierarchy
4. Page structure
5. Visual hierarchy
6. Components
7. Responsive behavior

Then implement.

Do not generate a generic landing-page template.

---

# 46. Quality Bar

The final page should feel comparable in visual polish to a modern premium SaaS/product website.

Ask before finalizing:

### Design
- Does the page feel premium?
- Is the hierarchy obvious?
- Is whitespace intentional?
- Does the design have a visual rhythm?
- Are cards actually necessary?

### UX
- Can a user understand the certification quickly?
- Is the CTA obvious?
- Can users scan the curriculum?
- Is important information easy to find?

### Visual
- Is typography excellent?
- Are spacing values consistent?
- Are borders subtle?
- Are shadows restrained?
- Are colors controlled?
- Does it look human-designed rather than AI-generated?

### Responsive
- Does mobile feel intentionally designed?
- Are buttons easy to tap?
- Does content remain readable?
- Are tables/cards handled properly?

### Accessibility
- Keyboard navigation?
- Focus states?
- Contrast?
- Semantic headings?
- Accessible accordions/buttons?

---

# 47. Final Design Principle

The goal is NOT:

> "Make the website look fancy."

The goal is:

> **Make a serious HR professional feel confident that HR.com understands certification preparation and can help them succeed.**

The best design will therefore be:

**Clear + credible + modern + structured + human + conversion-focused.**

When forced to choose between visual novelty and clarity, **choose clarity.**
