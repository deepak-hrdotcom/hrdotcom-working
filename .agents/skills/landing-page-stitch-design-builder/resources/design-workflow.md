# Design Workflow for Stitch Generation

Follow these steps sequentially when executing the `landing-page-stitch-design-builder` skill.

### Step 1: Understand the User Prompt
Analyze what the user is asking for. Identify the purpose of the page, key requirements, and overall context.

### Step 2: Consult the Brand-Identity Skill
Review the `brand-identity` skill to understand the acceptable colors, typography, tone, and motif usage. Do not invent design tokens. Extract them strictly from the single source of truth.

### Step 3: Review the Design-Guidelines Folder
Check the `design-guidelines/` directory for any PDF rules, logos, or specific motif images required.

### Step 4: Use Inspiration Images
If inspiration images (`inspo1.jpg`, etc.) are provided in `design-guidelines/`, use them to learn the vibe, spacing, and layout rhythm. Do not copy them pixel-by-pixel. Maintain flexibility.

### Step 5: Construct the Layout Description
Draft the structured prompt combining the user's requirements, brand constraints from step 2 and 3, visual nuances from step 4, and established layout patterns.

### Step 6: Ask Clarifying Questions & Get Confirmation
Present the drafted layout description to the user. Ask any necessary clarifying questions and **require explicit user confirmation** before proceeding. Do not generate the screen until the user approves.

### Step 7: Invoke Stitch MCP (Multi-Device)
You MUST generate both desktop and mobile versions by making two separate tool calls.

- **Step 7.1: Desktop Generation**: Call `generate_screen_from_text` with `deviceType: "DESKTOP"`.
- **Step 7.2: Mobile Generation**: Call `generate_screen_from_text` with `deviceType: "MOBILE"`.

### Step 8: Validation
If Stitch MCP preview capabilities are available and cost-effective, validate the generated screen against the requested hierarchy and spacing constraints. Skip if too expensive.
