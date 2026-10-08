const fs = require('fs');

const inPath = 'e:\\HR\\00-html\\00-emailer-automation\\email-reference\\premium-templates\\standalone.html';
const outPath = 'e:\\HR\\00-html\\00-emailer-automation\\webcasts\\standalone-2026-05-20-hiring-tech\\standalone-2026-05-20-hiring-tech.html';

let html = fs.readFileSync(inPath, 'utf8');

// 1. Meta replacements
html = html.replace(
    '<title>The AI Hiring Gap: Why Top Candidates Fail—and How to Fix It | HR.com Webcast</title>',
    '<title>Here\'s How Your Hiring Tech Boosts Your Employer Brand | HR.com Webcast</title>'
);

html = html.replace(
    '[REPLACE WITH GENERATED SUBJECT LINE]',
    'Is your hiring tech ruining your employer brand?'
);

html = html.replace(
    '[REPLACE WITH GENERATED PREHEADER TEXT]',
    'Discover how clunky workflows break trust and how to fix them for a better candidate journey.'
);

// 2. Sponsor replacement
html = html.replace(
    /src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg"/,
    'src="https://public-cdn.hr.com/system/app/media/rs/2025/6/24/mcapy8ld/120.jpg"'
);
html = html.replace(
    /alt="TestGorilla"/,
    'alt="SelectSoftware Reviews (SSR)"'
);

// 3. Hero contents
html = html.replace(
    'The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It',
    'Here\'s How Your Hiring Tech Boosts Your Employer Brand'
);

html = html.replace(
    'May 27, 2026 at 2:30 PM - 3:30 PM ET &nbsp;·&nbsp; Free to Attend',
    'May 20, 2026 at 1:00 PM - 2:00 PM ET &nbsp;·&nbsp; Free to Attend'
);

// URLs
html = html.replace(/__STORY_ID__/g, '1775149040813');
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/o698s');

// 4. Intro copy & Takeaways
const introRegex = /<!-- Single punchy intro para[\s\S]*?<\/p>/;
html = html.replace(introRegex, `<!-- Single punchy intro para (200-250 chars) -->
                            <p class="body-copy-p"
                                style="margin:0 0 0 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">
                                Your hiring tech either reinforces candidate trust&mdash;or quietly erodes it. Clunky workflows instantly damage your employer brand. Join us to audit your systems, fix friction points, and build a credible candidate journey.
                            </p>`);

const takeaway1Regex = /(<!-- Takeaway 01 -->[\s\S]*?<span class="takeaway-title"[\s\S]*?>)[\s\S]*?(<\/span>)/;
html = html.replace(takeaway1Regex, '$1How your tech stack influences candidate perception$2');

const takeaway2Regex = /(<!-- Takeaway 02 -->[\s\S]*?<span class="takeaway-title"[\s\S]*?>)[\s\S]*?(<\/span>)/;
html = html.replace(takeaway2Regex, '$1Where hiring technology breaks down and creates bias$2');

const takeaway3Regex = /(<!-- Takeaway 03 -->[\s\S]*?<span class="takeaway-title"[\s\S]*?>)[\s\S]*?(<\/span>)/;
html = html.replace(takeaway3Regex, '$1What a great modern candidate journey looks like$2');

const takeaway4Regex = /(<!-- Takeaway 04 -->[\s\S]*?<span class="takeaway-title"[\s\S]*?>)[\s\S]*?(<\/span>)/;
html = html.replace(takeaway4Regex, '$1How to audit your systems for quick wins$2');


// 5. Presenters
html = html.replace('Your expert hosts', 'Your expert host');
html = html.replace('Learn directly from industry leaders', 'Learn directly from industry leader');

const speaker1Regex = /<!-- Presenter 1 -->[\s\S]*?<!-- Presenter 2 -->/;
const speaker1Replacement = `<!-- Presenter 1 -->
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
                                                    <img alt="Zach Mason"
                                                        src=""
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Zach Mason
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        Senior HR Software Advisor - SelectSoftware Reviews (SSR)
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td><![endif]-->

                            <!-- Presenter 2 -->`;
html = html.replace(speaker1Regex, speaker1Replacement);

const speaker2Regex = /<!-- Presenter 2 -->[\s\S]*?<!--\[if mso\]><\/tr><\/table><\!\[endif\]-->/;
html = html.replace(speaker2Regex, '<!--[if mso]></tr></table><![endif]-->');

// Validate Credit section (N/A) -> Ensure untouched as instructed by the skill.
fs.writeFileSync(outPath, html, 'utf8');

console.log("Successfully rebuilt the HTML emailer!");
