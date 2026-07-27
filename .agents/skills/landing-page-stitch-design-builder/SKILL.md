---
name: landing-page-stitch-design-builder  
description: Generates UI screens and multi-page designs in Stitch using the Stitch MCP server while respecting brand guidelines, design inspiration images, and modern UI layout principles.

---

# Landing Page Stitch Design Builder

This skill generates **UI screens inside Stitch using the Stitch MCP server**.

The goal is to translate user ideas into **clean, modern UI screens** with strong visual hierarchy and spacing.

The output must be optimized for **Stitch screen generation**, not HTML or React.

---

# Design Role

The agent must act as a **Senior User Experience Designer and User Interface Designer** when generating designs in Stitch.

Design output should reflect the thinking of an experienced SaaS product designer responsible for marketing pages, research pages, event pages, and promotional landing pages.

Design priorities:

- clear visual hierarchy
- strong information architecture
- modern SaaS marketing design patterns
- engaging fluid typography and micro-animations
- conversion-focused landing page structure
- large readable typography with text gradients
- generous whitespace, glassmorphism, and visual depth
- modular section systems like Bento Box layouts
- edge-to-edge / full-bleed responsive layouts with overlapping elements

Every page should guide the user's attention in the following order:

1. Headline
2. Value proposition
3. Supporting proof or context
4. Call-to-action

Layouts should:

- feel modern and spacious
- avoid clutter
- avoid generic template layouts
- avoid unnecessary decorative elements
- maintain strong scannability

The agent should think critically about section hierarchy, spacing, and content flow rather than simply generating UI blocks.

---

# Required Dependencies

This skill assumes the following tools already exist:

• Stitch MCP server  
• brand-identity skill  
• design-guidelines folder  

The skill must always consult the **brand-identity skill** before generating UI.

---

# Brand References

The design system is defined inside:

design-guidelines/brand-guidelines.pdf  
design-guidelines/hrdotcom-dark.png  
design-guidelines/hrdotcom-white.png  
design-guidelines/motif.jpg  

These files define:

• brand colors  
• typography  
• logo usage  
• motif usage  
• visual tone  

Never invent brand colors or typography.

Always extract them from the brand guideline file.

---

# Design Inspiration

The design-guidelines folder may contain inspiration images.

Example:

design-guidelines/inspo1.jpg  
design-guidelines/inspo2.jpg  
design-guidelines/inspo3.jpg  

These images represent **visual inspiration only**.

They should influence:

• layout feel  
• section hierarchy  
• spacing rhythm  
• card style  
• UI density  

Important rules:

• Do NOT replicate layouts exactly  
• Do NOT copy components pixel-by-pixel  
• Use inspiration only for overall design direction  

The generated screens must remain flexible and adapted to the requested content.

---

# When to Use This Skill

Use this skill when:

• generating UI screens in Stitch  
• designing landing pages  
• creating dashboards  
• creating signup flows  
• creating marketing pages  
• generating multi-page UI systems  

---

# Multi-Device & Chunk-by-Chunk Generation

When designing marketing pages or campaign landing pages, you MUST adhere to two strict rules:

**1. Generate device layouts individually:**
   - **Step 1 (Desktop)**: Call `generate_screen_from_text` with `deviceType: "DESKTOP"`.
   - **Step 2 (Mobile)**: Call `generate_screen_from_text` with `deviceType: "MOBILE"`.

**2. Generate in bite-sized sections (Superpowers Executing-Plans philosophy):**
   - **Do NOT** feed Stitch one massive prompt asking for a full landing page.
   - Execute the plan created by the `marketing-campaign-planner` section-by-section.
   - Generate Section 1 (e.g., Hero), verify it, then generate Section 2 (e.g., Features).
   - This prevents hallucination, layout drift, and overwhelming the generation tool.

---

# Design Principles

All generated designs should follow these principles:

• modern clean UI  
• strong visual hierarchy  
• large readable typography  
• generous white space  
• minimal visual clutter  
• clear call-to-action hierarchy  

Preferred layout characteristics:

• full-bleed section backgrounds with mesh gradients  
• centered content blocks with overlapping elements  
• card-based and Bento Box CSS Grid layouts  
• modular UI sections using glassmorphism  
• fluid and responsive-friendly layouts  

---

# Stitch Generation Workflow

Step 1  
Understand the user prompt.

Step 2  
Consult the **brand-identity skill**.

Step 3  
Review the **design-guidelines folder**.

Step 4  
Use inspiration images to understand visual direction.

Step 5  
Construct a structured UI layout description.

Step 6  
**Ask Clarifying Questions & Get Confirmation**. Present the drafted layout to the user, ask needed questions, and **require explicit user confirmation** before generating.

Step 7  
Send the design prompt to **Stitch MCP** to generate the screen.

---

# Output Style

Prompts sent to Stitch should include:

• page purpose  
• layout structure  
• key UI components  
• hierarchy of sections  
• tone of visual design  

Example prompt style:

"Create a modern SaaS landing page with a large hero section, feature cards, testimonial block, and strong call-to-action. Use spacious layout, clear typography hierarchy, and clean modern styling inspired by the design reference images."

---

# Forbidden Behavior

Do NOT:

• copy inspiration screenshots directly  
• generate HTML code  
• generate React components  
• generate CSS or Tailwind  

This skill is strictly for **design generation in Stitch**.

---

# Examples

The examples folder should contain prompt examples such as:

• SaaS landing page prompt  
• dashboard prompt  
• signup flow prompt  
• marketing page prompt  

These examples help guide the agent to produce high-quality Stitch prompts.

---

# Validation

If Stitch MCP supports preview validation:

• verify screen hierarchy  
• verify spacing consistency  
• verify layout clarity  

If validation is too expensive in tokens, skip this step.

---

# Goal

This skill should enable Antigravity to transform simple ideas into **high-quality UI screens in Stitch that respect brand identity and visual inspiration**.
