
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../email-reference/premium-templates/upcoming-webcast-template.html');
let html = fs.readFileSync(filePath, 'utf8');

// ─── 1. FONT: Swap Manrope → Roboto everywhere ───────────────────────────────
// Update Google Fonts import
html = html.replace(
  "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');",
  "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');"
);

// Update body font-family declaration
html = html.replace(
  "font-family: 'Manrope', Arial, sans-serif;",
  "font-family: 'Roboto', Arial, Helvetica, sans-serif;"
);

// MSO Outlook fallback block - already uses Arial, keep it
// Replace all inline font-family references: 'Manrope',Arial,sans-serif
html = html.split("font-family:'Manrope',Arial,sans-serif").join("font-family:'Roboto',Arial,Helvetica,sans-serif");
// Also handle with spaces around quotes
html = html.split("font-family: 'Manrope', Arial, sans-serif").join("font-family: 'Roboto', Arial, Helvetica, sans-serif");

// ─── 2. HERO: Reduce padding, add CTA inside hero ────────────────────────────
// Change hero td padding from 48px 36px 44px 36px to 32px 36px 28px 36px
html = html.replace(
  'style="background: linear-gradient(160deg, #C01060 0%, #D44030 100%); background-color: #C01060; padding: 48px 36px 44px 36px;"',
  'style="background: linear-gradient(160deg, #C01060 0%, #D44030 100%); background-color: #C01060; padding: 32px 36px 36px 36px;"'
);

// Reduce hero-section-td mobile padding override
html = html.replace(
  '.hero-section-td { padding: 32px 20px 36px 20px !important; }',
  '.hero-section-td { padding: 24px 20px 28px 20px !important; }'
);

// Change date meta margin from 0 0 30px 0 to 0 0 24px 0
html = html.replace(
  'style="margin:0 0 30px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;"',
  'style="margin:0 0 24px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;"'
);

// Insert the CTA button + "free to attend" note just before closing </td> of the hero
const heroCTABlock = [
  '',
  '                            <!-- Hero CTA Button -->',
  '                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top:4px;">',
  '                                <tr>',
  '                                    <td align="center"',
  '                                        style="border-radius:999px;background:rgba(255,255,255,0.18);border:2px solid rgba(255,255,255,0.7);">',
  '                                        <a href="https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1773147735398&relType=2" target="_blank"',
  '                                            style="font-size:14px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:13px 42px;display:inline-block;font-weight:700;letter-spacing:0.4px;mso-padding-alt:0;">',
  '                                            Save My Spot &mdash; Register Free &rarr;',
  '                                        </a>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  ''
].join('\n');

html = html.replace(
  '\n\n\n                        </td>\n                    </tr>\n\n                    <!-- ============================================================ -->\n                    <!-- INTRO COPY + CTA SECTION',
  heroCTABlock + '\n                        </td>\n                    </tr>\n\n                    <!-- ============================================================ -->\n                    <!-- INTRO COPY + CTA SECTION'
);

// ─── 3. INTRO COPY: Replace two heavy paragraphs with ONE short punchy para ──
// Plus add the "What You'll Learn" bullets from actual data
// And a second CTA after bullets

const oldIntroCopyBlock = [
  '                            <!-- {{COPY}} outputs two distinct paragraphs:',
  '                                 Para 1 (pain point): color #4A5568, font-weight 400',
  '                                 Para 2 (solution):   color #2A343E, font-weight 500',
  '                                 Both: font-size 16px, line-height 28px, LEFT-ALIGNED (text-align: left) -->',
  '                            <p class="body-copy-p" style="margin:0 0 16px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">',
  '                                The conversation around AI in HR has moved past chatbots and content generators. A new category of technology\u2014AI agents\u2014is fundamentally changing what\'s possible in Learning & Development. Unlike traditional AI tools that respond to prompts, agents can autonomously execute multi-step workflows.',
  '                            </p>',
  '                            <p class="body-copy-p" style="margin:0 0 36px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:500;color:#2A343E;text-align:left;line-height:28px;">',
  '                                In this session, we\'ll cut through the hype to explain what AI agents actually are, and share real-world examples of Fortune 500 companies using agents for needs analysis, course creation, and learning delivery. Most importantly, we\'ll provide a practical framework for evaluating where agents can have the highest impact in your L&D workflows.',
  '                            </p>',
  '',
  '                            <!-- Primary CTA \u2014 Gradient button per brand spec -->',
  '                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top: 28px;">',
  '                                <tr>',
  '                                    <td align="center"',
  '                                        style="border-radius:999px;background:linear-gradient(135deg,#E51069 0%,#EF4A3D 100%);"',
  '                                        bgcolor="#EF4A3D">',
  '                                        <a href="https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1773147735398&relType=2" target="_blank"',
  '                                            style="font-size:15px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:17px 50px;display:inline-block;font-weight:900;letter-spacing:0.3px;mso-padding-alt:0;">',
  '                                            Save My Spot \u2014 Register Free \u2192',
  '                                        </a>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '',
  '                            <!-- Pre-recorded subtle note -->',
  '                            <p style="margin:18px 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:11px;font-weight:500;color:#A0AEC0;text-align:center;letter-spacing:0.3px;">',
  '                                Pre-recorded webcast \u2014 watch on your schedule',
  '                            </p>'
].join('\n');

const newIntroCopyBlock = [
  '                            <!-- Single punchy intro para (200-250 chars) -->',
  '                            <p class="body-copy-p" style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">',
  '                                AI agents are rewriting the rules of L&amp;D. Early adopters are compressing weeks of work into hours&mdash;join this free session to learn how.',
  '                            </p>'
].join('\n');

html = html.replace(oldIntroCopyBlock, newIntroCopyBlock);

// ─── 4. WHAT YOU'LL LEARN: Replace old placeholder bullets with real data ────
const oldLearnSection = [
  '                    <!-- ============================================================ -->',
  '                    <!-- WHAT YOU\'LL LEARN \u2014 Light bg. Scannable. Max 3 bullets.     -->',
  '                    <!-- WHY: Email readers spend avg 8.97 sec. Make it scannable.   -->',
  '                    <!-- ============================================================ -->',
  '                    <tr>',
  '                        <td align="left" valign="top" class="takeaways-bg takeaways-td"',
  '                            style="background-color:#FFFFFF;padding:30px 36px;">',
  '                            <p style="margin:0 0 18px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">',
  '                                What you\'ll walk away with</p>',
  '',
  '                            <!-- Takeaway 1 -->',
  '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">',
  '                                <tr>',
  '                                    <td valign="top" width="32" style="padding-top:4px;">',
  '                                        <table border="0" cellpadding="0" cellspacing="0">',
  '                                            <tr>',
  '                                                <td align="center" valign="middle"',
  '                                                    style="background-color:#EF4A3D;border-radius:6px;width:24px;height:24px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;color:#FFFFFF;line-height:24px;text-align:center;">',
  '                                                    01',
  '                                                </td>',
  '                                            </tr>',
  '                                        </table>',
  '                                    </td>',
  '                                    <td valign="top" style="padding-left:14px;">',
  '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:20px;display:block;">A clear diagnosis of your recognition gaps</span>',
  '                                        <span class="takeaway-desc" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#718096;line-height:19px;display:block;margin-top:3px;">Identify exactly what\'s missing and how to communicate its business value to leadership.</span>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '',
  '                            <!-- Takeaway 2 -->',
  '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">',
  '                                <tr>',
  '                                    <td valign="top" width="32" style="padding-top:4px;">',
  '                                        <table border="0" cellpadding="0" cellspacing="0">',
  '                                            <tr>',
  '                                                <td align="center" valign="middle"',
  '                                                    style="background-color:#4AC4D6;border-radius:6px;width:24px;height:24px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;color:#0D1F28;line-height:24px;text-align:center;">',
  '                                                    02',
  '                                                </td>',
  '                                            </tr>',
  '                                        </table>',
  '                                    </td>',
  '                                    <td valign="top" style="padding-left:14px;">',
  '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:20px;display:block;">How to surface hidden cultural risks with AI</span>',
  '                                        <span class="takeaway-desc" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#718096;line-height:19px;display:block;margin-top:3px;">Real-time behavioral data that lets you act before disengagement or attrition become costly.</span>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '',
  '                            <!-- Takeaway 3 -->',
  '                            <table border="0" cellpadding="0" cellspacing="0" width="100%">',
  '                                <tr>',
  '                                    <td valign="top" width="32" style="padding-top:4px;">',
  '                                        <table border="0" cellpadding="0" cellspacing="0">',
  '                                            <tr>',
  '                                                <td align="center" valign="middle"',
  '                                                    style="background-color:#94C83D;border-radius:6px;width:24px;height:24px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;color:#1A2A00;line-height:24px;text-align:center;">',
  '                                                    03',
  '                                                </td>',
  '                                            </tr>',
  '                                        </table>',
  '                                    </td>',
  '                                    <td valign="top" style="padding-left:14px;">',
  '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:20px;display:block;">A scalable recognition framework that builds belonging</span>',
  '                                        <span class="takeaway-desc" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#718096;line-height:19px;display:block;margin-top:3px;">Personalize at scale and unlock the power of peer-to-peer moments that retain your best people.</span>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '                        </td>',
  '                    </tr>'
].join('\n');

const newLearnSection = [
  '                    <!-- ============================================================ -->',
  '                    <!-- INTRO COPY SECTION (white bg, follows hero CTA)              -->',
  '                    <!-- ============================================================ -->',
  '',
  '                    <!-- ============================================================ -->',
  '                    <!-- WHAT YOU\'LL LEARN \u2014 Light bg. Scannable. 4 bullets max.     -->',
  '                    <!-- ============================================================ -->',
  '                    <tr>',
  '                        <td align="left" valign="top" class="takeaways-bg takeaways-td"',
  '                            style="background-color:#FFFFFF;padding:28px 36px 32px 36px;">',
  '                            <p style="margin:0 0 18px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">',
  '                                What You\'ll Learn</p>',
  '',
  '                            <!-- Takeaway 1 -->',
  '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">',
  '                                <tr>',
  '                                    <td valign="top" width="32" style="padding-top:4px;">',
  '                                        <table border="0" cellpadding="0" cellspacing="0">',
  '                                            <tr>',
  '                                                <td align="center" valign="middle"',
  '                                                    style="background-color:#EF4A3D;border-radius:6px;width:24px;height:24px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#FFFFFF;line-height:24px;text-align:center;">',
  '                                                    01',
  '                                                </td>',
  '                                            </tr>',
  '                                        </table>',
  '                                    </td>',
  '                                    <td valign="top" style="padding-left:14px;">',
  '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:20px;display:block;">What AI agents actually are &mdash; and why they\'re different</span>',
  '                                        <span class="takeaway-desc" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#718096;line-height:19px;display:block;margin-top:3px;">Understand how autonomous, multi-step agents differ from the AI tools you\'re already using.</span>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '',
  '                            <!-- Takeaway 2 -->',
  '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">',
  '                                <tr>',
  '                                    <td valign="top" width="32" style="padding-top:4px;">',
  '                                        <table border="0" cellpadding="0" cellspacing="0">',
  '                                            <tr>',
  '                                                <td align="center" valign="middle"',
  '                                                    style="background-color:#4AC4D6;border-radius:6px;width:24px;height:24px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#0D1F28;line-height:24px;text-align:center;">',
  '                                                    02',
  '                                                </td>',
  '                                            </tr>',
  '                                        </table>',
  '                                    </td>',
  '                                    <td valign="top" style="padding-left:14px;">',
  '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:20px;display:block;">Real-world examples from Fortune 500 L&amp;D teams</span>',
  '                                        <span class="takeaway-desc" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#718096;line-height:19px;display:block;margin-top:3px;">See how leading companies use agents for needs analysis, course creation, and learning delivery.</span>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '',
  '                            <!-- Takeaway 3 -->',
  '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">',
  '                                <tr>',
  '                                    <td valign="top" width="32" style="padding-top:4px;">',
  '                                        <table border="0" cellpadding="0" cellspacing="0">',
  '                                            <tr>',
  '                                                <td align="center" valign="middle"',
  '                                                    style="background-color:#94C83D;border-radius:6px;width:24px;height:24px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#1A2A00;line-height:24px;text-align:center;">',
  '                                                    03',
  '                                                </td>',
  '                                            </tr>',
  '                                        </table>',
  '                                    </td>',
  '                                    <td valign="top" style="padding-left:14px;">',
  '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:20px;display:block;">A practical readiness framework for your L&amp;D team</span>',
  '                                        <span class="takeaway-desc" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#718096;line-height:19px;display:block;margin-top:3px;">Know which use cases are deployment-ready today and how to build a phased roadmap for adoption.</span>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '',
  '                            <!-- Takeaway 4 -->',
  '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">',
  '                                <tr>',
  '                                    <td valign="top" width="32" style="padding-top:4px;">',
  '                                        <table border="0" cellpadding="0" cellspacing="0">',
  '                                            <tr>',
  '                                                <td align="center" valign="middle"',
  '                                                    style="background-color:#FDB414;border-radius:6px;width:24px;height:24px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#1A1000;line-height:24px;text-align:center;">',
  '                                                    04',
  '                                                </td>',
  '                                            </tr>',
  '                                        </table>',
  '                                    </td>',
  '                                    <td valign="top" style="padding-left:14px;">',
  '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:20px;display:block;">How to compress weeks of L&amp;D work into hours</span>',
  '                                        <span class="takeaway-desc" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#718096;line-height:19px;display:block;margin-top:3px;">Discover how early adopters turn a skills gap analysis into a deployed training program in days, not quarters.</span>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '',
  '                            <!-- Mid-content CTA after bullets -->',
  '                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin:0 auto;">',
  '                                <tr>',
  '                                    <td align="center"',
  '                                        style="border-radius:999px;background:linear-gradient(135deg,#E51069 0%,#EF4A3D 100%);"',
  '                                        bgcolor="#EF4A3D">',
  '                                        <a href="https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1773147735398&relType=2" target="_blank"',
  '                                            style="font-size:15px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:15px 44px;display:inline-block;font-weight:700;letter-spacing:0.3px;mso-padding-alt:0;">',
  '                                            Reserve Your Free Spot &rarr;',
  '                                        </a>',
  '                                    </td>',
  '                                </tr>',
  '                            </table>',
  '                        </td>',
  '                    </tr>'
].join('\n');

html = html.replace(oldLearnSection, newLearnSection);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Done. Template updated successfully.');
