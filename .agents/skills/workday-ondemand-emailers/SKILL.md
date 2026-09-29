---
name: workday-ondemand-emailers
description: Complete blueprint for generating 10 differentiated Workday on-demand webcast emailers (sep-25 campaign). Covers image generation prompt formulas, source-of-truth copy, immutable legal/credit blocks, design token consistency, and layout rotation.
---

# Workday On-Demand Emailers Campaign Skill (Sep-25 Campaign)

This skill provides **100% turnkey context** for generating any emailer in the 10-part Workday on-demand email campaign. If a new chat session starts and the user asks to design **Emailer 3** (or any subsequent emailer), follow this document as the single authoritative source of truth.

---

## 📁 1. Directory Structure & Environment Constraints

- **Campaign Working Folder**: All files, images, registries, and HTML templates MUST stay in this single folder:
  [`Workday-Webcast-SplashPage/emailers/sep-25-ondeman-emailers/`](file:///e:/HR/00-html/Workday-Webcast-SplashPage/emailers/sep-25-ondeman-emailers/)
- **Active Naming Convention**:
  - Emailer 1: `workday-sep25-1-of-multiple.html`
  - Emailer 2: `workday-sep25-2-of-multiple.html`
  - Emailer 3: `workday-sep25-3-of-multiple.html` (Next up)
  - Emailers 4–10: `workday-sep25-[N]-of-multiple.html`
- **Master Registry File**: [`workday-ondemand-emailers-registry.md`](file:///e:/HR/00-html/Workday-Webcast-SplashPage/emailers/sep-25-ondeman-emailers/workday-ondemand-emailers-registry.md)
  - MUST be checked before starting any new emailer to see what angles, copy, and layouts were already used.
  - MUST be updated immediately after finishing an emailer to log its assets, copy inventory, and subject lines.
- **🚫 STRICT PROHIBITION — DO NOT TOUCH SPLASH PAGES**:
  - **NEVER inspect, open, or edit `PAGE-1-REGISTRATION-FORM.html`, `PAGE-2-ONDEMAND-VIDEO.html`, `PAGE-3-ONDEMAND-WITH-POPUP-SURVEY.html`, or `workday-webcast-splashpage.html`**.
  - All webcast facts, copy, and links are documented directly in this skill.
- **🚫 NEVER AUTO-PUSH TO GITHUB**:
  - Never execute `git push` unless the user explicitly requests ("push to github", "shoot github").
- **One-by-One Generation**: Only generate the single emailer requested by the user. Never pre-build future emailers.

---

## 🖼️ 2. Hero Image Banner Generation: Recipe & Rules

Every emailer features a custom high-end commercial hero banner (rendered at `width="600"` in email, aspect ratio `16:9` or `1200x630`).

### Visual Composition & Styling Rules:
1. **Commercial Layout**:
   - Dark, sophisticated canvas: Deep Workday Navy/Midnight Obsidian (`#00142E` to `#003B73`).
   - Left side: Pill badge + bold white headline sentence communicating the specific angle.
   - Right side (or background): Crisp, authentic documentary photography.
2. **Pill Badge on Image**:
   - Solid Workday Orange (`#F78B1E`) background with bold white uppercase text (e.g. `THE SYSTEM OF WORK`, `OPERATIONAL AGILITY`, `LABOR INTELLIGENCE`).
3. **Headline Sentence on Image**:
   - Bold, crisp white typography (`Inter` / modern sans-serif).
   - A single, punchy executive sentence (e.g., *"Turn Workforce Management from a Cost Center into a Growth Engine"*, *"Control Labor Volatility and Overtime with Real-Time Intelligence"*).
4. **Photography Standards (STRICT)**:
   - **Documentary & Candid**: Real operations directors, HR leaders, and frontline supervisors actively analyzing data, managing scheduling hubs, or collaborating over tablets.
   - **NO Cheesy Stock Poses**: Absolutely NO thumbs-up, NO pointing at empty space, NO exaggerated open-mouth laughter, NO looking straight into the camera lens.
   - **NO Cartoon or AI Hallucinations**: Photorealistic, natural skin textures, accurate hands, crisp modern architectural office / operational background.

### Standard `generate_image` Tool Prompt Template:
```text
Aspect Ratio: '16:9'
Prompt: "A high-end modern enterprise commercial banner for a Workday executive webcast, 16:9 ratio. Deep navy and midnight blue background (#00142E). On the left side, a crisp vibrant orange pill badge (#F78B1E) reading '[PILL_TEXT]' in clean white bold uppercase text, and directly below it, a bold modern white headline reading '[HEADLINE_SENTENCE]'. On the right side, an authentic documentary photograph of [SCENE_DESCRIPTION: e.g. diverse senior operations managers and an HR director collaborating over real-time workforce analytics and scheduling rosters on a tablet in a sleek operations hub]. Cinematic lighting, natural skin tones, executive atmosphere, clean graphic design, 8k resolution, photorealistic."
```

### Banner Asset Placement:
- Save generated banner in `Workday-Webcast-SplashPage/emailers/sep-25-ondeman-emailers/[asset-name].jpg`.
- Also mirror to `Workday-Webcast-SplashPage/assets/[asset-name].jpg`.
- In HTML, link the image directly to the shortlink:
  ```html
  <a href="https://web.hr.com/9d4t" target="_blank" data-cta="1" data-captcha="1" style="display:block;text-decoration:none;border:0;outline:none;">
      <img src="./[banner-asset-name].jpg" alt="[Descriptive Alt Text]" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;" />
  </a>
  ```

---

## 📜 3. Official Source of Truth & Copywriting Architecture

All narrative content must be rooted in the official webcast data extracted from the verified event record (`media_1790322540227.png`).

### Core Webcast Metadata:
- **Title**: *The System of Work: Why Workforce Management Drives Business Execution*
- **Sponsor**: Workday
- **Presenters**:
  - **Cristina Goldt**: General Manager, Workforce & Payroll, **Vndly (Workday)**  
    Avatar: `https://public-cdn.hr.com/profile_images/2017/2/26/1488102994054_120`
  - **Stacey Harris**: Chief Research Officer & Managing Partner, **Sapient Insights Group**  
    Avatar: `https://public-cdn.hr.com/profile_images/2021/1/18/1610947159452_120`

### Official Abstract (Verbatim):
> *"Sapient Insights research shows organizations with advanced workforce management — combined with skills and internal mobility — were 2x more likely to achieve higher profits and customer growth. So why does workforce management still get treated as a back-office cost center?*  
> *Join Stacey Harris of Sapient Insights and Workday leader Cristina Goldt for a research-driven conversation on why workforce management is moving from an administrative tool to a core business lever—and what the data reveals about the organizations getting it right. We'll explore how AI, real-time labor data, and unified platforms are reshaping how frontline businesses run."*

### Official 4 Learning Objectives (Verbatim):
1. **The strategic shift**: Why workforce management is now central to business execution, not just HR administration.
2. **The growth-vs.-efficiency balancing act**: How leading organizations use real-time labor data to manage high-variability environments without losing control of cost.
3. **The connected workforce**: What the research reveals about the measurable impact of unifying HR, time, pay, and scheduling data.
4. **What's next**: How AI is reshaping the role of workforce management — and what frontline leaders should be doing now to prepare.

### Subject Lines Guidelines (10 Options per Emailer):
- **Character Count**: Strictly between 38 and 49 characters (MAX 50 characters, never truncate on mobile).
- **Prohibited Words (STRICT)**: NEVER use `"free"`, `"live"`, `"ondemand"`, `"on-demand"`, `"on demand"`, `"recording"`, `"recorded"`, or `"webinar"`.
- **No Colons (`:`)**: Punctuate naturally without colons.
- **No Dates / Relative Time**: No "tomorrow", "next week", "Wednesday".
- **Question Rule**: Every question MUST begin with an interrogative verb (`Is`, `Are`, `Why`, `How`, `Can`, `Do`, `What`) and end with `?`.

### Preheader Rule:
- Under 90 characters. Complements the subject line without repeating it. No prohibited terms.

---

## 🔒 4. LOCKED-IN / IMMUTABLE SECTIONS (DO NOT ALTER AT ANY COST)

These 3 components MUST be copied verbatim with identical HTML, styling, tracking attributes, and URLs into every single emailer.

### A. CTA Shortlink Rule:
- **Mandatory Link**: `https://web.hr.com/9d4t`
- **Attributes**: `href="https://web.hr.com/9d4t" target="_blank" data-cta="1" data-captcha="1"`
- **NEVER use the long canonical CMS link**.

### B. Recertification Credits Block (Verbatim):
```html
<!-- RECERTIFICATION CREDITS SECTION (IMMUTABLE) -->
<tr>
    <td align="center" valign="top" style="background-color:#FFFFFF;padding:32px 30px;border-top:1px solid #E2E8F0;" class="credit-bg credit-section-td">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="credit-stack-table">
                            <tr>
                                <td width="90" align="center" valign="top" class="credit-badge-cell">
                                    <img alt="HRCI" src="https://media-cdn.hr.com/2026HRCIRecertificationProviderSealNEW_V2.jpg" style="display:inline-block;max-width:90px;width:80px;height:80px;border:0;" width="80" />
                                </td>
                                <td align="left" valign="top" class="credit-text-cell" style="color:#64748B;padding-left:14px;padding-top:10px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:12px;line-height:19px;font-weight:400">
                                    This Program has been pre-approved for <strong style="color:#022043;">1 BUSINESS Credit</strong> toward aPHR®, aPHRi™, PHR®, PHRca®, SPHR®, GPHR®, PHRi™ and SPHRi™ recertification through HR Certification Institute® (HRCI®).
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr><td height="16" style="font-size:1px; line-height:16px;">&nbsp;</td></tr>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="credit-stack-table">
                            <tr>
                                <td width="90" align="center" valign="top" class="credit-badge-cell">
                                    <img alt="SHRM" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/shrm-recert-provider.png" style="display:inline-block;width:80px;height:80px;border:0;" />
                                </td>
                                <td align="left" valign="top" class="credit-text-cell" style="color:#64748B;padding-left:14px;padding-top:10px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:12px;line-height:19px;font-weight:400">
                                    HR.com is recognized by SHRM to offer Professional Development Credits (PDC) for SHRM-CP® or SHRM-SCP® recertification activities.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
```

### C. Legal Footer Block (Verbatim):
```html
<!-- WORKDAY OBSIDIAN DARK FOOTER (IMMUTABLE) -->
<tr>
    <td align="center" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="background-color:#001229;max-width:600px;">
            <tbody>
                <tr><td style="padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="25%" style="background-color:#EF4A3D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#FDB414;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#94C83D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#4AC4D6;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
                <tr>
                    <td align="center" valign="top" class="footer-inner-td" style="padding:36px 20px 0 20px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="max-width:560px;">
                            <tbody>
                                <tr><td align="center" style="padding-bottom:20px;"><img alt="HR.com" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/hrdotcom-white.png" width="120" style="display:block;border:0;width:120px;" /></td></tr>
                                <tr><td style="padding:0 0 20px 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-top:1px solid #1A2F4C;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
                                <tr><td align="center" style="padding-bottom:12px;font-size:11px;line-height:18px;color:#94A3B8;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-weight:400;">HR.com Limited - 56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0</td></tr>
                                <tr><td align="center" style="padding-bottom:16px;font-size:11px;line-height:16px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;"><a data-cta="0" href="https://www.hr.com/en/about_us/privacy_information/" target="_blank" style="color:#CBD5E1;text-decoration:none;font-weight:600;letter-spacing:0.3px;">Privacy Policy</a><span style="color:#1A2F4C;padding:0 8px;">|</span><a data-cta="0" data-captcha="0" href="mailto:events@hr.com?subject=Contact Us: HR.com Virtual Events and Webcasts" style="color:#CBD5E1;text-decoration:none;font-weight:600;letter-spacing:0.3px;">Contact Us</a></td></tr>
                                <tr><td align="center" style="padding:0 10px 32px 10px;font-size:11px;line-height:19px;color:#94A3B8;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-weight:400;text-align:center;">If you would like to change your subscription settings please access the <a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/accsetting/lib/navigation&amp;mode=show&amp;tabid=3&amp;action=notifications" style="color:#0875E1;text-decoration:none;font-weight:600;" target="_blank">subscription page</a> or if you no longer wish to receive these email campaigns you may&nbsp;<a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/hr/subscribe/sub.campaign.7&amp;cid1=__CUSTOMER_ID__&amp;cid2=1170172078066" style="color:#0875E1;text-decoration:none;font-weight:600;" target="_blank" data-captcha="1">unsubscribe here</a>.<br><br><span style="color:#64748B;">This email account is not monitored. Please do not reply to this email.</span></td></tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr><td style="padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="25%" style="background-color:#EF4A3D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#FDB414;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#94C83D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#4AC4D6;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
            </tbody>
        </table>
    </td>
</tr>
```

---

## 🎨 5. BRAND COLOR SYSTEM (CONSISTENCY ACROSS ALL EMAILERS)

Every emailer MUST utilize these exact brand tokens so the campaign feels visually unified while layouts vary:

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Workday Vibrant Orange** | `#F78B1E` / gradient to `#E25217` | Primary CTA buttons, Takeaway Card 01 accent, banner eyebrow pill |
| **Workday Royal Cobalt** | `#0057AE` | Eyebrow text, secondary links, speaker ring, Takeaway Card 02 accent |
| **Workday Bright Sky Blue** | `#0875E1` | Links, Takeaway Card 03 accent, speaker ring 2 |
| **Workday Deep Navy / Obsidian** | `#022043` / `#001229` / `#00142E` | Headings, dark cards, footer background, Takeaway Card 04 accent |
| **Canvas Background** | `#ECEEF0` | Outer body background |
| **Container White** | `#FFFFFF` | Main email container (`max-width: 600px`), card backgrounds |
| **Soft Surface Gray** | `#F8FAFC` | Takeaway tile backgrounds, speaker section background |
| **Hairline Borders** | `#E2E8F0` / `#F1F5F9` | Clean structural dividing lines |
| **Text Muted Slate** | `#475569` / `#64748B` | Body copy, secondary descriptions, disclaimers |
| **Rainbow Header/Footer Strips** | `#EF4A3D`, `#FDB414`, `#94C83D`, `#4AC4D6` | Top & bottom brand accents |

---

## 📐 6. LAYOUT VARIATION STRATEGY (FRESH DESIGN PER EMAILER)

To prevent recipient fatigue across 10 touches, **do NOT repeat the exact same layout structure**. Rotate between distinct structural patterns while keeping the color system and typography identical:

### Layout Archetypes:
1. **Emailer 1**: Classic Editorial Hero + Single-column takeaway list with circular badges.
2. **Emailer 2**: Hero Banner with Integrated Headline + Intro Callout Box + 2x2 Symmetrical Grid Takeaways + Dark Mid-Funnel Card + Duo Spotlight.
3. **Emailer 3 (Recommended Blueprint)**:
   - **Hero Angle**: *Labor Analytics, Overtime & Cost Volatility* (Learning Objective #2).
   - **Visual Hook**: Prominent Stat/Metric Callout Card (e.g. `2x Higher Profits & Customer Growth` in large bold typography `#0057AE` with verified badge).
   - **Takeaways Structure**: 3-Pillar Vertical Stacked Cards with numerical step counters (`01`, `02`, `03`) and soft blue hover-style background `#F0FDF4` / `#EFF6FF`.
   - **Mid-Funnel Element**: Research Takeaway Quote Box highlighting Stacey Harris's key finding.
   - **Speakers**: Side-by-side horizontal cards with pill badges.
4. **Emailer 4 (AI & Automation)**:
   - AI Matrix Layout (Comparison table: What AI Automates Today vs. Human Decision-Making).
5. **Emailer 5 (Data Unification)**:
   - 3-Layer Connected Architecture Diagram (HR Core + Time & Attendance + Payroll).

---

## 🎯 7. CAMPAIGN ANGLE ROTATION (10 TOUCHES)

| Touch | Strategic Angle | Primary Persona Target | Key Narrative Hook |
| :--- | :--- | :--- | :--- |
| **Emailer 1** | *Cost Center vs. Growth Engine* | CHRO / VP HR | Moving from back-office admin to strategic business execution (2x profit research) |
| **Emailer 2** | *Turnover & Retention Engine* | Frontline Operations & HR | Unifying scheduling and labor data to curb turnover and empower workers |
| **Emailer 3** | *Real-Time Labor Analytics & Cost Volatility* | VP Operations / CFO / Workforce Planning | Handling demand spikes without runaway labor costs or excessive overtime |
| **Emailer 4** | *AI & Automation on the Frontlines* | Head of HR Tech / Operations Innovation | What AI can automate today vs. where human judgment remains critical |
| **Emailer 5** | *The Unified Data Architecture* | HRIS / IT / Payroll Leadership | Eliminating fragmented systems between HR, time, scheduling, and payroll |
| **Emailer 6** | *Cross-Department Alignment* | Finance & Store Operations Leaders | Aligning HR, Finance, and Ops on a single source of labor truth |
| **Emailer 7** | *The Modern Deskless Worker Experience* | Employee Experience & Frontline Ops | Mobile-first self-service, shift autonomy, and worker engagement |
| **Emailer 8** | *Operational Compliance & Labor Risk Mitigation* | Legal, Compliance & People Ops | Managing complex wage laws, meal breaks, and union rules automatically |
| **Emailer 9** | *Agility & Rapid Scenario Planning* | Workforce Strategy Executives | Modeling store and facility labor needs ahead of market disruptions |
| **Emailer 10** | *The Executive Blueprint & Action Plan* | C-Suite / Strategic Transformation | Actionable roadmap to modernizing your enterprise system of work |

---

## ⚡ 8. STEP-BY-STEP CHECKLIST FOR EMAILER 3 (AND FUTURE EMAILERS)

When asked to generate the next emailer in a fresh chat:
1. **Read Registry**: Open [`workday-ondemand-emailers-registry.md`](file:///e:/HR/00-html/Workday-Webcast-SplashPage/emailers/sep-25-ondeman-emailers/workday-ondemand-emailers-registry.md) to check existing entries.
2. **Select Angle**: Use the next angle in the matrix (Emailer 3 = *Labor Analytics & Cost Volatility*).
3. **Generate Image Banner**: Use `generate_image` with the prompt template in Section 2. Save image to campaign folder.
4. **Draft Copy**:
   - 10 Subject lines strictly under 50 characters (no prohibited terms, no colons).
   - Preheader under 90 characters.
   - Problem + Solution intro.
   - Takeaways aligned with Learning Objective #2.
5. **Code HTML Template**:
   - Save file to `workday-sep25-3-of-multiple.html`.
   - Use layout pattern 3 (Stat Callout Hero + 3 Vertical Stacked Cards + Quote Spotlight).
   - Paste **locked-in Recertification & Legal Footer** blocks verbatim.
   - Set all CTA links to `https://web.hr.com/9d4t`.
6. **Update Registry**: Append full copy inventory and asset details for Emailer 3 to `workday-ondemand-emailers-registry.md`.
7. **Present to User**: Provide file links and highlight key design choices. Never auto-push to git.
