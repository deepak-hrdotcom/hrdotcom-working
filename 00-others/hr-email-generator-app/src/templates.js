// ============================================================================
// HR.com Email Template System — v5.0.0
// 10 visual designs per event type (40 total templates)
// All designs share identical placeholders, links, tracking attributes and copy
// Built for dark mode, classic + new Outlook, Gmail, Apple Mail and mobile
// ============================================================================

// -------------------------------------------------------
// COLOR + TYPE FOUNDATIONS
// -------------------------------------------------------

// Dark-mode surface/text colors shared by every template
const DM = { page: '#0D1117', surface: '#161B22', raised: '#1F2630', line: '#30363D', strong: '#F0F3F6', body: '#C9D1D9', muted: '#8B949E' };

const FONT = "'Roboto',Arial,Helvetica,sans-serif";
const SERIF = "Georgia,'Times New Roman',Times,serif";
const BRAND = ['#EF4A3D', '#FDB414', '#94C83D', '#4AC4D6'];
const BRAND_TEXT = ['#FFFFFF', '#1A1000', '#1A2A00', '#0D1F28'];
const ON_BRIGHT = '#0B1220';
const INK = '#0F172A';

// Display typefaces (one per design). They load in Apple Mail, iOS, Outlook for Mac and
// Samsung Mail; everywhere else the stack falls back to Roboto/Arial (or Georgia for serifs).
// Client branding removes them (brand.js) so the client's own font takes over.
const DISPLAY_FONTS = {
  'Plus Jakarta Sans': 'wght@700;800',
  'Inter Tight': 'wght@800;900',
  'DM Serif Display': 'ital@0;1',
  'Space Grotesk': 'wght@500;700',
  'Sora': 'wght@600;700',
  'Manrope': 'wght@600;800',
  'Fraunces': 'ital,wght@0,700;1,400',
  'Bricolage Grotesque': 'wght@700;800',
  'Anton': '',
  'Outfit': 'wght@600;700;800',
  'Archivo': 'wght@700;800',
  'Figtree': 'wght@500;700;800',
};
export const DISPLAY_FONT_NAMES = Object.keys(DISPLAY_FONTS);
const sans = (name) => `'${name}',${FONT}`;
const serif = (name) => `'${name}',${SERIF}`;
const fontImport = (name) => (name
  ? `        @import url('https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}${DISPLAY_FONTS[name] ? `:${DISPLAY_FONTS[name]}` : ''}&display=swap'); /* display-font */\n`
  : '');

// Hex color mixing for derived shades (solid hex only, so Outlook keeps every color)
const toRgb = (hex) => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};
const toHex = (rgb) => '#' + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase();
const mix = (a, b, t) => { const x = toRgb(a), y = toRgb(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)); };

// -------------------------------------------------------
// HEAD: resets, Outlook settings, responsive rules, dark mode
// -------------------------------------------------------

// Dark-mode rules. Applied via prefers-color-scheme (Apple Mail, iOS, Outlook for Mac,
// Thunderbird) and via [data-ogsc]/[data-ogsb] (Outlook.com, new Outlook, Outlook apps).
// Sections designed dark stay as they are; light sections opt in with dm-* classes.
// Later rules win, so the order below matters.
function darkCss(p) {
  const rules = [
    ['body, .email-body-bg, .dm-page, .speakers-bg', `background-color:${DM.page} !important;background-image:none !important;`],
    ['.main-container, .dm-surface, .intro-section-td, .takeaways-bg, .sec-cta-section-td', `background-color:${DM.surface} !important;background-image:none !important;`],
    ['.dm-raised, .credit-bg, .ve-callout-td, .takeaway-card-cell, .speaker-card-inner', `background-color:${DM.raised} !important;background-image:none !important;border-color:${DM.line} !important;`],
    ['.dm-tint', `background-color:${p.tintDm} !important;background-image:none !important;border-color:${p.tintDm} !important;`],
    ['.dm-line', `border-color:${DM.line} !important;`],
    ['.dm-ink', `background-color:${DM.strong} !important;`],
    ['.dm-strong, .takeaway-title, .speaker-name, .section-heading, .ve-callout-td strong', `color:${DM.strong} !important;`],
    ['.dm-body, .body-copy-p, .ve-callout-td p', `color:${DM.body} !important;`],
    ['.dm-muted, .credit-text-cell', `color:${DM.muted} !important;`],
    ['.dm-accent, .speaker-role, .body-copy-p a', `color:${p.accentDm} !important;`],
    ['.intro-lead', `color:${DM.strong} !important;`],
    ['.dm-btn-invert', `background-color:${DM.strong} !important;border-color:${DM.strong} !important;`],
    ['.dm-btn-invert a', `color:${DM.page} !important;`],
    ['.dm-outline-invert', `background-color:transparent !important;border-color:${DM.strong} !important;`],
    ['.dm-outline-invert a', `color:${DM.strong} !important;`],
    ['.dm-keep-light', 'color:#FFFFFF !important;'],
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

// Common <head>. Responsive and dark-mode CSS sit in separate <style> blocks so a client
// that rejects one block (e.g. over attribute selectors) still applies the other.
const HEAD_BOILERPLATE = (p, displayFont = '', pageBg = '#ECEEF0') => `<head>
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
${fontImport(displayFont)}
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
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: ${pageBg}; }
    </style>
    <style>
        /* === RESPONSIVE === */
        @media screen and (max-width: 600px) {
            .email-outer-td { padding-top: 0 !important; padding-bottom: 0 !important; }
            .main-container { width: 100% !important; max-width: 100% !important; }
            .m-pad { padding-left: 22px !important; padding-right: 22px !important; }
            .m-pad-sm { padding-left: 14px !important; padding-right: 14px !important; }
            .m-top { padding-top: 36px !important; }
            .hero-title { font-size: 30px !important; line-height: 37px !important; letter-spacing: -0.5px !important; }
            .hero-xl { font-size: 40px !important; line-height: 42px !important; letter-spacing: 0 !important; }
            .hero-meta { font-size: 14px !important; }
            .m-num { font-size: 22px !important; }
            .speakers-section-td { padding: 40px 12px 34px 12px !important; }
            .speaker-card-div { display: block !important; width: 100% !important; margin: 8px auto !important; }
            .stack-cell { display: block !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }
            .stack-gap { padding-top: 14px !important; }
            .tile-cell { display: block !important; width: auto !important; margin: 0 0 10px 0 !important; }
            .m-hide { display: none !important; max-height: 0 !important; overflow: hidden !important; mso-hide: all; }
            .m-center { text-align: center !important; }
            .m-center table { margin-left: auto !important; margin-right: auto !important; }
            .m-full { width: 100% !important; }
            .m-stack-top { padding:26px 22px 16px 22px !important; }
            .m-stack-left { text-align:left !important; padding:0 22px 26px 22px !important; }
            .m-card { padding-left:22px !important; padding-right:22px !important; }
            .m-left { text-align:left !important; }
            .m-noborder { border-left: 0 !important; border-right: 0 !important; }
            .credit-stack-table, .credit-stack-table tbody, .credit-stack-table tr, .credit-badge-cell, .credit-text-cell { display: block !important; width: 100% !important; }
            .credit-badge-cell { text-align: center !important; padding-bottom: 12px !important; }
            .credit-text-cell { text-align: center !important; padding-left: 0 !important; padding-top: 0 !important; }
            .footer-inner-td { padding: 28px 16px 0 16px !important; }
        }
        @media screen and (max-width: 400px) {
            .hero-title { font-size: 26px !important; line-height: 33px !important; }
            .hero-xl { font-size: 34px !important; line-height: 37px !important; }
        }
    </style>
    <style>
        /* === DARK MODE === */
${darkCss(p)}
    </style>
    <!--[if mso]>
    <style type="text/css">
        body, table, td, p, a, h1, h2, h3, span { font-family: Arial, sans-serif !important; }
        .serif, .serif a { font-family: Georgia, 'Times New Roman', serif !important; }
        .condensed { font-family: 'Arial Narrow', Arial, sans-serif !important; }
    </style>
    <![endif]-->
</head>`;

// Brand strip (top of every email)
const RAINBOW = (h = 4) => `<tr>
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
const DOC_OPEN = (head, pageBg = '#ECEEF0') => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

${head}

<body class="email-body-bg"
    style="margin: 0; padding: 0; background-color: ${pageBg}; font-family: 'Roboto', Arial, Helvetica, sans-serif;">

    <!-- SUBJECT: [REPLACE WITH GENERATED SUBJECT LINE] -->

   <div style="display:none;font-size:1px;color:${pageBg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;font-family:Arial,sans-serif;">
    {{PREHEADER}}
</div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-body-bg" bgcolor="${pageBg}"
        style="background-color:${pageBg};width:100%;">
        <tr>
            <td align="center" valign="top" class="email-outer-td" style="padding:24px 0 40px 0;">
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

// Header bar: sponsor logo on white (logos are made for white), event label as a pill.
// The logo style string "max-width:90px;max-height:40px;" is resized by render.js.
const HEADER_BAR = (label, p) => `<tr>
                        <td class="header-bar-bg" bgcolor="#FFFFFF"
                            style="background-color:#FFFFFF;padding:14px 24px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" valign="middle" style="padding:0;">
                                        <img src="{{LOGO_URL}}"
                                            alt="{{LOGO_ALT}}"
                                            style="display:block;width:auto;height:auto;max-width:90px;max-height:40px;border:0;" />
                                    </td>
                                    <td align="right" valign="middle" style="padding:0;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right">
                                            <tr>
                                                <td style="border:1px solid #E2E8F0;border-radius:999px;padding:6px 12px 6px 10px;">
                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr>
                                                        <td valign="middle" style="padding:0 7px 0 0;"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td bgcolor="${p.accent}" style="background-color:${p.accent};width:7px;height:7px;border-radius:4px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table></td>
                                                        <td valign="middle" class="header-bar-label" style="font-family:${FONT};font-size:10px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:1.6px;line-height:14px;white-space:nowrap;">${label}</td>
                                                    </tr></table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`;

// =====================================================
// EVENT TYPE CONFIGURATIONS
// =====================================================

const EVENTS = {
  demo: {
    label: 'Upcoming Webcast',
    ctaUrl: '__SECONDARY_CTA__',
    ctaText: 'Save My Free Spot &rarr;',
    secondaryCtaUrl: '__SECONDARY_CTA__',
    secondaryCtaLabel: 'Curious? Find out more here &rarr;',
    live: true,
    hasVE: true,
    reminder: 'demo',
  },
  ondemand: {
    label: 'OnDemand Webcast',
    ctaUrl: '__ONDEMAND_CTA__',
    ctaText: 'View OnDemand &rarr;',
    secondaryCtaUrl: '__ONDEMAND_CTA__',
    secondaryCtaLabel: 'View OnDemand &rarr;',
    live: false,
    hasVE: false,
    reminder: null,
  },
  standalone: {
    label: 'Upcoming Webcast',
    ctaUrl: '__SECONDARY_CTA__',
    ctaText: 'Save My Free Spot &rarr;',
    secondaryCtaUrl: '__SECONDARY_CTA__',
    secondaryCtaLabel: 'Curious? Find out more here &rarr;',
    live: true,
    hasVE: false,
    reminder: 'standard',
  },
  virtual: {
    label: 'Upcoming Webcast',
    ctaUrl: '__SECONDARY_CTA__',
    ctaText: 'Save My Free Spot &rarr;',
    secondaryCtaUrl: '__SECONDARY_CTA__',
    secondaryCtaLabel: 'Curious? Find out more here &rarr;',
    live: true,
    hasVE: true,
    reminder: 'standard',
  },
};

// Fixed copy (word for word in every design)
const reminderCopy = (kind, linkStyle, linkCls = '') => `Can't attend the live webcast? <a href="__SECONDARY_CTA__" target="_blank"
                                    data-cta="1" data-captcha="1"${linkCls ? ` class="${linkCls}"` : ''}
                                    style="${linkStyle}">Register anyway</a>
                                to access the recording. Ensure you are logged in to your HR.com account to access
                                registration for this webcast.${kind === 'demo' ? ` Please note that demo webcasts do not qualify for HRCI or
                                SHRM recertification credits.` : ''}`;
const veCopy = (strongStyle) => `This webcast is part of the <strong style="${strongStyle}">__VE_NAME__</strong> Virtual
                                Event.
                                Click the button below to see other webcasts associated with this event.`;

// Per-event colors; *Dm values are the dark-mode counterparts
const PALETTES = {
  demo:       { accent: '#C01060', deep: '#3B0A24', tint: '#FCE8F1', line: '#F6C9DC', bright: '#FDB414', glowA: '#FDE2EE', glowB: '#FFEBD9', soft: '#F7D3E3', accentDm: '#F48FB9', tintDm: '#3A1528' },
  ondemand:   { accent: '#0F4A40', deep: '#062420', tint: '#E4F2EE', line: '#C3E1D9', bright: '#94C83D', glowA: '#E1F3EC', glowB: '#E6F6F9', soft: '#CDE6DF', accentDm: '#6FD1B8', tintDm: '#10302A' },
  standalone: { accent: '#1E7E8C', deep: '#0A262A', tint: '#E3F4F6', line: '#C2E5EA', bright: '#4AC4D6', glowA: '#E0F5F8', glowB: '#EAF1FF', soft: '#CBE8EC', accentDm: '#6FD6E3', tintDm: '#0F3136' },
  virtual:    { accent: '#02588E', deep: '#021F33', tint: '#E5F0F8', line: '#C4DCEE', bright: '#FDB414', glowA: '#E3EEFB', glowB: '#FFF4DC', soft: '#CFE2F1', accentDm: '#7CC4F5', tintDm: '#0D2A40' },
};

// =====================================================
// BUILDING BLOCKS
// Client support rules followed throughout:
// - Table layout, inline styles, bgcolor fallback behind every gradient
// - Solid hex colors only (no rgba), so classic Outlook never drops a color
// - Buttons carry mso-padding-alt on the cell so Outlook keeps their size
// - Light sections tag themselves with dm-* classes for dark mode
// - Multi-column rows stack on phones via stack-cell / tile-cell
// - Purely decorative pieces that Outlook would draw as squares are hidden from it
// =====================================================

const SEC_ATTRS = ' data-cta="1" data-captcha="1"';
const cls = (c) => (c ? ` class="${c}"` : '');
const T = 'role="presentation" border="0" cellpadding="0" cellspacing="0"';

function btn({ href, attrs, bg, color, label, radius = '999px', pad = '15px 34px', size = 15, border = '', center = false, block = false, font = FONT, tdCls = '', aCls = '', weight = 700, spacing = '0.2px', upper = false, shadow = '', grad = '' }) {
  return `<table ${T}${block ? ' width="100%"' : ''}${center ? ' align="center"' : ''} style="margin:0${center ? ' auto' : ''};">
                                <tr>
                                    <td align="center" bgcolor="${bg}"${cls(tdCls)} style="border-radius:${radius};background-color:${bg};${grad ? `background-image:${grad};` : ''}${border}${shadow ? `box-shadow:${shadow};` : ''}mso-padding-alt:${pad};">
                                        <a href="${href}" target="_blank"${attrs}${cls(aCls)}
                                            style="font-size:${size}px;font-family:${font};color:${color};text-decoration:none;border-radius:${radius};padding:${pad};display:${block ? 'block' : 'inline-block'};font-weight:${weight};${block ? '' : 'white-space:nowrap;'}letter-spacing:${spacing};${upper ? 'text-transform:uppercase;' : ''}text-align:center;mso-padding-alt:0;">
                                            ${label}
                                        </a>
                                    </td>
                                </tr>
                            </table>`;
}
// Every CTA goes to the AP shortcode (the webcast's more-info page), so all carry tracking attributes
const primaryBtn = (ev, ctaText, opts) => btn({ href: ev.ctaUrl, attrs: SEC_ATTRS, label: ctaText, ...opts });
const secondaryBtn = (ev, opts) => btn({ href: ev.secondaryCtaUrl, attrs: SEC_ATTRS, label: ev.secondaryCtaLabel, ...opts });
const veBtn = (opts) => btn({ href: '__VE_CTA__', attrs: ' data-cta="1"', label: 'Check it out here &rarr;', size: 14, pad: '12px 28px', ...opts });

// A solid block (dot, bar, square). Rounded shapes are hidden from Outlook, which would draw squares.
const shape = (color, w, h, radius = 0, extraCls = '') => `<table ${T}><tr><td${cls(extraCls)} bgcolor="${color}" style="background-color:${color};width:${w}px;height:${h}px;border-radius:${radius}px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table>`;
const brandBars = (w = 22, h = 4, gap = 5) => `<table ${T}><tr>${BRAND.map((c, i) => `<td style="padding:0 ${i < 3 ? gap : 0}px 0 0;">${shape(c, w, h, Math.ceil(h / 2))}</td>`).join('')}</tr></table>`;
const segBar = (h = 6, widths = [40, 25, 20, 15]) => `<tr>
                        <td style="padding:0;font-size:0;line-height:0;">
                            <table ${T} width="100%">
                                <tr>${widths.map((w, i) => `<td width="${w}%" bgcolor="${BRAND[i]}" style="background-color:${BRAND[i]};height:${h}px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td>`).join('')}</tr>
                            </table>
                        </td>
                    </tr>`;

const row = (inner, { bg = '#FFFFFF', pad = '0 48px', align = 'left', c = 'dm-surface', grad = '' } = {}) => `<tr>
                        <td align="${align}" valign="top"${cls(c)} bgcolor="${bg}" style="background-color:${bg};${grad ? `background-image:${grad};` : ''}padding:${pad};">
                            ${inner}
                        </td>
                    </tr>`;

const introRow = (bg, pad, c = 'dm-surface') => `<tr>
                        <td align="left" valign="top" class="intro-section-td m-pad${c ? ` ${c}` : ''}" bgcolor="${bg}" style="background-color:${bg};padding:${pad};">
                            {{INTRO}}
                        </td>
                    </tr>`;

const learnTitle = (n, color = INK, extra = '', c = 'takeaway-title') => `<span${cls(c)} style="font-family:${FONT};font-size:16px;font-weight:700;color:${color};line-height:24px;display:block;${extra}">{{LEARN${n}}}</span>`;
const eyebrow = (text, color, extra = '', c = 'dm-accent') => `<p${cls(c)} style="margin:0;font-family:${FONT};font-size:12px;font-weight:800;color:${color};text-transform:uppercase;letter-spacing:2.2px;line-height:16px;${extra}">${text}</p>`;

// Speakers section. The two Outlook comments around {{HOSTS_SECTION}} must stay exactly as written:
// render.js swaps the opening one for a 552px table and wraps the cards in 2-column cells.
function speakersBlock({ bg, grad = '', c = 'speakers-bg', eyebrowColor, eyebrowCls = 'dm-accent', heading = INK, headingFont = FONT, headingSize = 26, headingWeight = 800, headingCls = 'section-heading', headingExtra = '', top = '', pad = '52px 24px 46px 24px' }) {
  return `<tr>
                        <td align="center" valign="top" class="${c} speakers-section-td" bgcolor="${bg}"
                            style="background-color:${bg};${grad ? `background-image:${grad};` : ''}padding:${pad};text-align:center;">
                            ${top}<p${cls(eyebrowCls)}
                                style="margin:0 0 8px 0;font-family:${FONT};font-size:12px;font-weight:800;color:${eyebrowColor};text-transform:uppercase;letter-spacing:2.2px;text-align:center;line-height:16px;">
                                Your expert hosts</p>
                            <h2${cls(headingCls)}
                                style="margin:0 0 28px 0;font-family:${headingFont};font-size:${headingSize}px;font-weight:${headingWeight};color:${heading};text-align:center;line-height:${headingSize + 8}px;letter-spacing:-0.4px;${headingExtra}">
                                Learn directly from industry leaders
                            </h2>
                            <!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><![endif]-->

                         {{HOSTS_SECTION}}
                            <!--[if mso]></tr></table><![endif]-->

                        </td>
                    </tr>`;
}

// Host card shell: 260px inline-block cards; render.js wraps them in 2-column Outlook cells
const hostShell = (bg, innerStyle, inner, innerCls = 'speaker-card-inner') => `
<table class="speaker-card-div" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;display:inline-block;vertical-align:top;width:100%;max-width:260px;min-width:260px;margin:8px 6px;">
    <tr>
        <td style="padding:0;">
            <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"${bg ? ` bgcolor="${bg}"` : ''} style="max-width:260px;min-width:260px;${bg ? `background-color:${bg};` : ''}${innerStyle}"${cls(innerCls)}>
${inner}
            </table>
        </td>
    </tr>
</table>
`;
const hostImg = (size, radius, extra = '') => `<img alt="{{H_ALT}}" src="{{H_IMG}}" width="${size}" height="${size}" style="display:block;width:${size}px;height:${size}px;object-fit:cover;border-radius:${radius};${extra}" />`;
const hostName = (color, extra = '', c = '') => `<span${cls(`speaker-name ${c}`.trim())} style="display:block;font-family:${FONT};font-size:17px;font-weight:800;color:${color};line-height:23px;${extra}">{{H_NAME}}</span>`;
const hostRole = (color, extra = '', c = 'speaker-role') => `<span${cls(c)} style="display:block;font-family:${FONT};font-size:13px;font-weight:500;color:${color};line-height:19px;margin-top:5px;${extra}">{{H_TITLE}}</span>`;
// Photo inside a colored ring (gradient where supported)
const ringImg = (size, ring, ring2, gap = '#FFFFFF', gapCls = '') => `<table ${T} align="center" style="margin:0 auto;"><tr><td bgcolor="${ring}" style="padding:3px;border-radius:50%;background-color:${ring};background-image:linear-gradient(135deg, ${ring} 0%, ${ring2} 100%);"><table ${T}><tr><td${cls(gapCls)} bgcolor="${gap}" style="padding:3px;border-radius:50%;background-color:${gap};">${hostImg(size, '50%')}</td></tr></table></td></tr></table>`;
const hostCentered = (img, name, role, pad = '28px 20px 26px 20px', between = '') => `
                <tr>
                    <td align="center" style="padding:${pad};text-align:center;">
                        ${img}
                        ${between || '<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="height:16px;font-size:0;line-height:0;">&nbsp;</td></tr></table>'}
                        ${name}
                        ${role}
                    </td>
                </tr>`;
const hostRow = (img, imgW, name, role, pad = 18) => `
                <tr>
                    <td style="padding:0;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td width="${imgW}" valign="middle" style="width:${imgW}px;padding:${pad}px 0 ${pad}px ${pad}px;">${img}</td>
                                <td valign="middle" style="padding:${pad}px ${pad}px ${pad}px 14px;text-align:left;">
                                    ${name}
                                    ${role}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>`;

// Standard reminder row (centered small print)
const reminderRow = (ev, { bg, color = '#475569', link, pad = '24px 40px', c = 'takeaways-bg dm-surface', pCls = 'body-copy-p', font = FONT, extra = '' }) => (ev.reminder ? `<tr>
                        <td align="center" valign="middle" class="${c} m-pad" bgcolor="${bg}"
                            style="background-color:${bg};padding:${pad};">
                            <p${cls(pCls)}
                                style="margin:0;font-family:${font};font-size:13px;font-weight:400;color:${color};line-height:21px;text-align:center;${extra}">
                                ${reminderCopy(ev.reminder, `color:${link};text-decoration:underline;font-weight:700;`)}
                            </p>
                        </td>
                    </tr>` : '');

// Two-up learning grid; the tile is the cell itself so both tiles in a row share a height
function grid2(tile, spacing = 12, cellCls = 'tile-cell') {
  const cell = (i) => `<td class="${cellCls}" width="50%" valign="top" ${tile(i)}</td>`;
  return `<table ${T.replace('cellspacing="0"', `cellspacing="${spacing}"`)} width="100%" style="border-collapse:separate;">
                                <tr>${cell(0)}${cell(1)}</tr>
                                <tr>${cell(2)}${cell(3)}</tr>
                            </table>`;
}
const two = (n) => `0${n}`;

// ---------------------------------------------------------------------------
// DESIGNS
// cta: 'save' → "Save My Free Spot", 'register' → "Register Free" (OnDemand always "View OnDemand")
// font: display typeface · page: canvas color · intro: lead/body paragraph styles (render.js)
// ---------------------------------------------------------------------------
const VARIANTS = {
  // --- A: "Keynote" — deep stage hero with a white event ticket (calendar stub + time),
  //        learnings as numbered brand-color cards on a tinted panel, portrait host cards,
  //        and a two-column virtual-event banner
  A: {
    meta: { id: 'keynote', label: 'Keynote' },
    cta: 'save',
    font: 'Archivo',
    page: '#E7EBF0',
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${FONT};font-size:20px;font-weight:500;color:${INK};line-height:32px;letter-spacing:-0.2px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:27px;`,
    }),
    hero: (ev, p, ctaText) => {
      const D = sans('Archivo');
      const glow = mix(p.deep, p.accent, 0.55);
      // Ticket: calendar stub + time for live webcasts, play stub for on-demand
      const stub = ev.live
        ? `<p style="margin:0;font-family:${FONT};font-size:11px;font-weight:800;color:#FFFFFF;letter-spacing:2px;line-height:14px;text-transform:uppercase;">{{DATE_MON}}</p>
                                                    <p style="margin:2px 0 0 0;font-family:${D};font-size:40px;font-weight:800;color:#FFFFFF;line-height:42px;letter-spacing:-1px;">{{DATE_DAY}}</p>`
        : `<p style="margin:0;font-family:${D};font-size:30px;font-weight:800;color:#FFFFFF;line-height:34px;">&#9654;</p>`;
      const details = ev.live
        ? `<p class="dm-muted" style="margin:0 0 4px 0;font-family:${FONT};font-size:11px;font-weight:700;color:#64748B;letter-spacing:1.6px;line-height:14px;text-transform:uppercase;">{{DATE_WEEKDAY}}</p>
                                                    <p class="dm-strong" style="margin:0;font-family:${D};font-size:18px;font-weight:700;color:${INK};line-height:24px;">{{DATE_TIME_ONLY}}</p>
                                                    <p class="dm-accent" style="margin:6px 0 0 0;font-family:${FONT};font-size:13px;font-weight:700;color:${p.accent};line-height:18px;">Free to Attend</p>`
        : `<p class="dm-muted" style="margin:0 0 4px 0;font-family:${FONT};font-size:11px;font-weight:700;color:#64748B;letter-spacing:1.6px;line-height:14px;text-transform:uppercase;">On demand</p>
                                                    <p class="dm-strong" style="margin:0;font-family:${D};font-size:18px;font-weight:700;color:${INK};line-height:24px;">Watch anytime</p>`;
      return `<tr>
                        <td align="left" valign="top" class="m-pad m-top" bgcolor="${p.deep}"
                            style="background-color:${p.deep};background-image:radial-gradient(circle at 92% 8%, ${glow} 0%, ${p.deep} 58%);padding:48px 48px 50px 48px;">
                            ${brandBars()}
                            <h1 class="hero-title"
                                style="margin:22px 0 28px 0;font-family:${D};font-size:40px;font-weight:800;color:#FFFFFF;line-height:46px;text-align:left;letter-spacing:-1.2px;">
                               {{TITLE}}
                            </h1>
                            <table ${T} width="100%" class="dm-raised" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:16px;margin:0 0 30px 0;">
                                <tr>
                                    <td width="92" align="center" valign="middle" bgcolor="${p.accent}" style="width:92px;background-color:${p.accent};border-radius:16px 0 0 16px;padding:16px 8px;text-align:center;">
                                                    ${stub}
                                    </td>
                                    <td valign="middle" style="padding:16px 20px;">
                                                    ${details}
                                    </td>
                                </tr>
                            </table>
                            ${primaryBtn(ev, ctaText, { bg: p.bright, color: ON_BRIGHT, pad: '17px 36px', size: 16, weight: 800, font: D })}
                        </td>
                    </tr>
                    ${segBar(5, [25, 25, 25, 25])}`;
    },
    introRow: () => introRow('#FFFFFF', '46px 48px 14px 48px'),
    takeaways: (ev, p) => {
      const card = (n) => `
                                        <table ${T} width="100%" class="dm-raised" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:1px solid ${p.line};border-radius:14px;margin:0 0 10px 0;">
                                            <tr>
                                                <td width="40" valign="top" style="width:40px;padding:18px 0 18px 18px;">
                                                    <table ${T}><tr><td width="36" height="36" align="center" valign="middle" bgcolor="${BRAND[n - 1]}" style="width:36px;height:36px;background-color:${BRAND[n - 1]};border-radius:10px;font-family:${sans('Archivo')};font-size:15px;font-weight:800;color:${BRAND_TEXT[n - 1]};line-height:36px;text-align:center;mso-line-height-rule:exactly;">${n}</td></tr></table>
                                                </td>
                                                <td valign="middle" style="padding:18px 20px 18px 16px;">${learnTitle(n, INK, 'font-weight:600;')}</td>
                                            </tr>
                                        </table>`;
      return row(`<table ${T} width="100%">
                                <tr>
                                    <td class="dm-tint m-pad-sm" bgcolor="${p.tint}" style="background-color:${p.tint};border-radius:22px;padding:32px 28px 24px 28px;">
                                        ${brandBars(18, 4, 4)}
                                        <h2 class="section-heading" style="margin:14px 0 20px 0;font-family:${sans('Archivo')};font-size:26px;font-weight:800;color:${INK};line-height:32px;letter-spacing:-0.6px;">What You'll Learn</h2>${[1, 2, 3, 4].map(card).join('')}
                                    </td>
                                </tr>
                            </table>`, { pad: '18px 32px 0 32px', c: 'takeaways-bg dm-surface m-pad-sm' });
    },
    secCta: (ev, p) => row(secondaryBtn(ev, { bg: '#FFFFFF', color: p.accent, border: `border:2px solid ${p.accent};`, pad: '13px 30px', center: true, tdCls: 'dm-surface', aCls: 'dm-accent' }), { pad: '28px 48px 50px 48px', align: 'center', c: 'sec-cta-section-td dm-surface m-pad' }),
    speakers: (p) => speakersBlock({ bg: '#F6F8FA', c: 'dm-page', eyebrowColor: p.accent, headingFont: sans('Archivo'), headingSize: 26, headingExtra: 'letter-spacing:-0.6px;', pad: '50px 24px 44px 24px' }),
    hostCard: (p) => hostShell('#FFFFFF', `border:1px solid ${p.line};border-radius:18px;`, `
                <tr><td bgcolor="${p.accent}" style="background-color:${p.accent};height:6px;border-radius:18px 18px 0 0;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>` + hostCentered(
      ringImg(84, p.accent, p.bright, '#FFFFFF', 'dm-raised'), hostName(INK), hostRole('#64748B'), '24px 20px 26px 20px')),
    ve: (p) => `<tr>
                        <td align="center" valign="middle" class="ve-callout-td dm-surface m-pad-sm" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:44px 32px 6px 32px;">
                            <table ${T} width="100%">
                                <tr>
                                    <td bgcolor="${p.deep}" style="background-color:${p.deep};background-image:linear-gradient(120deg, ${p.deep} 0%, ${mix(p.deep, p.accent, 0.6)} 100%);border-radius:20px;padding:0;">
                                        <table ${T} width="100%">
                                            <tr>
                                                <td class="stack-cell m-stack-top" width="64%" valign="middle" style="padding:28px 12px 28px 30px;text-align:left;">
                                                    <p style="margin:0;font-family:${FONT};font-size:15px;font-weight:400;color:#D5DEEA;line-height:24px;text-align:left;">
                                ${veCopy('color:#FFFFFF;font-weight:800;')}
                                                    </p>
                                                </td>
                                                <td class="stack-cell m-stack-left" width="36%" valign="middle" align="right" style="padding:28px 30px 28px 12px;">
                                                    ${veBtn({ bg: p.bright, color: ON_BRIGHT })}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '30px 48px 42px 48px' }),
  },

  // --- B: "Front Page" — light editorial hero with a big headline and a colored fact bar
  //        (date · time · cost), learnings as a numbered list on a deep band, horizontal
  //        speaker cards, and a bright full-width virtual-event banner
  B: {
    meta: { id: 'frontpage', label: 'Front Page' },
    cta: 'register',
    font: 'Figtree',
    page: '#E4E7EB',
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${sans('Figtree')};font-size:22px;font-weight:700;color:${INK};line-height:32px;letter-spacing:-0.3px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:27px;`,
    }),
    hero: (ev, p, ctaText) => {
      const F = sans('Figtree');
      const divider = mix(p.accent, '#FFFFFF', 0.25);
      const fact = (label, value, sub, first) => `<td class="stack-cell${first ? '' : ' m-noborder'}" width="33%" valign="top" style="padding:16px 18px;${first ? '' : `border-left:1px solid ${divider};`}">
                                        <p style="margin:0 0 4px 0;font-family:${FONT};font-size:10px;font-weight:700;color:${mix(p.accent, '#FFFFFF', 0.72)};text-transform:uppercase;letter-spacing:1.8px;line-height:14px;">${label}</p>
                                        <p style="margin:0;font-family:${F};font-size:17px;font-weight:800;color:#FFFFFF;line-height:22px;">${value}</p>${sub ? `
                                        <p style="margin:2px 0 0 0;font-family:${FONT};font-size:12px;font-weight:500;color:${mix(p.accent, '#FFFFFF', 0.8)};line-height:16px;">${sub}</p>` : ''}
                                    </td>`;
      const facts = ev.live
        ? fact('Date', '{{DATE_MON}} {{DATE_DAY}}', '{{DATE_WEEKDAY}}', true) + fact('Time', '{{DATE_TIME_ONLY}}', '', false) + fact('Cost', 'Free', '', false)
        : fact('Format', 'On demand', '', true) + fact('Access', 'Watch anytime', '', false) + fact('Cost', 'Free', '', false);
      return `<tr>
                        <td align="left" valign="top" class="dm-surface m-pad m-top" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:46px 48px 44px 48px;">
                            <table ${T}><tr>
                                <td valign="middle" style="padding:0 10px 0 0;">${shape(p.accent, 32, 4, 2, 'dm-ink')}</td>
                                <td valign="middle" class="dm-accent" style="font-family:${FONT};font-size:12px;font-weight:800;color:${p.accent};text-transform:uppercase;letter-spacing:2.2px;line-height:16px;">${ev.live ? 'Free webcast' : 'Watch now'}</td>
                            </tr></table>
                            <h1 class="hero-title dm-strong"
                                style="margin:18px 0 28px 0;font-family:${F};font-size:44px;font-weight:800;color:${INK};line-height:50px;text-align:left;letter-spacing:-1.4px;">
                               {{TITLE}}
                            </h1>
                            <table ${T} width="100%" bgcolor="${p.accent}" style="background-color:${p.accent};border-radius:14px;margin:0 0 30px 0;">
                                <tr>${facts}</tr>
                            </table>
                            ${primaryBtn(ev, ctaText, { bg: INK, color: '#FFFFFF', pad: '17px 36px', size: 16, weight: 800, font: F, tdCls: 'dm-btn-invert' })}
                        </td>
                    </tr>`;
    },
    introRow: () => introRow('#FFFFFF', '10px 48px 44px 48px'),
    takeaways: (ev, p) => {
      const lineC = mix(p.deep, '#FFFFFF', 0.16);
      const item = (n) => `
                            <table ${T} width="100%">
                                <tr>
                                    <td width="62" valign="top" class="m-num" style="width:62px;border-top:1px solid ${lineC};padding:22px 0 20px 0;font-family:${sans('Figtree')};font-size:30px;font-weight:800;color:${BRAND[n - 1]};line-height:30px;letter-spacing:-1px;">${two(n)}</td>
                                    <td valign="top" style="border-top:1px solid ${lineC};padding:24px 0 22px 0;">${learnTitle(n, '#FFFFFF', 'font-size:17px;line-height:25px;font-weight:600;', '')}</td>
                                </tr>
                            </table>`;
      return `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${p.deep}" style="background-color:${p.deep};background-image:linear-gradient(180deg, ${p.deep} 0%, ${mix(p.deep, '#000000', 0.3)} 100%);padding:50px 48px 12px 48px;">
                            ${brandBars(18, 4, 4)}
                            <h2 style="margin:14px 0 22px 0;font-family:${sans('Figtree')};font-size:30px;font-weight:800;color:#FFFFFF;line-height:36px;letter-spacing:-0.8px;">What You'll Learn</h2>${[1, 2, 3, 4].map(item).join('')}
                        </td>
                    </tr>`;
    },
    secCta: (ev, p) => {
      const bg = mix(p.deep, '#000000', 0.3);
      return `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${bg}" style="background-color:${bg};padding:14px 48px 52px 48px;">
                            ${secondaryBtn(ev, { bg, color: '#FFFFFF', border: 'border:2px solid #FFFFFF;', pad: '13px 30px' })}
                        </td>
                    </tr>`;
    },
    speakers: (p) => speakersBlock({ bg: '#FFFFFF', c: 'dm-surface', eyebrowColor: p.accent, headingFont: sans('Figtree'), headingSize: 28, headingWeight: 800, headingExtra: 'letter-spacing:-0.7px;', pad: '54px 24px 40px 24px' }),
    hostCard: (p) => hostShell(p.tint, `border-radius:16px;border-left:5px solid ${p.accent};`, hostRow(
      hostImg(68, '50%'), 86,
      `<span class="dm-accent" style="display:block;font-family:${FONT};font-size:10px;font-weight:800;color:${p.accent};text-transform:uppercase;letter-spacing:1.6px;line-height:14px;margin:0 0 4px 0;">Speaker</span>` + hostName(INK, 'font-size:16px;line-height:21px;'),
      hostRole('#475569', 'font-size:12px;line-height:17px;'))),
    ve: (p) => `<tr>
                        <td align="left" valign="middle" class="dm-surface m-pad-sm" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:16px 32px 8px 32px;">
                            <table ${T} width="100%">
                                <tr>
                                    <td bgcolor="${p.bright}" style="background-color:${p.bright};border-radius:20px;padding:30px 32px;">
                                        <table ${T} width="100%">
                                            <tr>
                                                <td class="stack-cell" valign="middle" style="padding:0 16px 0 0;">
                                                    <p style="margin:0;font-family:${FONT};font-size:15px;font-weight:500;color:${ON_BRIGHT};line-height:24px;">
                                ${veCopy(`color:${ON_BRIGHT};font-weight:800;`)}
                                                    </p>
                                                </td>
                                                <td class="stack-cell stack-gap m-left" width="180" valign="middle" align="right" style="width:180px;">
                                                    ${veBtn({ bg: INK, color: '#FFFFFF' })}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '28px 48px 42px 48px' }),
  },

  // --- C: "Center Stage" — soft tinted canvas, centered hero,
  //        every section a floating white card, 2x2 learning tiles with brand-color caps
  C: {
    meta: { id: 'centerstage', label: 'Center Stage' },
    cta: 'save',
    font: 'Plus Jakarta Sans',
    page: '#E6EBF1',
    intro: () => ({
      lead: `margin:0 0 16px 0;font-family:${sans('Plus Jakarta Sans')};font-size:20px;font-weight:700;color:${INK};line-height:31px;letter-spacing:-0.2px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:27px;`,
    }),
    hero: (ev, p, ctaText) => {
      const J = sans('Plus Jakarta Sans');
      const meta = ev.live ? '{{DATE_TIME}}' : 'On demand &nbsp;&middot;&nbsp; Watch anytime';
      return `<tr>
                        <td align="center" valign="top" class="dm-tint m-pad m-top" bgcolor="${p.tint}" style="background-color:${p.tint};background-image:radial-gradient(circle at 50% 0%, #FFFFFF 0%, ${p.tint} 62%);padding:54px 48px 44px 48px;text-align:center;">
                            <h1 class="hero-title dm-strong"
                                style="margin:0 0 16px 0;font-family:${J};font-size:38px;font-weight:800;color:${INK};line-height:46px;text-align:center;letter-spacing:-1px;">
                               {{TITLE}}
                            </h1>
                            <p class="hero-meta dm-body" style="margin:0 0 8px 0;font-family:${FONT};font-size:16px;font-weight:600;color:#334155;line-height:24px;text-align:center;">${meta}</p>
                            ${brandBars(16, 4, 4).replace('<table ', '<table align="center" style="margin:16px auto 28px auto;" ')}
                            ${primaryBtn(ev, ctaText, { bg: p.accent, color: '#FFFFFF', pad: '17px 38px', size: 16, weight: 800, font: J, center: true, shadow: `0 12px 24px -10px ${mix(p.accent, '#000000', 0.3)}` })}
                            ${ev.live ? `<p class="dm-accent" style="margin:14px 0 0 0;font-family:${FONT};font-size:13px;font-weight:700;color:${p.accent};line-height:18px;text-align:center;">Free to Attend</p>` : ''}
                        </td>
                    </tr>`;
    },
    // White card on the tinted canvas
    introRow: (p) => `<tr>
                        <td align="center" valign="top" class="dm-tint m-pad-sm" bgcolor="${p.tint}" style="background-color:${p.tint};padding:4px 28px 14px 28px;">
                            <table ${T} width="100%"><tr>
                                <td align="left" class="intro-section-td dm-raised m-card" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:22px;padding:36px 38px 22px 38px;">
                            {{INTRO}}
                                </td>
                            </tr></table>
                        </td>
                    </tr>`,
    takeaways: (ev, p) => `<tr>
                        <td align="center" valign="top" class="dm-tint m-pad-sm" bgcolor="${p.tint}" style="background-color:${p.tint};padding:0 28px 0 28px;">
                            <table ${T} width="100%"><tr>
                                <td align="left" class="dm-raised takeaway-card-cell m-card" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:22px;padding:34px 26px 24px 26px;">
                                    <p class="dm-accent" style="margin:0 0 6px 0;font-family:${FONT};font-size:12px;font-weight:800;color:${p.accent};text-transform:uppercase;letter-spacing:2.2px;line-height:16px;text-align:center;">Your takeaways</p>
                                    <h2 class="section-heading" style="margin:0 0 14px 0;font-family:${sans('Plus Jakarta Sans')};font-size:26px;font-weight:800;color:${INK};line-height:32px;letter-spacing:-0.6px;text-align:center;">What You'll Learn</h2>
                                    ${grid2((i) => `bgcolor="#F7F9FB" style="background-color:#F7F9FB;border-top:4px solid ${BRAND[i]};border-radius:14px;padding:18px 18px 20px 18px;">
                                        <p class="dm-muted" style="margin:0 0 8px 0;font-family:${sans('Plus Jakarta Sans')};font-size:13px;font-weight:800;color:#64748B;letter-spacing:1.5px;line-height:16px;">${two(i + 1)}</p>
                                        ${learnTitle(i + 1, INK, 'font-weight:600;')}`, 10, 'tile-cell dm-page')}
                                </td>
                            </tr></table>
                        </td>
                    </tr>`,
    secCta: (ev, p) => row(secondaryBtn(ev, { bg: '#FFFFFF', color: p.accent, border: `border:2px solid ${p.accent};`, pad: '13px 30px', center: true, tdCls: 'dm-raised', aCls: 'dm-accent' }), { bg: p.tint, pad: '26px 28px 8px 28px', align: 'center', c: 'dm-tint sec-cta-section-td' }),
    speakers: (p) => speakersBlock({ bg: p.tint, c: 'dm-tint', eyebrowColor: p.accent, headingFont: sans('Plus Jakarta Sans'), headingSize: 26, headingExtra: 'letter-spacing:-0.6px;', pad: '44px 18px 34px 18px' }),
    hostCard: (p) => hostShell('#FFFFFF', 'border-radius:22px;', hostCentered(
      ringImg(88, p.accent, p.bright, '#FFFFFF', 'dm-raised'), hostName(INK), hostRole('#64748B'), '26px 20px 26px 20px')),
    ve: (p) => `<tr>
                        <td align="center" valign="top" class="dm-tint m-pad-sm" bgcolor="${p.tint}" style="background-color:${p.tint};padding:0 28px 8px 28px;">
                            <table ${T} width="100%"><tr>
                                <td align="center" bgcolor="${p.deep}" class="m-card" style="background-color:${p.deep};background-image:linear-gradient(135deg, ${p.deep} 0%, ${mix(p.deep, p.accent, 0.55)} 100%);border:1px solid ${mix(p.deep, '#FFFFFF', 0.18)};border-radius:22px;padding:32px 38px;text-align:center;">
                                    ${brandBars(14, 3, 4).replace('<table ', '<table align="center" style="margin:0 auto 16px auto;" ')}
                                    <p style="margin:0 0 20px 0;font-family:${FONT};font-size:15px;font-weight:400;color:#D5DEEA;line-height:24px;text-align:center;">
                                ${veCopy('color:#FFFFFF;font-weight:800;')}
                                    </p>
                                    ${veBtn({ bg: p.bright, color: ON_BRIGHT, center: true })}
                                </td>
                            </tr></table>
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: p.tint, link: p.accent, pad: '24px 44px 40px 44px', c: 'dm-tint' }),
  },

  // --- D: "Highlight" — bold bright-color hero with a big ink headline and date/time/cost tags,
  //        learnings as a check list on the accent color, white speaker cards, bright-edged event box
  D: {
    meta: { id: 'highlight', label: 'Highlight' },
    cta: 'register',
    font: 'Inter Tight',
    page: '#E3E7EC',
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${sans('Inter Tight')};font-size:21px;font-weight:700;color:${INK};line-height:31px;letter-spacing:-0.3px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:27px;`,
    }),
    hero: (ev, p, ctaText) => {
      const I = sans('Inter Tight');
      // Inline tags wrap on narrow screens; Outlook shows them as plain text with separators
      const tag = (t, solid) => `<span style="display:inline-block;margin:0 6px 8px 0;padding:7px 13px;border:1.5px solid ${INK};border-radius:999px;${solid ? `background-color:${INK};color:#FFFFFF;` : `color:${INK};`}font-family:${FONT};font-size:13px;font-weight:700;line-height:16px;white-space:nowrap;">${t}</span>`;
      const sep = '<!--[if mso]>&nbsp;&middot;&nbsp;<![endif]-->';
      const tags = ev.live
        ? `${tag('{{DATE_WEEKDAY}}, {{DATE_MON}} {{DATE_DAY}}')}${sep}${tag('{{DATE_TIME_ONLY}}')}${sep}${tag('Free to Attend', true)}`
        : `${tag('On demand')}${sep}${tag('Watch anytime')}${sep}${tag('Free', true)}`;
      return `<tr>
                        <td align="left" valign="top" class="m-pad m-top" bgcolor="${p.bright}" style="background-color:${p.bright};background-image:radial-gradient(circle at 100% 0%, ${mix(p.bright, '#FFFFFF', 0.35)} 0%, ${p.bright} 55%);padding:48px 48px 46px 48px;">
                            <h1 class="hero-title" style="margin:0 0 22px 0;font-family:${I};font-size:42px;font-weight:900;color:${ON_BRIGHT};line-height:47px;text-align:left;letter-spacing:-1.4px;">
                               {{TITLE}}
                            </h1>
                            <div style="margin:0 0 22px 0;font-family:${FONT};font-size:13px;font-weight:700;color:${ON_BRIGHT};line-height:16px;">${tags}</div>
                            ${primaryBtn(ev, ctaText, { bg: INK, color: '#FFFFFF', radius: '12px', pad: '17px 32px', size: 16, weight: 800, font: I })}
                        </td>
                    </tr>`;
    },
    introRow: () => introRow('#FFFFFF', '46px 48px 30px 48px'),
    takeaways: (ev, p) => {
      const item = (n) => `
                            <table ${T} width="100%">
                                <tr>
                                    <td width="44" valign="top" style="width:44px;padding:0 0 18px 0;">
                                        <table ${T}><tr><td width="28" height="28" align="center" valign="middle" bgcolor="${p.bright}" style="width:28px;height:28px;background-color:${p.bright};border-radius:50%;font-family:${FONT};font-size:14px;font-weight:800;color:${ON_BRIGHT};line-height:28px;text-align:center;mso-line-height-rule:exactly;">&#10003;</td></tr></table>
                                    </td>
                                    <td valign="top" style="padding:2px 0 18px 0;">${learnTitle(n, '#FFFFFF', 'font-size:17px;line-height:25px;font-weight:600;', '')}</td>
                                </tr>
                            </table>`;
      return `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${mix(p.accent, p.deep, 0.2)}" style="background-color:${mix(p.accent, p.deep, 0.2)};padding:48px 48px 12px 48px;">
                            <p style="margin:0 0 8px 0;font-family:${FONT};font-size:12px;font-weight:800;color:${p.bright};text-transform:uppercase;letter-spacing:2.2px;line-height:16px;">Your takeaways</p>
                            <h2 style="margin:0 0 26px 0;font-family:${sans('Inter Tight')};font-size:30px;font-weight:900;color:#FFFFFF;line-height:36px;letter-spacing:-0.9px;">What You'll Learn</h2>${[1, 2, 3, 4].map(item).join('')}
                        </td>
                    </tr>`;
    },
    secCta: (ev, p) => {
      const bg = mix(p.accent, p.deep, 0.2);
      return `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${bg}" style="background-color:${bg};padding:10px 48px 50px 48px;">
                            ${secondaryBtn(ev, { bg, color: '#FFFFFF', border: 'border:2px solid #FFFFFF;', radius: '12px', pad: '13px 28px', font: sans('Inter Tight') })}
                        </td>
                    </tr>`;
    },
    speakers: (p) => speakersBlock({ bg: '#F3F5F8', c: 'dm-page', eyebrowColor: p.accent, headingFont: sans('Inter Tight'), headingSize: 28, headingWeight: 900, headingExtra: 'letter-spacing:-0.8px;', pad: '52px 24px 42px 24px' }),
    hostCard: (p) => hostShell('#FFFFFF', `border-radius:16px;border-bottom:4px solid ${p.bright};`, hostRow(
      hostImg(68, '50%'), 86, hostName(INK, 'font-size:16px;line-height:21px;'), hostRole('#64748B', 'font-size:12px;line-height:17px;'))),
    ve: (p) => `<tr>
                        <td align="left" valign="middle" class="dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:44px 48px 8px 48px;">
                            <table ${T} width="100%"><tr>
                                <td class="dm-surface" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border:2px solid ${p.bright};border-radius:16px;padding:26px 28px;">
                                    <p class="dm-body" style="margin:0 0 18px 0;font-family:${FONT};font-size:15px;font-weight:400;color:#334155;line-height:24px;">
                                ${veCopy(`color:${INK};font-weight:800;`).replace('<strong ', '<strong class="dm-strong" ')}
                                    </p>
                                    ${veBtn({ bg: INK, color: '#FFFFFF', radius: '12px', tdCls: 'dm-btn-invert' })}
                                </td>
                            </tr></table>
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '30px 48px 42px 48px' }),
  },

  // --- E: "Editorial" — warm paper, large serif headline under a small-caps date line, ink rules,
  //        italic serif numerals, card-free portraits and a double-ruled event box
  E: {
    meta: { id: 'editorial', label: 'Editorial' },
    cta: 'save',
    font: 'DM Serif Display',
    page: '#EAE5DD',
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${serif('DM Serif Display')};font-size:23px;font-weight:400;color:${INK};line-height:33px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#4B5563;line-height:28px;`,
    }),
    hero: (ev, p, ctaText) => {
      const S = serif('DM Serif Display');
      const line = ev.live
        ? '{{DATE_WEEKDAY}} &nbsp;&middot;&nbsp; {{DATE_MON}} {{DATE_DAY}} &nbsp;&middot;&nbsp; {{DATE_TIME_ONLY}}'
        : 'On demand &nbsp;&middot;&nbsp; Watch anytime';
      return `<tr>
                        <td align="left" valign="top" class="dm-surface m-pad m-top" bgcolor="#FBF8F3" style="background-color:#FBF8F3;padding:50px 48px 46px 48px;">
                            <p class="dm-accent" style="margin:0;font-family:${FONT};font-size:12px;font-weight:700;color:${p.accent};text-transform:uppercase;letter-spacing:2px;line-height:18px;">${line}</p>
                            <h1 class="hero-title dm-strong serif"
                                style="margin:16px 0 0 0;font-family:${S};font-size:46px;font-weight:400;color:${INK};line-height:52px;text-align:left;letter-spacing:-0.6px;">
                               {{TITLE}}
                            </h1>
                            <table ${T} width="100%" style="margin:28px 0 26px 0;"><tr><td class="dm-ink" bgcolor="${INK}" style="background-color:${INK};height:2px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table>
                            <table ${T}>
                                <tr>
                                    <td valign="middle" style="padding:0 18px 0 0;">${primaryBtn(ev, ctaText, { bg: p.accent, color: '#FFFFFF', pad: '16px 32px', size: 16, weight: 700 })}</td>
                                    ${ev.live ? `<td valign="middle" class="dm-body" style="font-family:${serif('DM Serif Display')};font-size:17px;font-style:italic;color:#4B5563;line-height:22px;">Free to Attend</td>` : ''}
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ${segBar(6)}`;
    },
    introRow: () => introRow('#FFFFFF', '46px 48px 26px 48px'),
    takeaways: (ev, p) => {
      const item = (n) => `
                            <table ${T} width="100%">
                                <tr>
                                    <td width="64" valign="top" class="dm-line dm-accent serif" style="width:64px;border-top:1px solid #E5DED3;padding:16px 0 14px 0;font-family:${serif('DM Serif Display')};font-size:38px;font-style:italic;color:${p.accent};line-height:40px;">${n}</td>
                                    <td valign="middle" class="dm-line" style="border-top:1px solid #E5DED3;padding:20px 0 18px 0;">${learnTitle(n, INK, 'font-size:17px;line-height:26px;font-weight:500;')}</td>
                                </tr>
                            </table>`;
      return row(`<table ${T} width="100%" style="margin:0 0 18px 0;"><tr>
                                <td valign="middle" class="dm-strong serif" style="font-family:${serif('DM Serif Display')};font-size:30px;color:${INK};line-height:36px;white-space:nowrap;padding:0 16px 0 0;">What You'll Learn</td>
                                <td valign="middle" width="100%" class="m-hide"><table ${T} width="100%"><tr><td class="dm-ink" bgcolor="${INK}" style="background-color:${INK};height:2px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td></tr></table></td>
                            </tr></table>${[1, 2, 3, 4].map(item).join('')}`, { bg: '#FBF8F3', pad: '46px 48px 12px 48px', c: 'takeaways-bg dm-surface m-pad' });
    },
    secCta: (ev) => row(secondaryBtn(ev, { bg: '#FBF8F3', color: INK, border: `border:1.5px solid ${INK};`, pad: '13px 30px', tdCls: 'dm-outline-invert' }), { bg: '#FBF8F3', pad: '16px 48px 50px 48px', c: 'sec-cta-section-td dm-surface m-pad' }),
    speakers: (p) => speakersBlock({ bg: '#FFFFFF', c: 'dm-surface', eyebrowColor: p.accent, headingFont: serif('DM Serif Display'), headingSize: 30, headingWeight: 400, headingCls: 'section-heading serif', pad: '52px 24px 36px 24px' }),
    hostCard: (p) => hostShell('', '', hostCentered(
      ringImg(100, p.accent, p.accent, '#FFFFFF', 'dm-surface'),
      hostName(INK, `font-family:${serif('DM Serif Display')};font-size:21px;font-weight:400;line-height:26px;`, 'serif'),
      hostRole('#6B7280', 'font-size:13px;line-height:19px;margin-top:6px;'), '10px 16px 16px 16px'), ''),
    ve: (p) => `<tr>
                        <td align="center" valign="middle" class="dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:16px 48px 8px 48px;">
                            <table ${T} width="100%"><tr>
                                <td class="dm-surface" bgcolor="#FBF8F3" style="background-color:#FBF8F3;border:4px double ${p.accent};padding:28px 30px;text-align:center;">
                                    <p class="dm-body" style="margin:0 0 18px 0;font-family:${FONT};font-size:15px;font-weight:400;color:#374151;line-height:24px;text-align:center;">
                                ${veCopy(`color:${INK};font-weight:800;`).replace('<strong ', '<strong class="dm-strong" ')}
                                    </p>
                                    ${veBtn({ bg: p.accent, color: '#FFFFFF', center: true })}
                                </td>
                            </tr></table>
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '30px 48px 42px 48px' }),
  },

  // --- F: "Afterglow" — a dark-native email: night canvas, hero inside a gradient-edged glass card,
  //        outlined brand-color numerals, dark speaker cards with glowing rings, matching event card
  F: {
    meta: { id: 'afterglow', label: 'Afterglow' },
    cta: 'register',
    font: 'Space Grotesk',
    page: '#05080E',
    dark: true,
    intro: (p) => ({
      lead: `margin:0 0 18px 0;font-family:${sans('Space Grotesk')};font-size:21px;font-weight:500;color:#F1F5F9;line-height:31px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#A9B4C6;line-height:27px;`,
      link: p.accentDm,
    }),
    hero: (ev, p, ctaText) => {
      const G = sans('Space Grotesk');
      const base = mix(p.deep, '#000000', 0.6);
      const glass = mix(base, '#FFFFFF', 0.05);
      const line = ev.live ? '{{DATE_TIME}}' : 'On demand &nbsp;&middot;&nbsp; Watch anytime';
      return `<tr>
                        <td align="left" valign="top" class="m-pad-sm" bgcolor="${base}" style="background-color:${base};background-image:radial-gradient(circle at 0% 0%, ${mix(p.accent, base, 0.25)} 0%, ${base} 62%);padding:44px 36px 40px 36px;">
                            <table ${T} width="100%"><tr>
                                <td bgcolor="${p.accentDm}" style="background-color:${p.accentDm};background-image:linear-gradient(135deg, ${p.bright} 0%, ${p.accentDm} 45%, ${mix(p.accent, base, 0.3)} 100%);border-radius:24px;padding:2px;">
                                    <table ${T} width="100%"><tr>
                                        <td class="m-card" bgcolor="${glass}" style="background-color:${glass};border-radius:22px;padding:36px 34px 36px 34px;">
                                            <table ${T}><tr><td valign="middle" style="padding:0 8px 0 0;">${shape(p.bright, 8, 8, 4)}</td><td valign="middle" style="font-family:${G};font-size:12px;font-weight:700;color:${p.accentDm};text-transform:uppercase;letter-spacing:1.8px;line-height:16px;">${line}</td></tr></table>
                                            <h1 class="hero-title" style="margin:18px 0 14px 0;font-family:${G};font-size:38px;font-weight:700;color:#FFFFFF;line-height:45px;text-align:left;letter-spacing:-1px;">
                                               {{TITLE}}
                                            </h1>
                                            ${ev.live ? `<p style="margin:0 0 28px 0;font-family:${FONT};font-size:15px;font-weight:500;color:#A9B4C6;line-height:22px;">Free to Attend</p>` : '<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="height:14px;font-size:0;line-height:0;">&nbsp;</td></tr></table>'}
                                            ${primaryBtn(ev, ctaText, { bg: p.bright, color: ON_BRIGHT, radius: '14px', pad: '16px 32px', size: 16, weight: 700, font: G, shadow: `0 0 30px -6px ${mix(p.bright, base, 0.4)}` })}
                                        </td>
                                    </tr></table>
                                </td>
                            </tr></table>
                        </td>
                    </tr>`;
    },
    introRow: (p) => `<tr>
                        <td align="left" valign="top" class="m-pad" bgcolor="${mix(p.deep, '#000000', 0.6)}" style="background-color:${mix(p.deep, '#000000', 0.6)};padding:30px 48px 20px 48px;">
                            {{INTRO}}
                        </td>
                    </tr>`,
    takeaways: (ev, p) => {
      const base = mix(p.deep, '#000000', 0.6);
      const item = (n) => `
                            <table ${T} width="100%">
                                <tr>
                                    <td width="54" valign="top" style="width:54px;padding:0 0 20px 0;">
                                        <table ${T}><tr><td width="36" height="36" align="center" valign="middle" style="width:36px;height:36px;border:2px solid ${BRAND[n - 1]};border-radius:50%;font-family:${sans('Space Grotesk')};font-size:15px;font-weight:700;color:${BRAND[n - 1]};line-height:36px;text-align:center;mso-line-height-rule:exactly;">${n}</td></tr></table>
                                    </td>
                                    <td valign="middle" style="padding:0 0 20px 0;">${learnTitle(n, '#E8EDF4', 'font-weight:500;font-size:17px;line-height:25px;', '')}</td>
                                </tr>
                            </table>`;
      return row(`<p style="margin:0 0 6px 0;font-family:${FONT};font-size:12px;font-weight:800;color:${p.bright};text-transform:uppercase;letter-spacing:2.2px;line-height:16px;">Your takeaways</p>
                            <h2 style="margin:0 0 26px 0;font-family:${sans('Space Grotesk')};font-size:30px;font-weight:700;color:#FFFFFF;line-height:36px;letter-spacing:-0.8px;">What You'll Learn</h2>${[1, 2, 3, 4].map(item).join('')}`,
      { bg: base, pad: '30px 48px 4px 48px', c: 'm-pad' });
    },
    secCta: (ev, p) => {
      const base = mix(p.deep, '#000000', 0.6);
      return row(secondaryBtn(ev, { bg: base, color: p.accentDm, border: `border:1.5px solid ${p.accentDm};`, radius: '14px', pad: '13px 28px', font: sans('Space Grotesk') }), { bg: base, pad: '6px 48px 52px 48px', c: 'm-pad' });
    },
    speakers: (p) => {
      const sec = mix(mix(p.deep, '#000000', 0.6), '#FFFFFF', 0.03);
      return speakersBlock({ bg: sec, c: '', eyebrowColor: p.bright, eyebrowCls: '', heading: '#FFFFFF', headingCls: '', headingFont: sans('Space Grotesk'), headingSize: 28, headingWeight: 700, headingExtra: 'letter-spacing:-0.7px;', pad: '50px 24px 42px 24px' });
    },
    hostCard: (p) => {
      const base = mix(p.deep, '#000000', 0.6);
      const card = mix(base, '#FFFFFF', 0.07);
      return hostShell(card, `border:1px solid ${mix(base, '#FFFFFF', 0.16)};border-radius:20px;`, hostCentered(
        ringImg(84, p.bright, p.accentDm, card),
        hostName('#FFFFFF', `font-family:${sans('Space Grotesk')};`, 'dm-keep-light'),
        hostRole(p.accentDm, 'font-weight:500;', ''), '26px 20px 26px 20px'), '');
    },
    ve: (p) => {
      const base = mix(p.deep, '#000000', 0.6);
      const sec = mix(base, '#FFFFFF', 0.03);
      const glass = mix(base, '#FFFFFF', 0.06);
      return `<tr>
                        <td align="left" valign="middle" class="m-pad-sm" bgcolor="${sec}" style="background-color:${sec};padding:4px 36px 12px 36px;">
                            <table ${T} width="100%"><tr>
                                <td bgcolor="${p.accentDm}" style="background-color:${p.accentDm};background-image:linear-gradient(135deg, ${p.bright} 0%, ${p.accentDm} 45%, ${mix(p.accent, base, 0.3)} 100%);border-radius:22px;padding:2px;">
                                    <table ${T} width="100%"><tr>
                                        <td class="m-card" bgcolor="${glass}" style="background-color:${glass};border-radius:20px;padding:28px 30px;">
                                            <p style="margin:0 0 18px 0;font-family:${FONT};font-size:15px;font-weight:400;color:#B6C2D4;line-height:24px;">
                                ${veCopy('color:#FFFFFF;font-weight:800;')}
                                            </p>
                                            ${veBtn({ bg: p.bright, color: ON_BRIGHT, radius: '14px' })}
                                        </td>
                                    </tr></table>
                                </td>
                            </tr></table>
                        </td>
                    </tr>`;
    },
    reminder: (ev, p) => reminderRow(ev, { bg: mix(mix(p.deep, '#000000', 0.6), '#FFFFFF', 0.03), color: '#94A3B8', link: p.accentDm, pad: '26px 48px 44px 48px', c: '', pCls: '' }),
  },

  // --- G: "Pastel" — bright and friendly: soft pastel gradient hero with brand dots, learnings on
  //        pastel cards tinted from the four brand colors, speaker cards with a pastel photo panel
  G: {
    meta: { id: 'pastel', label: 'Pastel' },
    cta: 'save',
    font: 'Outfit',
    page: '#EDEFF4',
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${sans('Outfit')};font-size:22px;font-weight:600;color:${INK};line-height:32px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:27px;`,
    }),
    hero: (ev, p, ctaText) => {
      const O = sans('Outfit');
      const dots = `<table ${T}><tr>${BRAND.map((c) => `<td style="padding:0 6px 0 0;">${shape(c, 12, 12, 6)}</td>`).join('')}</tr></table>`;
      const line = ev.live ? '{{DATE_TIME}}' : 'On demand &nbsp;&middot;&nbsp; Watch anytime';
      return `<tr>
                        <td align="left" valign="top" class="dm-tint m-pad m-top" bgcolor="${p.glowA}" style="background-color:${p.glowA};background-image:linear-gradient(125deg, ${p.glowA} 0%, ${p.glowB} 100%);padding:46px 48px 48px 48px;">
                            ${dots}
                            <h1 class="hero-title dm-strong" style="margin:22px 0 16px 0;font-family:${O};font-size:42px;font-weight:700;color:${INK};line-height:48px;text-align:left;letter-spacing:-1px;">
                               {{TITLE}}
                            </h1>
                            <p class="hero-meta dm-body" style="margin:0 0 28px 0;font-family:${FONT};font-size:16px;font-weight:600;color:#334155;line-height:24px;">${line}</p>
                            <table ${T}>
                                <tr>
                                    <td valign="middle" style="padding:0 16px 0 0;">${primaryBtn(ev, ctaText, { bg: INK, color: '#FFFFFF', pad: '16px 32px', size: 16, weight: 700, font: O, tdCls: 'dm-btn-invert' })}</td>
                                    ${ev.live ? `<td valign="middle" class="dm-accent" style="font-family:${O};font-size:15px;font-weight:600;color:${p.accent};line-height:20px;">Free to Attend</td>` : ''}
                                </tr>
                            </table>
                        </td>
                    </tr>`;
    },
    introRow: () => introRow('#FFFFFF', '46px 48px 26px 48px'),
    takeaways: () => {
      const card = (n) => {
        const c = BRAND[n - 1];
        const fill = mix(c, '#FFFFFF', 0.86);
        return `
                            <table ${T} width="100%" style="margin:0 0 10px 0;">
                                <tr>
                                    <td class="dm-raised" bgcolor="${fill}" style="background-color:${fill};border-radius:18px;padding:16px 18px;">
                                        <table ${T} width="100%"><tr>
                                            <td width="46" valign="middle" style="width:46px;">
                                                <table ${T}><tr><td width="34" height="34" align="center" valign="middle" bgcolor="${c}" style="width:34px;height:34px;background-color:${c};border-radius:50%;font-family:${sans('Outfit')};font-size:15px;font-weight:700;color:${BRAND_TEXT[n - 1]};line-height:34px;text-align:center;mso-line-height-rule:exactly;">${n}</td></tr></table>
                                            </td>
                                            <td valign="middle" style="padding:0 0 0 4px;">${learnTitle(n, INK, 'font-weight:600;')}</td>
                                        </tr></table>
                                    </td>
                                </tr>
                            </table>`;
      };
      return row(`<h2 class="section-heading" style="margin:0 0 20px 0;font-family:${sans('Outfit')};font-size:28px;font-weight:700;color:${INK};line-height:34px;letter-spacing:-0.5px;">What You'll Learn</h2>${[1, 2, 3, 4].map(card).join('')}`,
        { pad: '20px 48px 0 48px', c: 'takeaways-bg dm-surface m-pad' });
    },
    secCta: (ev) => row(secondaryBtn(ev, { bg: '#FFFFFF', color: INK, border: `border:2px solid ${INK};`, pad: '13px 30px', font: sans('Outfit'), tdCls: 'dm-outline-invert' }), { pad: '20px 48px 52px 48px', c: 'sec-cta-section-td dm-surface m-pad' }),
    speakers: (p) => speakersBlock({ bg: '#F6F7FA', c: 'dm-page', eyebrowColor: p.accent, headingFont: sans('Outfit'), headingSize: 28, headingWeight: 700, headingExtra: 'letter-spacing:-0.5px;', pad: '50px 24px 42px 24px' }),
    hostCard: (p) => hostShell('#FFFFFF', 'border-radius:22px;', `
                <tr><td align="center" class="dm-tint" bgcolor="${p.soft}" style="background-color:${p.soft};background-image:linear-gradient(135deg, ${p.glowA} 0%, ${p.soft} 100%);border-radius:22px 22px 0 0;padding:22px 0 18px 0;text-align:center;">
                    <table ${T} align="center" style="margin:0 auto;"><tr><td bgcolor="#FFFFFF" class="dm-raised" style="background-color:#FFFFFF;padding:4px;border-radius:50%;">${hostImg(84, '50%')}</td></tr></table>
                </td></tr>
                <tr><td align="center" style="padding:16px 18px 22px 18px;text-align:center;">
                    ${hostName(INK, `font-family:${sans('Outfit')};font-weight:700;`)}
                    ${hostRole('#64748B')}
                </td></tr>`),
    ve: (p) => `<tr>
                        <td align="left" valign="middle" class="dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:16px 48px 8px 48px;">
                            <table ${T} width="100%"><tr>
                                <td class="dm-raised" bgcolor="${p.glowB}" style="background-color:${p.glowB};background-image:linear-gradient(125deg, ${p.glowB} 0%, ${p.glowA} 100%);border-radius:22px;padding:28px 30px;">
                                    <table ${T} style="margin:0 0 16px 0;"><tr>${BRAND.map((c) => `<td style="padding:0 6px 0 0;">${shape(c, 10, 10, 5)}</td>`).join('')}</tr></table>
                                    <p class="dm-body" style="margin:0 0 18px 0;font-family:${FONT};font-size:15px;font-weight:400;color:#334155;line-height:24px;">
                                ${veCopy(`color:${INK};font-weight:800;`).replace('<strong ', '<strong class="dm-strong" ')}
                                    </p>
                                    ${veBtn({ bg: INK, color: '#FFFFFF', font: sans('Outfit'), tdCls: 'dm-btn-invert' })}
                                </td>
                            </tr></table>
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '30px 48px 42px 48px' }),
  },

  // --- H: "Spotlight" — speakers first: a deep centered hero that flows straight into the speaker
  //        cards, then the intro, learnings as an agenda table with a dark header and zebra rows,
  //        and a full-width accent band for the virtual event
  H: {
    meta: { id: 'spotlight', label: 'Spotlight' },
    cta: 'register',
    font: 'Sora',
    page: '#E4E8ED',
    order: ['hero', 'speakers', 'intro', 'takeaways', 'secCta', 've', 'reminder'],
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${sans('Sora')};font-size:20px;font-weight:600;color:${INK};line-height:31px;letter-spacing:-0.3px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:27px;`,
    }),
    hero: (ev, p, ctaText) => {
      const S = sans('Sora');
      const soft = mix(p.deep, '#FFFFFF', 0.75);
      const line = ev.live ? `{{DATE_TIME}} &nbsp;<span style="color:${p.bright};">&#9679;</span>&nbsp; Free to Attend` : 'On demand &nbsp;&middot;&nbsp; Watch anytime';
      return `<tr>
                        <td align="center" valign="top" class="m-pad m-top" bgcolor="${p.deep}" style="background-color:${p.deep};background-image:radial-gradient(ellipse at 50% 0%, ${mix(p.accent, p.deep, 0.15)} 0%, ${p.deep} 70%);padding:50px 48px 30px 48px;text-align:center;">
                            ${brandBars(18, 4, 4).replace('<table ', '<table align="center" style="margin:0 auto;" ')}
                            <h1 class="hero-title" style="margin:22px 0 16px 0;font-family:${S};font-size:38px;font-weight:700;color:#FFFFFF;line-height:46px;text-align:center;letter-spacing:-1px;">
                               {{TITLE}}
                            </h1>
                            <p class="hero-meta" style="margin:0 0 28px 0;font-family:${FONT};font-size:15px;font-weight:500;color:${soft};line-height:23px;text-align:center;">${line}</p>
                            ${primaryBtn(ev, ctaText, { bg: p.bright, color: ON_BRIGHT, pad: '16px 34px', size: 16, weight: 700, font: S, center: true })}
                            <table ${T} width="100%" style="margin:40px 0 0 0;"><tr><td style="border-top:1px solid ${mix(p.deep, '#FFFFFF', 0.16)};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr></table>
                        </td>
                    </tr>`;
    },
    // Speakers sit on the hero color, right under the headline
    speakers: (p) => speakersBlock({ bg: p.deep, c: '', eyebrowColor: p.bright, eyebrowCls: '', heading: '#FFFFFF', headingCls: '', headingFont: sans('Sora'), headingSize: 24, headingWeight: 700, headingExtra: 'letter-spacing:-0.5px;', pad: '10px 24px 46px 24px' }),
    hostCard: (p) => {
      const card = mix(p.deep, '#FFFFFF', 0.08);
      return hostShell(card, `border:1px solid ${mix(p.deep, '#FFFFFF', 0.18)};border-radius:20px;`, hostCentered(
        ringImg(84, p.bright, p.accentDm, card),
        hostName('#FFFFFF', `font-family:${sans('Sora')};font-size:16px;font-weight:700;line-height:22px;`, 'dm-keep-light'),
        hostRole(mix(p.deep, '#FFFFFF', 0.72), 'font-size:12px;line-height:18px;', ''), '24px 18px 24px 18px'), '');
    },
    introRow: () => introRow('#FFFFFF', '50px 48px 26px 48px'),
    takeaways: (ev, p) => {
      const rowCell = (n) => {
        const zebra = n % 2 === 0;
        const bg = zebra ? '#F5F7FA' : '#FFFFFF';
        const last = n === 4;
        return `<tr>
                                    <td width="56" valign="top" class="${zebra ? 'dm-raised' : 'dm-surface'} dm-accent" bgcolor="${bg}" style="width:56px;background-color:${bg};${last ? 'border-radius:0 0 0 17px;' : ''}padding:18px 0 18px 22px;font-family:${sans('Sora')};font-size:15px;font-weight:700;color:${p.accent};line-height:24px;">${two(n)}</td>
                                    <td valign="top" class="${zebra ? 'dm-raised' : 'dm-surface'}" bgcolor="${bg}" style="background-color:${bg};${last ? 'border-radius:0 0 17px 0;' : ''}padding:18px 22px 18px 4px;">${learnTitle(n, INK, 'font-weight:600;')}</td>
                                </tr>`;
      };
      return row(`<table ${T} width="100%" class="dm-line" style="border:1px solid #DDE3EA;border-radius:18px;border-collapse:separate;">
                                <tr>
                                    <td colspan="2" bgcolor="${p.deep}" style="background-color:${p.deep};border-radius:17px 17px 0 0;padding:18px 22px;">
                                        <table ${T} width="100%"><tr>
                                            <td valign="middle" style="font-family:${sans('Sora')};font-size:19px;font-weight:700;color:#FFFFFF;line-height:26px;">What You'll Learn</td>
                                            <td valign="middle" align="right">${brandBars(12, 4, 4)}</td>
                                        </tr></table>
                                    </td>
                                </tr>
                                ${[1, 2, 3, 4].map(rowCell).join('\n                                ')}
                            </table>`, { pad: '10px 48px 0 48px', c: 'takeaways-bg dm-surface m-pad' });
    },
    secCta: (ev, p) => row(secondaryBtn(ev, { bg: '#FFFFFF', color: p.accent, border: `border:2px solid ${p.accent};`, pad: '13px 30px', font: sans('Sora'), tdCls: 'dm-surface', aCls: 'dm-accent' }), { pad: '24px 48px 48px 48px', c: 'sec-cta-section-td dm-surface m-pad' }),
    ve: (p) => `<tr>
                        <td align="left" valign="middle" class="m-pad" bgcolor="${p.accent}" style="background-color:${p.accent};background-image:linear-gradient(120deg, ${p.accent} 0%, ${mix(p.accent, p.deep, 0.45)} 100%);padding:38px 48px;">
                            <p style="margin:0 0 20px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#E6EEF6;line-height:26px;">
                                ${veCopy('color:#FFFFFF;font-weight:800;')}
                            </p>
                            ${veBtn({ bg: '#FFFFFF', color: p.accent, font: sans('Sora') })}
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '30px 48px 42px 48px' }),
  },

  // --- I: "Aurora" — vivid gradient hero, glass date pill and a white card
  //        edge, 2×2 learning tiles with gradient number badges, soft glow behind the speakers
  //        (restored from the Nov 23 build at the user's request)
  I: {
    meta: { id: 'aurora', label: 'Aurora' },
    cta: 'register',
    font: 'Sora',
    page: '#ECEEF5',
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${FONT};font-size:19px;font-weight:500;color:${INK};line-height:31px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:28px;`,
    }),
    hero: (ev, p, ctaText) => {
      const S = sans('Sora');
      const glass = mix(p.accent, '#FFFFFF', 0.16);
      return `<tr>
                        <td align="center" valign="top" bgcolor="${p.accent}"
                            style="background-color:${p.accent};background-image:radial-gradient(circle at 88% 8%, ${mix(p.bright, p.accent, 0.35)} 0%, ${p.accent} 30%, transparent 60%), radial-gradient(circle at 6% 92%, ${mix(p.accent, '#FFFFFF', 0.25)} 0%, transparent 45%), linear-gradient(160deg, ${p.accent} 0%, ${p.deep} 100%);padding:56px 0 0 0;">
                            <table ${T} width="100%"><tr><td class="m-pad" align="center" style="padding:0 52px 50px 52px;text-align:center;">
                            <h1 class="hero-title"
                                style="margin:0 0 22px 0;font-family:${S};font-size:38px;font-weight:700;color:#FFFFFF;line-height:46px;text-align:center;letter-spacing:-1px;">
                               {{TITLE}}
                            </h1>
                            ${ev.live ? `<table ${T} align="center" style="margin:0 auto 30px auto;"><tr><td bgcolor="${glass}" style="background-color:${glass};border:1px solid ${mix(p.accent, '#FFFFFF', 0.36)};border-radius:999px;padding:8px 18px;"><p class="hero-meta" style="margin:0;font-family:${FONT};font-size:14px;font-weight:600;color:#FFFFFF;line-height:20px;text-align:center;">{{DATE_TIME}} &nbsp;&middot;&nbsp; Free to Attend</p></td></tr></table>` : '<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="height:8px;font-size:0;line-height:0;">&nbsp;</td></tr></table>'}
                            ${primaryBtn(ev, ctaText, { bg: '#FFFFFF', color: p.accent, pad: '17px 38px', size: 16, weight: 800, center: true, font: S, shadow: `0 12px 30px -10px ${mix(p.deep, '#000000', 0.5)}` })}
                            </td></tr></table>
                            <table ${T} width="100%"><tr>
                                <td class="dm-surface" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:32px 32px 0 0;height:32px;font-size:0;line-height:0;">&nbsp;</td>
                            </tr></table>
                        </td>
                    </tr>`;
    },
    takeaways: (ev, p) => row(`${eyebrow("What You'll Learn", p.accent, 'padding:0 12px;')}
                            ${grid2((i) => `bgcolor="#F5F6FB" style="background-color:#F5F6FB;border:1px solid #E7E9F3;border-radius:20px;padding:22px 20px 24px 20px;">
                                    <table ${T}><tr><td align="center" valign="middle" bgcolor="${p.accent}" style="background-color:${p.accent};background-image:linear-gradient(135deg, ${mix(p.accent, '#FFFFFF', 0.12)} 0%, ${p.deep} 100%);border-radius:50%;width:40px;height:40px;font-family:${sans('Sora')};font-size:14px;font-weight:700;color:#FFFFFF;line-height:40px;text-align:center;">${two(i + 1)}</td></tr></table>
                                    ${learnTitle(i + 1, INK, 'margin-top:14px;')}`, 12, 'tile-cell takeaway-card-cell')}`, { pad: '18px 36px 18px 36px', c: 'takeaways-bg dm-surface m-pad-sm' }),
    secCta: (ev, p) => row(secondaryBtn(ev, { bg: p.accent, color: '#FFFFFF', pad: '15px 32px', center: true, font: sans('Sora'), grad: `linear-gradient(135deg, ${p.accent} 0%, ${p.deep} 100%)` }), { pad: '10px 48px 56px 48px', align: 'center', c: 'sec-cta-section-td dm-surface' }),
    speakers: (p) => speakersBlock({ bg: p.glowA, grad: `linear-gradient(160deg, ${p.glowA} 0%, #FFFFFF 50%, ${p.glowB} 100%)`, eyebrowColor: p.accent, headingFont: sans('Sora'), headingWeight: 700 }),
    hostCard: (p) => hostShell('#FFFFFF', `border:1px solid ${p.line};border-radius:24px;`, hostCentered(
      ringImg(90, p.accent, p.bright), hostName(INK), hostRole(p.accent, 'font-weight:600;'))),
    ve: (p) => `<tr>
                        <td align="center" valign="middle" class="ve-callout-td dm-tint m-pad" bgcolor="${p.tint}" style="background-color:${p.tint};padding:34px 48px;text-align:center;">
                            <p style="margin:0 0 18px 0;font-family:${FONT};font-size:15px;font-weight:400;color:#334155;line-height:24px;text-align:center;">
                                ${veCopy(`color:${INK};font-weight:800;`)}
                            </p>
                            ${veBtn({ bg: p.accent, color: '#FFFFFF', center: true, grad: `linear-gradient(135deg, ${p.accent} 0%, ${p.deep} 100%)` })}
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '28px 48px 36px 48px' }),
  },

  // --- J: "Classic" — clean corporate layout: strong headline with an accent underline, a tidy
  //        details box (date/time, admission), learnings marked with slim brand-color bars,
  //        understated speaker cards and a tinted event box
  J: {
    meta: { id: 'classic', label: 'Classic' },
    cta: 'register',
    font: 'Manrope',
    page: '#E9ECF0',
    intro: () => ({
      lead: `margin:0 0 18px 0;font-family:${sans('Manrope')};font-size:20px;font-weight:700;color:${INK};line-height:31px;`,
      body: `margin:0 0 16px 0;font-family:${FONT};font-size:16px;font-weight:400;color:#475569;line-height:27px;`,
    }),
    hero: (ev, p, ctaText) => {
      const M = sans('Manrope');
      const detail = (label, value, last) => `<tr>
                                    <td width="120" valign="top" class="dm-muted${last ? '' : ' dm-line'}" style="width:120px;${last ? '' : 'border-bottom:1px solid #E2E8F0;'}padding:14px 0 14px 20px;font-family:${FONT};font-size:12px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1.2px;line-height:20px;">${label}</td>
                                    <td valign="top" class="dm-strong${last ? '' : ' dm-line'}" style="${last ? '' : 'border-bottom:1px solid #E2E8F0;'}padding:14px 20px 14px 8px;font-family:${M};font-size:15px;font-weight:700;color:${INK};line-height:20px;">${value}</td>
                                </tr>`;
      const details = ev.live
        ? detail('When', '{{DATE_TIME}}', false) + detail('Admission', 'Free to Attend', true)
        : detail('Access', 'On demand &middot; Watch anytime', false) + detail('Admission', 'Free', true);
      return `<tr>
                        <td align="left" valign="top" class="dm-surface m-pad m-top" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:48px 48px 46px 48px;">
                            <h1 class="hero-title dm-strong" style="margin:0;font-family:${M};font-size:38px;font-weight:800;color:${INK};line-height:46px;text-align:left;letter-spacing:-1px;">
                               {{TITLE}}
                            </h1>
                            ${shape(p.accent, 64, 4, 2).replace('<table ', '<table style="margin:22px 0 26px 0;" ')}
                            <table ${T} width="100%" class="dm-raised" bgcolor="#F8FAFC" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;margin:0 0 28px 0;">
                                ${details}
                            </table>
                            ${primaryBtn(ev, ctaText, { bg: p.accent, color: '#FFFFFF', radius: '8px', pad: '16px 32px', size: 16, weight: 700, font: M })}
                        </td>
                    </tr>`;
    },
    introRow: () => introRow('#FFFFFF', '4px 48px 30px 48px'),
    takeaways: () => {
      const item = (n) => `
                            <table ${T} width="100%" style="margin:0 0 12px 0;">
                                <tr>
                                    <td width="4" bgcolor="${BRAND[n - 1]}" style="width:4px;background-color:${BRAND[n - 1]};border-radius:2px;font-size:0;line-height:0;">&nbsp;</td>
                                    <td valign="middle" style="padding:6px 0 6px 16px;">${learnTitle(n, INK, 'font-weight:600;')}</td>
                                </tr>
                            </table>`;
      return row(`<h2 class="section-heading" style="margin:0 0 22px 0;font-family:${sans('Manrope')};font-size:26px;font-weight:800;color:${INK};line-height:32px;letter-spacing:-0.6px;">What You'll Learn</h2>${[1, 2, 3, 4].map(item).join('')}`,
        { bg: '#F6F8FA', pad: '44px 48px 14px 48px', c: 'takeaways-bg dm-page m-pad' });
    },
    secCta: (ev, p) => row(secondaryBtn(ev, { bg: '#F6F8FA', color: p.accent, border: `border:2px solid ${p.accent};`, radius: '8px', pad: '13px 28px', font: sans('Manrope'), tdCls: 'takeaways-bg', aCls: 'dm-accent' }), { bg: '#F6F8FA', pad: '14px 48px 48px 48px', c: 'takeaways-bg dm-page m-pad' }),
    speakers: (p) => speakersBlock({ bg: '#FFFFFF', c: 'dm-surface', eyebrowColor: p.accent, headingFont: sans('Manrope'), headingSize: 26, headingWeight: 800, headingExtra: 'letter-spacing:-0.6px;', pad: '50px 24px 40px 24px' }),
    hostCard: () => hostShell('#FFFFFF', 'border:1px solid #E2E8F0;border-radius:12px;', hostRow(
      hostImg(64, '50%'), 82, hostName(INK, `font-family:${sans('Manrope')};font-size:16px;line-height:21px;`), hostRole('#64748B', 'font-size:12px;line-height:17px;'))),
    ve: (p) => `<tr>
                        <td align="left" valign="middle" class="dm-surface m-pad" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:8px 48px 8px 48px;">
                            <table ${T} width="100%"><tr>
                                <td class="dm-tint" bgcolor="${p.tint}" style="background-color:${p.tint};border-radius:12px;padding:26px 28px;">
                                    <p class="dm-body" style="margin:0 0 18px 0;font-family:${FONT};font-size:15px;font-weight:400;color:#334155;line-height:24px;">
                                ${veCopy(`color:${INK};font-weight:800;`).replace('<strong ', '<strong class="dm-strong" ')}
                                    </p>
                                    ${veBtn({ bg: p.accent, color: '#FFFFFF', radius: '8px', font: sans('Manrope') })}
                                </td>
                            </tr></table>
                        </td>
                    </tr>`,
    reminder: (ev, p) => reminderRow(ev, { bg: '#FFFFFF', link: p.accent, pad: '30px 48px 42px 48px' }),
  },
};

// Dark-canvas credits for dark-native designs (same copy as CREDIT_HTML_BLOCK)
const creditBlock = (dark) => {
  const bg = dark ? '#0E1420' : '#F8F9FA';
  const text = dark ? '#94A3B8' : '#718096';
  return `
<tr>
    <td align="center" valign="top" style="background-color:${bg};padding:32px 30px;" bgcolor="${bg}" class="${dark ? '' : 'credit-bg '}credit-section-td">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="credit-stack-table">
                            <tr>
                                <td width="90" align="center" valign="top" class="credit-badge-cell">
                                    <img alt="HRCI" src="https://media-cdn.hr.com/2026HRCIRecertificationProviderSealNEW_V2.jpg" style="display:inline-block;max-width:90px;width:80px;height:80px;border:0;" width="80" />
                                </td>
                                <td align="left" valign="top" class="credit-text-cell" style="color:${text};padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">
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
                                <td align="left" valign="top" class="credit-text-cell" style="color:${text};padding-left:14px;padding-top:10px;font-family:'Roboto',Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;font-weight:400">
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
};


// =====================================================
// TEMPLATE ASSEMBLER — Builds complete HTML per variant
// =====================================================

// A template in three parts. `top` (head, brand bar, logo header) and `bottom` (credits,
// footer) frame every design; `middle` is the variant's own sections.
function buildParts(eventKey, variantKey, palette) {
  const ev = EVENTS[eventKey];
  const v = VARIANTS[variantKey];
  const p = palette || PALETTES[eventKey];
  const ctaText = eventKey === 'ondemand'
    ? ev.ctaText
    : (v.cta === 'save' ? 'Save My Free Spot &rarr;' : 'Register Free &rarr;');

  const top = DOC_OPEN(HEAD_BOILERPLATE(p, v.font, v.page), v.page) + '\n' + RAINBOW(4) + '\n' + HEADER_BAR('{{BADGE}}', p);
  // A design may set its own section order (v.order); the default is the standard one
  const sections = {
    hero: () => v.hero(ev, p, ctaText),
    intro: () => (v.introRow ? v.introRow(p) : introRow('#FFFFFF', '46px 48px 12px 48px')),
    takeaways: () => v.takeaways(ev, p),
    secCta: () => v.secCta(ev, p),
    speakers: () => v.speakers(p),
    ve: () => (ev.hasVE ? v.ve(p) : ''),
    reminder: () => v.reminder(ev, p),
  };
  const middle = (v.order || ['hero', 'intro', 'takeaways', 'secCta', 'speakers', 've', 'reminder'])
    .map((k) => sections[k]()).filter(Boolean).join('\n');
  const bottom = '                   {{CREDIT_SECTION}}\n' + FOOTER + '\n' + DOC_CLOSE;
  return { top, middle, bottom };
}

function buildTemplate(eventKey, variantKey, palette) {
  const { top, middle, bottom } = buildParts(eventKey, variantKey, palette);
  return top + '\n' + middle + '\n' + bottom;
}

// Everything render.js needs for one variant
function variantObject(eventKey, vk, palette) {
  const v = VARIANTS[vk];
  const p = palette || PALETTES[eventKey];
  return {
    id: v.meta.id,
    label: v.meta.label,
    html: buildTemplate(eventKey, vk, p),
    badge: EVENTS[eventKey].label,
    hostCard: v.hostCard(p),
    introStyle: v.intro ? v.intro(p) : null,
    creditHtml: creditBlock(!!v.dark),
  };
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
    variants: Object.keys(VARIANTS).map((vk) => variantObject(eventKey, vk)),
  };
});


export { PALETTES, DM };
export const VARIANT_KEYS = Object.keys(VARIANTS);

// One variant built with a custom palette (client branding). Same shape as TEMPLATES[ev].variants[i].
export function buildVariant(eventKey, variantIndex, palette) {
  return variantObject(eventKey, VARIANT_KEYS[variantIndex], palette);
}

// Parts of one variant, for building a brand-new design around the fixed top and bottom
export function variantParts(eventKey, variantIndex, palette) {
  const vk = VARIANT_KEYS[variantIndex];
  const p = palette || PALETTES[eventKey];
  return { ...buildParts(eventKey, vk, p), hostCard: VARIANTS[vk].hostCard(p) };
}

// A brand-new design: Claude's middle sections between the fixed top and bottom.
// extraCss (optional) goes in its own <style> block at the end of <head>.
export function assembleCustom(eventKey, palette, middle, hostCard, extraCss = '') {
  const { top, bottom } = buildParts(eventKey, VARIANT_KEYS[0], palette);
  const head = extraCss ? top.replace('</head>', `    <style type="text/css">\n${extraCss}\n    </style>\n</head>`) : top;
  return { id: 'custom', label: 'New design', badge: EVENTS[eventKey].label, html: head + '\n' + middle + '\n' + bottom, hostCard };
}


// =====================================================
// BACKWARD-COMPATIBLE EXPORTS
// =====================================================

// Default HOST_CARD (first design) for backward compatibility
export const HOST_CARD = TEMPLATES.demo.variants[0].hostCard;

// Credit section (shared by every light design)
export const CREDIT_HTML_BLOCK = creditBlock(false);
