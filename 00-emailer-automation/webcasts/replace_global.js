const fs = require('fs');
const path = require('path');

const srcPath = 'e:\\HR\\00-html\\00-emailer-automation\\email-reference\\premium-templates\\virtual-event.html';
const destDir = 'e:\\HR\\00-html\\00-emailer-automation\\webcasts\\virtual-event-2026-06-03-global-expansion-in-hr';
const destPath = path.join(destDir, 'virtual-event-2026-06-03-global-expansion-in-hr.html');

let html = fs.readFileSync(srcPath, 'utf8');

// Replacements
html = html.replace(/<title>.*?<\/title>/, '<title>The New Rules of Global HR Expansion | HR.com Webcast</title>');

// Subject and Preheader
html = html.replace('<!-- SUBJECT: [REPLACE WITH GENERATED SUBJECT LINE] -->', '<!-- SUBJECT: The hidden costs of cross-border hiring. Are you prepared? -->');
html = html.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', 'Move past reactive compliance and discover research-backed strategies to build scalable global teams. Register today.');

// Sponsor Logo
html = html.replace(/<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg"[\s\S]*?alt="TestGorilla"[\s\S]*?\/>/, '<img src="https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg" alt="HR.com" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />');

// Title
html = html.replace(/<h1 class="hero-title"[\s\S]*?>[\s\S]*?<\/h1>/, '<h1 class="hero-title" style="margin:0 0 8px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">\n                                The New Rules of Global HR Expansion\n                            </h1>');

// Date
html = html.replace(/May 27, 2026 at 2:30 PM - 3:30 PM ET &nbsp;·&nbsp; Free to Attend/, 'June 3, 2026 at 10:00 AM - 10:55 AM ET &nbsp;&middot;&nbsp; Free to Attend');

// Story ID
html = html.replace(/__STORY_ID__/g, '1776883596361');

// Secondary CTA
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/xnmjj');

// VE CTA
html = html.replace(/__VE_CTA__/g, 'https://web.hr.com/8iy7c');

// VE Name
html = html.replace(/__VE_NAME__/g, 'Global Expansion in HR');

// Intro Paragraph
html = html.replace(/<p class="body-copy-p"[\s\S]*?>[\s\S]*?<\/p>/, '<p class="body-copy-p" style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">\n                                Hiring across borders opens access to new markets but introduces complex legal, payroll, and cultural challenges. Join us to discover how to move past reactive compliance and build a strategic, scalable global model.\n                            </p>');

// Bullets - FIX: replace only the inner content based on the exact template string to avoid greedy matching
html = html.replace(/What\s+AI fluency actually looks like in a candidate/, 'The biggest obstacles to managing cross-border employees');
html = html.replace(/Why\s+traditional signals like CVs fail for AI roles/, 'Where organizations currently operate and top business drivers');
html = html.replace(/Real\s+insights from companies hiring for AI today/, 'How to overcome fragmented systems and manual processes');
html = html.replace(/How\s+to evolve your hiring processes to verify execution/, 'The growing role of AI in global human resources operations');

// Presenters
let presentersHtml = '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->\n' +
'<!-- Presenter 1 -->\n' +
'<!--[if mso]><td width="260" valign="top" style="padding:10px 8px;"><![endif]-->\n' +
'<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px;">\n' +
'    <tr>\n' +
'        <td style="padding:0;">\n' +
'            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);" class="speaker-card-inner">\n' +
'                <tr>\n' +
'                    <td align="center" style="padding:24px 16px;">\n' +
'                        <img alt="Mark Vickers" src="https://public-cdn.hr.com/profile_images/2016/11/10/1478801377343_120" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />\n' +
'                        <span class="speaker-name" style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">\n' +
'                            Mark Vickers\n' +
'                        </span>\n' +
'                        <span class="speaker-role" style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">\n' +
'                            Chief Research Analyst &amp; Data Wrangler (HR.com)\n' +
'                        </span>\n' +
'                    </td>\n' +
'                </tr>\n' +
'            </table>\n' +
'        </td>\n' +
'    </tr>\n' +
'</table>\n' +
'<!--[if mso]></td><![endif]-->\n' +
'\n' +
'<!-- Presenter 2 -->\n' +
'<!--[if mso]><td width="260" valign="top" style="padding:10px 8px;"><![endif]-->\n' +
'<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px;">\n' +
'    <tr>\n' +
'        <td style="padding:0;">\n' +
'            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);" class="speaker-card-inner">\n' +
'                <tr>\n' +
'                    <td align="center" style="padding:24px 16px;">\n' +
'                        <img alt="Brent Skinner" src="https://public-cdn.hr.com/profile_images/2025/1/2/1735828653038_120" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />\n' +
'                        <span class="speaker-name" style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">\n' +
'                            Brent Skinner\n' +
'                        </span>\n' +
'                        <span class="speaker-role" style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">\n' +
'                            Executive Community Leader, Payroll | HRIS | Workforce Management(HR.com)\n' +
'                        </span>\n' +
'                    </td>\n' +
'                </tr>\n' +
'            </table>\n' +
'        </td>\n' +
'    </tr>\n' +
'</table>\n' +
'<!--[if mso]></td><![endif]-->\n' +
'<!--[if mso]></tr></table><![endif]-->';

html = html.replace(/<!--\[if mso\]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><!\[endif\]-->[\s\S]*?<!--\[if mso\]><\/tr><\/table><!\[endif\]-->/, presentersHtml);

fs.writeFileSync(destPath, html);
console.log('Done');
