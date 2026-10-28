import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  const allLogs = [];
  page.on('console', msg => allLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => allLogs.push(`[UNCAUGHT] ${err.stack || err.message}`));

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('--- ALL LOGS on / ---');
  for (const log of allLogs) {
    console.log(log);
  }

  // Click credits
  const creditsBtn = await page.$('header button[aria-label="Open upgrade popup"]');
  console.log('Credits button:', await creditsBtn?.innerHTML());
  await creditsBtn?.click();
  await page.waitForTimeout(500);

  const dialogHtml = await page.$eval('[role="dialog"]', el => el.outerHTML).catch(e => null);
  console.log('Dialog outerHTML found?', !!dialogHtml);

  await browser.close();
}

main().catch(console.error);
