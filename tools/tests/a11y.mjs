// Accessibility scan (axe, WCAG 2.1 A and AA rules) of the website, the demo and the app, in both languages and both themes.
// Usage: ENGINE=/path/engine.js node a11y.mjs <repo dir> [site|demo|app ...]
import fs from 'fs';
import { serve, launch, openApp, goTab } from './rig.mjs';
const { Engine } = await import(process.env.ENGINE);
const root = process.argv[2], which = process.argv.slice(3).length ? process.argv.slice(3) : ['site', 'demo', 'app'];
const axe = fs.readFileSync(new URL('./node_modules/axe-core/axe.min.js', import.meta.url), 'utf8');
const s = serve(root), b = await launch(); let total = 0, pages = 0; const seen = {};
async function scan(page, label) {
  await page.addScriptTag({ content: axe });
  const r = await page.evaluate(async () => (await axe.run(document, { resultTypes: ['violations'], runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes[0].html.slice(0, 140), why: (v.nodes[0].any[0] || {}).message || '' })));
  pages++; r.forEach(v => { total += v.n; const k = v.id + ' | ' + v.sample; if (!seen[k]) { seen[k] = 1; console.log(`  ${label}: ${v.id} (${v.impact}) x${v.n} ${v.sample} ${v.why.slice(0, 120)}`); } });
}
for (const theme of ['dark', 'light']) for (const lang of ['en', 'ar']) {
  for (const kind of which.filter(k => k !== 'app')) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
    await ctx.addInitScript(([l, t]) => { try { localStorage.setItem('es7.lang', l); localStorage.setItem('etlob-site-lang', l); localStorage.setItem('es7.theme', t); } catch (e) {} }, [lang, theme]);
    const page = await ctx.newPage(); await page.route('**/functions/v1/app', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"ready":true,"prices":{"basic":1295,"pro":2850,"store":5440},"yearMonths":10,"trialDays":{"basic":14,"pro":14,"store":5},"checkEGP":1,"foundingLeft":30,"foundingSpots":30}' }));
    await page.goto(s.url + (kind === 'site' ? '/' : '/demo/'), { waitUntil: 'load' }); await page.waitForTimeout(900);
    if (kind === 'demo') { const tabs = await page.evaluate(() => [...new Set([...document.querySelectorAll('nav.nav [data-v]')].map(x => x.getAttribute('data-v')))]); for (const t of tabs) { await page.evaluate(v => { const el = [...document.querySelectorAll('nav.nav:not([hidden]) [data-v]')].find(x => x.getAttribute('data-v') === v); if (el) el.click(); }, t); await page.waitForTimeout(150); await scan(page, `demo ${lang} ${theme} ${t}`); } }
    else await scan(page, `site ${lang} ${theme}`);
    await ctx.close();
  }
  if (which.includes('app')) {
    const { page, ctx } = await openApp(b, s.url, Engine, { plan: 'store', lang, theme, still: true });
    for (const t of ['dash', 'plan', 'orders', 'demand', 'trends', 'incoming', 'score', 'dead', 'cash', 'accuracy', 'health', 'products', 'suppliers', 'ordered', 'seasons', 'settings']) { await goTab(page, t); await scan(page, `app ${lang} ${theme} ${t}`); }
    await ctx.close();
  }
}
console.log(`axe: ${pages} screens scanned, ${total} issues`);
await b.close(); s.close(); process.exit(total ? 1 : 0);
