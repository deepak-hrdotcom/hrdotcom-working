const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'ondemand-2026-05-13-avoiding-the-cost-of-noncompliance.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Subject and Preheader
html = html.replace(/<!-- SUBJECT: .*? -->/, '<!-- SUBJECT: HR risk is hiding in plain sight. Are you protected? -->');
html = html.replace(/<div style="display:none;font-size:1px;color:#ECEEF0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;font-family:Arial,sans-serif;">.*?&#847;&zwnj;&nbsp;<\/div>/, '<div style="display:none;font-size:1px;color:#ECEEF0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;font-family:Arial,sans-serif;">Learn how to spot compliance gaps before they escalate into lawsuits. Watch on-demand.&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>');

// 3. Sponsor Logo
html = html.replace(
    /<img src="https:\/\/public-cdn\.hr\.com\/system\/app\/media\/rs\/2025\/8\/7\/me1wchxs\/120\.jpg"[\s\S]*?alt="Eightfold AI"[\s\S]*?style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" \/>/,
    '<img src="https://public-cdn.hr.com/system/app/media/rs/2024/1/31/ls2e7r0u/120.jpg"\n                                            alt="Insperity"\n                                            style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />'
);

// 4. Hero Title
html = html.replace(
    /No more black boxes: The new mandate for explainable AI in HR/,
    'Avoiding the cost of noncompliance: How to protect your business from HR risk'
);

// 5. CTAs
html = html.replace(/__ONDEMAND_CTA__/g, 'https://web.hr.com/9983q');

// 6. Intro Copy
html = html.replace(
    /<p class="body-copy-p" style="margin:0 0 0 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">[\s\S]*?<\/p>/,
    '<p class="body-copy-p" style="margin:0 0 0 0;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#4A5568;text-align:left;line-height:28px;">\n                                HR missteps can be costly, but many don\'t realize how quickly small compliance gaps escalate. Watch this on-demand session to learn how to identify risks, build fair documentation practices, and minimize legal exposure.\n                            </p>'
);

// 7. Takeaways
let takeawaysHtml = [
    '<!-- Takeaway 01 -->',
    '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;">',
    '                                <tr>',
    '                                    <td width="36" valign="middle" align="center" style="vertical-align:middle;padding:0;width:36px;">',
    '                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">',
    '                                            <tr>',
    '                                                <td align="center" valign="middle"',
    '                                                    style="background-color:#EF4A3D;border-radius:6px;width:26px;height:26px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#FFFFFF;line-height:26px;text-align:center;mso-line-height-rule:exactly;vertical-align:middle;">',
    '                                                    01',
    '                                                </td>',
    '                                            </tr>',
    '                                        </table>',
    '                                    </td>',
    '                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">',
    '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Identify hidden HR compliance risks and spot early warning signs</span>',
    '                                    </td>',
    '                                </tr>',
    '                            </table>',
    '',
    '                            <!-- Takeaway 02 -->',
    '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;">',
    '                                <tr>',
    '                                    <td width="36" valign="middle" align="center" style="vertical-align:middle;padding:0;width:36px;">',
    '                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">',
    '                                            <tr>',
    '                                                <td align="center" valign="middle"',
    '                                                    style="background-color:#4AC4D6;border-radius:6px;width:26px;height:26px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#0D1F28;line-height:26px;text-align:center;mso-line-height-rule:exactly;vertical-align:middle;">',
    '                                                    02',
    '                                                </td>',
    '                                            </tr>',
    '                                        </table>',
    '                                    </td>',
    '                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">',
    '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Build documentation practices to protect your business and demonstrate fairness</span>',
    '                                    </td>',
    '                                </tr>',
    '                            </table>',
    '',
    '                            <!-- Takeaway 03 -->',
    '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;">',
    '                                <tr>',
    '                                    <td width="36" valign="middle" align="center" style="vertical-align:middle;padding:0;width:36px;">',
    '                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">',
    '                                            <tr>',
    '                                                <td align="center" valign="middle"',
    '                                                    style="background-color:#94C83D;border-radius:6px;width:26px;height:26px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#1A2A00;line-height:26px;text-align:center;mso-line-height-rule:exactly;vertical-align:middle;">',
    '                                                    03',
    '                                                </td>',
    '                                            </tr>',
    '                                        </table>',
    '                                    </td>',
    '                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">',
    '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Handle discipline and terminations correctly to minimize legal exposure</span>',
    '                                    </td>',
    '                                </tr>',
    '                            </table>',
    '',
    '                            <!-- Takeaway 04 -->',
    '                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:0;">',
    '                                <tr>',
    '                                    <td width="36" valign="middle" align="center" style="vertical-align:middle;padding:0;width:36px;">',
    '                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">',
    '                                            <tr>',
    '                                                <td align="center" valign="middle"',
    '                                                    style="background-color:#FDB414;border-radius:6px;width:26px;height:26px;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#1A1000;line-height:26px;text-align:center;mso-line-height-rule:exactly;vertical-align:middle;">',
    '                                                    04',
    '                                                </td>',
    '                                            </tr>',
    '                                        </table>',
    '                                    </td>',
    '                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">',
    '                                        <span class="takeaway-title" style="font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">Respond effectively when a complaint or legal claim is filed</span>',
    '                                    </td>',
    '                                </tr>',
    '                            </table>'
].join('\n');

html = html.replace(/<!-- Takeaway 01 -->[\s\S]*?<!-- Takeaway 04 -->[\s\S]*?<\/table>/, takeawaysHtml);


// 8. Speakers
let speakersHtml = [
    '<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->',
    '<!--[if mso]><td width="195" valign="top" style="padding:10px 8px;"><![endif]-->',
    '<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0"',
    '    style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:195px;min-width: 195px;margin:8px;">',
    '    <tr>',
    '        <td style="padding:0;">',
    '            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"',
    '                style="max-width:195px;min-width:195px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"',
    '                class="speaker-card-inner">',
    '                <tr>',
    '                    <td align="center" style="padding:24px 16px;">',
    '                        <img alt="Angela Smart" src="" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />',
    '                        <span class="speaker-name"',
    '                            style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">',
    '                            Angela Smart',
    '                        </span>',
    '                        <span class="speaker-role"',
    '                            style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">',
    '                            Senior Human Resources Advisor - Insperity',
    '                        </span>',
    '                    </td>',
    '                </tr>',
    '            </table>',
    '        </td>',
    '    </tr>',
    '</table>',
    '<!--[if mso]></td><![endif]-->',
    '<!--[if mso]><td width="195" valign="top" style="padding:10px 8px;"><![endif]-->',
    '<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0"',
    '    style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:195px;min-width: 195px;margin:8px;">',
    '    <tr>',
    '        <td style="padding:0;">',
    '            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"',
    '                style="max-width:195px;min-width:195px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"',
    '                class="speaker-card-inner">',
    '                <tr>',
    '                    <td align="center" style="padding:24px 16px;">',
    '                        <img alt="Fernanda Anzek" src="" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />',
    '                        <span class="speaker-name"',
    '                            style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">',
    '                            Fernanda Anzek',
    '                        </span>',
    '                        <span class="speaker-role"',
    '                            style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">',
    '                            Managing Director HR Service Operations - Insperity',
    '                        </span>',
    '                    </td>',
    '                </tr>',
    '            </table>',
    '        </td>',
    '    </tr>',
    '</table>',
    '<!--[if mso]></td><![endif]-->',
    '<!--[if mso]><td width="195" valign="top" style="padding:10px 8px;"><![endif]-->',
    '<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0"',
    '    style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:195px;min-width: 195px;margin:8px;">',
    '    <tr>',
    '        <td style="padding:0;">',
    '            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"',
    '                style="max-width:195px;min-width:195px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);"',
    '                class="speaker-card-inner">',
    '                <tr>',
    '                    <td align="center" style="padding:24px 16px;">',
    '                        <img alt="Lori Sweeny" src="" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />',
    '                        <span class="speaker-name"',
    '                            style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">',
    '                            Lori Sweeny',
    '                        </span>',
    '                        <span class="speaker-role"',
    '                            style="display:block;font-family:\'Roboto\',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">',
    '                            Senior Human Resource Advisor - Insperity',
    '                        </span>',
    '                    </td>',
    '                </tr>',
    '            </table>',
    '        </td>',
    '    </tr>',
    '</table>',
    '<!--[if mso]></td><![endif]-->',
    '',
    '<!--[if mso]></tr></table><![endif]-->'
].join('\n');

html = html.replace(/<!--\[if mso\]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><!\[endif\]-->[\s\S]*?<!--\[if mso\]><\/tr><\/table><!\[endif\]-->/, speakersHtml);

// 9. Credits - Remove HRCI and SHRM as N/A
html = html.replace(
    /<!-- ============================================================ -->[\s\S]*?<!-- CREDIT INFORMATION — KEEP EXACTLY INTACT                     -->[\s\S]*?<!-- ============================================================ -->[\s\S]*?<tr>[\s\S]*?<td align="center" valign="top" style="background-color:#F8F9FA;padding:32px 30px;"[\s\S]*?class="credit-bg credit-section-td">[\s\S]*?<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">[\s\S]*?<tbody>[\s\S]*?<tr>[\s\S]*?<td align="center" valign="top">[\s\S]*?<table border="0" cellpadding="0" cellspacing="0" width="100%"[\s\S]*?class="credit-stack-table">[\s\S]*?<tr>[\s\S]*?<td width="90" align="center" valign="top" class="credit-badge-cell">[\s\S]*?<img alt="HRCI 2026 Approved Provider"[\s\S]*?src="https:\/\/media-cdn\.hr\.com\/2026HRCIRecertificationProviderSealNEW_V2\.jpg"[\s\S]*?style="display:inline-block;max-width:90px;width:80px;height:80px;border:0;" width="80" \/>[\s\S]*?<\/td>[\s\S]*?<td align="left" valign="top" class="credit-text-cell"[\s\S]*?style="color:#718096;padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">[\s\S]*?This Program has been pre-approved for 0\.5 HR Credit toward aPHR®, aPHRi™, PHR®, PHRca®, SPHR®, GPHR®, PHRi™ and SPHRi™ recertification through HR Certification Institute® \(HRCI®\)[\s\S]*?<\/td>[\s\S]*?<\/tr>[\s\S]*?<\/table>[\s\S]*?<\/td>[\s\S]*?<\/tr>[\s\S]*?<tr><td height="18">&nbsp;<\/td><\/tr>[\s\S]*?<tr>[\s\S]*?<td align="center" valign="top">[\s\S]*?<table border="0" cellpadding="0" cellspacing="0" width="100%"[\s\S]*?class="credit-stack-table">[\s\S]*?<tr>[\s\S]*?<td width="90" align="center" valign="top" class="credit-badge-cell">[\s\S]*?<img alt="SHRM Recertification Provider 2025"[\s\S]*?src="https:\/\/public-cdn\.hr\.com\/remoteimages\/website-images\/emailer-images\/shrm-recert-provider\.png"[\s\S]*?style="display:inline-block;width:80px;height:80px;border:0;" \/>[\s\S]*?<\/td>[\s\S]*?<td align="left" valign="top" class="credit-text-cell"[\s\S]*?style="color:#718096;padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">[\s\S]*?HR\.com is recognized by SHRM to offer Professional Development Credits, \(PDC\)[\s\S]*?for SHRM-CP® or SHRM-SCP® recertification activities\.[\s\S]*?<\/td>[\s\S]*?<\/tr>[\s\S]*?<\/table>[\s\S]*?<\/td>[\s\S]*?<\/tr>[\s\S]*?<\/tbody>[\s\S]*?<\/table>[\s\S]*?<\/td>[\s\S]*?<\/tr>/,
    ''
);


fs.writeFileSync(filePath, html, 'utf8');
console.log('Done');
