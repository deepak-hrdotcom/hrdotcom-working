const fs = require('fs');
const templateSrc = fs.readFileSync('e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\email-reference\\\\premium-templates\\\\standalone.html', 'utf8');

let newHtml = templateSrc;

// 1. Title/Subject/Preheader
newHtml = newHtml.replace('<title>The AI Hiring Gap: Why Top Candidates Fail—and How to Fix It | HR.com Webcast</title>', '<title>Beyond Compliance: Building Trust Through AI Governance in HR | HR.com Webcast</title>');
newHtml = newHtml.replace('<!-- SUBJECT: [REPLACE WITH GENERATED SUBJECT LINE] -->', "<!-- SUBJECT: Don't let AI compliance blindside your HR team. [May 7] -->");
newHtml = newHtml.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', "Turn governance into a strategic advantage. Learn from Charlene Li how top companies build trust and mitigate risk with AI.");

// 2. Sponsor Logo Header Left
const OLD_SPONSOR_REGEX = /<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs[\s\S]*?alt="TestGorilla"[\s\S]*?\/>/;
const NEW_SPONSOR_IMG = '<img src="https://public-cdn.hr.com/system/app/media/rs/2026/1/13/mkd66mrx/120.jpg" alt="Paycom" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />';
newHtml = newHtml.replace(OLD_SPONSOR_REGEX, NEW_SPONSOR_IMG);

// 3. Hero Copy
newHtml = newHtml.replace(/The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It/, "Beyond Compliance: Building Trust Through AI Governance in HR");
newHtml = newHtml.replace('May 27, 2026 at 2:30 PM - 3:30 PM ET', "May 7, 2026 at 3:00 PM - 4:00 PM ET");

// CTA Story ID
newHtml = newHtml.replace(/__STORY_ID__/g, "1774903800081");
newHtml = newHtml.replace(/__SECONDARY_CTA__/g, "https://web.hr.com/jyqh5");

// 4. Body Copy
const OLD_BODY_REGEX = /<p class="body-copy-p"[\s\S]*?>[\s\S]*?Many newly-hired candidates[\s\S]*?<\/p>/;
const NEW_BODY = '<p class="body-copy-p" style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">AI is transforming HR, but poor governance can expose your organization to massive compliance risks. Don\'t just check boxes on an audit form—learn how to turn AI compliance into a strategic advantage. Join us to discover how prioritizing transparency and fairness can set your team apart.</p>';
newHtml = newHtml.replace(OLD_BODY_REGEX, NEW_BODY);

// 5. Takeaways
newHtml = newHtml.replace('What AI fluency actually looks like in a candidate', "Identify AI compliance challenges in human resources.");
newHtml = newHtml.replace('Why traditional signals like CVs fail for AI roles', "Turn compliance into a strategic corporate advantage.");
newHtml = newHtml.replace('Real insights from companies hiring for AI today', "Secure leadership buy-in for your AI strategy.");
newHtml = newHtml.replace('How to evolve your hiring processes to verify execution', "Strengthen your team's compliance position proactively.");

// 6. Speakers Section
// Replace Mehak Chowdhary with Charlene Li and remove Megan Bourdages
const SPEAKER_SECTION_REGEX = /(<!-- Presenter 1 -->)[\s\S]*?(<!--\[if mso\]><\/td><!\[endif\]-->)[\s\S]*?<!-- Presenter 2 -->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->/s;
const NEW_SPEAKER_SECTION = `<!-- Presenter 1 -->
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
                                                    <img alt="Charlene Li"
                                                        src=""
                                                        width="90" height="90"
                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                                                    <span class="speaker-name"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">
                                                        Charlene Li
                                                    </span>
                                                    <span class="speaker-role"
                                                        style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">
                                                        CEO and Founder - Altimeter Group
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td><![endif]-->`;
newHtml = newHtml.replace(SPEAKER_SECTION_REGEX, NEW_SPEAKER_SECTION);

fs.writeFileSync('e:\\\\HR\\\\00-html\\\\00-emailer-automation\\\\webcasts\\\\standalone-2026-05-07-beyond-compliance\\\\standalone-2026-05-07-beyond-compliance.html', newHtml, 'utf8');

console.log('Done.');
