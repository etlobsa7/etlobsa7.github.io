// Speed on the biggest shop a plan allows (200 products), with the processor slowed 4 times like a mid-range phone:
// slowest frames while scrolling Products and Order decisions, and how long a typed number takes to show.
// Usage: ENGINE=/path/engine.js node perf.mjs <repo dir>
import { serve, launch, openApp, goTab } from './rig.mjs';
const { Engine } = await import(process.env.ENGINE);
const s = serve(process.argv[2]), b = await launch();
const ws = Engine.sampleWorkspace(), base = ws.products.slice(); ws.products = [];
for (let i = 0; i < 200; i++) { const p = JSON.parse(JSON.stringify(base[i % base.length])); p.id = 'q' + i; p.name = p.name + ' ' + (i + 1); ws.products.push(p); }
const { page, ctx } = await openApp(b, s.url, Engine, { plan: 'store', ws, theme: process.argv[3] || 'light' });
const cdp = await ctx.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
const scroll = async tab => { await goTab(page, tab); await page.waitForTimeout(1500);
  return page.evaluate(async () => { const gaps = []; let last = performance.now(), on = true; const tick = t => { gaps.push(t - last); last = t; if (on) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    for (let i = 0; i < 60; i++) { window.scrollBy(0, 160); await new Promise(r => setTimeout(r, 30)); } on = false; gaps.sort((a, b) => a - b); return Math.round(gaps[Math.floor(gaps.length * 0.95)]); }); };
const prod = await scroll('products'), ord = await scroll('orders');
await goTab(page, 'products'); await page.waitForTimeout(1200);
const inp = page.locator('.grid input[inputmode="numeric"]').nth(30); await inp.scrollIntoViewIfNeeded(); await inp.click();
const type = await page.evaluate(async () => { const el = document.activeElement; const t = performance.now(); el.value = '57'; el.dispatchEvent(new Event('input', { bubbles: true })); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); return Math.round(performance.now() - t); });
console.log(`Products scroll slowest frames ${prod} ms, Order decisions ${ord} ms, typed number shows in ${type} ms`);
await b.close(); s.close();
