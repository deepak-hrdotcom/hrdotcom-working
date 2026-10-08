// ============================================================================
// HR.com Email Template System — v3.0.0
// 4 visual variants per event type (16 total templates)
// All variants share identical placeholders, links, and logic
// ============================================================================

// -------------------------------------------------------
// SHARED HTML BUILDING BLOCKS
// -------------------------------------------------------

// Common <head> boilerplate (resets, dark mode, responsive)
const HEAD_BOILERPLATE = (heroDarkBg = '#161B22') => `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
     <title>{{TITLE}} | HR.com Webcast</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

        /* === EMAIL RESETS === */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #ECEEF0; }

        /* === DARK MODE === */
        @media (prefers-color-scheme: dark) {
            body, .email-body-bg { background-color: #0D1117 !important; }
            .main-container { background-color: #161B22 !important; }
            .hero-bg { background-color: ${heroDarkBg} !important; }
            .split-hero-left { background-color: #161B22 !important; }
            .split-hero-left .hero-title { color: #E8EEF4 !important; }
            .intro-section-td { background-color: #161B22 !important; }
            .takeaways-bg { background-color: #161B22 !important; }
            .takeaway-card-table, .takeaway-card-cell { background-color: #0D1117 !important; border-color: #2D3748 !important; }
            .takeaway-title { color: #E8EEF4 !important; }
            .takeaway-desc { color: #94A3B8 !important; }
            .sec-cta-section-td { background-color: #161B22 !important; }
            .speakers-bg { background-color: #1C2128 !important; }
            .speaker-card-inner { background-color: #0D1117 !important; border-color: #2D3748 !important; }
            .speaker-name { color: #E8EEF4 !important; }
            .speaker-role { color: #4AC4D6 !important; }
            .section-heading { color: #E8EEF4 !important; }
            .sponsor-section-bg { background-color: #161B22 !important; }
            .hero-sponsor-chip { background-color: #FFFFFF !important; }
            .header-bar-bg { background-color: #FFFFFF !important; }
            .header-bar-label { color: #A0AEC0 !important; }
            .sponsor-logo-cell { background-color: #FFFFFF !important; border-radius: 6px; }
            .credit-bg { background-color: #1C2128 !important; }
            .body-copy-p { color: #CBD5E1 !important; }
            .ve-callout-td { background-color: #1C2128 !important; border-color: #2D3748 !important; }
            .ve-callout-td p { color: #CBD5E1 !important; }
            .ve-callout-td strong { color: #E8EEF4 !important; }
        }
        [data-ogsc] body, [data-ogsc] .email-body-bg { background-color: #0D1117 !important; }
        [data-ogsc] .main-container { background-color: #161B22 !important; }
        [data-ogsc] .hero-bg { background-color: ${heroDarkBg} !important; }
        [data-ogsc] .split-hero-left { background-color: #161B22 !important; }
        [data-ogsc] .split-hero-left .hero-title { color: #E8EEF4 !important; }
        [data-ogsc] .intro-section-td { background-color: #161B22 !important; }
        [data-ogsc] .takeaways-bg { background-color: #161B22 !important; }
        [data-ogsc] .takeaway-card-table, [data-ogsc] .takeaway-card-cell { background-color: #0D1117 !important; border-color: #2D3748 !important; }
        [data-ogsc] .takeaway-title { color: #E8EEF4 !important; }
        [data-ogsc] .takeaway-desc { color: #94A3B8 !important; }
        [data-ogsc] .sec-cta-section-td { background-color: #161B22 !important; }
        [data-ogsc] .speakers-bg { background-color: #1C2128 !important; }
        [data-ogsc] .speaker-card-inner { background-color: #0D1117 !important; border-color: #2D3748 !important; }
        [data-ogsc] .speaker-name { color: #E8EEF4 !important; }
        [data-ogsc] .speaker-role { color: #4AC4D6 !important; }
        [data-ogsc] .section-heading { color: #E8EEF4 !important; }
        [data-ogsc] .credit-bg { background-color: #1C2128 !important; }
        [data-ogsc] .body-copy-p { color: #CBD5E1 !important; }
        [data-ogsc] .ve-callout-td { background-color: #1C2128 !important; border-color: #2D3748 !important; }
        [data-ogsc] .ve-callout-td p { color: #CBD5E1 !important; }
        [data-ogsc] .ve-callout-td strong { color: #E8EEF4 !important; }
        [data-ogsc] h1, [data-ogsc] h2, [data-ogsc] h3 { color: #E8EEF4 !important; }
        [data-ogsc] p { color: #94A3B8 !important; }

        @media screen and (max-width: 600px) {
            .email-outer-td { padding-top: 0 !important; padding-bottom: 0 !important; }
            .main-container { width: 100% !important; max-width: 100% !important; }
            .hero-section-td { padding: 24px 20px 28px 20px !important; }
            .hero-title { font-size: 25px !important; line-height: 33px !important; }
            .hero-meta { font-size: 13px !important; }
            .utility-bar-td { font-size: 11px !important; padding: 8px 16px !important; }
            .takeaways-td { padding: 24px 16px !important; }
            .speakers-section-td { padding: 28px 16px 24px 16px !important; }
            .speaker-card-div { width: 100% !important; display: block !important; padding: 8px 0 !important; }
            .sponsor-section-td { padding: 24px 12px 20px 12px !important; }
            .credit-stack-table, .credit-stack-table tbody, .credit-stack-table tr, .credit-badge-cell, .credit-text-cell { display: block !important; width: 100% !important; }
            .credit-badge-cell { text-align: center !important; padding-bottom: 12px !important; }
            .credit-text-cell { text-align: center !important; padding-left: 0 !important; padding-top: 0 !important; }
            .footer-inner-td { padding: 28px 16px 0 16px !important; }
            .grid-2col-cell { display: block !important; width: 100% !important; box-sizing: border-box !important; padding: 6px 0 !important; }
            .split-hero-cell { display: block !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; padding: 28px 20px !important; }
            .split-hero-parent { padding: 0 !important; }
        }
        @media screen and (max-width: 400px) {
            .hero-title { font-size: 21px !important; line-height: 29px !important; }
        }
    </style>
    <!--[if mso]>
    <style type="text/css">
        body, table, td, p, a, h1, h2, h3 { font-family: Arial, sans-serif !important; }
    </style>
    <![endif]-->
</head>`;

// Rainbow strip
const RAINBOW = (h = 5) => `<tr>
                        <td style="padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="25%" style="background-color:#EF4A3D;height:${h}px;font-size:0;line-height:0;">&nbsp;</td>
                                    <td width="25%" style="background-color:#FDB414;height:${h}px;font-size:0;line-height:0;">&nbsp;</td>
                                    <td width="25%" style="background-color:#94C83D;height:${h}px;font-size:0;line-height:0;">&nbsp;</td>
                                    <td width="25%" style="background-color:#4AC4D6;height:${h}px;font-size:0;line-height:0;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;

// Footer (identical in ALL templates)
const FOOTER = `<tr>
                        <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="background-color:#1C2631;max-width:600px;">
                                <tbody>
                                    <tr><td style="padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="25%" style="background-color:#EF4A3D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#FDB414;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#94C83D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#4AC4D6;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
                                    <tr>
                                        <td align="center" valign="top" class="footer-inner-td" style="padding:36px 20px 0 20px;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="max-width:560px;">
                                                <tbody>
                                                    <tr><td align="center" style="padding-bottom:20px;"><img alt="HR.com" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/hrdotcom-white.png" width="120" style="display:block;border:0;width:120px;" /></td></tr>
                                                    <tr><td style="padding:0 0 20px 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="border-top:1px solid #2D3F50;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
                                                    <tr><td align="center" style="padding-bottom:12px;font-size:11px;line-height:18px;color:#A0AEC0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-weight:400;">HR.com Limited - 56 Malone Road, Jackson's Point, ON, Canada, L0E 1L0</td></tr>
                                                    <tr><td align="center" style="padding-bottom:16px;font-size:11px;line-height:16px;font-family:'Roboto',Arial,Helvetica,sans-serif;"><a data-cta="0" href="https://www.hr.com/en/about_us/privacy_information/" target="_blank" style="color:#CBD5E0;text-decoration:none;font-weight:600;letter-spacing:0.3px;">Privacy Policy</a><span style="color:#2D3F50;padding:0 8px;">|</span><a data-cta="0" data-captcha="0" href="mailto:events@hr.com?subject=Contact Us: HR.com Virtual Events and Webcasts" style="color:#CBD5E0;text-decoration:none;font-weight:600;letter-spacing:0.3px;">Contact Us</a></td></tr>
                                                    <tr><td align="center" style="padding:0 10px 32px 10px;font-size:11px;line-height:19px;color:#A0AEC0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-weight:400;text-align:center;">If you would like to change your subscription settings please access the <a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/accsetting/lib/navigation&amp;mode=show&amp;tabid=3&amp;action=notifications" style="color:#4AC4D6;text-decoration:none;font-weight:600;" target="_blank">subscription page</a> or if you no longer wish to receive these email campaigns you may&nbsp;<a data-cta="0" href="https://www.hr.com/en?t=/CustomCode/hr/subscribe/sub.campaign.7&amp;cid1=__CUSTOMER_ID__&amp;cid2=1170172078066" style="color:#4AC4D6;text-decoration:none;font-weight:600;" target="_blank" data-captcha="1">unsubscribe here</a>.<br><br><span style="color:#8490a5;">This email account is not monitored. Please do not reply to this email.</span></td></tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr><td style="padding:0;font-size:0;line-height:0;mso-line-height-rule:exactly;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="25%" style="background-color:#EF4A3D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#FDB414;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#94C83D;height:3px;font-size:0;line-height:0;">&nbsp;</td><td width="25%" style="background-color:#4AC4D6;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>`;

// Document wrapper (open/close)
const DOC_OPEN = (head) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

${head}

<body class="email-body-bg"
    style="margin: 0; padding: 0; background-color: #ECEEF0; font-family: 'Roboto', Arial, Helvetica, sans-serif;">

    <!-- SUBJECT: [REPLACE WITH GENERATED SUBJECT LINE] -->

   <div style="display:none;font-size:1px;color:#ECEEF0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;font-family:Arial,sans-serif;">
    {{PREHEADER}}
</div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-body-bg"
        style="background-color:#ECEEF0;width:100%;">
        <tr>
            <td align="center" valign="top" class="email-outer-td" style="padding:20px 0 40px 0;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;"
                    class="main-container">`;

const DOC_CLOSE = `
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td></tr></table>
                <![endif]-->
            </td>
        </tr>
    </table>
</body>

</html>`;

// Header bar
const HEADER_BAR = (label) => `<tr>
                        <td class="header-bar-bg"
                            style="background-color:#FFFFFF;padding:12px 20px;border-bottom:1px solid #ECEEF0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" valign="middle" style="padding:0;">
                                        <img src="{{LOGO_URL}}"
                                            alt="{{LOGO_ALT}}"
                                            style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />
                                    </td>
                                    <td align="right" valign="middle" style="padding:0;">
                                        <span class="header-bar-label"
                                            style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">${label}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;

// Speakers section wrapper
const SPEAKERS_SECTION = (bgColor = '#F8F9FA') => `<tr>
                        <td align="center" valign="top" class="speakers-bg speakers-section-td"
                            style="background-color:${bgColor};padding:36px 24px 32px 24px;">
                            <p
                                style="margin:0 0 6px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;text-align:center;">
                                Your expert hosts</p>
                            <h2 class="section-heading"
                                style="margin:0 0 28px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#2A343E;text-align:center;line-height:27px;">
                                Learn directly from industry leaders
                            </h2>
                            <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->

                         {{HOSTS_SECTION}}
                            <!--[if mso]></tr></table><![endif]-->

                        </td>
                    </tr>`;


// =====================================================
// VARIANT-SPECIFIC LAYOUT BUILDERS
// =====================================================

// --- VARIANT A: "Classic Editorial" (original design) ---
// Centered gradient hero, numbered takeaway badges, inline speaker cards

function classicHero(gradient, bgFallback, ctaTextColor, ctaUrl, ctaText, metaLine) {
  return `<tr>
                        <td align="center" valign="top" class="hero-section-td hero-bg"
                            style="background: linear-gradient(160deg, ${gradient}); background-color: ${bgFallback}; padding: 24px 36px 28px 36px;">
                            <h1 class="hero-title"
                                style="margin:0 0 8px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:32px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:center;letter-spacing:-0.3px;">
                               {{TITLE}}
                            </h1>
                            ${metaLine}
                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top:4px;">
                                <tr>
                                    <td align="center" style="border-radius:999px;background:#FFFFFF;"
                                        bgcolor="#FFFFFF">
                                        <a href="${ctaUrl}"
                                            target="_blank"${ctaUrl.includes('__STORY_ID__') ? '' : ' data-cta="1" data-captcha="1"'}
                                            style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:${ctaTextColor};text-decoration:none;border-radius:999px;padding:13px 42px;display:inline-block;font-weight:700;letter-spacing:0.4px;mso-padding-alt:0;">
                                            ${ctaText}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

function classicTakeaways(colors = ['#EF4A3D','#4AC4D6','#94C83D','#FDB414'], textColors = ['#FFFFFF','#0D1F28','#1A2A00','#1A1000']) {
  return `<tr>
                        <td align="left" valign="top" class="takeaways-bg takeaways-td"
                            style="background-color:#FFFFFF;padding:14px 36px 32px 36px;">
                            <p style="margin:0 0 18px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">
                                What You'll Learn</p>
${[1,2,3,4].map((n,i) => `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:${i<3?'14':'0'}px;">
                                <tr>
                                    <td width="36" valign="middle" align="center" style="vertical-align:middle;padding:0;width:36px;">
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                                            <tr>
                                                <td align="center" valign="middle"
                                                    style="background-color:${colors[i]};border-radius:6px;width:26px;height:26px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:${textColors[i]};line-height:26px;text-align:center;mso-line-height-rule:exactly;vertical-align:middle;">
                                                    0${n}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td valign="middle" style="padding-left:12px;vertical-align:middle;">
                                        <span class="takeaway-title"
                                            style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">{{LEARN${n}}}</span>
                                    </td>
                                </tr>
                            </table>`).join('')}

                        </td>
                    </tr>`;
}

function secondaryCTA(href, borderColor, textColor, label) {
  return `<tr>
                        <td align="center" valign="top" class="sec-cta-section-td" style="background-color:#FFFFFF;padding:0 36px 32px 36px;">
                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin:0 auto;">
                                <tr>
                                    <td align="center" style="border-radius:999px;border:2px solid ${borderColor};"
                                        bgcolor="#FFFFFF">
                                        <a href="${href}" data-cta="1" data-captcha="1" target="_blank"
                                            style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:${textColor};text-decoration:none;border-radius:999px;padding:10px 28px;display:inline-block;font-weight:700;letter-spacing:0.3px;mso-padding-alt:0;">
                                            ${label}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

// --- VARIANT B: "Bold Magazine" ---
// Dark full-width hero, left-aligned oversized title, colored left-border takeaway cards, full-width gradient CTA

function boldHero(bgColor, accentColor, ctaUrl, ctaText, metaLine) {
  return `<tr>
                        <td align="left" valign="top" class="hero-section-td hero-bg"
                            style="background-color:${bgColor}; padding: 40px 36px 36px 36px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding:0;">
                                        <table border="0" cellpadding="0" cellspacing="0"><tr><td style="background-color:${accentColor};width:40px;height:4px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
                                    </td>
                                </tr>
                                <tr><td height="16" style="font-size:0;line-height:0;">&nbsp;</td></tr>
                            </table>
                            <h1 class="hero-title"
                                style="margin:0 0 12px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:34px;font-weight:900;color:#FFFFFF;line-height:42px;text-align:left;letter-spacing:-0.5px;">
                               {{TITLE}}
                            </h1>
                            ${metaLine}
                            <table border="0" cellspacing="0" cellpadding="0" style="margin-top:20px;">
                                <tr>
                                    <td align="center" style="border-radius:999px;background:${accentColor};"
                                        bgcolor="${accentColor}">
                                        <a href="${ctaUrl}"
                                            target="_blank"${ctaUrl.includes('__STORY_ID__') ? '' : ' data-cta="1" data-captcha="1"'}
                                            style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:14px 38px;display:inline-block;font-weight:700;letter-spacing:0.4px;mso-padding-alt:0;">
                                            ${ctaText}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

function boldIntro(accentColor) {
  return `<tr>
                        <td align="center" valign="top" class="intro-section-td" style="background-color: #FFFFFF; padding: 40px 36px 6px 36px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="4" style="background-color:${accentColor};width:4px;padding:0;" valign="top">&nbsp;</td>
                                    <td style="padding:0 0 0 20px;" valign="top">
                                        {{INTRO}}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

function boldTakeaways(colors = ['#EF4A3D','#4AC4D6','#94C83D','#FDB414']) {
  return `<tr>
                        <td align="left" valign="top" class="takeaways-bg takeaways-td"
                            style="background-color:#FFFFFF;padding:14px 36px 32px 36px;">
                            <p style="margin:0 0 18px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">
                                What You'll Learn</p>
${[1,2,3,4].map((n,i) => `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="takeaway-card-table" style="margin-bottom:${i<3?'12':'0'}px;">
                                <tr>
                                    <td class="takeaway-card-cell" style="border-left:4px solid ${colors[i]};padding:10px 0 10px 16px;background-color:#F8FAFC;">
                                        <span class="takeaway-title"
                                            style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">{{LEARN${n}}}</span>
                                    </td>
                                </tr>
                            </table>`).join('')}

                        </td>
                    </tr>`;
}

function boldSecondaryCTA(href, gradientFrom, gradientTo, label) {
  return `<tr>
                        <td align="center" valign="top" class="sec-cta-section-td" style="background-color:#FFFFFF;padding:0 36px 32px 36px;">
                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                    <td align="center" style="border-radius:10px;background:linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%);">
                                        <a href="${href}" data-cta="1" data-captcha="1" target="_blank"
                                            style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:10px;padding:14px 28px;display:block;font-weight:700;letter-spacing:0.3px;text-align:center;mso-padding-alt:0;">
                                            ${label}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

// --- VARIANT C: "Minimal Clean" ---
// Solid-color hero, thin divider, checkmark takeaways, generous whitespace

function minimalHero(solidColor, ctaUrl, ctaText, ctaBgColor, metaLine) {
  return `<tr>
                        <td align="center" valign="top" class="hero-section-td hero-bg"
                            style="background-color:${solidColor}; padding: 44px 36px 40px 36px;">
                            <h1 class="hero-title"
                                style="margin:0 0 10px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:30px;font-weight:900;color:#FFFFFF;line-height:40px;text-align:center;letter-spacing:-0.3px;">
                               {{TITLE}}
                            </h1>
                            ${metaLine}
                            <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin-top:8px;"><tr><td style="background-color:rgba(255,255,255,0.3);height:1px;width:60px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
                            <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top:20px;">
                                <tr>
                                    <td align="center" style="border-radius:999px;background:${ctaBgColor};"
                                        bgcolor="${ctaBgColor}">
                                        <a href="${ctaUrl}"
                                            target="_blank"${ctaUrl.includes('__STORY_ID__') ? '' : ' data-cta="1" data-captcha="1"'}
                                            style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:13px 42px;display:inline-block;font-weight:700;letter-spacing:0.4px;mso-padding-alt:0;">
                                            ${ctaText}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

function minimalTakeaways(checkColor = '#4AC4D6') {
  return `<tr>
                        <td align="left" valign="top" class="takeaways-bg takeaways-td"
                            style="background-color:#FFFFFF;padding:14px 36px 32px 36px;">
                            <p style="margin:0 0 18px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">
                                What You'll Learn</p>
${[1,2,3,4].map((n,i) => `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:${i<3?'14':'0'}px;">
                                <tr>
                                    <td width="28" valign="top" align="center" style="padding:2px 0 0 0;width:28px;">
                                        <span style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:${checkColor};line-height:22px;">&#10003;</span>
                                    </td>
                                    <td valign="middle" style="padding-left:10px;vertical-align:middle;">
                                        <span class="takeaway-title"
                                            style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#2A343E;line-height:22px;display:block;">{{LEARN${n}}}</span>
                                    </td>
                                </tr>
                            </table>`).join('')}

                        </td>
                    </tr>`;
}

function minimalSecondaryCTA(href, bgColor, textColor, label) {
  return `<tr>
                        <td align="center" valign="top" class="sec-cta-section-td" style="background-color:#FFFFFF;padding:0 36px 32px 36px;">
                            <table border="0" cellspacing="0" cellpadding="0" align="center">
                                <tr>
                                    <td align="center" style="border-radius:999px;background:${bgColor};"
                                        bgcolor="${bgColor}">
                                        <a href="${href}" data-cta="1" data-captcha="1" target="_blank"
                                            style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:${textColor};text-decoration:none;border-radius:999px;padding:12px 36px;display:inline-block;font-weight:700;letter-spacing:0.3px;mso-padding-alt:0;">
                                            ${label}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

// --- VARIANT D: "Split Accent" ---
// 60/40 split hero, 2×2 grid takeaway cards, gradient CTA band

function splitHero(accentColor, ctaUrl, ctaText, ctaBtnColor, metaLine) {
  const btnLabel = ctaText.includes('Register Free') ? 'Register Free &rarr;' : ctaText;
  const rightMeta = metaLine
    ? `<p class="hero-meta" style="margin:0 0 16px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#FFFFFF;line-height:20px;letter-spacing:0.2px;text-align:center;">
        {{SPLIT_DATE_TIME}}<br><span style="font-weight:400;font-size:12px;opacity:0.9;">Free to Attend</span>
       </p>`
    : '';

  return `<tr>
                        <td align="center" valign="top" class="hero-section-td split-hero-parent hero-bg" style="padding:0;">
                            <!--[if mso]><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="340" valign="middle" style="padding:32px 28px;"><![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <!-- LEFT COLUMN: Webcast Title -->
                                    <td class="split-hero-cell" width="55%" valign="middle" style="box-sizing:border-box;padding:36px 28px 36px 32px;background-color:#F8FAFC;">
                                        <h1 class="hero-title"
                                            style="margin:0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:26px;font-weight:900;color:#2A343E;line-height:35px;text-align:left;letter-spacing:-0.3px;">
                                           {{TITLE}}
                                        </h1>
                                    </td>
                                    <!--[if mso]></td><td width="260" valign="middle" style="background-color:${accentColor};padding:32px 20px;"><![endif]-->
                                    <!-- RIGHT COLUMN: Date/Time + CTA Button -->
                                    <td class="split-hero-cell" width="45%" valign="middle" style="box-sizing:border-box;background-color:${accentColor};padding:36px 20px;text-align:center;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            ${rightMeta ? `<tr><td align="center">${rightMeta}</td></tr>` : ''}
                                            <tr>
                                                <td align="center">
                                                    <table border="0" cellspacing="0" cellpadding="0" align="center">
                                                        <tr>
                                                            <td align="center" style="border-radius:999px;background:#FFFFFF;" bgcolor="#FFFFFF">
                                                                <a href="${ctaUrl}"
                                                                    target="_blank"${ctaUrl.includes('__STORY_ID__') ? '' : ' data-cta="1" data-captcha="1"'}
                                                                    style="font-size:13px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:${accentColor};text-decoration:none;border-radius:999px;padding:12px 24px;display:inline-block;font-weight:700;letter-spacing:0.3px;white-space:nowrap;mso-padding-alt:0;">
                                                                    ${btnLabel}
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if mso]></td></tr></table><![endif]-->
                        </td>
                    </tr>`;
}

function splitTakeaways(colors = ['#EF4A3D','#4AC4D6','#94C83D','#FDB414']) {
  return `<tr>
                        <td align="left" valign="top" class="takeaways-bg takeaways-td"
                            style="background-color:#FFFFFF;padding:14px 36px 32px 36px;">
                            <p style="margin:0 0 18px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#A0AEC0;text-transform:uppercase;letter-spacing:2px;">
                                What You'll Learn</p>
${[1,2,3,4].map((n,i) => `
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="takeaway-card-table" style="margin-bottom:${i<3?'12':'0'}px;background-color:#F8FAFC;border-radius:8px;overflow:hidden;">
                                <tr><td style="background-color:${colors[i]};height:2px;font-size:0;line-height:0;">&nbsp;</td></tr>
                                <tr>
                                    <td class="takeaway-card-cell" style="padding:14px 16px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td width="20" valign="top" style="width:20px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:${colors[i]};line-height:23px;padding:0;">&bull;</td>
                                                <td valign="top" style="padding:0;">
                                                    <span class="takeaway-title" style="font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#2A343E;line-height:23px;display:block;">{{LEARN${n}}}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>`).join('')}

                        </td>
                    </tr>`;
}

function splitSecondaryCTA(href, bgFrom, bgTo, label) {
  return `<tr>
                        <td align="center" valign="top" class="sec-cta-section-td" style="background-color:#F0F2F5;padding:24px 36px;">
                            <table border="0" cellspacing="0" cellpadding="0" align="center">
                                <tr>
                                    <td align="center" style="border-radius:999px;background:linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%);">
                                        <a href="${href}" data-cta="1" data-captcha="1" target="_blank"
                                            style="font-size:14px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:13px 36px;display:inline-block;font-weight:700;letter-spacing:0.3px;mso-padding-alt:0;">
                                            ${label}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

// Speakers section for Bold (dark bg)
const SPEAKERS_DARK = `<tr>
                        <td align="center" valign="top" class="speakers-bg speakers-section-td"
                            style="background-color:#1C2631;padding:36px 24px 32px 24px;">
                            <p
                                style="margin:0 0 6px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:2px;text-align:center;">
                                Your expert hosts</p>
                            <h2 class="section-heading"
                                style="margin:0 0 28px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#FFFFFF;text-align:center;line-height:27px;">
                                Learn directly from industry leaders
                            </h2>
                            <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->

                         {{HOSTS_SECTION}}
                            <!--[if mso]></tr></table><![endif]-->

                        </td>
                    </tr>`;

// Intro section (white bg, standard)
const INTRO_SECTION = `<tr>
                        <td align="center" valign="top" class="intro-section-td" style="background-color: #FFFFFF; padding: 40px 36px 6px 36px;">
                            {{INTRO}}
                        </td>
                    </tr>`;

// VE Callout section
function veCallout(bgColor, borderColor, btnColor) {
  return `<tr>
                        <td align="center" valign="middle" class="ve-callout-td"
                            style="background-color:${bgColor};padding:18px 36px 20px 36px;border-top:1px solid ${borderColor};border-bottom:1px solid ${borderColor};">
                            <p
                                style="margin:0 0 16px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#4A5568;line-height:20px;text-align:center;">
                                This webcast is part of the <strong style="color:#2A343E;">__VE_NAME__</strong> Virtual
                                Event.
                                Click the button below to see other webcasts associated with this event.
                            </p>
                            <table border="0" cellspacing="0" cellpadding="0" align="center">
                                <tr>
                                    <td align="center" style="border-radius:999px;background:${btnColor};"
                                        bgcolor="${btnColor}">
                                        <a href="__VE_CTA__" data-cta="1" target="_blank"
                                            style="font-size:13px;font-family:'Roboto',Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:999px;padding:11px 30px;display:inline-block;font-weight:700;letter-spacing:0.4px;mso-padding-alt:0;">
                                            Check it out here &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;
}

// Registration reminder row variations
function regReminderDemo() {
  return `<tr>
                        <td align="center" valign="middle" class="takeaways-bg"
                            style="background-color:#E8ECEF;padding:22px 28px;">
                            <p class="body-copy-p"
                                style="margin:0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#4A5568;line-height:20px;text-align:center;">
                                Can't attend the live webcast? <a href="__SECONDARY_CTA__" target="_blank"
                                    data-cta="1" data-captcha="1"
                                    style="color:#02588E;text-decoration:underline;font-weight:600;">Register anyway</a>
                                to access the recording. Ensure you are logged in to your HR.com account to access
                                registration for this webcast. Please note that demo webcasts do not qualify for HRCI or
                                SHRM recertification credits.
                            </p>
                        </td>
                    </tr>`;
}

function regReminderStandalone() {
  return `<tr>
                        <td align="center" valign="middle" class="takeaways-bg"
                            style="background-color:#E8ECEF;padding:22px 28px;">
                            <p class="body-copy-p"
                                style="margin:0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#4A5568;line-height:20px;text-align:center;">
                                Can't attend the live webcast? <a href="__SECONDARY_CTA__" target="_blank"
                                    data-cta="1" data-captcha="1"
                                    style="color:#02588E;text-decoration:underline;font-weight:600;">Register anyway</a>
                                to access the recording. Ensure you are logged in to your HR.com account to access
                                registration for this webcast.
                            </p>
                        </td>
                    </tr>`;
}

function regReminderVirtual() {
  return `<tr>
                        <td align="center" valign="middle" class="takeaways-bg"
                            style="background-color:#E8ECEF;padding:22px 28px;">
                            <p class="body-copy-p"
                                style="margin:0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#4A5568;line-height:20px;text-align:center;">
                                Can't attend the live webcast? <a href="__SECONDARY_CTA__" target="_blank"
                                    data-cta="1" data-captcha="1"
                                    style="color:#02588E;text-decoration:underline;font-weight:600;">Register anyway</a>
                                to access the recording. Ensure you are logged in to your HR.com account to access
                                registration for this webcast.
                            </p>
                        </td>
                    </tr>`;
}


// =====================================================
// EVENT TYPE CONFIGURATIONS
// Each defines event-specific content (CTA URLs, labels, meta lines, etc.)
// =====================================================

const EVENTS = {
  demo: {
    label: 'Upcoming Webcast',
    ctaUrl: 'https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=__STORY_ID__&relType=2',
    ctaText: 'Save My Free Spot &rarr;',
    secondaryCtaUrl: '__SECONDARY_CTA__',
    secondaryCtaLabel: 'Curious? Find out more here &rarr;',
    onDemandCtaUrl: null,
    metaLine: `<p class="hero-meta" style="margin:0 0 24px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;">
                                {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                            </p>`,
    metaLineLeft: `<p class="hero-meta" style="margin:0 0 0 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.75);text-align:left;line-height:22px;letter-spacing:0.3px;">
                                {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                            </p>`,
    metaLineDark: `<p class="hero-meta" style="margin:0 0 12px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#718096;text-align:left;line-height:22px;letter-spacing:0.3px;">
                                        {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                                    </p>`,
    hasVE: true,
    regReminder: regReminderDemo,
  },
  ondemand: {
    label: 'OnDemand Webcast',
    ctaUrl: '__ONDEMAND_CTA__',
    ctaText: 'View OnDemand &rarr;',
    secondaryCtaUrl: '__ONDEMAND_CTA__',
    secondaryCtaLabel: 'View OnDemand &rarr;',
    onDemandCtaUrl: '__ONDEMAND_CTA__',
    metaLine: '',
    metaLineLeft: '',
    metaLineDark: '',
    hasVE: false,
    regReminder: null,
  },
  standalone: {
    label: 'Upcoming Webcast',
    ctaUrl: 'https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=__STORY_ID__&email=__EMAIL__',
    ctaText: 'Save My Free Spot &rarr;',
    secondaryCtaUrl: '__SECONDARY_CTA__',
    secondaryCtaLabel: 'Curious? Find out more here &rarr;',
    onDemandCtaUrl: null,
    metaLine: `<p class="hero-meta" style="margin:0 0 24px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;">
                              {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                            </p>`,
    metaLineLeft: `<p class="hero-meta" style="margin:0 0 0 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.75);text-align:left;line-height:22px;letter-spacing:0.3px;">
                                {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                            </p>`,
    metaLineDark: `<p class="hero-meta" style="margin:0 0 12px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#718096;text-align:left;line-height:22px;letter-spacing:0.3px;">
                                        {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                                    </p>`,
    hasVE: false,
    regReminder: regReminderStandalone,
  },
  virtual: {
    label: 'Virtual Event Webcast',
    ctaUrl: 'https://www.hr.com/en?t=/CustomCode/webcasts/registration&storyID=__STORY_ID__&email=__EMAIL__',
    ctaText: 'Save My Free Spot &rarr;',
    secondaryCtaUrl: '__SECONDARY_CTA__',
    secondaryCtaLabel: 'Curious? Find out more here &rarr;',
    onDemandCtaUrl: null,
    metaLine: `<p class="hero-meta" style="margin:0 0 24px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.9);text-align:center;line-height:22px;letter-spacing:0.3px;">
                                {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                            </p>`,
    metaLineLeft: `<p class="hero-meta" style="margin:0 0 0 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:rgba(255,255,255,0.75);text-align:left;line-height:22px;letter-spacing:0.3px;">
                                {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                            </p>`,
    metaLineDark: `<p class="hero-meta" style="margin:0 0 12px 0;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#718096;text-align:left;line-height:22px;letter-spacing:0.3px;">
                                        {{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend
                                    </p>`,
    hasVE: true,
    regReminder: regReminderVirtual,
  }
};

// Color themes per event type for each variant
const THEMES = {
  demo: {
    A: { gradient: '#C01060 0%, #D44030 100%', bgFallback: '#C01060', ctaText: '#C01060', secBorder: '#02588E', heroDark: '#4A0D2A' },
    B: { bgColor: '#0F172A', accent: '#4AC4D6', gradFrom: '#0F172A', gradTo: '#1E293B', heroDark: '#0F172A' },
    C: { solid: '#02588E', ctaBg: '#C01060', checkColor: '#02588E', secBg: '#02588E', heroDark: '#02304E' },
    D: { accent: '#C01060', ctaBtn: '#C01060', secFrom: '#C01060', secTo: '#EF4A3D', heroDark: '#161B22' },
  },
  ondemand: {
    A: { gradient: '#0F4A40 0%, #0A2E28 50%, #081916 100%', bgFallback: '#0F4A40', ctaText: '#0F4A40', secBorder: '#02588E', heroDark: '#0F3D34' },
    B: { bgColor: '#1A1A2E', accent: '#EF4A3D', gradFrom: '#EF4A3D', gradTo: '#C01060', heroDark: '#1A1A2E' },
    C: { solid: '#1E7E8C', ctaBg: '#0F4A40', checkColor: '#1E7E8C', secBg: '#1E7E8C', heroDark: '#0F3D34' },
    D: { accent: '#0F4A40', ctaBtn: '#0F4A40', secFrom: '#0F4A40', secTo: '#1E7E8C', heroDark: '#161B22' },
  },
  standalone: {
    A: { gradient: '#1E7E8C 0%, #0A262A 100%', bgFallback: '#1E7E8C', ctaText: '#1E7E8C', secBorder: '#02588E', heroDark: '#0F3D34' },
    B: { bgColor: '#1B2838', accent: '#94C83D', gradFrom: '#508C1E', gradTo: '#94C83D', heroDark: '#1B2838' },
    C: { solid: '#2A343E', ctaBg: '#EF4A3D', checkColor: '#EF4A3D', secBg: '#2A343E', heroDark: '#1C2128' },
    D: { accent: '#02588E', ctaBtn: '#02588E', secFrom: '#02588E', secTo: '#4AC4D6', heroDark: '#161B22' },
  },
  virtual: {
    A: { gradient: '#02588E 0%, #013A5E 100%', bgFallback: '#02588E', ctaText: '#02588E', secBorder: '#C01060', heroDark: '#02304E' },
    B: { bgColor: '#2D1B4E', accent: '#FDB414', gradFrom: '#FDB414', gradTo: '#EF4A3D', heroDark: '#2D1B4E' },
    C: { solid: '#508C1E', ctaBg: '#2A343E', checkColor: '#508C1E', secBg: '#508C1E', heroDark: '#2A4010' },
    D: { accent: '#02588E', ctaBtn: '#02588E', secFrom: '#02588E', secTo: '#475569', heroDark: '#161B22' },
  }
};


// =====================================================
// TEMPLATE ASSEMBLER — Builds complete HTML per variant
// =====================================================

function buildTemplate(eventKey, variantKey) {
  const ev = EVENTS[eventKey];
  const th = THEMES[eventKey][variantKey];
  const head = HEAD_BOILERPLATE(th.heroDark || '#161B22');
  const headerBar = HEADER_BAR(ev.label);
  
  // Decide CTA text for this variant/event
  let ctaText = ev.ctaText;
  if (eventKey !== 'ondemand') {
    if (variantKey === 'A' || variantKey === 'C') {
      ctaText = 'Save My Free Spot &rarr;';
    } else {
      ctaText = 'Register Free &rarr;';
    }
  }

  let hero, intro, takeaways, secCta;
  
  switch (variantKey) {
    case 'A': // Classic Editorial
      hero = classicHero(th.gradient, th.bgFallback, th.ctaText, ev.ctaUrl, ctaText, ev.metaLine);
      intro = INTRO_SECTION;
      takeaways = classicTakeaways();
      secCta = secondaryCTA(ev.secondaryCtaUrl, th.secBorder, th.secBorder, ev.secondaryCtaLabel);
      break;
      
    case 'B': // Bold Magazine
      hero = boldHero(th.bgColor, th.accent, ev.ctaUrl, ctaText, ev.metaLineLeft);
      intro = boldIntro(th.accent);
      takeaways = boldTakeaways();
      secCta = boldSecondaryCTA(ev.secondaryCtaUrl, th.gradFrom, th.gradTo, ev.secondaryCtaLabel);
      break;
      
    case 'C': // Minimal Clean
      hero = minimalHero(th.solid, ev.ctaUrl, ctaText, th.ctaBg, ev.metaLine);
      intro = INTRO_SECTION;
      takeaways = minimalTakeaways(th.checkColor);
      secCta = minimalSecondaryCTA(ev.secondaryCtaUrl, th.secBg, '#FFFFFF', ev.secondaryCtaLabel);
      break;
      
    case 'D': // Split Accent
      hero = splitHero(th.accent, ev.ctaUrl, ctaText, th.ctaBtn, ev.metaLineDark);
      intro = INTRO_SECTION;
      takeaways = splitTakeaways();
      secCta = splitSecondaryCTA(ev.secondaryCtaUrl, th.secFrom, th.secTo, ev.secondaryCtaLabel);
      break;
  }
  
  // Speakers section — Bold uses dark bg, others use light
  const speakers = variantKey === 'B' ? SPEAKERS_DARK : SPEAKERS_SECTION();
  
  // Assemble
  let body = '';
  body += RAINBOW();
  body += '\n' + headerBar;
  body += '\n' + hero;
  body += '\n' + intro;
  body += '\n' + takeaways;
  body += '\n' + secCta;
  body += '\n' + speakers;
  
  // VE Callout (demo & virtual only)
  if (ev.hasVE) {
    const veColors = {
      A: { bg: '#F0F7EC', border: '#D6EABF', btn: '#508C1E' },
      B: { bg: '#F0F4F8', border: '#CBD5E1', btn: '#0F172A' },
      C: { bg: '#F0F7EC', border: '#D6EABF', btn: '#508C1E' },
      D: { bg: '#FFF8E1', border: '#FFEEB4', btn: '#B8860B' },
    };
    const vc = veColors[variantKey];
    body += '\n' + veCallout(vc.bg, vc.border, vc.btn);
  }
  
  // Registration reminder (not on ondemand)
  if (ev.regReminder) {
    body += '\n' + ev.regReminder();
  }
  
  // Credit section placeholder
  body += '\n                   {{CREDIT_SECTION}}';
  
  // Footer
  body += '\n' + FOOTER;
  
  return DOC_OPEN(head) + '\n' + body + '\n' + DOC_CLOSE;
}


// =====================================================
// HOST CARD VARIANTS
// =====================================================

// Classic (A) — inline-block cards with circular photo, centered text, white bg
const HOST_CARD_CLASSIC = `
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width: 260px;margin:8px 6px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:260px;min-width:260px; background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);" class="speaker-card-inner">
                <tr>
                    <td align="center" style="padding:24px 16px;">
                        <img alt="{{H_ALT}}" src="{{H_IMG}}" width="90" height="90" style="display:block;width:90px;height:90px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #ECEEF0;" />
                        <span class="speaker-name" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">{{H_NAME}}</span>
                        <span class="speaker-role" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">{{H_TITLE}}</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`;

// Bold (B) — dark-bg friendly card with subtle border, left-aligned
const HOST_CARD_BOLD = `
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width:260px;margin:8px 6px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:260px;min-width:260px;background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;" class="speaker-card-inner">
                <tr>
                    <td style="padding:0;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td width="80" valign="top" style="padding:16px 0 16px 16px;">
                                    <img alt="{{H_ALT}}" src="{{H_IMG}}" width="70" height="70" style="display:block;width:70px;height:70px;object-fit:cover;border-radius:8px;" />
                                </td>
                                <td valign="middle" style="padding:16px 16px 16px 14px;">
                                    <span class="speaker-name" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:15px;font-weight:800;color:#2A343E;line-height:20px;">{{H_NAME}}</span>
                                    <span class="speaker-role" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:#4AC4D6;line-height:18px;margin-top:4px;">{{H_TITLE}}</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`;

// Minimal (C) — larger photo, very clean, no border
const HOST_CARD_MINIMAL = `
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width:260px;margin:8px 6px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:260px;min-width:260px;" class="speaker-card-inner">
                <tr>
                    <td align="center" style="padding:20px 16px;">
                        <img alt="{{H_ALT}}" src="{{H_IMG}}" width="110" height="110" style="display:block;width:110px;height:110px;object-fit:cover;border-radius:50%;margin:0 auto 16px auto;" />
                        <span class="speaker-name" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">{{H_NAME}}</span>
                        <span class="speaker-role" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:500;color:#718096;line-height:19px;margin-top:4px;">{{H_TITLE}}</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`;

// Split (D) — card with colored top accent bar
const HOST_CARD_SPLIT = `
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width:260px;margin:8px 6px;">
    <tr>
        <td style="padding:0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:260px;min-width:260px;background-color:#F8FAFC;border-radius:10px;overflow:hidden;border:1px solid #E2E8F0;" class="speaker-card-inner">
                <tr><td style="background:linear-gradient(90deg,#EF4A3D,#FDB414,#94C83D,#4AC4D6);height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>
                <tr>
                    <td align="center" style="padding:22px 16px;">
                        <img alt="{{H_ALT}}" src="{{H_IMG}}" width="85" height="85" style="display:block;width:85px;height:85px;object-fit:cover;border-radius:50%;margin:0 auto 14px auto;border:3px solid #FFFFFF;box-shadow:0 2px 8px rgba(0,0,0,0.08);" />
                        <span class="speaker-name" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:16px;font-weight:800;color:#2A343E;line-height:22px;">{{H_NAME}}</span>
                        <span class="speaker-role" style="display:block;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#02588E;line-height:19px;margin-top:4px;">{{H_TITLE}}</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`;

const HOST_CARDS = {
  A: HOST_CARD_CLASSIC,
  B: HOST_CARD_BOLD,
  C: HOST_CARD_MINIMAL,
  D: HOST_CARD_SPLIT,
};

const VARIANT_META = {
  A: { id: 'classic', label: 'Classic Editorial' },
  B: { id: 'bold',    label: 'Bold Magazine' },
  C: { id: 'minimal', label: 'Minimal Clean' },
  D: { id: 'split',   label: 'Split Accent' },
};


// =====================================================
// FINAL EXPORT — The TEMPLATES object
// =====================================================

export const TEMPLATES = {};

['demo', 'ondemand', 'standalone', 'virtual'].forEach(eventKey => {
  const eventNames = {
    demo: 'Demo Webcast',
    ondemand: 'On-Demand',
    standalone: 'Standalone',
    virtual: 'Virtual Event'
  };
  
  TEMPLATES[eventKey] = {
    name: eventNames[eventKey],
    variants: ['A', 'B', 'C', 'D'].map(vk => ({
      id: VARIANT_META[vk].id,
      label: VARIANT_META[vk].label,
      html: buildTemplate(eventKey, vk),
      hostCard: HOST_CARDS[vk],
    }))
  };
});


// =====================================================
// BACKWARD-COMPATIBLE EXPORTS
// =====================================================

// Default HOST_CARD (Classic) for backward compatibility
export const HOST_CARD = HOST_CARD_CLASSIC;

// Credit section (shared across ALL variants)
export const CREDIT_HTML_BLOCK = `
<tr>
    <td align="center" valign="top" style="background-color:#F8F9FA;padding:32px 30px;" class="credit-bg credit-section-td">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="credit-stack-table">
                            <tr>
                                <td width="90" align="center" valign="top" class="credit-badge-cell">
                                    <img alt="HRCI" src="https://media-cdn.hr.com/2026HRCIRecertificationProviderSealNEW_V2.jpg" style="display:inline-block;max-width:90px;width:80px;height:80px;border:0;" width="80" />
                                </td>
                                <td align="left" valign="top" class="credit-text-cell" style="color:#718096;padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">
                                    This Program has been pre-approved for {{CREDIT_VALUE}} toward aPHR®, aPHRi™, PHR®, PHRca®, SPHR®, GPHR®, PHRi™ and SPHRi™ recertification through HR Certification Institute® (HRCI®)
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr><td height="18" style="font-size:1px; line-height:18px;">&nbsp;</td></tr>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="credit-stack-table">
                            <tr>
                                <td width="90" align="center" valign="top" class="credit-badge-cell">
                                    <img alt="SHRM" src="https://public-cdn.hr.com/remoteimages/website-images/emailer-images/shrm-recert-provider.png" style="display:inline-block;width:80px;height:80px;border:0;" />
                                </td>
                                <td align="left" valign="top" class="credit-text-cell" style="color:#718096;padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">
                                    HR.com is recognized by SHRM to offer Professional Development Credits (PDC) for SHRM-CP® or SHRM-SCP® recertification activities.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
`;
