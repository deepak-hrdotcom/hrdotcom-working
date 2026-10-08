const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'email-reference', 'premium-templates', 'demo.html');
const outDir = path.join(__dirname, 'webcasts', 'demo-2026-06-24-the-end-of-bundled-maternity-care');
const outPath = path.join(outDir, 'demo-2026-06-24-the-end-of-bundled-maternity-care.html');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

let html = fs.readFileSync(templatePath, 'utf8');

// 1. Title & Meta
html = html.replace(/<title>.*?<\/title>/, '<title>The End of Bundled Maternity Care | HR.com Webcast</title>');
html = html.replace(/\[REPLACE WITH GENERATED SUBJECT LINE\]/, 'Your maternity costs are about to skyrocket. [June 24]');
html = html.replace(/\[REPLACE WITH GENERATED PREHEADER TEXT\]/, 'In 2027, the AMA ends bundled maternity care. See the hidden risks to your health plan.');

// 2. Hero
html = html.replace(/<h1 class="hero-title"[\s\S]*?>[\s\S]*?<\/h1>/, '<h1 class="hero-title"\n                                style="margin:0 0 8px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">\n                                The End of Bundled Maternity Care\n                            </h1>');

html = html.replace(/April 14, 2026 at 11:00 AM - 12:00 PM ET/, 'June 24, 2026 at 12:00 PM - 12:30 PM ET');

// 3. Links
html = html.split('__STORY_ID__').join('1777299354945');
html = html.split('__SECONDARY_CTA__').join('https://web.hr.com/h3sq');

// 4. Sponsor Logo
html = html.replace(/https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2022\/3\/25\/l164gf41\/120\.jpg/, 'https://public-cdn.hr.com/system/app/media/rs/2025/10/16/mgtmdfzw/120.jpg');
html = html.replace(/alt="Arist"/g, 'alt="Maven Clinic"');

// 5. Intro Copy
const introText = 'In 2027, the AMA will dismantle global maternity billing, fragmenting a single charge into dozens. Join this webcast to understand the hidden risks of unbundled care and what smart employers are doing now to protect their benefit plans.';
html = html.replace(/<p class="body-copy-p"[\s\S]*?>\s*AI agents are rewriting[\s\S]*?how.\s*<\/p>/, '<p class="body-copy-p"\n                                style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">\n                                ' + introText + '\n                            </p>');

// 6. Bullets
html = html.replace(/What\s+AI agents actually are &mdash; and why they’re different/, 'Understand why maternity billing is unbundling in 2027');
html = html.replace(/Real-world\s+examples from Fortune 500 L&amp;D teams/, 'Identify where costs will rise and lose predictability');
html = html.replace(/A\s+practical readiness framework for your L&amp;D team/, 'Assess hidden risks for employer-sponsored health plans');
html = html.replace(/How\s+to compress weeks of L&amp;D work into hours/, 'Discover strategies to stay ahead of the 2027 changes');

// 7. Presenters
// P1
html = html.replace(/https:\/\/public-cdn\.hr\.com\/profile_images\/2021\/12\/14\/1639477478951_120/, '');
html = html.replace(/alt="Michael Ioffe"/, 'alt="Dr. Neel Shah"');
html = html.replace(/Michael Ioffe/, 'Dr. Neel Shah');
html = html.replace(/Co-Founder and CEO - Arist/, 'Chief Medical Officer - Maven Clinic');

// P2 
// Note: demo.html actually only has 1 presenter! 
// Let's check: the template has only 1 speaker card! 
// We need to inject the 2nd speaker card.
const speaker2Html = `
                            <!-- Presenter 2 -->
                            <!--[if mso]><td width="260" valign="top" style="padding:10px 8px;"><![endif]-->
                            <table class="speaker-card-div" role="presentation" border="0" cellpadding="0"
                                cellspacing="0"
                                style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px;">
                                <tr>
                                    <td style="padding:0;">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"
                                            class="speaker-card-inner">
                                            <tr>
                                                <td align="center" style="padding:24px 16px;">
                                                    <img alt="Doreen Bortel"
                                                        src=""
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Doreen Bortel
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        Chief Revenue Officer - Maven Clinic
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td><![endif]-->`;
                            
// Replace P1's closing comment block with the closing block + new P2
html = html.replace(/<!--\[if mso\]><\/td><!\[endif\]-->(\s*<!--\[if mso\]><\/tr><\/table><!\[endif\]-->)/, '<!--[if mso]></td><![endif]-->' + speaker2Html + '$1');

// Adjust Presenter title from "Your expert host" to "Your expert hosts"
html = html.replace(/Your expert host<\/p>/, 'Your expert hosts</p>');
html = html.replace(/Learn directly from industry leader\n/, 'Learn directly from industry leaders\n');


// 8. Remove Virtual Event Callout (lines 565-590 approx)
// The block starts with <!--  VIRTUAL EVENT CALLOUT — Subtle branded strip        -->
// and ends with the </tr> for that table row. 
html = html.replace(/<!--  VIRTUAL EVENT CALLOUT [\s\S]*?<!-- ============================================================ -->\s*<!-- REGISTRATION REMINDER ROW/, '<!-- ============================================================ -->\n                    <!-- REGISTRATION REMINDER ROW');


fs.writeFileSync(outPath, html, 'utf8');
console.log('Successfully generated ' + outPath);
