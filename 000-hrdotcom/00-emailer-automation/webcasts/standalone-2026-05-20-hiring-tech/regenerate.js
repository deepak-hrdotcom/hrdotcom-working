const fs = require('fs');
const path = require('path');

const srcPath = 'e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\email-reference\\\\premium-templates\\\\standalone.html';
const destPath = 'e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\webcasts\\\\standalone-2026-05-20-hiring-tech\\\\standalone-2026-05-20-hiring-tech.html';

let html = fs.readFileSync(srcPath, 'utf8');

// 0. Preheader & Subject
html = html.replace('[REPLACE WITH GENERATED SUBJECT LINE]', 'Is your hiring tech driving top candidates away? [May 20]');
html = html.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', 'Learn how to audit your hiring tools and fix candidate friction. Register for free.');

// 1. Title
html = html.replace(
    '<title>The AI Hiring Gap: Why Top Candidates Fail—and How to Fix It | HR.com Webcast</title>',
    '<title>Here\'s How Your Hiring Tech Boosts Your Employer Brand | HR.com Webcast</title>'
);

// 2. Headline
html = html.replace(
    'The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It',
    'Here\'s How Your Hiring Tech Boosts Your Employer Brand'
);

// 3. Date
html = html.replace(
    'May 27, 2026 at 2:30 PM - 3:30 PM ET',
    'May 20, 2026 at 1:00 PM - 2:00 PM ET'
);

// 4. Story ID
html = html.replaceAll('__STORY_ID__', '1775149040813');

// 5. Secondary CTA
html = html.replaceAll('__SECONDARY_CTA__', 'https://web.hr.com/o698s');

// 6. Intro Paragraph
html = html.replace(
    'Many newly-hired candidates sound fluent in AI during interviews but fail on the job.\r\n                                Join this webcast to learn what real AI fluency looks like and how to verify it before\r\n                                you make an offer.',
    'Your hiring technology either builds trust or quietly drives candidates away. Join this webcast to learn how to audit your ATS, remove friction, and build a modern candidate journey that protects your employer brand.'
);
// In case of \n instead of \r\n
html = html.replace(
    'Many newly-hired candidates sound fluent in AI during interviews but fail on the job.\n                                Join this webcast to learn what real AI fluency looks like and how to verify it before\n                                you make an offer.',
    'Your hiring technology either builds trust or quietly drives candidates away. Join this webcast to learn how to audit your ATS, remove friction, and build a modern candidate journey that protects your employer brand.'
);


// 7. Takeaways (Bullets)
html = html.replace(
    'What\r\n                                            AI fluency actually looks like in a candidate',
    'How hiring tech directly influences candidate perception'
);
html = html.replace(
    'What\n                                            AI fluency actually looks like in a candidate',
    'How hiring tech directly influences candidate perception'
);

html = html.replace(
    'Why\r\n                                            traditional signals like CVs fail for AI roles',
    'Where systems commonly break down and create friction'
);
html = html.replace(
    'Why\n                                            traditional signals like CVs fail for AI roles',
    'Where systems commonly break down and create friction'
);

html = html.replace(
    'Real\r\n                                            insights from companies hiring for AI today',
    'How to audit your current hiring tech stack'
);
html = html.replace(
    'Real\n                                            insights from companies hiring for AI today',
    'How to audit your current hiring tech stack'
);

html = html.replace(
    'How\r\n                                            to evolve your hiring processes to verify execution',
    'Quick wins to immediately improve the candidate experience'
);
html = html.replace(
    'How\n                                            to evolve your hiring processes to verify execution',
    'Quick wins to immediately improve the candidate experience'
);


// 8. Sponsor
html = html.replace(
    '<img src="https://public-cdn.hr.com/system/app/media/rs/2025/3/24/m8mwxyed/120.jpg"\r\n                                            alt="TestGorilla"',
    '<img src="https://public-cdn.hr.com/system/app/media/rs/2025/6/24/mcapy8ld/120.jpg"\r\n                                            alt="SelectSoftware Reviews"'
);
html = html.replace(
    '<img src="https://public-cdn.hr.com/system/app/media/rs/2025/3/24/m8mwxyed/120.jpg"\n                                            alt="TestGorilla"',
    '<img src="https://public-cdn.hr.com/system/app/media/rs/2025/6/24/mcapy8ld/120.jpg"\n                                            alt="SelectSoftware Reviews"'
);


// 9. Presenters
const speakerRegex = /<td align="center" valign="top" class="speakers-bg speakers-section-td"[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->\s*<!--\[if mso\]><\/tr><\/table><!\[endif\]-->\s*<\/td>/;

let speakerSection = [
'<td align="center" valign="top" class="speakers-bg speakers-section-td" style="background-color:#F8F9FA;padding:36px 24px 32px 24px;">',
'    <p style="margin:0 0 6px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;text-align:center;">Your expert host</p>',
'    <h2 class="section-heading" style="margin:0 0 28px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#2A343E;text-align:center;line-height:27px;">Learn directly from industry leader</h2>',
'    <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->',
'    <!-- Presenter 1 -->',
'    <!--[if mso]><td width="260" valign="top" style="padding:10px 8px;"><![endif]-->',
'    <table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px;">',
'        <tr>',
'            <td style="padding:0;">',
'                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);" class="speaker-card-inner">',
'                    <tr>',
'                        <td align="center" style="padding:24px 16px;">',
'                            <img alt="Zach Mason" src="" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />',
'                            <span class="speaker-name" style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">Zach Mason</span>',
'                            <span class="speaker-role" style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">Senior HR Software Advisor - SelectSoftware Reviews (SSR)</span>',
'                        </td>',
'                    </tr>',
'                </table>',
'            </td>',
'        </tr>',
'    </table>',
'    <!--[if mso]></td><![endif]-->',
'    <!--[if mso]></tr></table><![endif]-->',
'</td>'
].join('\n');

html = html.replace(speakerRegex, speakerSection);

fs.writeFileSync(destPath, html);
console.log('Fixed and regenerated!');
