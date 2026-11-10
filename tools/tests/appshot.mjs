// Screenshots of the app (through the rig) and the demo for a visual review.
import { serve, launch, openApp, goTab } from './rig.mjs';
const { Engine } = await import(process.env.ENGINE);
const [root, out] = process.argv.slice(2), s = serve(root), b = await launch();
for (const [lang, w, theme, tabs] of [['en', 1280, 'light', ['dash', 'orders', 'products', 'trends', 'settings', 'health']], ['en', 1280, 'dark', ['dash', 'orders']], ['ar', 390, 'light', ['dash', 'plan']], ['ar', 390, 'dark', ['dash']]]) {
  const { page, ctx, errors } = await openApp(b, s.url, Engine, { plan: 'store', lang, width: w, theme, still: true });
  for (const t of tabs) { await goTab(page, t); await page.waitForTimeout(300); await page.screenshot({ path: `${out}/a_${lang}_${w}_${theme}_${t}.png` }); }
  console.log(lang, w, theme, 'errors', errors.length); await ctx.close();
}
const c = await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' }); const p = await c.newPage();
await p.route('**/functions/v1/app', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"ready":true,"prices":{"basic":1295,"pro":2850,"store":5440},"yearMonths":10,"trialDays":{"basic":14,"pro":14,"store":5},"checkEGP":1,"foundingLeft":30,"foundingSpots":30}' }));
await p.goto(s.url + '/app/'); await p.waitForTimeout(1200); await p.screenshot({ path: `${out}/a_login.png` });
await p.goto(s.url + '/demo/'); await p.waitForTimeout(1200); await p.screenshot({ path: `${out}/a_demo.png` });
await b.close(); s.close();
