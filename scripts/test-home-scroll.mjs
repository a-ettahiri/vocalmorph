import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 850 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const clientHeight = await page.evaluate(() => window.innerHeight);
  console.log(`scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);

  // Test scrolling
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);

  const backToTopBtn = await page.$('button[aria-label="Go to top"]');
  console.log('backToTopBtn exists:', !!backToTopBtn);
  if (backToTopBtn) {
    const isVis = await backToTopBtn.isVisible();
    const box = await backToTopBtn.boundingBox();
    const classes = await backToTopBtn.getAttribute('class');
    console.log('Visible:', isVis, 'box:', box, 'classes:', classes);
  }

  // Also check window.scrollY
  const y = await page.evaluate(() => window.scrollY);
  console.log('window.scrollY:', y);

  // Take screenshot
  await page.screenshot({ path: 'scripts/screenshot-scroll.png' });
  console.log('Screenshot taken');

  await browser.close();
}

main().catch(console.error);
