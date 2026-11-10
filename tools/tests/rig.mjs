// Browser test rig: opens the real app page in Chromium and answers its server calls locally with the
// real engine file, so every screen can be checked without touching the live server or database.
import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path';
export const PLANS = {
  basic: { products: 15, suppliers: 10, customProfiles: false, altSuppliers: false, scorecard: false, stockoutCost: false, graphs: false, deadStock: false, cashFlow: false, budgetPlan: false, cashPlan: false, digest: false },
  pro: { products: 50, suppliers: 100, customProfiles: true, altSuppliers: true, scorecard: true, stockoutCost: false, graphs: false, deadStock: false, cashFlow: true, budgetPlan: false, cashPlan: false, digest: true },
  store: { products: 200, suppliers: 100, customProfiles: true, altSuppliers: true, scorecard: true, stockoutCost: true, graphs: true, deadStock: true, cashFlow: true, budgetPlan: true, cashPlan: true, digest: true },
};
function gate(res, lim) {
  if (!lim.graphs) res.bands = []; if (!lim.budgetPlan) res.budgetPlan = null; if (!lim.cashPlan) res.cashPlan = null;
  if (!lim.stockoutCost) { res.dash.riskProfit = 0; res.rows.forEach(r => { r.risk = { days: 0, units: 0, revenue: 0, profit: 0 }; }); res.scorecard.forEach(s => { s.atRiskValue = 0; }); }
  return res;
}
const pack = o => JSON.parse(JSON.stringify(o, (k, v) => (typeof v === 'number' && !Number.isInteger(v) ? Math.round(v * 10000) / 10000 : v)));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.png': 'image/png', '.css': 'text/css', '.json': 'application/json' };
export function serve(root) {
  const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(root, p); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end('nf'); return; } r.writeHead(200, { 'content-type': mime[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); }).listen(0);
  return { url: 'http://localhost:' + srv.address().port, close: () => srv.close() };
}
export const launch = () => chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
/** Opens the app signed in. state: { plan, ws (or 'sample'), prefsDigest }. Returns { page, errors, state }. */
export async function openApp(browser, base, Engine, o = {}) {
  const state = { plan: o.plan || 'store', rev: 1, digestOff: false, ws: o.ws && o.ws !== 'sample' ? o.ws : Engine.sampleWorkspace(), calls: [] };
  const lim = () => PLANS[state.plan];
  const billing = () => ({ state: 'comp', access: true, plan: state.plan, interval: 'month', trialEndsAt: null, paidUntil: null, renews: false, canCancel: false, trialOffer: false, checkEGP: 1, canResume: false, failedRenewal: false, prices: { basic: 1295, pro: 2850, store: 5440 }, yearPrices: { basic: 12950, pro: 28500, store: 54400 }, yearMonths: 10, listPrices: { basic: 1295, pro: 2850, store: 5440 }, trialDays: { basic: 14, pro: 14, store: 5 }, startsOn: {}, startsOnYear: {}, ready: true, testMode: false, founding: null, foundingLeft: 30, foundingSpots: 30, pending: null, name: '', phone: '' });
  const ctx = await browser.newContext({ viewport: { width: o.width || 1280, height: o.height || 900 }, colorScheme: o.theme === 'light' ? 'light' : 'dark', locale: o.lang === 'ar' ? 'ar-EG' : 'en-US', deviceScaleFactor: 1, reducedMotion: o.still ? 'reduce' : 'no-preference' });
  await ctx.addInitScript(([lang, theme, tab]) => { try { localStorage.setItem('es7.sid', 'testsid'); localStorage.setItem('es7.lang', lang); localStorage.setItem('es7.theme', theme); if (tab) localStorage.setItem('es7.tab', tab); localStorage.setItem('es7.chkHide', '1'); } catch (e) {} }, [o.lang || 'en', o.theme || 'dark', o.tab || '']);
  const page = await ctx.newPage(), errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 300)); });
  page.on('pageerror', e => errors.push('PAGEERROR ' + String(e).slice(0, 300)));
  await page.route('**/functions/v1/app', async route => {
    const body = JSON.parse(route.request().postData() || '{}'), [sid, action, payload] = body.args || [];
    let out = { error: 'BAD_ACTION' };
    state.calls.push(body.fn + ':' + (action || ''));
    if (body.fn === 'trialInfo') out = { ok: true, ...billing() };
    else if (body.fn === 'api') {
      if (action === 'load') { const c = Engine.sanitize(state.ws, lim()); c.ws.rev = state.rev; state.ws = c.ws; out = pack({ ok: true, me: { email: 'shop@example.com', plan: state.plan, limits: lim(), billing: billing(), prefs: { digest: !!lim().digest && !state.digestOff } }, ws: c.ws, res: gate(Engine.compute(c.ws), lim()), notices: c.notices }); }
      else if (action === 'save') {
        let input = payload.ws; if (payload.sample === true) input = Engine.sampleWorkspace(); else if (payload.sample === 'walkthrough') input = Engine.walkthroughWorkspace();
        if (Number(payload.rev) !== state.rev) out = { error: 'CONFLICT' };
        else { const c = Engine.sanitize(input, lim()); state.rev++; c.ws.rev = state.rev; c.ws.savedAt = new Date().toISOString(); state.ws = c.ws; out = pack({ ok: true, rev: state.rev, ws: c.ws, res: gate(Engine.compute(c.ws), lim()), notices: c.notices, replaced: !!payload.sample || c.notices.length > 0 }); }
      } else if (action === 'prefs') { const d = !!(payload && payload.digest === true); if (d && !lim().digest) out = { error: 'PLAN_LOCKED' }; else { state.digestOff = !d; out = { ok: true, prefs: { digest: d } }; } }
      else if (action === 'billing') out = { ok: true, billing: billing() };
      else if (action === 'logout') out = { ok: true };
    }
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(out) });
  });
  await page.goto(base + '/app/' + (o.query || ''), { waitUntil: 'load' });
  await page.waitForFunction(() => window.S ? !!S.res : !!document.querySelector('#view > *'), null, { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(400);
  return { page, errors, state, ctx };
}
export const goTab = async (page, tab) => { await page.evaluate(t => goTab(t), tab); await page.waitForTimeout(350); };
