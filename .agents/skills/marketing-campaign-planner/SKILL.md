---
name: marketing-campaign-planner
description: Applies a structured planning and brainstorming workflow (inspired by Superpowers) before generating designs or code. Use this skill to refine rough ideas, break down marketing campaigns into bite-sized sections, and present a complete spec for validation before jumping into the Stitch design builder or CMS HTML generation.
---

# Marketing Campaign Planner

This skill introduces a structured "Superpowers" style workflow for planning marketing campaigns and landing pages. 

It prevents the agent from rushing directly into coding or design generation by enforcing a "brainstorming" and "writing-plans" phase first.

---

# When to Use This Skill

Use this skill:
- immediately after `orchestrating-project-starts` but before generating designs
- when the user asks to plan a new campaign, feature, or page
- when the user provides a rough concept that needs refinement
- before breaking down a complex landing page into sections
- when applying the "Systematic over ad-hoc" philosophy to landing page creation

---

# The Basic Workflow

## 1. Brainstorming Phase (Activates before design)
- Step back and ask the user what they are ultimately trying to achieve with the campaign (e.g., goal, audience, tone).
- Refine rough ideas through Socratic questioning. Do not assume requirements.
- Explore structural alternatives (e.g., standard hero vs. split-screen hero, use of specific brand motifs).
- Present a high-level design outline in short, digestible chunks.
- **Require execution sign-off:** Do not proceed to Stitch design or HTML creation until the user approves the concept.

## 2. Writing Plans Phase (Activates with approved design)
- Break the work down into bite-sized tasks (e.g., Section 1: Hero, Section 2: Prizes, Section 3: CTA).
- For each section, outline the exact content, required assets (from `brand-identity`), and verification steps.
- Create an implementation checklist. Keep it clear enough that the agent can follow it autonomously without losing context.
- Emphasize DRY (Don't Repeat Yourself) component usage (like standardizing button scales and utilizing existing CMS HTML constraints).

## 3. Systematic Execution
- Work through each planned section sequentially.
- Execute the task by applying the `landing-page-stitch-design-builder`.
- Request confirmation or perform an internal review before moving to the next section.
- If CMS HTML is requested, ensure strict compliance with `enforcing-cms-html-constraints`.

## 4. Verification Before Completion
- After all sections are built, verify the page against the original spec, the typography rules, and the brand identity guidelines.
- Ensure all motifs and colors perfectly align with HR.com standards.
- Only present the final project to the user after confirming the output is actually correct and complete.

---

# Philosophy

- **Test-Driven / Verification First**: Establish what "success" looks like before building the page. Ensure the generated page actually meets those criteria.
- **Systematic over ad-hoc**: Process and plans over guessing.
- **Complexity reduction**: Simplicity is the primary goal for the user experience.
- **Evidence over claims**: Verify the design and HTML match the HR.com brand standards before declaring the project finished.
