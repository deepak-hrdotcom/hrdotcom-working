const fs = require('fs');
const path = require('path');

let tpl = fs.readFileSync('e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/upcoming-virtual-event-template.html', 'utf-8');

// Title
tpl = tpl.replace(/HR Demo Day/g, "HR.com's Future of Employee Well-being");
tpl = tpl.replace(/<title>HR Demo Day.*?<\/title>/, '<title>HR.com\'s Future of Employee Well-being | May 12, 2026</title>');
// Preview text
tpl = tpl.replace(/10 live product demos.*?April 23./, 'Boost your employee well-being strategy. Register free for our May 12 virtual event.');

// Date pill
tpl = tpl.replace(/Thursday, April 23, 2026 &nbsp;·&nbsp; 10:30 AM – 3:30 PM ET/, 'Tuesday, May 12, 2026');

// Session count
tpl = tpl.replace(/\{\{SESSIONS_COUNT\}\}/g, '3');

// Description section
const copyHtml = `<p class="body-para" style="margin: 0 0 16px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 400; color: #4A5568; text-align: left; line-height: 28px;">
    Many organizations offer well-being programs, but too often these efforts are fragmented, hard to measure, or disconnected from what employees actually need. If fewer than a third of organizations effectively promote well-being, how can your HR team build a stronger, more integrated strategy that genuinely helps your people thrive?
</p>
                            <!-- Solution Paragraph — present the value and call to action copy -->
                            <p class="body-para" style="margin: 0 0 36px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 500; color: #2A343E; text-align: left; line-height: 28px;">
    Join the <strong style="color: #02588E;">Future of Employee Well-being</strong> virtual event to explore comprehensive strategies across physical, mental, and financial dimensions. You'll hear practical insights on overcoming top challenges like stress, burnout, and lack of leadership buy-in to ensure your initiatives make a real difference.
</p>`;

tpl = tpl.replace(
    /<p class="body-para"[\s\S]*?Your hiring team is stretched thin[\s\S]*?<\/p>\s*<!-- Solution Paragraph[\s\S]*?<p class="body-para"[\s\S]*?Join <strong.*?10 live product demos[\s\S]*?<\/p>/,
    copyHtml
);

// CTA Link
tpl = tpl.replace(/https:\/\/www\.hr\.com\/en\?t=\/CustomCode\/events\/registration&eventID=1766410350540/g, 'https://www.hr.com/en?t=/CustomCode/events/registration&eventID=1752607819222');

// Subheading Date
tpl = tpl.replace(/Thursday, April 23 &nbsp;·&nbsp; All times Eastern/, 'Tuesday, May 12 &nbsp;·&nbsp; All times Eastern');

// Sessions replacement
const sessions = [
    {
        title: "How to Boost the Health of Your Employee Well-Being Strategies",
        time: "10:00 AM - 10:55 AM ET",
        url: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/how-to-boost-the-health-of-your-employee-well-bein_mn6d24ua.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6",
        color: "#EF4A3D"
    },
    {
        title: "Building Human Workplaces: Four Strategies to Drive Results in 2026",
        time: "11:00 AM - 11:55 AM ET",
        url: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/building-human-workplaces-four-strategies-to-drive_mnf2n39p.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6",
        color: "#FDB414"
    },
    {
        title: "From Breakroom to Social Media: HR’s Roadmap to Protect Employee Well-being from Online Misconduct",
        time: "12:00 PM - 12:55 PM ET",
        url: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/from-breakroom-to-social-media-hr%E2%80%99s-roadmap-to-pro_mmuyqs7f.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6",
        color: "#94C83D"
    }
];

let sessionHtml = '';
sessions.forEach(s => {
    sessionHtml += `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                                <tr>
                                    <td valign="top" width="12" style="padding-right: 0; padding-top: 5px;">
                                        <div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${s.color}; font-size: 0; line-height: 0;">&nbsp;</div>
                                    </td>
                                    <td valign="top" style="padding-left: 12px;">
                                        <p style="margin: 0 0 2px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 10px; font-weight: 700; color: ${s.color}; text-transform: uppercase; letter-spacing: 1px; line-height: 14px;"
                                            class="agenda-time-text">${s.time}</p>
                                        <a href="${s.url}" target="_blank"
                                            style="font-family: 'Manrope', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #1A73E8; text-decoration: none; line-height: 20px;"
                                            class="agenda-item-title">
                                            ${s.title}
                                        </a>
                                    </td>
                                </tr>
                            </table>`;
});

tpl = tpl.replace(
    /<!-- Agenda Items[\s\S]*?<!-- Register CTA below agenda -->/,
    '<!-- Agenda Items -->\n' + sessionHtml + '\n\n                            <!-- Register CTA below agenda -->'
);


// Sponsors Replacement
const sponsors = [
    {
        name: "Reward Gateway",
        logo: "https://public-cdn.hr.com/system/app/media/rs/2026/3/11/mmma11nd/120.jpg",
        url: "https://www.hr.com/en/app/account/reward_gateway?s=1490710f-913c-45f1-9b26-c2c25171c3d6"
    },
    {
        name: "Fama Technologies, Inc.",
        logo: "https://public-cdn.hr.com/system/app/media/rs/2025/2/4/m6qirc6y/120.jpg",
        url: "https://www.hr.com/en/app/account/fama_technologies_inc?s=1490710f-913c-45f1-9b26-c2c25171c3d6"
    }
];

let sponsorHtml = '<div style="text-align: center; font-size: 0px; width: 100%;">\n<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->\n';
sponsors.forEach((s, idx) => {
    sponsorHtml += `
                                <!--[if mso]><td width="33%" align="center" valign="top" style="padding: 10px 0;"><![endif]-->
                                <div class="sponsor-logo-cell"
                                    style="display: inline-block; width: 33%; vertical-align: top; text-align: center; padding: 10px 0;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"
                                        style="background-color: #ffffff; border-radius: 8px; margin: 0 auto; overflow: hidden; max-width: 140px;">
                                        <tr>
                                            <td align="center" valign="middle" height="85"
                                                style="height: 85px; padding: 10px; background-color: #ffffff;">
                                                <a href="${s.url}" target="_blank" style="text-decoration: none; display: inline-block;">
                                                    <img src="${s.logo}"
                                                        alt="${s.name}" width="100"
                                                        style="width: 100%; max-width: 90px; height: auto; display: block; margin: 0 auto; border: 0;" />
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <!--[if mso]></td><![endif]-->`;
    if ((idx + 1) % 3 === 0 && idx < sponsors.length - 1) {
        sponsorHtml += '\n<!--[if mso]></tr><tr><![endif]-->\n';
    }
});
sponsorHtml += '\n<!--[if mso]></tr></table><![endif]-->\n</div>';

tpl = tpl.replace(
    /<div style="text-align: center; font-size: 0px; width: 100%;">[\s\S]*?<!-- CREDIT INFORMATION — SHRM \+ HRCI badges -->/,
    sponsorHtml + '\n                        </td>\n                    </tr>\n\n                    <!-- ============================================================ -->\n                    <!-- CREDIT INFORMATION — SHRM + HRCI badges -->'
);

const outDir = 'e:/HR/00-html/00-emailer-automation/virtual-events/2026-05-12-future-of-employee-well-being';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(path.join(outDir, '2026-05-12-future-of-employee-well-being.html'), tpl);
console.log('Successfully generated virtual event emailer.');
