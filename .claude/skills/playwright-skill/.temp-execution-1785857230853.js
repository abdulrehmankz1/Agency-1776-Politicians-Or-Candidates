
(async () => {
  try {
    
const { chromium, devices } = require('playwright');
const browser = await chromium.launch({ headless: true });
const errs=[];
const measure = async (label, opts) => {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage(); page.on('pageerror',e=>errs.push(label+':'+e.message));
  let jsBytes=0; const heavy=[];
  page.on('response', async r=>{ const u=r.url(); const ct=r.headers()['content-type']||''; if(/javascript/.test(ct)){ try{ const b=(await r.body()).length; jsBytes+=b; if(/three|react-three|fiber|hero-beams|antigravity/i.test(u)) heavy.push(u.split('/').pop().split('?')[0]); }catch(e){} } });
  await page.goto('http://localhost:3001/', { waitUntil:'networkidle', timeout:60000 });
  await page.waitForTimeout(2000);
  const canvas = await page.evaluate(()=>!!document.querySelector('#home canvas'));
  console.log(label, 'JS KB:', Math.round(jsBytes/1024), '| heavy chunks:', JSON.stringify([...new Set(heavy)]), '| heroCanvas:', canvas);
  await ctx.close();
};
await measure('MOBILE ', { ...devices['iPhone 13'] });
await measure('DESKTOP', { viewport:{width:1440,height:900} });
console.log('errors:', JSON.stringify(errs));
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
