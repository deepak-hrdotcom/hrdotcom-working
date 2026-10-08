const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    console.log('Launching headless browser for PDF generation...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to the slide base size
    await page.setViewport({
      width: 1080,
      height: 1080,
      deviceScaleFactor: 2
    });
    
    const htmlPath = path.resolve(__dirname, 'index.html');
    console.log(`Loading slide template: file://${htmlPath}`);
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle2' });
    
    // Wait for fonts to load
    await page.evaluateHandle(() => document.fonts.ready);
    
    console.log('Injecting print-specific CSS styles...');
    // Override carousel styles to stack slides without margins and allow clean page breaks
    await page.addStyleTag({
      content: `
        @page {
          size: 1080px 1080px;
          margin: 0;
        }
        body {
          background: white !important;
          padding: 0 !important;
          margin: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .carousel-container {
          display: block !important;
          gap: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .slide {
          page-break-after: always !important;
          break-after: page !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
          position: relative !important;
          width: 1080px !important;
          height: 1080px !important;
          overflow: hidden !important;
        }
        /* Remove break after the last slide to avoid blank trailing page */
        .slide:last-child {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
      `
    });
    
    const fileName = 'hr-coms-state-of-rewards-and-recognition-2026-carousel.pdf';
    const outputPath = path.resolve(__dirname, fileName);
    
    console.log('Generating PDF...');
    await page.pdf({
      path: outputPath,
      width: '1080px',
      height: '1080px',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });
    
    console.log(`✓ PDF compiled successfully: ${fileName}`);
  } catch (error) {
    console.error('Error during PDF generation:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
