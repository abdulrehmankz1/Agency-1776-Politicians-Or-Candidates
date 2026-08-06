const { chromium } = require('playwright');

const TARGET = 'http://localhost:3000';
const OUT = 'C:/Users/user/AppData/Local/Temp/claude/C--Users-user-Documents-development-claude-projects-Agency-1776-Politicians-Or-Candidates/97696b51-c324-438c-ac33-6b5962bc78ee/scratchpad';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${TARGET}/privacy-policy`, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  // Report total scroll height and smoother presence
  const info = await page.evaluate(() => {
    const sm = window.ScrollSmoother && window.ScrollSmoother.get && window.ScrollSmoother.get();
    return {
      docHeight: document.documentElement.scrollHeight,
      bodyHeight: document.body.scrollHeight,
      smootherActive: !!sm,
      contentHeight: document.querySelector('#smooth-content')?.getBoundingClientRect().height,
      wrapperHeight: document.querySelector('#smooth-wrapper')?.getBoundingClientRect().height,
    };
  });
  console.log('INFO', JSON.stringify(info));

  const positions = [0, 700, 1400, 2100, 2800, 3500];
  for (let i = 0; i < positions.length; i++) {
    const y = positions[i];
    await page.evaluate((yy) => {
      const sm = window.ScrollSmoother && window.ScrollSmoother.get && window.ScrollSmoother.get();
      if (sm) sm.scrollTo(yy, false);
      else window.scrollTo(0, yy);
    }, y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/pp-scroll-${i}-${y}.png` });
    console.log('shot at', y);
  }

  await browser.close();
})();
