---
name: generating-social-media-carousels
description: Generates premium 1:1 square HTML-based LinkedIn/social media slide carousels for HR.com research reports, with automatic Puppeteer screenshot rendering.
---

# Social Media Carousel Creative Playbook

This playbook acts as the single source of truth for generating premium, high-impact LinkedIn social media slide carousels (1:1 ratio) from HR.com research report PDFs. When asked to create slide carousels for a new report, follow this workflow, layout system, and automation setup.

---

## 1. Project Folder Structure

Keep all creative assets in a dedicated folder under the report's creatives directory:
```
00-research/creatives/[report-name]-carousel/
├── index.html          # Slides markup structure
├── style.css           # Slide-deck styling rules (Roboto)
├── screenshot.js       # Puppeteer rendering script
├── package.json        # Project manifest (requires puppeteer)
└── [cover-image].png   # Report cover image used on Slide 11
```

---

## 2. Design System & Dimensions

### Canvas Resolution
*   **Dimensions:** `1080px × 1080px` (1:1 square aspect ratio).
*   **Retina Export (2x):** The Puppeteer script must set `deviceScaleFactor: 2` to output razor-sharp `2160px × 2160px` PNGs suitable for mobile/desktop feeds.

### Branding Alignment (HR.com Palette)
Use the following hex tokens for UI elements and accents:
*   `--brand-red: #EF4A3D;` (Alerts, laggard metrics)
*   `--brand-yellow: #FDB414;` (Insights badges, secondary stats)
*   `--brand-green: #94C83D;` (Leader stats, success badges)
*   `--brand-teal: #4AC4D6;` (Primary highlights, icons)
*   `--brand-navy: #2A343E;` (Primary dark headings)
*   `--brand-dark: #1B2A38;` (Dark slide backgrounds)
*   `--brand-blue: #02588E;` (Header tags, branding text)

### Typography Rules (Google Font: Roboto)
*   Title Font: `Roboto` (Weights: `900` for main headings, `800` for sub-headings, `700` for footers).
*   Body Font: `Roboto` (Weights: `500` for data metrics, `400` for descriptions).

---

## 3. High-Impact Social Media Layout Principles

LinkedIn feeds are viewed on mobile screens where small text is unreadable. Avoid generic cards or plain slide reports. Implement **visual drama**:

1.  **Alternating Themes:** Alternate between **Dark Navy Slides** (`background: #1B2A38`) and **Light Slides** (`background: #FFFFFF`) to keep users engaged as they swipe.
2.  **Top Brand Stripe:** Place a 7px gradient line at the top of every slide representing all brand colors:
    `linear-gradient(90deg, #EF4A3D 0%, #FDB414 25%, #94C83D 50%, #4AC4D6 75%, #02588E 100%)`
3.  **Data Hierarchy (The "Hero" Metric):** Stats must dominate the screen.
    *   Main titles: `44px` / `line-height: 1.18` / weight `900`
    *   Large numbers: **`70px` to `100px`** (e.g., `98%`, `Over 3x`)
    *   Secondary sub-row numbers: **`44px` to `60px`**
4.  **Prominent Section Labels:** Every slide must have a context label directly under the title. Apply a left-border teal line to draw attention:
    ```css
    .section-label {
      font-size: 20px;
      font-weight: 600;
      color: rgba(42,52,62,0.82);
      padding-left: 14px;
      border-left: 4px solid var(--teal);
      line-height: 1.4;
    }
    ```
5.  **Split & Bento Grids:** Use custom layout splits to compare Leaders and Laggards:
    *   *Slide 3 Split:* Green gradient panel left, Red gradient panel right.
    *   *Slide 7 Bento Columns:* Tall colored column headers (Teal/Yellow/Red) with the satisfaction rate.
6.  **Interactive Footers:** Standardize footers at `17px` font size:
    *   *Slides 1-10:* Contain the text **"HR.com's State of Rewards & Recognition [Year]"** and `Swipe →`.
    *   *Slide 11 (CTA):* Replace the swipe label with interactive options: `Like · Share · Comment · Save`.

---

## 4. HTML/CSS Layout Templates

### Slide Structure
Each slide uses the absolute `.slide` container, wrapping `.slide-header`, `.slide-content` (holding titles, data structures, and `.insight-box`), and `.slide-footer`.

```html
<section class="slide slide-light" id="slide-2">
  <div class="brand-stripe"></div>
  <header class="slide-header">
    <img class="brand-logo" src="https://public-cdn.hr.com/remoteimages/website-images/2021_siteupdate/Research/hrresearch_dark_logo.png" alt="HR Research Institute">
    <span class="report-tag">THE EFFECTIVENESS GAP</span>
  </header>
  
  <div class="slide-content">
    <h2 class="slide-title">Programs are common, but high effectiveness is rare</h2>
    <p class="section-label">R&amp;R presence vs. real effectiveness according to HR leaders:</p>
    
    <!-- Custom CSS Charts / Bento Cards Go Here -->
    
    <div class="insight-box">
      <span class="insight-badge">INSIGHT</span>
      <p class="insight-text">Simply implementing a program does not guarantee it meets organizational goals...</p>
    </div>
  </div>
  
  <footer class="slide-footer">
    <span class="report-name">HR.com's State of Rewards &amp; Recognition 2026</span>
    <div class="footer-right">
      <span class="swipe-pill">Swipe →</span>
      <span class="slide-num">2 / 11</span>
    </div>
  </footer>
</section>
```

---

## 5. Puppeteer Screenshot Automation Script

Use this template script to headlessly render and capture individual slide components at 2x resolution.

```javascript
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    console.log('Launching headless browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to the 1:1 slide base size
    await page.setViewport({
      width: 1080,
      height: 1080,
      deviceScaleFactor: 2 // 2x retina output
    });
    
    const htmlPath = path.resolve(__dirname, 'index.html');
    console.log(`Loading slide template: file://${htmlPath}`);
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle2' });
    
    // Wait for custom fonts (Roboto) to finish rendering
    await page.evaluateHandle(() => document.fonts.ready);
    
    const slides = await page.$$('.slide');
    console.log(`Found ${slides.length} slides. Capturing screenshots...`);
    
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideNum = i + 1;
      
      // Filename pattern matching: hr-coms-[report-url-slug]-slide-[number].png
      const fileName = `hr-coms-state-of-rewards-and-recognition-2026-slide-${slideNum}.png`;
      const outputPath = path.resolve(__dirname, fileName);
      
      await slide.screenshot({
        path: outputPath,
        type: 'png'
      });
      console.log(`✓ Slide ${slideNum}/${slides.length} saved: ${fileName}`);
    }
    
    console.log('All slides captured successfully!');
  } catch (error) {
    console.error('Error during screenshot generation:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
```

---

## 6. Verification Checklist Before Delivery

*   [ ] **Text Accuracy:** Verify every sentence, bullet, and percentage matches the input PDF exactly.
*   [ ] **Aspect Ratio:** Confirm slides are exactly `1080px × 1080px` (square).
*   [ ] **Readability:** Zoom out to `30%` size. Are labels, metrics, and chart labels still legible?
*   [ ] **Branding:** Is `hr.research` dark logo displayed at `42px` height in the header? Is the running footer present with the correct name: `"HR.com's State of Rewards & Recognition [Year]"`?
*   [ ] **Slide 11 Cover Glow:** Does the final CTA mockup display the cover page cleanly with a 3D rotation, drop shadow, and a button container showing Like/Share/Comment?
