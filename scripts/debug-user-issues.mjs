import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 850 } });

  const routes = ['/', '/generate', '/history', '/library', '/persona', '/de-noise', '/voice-clone'];

  for (const route of routes) {
    console.log(`\n--- Testing ${route} ---`);
    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' });

    // Test sidebar upgrade button
    const sidebarUpgradeBtn = await page.$('aside button[aria-label="Upgrade to Pro"]');
    if (sidebarUpgradeBtn) {
      await sidebarUpgradeBtn.click();
      await page.waitForTimeout(300);
      const dialog = await page.$('[role="dialog"]');
      console.log(`[${route}] Sidebar upgrade opens dialog?`, !!dialog);
      if (dialog) {
        const closeBtn = await page.$('button[aria-label="Close upgrade popup"]');
        if (closeBtn) await closeBtn.click();
        await page.waitForTimeout(300);
      }
    } else {
      console.log(`[${route}] Sidebar upgrade button NOT FOUND`);
    }

    // Test topbar credits button
    const topbarBtn = await page.$('header button[aria-label="Open upgrade popup"]');
    if (topbarBtn) {
      await topbarBtn.click();
      await page.waitForTimeout(300);
      const dialog = await page.$('[role="dialog"]');
      console.log(`[${route}] Topbar credits opens dialog?`, !!dialog);
      if (dialog) {
        const closeBtn = await page.$('button[aria-label="Close upgrade popup"]');
        if (closeBtn) await closeBtn.click();
        await page.waitForTimeout(300);
      }
    } else {
      console.log(`[${route}] Topbar button NOT FOUND`);
    }

    // Test scroll and back to top button
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const clientHeight = await page.evaluate(() => window.innerHeight);
    console.log(`[${route}] scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}`);
    
    if (scrollHeight > clientHeight) {
      await page.evaluate(() => window.scrollTo(0, scrollHeight / 2));
      await page.waitForTimeout(400);
      const backToTopBtn = await page.$('button[aria-label="Go to top"]');
      if (backToTopBtn) {
        const isVis = await backToTopBtn.isVisible();
        const box = await backToTopBtn.boundingBox();
        console.log(`[${route}] Back to top button visible?`, isVis, 'box:', box);
      } else {
        console.log(`[${route}] Back to top button NOT FOUND`);
      }
    } else {
      console.log(`[${route}] Not scrollable (content fits in viewport)`);
    }
  }

  await browser.close();
}

main().catch(console.error);
