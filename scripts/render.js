// Renders journal/index.html page by page (each <section class="page">) to JPEG,
// then the PDF is assembled with img2pdf (see scripts/build.sh).
// Usage: node scripts/render.js <outDir> [deviceScaleFactor] [quality]
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const outDir = path.resolve(process.argv[2] || 'build/pages');
  const dpr = Number(process.argv[3] || 3);
  const quality = Number(process.argv[4] || 90);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  page.on('console', (m) => console.log('console:', m.text()));
  page.on('pageerror', (e) => console.log('pageerror:', e.message));

  await page.goto('file://' + path.resolve(__dirname, '../journal/index.html'));
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  await page.waitForTimeout(300);

  const sections = await page.$$('section.page');
  for (let i = 0; i < sections.length; i++) {
    const file = path.join(outDir, `p${String(i + 1).padStart(2, '0')}.jpg`);
    await sections[i].screenshot({ path: file, type: 'jpeg', quality });
    console.log('saved', file);
  }
  await browser.close();
})();
