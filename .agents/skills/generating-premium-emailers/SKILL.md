---
name: generating-premium-emailers
description: Generates high-quality, responsive, and brand-aligned emailers using the Hybrid/Fluid layout pattern. Use when the user asks for email template creation, fixing email responsiveness, or building brand-consistent email campaigns that must work across Outlook, Gmail, and mobile clients.
---

# Generating Premium Emailers

This skill defines the technical and design rules for building production-ready emailers that render consistently across all major email clients.

The agent must follow these rules strictly to avoid layout breakage in sensitive clients like Outlook and Gmail Mobile.

---

# When to Use This Skill

Use this skill when:
- generating new email templates
- updating existing emailers for responsiveness
- ensuring brand consistency across different product emailers
- fixing spacing or alignment issues in mobile views
- implementing dark mode for emails

---

# Workflow

1. **Load Context**: Read brand identity rules (`managing-brand-identity`).
2. **Structure Planning**: Define the email hierarchy (Header, Hero, Main Content, CTA, Footer).
3. **Hybrid Layout Implementation**: Use the "Hybrid/Fluid" pattern (Divs for mobile/modern, MSO Tables for Outlook).
4. **Style Inlining**: Ensure all CSS is either inlined or placed in a `<style>` block compatible with target clients.
5. **Brand Alignment**: Apply HR.com colors, typography (Manrope with fallbacks), and motifs.
6. **Dark Mode**: Include `@media (prefers-color-scheme: dark)` overrides.
7. **Verification**: Check for MSO conditionals and responsive container widths.

---

# Technical Rules

### 1. The Hybrid Layout Pattern (CRITICAL)

To ensure columns stack on mobile but stay side-by-side in Outlook, use the "Ghost Table" (MSO) approach combined with `inline-block` divs.

**Required Pattern for Columns:**

```html
<!--[if mso]>
<table role="presentation" width="100%">
<tr>
<td width="300" valign="top">
<![endif]-->
<div class="column" style="display: inline-block; width: 100%; max-width: 300px; vertical-align: top;">
    <!-- Content for column 1 -->
</div>
<!--[if mso]>
</td><td width="300" valign="top">
<![endif]-->
<div class="column" style="display: inline-block; width: 100%; max-width: 300px; vertical-align: top;">
    <!-- Content for column 2 -->
</div>
<!--[if mso]>
</td></tr></table>
<![endif]-->
```

### 2. Typography & Fonts

- **Primary Font**: 'Roboto', Arial, sans-serif.
- **Import**: Include the Google Fonts `@import` but provide a safe fallback for Outlook.
- **MSO Fallback**:
  ```html
  <!--[if mso]>
  <style>
      table, td, p, a, h1, h2, h3 { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  ```

### 3. Image Handling

- Use `display: block;` and `max-width: 100%;`.
- Always provide `alt` text.
- Use `border: 0;` to prevent Outlook borders.

### 4. Spacing

- Use `padding` on `td` or `div` rather than `margin` (margins are poorly supported in many clients).
- Use `line-height` explicitly to prevent varying default spacing.

### 5. Dark Mode Support

Always include a dark mode reset and targeted overrides:
```css
@media (prefers-color-scheme: dark) {
    .bg-white { background-color: #2A343E !important; }
    .text-dark { color: #FFFFFF !important; }
}
```

### 6. CTA Link Handling & Shortlinks (CRITICAL)

- **Always use `https://web.hr.com/<shortcode>` shortlinks** for all promotional CTA buttons (Primary Hero CTA, Secondary CTA, On-Demand CTA, and text links) instead of long canonical CMS URLs.
- Shortlinks ensure tracking integrity, prevent client clipping/wrapping errors, and allow clean redirect analytics.

---

## 🔒 Mandatory Recertification & Footer Blocks (IMMUTABLE AT ALL COSTS)

The text, links, and structure of the **Recertification Credits Section** and the **Footer Section** **MUST REMAIN IDENTICAL AT ALL TIMES AT ANY COST** across all email templates. Never alter, rewrite, or remove these URLs, parameters, or compliance wording.

### 1. Recertification Credits Block (HRCI & SHRM)
- **HRCI Seal Asset**: `https://media-cdn.hr.com/2026HRCIRecertificationProviderSealNEW_V2.jpg` (Width: 80px)
- **SHRM Seal Asset**: `https://public-cdn.hr.com/remoteimages/website-images/emailer-images/shrm-recert-provider.png` (Width: 80px)
- **Exact Mandatory Copy**:
  - **HRCI**: `This Program has been pre-approved for [CREDIT_VALUE] toward aPHR®, aPHRi™, PHR®, PHRca®, SPHR®, GPHR®, PHRi™ and SPHRi™ recertification through HR Certification Institute® (HRCI®).` (e.g. `1 BUSINESS Credit` or `1 HR (General) Credit`)
  - **SHRM**: `HR.com is recognized by SHRM to offer Professional Development Credits (PDC) for SHRM-CP® or SHRM-SCP® recertification activities.`

```html
<!-- Recertification Credits Section (IMMUTABLE) -->
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
                                <td align="left" valign="top" class="credit-text-cell" style="color:#64748B;padding-left:14px;padding-top:10px;font-family:'Inter',Roboto,Arial,sans-serif;font-size:12px;line-height:19px;font-weight:400">
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
                                <td align="left" valign="top" class="credit-text-cell" style="color:#64748B;padding-left:14px;padding-top:10px;font-family:'Inter',Roboto,Arial,sans-serif;font-size:12px;line-height:19px;font-weight:400">
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

### 2. Legal Footer Block & Canonical URLs (IMMUTABLE)

Every emailer must include the following canonical links, text, and structure without exception:

| Link / Element | Exact Mandatory URL / Value | Attributes |
| :--- | :--- | :--- |
| **HR.com Logo** | `https://public-cdn.hr.com/remoteimages/website-images/emailer-images/hrdotcom-white.png` | `alt="HR.com"` `width="120"` |
| **Address Text** | `HR.com Limited - 56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0` | - |
| **Privacy Policy** | `https://www.hr.com/en/about_us/privacy_information/` | `data-cta="0"` `target="_blank"` |
| **Contact Us** | `mailto:events@hr.com?subject=Contact Us: HR.com Virtual Events and Webcasts` | `data-cta="0"` `data-captcha="0"` |
| **Subscription Page** | `https://www.hr.com/en?t=/CustomCode/accsetting/lib/navigation&amp;mode=show&amp;tabid=3&amp;action=notifications` | `data-cta="0"` `target="_blank"` |
| **Unsubscribe Here** | `https://www.hr.com/en?t=/CustomCode/hr/subscribe/sub.campaign.7&amp;cid1=__CUSTOMER_ID__&amp;cid2=1170172078066` | `data-cta="0"` `target="_blank"` `data-captcha="1"` |
| **Disclaimer Text** | `This email account is not monitored. Please do not reply to this email.` | - |

```html
<!-- Legal Footer Section (IMMUTABLE) -->
<tr>
    <td align="center" valign="top">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="background-color:#001229;max-width:600px;">
            <tbody>
                <!-- 4-Color Accent Bar -->
                <tr><td style="padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="25%" style="background-color:#EF4A3D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#FDB414;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#94C83D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#4AC4D6;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
                <tr>
                    <td align="center" valign="top" class="footer-inner-td" style="padding:36px 20px 0 20px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="max-width:560px;">
                            <tbody>
                                <tr><td align="center" style="padding-bottom:20px;"><img alt="HR.com" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/hrdotcom-white.png" width="120" style="display:block;border:0;width:120px;" /></td></tr>
                                <tr><td style="padding:0 0 20px 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-top:1px solid #1A2F4C;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
                                <tr><td align="center" style="padding-bottom:12px;font-size:11px;line-height:18px;color:#94A3B8;font-family:'Inter',Roboto,Arial,sans-serif;font-weight:400;">HR.com Limited - 56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0</td></tr>
                                <tr><td align="center" style="padding-bottom:16px;font-size:11px;line-height:16px;font-family:'Inter',Roboto,Arial,sans-serif;"><a data-cta="0" href="https://www.hr.com/en/about_us/privacy_information/" target="_blank" style="color:#CBD5E1;text-decoration:none;font-weight:600;letter-spacing:0.3px;">Privacy Policy</a><span style="color:#1A2F4C;padding:0 8px;">|</span><a data-cta="0" data-captcha="0" href="mailto:events@hr.com?subject=Contact Us: HR.com Virtual Events and Webcasts" style="color:#CBD5E1;text-decoration:none;font-weight:600;letter-spacing:0.3px;">Contact Us</a></td></tr>
                                <tr><td align="center" style="padding:0 10px 32px 10px;font-size:11px;line-height:19px;color:#94A3B8;font-family:'Inter',Roboto,Arial,sans-serif;font-weight:400;text-align:center;">If you would like to change your subscription settings please access the <a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/accsetting/lib/navigation&amp;mode=show&amp;tabid=3&amp;action=notifications" style="color:#0875E1;text-decoration:none;font-weight:600;" target="_blank">subscription page</a> or if you no longer wish to receive these email campaigns you may&nbsp;<a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/hr/subscribe/sub.campaign.7&amp;cid1=__CUSTOMER_ID__&amp;cid2=1170172078066" style="color:#0875E1;text-decoration:none;font-weight:600;" target="_blank" data-captcha="1">unsubscribe here</a>.<br><br><span style="color:#64748B;">This email account is not monitored. Please do not reply to this email.</span></td></tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <!-- Bottom 4-Color Accent Bar -->
                <tr><td style="padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="25%" style="background-color:#EF4A3D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#FDB414;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#94C83D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#4AC4D6;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
            </tbody>
        </table>
    </td>
</tr>
```

# Checklist

- [ ] Used MSO "Ghost Tables" for columns
- [ ] CSS inlined or client-compatible
- [ ] Manrope font with Arial fallback
- [ ] Dark mode support included
- [ ] Images have `display: block` and `alt` text
- [ ] Brand colors (HR.com Pink/Teal/Dark) used correctly
- [ ] Mobile stacking verified (inline-block divs)

---

# Resources

- `resources/email-resets.md`
- `resources/layout-patterns.md`
- `resources/brand-assets.md`
