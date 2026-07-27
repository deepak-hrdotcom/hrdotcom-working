/* --- HR.com VIRTUAL EVENT Extractor (V3 - Universal & Robust) --- */
/**
 * HOW TO USE:
 * 1. Open your Virtual Event landing page.
 * 2. Paste this into the Console (F12 -> Console).
 * 3. Copy the TAB-separated row and paste it into your Google Sheet.
 */

(function() {
    const getText = (selector, context = document) => {
        const el = context.querySelector(selector);
        return el ? el.innerText.trim() : "";
    };

    // 1. High-Level Event Info
    const eventTitle = getText('h1') || getText('.Page-Header h1') || "N/A";
    const eventDate = getText('.event_date') || getText('.event-date') || getText('.wv_dt_info') || "N/A";
    
    // 2. Description Logic: Targeted search for the Summary section
    let description = "N/A";
    const summaryHeader = Array.from(document.querySelectorAll('h3, h4, h2')).find(h => h.innerText.toLowerCase().includes("summary"));
    
    if (summaryHeader) {
        // Find the nearest paragraph or text block following the header
        const nextEl = summaryHeader.parentElement.nextElementSibling || summaryHeader.nextElementSibling;
        description = nextEl?.innerText.trim() || "N/A";
    }

    // Fallback if the header method fails
    if (description === "N/A" || description.length < 50) {
        const descriptionSelectors = ['#tab3 p', '.event-description', '.Dark', '.webcast_text', '.WhosGoing-Event-Block p'];
        for (const sel of descriptionSelectors) {
            const text = getText(sel);
            if (text && text.length > 50) {
                description = text;
                break;
            }
        }
    }
    const cleanDesc = description.replace(/\s\s+/g, ' ').replace(/\n/g, ' '); 
    const regLink = "https://www.hr.com" + (document.querySelector('#reg_link')?.getAttribute('href') || "");

    // 3. Structured Sponsor Extraction (Name :: Logo :: Link)
    const sponsorItems = document.querySelectorAll('.sponsList li, .spons_img, .sponsTitle, .sponsor-item');
    let sponsors = [];
    
    sponsorItems.forEach(item => {
        const img = item.querySelector('img');
        const name = img?.getAttribute('title') || img?.getAttribute('alt') || item.innerText.trim() || "Sponsor";
        let logo = img?.src || "N/A";
        if (logo.startsWith('/')) logo = "https://public-cdn.hr.com" + logo;
        const link = item.querySelector('a')?.href || "N/A";
        
        if(name !== "Sponsor") {
            sponsors.push(`${name}::${logo}::${link}`);
        }
    });

    // 4. Structured Session Extraction (Title :: Time :: Link)
    const sessionBlocks = document.querySelectorAll('.WhosGoing-Event-Block, .wv_title_row, .session-item, .schedule-item');
    let sessions = [];

    sessionBlocks.forEach(block => {
        const titleEl = block.querySelector('h3.GreenLeftBorder a, .wv_head_title, a[href*="/webcasts_events/webcasts/"]');
        const title = titleEl ? titleEl.innerText.trim() : "Untitled Session";
        const link = titleEl ? titleEl.href : "N/A";
        
        let time = "TBD";
        const timeMatch = block.innerText.match(/(\d{1,2}:\d{2}\s?(?:AM|PM).*?ET)/i);
        if (timeMatch) time = timeMatch[0];

        if (title.length > 5 && title !== "Upcoming Virtual Events") {
            sessions.push(`${title}::${time}::${link}`);
        }
    });

    // 5. Credit Verification
    const bodyContent = document.body.innerText;
    const hasSHRM = bodyContent.includes("SHRM") || !!document.querySelector('img[alt*="SHRM"]') ? "Yes" : "No";
    const hasHRCI = bodyContent.includes("HRCI") || !!document.querySelector('img[alt*="HRCI"]') ? "Yes" : "No";

    // 6. Final Row Assembly
    const row = `${eventTitle}\t${eventDate}\t${cleanDesc}\t${sponsors.join(' | ')}\t${sessions.join(' | ')}\t${regLink}\tSHRM:${hasSHRM}, HRCI:${hasHRCI}`;

    function copyToClipboard(text) {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    copyToClipboard(row);
    console.log("=== V3 EXTRACTOR SUCCESS ===");
    console.table({ Title: eventTitle, Sessions: sessions.length, Sponsors: sponsors.length });
    alert("SUCCESS! Description is now captured along with " + sessions.length + " sessions.");
})();
