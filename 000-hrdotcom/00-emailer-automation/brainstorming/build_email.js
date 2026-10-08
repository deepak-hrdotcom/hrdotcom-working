const fs = require('fs');
const path = require('path');

const srcPath = 'e:/HR/00-html/00-emailer-automation/email-reference/premium-templates/standalone.html';
const destDir = 'e:/HR/00-html/00-emailer-automation/webcasts/standalone-2026-07-08-control-costs';
const destPath = path.join(destDir, 'standalone-2026-07-08-control-costs.html');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

let html = fs.readFileSync(srcPath, 'utf8');

// Title & Meta
html = html.replace('<title>The AI Hiring Gap: Why Top Candidates Fail—and How to Fix It | HR.com Webcast</title>', '<title>Control Costs, Manage Pharmacy and Strengthen Your Strategy | HR.com Webcast</title>');

// Subject & Preheader
html = html.replace('[REPLACE WITH GENERATED SUBJECT LINE]', 'Pharmacy costs draining your budget? Here\'s how to fight back. [Jul 8]');
html = html.replace('[REPLACE WITH GENERATED PREHEADER TEXT]', 'Learn how to spot cost drivers early, manage high-cost claimants, and align your vendor strategy.');

// Sponsor Logo
const sponsorImgRegex = /<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/3\/24\/m8mwxyed\/120\.jpg"[\s\S]*?alt="TestGorilla"[\s\S]*?style="[^"]*" \/>/;
const newSponsorImg = '<img src="https://public-cdn.hr.com/system/app/media/rs/2020/3/4/k7dhbena/120.jpg" alt="Gallagher" style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />';
html = html.replace(sponsorImgRegex, newSponsorImg);

// Hero Title
html = html.replace(/<h1 class="hero-title"[^>]*>[\s\S]*?<\/h1>/, '<h1 class="hero-title" style="margin:0 0 8px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">Control Costs, Manage Pharmacy and Strengthen Your Strategy</h1>');

// Hero Meta
html = html.replace(/<p class="hero-meta"[^>]*>[\s\S]*?<\/p>/, '<p class="hero-meta" style="margin:0 0 24px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;">July 8, 2026 at 1:00 PM - 2:00 PM ET &nbsp;·&nbsp; Free to Attend</p>');

// Primary CTA
html = html.replace(/__STORY_ID__/g, '1778251848715');

// Intro Copy
const introText = "Pharmacy inflation and unpredictable renewals are pressuring your budget. Join our experts to decode the PBM dynamics shaping 2026 and discover actionable strategies to contain costs without diminishing the employee experience.";
html = html.replace(/<p class="body-copy-p"[\s\S]*?margin:0 0 0 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">[\s\S]*?<\/p>/, '<p class="body-copy-p" style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">' + introText + '</p>');

// Takeaways
html = html.replace(/<span class="takeaway-title"[^>]*>What\s+AI fluency actually looks like in a candidate<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">How to use data to spot cost drivers early</span>');
html = html.replace(/<span class="takeaway-title"[^>]*>Why\s+traditional signals like CVs fail for AI roles<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Pharmacy trends reshaping your 2026 budget</span>');
html = html.replace(/<span class="takeaway-title"[^>]*>Real\s+insights from companies hiring for AI today<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Why stop-loss volatility increases employer exposure</span>');
html = html.replace(/<span class="takeaway-title"[^>]*>How\s+to evolve your hiring processes to verify execution<\/span>/, '<span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Cost-saving strategies that protect the employee experience</span>');

// Secondary CTA
html = html.replace(/__SECONDARY_CTA__/g, 'https://web.hr.com/pqdt');

// Presenters Section - we need to replace the two speaker blocks with three
const speakersHeader = '<h2 class="section-heading" style="margin:0 0 28px 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#2A343E;text-align:center;line-height:27px;">Learn directly from industry leaders</h2>';

const presenter1 = `
<!--[if mso]><td width="190" valign="top" style="padding:10px 4px;"><![endif]-->
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:190px;min-width: 190px;margin:8px 4px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:190px;min-width:190px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);" class="speaker-card-inner">
                <tr>
                    <td align="center" style="padding:24px 12px;">
                        <img alt="Christine Hale" src="" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                        <span class="speaker-name" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:800;color:#2A343E;line-height:20px;">Christine Hale</span>
                        <span class="speaker-role" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:#02588E;line-height:16px;margin-top:4px;">Chief Medical Officer, US Benefits - Gallagher</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!--[if mso]></td><![endif]-->
`;

const presenter2 = `
<!--[if mso]><td width="190" valign="top" style="padding:10px 4px;"><![endif]-->
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:190px;min-width: 190px;margin:8px 4px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:190px;min-width:190px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);" class="speaker-card-inner">
                <tr>
                    <td align="center" style="padding:24px 12px;">
                        <img alt="Lauren Cheek" src="" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                        <span class="speaker-name" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:800;color:#2A343E;line-height:20px;">Lauren Cheek</span>
                        <span class="speaker-role" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:#02588E;line-height:16px;margin-top:4px;">Area President, Southern California - Gallagher</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!--[if mso]></td><![endif]-->
`;

const presenter3 = `
<!--[if mso]><td width="190" valign="top" style="padding:10px 4px;"><![endif]-->
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:190px;min-width: 190px;margin:8px 4px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:190px;min-width:190px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);" class="speaker-card-inner">
                <tr>
                    <td align="center" style="padding:24px 12px;">
                        <img alt="Corey Tracy" src="" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                        <span class="speaker-name" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:800;color:#2A343E;line-height:20px;">Corey Tracy</span>
                        <span class="speaker-role" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:#02588E;line-height:16px;margin-top:4px;">Area Vice President, Pharmacy - Gallagher</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!--[if mso]></td><![endif]-->
`;

const oldPresentersRegex = /<!--\s*Presenter 1\s*-->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->[\s\S]*?<!--\s*Presenter 2\s*-->[\s\S]*?<!--\[if mso\]><\/td><!\[endif\]-->/g;

html = html.replace(oldPresentersRegex, presenter1 + '\n' + presenter2 + '\n' + presenter3);

// Replace speakers header text to "Your expert hosts" / "Learn directly from industry leaders" (it's already multiple so we can leave it, wait we should ensure it has "hosts" and "leaders")
// Both are already plural in template: "Your expert hosts", "Learn directly from industry leaders"

fs.writeFileSync(destPath, html);
console.log('Written to ' + destPath);
