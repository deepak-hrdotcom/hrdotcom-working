const fs = require('fs');
const path = require('path');

const templatePath = 'e:\\HR\\00-html\\00-emailer-automation\\email-reference\\premium-templates\\virtual-event.html';
let html = fs.readFileSync(templatePath, 'utf8');

const data = {
    title: "Orchestrating HR Workflows: From Reactive Administration to Outcomes-Driven Execution",
    date: "May 14, 2026 at 1:00 PM - 1:55 PM ET",
    storyId: "1776097042915",
    secondaryCta: "https://web.hr.com/hjec",
    veName: "HR.com's State of Today's HR Tech and Integrations",
    veCta: "https://web.hr.com/jrwpk",
    sponsorLogo: "https://public-cdn.hr.com/system/app/media/rs/2025/4/3/m91q2elv/120.jpg",
    sponsorAlt: "Rival",
    subject: "Stop the manual workflow chaos. Join us May 14",
    preheader: "Orchestrate your HR tech stack with Talent Operations and AI for real efficiency gains.",
    intro: "Stop fighting fragmented data and manual workflows. Learn how Talent Operations and AI orchestrate your HR tech stack to move from reactive admin to high-impact, outcomes-driven execution.",
    bullets: [
        "Adopt Talent Operations for strategic workflow orchestration",
        "Apply AI strategically to democratize and accelerate HR processes",
        "Move beyond integrations to measurable business impact",
        "Free your team for higher-value strategic talent decisions"
    ],
    speakers: [
        {
            name: "Poornima Farrar",
            role: "Chief Product Officer - Rival",
            img: "https://public-cdn.hr.com/profile_images/2024/10/15/1728998268685_120"
        },
        {
            name: "Adrian Raedeke",
            role: "Product Manager, Integrations and APIs - Rival",
            img: "https://public-cdn.hr.com/profile_images/2026/4/13/1776096503881_120"
        }
    ]
};

// Replace Title tag
html = html.replace(/<title>.*?<\/title>/, '<title>' + data.title + ' | HR.com Webcast</title>');

// Replace Subject Comment
html = html.replace(/<!-- SUBJECT: \[REPLACE WITH GENERATED SUBJECT LINE\] -->/, '<!-- SUBJECT: ' + data.subject + ' -->');

// Replace Preheader Text
html = html.replace(/\[REPLACE WITH GENERATED PREHEADER TEXT\]/, data.preheader);

// Replace Sponsor Logo in Header Bar
html = html.replace(/<td align="left" valign="middle" style="padding:0;">[\s\S]*?<img src=".*?"[\s\S]*?alt=".*?"[\s\S]*?\/>/, 
    '<td align="left" valign="middle" style="padding:0;">\n                                        <img src="' + data.sponsorLogo + '"\n                                            alt="' + data.sponsorAlt + '"\n                                            style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />');

// Update Hero Gradient and fallback
html = html.replace(/background: linear-gradient\(160deg, #02588E 0%, #2A343E 100%\); background-color: #02588E;/g, 
    'background: linear-gradient(160deg, #C01060 0%, #D44030 100%); background-color: #C01060;');

// Update Hero Title
html = html.replace(/<h1 class="hero-title"[\s\S]*?>[\s\S]*?<\/h1>/, 
    '<h1 class="hero-title"\n                                style="margin:0 0 8px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">\n                                ' + data.title + '\n                            </h1>');

// Update Hero Date Meta
html = html.replace(/<p class="hero-meta"[\s\S]*?>[\s\S]*?<\/p>/, 
    '<p class="hero-meta"\n                                style="margin:0 0 24px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;">\n                                ' + data.date + ' &nbsp;·&nbsp; Free to Attend\n                            </p>');

// Update Hero CTA Button Color and Link
html = html.replace(/color:#02588E;/, 'color:#C01060;');
html = html.replace(/__STORY_ID__/g, data.storyId);

// Update Intro Paragraph
html = html.replace(/<p class="body-copy-p"[\s\S]*?style="margin:0 0 0 0;[\s\S]*?>[\s\S]*?<\/p>/, 
    '<p class="body-copy-p"\n                                style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">\n                                ' + data.intro + '\n                            </p>');

// Update Bullets
const badgeColors = ['#EF4A3D', '#4AC4D6', '#94C83D', '#FDB414'];
const badgeTextColors = ['#FFFFFF', '#0D1F28', '#1A2A00', '#1A1000'];

let bulletSection = '';
data.bullets.forEach((bullet, index) => {
    const num = (index + 1).toString().padStart(2, '0');
    const color = badgeColors[index];
    const textColor = badgeTextColors[index];
    const marginBottom = index === data.bullets.length - 1 ? '0' : '14px';
    
    bulletSection += [
        '                            <!-- Takeaway ' + num + ' -->',
        '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:' + marginBottom + ';">',
        '                                <tr>',
        '                                    <td width="36" valign="middle" align="center"',
        '                                        style="vertical-align:middle;padding:0;width:36px;">',
        '                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">',
        '                                            <tr>',
        '                                                <td align="center" valign="middle"',
        '                                                    style="background-color:' + color + ';border-radius:6px;width:26px;height:26px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:' + textColor + ';line-height:26px;text-align:center;mso-line-height-rule:exactly;vertical-align:middle;">',
        '                                                    ' + num,
        '                                                </td>',
        '                                            </tr>',
        '                                        </table>',
        '                                    </td>',
        '                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">',
        '                                        <span class="takeaway-title"',
        '                                            style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">' + bullet + '</span>',
        '                                    </td>',
        '                                </tr>',
        '                            </table>',
        ''
    ].join('\n');
});

// Replace all bullets
const bulletsRegex = /<!-- Takeaway 01 -->[\s\S]*?<!-- Mid-content ghost pill CTA/;
html = html.replace(bulletsRegex, bulletSection + '\n                            <!-- Mid-content ghost pill CTA');

// Update Secondary CTA in bullets section to be a text link as per SKILL.md
const secondaryCtaHtml = [
    '                            <!-- Mid-content text link CTA — secondary weight as per SKILL.md -->',
    '                            <div style="margin:24px auto 0 auto; text-align:center;">',
    '                                <a href="' + data.secondaryCta + '" data-cta="1" data-captcha="1" target="_blank"',
    '                                    style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#C01060;text-decoration:none;display:inline-block;">',
    '                                    Ready to join? Register for free &rarr;',
    '                                </a>',
    '                            </div>'
].join('\n');

const ctaRegex = /<!-- Mid-content ghost pill CTA[\s\S]*?<\/table>/;
html = html.replace(ctaRegex, secondaryCtaHtml);

// Update Registration Reminder Link Color
html = html.replace(/__SECONDARY_CTA__/g, data.secondaryCta);
html = html.replace(/color:#02588E;text-decoration:underline;/, 'color:#C01060;text-decoration:underline;');

// Update Speaker Section Heading
html = html.replace(/Your expert hosts/, 'Your expert hosts'); // No change needed but good for logic

// Update Speakers
let speakerSection = '                            <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->\n\n';
data.speakers.forEach((speaker, index) => {
    speakerSection += [
        '                            <!-- Presenter ' + (index + 1) + ' -->',
        '                            <!--[if mso]><td width="260" valign="top" style="padding:10px 8px;"><![endif]-->',
        '                            <table class="speaker-card-div" role="presentation" border="0" cellpadding="0"',
        '                                cellspacing="0"',
        '                                style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px;">',
        '                                <tr>',
        '                                    <td style="padding:0;">',
        '                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"',
        '                                            style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"',
        '                                            class="speaker-card-inner">',
        '                                            <tr>',
        '                                                <td align="center" style="padding:24px 16px;">',
        '                                                    <img alt="' + speaker.name + '"',
        '                                                        src="' + speaker.img + '"',
        '                                                        width="90" height="90"',
        '                                                        style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />',
        '                                                    <span class="speaker-name"',
        '                                                        style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">',
        '                                                        ' + speaker.name,
        '                                                    </span>',
        '                                                    <span class="speaker-role"',
        '                                                        style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#C01060;line-height:19px;margin-top:4px;">',
        '                                                        ' + speaker.role,
        '                                                    </span>',
        '                                                </td>',
        '                                            </tr>',
        '                                        </table>',
        '                                    </td>',
        '                                </tr>',
        '                            </table>',
        '                            <!--[if mso]></td><![endif]-->',
        ''
    ].join('\n');
});
speakerSection += '\n                            <!--[if mso]></tr></table><![endif]-->';

const speakersRegex = /<!--\[if mso\]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><!\[endif\]-->[\s\S]*?<!--\[if mso\]><\/tr><\/table><!\[endif\]-->/;
html = html.replace(speakersRegex, speakerSection);

// Update Virtual Event Callout
html = html.replace(/__VE_NAME__/g, data.veName);
html = html.replace(/__VE_CTA__/g, data.veCta);

// Update Registration Reminder Link Color
html = html.replace(/color:#02588E;text-decoration:underline;/, 'color:#C01060;text-decoration:underline;');

// Save output
const outputFolder = 'e:\\HR\\00-html\\00-emailer-automation\\webcasts\\virtual-event-2026-05-14-orchestrating-hr-workflows';
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}
const outputPath = path.join(outputFolder, 'virtual-event-2026-05-14-orchestrating-hr-workflows.html');
fs.writeFileSync(outputPath, html);
console.log('File created at: ' + outputPath);
