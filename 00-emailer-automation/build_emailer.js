const fs = require('fs');
const path = require('path');

const masterTemplatePath = 'e:\\HR\\00-html\\00-emailer-automation\\email-reference\\premium-templates\\virtual-event.html';
const outFolder = 'e:\\HR\\00-html\\00-emailer-automation\\webcasts\\virtual-event-2026-05-14-your-ai-is-only-as-good-as-your-data';
const outFile = path.join(outFolder, 'virtual-event-2026-05-14-your-ai-is-only-as-good-as-your-data.html');

if (!fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder, { recursive: true });
}

let html = fs.readFileSync(masterTemplatePath, 'utf8');

// Title
html = html.replace(/<title>.*?<\/title>/, '<title>Your AI is Only as Good as Your Data | HR.com Webcast</title>');

// Subject & Preheader
html = html.replace(/\[REPLACE WITH GENERATED SUBJECT LINE\]/, "Your AI can't make decisions on fragmented data. [May 14]");
html = html.replace(/\[REPLACE WITH GENERATED PREHEADER TEXT\]/, "Learn how connecting people, roles, and budgets creates a source of truth for AI-driven insights.");

// Sponsor Header
html = html.replace(/<img[^>]*alt="TestGorilla"[^>]*>/, '<img src="https://public-cdn.hr.com/system/app/media/rs/2026/2/27/mm5dc9z7/120.jpg" alt="Built" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />');

// Hero section
html = html.replace(
    /<h1 class="hero-title"[^>]*>[\s\S]*?<\/h1>/,
    '<h1 class="hero-title" style="margin:0 0 8px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">Your AI is Only as Good as Your Data</h1>'
);
html = html.replace(
    /<p class="hero-meta"[^>]*>[\s\S]*?<\/p>/,
    '<p class="hero-meta" style="margin:0 0 24px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;">May 14, 2026 at 2:00 PM - 2:55 PM ET &nbsp;·&nbsp; Free to Attend</p>'
);

// CTA links
html = html.replace(/__STORY_ID__/g, '1774643599549');
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/3nva');
html = html.replace(/__VE_NAME__/g, "HR.com's State of Today's HR Tech and Integrations");
html = html.replace(/__VE_CTA__/g, 'https://web.hr.com/jrwpk');

// Intro paragraph
html = html.replace(
    /<p class="body-copy-p"[^>]*>[\s\S]*?<\/p>/,
    '<p class="body-copy-p" style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">Most HR systems silo employee data, leaving AI blind to the full picture. Join us to learn how connecting people, roles, and budgets into a single source of truth empowers AI to drive real business decisions.</p>'
);

// Bullets
html = html.replace(/<span class="takeaway-title"[^>]*>What\s+AI fluency actually looks like in a candidate<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Why current HR data systems limit AI effectiveness</span>');
html = html.replace(/<span class="takeaway-title"[^>]*>Why\s+traditional signals like CVs fail for AI roles<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">How to create a single connected data foundation</span>');
html = html.replace(/<span class="takeaway-title"[^>]*>Real\s+insights from companies hiring for AI today<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Uncovering budget risks and key roles with AI</span>');
html = html.replace(/<span class="takeaway-title"[^>]*>How\s+to evolve your hiring processes to verify execution<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Transitioning from disconnected spreadsheets to unified systems</span>');

// Presenters Label
html = html.replace(/Your expert hosts?/, 'Your expert hosts');
html = html.replace(/Learn directly from industry leaders?/, 'Learn directly from industry leaders');

// Presenters Block (we need to replace the entire presenters block)
const presenterBlock = `
                            <!-- Presenter 1 -->
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
                                                    <img alt="Brett Derricott"
                                                        src="https://public-cdn.hr.com/profile_images/2018/10/11/1539253534055_120"
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Brett Derricott
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        Founder and CEO (Built)
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td><![endif]-->

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
                                                    <img alt="Hayley Sonntag"
                                                        src="https://public-cdn.hr.com/profile_images/2026/3/9/1773081478802_120"
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Hayley Sonntag
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        Demand Gen Marketing (Built)
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td><![endif]-->
`;

// we need to replace between <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->
// and <!--[if mso]></tr></table><![endif]-->
html = html.replace(/(<!--\[if mso\]><table role="presentation"[^>]*><tr><!\[endif\]-->)[\s\S]*?(<!--\[if mso\]><\/tr><\/table><!\[endif\]-->)/, '$1\n' + presenterBlock + '\n$2');

fs.writeFileSync(outFile, html);
console.log("HTML written to " + outFile);
