// Opens every app page for each plan, in English and Arabic, on desktop and a phone; fails on any script error,
// sideways scroll or missing text key. Usage: ENGINE=/path/engine.js node app_smoke.mjs <repo dir> [shots dir]
import { serve, launch, openApp, goTab } from './rig.mjs';
const { Engine } = await import(process.env.ENGINE);
const [root, shots] = [process.argv[2], process.argv[3]];
const TABS = ['dash', 'plan', 'orders', 'demand', 'trends', 'incoming', 'score', 'dead', 'cash', 'accuracy', 'health', 'products', 'suppliers', 'ordered', 'seasons', 'settings', 'start', 'walk'];
const s = serve(root), b = await launch(); let pass = 0, fail = 0; const bad = [];
const ok = (c, name) => { if (c) pass++; else { fail++; bad.push(name); } };
for (const plan of ['store', 'pro', 'basic']) for (const lang of ['en', 'ar']) for (const width of [1280, 390]) {
  if (plan !== 'store' && width === 390 && lang === 'en') continue;
  const { page, errors, ctx } = await openApp(b, s.url, Engine, { plan, lang, width });
  for (const tab of TABS) {
    await goTab(page, tab);
    const m = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - innerWidth, txt: document.querySelector('#view') ? document.querySelector('#view').innerText : '', dir: document.documentElement.dir }));
    const id = `${plan} ${lang} ${width} ${tab}`;
    ok(m.txt.length > 20, id + ' renders'); ok(m.over <= 1, id + ' no sideways scroll (' + m.over + ')');
    ok(!/\b[a-z]+\.[a-zA-Z0-9]+\b(?=\s|$)/.test(m.txt.split('\n').filter(l => /^[a-z]{2,8}\.[a-zA-Z0-9.]+$/.test(l.trim())).join(' ')), id + ' no raw text keys');
    ok(!/NaN|undefined|Infinity/.test(m.txt), id + ' no NaN/undefined');
    if (shots && plan === 'store' && ['dash', 'orders', 'products', 'settings', 'trends'].includes(tab)) await page.screenshot({ path: `${shots}/app_${lang}_${width}_${tab}.png` });
  }
  ok((lang === 'ar') === (await page.evaluate(() => document.documentElement.dir === 'rtl')), `${plan} ${lang} direction`);
  ok(errors.length === 0, `${plan} ${lang} ${width} no script errors: ${errors.slice(0, 2).join(' / ')}`);
  await ctx.close();
}
// Sunday summary: locked on Basic, switchable on Pro
for (const plan of ['basic', 'pro']) {
  const { page, state, ctx } = await openApp(b, s.url, Engine, { plan });
  await goTab(page, 'settings');
  const sw = page.locator('input[data-act="digestToggle"]');
  ok(await sw.count() === 1, plan + ' Sunday switch shown');
  if (plan === 'basic') { ok(await sw.isDisabled(), 'basic Sunday switch locked'); ok(!(await sw.isChecked()), 'basic Sunday switch off'); ok(await page.locator('#emails a[data-act="billOpen"]').count() === 1, 'basic Sunday upgrade link'); }
  else { ok(await sw.isChecked(), 'pro Sunday switch on'); await sw.uncheck(); await page.waitForTimeout(300); ok(state.digestOff === true, 'pro Sunday switch turns off on the server'); }
  await ctx.close();
}
console.log(`app smoke: ${pass} passed, ${fail} failed`); bad.slice(0, 25).forEach(x => console.log('  FAIL', x));
await b.close(); s.close(); process.exit(fail ? 1 : 0);
