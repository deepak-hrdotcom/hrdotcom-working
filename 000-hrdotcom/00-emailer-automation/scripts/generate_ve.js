const fs = require('fs');
let html = fs.readFileSync('e:\\HR\\00-html\\00-emailer-automation\\email-reference\\premium-templates\\upcoming-virtual-event-template.html', 'utf8');

// Title
html = html.replace(/<title>.*?<\/title>/s, "<title>HR.com's Future of Human Experience — April 8, 2026</title>");

// Preview text
html = html.replace(/<div[^>]*?>\s+10 live product demos[\s\S]*?<\/div>/s, '<div\n        style="display: none; font-size: 1px; color: #ECEEF0; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">\n        Explore actionable strategies and proven methods to build a more human-centered, resilient workplace.\n        &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;\n    </div>');

// Hero Date
html = html.replace(/Thursday,\s*April\s*23,\s*2026.*?(?=&nbsp;)/s, "Wednesday, April 8, 2026 ");

// Hero Title
html = html.replace(/<h1 class="hero-title"[^>]*>[\s\S]*?<\/h1>/s, "<h1 class=\"hero-title\"\n                                style=\"margin: 0 0 20px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 34px; font-weight: 900; color: #FFFFFF; line-height: 42px; text-align: center; letter-spacing: -0.5px;\">\n                                HR.com's Future of Human Experience\n                            </h1>");

// Sessions count
html = html.replace(/{{SESSIONS_COUNT}}/g, "5");

// Body paras
let p1 = "<p class=\"body-para\"\n                                style=\"margin: 0 0 16px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 400; color: #4A5568; text-align: left; line-height: 28px;\">\n                                Employee expectations are rising, and burnout remains a constant threat as your organization struggles to foster well-being and engagement. Your leadership urgently needs to understand the real workplace factors holding your people back before you lose top talent to disengagement.\n                            </p>";

let p2 = "<p class=\"body-para\"\n                                style=\"margin: 0 0 36px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 16px; font-weight: 500; color: #2A343E; text-align: left; line-height: 28px;\">\n                                Join this exclusive virtual event to dive into HR.com’s 7th Annual Future of Human Experience Study and discover what separates thriving organizations from those falling behind. Explore actionable strategies, live case studies, and proven methods to build a more human-centered, resilient workplace where your employees can truly flourish.\n                            </p>";

html = html.replace(/<!-- Pain Point Paragraph[\s\S]*?<!-- Primary CTA/gs, "<!-- Pain Point Paragraph -->\n                            " + p1 + "\n\n                            <!-- Solution Paragraph -->\n                            " + p2 + "\n\n                            <!-- Primary CTA");

// CTA Links
html = html.replace(/href="https:\/\/www\.hr\.com\/en\?t=\/CustomCode\/events\/registration&eventID=1766410350540"/g, 'href="https://www.hr.com"');

// Complete Event Agenda Date
html = html.replace(/Thursday,\s*April\s*23\s*&nbsp;·&nbsp;\s*All times Eastern/, "Wednesday, April 8 &nbsp;·&nbsp; All times Eastern");

// Build agenda items
const sessions = [
  {title: "What Employees Need Most to Thrive at Work", time: "10:00 AM - 10:55 AM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/what-employees-need-most-to-thrive-at-work_mmt9fp7a.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"},
  {title: "Optimize & Scale Recognition with Human Intelligence", time: "11:00 AM - 11:55 AM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/optimize-scale-recognition-with-human-intelligence_mmups0a8.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"},
  {title: "Are your people actually ready for what’s coming next – Building the Connected Company", time: "12:00 PM - 12:55 PM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/are-your-people-actually-ready-for-what%E2%80%99s-coming-n_mn4w79d4.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"},
  {title: "Bridging the Deskless Divide: Practical Recognition Strategies That Drive Retention", time: "1:00 PM - 1:55 PM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/bridging-the-deskless-divide-practical-recognition_mls6bvrg.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"},
  {title: "From Quiet Quitting to Loud Retention: How HR Teams Fix the Experience Gap", time: "2:00 PM - 2:55 PM ET", link: "https://www.hr.com/en/webcasts_events/webcasts/upcoming_webcasts/from-quiet-quitting-to-loud-retention-how-hr-teams_mmce3ch1.html?s=1490710f-913c-45f1-9b26-c2c25171c3d6"}
];

const colors = ["#EF4A3D", "#FDB414", "#94C83D", "#4AC4D6", "#EF4A3D"];
let agendaHtml = "";
for (let i = 0; i < sessions.length; i++) {
  let s = sessions[i];
  let c = colors[i];
  agendaHtml += "                            <!-- Item " + (i+1) + " -->\n" +
                "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"margin-bottom: 16px;\">\n" +
                "                                <tr>\n" +
                "                                    <td valign=\"top\" width=\"12\" style=\"padding-top: 5px;\">\n" +
                "                                        <div\n" +
                "                                            style=\"width: 6px; height: 6px; border-radius: 50%; background-color: " + c + "; font-size: 0; line-height: 0;\">\n" +
                "                                            &nbsp;</div>\n" +
                "                                    </td>\n" +
                "                                    <td valign=\"top\" style=\"padding-left: 12px;\">\n" +
                "                                        <p style=\"margin: 0 0 2px 0; font-family: 'Manrope', Arial, sans-serif; font-size: 10px; font-weight: 700; color: " + c + "; text-transform: uppercase; letter-spacing: 1px; line-height: 14px;\"\n" +
                "                                            class=\"agenda-time-text\">" + s.time + "</p>\n" +
                "                                        <a href=\"" + s.link + "\"\n" +
                "                                            target=\"_blank\"\n" +
                "                                            style=\"font-family: 'Manrope', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #1A73E8; text-decoration: none; line-height: 20px;\"\n" +
                "                                            class=\"agenda-item-title\">\n" +
                "                                            " + s.title + "\n" +
                "                                        </a>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                            </table>\n";
}

html = html.replace(/<!-- Agenda Items \(all 10, fully hyperlinked\) -->[\s\S]*?<!-- Register CTA below agenda -->/is, '<!-- Agenda Items -->\n' + agendaHtml + '\n                            <!-- Register CTA below agenda -->');

// Build sponsors
const sponsors = [
  {name: 'SAP SuccessFactors', img: 'https://public-cdn.hr.com/system/app/media/rs/2026/2/11/mlicv0tp/120.jpg', link: 'https://www.hr.com/en/app/account/sap?s=1490710f-913c-45f1-9b26-c2c25171c3d6'},
  {name: 'Awardco', img: 'https://public-cdn.hr.com/system/app/media/rs/2025/5/15/mapi3di4/120.jpg', link: 'https://www.hr.com/en/app/account/awardco?s=1490710f-913c-45f1-9b26-c2c25171c3d6'},
  {name: 'Sogolytics', img: 'https://public-cdn.hr.com/system/app/media/rs/2026/2/26/mm3orocc/120.jpg', link: 'https://www.hr.com/en/app/account/sogolytics?s=1490710f-913c-45f1-9b26-c2c25171c3d6'}
];

let sponsorsHtml = '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->\n';
for (let i = 0; i < sponsors.length; i++) {
  let sp = sponsors[i];
  sponsorsHtml += '\n' +
                  '                                <!-- Logo ' + (i+1) + ': ' + sp.name + ' -->\n' +
                  '                                <!--[if mso]><td width="33%" align="center" valign="top" style="padding: 10px 0;"><![endif]-->\n' +
                  '                                <div class="sponsor-logo-cell"\n' +
                  '                                    style="display: inline-block; width: 33%; vertical-align: top; text-align: center; padding: 10px 0;">\n' +
                  '                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="90%"\n' +
                  '                                        style="background-color: #ffffff; border-radius: 8px; margin: 0 auto; overflow: hidden; max-width: 140px;">\n' +
                  '                                        <tr>\n' +
                  '                                            <td align="center" valign="middle" height="85"\n' +
                  '                                                style="height: 85px; padding: 10px; background-color: #ffffff;">\n' +
                  '                                                <a href="' + sp.link + '" target="_blank">\n' +
                  '                                                <img src="' + sp.img + '"\n' +
                  '                                                    alt="' + sp.name + '" width="100"\n' +
                  '                                                    style="width: 100%; max-width: 90px; height: auto; display: block; margin: 0 auto; border: 0;" />\n' +
                  '                                                </a>\n' +
                  '                                            </td>\n' +
                  '                                        </tr>\n' +
                  '                                    </table>\n' +
                  '                                </div>\n' +
                  (i === 2 ? '                                <!--[if mso]></td></tr><tr><![endif]-->' : '                                <!--[if mso]></td><![endif]-->');
}
sponsorsHtml += '\n                                <!--[if mso]></tr></table><![endif]-->';

html = html.replace(/<!-- Sponsor Grid.*?<div style="text-align: center; font-size: 0px; width: 100%;">[\s\S]*?<!-- CREDIT INFORMATION — SHRM/is, '<!-- Sponsor Grid -->\n                            <div style="text-align: center; font-size: 0px; width: 100%;">\n' + sponsorsHtml + '\n                            </div>\n                        </td>\n                    </tr>\n\n                    <!-- ============================================================ -->\n                    <!-- CREDIT INFORMATION — SHRM');

fs.writeFileSync('e:\\HR\\00-html\\00-emailer-automation\\virtual-events\\2026-04-08-future-of-human-experience\\2026-04-08-future-of-human-experience.html', html);

console.log("Done");
