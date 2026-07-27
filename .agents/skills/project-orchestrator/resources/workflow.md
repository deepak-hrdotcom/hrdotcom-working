# Project Orchestrator Workflow

## The Universal Sequence

1. **Brand Identity Trunk (Always Load)**: `managing-brand-identity`
2. **Branching**:
   - If Web/Landing Page -> `marketing-campaign-planner` -> `landing-page-stitch-design-builder`
   - If Emailer -> `generating-premium-emailers`

## Step-by-Step

### Step 1
Load: `.agent/skills/brand-identity/`
Review: `design-guidelines/` (e.g., `brand-guidelines.pdf`, motifs, etc.)

### Step 2
Determine if the project is a Landing Page or an Emailer.

### Step 3 (Branch A: Landing Page)
1. Load `.agent/skills/marketing-campaign-planner/`
2. Define sections and layout outline with the user.
3. Load `.agent/skills/landing-page-stitch-design-builder/`
4. Generate the design section by section in Stitch.
5. (Optional) Load `cms-html-constraints` ONLY if the user explicitly asks for final CMS HTML code.

### Step 3 (Branch B: Emailer)
1. Load `.agent/skills/generating-premium-emailers/`
2. Propose email hierarchy (Header, Hero, Content, Footer).
3. Apply the Hybrid/Fluid Layout directly in HTML using brand rules from Step 1.
