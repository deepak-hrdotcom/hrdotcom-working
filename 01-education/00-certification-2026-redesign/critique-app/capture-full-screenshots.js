import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainPagesDir = path.resolve(__dirname, '../../main-pages');
const outputDir = path.resolve(__dirname, 'public/screenshots');
const refOutputDir = path.resolve(__dirname, '../reference');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(refOutputDir)) {
  fs.mkdirSync(refOutputDir, { recursive: true });
}

const pagesToCapture = [
  { file: 'understanding-hr-certification.html', output: '01-understanding-hr-certification.jpeg' },
  { file: 'preparation-options.html', output: '02-preparation-options.jpeg' },
  { file: 'pass-assurance-program.html', output: '03-pass-assurance-program.jpeg' },
  { file: 'hr-group-certification.html', output: '04-hr-group-certification.jpeg' },
  { file: 'hr-recertification.html', output: '05-hr-recertification.jpeg' },
  { file: 'testimonials.html', output: '06-testimonials.jpeg' },
  { file: 'ask-my-employer.html', output: '07-ask-my-employer.jpeg' }
];

async function captureAll() {
  console.log('🚀 Starting Full-Page Screenshot Capture with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 1.5
  });

  for (const item of pagesToCapture) {
    const filePath = path.join(mainPagesDir, item.file);
    const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
    const targetOut = path.join(outputDir, item.output);
    const refOut = path.join(refOutputDir, item.output);

    console.log(`📸 Capturing full page for: ${item.file} -> ${item.output}`);
    
    try {
      await page.goto(fileUrl, { waitUntil: ['load', 'networkidle0'], timeout: 30000 });
      // Give extra time for images, fonts, dynamic DOM elements to settle
      await new Promise(r => setTimeout(r, 2000));

      await page.screenshot({
        path: targetOut,
        type: 'jpeg',
        quality: 90,
        fullPage: true
      });

      // Copy to reference folder too
      fs.copyFileSync(targetOut, refOut);
      console.log(`✅ Saved: ${targetOut} (${fs.statSync(targetOut).size} bytes)`);
    } catch (err) {
      console.error(`❌ Error capturing ${item.file}:`, err);
    }
  }

  await browser.close();
  console.log('🎉 All 7 Full-Page Screenshots captured and updated successfully!');
}

captureAll();
