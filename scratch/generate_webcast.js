const fs = require('fs');
const path = require('path');

const srcPath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/upcoming-webcast-template.html';
const destFolder = 'e:/HR/00-html/00-emailer-automation/webcasts/2026-04-23-manage-offboarding-in-one-centralized-platform';
const destPath = path.join(destFolder, '2026-04-23-manage-offboarding-in-one-centralized-platform.html');

if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
}

let template = fs.readFileSync(srcPath, 'utf8');

// Title & Preview Text
template = template.replace(
    '<title>A Practical Guide to AI Agents for HR | HR.com Webcast</title>',
    '<title>From Manual to Modern: Manage Offboarding in One Centralized Platform\u2014with Onwards HR | HR.com Webcast</title>'
);

// Preview text update
template = template.replace(
    'The conversation around AI in HR has moved past chatbots and content generators...',
    'Still relying on spreadsheets to manage workforce reductions? Discover how to eliminate manual offboarding...'
);

// Sponsor Section (in the Header Bar)
// Replace the image src with empty string
template = template.replace(
    /<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2022\/3\/25\/l164gf41\/120\.jpg"[\s\S]*?alt="Arist"[\s\S]*?style="([^"]+)" \/>/,
    '<img src=""\n                                            alt=""\n                                            style="$1" />'
);

// Hero Title
template = template.replace(
    />\s*A Practical Guide to AI Agents for HR\s*<\/h1>/,
    '>\n                                From Manual to Modern: Manage Offboarding in One Centralized Platform\u2014with Onwards HR\n                            </h1>'
);

// Date meta
template = template.replace(
    />\s*April 14, 2026 at 11:00 AM - 12:00 PM ET &nbsp;&middot;&nbsp; Free to Attend\s*<\/p>/,
    '>\n                                April 23, 2026 at 12:30 PM - 1:00 PM ET &nbsp;&middot;&nbsp; Free to Attend\n                            </p>'
);

// Registration Link (Hero)
template = template.replace(
    /href="https:\/\/www\.hr\.com\/en\?t=\/CustomCode\/webcasts\/registration&storyID=1773147735398&relType=2"/g,
    'href="https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=1773016327295&relType=2&eventID=1766410350540"'
);

// Intro Paragraph
template = template.replace(
    />\s*AI agents are rewriting the rules of L&amp;D\. Early adopters are compressing weeks of work into hours&mdash;join this free session to learn how\.\s*<\/p>/,
    '>\n                                Still relying on spreadsheets to manage workforce reductions? Discover how to eliminate manual offboarding to reduce legal risk and ensure equitable, compassionate employee exits.\n                            </p>'
);

// Bullets
template = template.replace(
    /<span class="takeaway-title"[^>]*>What AI agents actually are &mdash; and why they\u2019re different<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Build consistent, standardized offboarding processes</span>'
);

template = template.replace(
    /<span class="takeaway-title"[^>]*>Real-world examples from Fortune 500 L&amp;D teams<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Mitigate legal risks and ensure continuous compliance</span>'
);

template = template.replace(
    /<span class="takeaway-title"[^>]*>A practical readiness framework for your L&amp;D team<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Automate severance calculations and mandate notices</span>'
);

template = template.replace(
    /<span class="takeaway-title"[^>]*>How to compress weeks of L&amp;D work into hours<\/span>/,
    '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Gain real-time visibility across HR, Legal, and Finance</span>'
);


// Speakers Section
const speakersHTML = [
    '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->',
    '                                <!-- Presenter 1 -->',
    '                                <!--[if mso]><td width="50%" align="center" valign="top" style="padding:10px 0;"><![endif]-->',
    '                                <div class="speaker-card-div"',
    '                                    style="display:inline-block;width:48%;vertical-align:top;text-align:center;padding:10px 0;">',
    '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"',
    '                                        style="max-width:280px;background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"',
    '                                        class="speaker-card-inner">',
    '                                        <tr>',
    '                                            <td align="center" style="padding: 24px 16px;">',
    '                                                <img alt="Jaime Pickle" src="" width="90" style="display:block; border-radius:50%; margin-bottom:14px; border: 3px solid #ECEEF0;" />',
    '                                                <span class="speaker-name"',
    '                                                    style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">',
    '                                                    Jaime Pickle',
    '                                                </span>',
    '                                                <span class="speaker-role"',
    '                                                    style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">',
    '                                                    Head of Business Development and Partnerships - Onwards HR',
    '                                                </span>',
    '                                            </td>',
    '                                        </tr>',
    '                                    </table>',
    '                                </div>',
    '                                <!--[if mso]></td><![endif]-->',
    '                                <!-- Presenter 2 -->',
    '                                <!--[if mso]><td width="50%" align="center" valign="top" style="padding:10px 0;"><![endif]-->',
    '                                <div class="speaker-card-div"',
    '                                    style="display:inline-block;width:48%;vertical-align:top;text-align:center;padding:10px 0;">',
    '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"',
    '                                        style="max-width:280px;background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"',
    '                                        class="speaker-card-inner">',
    '                                        <tr>',
    '                                            <td align="center" style="padding: 24px 16px;">',
    '                                                <img alt="Melissa Gilliland" src="" width="90" style="display:block; border-radius:50%; margin-bottom:14px; border: 3px solid #ECEEF0;" />',
    '                                                <span class="speaker-name"',
    '                                                    style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">',
    '                                                    Melissa Gilliland',
    '                                                </span>',
    '                                                <span class="speaker-role"',
    '                                                    style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">',
    '                                                    Head of Business Development and Partnerships - Onwards HR',
    '                                                </span>',
    '                                            </td>',
    '                                        </tr>',
    '                                    </table>',
    '                                </div>',
    '                                <!--[if mso]></td><![endif]-->',
    '                                <!--[if mso]></tr></table><![endif]-->'
].join('\n');

template = template.replace(
    /<!--\[if mso\]><table role="presentation"[\s\S]*?<!--\[if mso\]><\/tr><\/table><!\[endif\]-->/,
    speakersHTML
);

fs.writeFileSync(destPath, template, 'utf8');
console.log('Done!');
