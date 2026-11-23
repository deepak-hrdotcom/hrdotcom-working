// ============================================================================
// HR.com Email Template System — v4.0.0
// 10 visual variants per event type (40 total templates)
// All variants share identical placeholders, links, and logic
// Built for dark mode, classic + new Outlook, Gmail, Apple Mail and mobile
// ============================================================================

// -------------------------------------------------------
// SHARED HTML BUILDING BLOCKS
// -------------------------------------------------------

// Dark-mode surface/text colors shared by every template
const DM = { page: '#0D1117', surface: '#161B22', raised: '#1F2630', line: '#30363D', strong: '#F0F3F6', body: '#C9D1D9', muted: '#8B949E' };

// Dark-mode rules. Applied via prefers-color-scheme (Apple Mail, iOS, Outlook for Mac,
// Thunderbird) and via [data-ogsc]/[data-ogsb] (Outlook.com, new Outlook, Outlook apps).
// Sections designed dark stay as they are; light sections opt in with dm-* classes.
function darkCss(p) {
  const rules = [
    ['body, .email-body-bg, .dm-page, .speakers-bg', `background-color:${DM.page} !important;`],
    ['.main-container, .dm-surface, .intro-section-td, .takeaways-bg, .sec-cta-section-td', `background-color:${DM.surface} !important;`],
    ['.dm-raised, .credit-bg, .ve-callout-td, .takeaway-card-cell, .speaker-card-inner', `background-color:${DM.raised} !important;border-color:${DM.line} !important;`],
    ['.dm-tint', `background-color:${p.tintDm} !important;border-color:${p.tintDm} !important;`],
    ['.dm-line', `border-color:${DM.line} !important;`],
    ['.dm-strong, .takeaway-title, .speaker-name, .section-heading, .ve-callout-td strong', `color:${DM.strong} !important;`],
    ['.dm-body, .body-copy-p, .ve-callout-td p', `color:${DM.body} !important;`],
    ['.dm-muted, .credit-text-cell', `color:${DM.muted} !important;`],
    ['.dm-accent, .speaker-role, .body-copy-p a', `color:${p.accentDm} !important;`],
    ['.dm-btn-invert', `background-color:${DM.strong} !important;border-color:${DM.strong} !important;`],
    ['.dm-btn-invert a', `color:${DM.page} !important;`],
    ['.dm-outline-invert', `background-color:transparent !important;border-color:${DM.strong} !important;`],
    ['.dm-outline-invert a', `color:${DM.strong} !important;`],
    ['.header-bar-bg', 'background-color:#FFFFFF !important;'],
  ];
  const block = (prefix) => rules
    .map(([sel, decl]) => `        ${sel.split(',').map((s) => `${prefix}${s.trim()}`).join(', ')} { ${decl} }`)
    .join('\n');
  return `        @media (prefers-color-scheme: dark) {
${block('    ')}
        }
${block('[data-ogsc] ')}
${block('[data-ogsb] ')}`;
}

// Common <head>: resets, Outlook settings, responsive rules, dark mode.
// Responsive and dark-mode CSS sit in separate <style> blocks so a client that
// rejects one block (e.g. over attribute selectors) still applies the other.
const HEAD_BOILERPLATE = (p) => `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
     <title>{{TITLE}} | HR.com Webcast</title>
    <!--[if mso]>
    <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

        /* === EMAIL RESETS === */
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
        u + #body a, #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; }
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #ECEEF0; }
    </style>
    <style>
        /* === RESPONSIVE === */
        @media screen and (max-width: 600px) {
            .email-outer-td { padding-top: 0 !important; padding-bottom: 0 !important; }
            .main-container { width: 100% !important; max-width: 100% !important; }
            .m-pad { padding-left: 20px !important; padding-right: 20px !important; }
            .hero-title { font-size: 27px !important; line-height: 34px !important; }
            .hero-meta { font-size: 13px !important; }
            .speakers-section-td { padding: 32px 12px 28px 12px !important; }
            .speaker-card-div { display: block !important; width: 100% !important; margin: 8px auto !important; }
            .stack-cell { display: block !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }
            .tile-cell { display: block !important; width: auto !important; margin: 0 0 10px 0 !important; }
            .frame-td { padding-left: 10px !important; padding-right: 10px !important; }
            .ticket-stub { border-right: 0 !important; border-bottom: 2px dashed #CBD5E1 !important; border-radius: 18px 18px 0 0 !important; }
            .ticket-main { border-radius: 0 0 18px 18px !important; }
            .split-left { border-radius: 18px 18px 0 0 !important; }
            .split-right { border-radius: 0 0 18px 18px !important; }
            .credit-stack-table, .credit-stack-table tbody, .credit-stack-table tr, .credit-badge-cell, .credit-text-cell { display: block !important; width: 100% !important; }
            .credit-badge-cell { text-align: center !important; padding-bottom: 12px !important; }
            .credit-text-cell { text-align: center !important; padding-left: 0 !important; padding-top: 0 !important; }
            .footer-inner-td { padding: 28px 16px 0 16px !important; }
        }
        @media screen and (max-width: 400px) {
            .hero-title { font-size: 23px !important; line-height: 30px !important; }
        }
    </style>
    <style>
        /* === DARK MODE === */
${darkCss(p)}
    </style>
    <!--[if mso]>
    <style type="text/css">
        body, table, td, p, a, h1, h2, h3, span { font-family: Arial, sans-serif !important; }
        .serif { font-family: Georgia, 'Times New Roman', serif !important; }
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
                                    <td align="center" style="border-radius:999px;background:${btnColor};mso-padding-alt:11px 30px;"
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

// =====================================================
// DESIGN SYSTEM
// Every variant shares the same copy, placeholders, links, CTA attributes and
// section order; only layout and styling differ.
//
// Client support rules followed throughout:
// - Table layout, inline styles, bgcolor fallback behind every gradient
// - Solid hex colors only (no rgba), so classic Outlook never drops a color
// - Buttons carry mso-padding-alt on the cell so Outlook keeps their size
// - Light sections tag themselves with dm-* classes for dark mode
// - Multi-column rows stack on phones via stack-cell / tile-cell
// =====================================================

const FONT = "'Roboto',Arial,Helvetica,sans-serif";
const SERIF = "Georgia,'Times New Roman',Times,serif";
const BRAND = ['#EF4A3D', '#FDB414', '#94C83D', '#4AC4D6'];
const BRAND_TEXT = ['#FFFFFF', '#1A1000', '#1A2A00', '#0D1F28'];
const ON_BRIGHT = '#0B1220';

// Per-event colors; *Dm values are the dark-mode counterparts
const PALETTES = {
  demo:       { accent: '#C01060', deep: '#3B0A24', tint: '#FCE8F1', line: '#F6C9DC', bright: '#FDB414', glowA: '#FDE2EE', glowB: '#FFEBD9', soft: '#F7D3E3', accentDm: '#F48FB9', tintDm: '#3A1528' },
  ondemand:   { accent: '#0F4A40', deep: '#062420', tint: '#E4F2EE', line: '#C3E1D9', bright: '#94C83D', glowA: '#E1F3EC', glowB: '#E6F6F9', soft: '#CDE6DF', accentDm: '#6FD1B8', tintDm: '#10302A' },
  standalone: { accent: '#1E7E8C', deep: '#0A262A', tint: '#E3F4F6', line: '#C2E5EA', bright: '#4AC4D6', glowA: '#E0F5F8', glowB: '#EAF1FF', soft: '#CBE8EC', accentDm: '#6FD6E3', tintDm: '#0F3136' },
  virtual:    { accent: '#02588E', deep: '#021F33', tint: '#E5F0F8', line: '#C4DCEE', bright: '#FDB414', glowA: '#E3EEFB', glowB: '#FFF4DC', soft: '#CFE2F1', accentDm: '#7CC4F5', tintDm: '#0D2A40' },
};

// Primary CTA: registration links get no tracking attributes, all others do
const ctaAttrs = (url) => (url.includes('__STORY_ID__') ? '' : ' data-cta="1" data-captcha="1"');
const SEC_ATTRS = ' data-cta="1" data-captcha="1"';
const cls = (c) => (c ? ` class="${c}"` : '');

// Hero meta copy (same text as EVENTS[*].metaLine); empty for OnDemand
const heroMeta = (ev, style, c = '') => (ev.metaLine
  ? `<p${cls(`hero-meta ${c}`.trim())} style="${style}">{{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend</p>`
  : '');
const splitMeta = (ev, dateStyle, freeStyle, dateCls = '', freeCls = '') => (ev.metaLine
  ? `<p${cls(`hero-meta ${dateCls}`.trim())} style="${dateStyle}">{{SPLIT_DATE_TIME}}</p>
                                        <p${cls(freeCls)} style="${freeStyle}">Free to Attend</p>`
  : '');

function btn({ href, attrs, bg, color, label, radius = '999px', pad = '14px 34px', size = 14, border = '', center = false, block = false, font = FONT, tdCls = '', aCls = '' }) {
  return `<table role="presentation" border="0" cellspacing="0" cellpadding="0"${block ? ' width="100%"' : ''}${center ? ' align="center"' : ''} style="margin:0${center ? ' auto' : ''};">
                                <tr>
                                    <td align="center" bgcolor="${bg}"${cls(tdCls)} style="border-radius:${radius};background-color:${bg};${border}mso-padding-alt:${pad};">
                                        <a href="${href}" target="_blank"${attrs}${cls(aCls)}
                                            style="font-size:${size}px;font-family:${font};color:${color};text-decoration:none;border-radius:${radius};padding:${pad};display:${block ? 'block' : 'inline-block'};font-weight:700;letter-spacing:0.3px;text-align:center;mso-padding-alt:0;">
                                            ${label}
                                        </a>
                                    </td>
                                </tr>
                            </table>`;
}
const primaryBtn = (ev, ctaText, opts) => btn({ href: ev.ctaUrl, attrs: ctaAttrs(ev.ctaUrl), label: ctaText, ...opts });
const secondaryBtn = (ev, opts) => btn({ href: ev.secondaryCtaUrl, attrs: SEC_ATTRS, label: ev.secondaryCtaLabel, ...opts });

const bar = (color, w, h, extra = '') => `<table role="presentation" border="0" cellpadding="0" cellspacing="0"${extra.includes('center') ? ' align="center"' : ''}><tr><td bgcolor="${color}" style="background-color:${color};width:${w}px;height:${h}px;border-radius:${Math.ceil(h / 2)}px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table>`;
const brandDots = (center = false) => `<table role="presentation" border="0" cellpadding="0" cellspacing="0"${center ? ' align="center"' : ''}><tr>${BRAND.map((c) => `<td style="padding:0 3px;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="${c}" style="background-color:${c};width:8px;height:8px;border-radius:4px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table></td>`).join('')}</tr></table>`;
const rule = (color, top = 0, weight = 1) => `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:${top}px;"><tr><td class="dm-line" style="border-top:${weight}px solid ${color};font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table>`;

const learnHeading = (color, extra = '', c = 'dm-muted') => `<p${cls(c)} style="margin:0 0 18px 0;font-family:${FONT};font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:2px;${extra}">What You'll Learn</p>`;
const learnTitle = (n, color = '#0F172A', extra = '') => `<span class="takeaway-title" style="font-family:${FONT};font-size:15px;font-weight:700;color:${color};line-height:23px;display:block;${extra}">{{LEARN${n}}}</span>`;

// Row of four takeaways; `row(n, i, isLast)` returns the inner <tr> content
const learnRows = (row) => [1, 2, 3, 4].map((n, i) => `
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>${row(n, i, n === 4)}</tr>
                            </table>`).join('');

// 2×2 grid; the tile is the cell itself so both tiles in a row share a height
function learnGrid(tile) {
  const cell = (i) => `<td class="tile-cell takeaway-card-cell" width="50%" valign="top" ${tile(i)}</td>`;
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="10" width="100%" style="border-collapse:separate;">
                                <tr>${cell(0)}${cell(1)}</tr>
                                <tr>${cell(2)}${cell(3)}</tr>
                            </table>`;
}

// Standard white section row
const section = (inner, { bg = '#FFFFFF', pad = '0 40px', align = 'left', c = 'dm-surface' } = {}) => `<tr>
                        <td align="${align}" valign="top"${cls(`${c} m-pad`.trim())} bgcolor="${bg}" style="background-color:${bg};padding:${pad};">
                            ${inner}
                        </td>
                    </tr>`;

const introSection = (bg = '#FFFFFF', pad = '40px 40px 8px 40px', c = '') => `<tr>
                        <td align="left" valign="top" class="intro-section-td m-pad${c ? ` ${c}` : ''}" bgcolor="${bg}" style="background-color:${bg};padding:${pad};">
                            {{INTRO}}
                        </td>
                    </tr>`;

function speakersBlock({ bg, eyebrow = '#94A3B8', heading = '#0F172A', headingFont = FONT, headingSize = 20, headingWeight = 800, headingCls = '' }) {
  return `<tr>
                        <td align="center" valign="top" class="speakers-bg speakers-section-td" bgcolor="${bg}"
                            style="background-color:${bg};padding:44px 24px 40px 24px;">
                            <p class="dm-muted"
                                style="margin:0 0 6px 0;font-family:${FONT};font-size:11px;font-weight:700;color:${eyebrow};text-transform:uppercase;letter-spacing:2px;text-align:center;">
                                Your expert hosts</p>
                            <h2${cls(`section-heading ${headingCls}`.trim())}
                                style="margin:0 0 26px 0;font-family:${headingFont};font-size:${headingSize}px;font-weight:${headingWeight};color:${heading};text-align:center;line-height:28px;">
                                Learn directly from industry leaders
                            </h2>
                            <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->

                         {{HOSTS_SECTION}}
                            <!--[if mso]></tr></table><![endif]-->

                        </td>
                    </tr>`;
}

// Host card shell: 260px inline-block cards; the App wraps them in 2-column Outlook cells
const hostShell = (bg, innerStyle, inner) => `
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width:260px;margin:8px 6px;">
    <tr>
        <td style="padding:0;">
            <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"${bg ? ` bgcolor="${bg}"` : ''} style="max-width:260px;min-width:260px;${bg ? `background-color:${bg};` : ''}${innerStyle}" class="speaker-card-inner">
${inner}
            </table>
        </td>
    </tr>
</table>
`;
const hostImg = (size, radius, extra = '') => `<img alt="{{H_ALT}}" src="{{H_IMG}}" width="${size}" height="${size}" style="display:block;width:${size}px;height:${size}px;object-fit:cover;border-radius:${radius};${extra}" />`;
const hostName = (color, extra = '', c = '') => `<span${cls(`speaker-name ${c}`.trim())} style="display:block;font-family:${FONT};font-size:16px;font-weight:800;color:${color};line-height:22px;${extra}">{{H_NAME}}</span>`;
const hostRole = (color, extra = '') => `<span class="speaker-role" style="display:block;font-family:${FONT};font-size:13px;font-weight:600;color:${color};line-height:19px;margin-top:4px;${extra}">{{H_TITLE}}</span>`;
const hostCentered = (img, name, role, pad = '26px 18px 24px 18px', top = '') => `
                <tr>
                    <td align="center" style="padding:${pad};">
                        ${top}${img}
                        ${name}
                        ${role}
                    </td>
                </tr>`;
const hostRow = (img, imgW, name, role, pad = 16) => `
                <tr>
                    <td style="padding:0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td width="${imgW}" valign="middle" style="width:${imgW}px;padding:${pad}px 0 ${pad}px ${pad}px;">${img}</td>
                                <td valign="middle" style="padding:${pad}px ${pad}px ${pad}px 14px;">
                                    ${name}
                                    ${role}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>`;

// Reuses the existing reminder copy; only swaps its band and link colors
const restyleReminder = (html, bg, link) => html
  .replace('background-color:#E8ECEF;', `background-color:${bg};`)
  .replace('color:#02588E;text-decoration:underline;', `color:${link};text-decoration:underline;`);

// ---------------------------------------------------------------------------
// VARIANTS
// cta: 'save' → "Save My Free Spot", 'register' → "Register Free" (OnDemand always "View OnDemand")
// ---------------------------------------------------------------------------
const VARIANTS = {
  // --- A: "Classic Editorial" — centered gradient hero, numbered brand badges
  A: {
    meta: { id: 'classic', label: 'Classic Editorial' },
    cta: 'save',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="center" valign="top" class="m-pad" bgcolor="${p.accent}"
                            style="background-color:${p.accent};background-image:linear-gradient(160deg, ${p.accent} 0%, ${p.deep} 100%);padding:52px 44px 48px 44px;text-align:center;">
                            ${brandDots(true)}
                            <h1 class="hero-title"
                                style="margin:22px 0 14px 0;font-family:${FONT};font-size:34px;font-weight:900;color:#FFFFFF;line-height:42px;text-align:center;letter-spacing:-0.5px;">
                               {{TITLE}}
                            </h1>
                            ${heroMeta(ev, `margin:0 0 28px 0;font-family:${FONT};font-size:15px;font-weight:500;color:#F1F5F9;line-height:22px;text-align:center;`)}
                            ${primaryBtn(ev, ctaText, { bg: '#FFFFFF', color: p.accent, pad: '15px 40px', center: true })}
                        </td>
                    </tr>`,
    intro: () => introSection('#FFFFFF', '44px 44px 8px 44px', 'dm-surface'),
    takeaways: () => section(`${learnHeading('#64748B')}
${learnRows((n, i, last) => `
                                    <td width="34" valign="top" style="width:34px;padding:0 0 ${last ? 0 : 16}px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" bgcolor="${BRAND[i]}" style="background-color:${BRAND[i]};border-radius:8px;width:30px;height:30px;font-family:${FONT};font-size:12px;font-weight:800;color:${BRAND_TEXT[i]};line-height:30px;text-align:center;">0${n}</td></tr></table>
                                    </td>
                                    <td valign="middle" style="padding:0 0 ${last ? 0 : 16}px 14px;">${learnTitle(n, '#1E293B')}</td>`)}`, { pad: '24px 44px 32px 44px', c: 'takeaways-bg dm-surface' }),
    secCta: (ev, p) => section(secondaryBtn(ev, { bg: '#FFFFFF', color: p.accent, border: `border:2px solid ${p.accent};`, pad: '12px 32px', center: true, tdCls: 'dm-surface', aCls: 'dm-accent' }), { pad: '4px 44px 44px 44px', align: 'center', c: 'sec-cta-section-td dm-surface' }),
    speakers: () => speakersBlock({ bg: '#F6F8FB' }),
    ve: (p) => veCallout(p.tint, p.line, p.accent),
    reminder: (html, p) => restyleReminder(html, '#F6F8FB', p.accent),
    hostCard: (p) => hostShell('#FFFFFF', 'border:1px solid #E6EBF1;border-radius:16px;', hostCentered(
      hostImg(88, '50%', 'margin:0 auto 14px auto;border:3px solid #ECEEF0;'), hostName('#0F172A'), hostRole(p.accent))),
  },

  // --- B: "Bold Magazine" — navy hero, oversized left title, colored left-border cards
  B: {
    meta: { id: 'bold', label: 'Bold Magazine' },
    cta: 'register',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="#0F172A"
                            style="background-color:#0F172A;padding:56px 44px 48px 44px;">
                            ${bar(p.bright, 44, 4)}
                            <h1 class="hero-title"
                                style="margin:22px 0 14px 0;font-family:${FONT};font-size:38px;font-weight:900;color:#FFFFFF;line-height:44px;text-align:left;letter-spacing:-1px;">
                               {{TITLE}}
                            </h1>
                            ${heroMeta(ev, `margin:0 0 30px 0;font-family:${FONT};font-size:15px;font-weight:500;color:#A9B4C4;line-height:22px;`)}
                            ${primaryBtn(ev, ctaText, { bg: p.bright, color: ON_BRIGHT, pad: '15px 36px' })}
                        </td>
                    </tr>`,
    intro: (ev, p) => section(`<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="4" bgcolor="${p.accent}" style="width:4px;background-color:${p.accent};font-size:0;line-height:0;">&nbsp;</td>
                                    <td style="padding:0 0 0 20px;">
                                        {{INTRO}}
                                    </td>
                                </tr>
                            </table>`, { pad: '44px 44px 8px 44px', c: 'intro-section-td dm-surface' }),
    takeaways: () => section(`${learnHeading('#64748B')}
${learnRows((n, i, last) => `
                                    <td style="padding:0 0 ${last ? 0 : 10}px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr><td width="4" bgcolor="${BRAND[i]}" style="width:4px;background-color:${BRAND[i]};font-size:0;line-height:0;">&nbsp;</td><td class="takeaway-card-cell" bgcolor="#F6F8FB" style="background-color:#F6F8FB;border-radius:0 10px 10px 0;padding:14px 18px;">${learnTitle(n, '#1E293B')}</td></tr>
                                        </table>
                                    </td>`)}`, { pad: '24px 44px 28px 44px', c: 'takeaways-bg dm-surface' }),
    secCta: (ev) => section(secondaryBtn(ev, { bg: '#0F172A', color: '#FFFFFF', radius: '12px', pad: '16px 28px', block: true, tdCls: 'dm-btn-invert' }), { pad: '4px 44px 44px 44px', c: 'sec-cta-section-td dm-surface' }),
    speakers: () => speakersBlock({ bg: '#0F172A', eyebrow: '#8B97A8', heading: '#FFFFFF' }),
    ve: (p) => veCallout('#F1F5F9', '#E2E8F0', p.accent),
    reminder: (html, p) => restyleReminder(html, '#F1F5F9', p.accent),
    hostCard: (p) => hostShell('#1E293B', 'border:1px solid #334155;border-radius:12px;', hostRow(
      hostImg(64, '12px'), 80, hostName('#FFFFFF', 'font-size:15px;line-height:20px;'), hostRole(p.bright, 'font-size:12px;line-height:18px;'))),
  },

  // --- C: "Minimal Clean" — all-white, centered type, checkmark takeaways
  C: {
    meta: { id: 'minimal', label: 'Minimal Clean' },
    cta: 'save',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="center" valign="top" class="dm-surface m-pad" bgcolor="#FFFFFF"
                            style="background-color:#FFFFFF;padding:60px 48px 48px 48px;text-align:center;border-bottom:1px solid #EEF2F6;">
                            ${bar(p.accent, 40, 3, 'center')}
                            <h1 class="hero-title dm-strong"
                                style="margin:24px 0 14px 0;font-family:${FONT};font-size:34px;font-weight:900;color:#0F172A;line-height:42px;text-align:center;letter-spacing:-0.5px;">
                               {{TITLE}}
                            </h1>
                            ${heroMeta(ev, `margin:0 0 30px 0;font-family:${FONT};font-size:15px;font-weight:500;color:#64748B;line-height:22px;text-align:center;`, 'dm-muted')}
                            ${primaryBtn(ev, ctaText, { bg: p.accent, color: '#FFFFFF', pad: '15px 40px', center: true })}
                        </td>
                    </tr>`,
    intro: () => introSection('#FFFFFF', '44px 48px 8px 48px', 'dm-surface'),
    takeaways: (ev, p) => section(`${learnHeading('#64748B')}
${learnRows((n, i, last) => `
                                    <td width="26" valign="top" class="dm-accent" style="width:26px;padding:0 0 ${last ? 0 : 14}px 0;font-family:${FONT};font-size:17px;font-weight:700;color:${p.accent};line-height:23px;">&#10003;</td>
                                    <td valign="top" style="padding:0 0 ${last ? 0 : 14}px 8px;">${learnTitle(n, '#1E293B', 'font-weight:600;')}</td>`)}`, { pad: '24px 48px 32px 48px', c: 'takeaways-bg dm-surface' }),
    secCta: (ev, p) => section(secondaryBtn(ev, { bg: p.accent, color: '#FFFFFF', pad: '13px 34px', center: true }), { pad: '4px 48px 48px 48px', align: 'center', c: 'sec-cta-section-td dm-surface' }),
    speakers: () => speakersBlock({ bg: '#F8FAFC' }),
    ve: (p) => veCallout('#F8FAFC', '#E2E8F0', p.accent),
    reminder: (html, p) => restyleReminder(html, '#F8FAFC', p.accent),
    hostCard: () => hostShell('', '', hostCentered(
      hostImg(104, '50%', 'margin:0 auto 16px auto;'), hostName('#0F172A'), hostRole('#64748B', 'font-weight:500;'), '20px 16px')),
  },

  // --- D: "Split Accent" — two-panel hero (title | date + CTA), top-bar takeaway cards
  D: {
    meta: { id: 'split', label: 'Split Accent' },
    cta: 'register',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="center" valign="top" class="dm-page" bgcolor="#EEF2F6" style="background-color:#EEF2F6;padding:24px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="stack-cell split-left dm-surface" width="56%" valign="middle" bgcolor="#FFFFFF"
                                        style="background-color:#FFFFFF;border-radius:18px 0 0 18px;padding:40px 28px 40px 32px;">
                                        ${bar(p.accent, 32, 4)}
                                        <h1 class="hero-title dm-strong"
                                            style="margin:18px 0 0 0;font-family:${FONT};font-size:27px;font-weight:900;color:#0F172A;line-height:35px;text-align:left;letter-spacing:-0.3px;">
                                           {{TITLE}}
                                        </h1>
                                    </td>
                                    <td class="stack-cell split-right" width="44%" valign="middle" align="center" bgcolor="${p.accent}"
                                        style="background-color:${p.accent};background-image:linear-gradient(160deg, ${p.accent} 0%, ${p.deep} 100%);border-radius:0 18px 18px 0;padding:36px 22px;text-align:center;">
                                        ${splitMeta(ev, `margin:0;font-family:${FONT};font-size:15px;font-weight:700;color:#FFFFFF;line-height:22px;text-align:center;`, `margin:6px 0 20px 0;font-family:${FONT};font-size:12px;font-weight:500;color:#E2E8F0;line-height:18px;text-align:center;`)}
                                        ${primaryBtn(ev, ctaText, { bg: '#FFFFFF', color: p.accent, pad: '13px 26px', size: 13, center: true })}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    intro: () => introSection('#FFFFFF', '40px 40px 8px 40px', 'dm-surface'),
    takeaways: () => section(`${learnHeading('#64748B')}
${learnRows((n, i, last) => `
                                    <td style="padding:0 0 ${last ? 0 : 10}px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="takeaway-card-cell" bgcolor="#F6F8FB" style="background-color:#F6F8FB;border:1px solid #E6EBF1;border-radius:12px;overflow:hidden;">
                                            <tr><td bgcolor="${BRAND[i]}" style="background-color:${BRAND[i]};height:3px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>
                                            <tr>
                                                <td style="padding:14px 18px;">${learnTitle(n, '#1E293B')}</td>
                                            </tr>
                                        </table>
                                    </td>`)}`, { pad: '24px 40px 28px 40px', c: 'takeaways-bg dm-surface' }),
    secCta: (ev, p) => section(secondaryBtn(ev, { bg: p.accent, color: '#FFFFFF', pad: '14px 36px', center: true }), { bg: '#F1F5F9', pad: '28px 40px', align: 'center', c: 'sec-cta-section-td dm-raised' }),
    speakers: () => speakersBlock({ bg: '#FFFFFF' }),
    ve: () => veCallout('#FFF8E6', '#FDE7B0', '#8A5A00'),
    reminder: (html, p) => restyleReminder(html, '#F1F5F9', p.accent),
    hostCard: (p) => hostShell('#F6F8FB', 'border:1px solid #E6EBF1;border-radius:14px;overflow:hidden;', `
                <tr><td bgcolor="${p.accent}" style="background-color:${p.accent};background-image:linear-gradient(90deg, ${BRAND.join(', ')});height:4px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>${hostCentered(
      hostImg(84, '50%', 'margin:0 auto 14px auto;border:3px solid #FFFFFF;'), hostName('#0F172A'), hostRole(p.accent), '22px 16px')}`),
  },

  // --- E: "Aurora Card" — soft gradient backdrop, floating white hero card, 2×2 tiles
  E: {
    meta: { id: 'aurora', label: 'Aurora Card' },
    cta: 'register',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="center" valign="top" class="dm-page" bgcolor="${p.glowA}"
                            style="background-color:${p.glowA};background-image:linear-gradient(135deg, ${p.glowA} 0%, #FFFFFF 50%, ${p.glowB} 100%);padding:36px 28px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1px solid ${p.line};border-radius:20px;padding:38px 34px;">
                                        ${bar(p.accent, 32, 4)}
                                        <h1 class="hero-title dm-strong"
                                            style="margin:18px 0 16px 0;font-family:${FONT};font-size:31px;font-weight:900;color:#0F172A;line-height:39px;text-align:left;letter-spacing:-0.5px;">
                                           {{TITLE}}
                                        </h1>
                                        ${ev.metaLine ? `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:0 0 24px 0;"><tr><td class="dm-tint" bgcolor="${p.tint}" style="background-color:${p.tint};border-radius:999px;padding:6px 14px;">${heroMeta(ev, `margin:0;font-family:${FONT};font-size:13px;font-weight:600;color:${p.accent};line-height:20px;`, 'dm-accent')}</td></tr></table>` : ''}
                                        ${primaryBtn(ev, ctaText, { bg: p.accent, color: '#FFFFFF' })}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    intro: () => introSection('#FFFFFF', '40px 40px 8px 40px', 'dm-surface'),
    takeaways: (ev, p) => section(`${learnHeading('#64748B', 'padding:0 10px;margin-bottom:6px;')}
                            ${learnGrid((i) => `bgcolor="#F6F8FB" style="background-color:#F6F8FB;border:1px solid #E6EBF1;border-radius:16px;padding:18px 18px 20px 18px;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="dm-tint" bgcolor="${p.tint}" style="background-color:${p.tint};border-radius:999px;padding:3px 10px;"><span class="dm-accent" style="font-family:${FONT};font-size:12px;font-weight:800;color:${p.accent};letter-spacing:1px;line-height:16px;">0${i + 1}</span></td></tr></table>
                                    ${learnTitle(i + 1, '#0F172A', 'margin-top:12px;')}`)}`, { pad: '24px 30px 20px 30px', c: 'takeaways-bg dm-surface' }),
    secCta: (ev, p) => section(secondaryBtn(ev, { bg: '#FFFFFF', color: p.accent, border: `border:2px solid ${p.accent};`, pad: '11px 30px', center: true, tdCls: 'dm-surface', aCls: 'dm-accent' }), { pad: '4px 40px 40px 40px', align: 'center', c: 'sec-cta-section-td dm-surface' }),
    speakers: () => speakersBlock({ bg: '#F6F8FB' }),
    ve: (p) => veCallout(p.tint, p.line, p.accent),
    reminder: (html, p) => restyleReminder(html, '#F6F8FB', p.accent),
    hostCard: (p) => hostShell('#FFFFFF', 'border:1px solid #E6EBF1;border-radius:18px;', hostCentered(`<table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0 auto 14px auto;">
                            <tr><td bgcolor="${p.accent}" style="padding:3px;border-radius:50%;background-color:${p.accent};background-image:linear-gradient(135deg, ${p.accent} 0%, ${p.bright} 100%);">${hostImg(86, '50%', 'border:3px solid #FFFFFF;')}</td></tr>
                        </table>`, hostName('#0F172A'), hostRole(p.accent))),
  },

  // --- F: "Midnight Frame" — deep hero and frame around a white content card
  F: {
    meta: { id: 'midnight', label: 'Midnight Frame' },
    cta: 'register',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${p.deep}"
                            style="background-color:${p.deep};padding:52px 40px 44px 40px;">
                            ${brandDots()}
                            <h1 class="hero-title"
                                style="margin:20px 0 14px 0;font-family:${FONT};font-size:35px;font-weight:900;color:#FFFFFF;line-height:43px;text-align:left;letter-spacing:-0.5px;">
                               {{TITLE}}
                            </h1>
                            ${heroMeta(ev, `margin:0 0 28px 0;font-family:${FONT};font-size:14px;font-weight:500;color:#C3CAD5;line-height:22px;letter-spacing:0.3px;`)}
                            ${primaryBtn(ev, ctaText, { bg: p.bright, color: ON_BRIGHT, pad: '15px 36px' })}
                        </td>
                    </tr>`,
    intro: (ev, p) => `<tr>
                        <td class="frame-td" bgcolor="${p.deep}" style="background-color:${p.deep};padding:0 20px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="intro-section-td dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:18px 18px 0 0;padding:38px 34px 8px 34px;">
                                        {{INTRO}}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    takeaways: (ev, p) => `<tr>
                        <td class="frame-td" bgcolor="${p.deep}" style="background-color:${p.deep};padding:0 20px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="takeaways-bg dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:24px 34px 8px 34px;">
                                        ${learnHeading('#64748B')}
${learnRows((n) => `
                                                <td width="44" valign="top" class="dm-line dm-accent" style="width:44px;border-top:1px solid #EDF0F4;padding:14px 0;font-family:${FONT};font-size:13px;font-weight:800;color:${p.accent};line-height:23px;letter-spacing:1px;">0${n}</td>
                                                <td valign="top" class="dm-line" style="border-top:1px solid #EDF0F4;padding:14px 0;">${learnTitle(n, '#1E293B')}</td>`)}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    secCta: (ev, p) => `<tr>
                        <td class="frame-td" bgcolor="${p.deep}" style="background-color:${p.deep};padding:0 20px 24px 20px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="sec-cta-section-td dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:0 0 18px 18px;padding:16px 34px 36px 34px;">
                                        ${secondaryBtn(ev, { bg: p.deep, color: '#FFFFFF', pad: '13px 30px', tdCls: 'dm-btn-invert' })}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    speakers: (p) => speakersBlock({ bg: p.deep, eyebrow: '#9AA3B2', heading: '#FFFFFF' }),
    ve: (p) => veCallout('#F1F5F9', '#E2E8F0', p.accent),
    reminder: (html, p) => restyleReminder(html, '#F1F5F9', p.accent),
    hostCard: (p) => hostShell('', `border:1px solid #3A4556;border-radius:14px;`, hostRow(
      hostImg(64, '50%', `border:2px solid ${p.bright};`), 80, hostName('#FFFFFF', 'font-size:15px;line-height:20px;'), hostRole(p.bright, 'font-size:12px;line-height:18px;'))),
  },

  // --- G: "Editorial Serif" — warm paper tone, serif headlines, hairline rules
  G: {
    meta: { id: 'editorial', label: 'Editorial Serif' },
    cta: 'register',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="left" valign="top" class="dm-surface m-pad" bgcolor="#FAF7F2"
                            style="background-color:#FAF7F2;padding:40px 44px 0 44px;">
                            ${rule('#111827', 0, 2)}
                            ${heroMeta(ev, `margin:18px 0 0 0;font-family:${FONT};font-size:12px;font-weight:700;color:${p.accent};line-height:18px;text-transform:uppercase;letter-spacing:1.5px;`, 'dm-accent')}
                            <h1 class="hero-title serif dm-strong"
                                style="margin:14px 0 26px 0;font-family:${SERIF};font-size:38px;font-weight:700;color:#111827;line-height:46px;text-align:left;letter-spacing:-0.3px;">
                               {{TITLE}}
                            </h1>
                            ${primaryBtn(ev, ctaText, { bg: '#111827', color: '#FFFFFF', radius: '2px', pad: '15px 30px', tdCls: 'dm-btn-invert' })}
                            ${rule('#E7E0D4', 36)}
                        </td>
                    </tr>`,
    intro: () => introSection('#FAF7F2', '32px 44px 6px 44px', 'dm-surface'),
    takeaways: (ev, p) => section(`<p class="section-heading serif" style="margin:0 0 10px 0;font-family:${SERIF};font-size:23px;font-style:italic;font-weight:400;color:#111827;line-height:30px;">What You'll Learn</p>
${learnRows((n, i, last) => `
                                    <td width="52" valign="top" class="dm-line dm-accent serif" style="width:52px;border-top:1px solid #E7E0D4;${last ? 'border-bottom:1px solid #E7E0D4;' : ''}padding:16px 0;font-family:${SERIF};font-size:26px;font-weight:400;color:${p.accent};line-height:28px;">0${n}</td>
                                    <td valign="top" class="dm-line" style="border-top:1px solid #E7E0D4;${last ? 'border-bottom:1px solid #E7E0D4;' : ''}padding:18px 0 16px 0;">${learnTitle(n, '#111827', 'font-weight:600;line-height:24px;')}</td>`)}`, { bg: '#FAF7F2', pad: '24px 44px 32px 44px', c: 'takeaways-bg dm-surface' }),
    secCta: (ev) => section(secondaryBtn(ev, { bg: '#FAF7F2', color: '#111827', radius: '2px', pad: '12px 26px', border: 'border:1.5px solid #111827;', tdCls: 'dm-outline-invert' }), { bg: '#FAF7F2', pad: '0 44px 44px 44px', c: 'sec-cta-section-td dm-surface' }),
    speakers: (p) => speakersBlock({ bg: '#F3EEE6', eyebrow: p.accent, heading: '#111827', headingFont: SERIF, headingSize: 23, headingWeight: 700, headingCls: 'serif' }),
    ve: (p) => veCallout('#F3EEE6', '#E7E0D4', p.accent),
    reminder: (html) => restyleReminder(html, '#F3EEE6', '#111827'),
    hostCard: (p) => hostShell('', '', hostCentered(
      hostImg(104, '6px', 'margin:0 auto 16px auto;'),
      hostName('#111827', `font-family:${SERIF};font-size:18px;font-weight:700;line-height:24px;`, 'serif'),
      hostRole(p.accent, 'font-size:11px;text-transform:uppercase;letter-spacing:1.2px;margin-top:6px;'), '20px 16px')),
  },

  // --- H: "Bento Grid" — rounded tiles on a cool canvas, colored takeaway tiles
  H: {
    meta: { id: 'bento', label: 'Bento Grid' },
    cta: 'register',
    hero: (ev, p, ctaText) => {
      const ctaTile = (width) => `<td class="tile-cell" width="${width}" valign="middle" align="center" bgcolor="${p.deep}" style="background-color:${p.deep};border-radius:20px;padding:26px 20px;">
                                        ${primaryBtn(ev, ctaText, { bg: p.bright, color: ON_BRIGHT, center: true })}
                                    </td>`;
      const lower = ev.metaLine
        ? `<td class="tile-cell dm-surface" width="50%" valign="middle" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:20px;padding:22px 24px;">
                                        ${splitMeta(ev, `margin:0;font-family:${FONT};font-size:16px;font-weight:800;color:#0F172A;line-height:24px;`, `margin:6px 0 0 0;font-family:${FONT};font-size:13px;font-weight:600;color:${p.accent};line-height:20px;`, 'dm-strong', 'dm-accent')}
                                    </td>
                                    ${ctaTile('50%')}`
        : ctaTile('100%');
      return `<tr>
                        <td align="center" valign="top" class="dm-page" bgcolor="#EEF2F6" style="background-color:#EEF2F6;padding:10px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="10" width="100%" style="border-collapse:separate;">
                                <tr>
                                    <td colspan="2" class="m-pad" bgcolor="${p.accent}" style="background-color:${p.accent};background-image:linear-gradient(135deg, ${p.accent} 0%, ${p.deep} 100%);border-radius:22px;padding:42px 34px;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr>${BRAND.map((c) => `<td bgcolor="${c}" style="background-color:${c};width:18px;height:4px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td>`).join('')}</tr></table>
                                        <h1 class="hero-title"
                                            style="margin:18px 0 0 0;font-family:${FONT};font-size:33px;font-weight:900;color:#FFFFFF;line-height:41px;text-align:left;letter-spacing:-0.5px;">
                                           {{TITLE}}
                                        </h1>
                                    </td>
                                </tr>
                                <tr>
                                    ${lower}
                                </tr>
                            </table>
                        </td>
                    </tr>`;
    },
    intro: () => `<tr>
                        <td align="center" valign="top" class="dm-page" bgcolor="#EEF2F6" style="background-color:#EEF2F6;padding:0 20px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="intro-section-td dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:22px;padding:34px 34px 30px 34px;">
                                        {{INTRO}}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    takeaways: () => {
      const tints = ['#FDECEA', '#FFF5DB', '#EEF7E1', '#E3F6F9'];
      return section(`${learnHeading('#64748B', 'margin:0;padding:6px 10px 0 10px;')}
                            ${learnGrid((i) => `bgcolor="${tints[i]}" style="background-color:${tints[i]};border-radius:20px;padding:22px 20px;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" bgcolor="${BRAND[i]}" style="background-color:${BRAND[i]};border-radius:10px;width:32px;height:32px;font-family:${FONT};font-size:13px;font-weight:800;color:${BRAND_TEXT[i]};line-height:32px;text-align:center;">0${i + 1}</td></tr></table>
                                    ${learnTitle(i + 1, '#0F172A', 'margin-top:14px;')}`)}`, { bg: '#EEF2F6', pad: '18px 10px 0 10px', c: 'dm-page' }).replace(' m-pad', '');
    },
    secCta: (ev, p) => section(secondaryBtn(ev, { bg: p.deep, color: '#FFFFFF', radius: '16px', pad: '16px 24px', block: true }), { bg: '#EEF2F6', pad: '0 20px 28px 20px', c: 'dm-page' }),
    speakers: () => speakersBlock({ bg: '#EEF2F6' }),
    ve: (p) => veCallout('#FFFFFF', '#E2E8F0', p.accent),
    reminder: (html, p) => restyleReminder(html, '#EEF2F6', p.accent),
    hostCard: (p) => hostShell('#FFFFFF', 'border-radius:20px;overflow:hidden;', `${hostRow(
      hostImg(66, '18px'), 84, hostName('#0F172A', 'font-size:15px;line-height:20px;'), hostRole(p.accent, 'font-size:12px;line-height:18px;'), 18)}
                <tr><td bgcolor="${p.accent}" style="background-color:${p.accent};background-image:linear-gradient(90deg, ${BRAND.join(', ')});height:4px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>`),
  },

  // --- I: "Event Pass" — ticket-style hero with a date stub, checklist takeaways, badge host cards
  I: {
    meta: { id: 'pass', label: 'Event Pass' },
    cta: 'register',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="center" valign="top" bgcolor="${p.deep}"
                            style="background-color:${p.deep};background-image:linear-gradient(160deg, ${p.accent} 0%, ${p.deep} 100%);padding:40px 24px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="stack-cell ticket-stub dm-tint" width="34%" valign="middle" align="center" bgcolor="${p.tint}"
                                        style="background-color:${p.tint};border-right:2px dashed ${p.line};border-radius:18px 0 0 18px;padding:28px 16px;text-align:center;">
                                        ${ev.metaLine
                                          ? splitMeta(ev, `margin:0;font-family:${FONT};font-size:15px;font-weight:800;color:${p.accent};line-height:22px;text-align:center;`, `margin:8px 0 0 0;font-family:${FONT};font-size:12px;font-weight:600;color:#475569;line-height:18px;text-align:center;`, 'dm-accent', 'dm-muted')
                                          : `<p class="dm-accent" style="margin:0;font-family:${FONT};font-size:12px;font-weight:800;color:${p.accent};line-height:18px;text-transform:uppercase;letter-spacing:1.5px;text-align:center;">${ev.label}</p>`}
                                    </td>
                                    <td class="stack-cell ticket-main dm-surface" width="66%" valign="middle" bgcolor="#FFFFFF"
                                        style="background-color:#FFFFFF;border-radius:0 18px 18px 0;padding:30px 26px;">
                                        <h1 class="hero-title dm-strong"
                                            style="margin:0 0 20px 0;font-family:${FONT};font-size:25px;font-weight:900;color:#0F172A;line-height:33px;text-align:left;letter-spacing:-0.3px;">
                                           {{TITLE}}
                                        </h1>
                                        ${primaryBtn(ev, ctaText, { bg: p.accent, color: '#FFFFFF', pad: '13px 28px' })}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    intro: () => introSection('#FFFFFF', '40px 40px 8px 40px', 'dm-surface'),
    takeaways: (ev, p) => section(`${learnHeading('#64748B')}
${learnRows((n, i, last) => `
                                    <td width="24" valign="top" style="width:24px;padding:0 0 ${last ? 0 : 14}px 0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" bgcolor="${p.accent}" style="background-color:${p.accent};border-radius:12px;width:24px;height:24px;font-family:${FONT};font-size:12px;font-weight:700;color:#FFFFFF;line-height:24px;text-align:center;">&#10003;</td></tr></table>
                                    </td>
                                    <td valign="top" style="padding:0 0 ${last ? 0 : 14}px 14px;">${learnTitle(n, '#1E293B')}</td>`)}`, { pad: '18px 40px 30px 40px', c: 'takeaways-bg dm-surface' }),
    secCta: (ev, p) => section(secondaryBtn(ev, { bg: p.tint, color: p.accent, border: `border:1px solid ${p.line};`, pad: '12px 32px', center: true, tdCls: 'dm-tint', aCls: 'dm-accent' }), { pad: '0 40px 40px 40px', align: 'center', c: 'sec-cta-section-td dm-surface' }),
    speakers: () => speakersBlock({ bg: '#F8FAFC' }),
    ve: (p) => veCallout(p.tint, p.line, p.accent),
    reminder: (html, p) => restyleReminder(html, '#F1F5F9', p.accent),
    hostCard: (p) => hostShell('#FFFFFF', 'border:1.5px dashed #CBD5E1;border-radius:16px;', hostCentered(
      hostImg(84, '50%', `margin:0 auto 14px auto;border:3px solid ${p.tint};`), hostName('#0F172A'), hostRole(p.accent), '14px 16px 24px 16px',
      `<table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0 auto 16px auto;"><tr><td bgcolor="#CBD5E1" style="background-color:#CBD5E1;width:36px;height:6px;border-radius:3px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table>
                        `)),
  },

  // --- J: "Color Block" — full-bleed brand color hero, offset brand bars, dark takeaways band
  J: {
    meta: { id: 'colorblock', label: 'Color Block' },
    cta: 'register',
    hero: (ev, p, ctaText) => `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${p.accent}"
                            style="background-color:${p.accent};padding:56px 40px 50px 40px;">
                            <h1 class="hero-title"
                                style="margin:0 0 16px 0;font-family:${FONT};font-size:40px;font-weight:900;color:#FFFFFF;line-height:46px;text-align:left;letter-spacing:-1px;">
                               {{TITLE}}
                            </h1>
                            ${heroMeta(ev, `margin:0 0 30px 0;font-family:${FONT};font-size:15px;font-weight:500;color:#F1F5F9;line-height:22px;`)}
                            ${primaryBtn(ev, ctaText, { bg: '#FFFFFF', color: p.accent, radius: '6px', pad: '15px 32px' })}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0;font-size:0;line-height:0;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>${[40, 25, 20, 15].map((w, i) => `<td width="${w}%" bgcolor="${BRAND[i]}" style="background-color:${BRAND[i]};height:10px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td>`).join('')}</tr>
                            </table>
                        </td>
                    </tr>`,
    intro: () => introSection('#FFFFFF', '42px 40px 36px 40px', 'dm-surface'),
    takeaways: (ev, p) => `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${p.deep}"
                            style="background-color:${p.deep};padding:42px 40px 12px 40px;">
                            ${learnHeading(p.bright, 'margin-bottom:22px;', '')}
${learnRows((n, i) => `
                                    <td width="56" valign="top" style="width:56px;padding:0 0 20px 0;font-family:${FONT};font-size:30px;font-weight:900;color:${BRAND[i]};line-height:30px;">0${n}</td>
                                    <td valign="top" style="padding:3px 0 20px 0;">${learnTitle(n, '#FFFFFF', 'font-size:16px;font-weight:600;line-height:24px;')}</td>`)}
                        </td>
                    </tr>`,
    secCta: (ev, p) => `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${p.deep}" style="background-color:${p.deep};padding:8px 40px 46px 40px;">
                            ${secondaryBtn(ev, { bg: p.bright, color: ON_BRIGHT, radius: '6px', pad: '13px 28px' })}
                        </td>
                    </tr>`,
    speakers: () => speakersBlock({ bg: '#FFFFFF' }),
    ve: (p) => veCallout(p.tint, p.line, p.accent),
    reminder: (html, p) => restyleReminder(html, '#F1F5F9', p.accent),
    hostCard: (p) => hostShell(p.tint, `border-left:6px solid ${p.accent};border-radius:4px;`, hostRow(
      hostImg(66, '50%', 'border:3px solid #FFFFFF;'), 82, hostName('#0F172A', 'font-size:15px;line-height:20px;'), hostRole(p.accent, 'font-size:12px;line-height:18px;'), 18)),
  },
};


// =====================================================
// TEMPLATE ASSEMBLER — Builds complete HTML per variant
// =====================================================

function buildTemplate(eventKey, variantKey) {
  const ev = EVENTS[eventKey];
  const v = VARIANTS[variantKey];
  const p = PALETTES[eventKey];
  const ctaText = eventKey === 'ondemand'
    ? ev.ctaText
    : (v.cta === 'save' ? 'Save My Free Spot &rarr;' : 'Register Free &rarr;');

  let body = '';
  body += RAINBOW(3);
  body += '\n' + HEADER_BAR(ev.label);
  body += '\n' + v.hero(ev, p, ctaText);
  body += '\n' + v.intro(ev, p);
  body += '\n' + v.takeaways(ev, p);
  body += '\n' + v.secCta(ev, p);
  body += '\n' + v.speakers(p);
  // VE Callout (demo & virtual only)
  if (ev.hasVE) body += '\n' + v.ve(p);
  // Registration reminder (not on ondemand)
  if (ev.regReminder) body += '\n' + v.reminder(ev.regReminder(), p);
  // Credit section placeholder
  body += '\n                   {{CREDIT_SECTION}}';
  body += '\n' + FOOTER;

  return DOC_OPEN(HEAD_BOILERPLATE(p)) + '\n' + body + '\n' + DOC_CLOSE;
}


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
    variants: Object.keys(VARIANTS).map(vk => ({
      id: VARIANTS[vk].meta.id,
      label: VARIANTS[vk].meta.label,
      html: buildTemplate(eventKey, vk),
      hostCard: VARIANTS[vk].hostCard(PALETTES[eventKey]),
    }))
  };
});


// =====================================================
// BACKWARD-COMPATIBLE EXPORTS
// =====================================================

// Default HOST_CARD (Classic) for backward compatibility
export const HOST_CARD = TEMPLATES.demo.variants[0].hostCard;

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
