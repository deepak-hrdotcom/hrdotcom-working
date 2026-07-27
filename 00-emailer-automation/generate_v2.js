const fs = require('fs');
const path = require('path');

const srcPath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/standalone.html';
const destDir = 'e:/HR/00-html/00-emailer-automation/webcasts/standalone-2026-06-18-lead-loud-and-clear-v2';
const destPath = path.join(destDir, 'standalone-2026-06-18-lead-loud-and-clear-v2.html');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

let html = fs.readFileSync(srcPath, 'utf8');

// Replacements
html = html.replace('[REPLACE WITH GENERATED SUBJECT LINE]', "Your messaging isn't landing. Here's how to fix it. [June 18]");
html = html.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', "Cut through the clutter and drive peak performance. Learn proven communication strategies from Gallagher.");
html = html.replace(/The AI Hiring Gap: Why Top Candidates Fail.*and How to Fix It/g, 'Lead Loud and Clear: Communication Strategies That Inspire Action');

html = html.replace(/<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/[a-zA-Z0-9\/_.-]+"[\s\S]*?alt="TestGorilla"[\s\S]*?>/, '<img src="https://public-cdn.hr.com/system/app/media/rs/2020/3/4/k7dhbena/120.jpg"\n                                            alt="Gallagher"\n                                            style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />');

html = html.replace('May 27, 2026 at 2:30 PM - 3:30 PM ET &nbsp;&middot;&nbsp; Free to Attend', 'June 18, 2026 at 1:00 PM - 2:00 PM ET &nbsp;&middot;&nbsp; Free to Attend');
html = html.replace('May 27, 2026 at 2:30 PM - 3:30 PM ET &nbsp;·&nbsp; Free to Attend', 'June 18, 2026 at 1:00 PM - 2:00 PM ET &nbsp;·&nbsp; Free to Attend');

html = html.replace(/__STORY_ID__/g, '1777486708968');
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/qdtmv');

html = html.replace(/Many newly-hired candidates sound fluent in AI during interviews but fail on the job\.[\s\S]*?Join this webcast to learn what real AI fluency looks like and how to verify it before[\s\S]*?you make an offer\./, 'Is your leadership messaging falling on deaf ears? Navigating the complexities of the employee experience requires communication that truly connects. Join Gallagher to discover proven strategies from the latest Employee Communications Report that cut through the clutter, energize your team, and turn engagement into bottom-line profitability.');

html = html.replace(/What\s+AI fluency actually looks like in a candidate/, 'Turn Employee Communications Report data into actionable strategies.');
html = html.replace(/Why\s+traditional signals like CVs fail for AI roles/, 'Build trust through proven, clear connection techniques.');
html = html.replace(/Real\s+insights from companies hiring for AI today/, 'Future-proof your organization with cultural agility.');
html = html.replace(/How\s+to evolve your hiring processes to verify execution/, 'Learn how active feedback loops drive engagement.');


// Speakers
const speakersHtml = `
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
                                                    <img alt="Maddison Grigsby"
                                                        src=""
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Maddison Grigsby
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        US Sales Leader, Communications - Gallagher
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
                                                    <img alt="Chris Andrew"
                                                        src=""
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Chris Andrew
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        Consulting Lead, Communications - Gallagher
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td><![endif]-->

                             <!-- Presenter 3 -->
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
                                                    <img alt="Steve Dion"
                                                        src=""
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Steve Dion
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        National Managing Director of Leadership & Organizational Development - Gallagher
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td><![endif]-->
`;

html = html.replace(/<!-- Presenter 1 -->[\s\S]*?<!-- Presenter 2 -->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->/, speakersHtml);

// 3 presenters means plural label
html = html.replace('Your expert host</p>', 'Your expert hosts</p>');
html = html.replace('Learn directly from industry leader\n                            </h2>', 'Learn directly from industry leaders\n                            </h2>');

fs.writeFileSync(destPath, html);
console.log('Created ' + destPath);
