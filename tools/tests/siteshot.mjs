// Screenshots of the website's proof parts and a check for script errors and sideways scroll.
import { serve, launch } from './rig.mjs';
const s = serve(process.argv[2]), out = process.argv[3], b = await launch(); let bad = 0;
for (const [lang, w, theme] of [['en', 1280, 'dark'], ['ar', 390, 'dark'], ['en', 1280, 'light'], ['ar', 1280, 'light'], ['en', 390, 'light']]) {
  const c = await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
  await c.addInitScript(l => { try { localStorage.setItem('etlob-site-lang', l); } catch (e) {} }, lang);
  const p = await c.newPage(), errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => m.type() === 'error' && !/ERR_|Failed to load/.test(m.text()) && errs.push(m.text()));
  await p.route('**/functions/v1/app', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"ready":true,"prices":{"basic":1295,"pro":2850,"store":5440},"yearMonths":10,"trialDays":{"basic":14,"pro":14,"store":5},"checkEGP":1,"foundingLeft":30,"foundingSpots":30}' }));
  await p.goto(s.url + '/'); await p.waitForTimeout(900);
  const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  await p.screenshot({ path: `${out}/site_${lang}_${w}_${theme}_top.png` });
  for (const sel of ['.proofsec', '#again', '#pricing']) { const el = p.locator(sel).first(); if (await el.count()) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await p.screenshot({ path: `${out}/site_${lang}_${w}_${theme}_${sel.replace(/\W/g, '')}.png` }); } }
  if (w === 1280) { await p.evaluate(() => { document.querySelector('#pop-results2').hidden = false; }); await p.waitForTimeout(300); await p.screenshot({ path: `${out}/site_${lang}_${w}_${theme}_pop.png` }); }
  console.log(lang, w, theme, 'overflow', over, 'errors', errs.length, errs.slice(0, 2).join(' | ')); if (over > 1 || errs.length) bad++;
  await c.close();
}
await b.close(); s.close(); process.exit(bad ? 1 : 0);
