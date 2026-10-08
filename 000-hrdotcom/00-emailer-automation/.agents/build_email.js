const fs = require('fs');
const path = require('path');

const masterTemplatePath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/upcoming-virtual-event-template.html';
const outDir = 'e:/HR/00-html/00-emailer-automation/virtual-events/2026-04-08-future-of-human-experience';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

let template = fs.readFileSync(masterTemplatePath, 'utf8');

// Title & Preview Text
template = template.replace(/<title>.*?<\/title>/s, `<title>HR.com's Future of Human Experience | Virtual Event</title>`);
template = template.replace(/<div[^>]*>\s*10 live product demos.*?<\/div>/s, `<div style="display: none; font-size: 1px; color: #ECEEF0; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Learn how to build a human-centered workplace with exclusive insights from our 7th Annual Future of Human Experience Study.
    &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
</div>`);

// Utility Bar Link
template = template.replace(/<a href="[^"]* registration[^"]*"[^>]*>\s*Register Free →\s*<\/a>/i, `<a href="https://www.hr.com" target="_blank" style="color: #4AC4D6; text-decoration: none; font-weight: 700;">Register Free →</a>`);

// Title
template = template.replace(/<h1 class="hero-title"[^>]*>[\s\S]*?<\/h1>/, `<h1 class="hero-title" style="margin: 0 0 16px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 34px; font-weight: 900; color: #FFFFFF; line-height: 42px; text-align: center; letter-spacing: -0.5px;">HR.com's Future of Human Experience</h1>`);
// Remove Subtitle
template = template.replace(/<p class="hero-subtitle"[^>]*>[\s\S]*?<\/p>/, '');

// Date
template = template.replace(/<span class="hero-meta"[^>]*>[\s\S]*?<\/span>/, `<span class="hero-meta" style="font-family: 'Manrope', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #FFFFFF; text-align: center; line-height: 22px;">Wednesday, April 8, 2026 &nbsp;·&nbsp; 10:00 AM – 3:00 PM ET &nbsp;·&nbsp; Free to Attend</span>`);

// Stats block (update from 10 live sessions to 5)
template = template.replace(/10 Live Sessions/g, '5 Expert Sessions');

// Replace Body Copy
const p1 = `Your team is working harder than ever, yet burnout remains high, engagement is slipping, and budget constraints make it difficult to move the needle. When you're constantly fighting fires and struggling to secure leadership buy-in, transforming the day-to-day employee experience can feel impossible.`;
const p2 = `Join us to unpack the findings from HR.com’s 7th Annual Future of Human Experience Study in five exclusive, expert-led sessions. You’ll discover what separates thriving organizations from the rest—and learn practical strategies for leveraging AI and flexible work models to build a truly human-centered culture.`;

template = template.replace(/<p class="body-para"[^>]*>.*?Your hiring team is stretched thin.*?<\/p>/s, `<p class="body-para" style="margin: 0 0 16px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 400; color: #4A5568; text-align: center; line-height: 28px; max-width: 480px; margin-left: auto; margin-right: auto;">
    ${p1}
</p>`);
template = template.replace(/<p class="body-para"[^>]*>.*?Join <strong.*?<\/p>/s, `<p class="body-para" style="margin: 0 0 36px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 500; color: #2A343E; text-align: center; line-height: 28px; max-width: 480px; margin-left: auto; margin-right: auto;">
    ${p2}
</p>`);

// Links
template = template.replace(/href="[^"]*registration[^"]*"/g, `href="https://www.hr.com"`);


// AGENDA SECTION
const agendaItems = [
    { title: "What Employees Need Most to Thrive at Work", time: "10:00 AM - 10:55 AM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/what-employees-need-most-to-thrive-at-work_mmt9fp7a.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6" },
    { title: "Optimize & Scale Recognition with Human Intelligence", time: "11:00 AM - 11:55 AM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/optimize-scale-recognition-with-human-intelligence_mmups0a8.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6" },
    { title: "Are your people actually ready for what’s coming next – Building the Connected Company", time: "12:00 PM - 12:55 PM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/are-your-people-actually-ready-for-what%E2%80%99s-coming-n_mn4w79d4.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6" },
    { title: "Bridging the Deskless Divide: Practical Recognition Strategies That Drive Retention", time: "1:00 PM - 1:55 PM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/bridging-the-deskless-divide-practical-recognition_mls6bvrg.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6" },
    { title: "From Quiet Quitting to Loud Retention: How HR Teams Fix the Experience Gap", time: "2:00 PM - 2:55 PM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/from-quiet-quitting-to-loud-retention-how-hr-teams_mmce3ch1.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6" }
];

const colors = ["#EF4A3D", "#FDB414", "#94C83D", "#4AC4D6"];
let newAgendaHtml = '';

agendaItems.forEach((item, index) => {
    const color = colors[index % colors.length];
    newAgendaHtml += `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="${index === agendaItems.length - 1 ? '' : 'margin-bottom: 16px;'}">
    <tr>
        <td valign="top" width="12" style="padding-top: 5px;">
            <div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${color}; font-size: 0; line-height: 0;">&nbsp;</div>
        </td>
        <td valign="top" style="padding-left: 12px;">
            <p style="margin: 0 0 2px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase; letter-spacing: 1px; line-height: 14px;" class="agenda-time-text">${item.time}</p>
            <a href="${item.link}" target="_blank" style="font-family: 'Manrope', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #1A73E8; text-decoration: none; line-height: 20px;" class="agenda-item-title">${item.title}</a>
        </td>
    </tr>
</table>`;
});

// the agenda items block looks like it starts with '<!-- Agenda Items (all 10, fully hyperlinked) -->'
// and ends right before '<!-- Register CTA below agenda -->'
template = template.replace(/(<!-- Agenda Items .*?-->)[\s\S]*?(<!-- Register CTA below agenda -->)/, `$1\n${newAgendaHtml}\n$2`);

// Replace date inside Complete Event Agenda
template = template.replace(/<p[^>]*>\s*Thursday, April 23 &nbsp;·&nbsp; All times Eastern\s*<\/p>/, `<p style="margin: 4px 0 0 0; font-family: 'Manrope', Arial, sans-serif; font-size: 12px; font-weight: 500; color: #718096; line-height: 18px;">Wednesday, April 8 &nbsp;·&nbsp; All times Eastern</p>`);

// SPONSORS SECTION
const sponsors = [
    { name: "SAP SuccessFactors", img: "https://public-cdn.hr.com/system/app/media/rs/2026/2/11/mlicv0tp/120.jpg", link: "https://www.hr.com/en/app/account/sap?s=1490710f-913c-45f1-9b26-c2c25171c3d6" },
    { name: "Awardco", img: "https://public-cdn.hr.com/system/app/media/rs/2025/5/15/mapi3di4/120.jpg", link: "https://www.hr.com/en/app/account/awardco?s=1490710f-913c-45f1-9b26-c2c25171c3d6" },
    { name: "Sogolytics", img: "https://public-cdn.hr.com/system/app/media/rs/2026/2/26/mm3orocc/120.jpg", link: "https://www.hr.com/en/app/account/sogolytics?s=1490710f-913c-45f1-9b26-c2c25171c3d6" }
];

let sponsorsHtml = `<div style="text-align: center; font-size: 0px; width: 100%;">
<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->`;

sponsors.forEach((sponsor) => {
    sponsorsHtml += `
    <!-- Sponsor Logo -->
    <!--[if mso]><td width="33%" align="center" valign="top" style="padding: 10px 0;"><![endif]-->
    <div class="sponsor-logo-cell" style="display: inline-block; width: 33%; vertical-align: top; text-align: center; padding: 10px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%" style="background-color: #ffffff; border-radius: 8px; margin: 0 auto; overflow: hidden; max-width: 140px;">
            <tr>
                <td align="center" valign="middle" height="85" style="height: 85px; padding: 10px; background-color: #ffffff;">
                    <a href="${sponsor.link}" target="_blank" style="text-decoration: none;">
                        <img src="${sponsor.img}" alt="${sponsor.name}" width="100" style="width: 100%; max-width: 90px; height: auto; display: block; margin: 0 auto; border: 0;" />
                    </a>
                </td>
            </tr>
        </table>
    </div>
    <!--[if mso]></td><![endif]-->`;
});

sponsorsHtml += `\n<!--[if mso]></tr></table><![endif]-->\n</div>`;

// Actually the sponsors block in the template goes from `<!-- Sponsor Grid: 4 per row Desktop, 2 per row Mobile -->`
// down to the `</td>` of that section. We need to be careful.
template = template.replace(/(<!-- Sponsor Grid:[^\n]*-->)[\s\S]*?(<!-- ==+ -->\s*<!-- LEAD MAGNET)/, `$1\n${sponsorsHtml}\n</td>\n</tr>\n$2`);

fs.writeFileSync(path.join(outDir, 'emailer.html'), template);
console.log('Done!');
