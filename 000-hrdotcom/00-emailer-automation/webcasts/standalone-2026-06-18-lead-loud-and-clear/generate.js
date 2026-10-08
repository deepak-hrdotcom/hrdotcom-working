const fs = require('fs');

const htmlPath = 'e:/HR/00-html/00-emailer-automation/webcasts/standalone-2026-06-18-lead-loud-and-clear/standalone-2026-06-18-lead-loud-and-clear.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const subjectLine = "Are your messages falling flat? Cut through the clutter [June 18]";
const preheaderText = "Learn how to deliver communication that shapes culture and drives results.";

const storyId = '1777486708968';
const secondaryCta = 'https://web.hr.com/qdtmv';
const sponsorLogoUrl = 'https://public-cdn.hr.com/system/app/media/rs/2020/3/4/k7dhbena/120.jpg';

const eventTitle = "Lead Loud and Clear: Communication Strategies That Inspire Action";
const eventDate = "June 18, 2026 at 1:00 PM - 2:00 PM ET";

// Replace Subject and Preheader
html = html.replace('[REPLACE WITH GENERATED SUBJECT LINE]', subjectLine);
html = html.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', preheaderText);

// Replace Story ID and Secondary CTA
html = html.replace(/__STORY_ID__/g, storyId);
html = html.replace(/__SECONDARY_CTA__/g, secondaryCta);

// Replace Event Title
html = html.replace(/<title>.*?<\/title>/, `<title>${eventTitle} | HR.com Webcast</title>`);
html = html.replace(/The AI Hiring Gap: Why Top Candidates Fail&mdash;and How to Fix It/, eventTitle);

// Replace Date
html = html.replace(/May 27, 2026 at 2:30 PM - 3:30 PM ET &nbsp;&middot;&nbsp; Free to Attend/, `${eventDate} &nbsp;&middot;&nbsp; Free to Attend`);

// Replace Sponsor Logo
html = html.replace(/<img[^>]+src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg"[^>]+>/, `<img src="${sponsorLogoUrl}" alt="Gallagher" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />`);

// Replace Intro Paragraph
const introRegex = /<p class="body-copy-p"[^>]*>[\s\S]*?<\/p>/;
const newIntro = `<p class="body-copy-p"
                                style="margin:0 0 0 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">
                                Are your organizational messages falling flat despite your best efforts? Join our Gallagher experts to learn how to cut through the clutter and deliver communication that moves people and drives bottom-line growth.
                            </p>`;
html = html.replace(introRegex, newIntro);

// Replace What You'll Learn Bullets
const bullets = [
    "Turn communication data into actionable growth strategies",
    "Build employee connection to strengthen trust and alignment",
    "Future-proof your organization with enhanced workforce capabilities",
    "Listen like a leader to shape effective decisions"
];
const bulletRegex = /<span class="takeaway-title"[\s\S]*?>[\s\S]*?<\/span>/g;
let bulletIndex = 0;
html = html.replace(bulletRegex, function(match) {
    if (bulletIndex < bullets.length) {
        const replacement = `<span class="takeaway-title"
                                            style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">${bullets[bulletIndex]}</span>`;
        bulletIndex++;
        return replacement;
    }
    return match;
});

// Presenters HTML
const presentersHTML = `
<!-- Presenter 1 -->
                            <!--[if mso]><td width="200" valign="top" style="padding:10px 8px;"><![endif]-->
                            <table class="speaker-card-div" role="presentation" border="0" cellpadding="0"
                                cellspacing="0"
                                style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:200px;min-width: 200px;margin:8px;">
                                <tr>
                                    <td style="padding:0;">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:200px;min-width:200px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"
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
                            <!--[if mso]><td width="200" valign="top" style="padding:10px 8px;"><![endif]-->
                            <table class="speaker-card-div" role="presentation" border="0" cellpadding="0"
                                cellspacing="0"
                                style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:200px;min-width: 200px;margin:8px;">
                                <tr>
                                    <td style="padding:0;">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:200px;min-width:200px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"
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
                            <!--[if mso]><td width="200" valign="top" style="padding:10px 8px;"><![endif]-->
                            <table class="speaker-card-div" role="presentation" border="0" cellpadding="0"
                                cellspacing="0"
                                style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:200px;min-width: 200px;margin:8px;">
                                <tr>
                                    <td style="padding:0;">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="max-width:200px;min-width:200px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"
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

html = html.replace(/<!-- Presenter 1 -->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->[\s\S]*?<!-- Presenter 2 -->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->/, presentersHTML);

// Presenter Logic Adjustment for Multiple Speakers
html = html.replace(/Your expert host<\/p>/, 'Your expert hosts</p>');
html = html.replace(/Learn directly from industry leader<\/h2>/, 'Learn directly from industry leaders</h2>');

// Wait, the template original text is "Your expert hosts" and "Learn directly from industry leaders" because it originally had 2 presenters. Let's make sure.

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Done!');
