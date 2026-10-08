/* --- HR.com WEBCAST Extractor --- */
/**
 * HOW TO USE:
 * 1. Open your Webcast landing page.
 * 2. Paste this into the Console (F12 -> Console).
 * 3. Copy the TAB-separated row and paste it into your Google Sheet.
 */

(function () {
    const getText = (selector, context = document) => {
        const el = context.querySelector(selector);
        return el ? el.innerText.trim() : "";
    };

    // 1. High-Level Event Info
    const eventTitle = getText('h1') || getText('.NewWebcast-Block h1') || "N/A";
    const eventDate = getText('.wv_dt_info') || "N/A";

    // 2. Description Logic
    let description = "N/A";
    const descBlock = document.querySelector('#tab3');
    if (descBlock) {
        const descClone = descBlock.cloneNode(true);
        const subH = descClone.querySelector('.SubHeader');
        if (subH) subH.remove();

        // Remove the notification about sponsor emails
        const pTags = descClone.querySelectorAll('p, strong');
        pTags.forEach(p => {
            if (p.innerText.includes("By registering for this webcast you will receive email communications")) {
                p.remove();
            }
        });
        description = descClone.innerText.trim();
    } else {
        // Fallback
        description = getText('.WebcastDetailBlock') || "N/A";
    }
    const cleanDesc = description.replace(/\s\s+/g, ' ').replace(/\n/g, ' ');

    // 3. Structured Sponsor Extraction (Name :: Logo :: Link)
    const sponsors = [];
    const sponsorList = document.querySelectorAll('.spons_list .ClientLogo, .spons_list img, .sponsor-webcast img');
    if (sponsorList.length > 0) {
        sponsorList.forEach(img => {
            const name = img.getAttribute('alt') || img.getAttribute('title') || "Sponsor";
            let logo = img.src || "N/A";
            if (logo.startsWith('/')) logo = "https://public-cdn.hr.com" + logo;

            let link = "N/A";
            // Attempt to find the link via button onclick or ahref
            const container = img.closest('td, .spons_list, .sponsor-webcast');
            if (container) {
                const btn = container.querySelector('button[onclick]');
                const a = container.querySelector('a');
                if (btn) {
                    const match = btn.getAttribute('onclick').match(/location\.href=['"](.*?)['"]/);
                    if (match) {
                        link = match[1];
                        if (link.startsWith('/')) link = "https://www.hr.com" + link;
                    }
                } else if (a) {
                    link = a.href;
                }
            }

            sponsors.push(`${name}::${logo}::${link}`);
        });
    }

    // 4. Presenter Extraction (Webcasts usually have presenters instead of sessions)
    const presenters = [];
    const presenterBlocks = document.querySelectorAll('.Presenter-Name, .YourHosts td');
    presenterBlocks.forEach(block => {
        const h4 = block.querySelector('h4') || block.querySelector('strong');
        const img = block.querySelector('img');
        if (h4) {
            const name = h4.innerText.trim();
            let imgUrl = img ? img.getAttribute('src') || img.src : "";
            if (imgUrl && imgUrl.startsWith('/')) imgUrl = "https://public-cdn.hr.com" + imgUrl;

            const clone = block.cloneNode(true);
            if (clone.querySelector('h4')) clone.querySelector('h4').remove();
            if (clone.querySelector('a')) clone.querySelector('a').remove();
            if (clone.querySelector('img')) clone.querySelector('img').remove();

            const titleCompany = clone.innerText.trim().replace(/\n+/g, ' - ').replace(/-\s*-/g, '-').replace(/^-|-$/g, '').trim();

            presenters.push(`${name}::${titleCompany}::${imgUrl}`);
        }
    });
    const sessionStr = presenters.length > 0 ? presenters.join(' | ') : "N/A";

    // 5. Credit Extraction
    const credits = [];
    const seenCreditText = new Set();
    // Only select images that are actually visible on the screen
    const creditImages = Array.from(document.querySelectorAll('.credit-section img, .NewWebcast-credits img, img[alt*="SHRM"], img[src*="shrm"], img[alt*="HRCI"], img[src*="hrci"]'))
        .filter(img => img.offsetParent !== null);

    creditImages.forEach(img => {
        let logo = img.src || "N/A";
        if (logo.startsWith('/')) logo = "https://public-cdn.hr.com" + logo;

        let container = img.closest('.row') || img.closest('table') || img.closest('.NewWebcast-credits') || img.parentElement.parentElement;
        let text = "";

        if (container) {
            // innerText natively ignores elements structured with display:none
            let t = container.innerText.trim();
            // Remove alt text of image if it accidentally gets included
            if (img.alt) t = t.replace(img.alt, '').trim();

            if (t.length > 20) {
                text = t.replace(/\n+/g, ' ').replace(/\s\s+/g, ' ');
            }
        }

        if (text && !seenCreditText.has(text) && (text.includes("Credit") || text.includes("recertification") || text.includes("SHRM") || text.includes("HRCI"))) {
            seenCreditText.add(text);
            credits.push(`${logo}::${text}`);
        }
    });

    const creditStr = credits.length > 0 ? credits.join(' | ') : "N/A";

    const regLinkEl = document.querySelector('#reg_link');
    let regLink = "N/A";
    if (regLinkEl && regLinkEl.hasAttribute('href')) {
        regLink = regLinkEl.getAttribute('href');
        if (regLink.startsWith('/')) regLink = "https://www.hr.com" + regLink;
    }

    // 6. Final Row Assembly
    // Same column order as the virtual event extractor so it matches your spreadsheet!
    const row = `${eventTitle}\t${eventDate}\t${cleanDesc}\t${sponsors.join(' | ')}\t${sessionStr}\t${regLink}\t${creditStr}`;

    function copyToClipboard(text) {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    copyToClipboard(row);
    console.log("=== WEBCAST EXTRACTOR SUCCESS ===");
    console.table({ Title: eventTitle, Presenters: presenters.length, Sponsors: sponsors.length });
    alert("SUCCESS! Webcast details and " + presenters.length + " presenter(s) captured to clipboard.");
})();
