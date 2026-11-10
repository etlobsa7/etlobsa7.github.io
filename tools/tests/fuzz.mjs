// Crash test: random messy shops through sanitize and compute; every number in the result is checked.
// Usage: ENGINE=/path/engine.js node fuzz.mjs [shops=5000]
import { mulberry, LIMITS } from './sim.mjs';
const { Engine } = await import(process.env.ENGINE);
const N = +(process.argv[2] || 5000), r = mulberry(99), pick = a => a[Math.floor(r() * a.length)];
const junk = () => pick([null, '', 'abc', -5, 0, 1e9, NaN, Infinity, '12', 3.7, undefined, {}, [], true]);
const num = (lo, hi) => (r() < 0.12 ? junk() : lo + r() * (hi - lo));
const bad = { crash: 0, nan: 0, neg: 0, carton: 0, budget: 0, slow: 0 };
const walk = (o, path, f) => { if (typeof o === 'number') f(o, path); else if (o && typeof o === 'object') for (const k of Object.keys(o)) walk(o[k], path + '.' + k, f); };
for (let s = 0; s < N; s++) {
  const np = Math.floor(r() * 30), ns = Math.floor(r() * 5);
  const ws = { settings: { orderCost: num(0, 800), holdRate: num(0, 60), lastMonth: num(1, 12), seasonOn: r() < 0.8, trendOn: r() < 0.8, overstockDays: num(7, 300), budget: r() < 0.5 ? num(0, 50000) : 0, daysPerMonth: num(20, 31) }, period: num(0, 40), suppliers: [], products: [], orders: [] };
  for (let i = 0; i < ns; i++) ws.suppliers.push({ id: 's' + i, name: 'S' + i, lt: num(0, 60), ltv: num(0, 15), moq: num(0, 100), pack: num(0, 24), depositPct: num(0, 100), balanceDays: num(0, 60) });
  for (let i = 0; i < np; i++) { const base = r() * 300, mk = n => Array.from({ length: n }, () => (r() < 0.1 ? junk() : r() < 0.1 ? null : Math.round(base * (0.3 + 1.4 * r())))); ws.products.push({ id: 'p' + i, name: 'P' + i, supplierId: r() < 0.9 ? 's' + Math.floor(r() * (ns + 1)) : junk(), profileId: pick(['flat', 'winter', 'summer', 'ramadan', 'nope', null]), sales: mk(12), older: r() < 0.6 ? mk(24) : junk(), cost: num(0, 500), price: num(0, 900), onHand: num(-20, 2000), onOrder: num(0, 500), sl: pick([85, 90, 95, 97, 98, 99, 50, 'x']), altSuppliers: r() < 0.3 ? [{ supplierId: 's0', cost: num(0, 500) }] : junk(), fcHist: r() < 0.3 ? [{ k: 1, f: num(0, 100) }] : junk() }); }
  for (let i = 0; i < Math.floor(r() * 6); i++) ws.orders.push({ id: 'o' + i, supplierId: 's' + Math.floor(r() * (ns + 1)), status: pick(['sent', 'received', 'x']), sentAt: pick(['2026-01-05', 'bad', null]), receivedAt: pick(['2026-01-19', '', 'zz']), lines: r() < 0.8 ? [{ productId: 'p0', qty: num(0, 50), cost: num(0, 100) }] : junk() });
  try {
    const t = Date.now(), c = Engine.sanitize(ws, LIMITS), res = Engine.compute(c.ws);
    if (Date.now() - t > 200) bad.slow++;
    walk(res, 'res', (v, p) => { if (!isFinite(v)) { bad.nan++; if (bad.nan < 4) console.log('non-finite', p); } });
    res.rows.forEach(x => { if (x.qty < 0 || x.ss < 0 || x.rop < 0 || (x.cover != null && x.cover < 0) || x.aic < 0 || x.fc.some(v => v < 0)) bad.neg++; if (x.qty > 0 && (x.qty % x.pack !== 0)) bad.carton++; });
    if (res.budgetPlan && res.budgetPlan.spend > res.budgetPlan.budget + 0.01) bad.budget++;
  } catch (e) { bad.crash++; if (bad.crash < 4) console.log('crash', e.stack.split('\n').slice(0, 3).join(' | ')); }
}
console.log(N, 'shops', JSON.stringify(bad));
