const fs = require('fs');
const path = require('path');

const srcPath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/upcoming-virtual-event-template.html';
const destDir = 'e:/HR/00-html/00-emailer-automation/events/2026-05-12-future-of-employee-well-being';
const destPath = path.join(destDir, 'emailer.html');

let html = fs.readFileSync(srcPath, 'utf-8');

// Title Regex replacement
html = html.replace(
    /<title>.*?<\/title>/,
    '<title>Future of Employee Well-being — May 12, 2026 | HR.com</title>'
);

// Preview Text
html = html.replace(
    /10 live product demos\. One day\. Real hiring transformation — Register free for HR Demo Day, April 23\./,
    'Discover the real impact of your well-being strategy. Join the Future of Employee Well-being on May 12.'
);

// URL registrations ID
html = html.replace(
    /eventID=1766410350540/g,
    'eventID=1752607819222'
);

// Hero Replacements
html = html.replace(
    /<h1 class="hero-title"[\s\S]*?>\s*HR Demo Day\s*<\/h1>/,
    `<h1 class="hero-title"
                                style="margin: 0 0 16px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 34px; font-weight: 900; color: #FFFFFF; line-height: 42px; text-align: center; letter-spacing: -0.5px;">
                                Future of Employee Well-being
                            </h1>`
);

html = html.replace(
    /<p class="hero-subtitle"[\s\S]*?>\s*AI Automation for High-Volume Hiring\s*<\/p>/,
    `<p class="hero-subtitle"
                                style="margin: 0 0 8px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 17px; font-weight: 600; color: #4AC4D6; text-align: center; line-height: 26px;">
                                Building a Healthier, More Effective Strategy
                            </p>`
);

html = html.replace(
    /Thursday, April 23, 2026 &nbsp;·&nbsp; 10:30 AM – 3:30 PM ET &nbsp;·&nbsp; Free to Attend/,
    'Tuesday, May 12, 2026 &nbsp;·&nbsp; Free to Attend'
);

// Delete the old two paragraphs and replace -> Hero body copy
const heroRegex = /<p\s+style="[^\"]*color:\s*#CBD5E0[^>]*>[\s\S]*?Your hiring team is stretched thin[\s\S]*?<\/p>\s*<p[\s\S]*?Join <strong[^>]*>10 live product demos[\s\S]*?<\/p>/;
const newHeroPara = `<p
                                style="margin: 0 0 18px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 400; color: #CBD5E0; text-align: center; line-height: 27px; max-width: 500px; margin-left: auto; margin-right: auto;">
                                Too often, employee well-being efforts are fragmented, hard to measure, and disconnected from what people actually need most. In fact, fewer than a third of organizations effectively promote employee well-being, leading to high stress and burnout.
                            </p>
                            <p
                                style="margin: 0 0 32px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 500; color: #E2E8F0; text-align: center; line-height: 27px; max-width: 500px; margin-left: auto; margin-right: auto;">
                                Join us for <strong style="color: #FFFFFF;">The Future of Employee Well-being</strong> to uncover exclusive HR Research Institute findings and learn how top organizations are building effective, measurable well-being strategies across physical, mental, and social dimensions.
                            </p>`;
html = html.replace(heroRegex, newHeroPara);

// Agenda Date Section Heading
html = html.replace(
    /Thursday, April 23 &nbsp;·&nbsp; All times Eastern/,
    'Tuesday, May 12 &nbsp;·&nbsp; All times Eastern'
);

// Replace Agenda items section
const motifColors = ['#EF4A3D', '#FDB414', '#94C83D', '#4AC4D6'];
const sessions = [
    {
        title: "How to Boost the Health of Your Employee Well-Being Strategies",
        time: "10:00 AM - 10:55 AM ET",
        link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/how-to-boost-the-health-of-your-employee-well-bein_mn6d24ua.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"
    },
    {
        title: "Building Human Workplaces: Four Strategies to Drive Results in 2026",
        time: "11:00 AM - 11:55 AM ET",
        link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/building-human-workplaces-four-strategies-to-drive_mnf2n39p.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"
    },
    {
        title: "From Breakroom to Social Media: HR’s Roadmap to Protect Employee Well-being from Online Misconduct",
        time: "12:00 PM - 12:55 PM ET",
        link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/from-breakroom-to-social-media-hr%E2%80%99s-roadmap-to-pro_mmuyqs7f.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"
    }
];

let agendaItemsHtml = '';
sessions.forEach((s, i) => {
    const color = motifColors[i % motifColors.length];
    agendaItemsHtml += `
                            <!-- Item ${i + 1} -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                                <tr>
                                    <td valign="top" width="12" style="${i === 0 ? 'padding-right: 0; padding-top: 5px;' : 'padding-top: 5px;'}">
                                        <div
                                            style="width: 6px; height: 6px; border-radius: 50%; background-color: ${color}; font-size: 0; line-height: 0;">
                                            &nbsp;</div>
                                    </td>
                                    <td valign="top" style="padding-left: 12px;">
                                        <p style="margin: 0 0 2px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase; letter-spacing: 1px; line-height: 14px;"
                                            class="agenda-time-text">${s.time}</p>
                                        <a href="${s.link}"
                                            target="_blank"
                                            style="font-family: 'Manrope', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #1A73E8; text-decoration: none; line-height: 20px;"
                                            class="agenda-item-title">
                                            ${s.title}
                                        </a>
                                    </td>
                                </tr>
                            </table>`;
});

// Using a placeholder replacement for agenda block. 
const agendaRegex = /<!-- Agenda Items \(all 10, fully hyperlinked\) -->[\s\S]*?<!-- Register CTA below agenda -->/;
html = html.replace(agendaRegex, `<!-- Agenda Items -->\n${agendaItemsHtml}\n\n                            <!-- Register CTA below agenda -->`);

// Replace Sponsors section
const sponsors = [
    {
        name: "Reward Gateway",
        img: "https://public-cdn.hr.com/system/app/media/rs/2026/3/11/mmma11nd/120.jpg",
        link: "https://www.hr.com/en/app/account/reward_gateway?s=1490710f-913c-45f1-9b26-c2c25171c3d6"
    },
    {
        name: "Fama Technologies, Inc.",
        img: "https://public-cdn.hr.com/system/app/media/rs/2025/2/4/m6qirc6y/120.jpg",
        link: "https://www.hr.com/en/app/account/fama_technologies_inc?s=1490710f-913c-45f1-9b26-c2c25171c3d6"
    }
];

let sponsorsHtml = '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->\n';
sponsors.forEach((s, i) => {
    sponsorsHtml += `
                                <!-- Logo ${i + 1}: ${s.name} -->
                                <!--[if mso]><td width="50%" align="center" valign="top" style="padding: 10px 0;"><![endif]-->
                                <div class="sponsor-logo-cell"
                                    style="display: inline-block; width: 45%; vertical-align: top; text-align: center; padding: 10px 0;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"
                                        style="background-color: #ffffff; border-radius: 8px; margin: 0 auto; overflow: hidden; max-width: 140px;">
                                        <tr>
                                            <td align="center" valign="middle" height="85"
                                                style="height: 85px; padding: 10px; background-color: #ffffff;">
                                                <a href="${s.link}" target="_blank" style="text-decoration: none; display: block;">
                                                    <img src="${s.img}"
                                                        alt="${s.name.replace(/"/g, '&quot;')}" width="100"
                                                        style="width: 100%; max-width: 90px; height: auto; display: block; margin: 0 auto; border: 0;" />
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <!--[if mso]></td>${(i % 2 === 1) ? '</tr><tr>' : ''}<![endif]-->`;
});
sponsorsHtml += '\n                                <!--[if mso]></tr></table><![endif]-->';

const sponsorRegex = /<!-- Sponsor Grid[\s\S]*?<!--\[if mso\]><\/tr><\/table><!\[endif\]-->/i;
html = html.replace(sponsorRegex, `<!-- Sponsor Grid -->\n                            <div style="text-align: center; font-size: 0px; width: 100%;">\n                                ${sponsorsHtml}\n                            </div>`);

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

fs.writeFileSync(destPath, html);
console.log('Successfully wrote generated emailer to ' + destPath);
