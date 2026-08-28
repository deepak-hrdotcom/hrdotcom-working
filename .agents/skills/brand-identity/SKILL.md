---
name: managing-brand-identity  
description: Provides the single source of truth for brand guidelines, motifs, logo usage, typography, and tone. Use when generating CMS HTML pages, styling UI sections, applying brand colors, or writing brand-aligned copy.
---

# Brand Identity & Guidelines

This skill defines the visual and communication rules for the project.

The agent must treat the **design-guidelines folder as the primary source of truth**.

Do not invent brand elements.

---

# Brand Sources

Always read these files before generating UI or copy.

design-guidelines/brand-guidelines.pdf  
design-guidelines/hrdotcom-dark.png  
design-guidelines/hrdotcom-white.png  
design-guidelines/motif.jpg  
design-guidelines/inspo.webp  

These files define:

- colors  
- typography  
- logo usage  
- motifs  
- visual tone  

---

# When to Use This Skill

Use this skill when:

- generating CMS HTML pages  
- styling UI sections  
- designing layouts  
- placing logos  
- using motifs  
- writing marketing copy  

---

# Workflow

1. Identify whether the task involves design, layout, styling, or copy.  
2. Read the brand guidelines inside `design-guidelines/`.  
3. Extract typography, colors, logo usage, and motifs.  
4. Apply brand rules consistently across the generated output.  

Checklist:

- Brand guidelines reviewed  
- Logo usage verified  
- Motifs used sparingly  
- Typography consistent  
- Layout clean and modern  

---

# Logo Usage

Logos are located in:

design-guidelines/hrdotcom-dark.png  
design-guidelines/hrdotcom-white.png  

Rules:

- maintain clear spacing around logos  
- do not recolor or distort logos  
- prefer dark logo on light backgrounds  
- always respect safe spacing  

---

# Motif Usage

Motifs are defined in:

design-guidelines/motif.jpg  

Supported motifs:

- four dots  
- rainbow blocks row  
- rainbow gradient row  

Rules:

- use motifs sparingly  
- use motifs mainly as accents  
- avoid repeating motifs excessively  
- **all HR.com motif elements must ALWAYS use the official hex color values and never approximate them**  
- the Four Dots motif, Rainbow Blocks Row, and Rainbow Gradient Row **must strictly use**:  
  - Red: `#EF4A3D`  
  - Yellow: `#FDB414`  
  - Green: `#94C83D`  
  - Teal: `#4AC4D6`  
- these exact hex values are the **ONLY allowed colors** for motif elements  
- **preserve the correct dot order**: Red, Yellow, Green, Teal  
- apply these colors consistently across all generated designs  

Recommended placements:

- section dividers  
- header accents  
- stat highlights  

---

## Design Inspiration

Review the inspiration images before generating UI.

design-guidelines/inspo.webp

- Inspiration images guide overall visual direction.
- They are not strict templates.
- Layouts should remain flexible and adapted to the page content.
- Brand guidelines still take priority over inspiration images.

---

# Visual Design Principles

Follow these layout characteristics:

- clean modern layout  
- large readable typography  
- spacious white backgrounds  
- minimal visual clutter  
- brand colors used sparingly  

Avoid:

- dense corporate layouts  
- excessive color usage  
- unnecessary decorative elements  

---

# Typography

Typography rules must be extracted from:

design-guidelines/brand-guidelines.pdf  

Guidelines:

- **Primary Font Family**: All generated HTML and designs must explicitly use the **Roboto** font family (`font-family: 'Roboto', Arial, sans-serif;`).
- **Font Import**: You must include the Google Fonts import for Roboto in all HTML output: `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&display=swap');`
- headings should be bold and large  
- all heading elements (h1, h2, h3) must have normal casing (no uppercase or title case) and exactly 100% letter spacing  
- body text must remain highly readable  
- spacing should feel open and modern  

---

# Button Component Scale

Standardize all button usage to ensure consistency across Antigravity and Stitch generated designs. All button variants must be treated as reusable design components.

## Button Shapes
**CRITICAL**: All buttons across all styles must have fully rounded, pill-shaped corners (e.g. `border-radius: 999px`).

## Button Styles

There are four allowed button styles to match the official design patterns exactly:
- **Gradient Button**: Background must be a vibrant gradient (e.g., `#E51069` to `#EF4A3D`). Text must be white (`#FFFFFF`). No border.
- **White Button with Border**: Background must be white (`#FFFFFF`). Border must be dark (e.g., `#2A343E` or `#4A5568`, 1-2px solid). Text must be dark (`#2A343E`).
- **Light BG Button**: Background must be a light, subtle tint (e.g., `#F4F5F7`, `#F5F5F5`, or lightly tinted brand color). Text must be dark (`#2A343E`). No border.
- **Dark BG Button**: Background must be dark (e.g., `#2A343E` or `#333333`). Text must be white (`#FFFFFF`). No border.

## Button Sizes

Each button style supports three standard sizes:
- **Small Size**: 30px height, suitable for dense utility rows.
- **Default Size**: 50px height, the standard for most forms and actions.
- **Large Size**: 60px height, for primary hero calls-to-action.

## Official HR.com Colors for Buttons

All buttons must use the official HR.com brand palette colors, including but not limited to:
- `#E51069`
- `#EF4A3D`
- `#4AC4D6`
- `#94C83D`
- `#FDB414`
- `#2A343E`
- `#02588E`
- `#F5F5F5`

Provide consistent button styles, sizes, colors, border treatments, and typography throughout every project based on these standardized rules.

---

# Resources

[Extracted from design-guidelines/brand-guidelines.pdf]
- `resources/design-tokens.json`: Defines the exact hex codes, typography sizes and button shapes.
- `resources/voice-tone.md`: Defines the brand messaging tone, 10 core values, purpose, mission, and vision.

design-guidelines/brand-guidelines.pdf  
design-guidelines/hrdotcom-dark.png  
design-guidelines/hrdotcom-white.png  
design-guidelines/motif.jpg  
design-guidelines/inspo.webp
