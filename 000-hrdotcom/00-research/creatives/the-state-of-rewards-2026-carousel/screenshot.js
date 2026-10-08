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
    
    // Set viewport to the slide base size
    await page.setViewport({
      width: 1080,
      height: 1080,
      deviceScaleFactor: 2 // 2x Retina scale (2160 x 2160 output)
    });
    
    const htmlPath = path.resolve(__dirname, 'index.html');
    console.log(`Loading slide template: file://${htmlPath}`);
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle2' });
    
    // Wait for fonts to load
    await page.evaluateHandle(() => document.fonts.ready);
    
    // Query all slide elements
    const slides = await page.$$('.slide');
    console.log(`Found ${slides.length} slides. Capturing screenshots...`);
    
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideNum = i + 1;
      const fileName = `hr-coms-state-of-rewards-and-recognition-2026-slide-${slideNum}.png`;
      const outputPath = path.resolve(__dirname, fileName);
      
      // Capture the element screenshot specifically
      await slide.screenshot({
        path: outputPath,
        type: 'png'
      });
      console.log(`✓ Slide ${slideNum}/11 saved successfully: ${fileName}`);
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
