---
name: orchestrating-project-starts  
description: The Master Router for all new Antigravity projects. Starts new landing pages, emailers, and design projects by always loading brand identity first, then branching to the appropriate specialized planner (e.g., Stitch design builder or premium emailers).
---

# Project Orchestrator (Master Router)

This skill is the single starting point for ALL new projects.

It enforces brand consistency as the non-negotiable trunk of every project, then routes the workflow to the correct specialized skills depending on what the user wants to build.

---

# Project Structure Rules

Whenever starting a new project or page, you MUST:
1. Create a dedicated folder for the project (e.g., `[project-title]/`).
2. Inside that project folder, create an `images/` directory (e.g., `[project-title]/images/`).
3. Ensure all extracted/generated assets are downloaded and placed into this `images/` folder.
All generated files and exported code should live inside this dedicated feature folder. Do not generate files in the root directory.

---

# When to Use This Skill

Use this skill when the user says things like:
- start a new conversation
- start a new project
- create a new page
- begin a new splash page
- let’s create this page
- here is the first section content
- let’s do section by section
- create a marketing page
- create a research page
- create an event page
- create a new emailer
- build an email campaign

---

# The Universal Workflow

When triggered, the skill must automatically perform these steps in order:

## Step 1: Enforce Brand Identity (Always)
You MUST ALWAYS load and review the brand guidelines first:
- `.agent/skills/brand-identity/`

Review the assets in:
`design-guidelines/`
(e.g., `brand-guidelines.pdf`, `hrdotcom-dark.png`, `motif.jpg`, `inspo.webp`)

## Step 2: Determine Project Type
Determine what the user wants to build:
A. **Landing Page / Web Page / Splash Page**
B. **Emailer / Newsletter**

## Step 3: Branch to Specialized Skills

### Branch A: If Landing Page
Load and use in sequence:
1. `.agent/skills/marketing-campaign-planner/` (Plan the structure and sections)
2. `.agent/skills/landing-page-stitch-design-builder/` (Generate in Stitch)
3. `.agent/skills/cms-html-constraints/` (Generate the CMS HTML code)

**CRITICAL WORKFLOW RULES FOR BRANCH A:**
- **MANDATORY PLANNING:** You MUST run the `marketing-campaign-planner` first to ask clarifying questions and propose a structured outline.
- **MANDATORY APPROVAL STOP 1:** You MUST ask the user for explicit approval on the proposed outline/plan. Do NOT proceed to Stitch generation until the user says "Yes" or approves the plan.
- **MANDATORY APPROVAL STOP 2:** After generating the Stitch designs, present them to the user. You MUST ask for explicit approval on the designs. Do NOT proceed to HTML generation until the user says "Yes" or approves the designs.
- Only load `.agent/skills/cms-html-constraints/` and write code after passing Approval Stop 2.

### Branch B: If Emailer
Load and use:
1. `.agent/skills/generating-premium-emailers/`

- Propose the email structure (Header, Hero, Content, CTA, Footer).
- Apply the Hybrid/Fluid layout pattern directly.
- Ensure typography and colors perfectly match the brand identity loaded in Step 1.

---

# Behavior Rules

- Do not ask the user to repeat the skill list each time.
- Start with Stitch design generation first for web pages.
- Start directly with Hybrid HTML for emailers.
- Use the inspo file only for overall look and feel.
- Do not copy layouts exactly from inspiration.
- Keep layouts clean, modern, spacious, and full-width.
- Use motifs sparingly.
- Keep typography large and readable.
