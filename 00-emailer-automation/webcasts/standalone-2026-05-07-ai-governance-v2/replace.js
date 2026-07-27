const fs = require('fs');
const path = require('path');

const templatePath = 'e:\\HR\\00-html\\00-emailer-automation\\email-reference\\premium-templates\\standalone.html';
const outputPath = 'e:\\HR\\00-html\\00-emailer-automation\\webcasts\\standalone-2026-05-07-ai-governance-v2\\standalone-2026-05-07-ai-governance-v2.html';

let html = fs.readFileSync(templatePath, 'utf8');

// 1. Subject and Preheader
const subject = "Is your AI strategy just a compliance checkbox? [May 7]";
const preheader = "Turn AI governance into your secret weapon for transparency and trust. Register now.";

html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>Beyond Compliance: Building Trust Through AI Governance in HR | HR.com Webcast</title>');
html = html.replace(/<!-- SUBJECT: [\s\S]*? -->/, '<!-- SUBJECT: ' + subject + ' -->');
html = html.replace(/\[REPLACE WITH GENERATED PREHEADER TEXT\]/, preheader);

// 2. Sponsor Logo in Header
const sponsorLogo = 'https://public-cdn.hr.com/system/app/media/rs/2026/1/13/mkd66mrx/120.jpg';
const sponsorAlt = 'Paycom';
const sponsorImgTag = '<img src="' + sponsorLogo + '" alt="' + sponsorAlt + '" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />';
html = html.replace(/<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/[\s\S]*?alt="TestGorilla"[\s\S]*?\/>/, sponsorImgTag);

// 3. Hero Section
html = html.replace(/The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It/g, 'Beyond Compliance: Building Trust Through AI Governance in HR');
html = html.replace(/May 27, 2026 at 2:30 PM - 3:30 PM ET/, 'May 7, 2026 at 3:00 PM - 4:00 PM ET');

// CTA Links
const storyId = '1774903800081';
const secondaryCta = 'https://web.hr.com/jyqh5';
html = html.replace(/__STORY_ID__/g, storyId);
html = html.replace(/__SECONDARY_CTA__/g, secondaryCta);

// 4. Intro Hook
const hook = "Are you simply checking boxes on AI audit forms and hoping for the best? As AI accelerates across HR, the risk of costly compliance gaps grows. Join digital transformation expert Charlene Li to discover how winning organizations leverage transparency, fairness, and accountability to turn AI governance into a powerful strategic advantage.";
const introPara = '<p class="body-copy-p" style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">' + hook + '</p>';
html = html.replace(/<p class="body-copy-p"[\s\S]*?>[\s\S]*?Many newly-hired candidates[\s\S]*?<\/p>/, introPara);

// 5. What You'll Learn Bullets (Handled with Regex for robust matching)
const bullets = [
    "The compliance challenges presented by AI in human resources",
    "How to turn AI compliance into your organization’s strategic advantage",
    "How to create leadership buy-in for your AI compliance strategy",
    "Leverage transparency and fairness to stand apart from competition"
];

// Regex to match the takeaway-title spans content regardless of whitespace/newlines
const bulletRegexes = [
    /What\s+AI\s+fluency\s+actually\s+looks\s+like\s+in\s+a\s+candidate/,
    /Why\s+traditional\s+signals\s+like\s+CVs\s+fail\s+for\s+AI\s+roles/,
    /Real\s+insights\s+from\s+companies\s+hiring\s+for\s+AI\s+today/,
    /How\s+to\s+evolve\s+your\s+hiring\s+processes\s+to\s+verify\s+execution/
];

for (let i = 0; i < bullets.length; i++) {
    html = html.replace(bulletRegexes[i], bullets[i]);
}

// 6. Speakers Section
const speakerImg = 'https://public-cdn.hr.com/profile_images/2020/2/17/1581954212517_120';
const speakerName = 'Charlene Li';
const speakerTitle = 'CEO and Founder - Altimeter Group';

const speakerSectionRegex = /(<!-- Presenter 1 -->)[\s\S]*?(<!--\[if mso\]><\/td><!\[endif\]-->)[\s\S]*?<!-- Presenter 2 -->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->/s;
const speakerHtml = '<!-- Presenter 1 -->\n' +
'                            <!--[if mso]><td width="260" valign="top" style="padding:10px 8px;"><![endif]-->\n' +
'                            <table class="speaker-card-div" role="presentation" border="0" cellpadding="0"\n' +
'                                cellspacing="0"\n' +
'                                style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px;">\n' +
'                                <tr>\n' +
'                                    <td style="padding:0;">\n' +
'                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"\n' +
'                                            style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"\n' +
'                                            class="speaker-card-inner">\n' +
'                                            <tr>\n' +
'                                                <td align="center" style="padding:24px 16px;">\n' +
'                                                    <img alt="' + speakerName + '"\n' +
'                                                        src="' + speakerImg + '"\n' +
'                                                        width="90" height="90"\n' +
'                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />\n' +
'                                                    <span class="speaker-name"\n' +
'                                                        style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">\n' +
'                                                        ' + speakerName + '\n' +
'                                                    </span>\n' +
'                                                    <span class="speaker-role"\n' +
'                                                        style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">\n' +
'                                                        ' + speakerTitle + '\n' +
'                                                    </span>\n' +
'                                                </td>\n' +
'                                            </tr>\n' +
'                                        </table>\n' +
'                                    </td>\n' +
'                                </tr>\n' +
'                            </table>\n' +
'                            <!--[if mso]></td><![endif]-->';

html = html.replace(speakerSectionRegex, speakerHtml);

// Update speaker labels (singular)
html = html.replace('Your expert hosts', 'Your expert host');
html = html.replace('Learn directly from industry leaders', 'Learn directly from industry leader');

fs.writeFileSync(outputPath, html, 'utf8');
console.log('Successfully generated with landing page alignment: ' + outputPath);
