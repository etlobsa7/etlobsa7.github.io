// Synthetic check of the Ramadan season: a product whose sales rise in the ten days before Ramadan,
// through Ramadan and Eid. The app sees history up to December and forecasts the next year.
// Usage: ENGINE=/path/engine.js node ramadan_test.mjs
import { mulberry, LIMITS } from './sim.mjs';
const { Engine } = await import(process.env.ENGINE);
const RS = { 2024: '2024-03-11', 2025: '2025-03-01', 2026: '2026-02-18', 2027: '2027-02-08', 2028: '2028-01-28' };
const DAY = 864e5, r = mulberry(7);
const lift = t => { for (const s of Object.values(RS)) { const d = (t - Date.parse(s + 'T00:00:00Z')) / DAY; if (d >= -10 && d < 0) return 1.6; if (d >= 0 && d < 33) return 2.2; } return 1; };
const month = (y, m, base) => { let u = 0; for (let t = Date.UTC(y, m, 1); t < Date.UTC(y, m + 1, 1); t += DAY) u += base / 30 * lift(t) * (0.85 + 0.3 * r()); return Math.round(u); };
const acc = (f, a) => 1 - f.reduce((s, x, k) => s + Math.abs(x - a[k]), 0) / a.reduce((s, x) => s + x, 0);
for (const hist of [12, 24]) for (const fy of [2026, 2027, 2028]) {
  const out = {};
  for (const mode of ['fixed', 'calendar']) {
    globalThis.__FX = { ram: mode === 'calendar' ? 1 : 0 };
    let e = 0, n = 0;
    for (let p = 0; p < 30; p++) {
      const base = 40 + 200 * r(), h = []; for (let k = hist; k >= 1; k--) { const d = new Date(Date.UTC(fy, -k, 1)); h.push(month(d.getUTCFullYear(), d.getUTCMonth(), base)); }
      const real = [...Array(12).keys()].map(m => month(fy, m, base));
      const ws = Engine.blankWorkspace(); ws.settings.lastMonth = 12;
      ws.suppliers = [{ id: 's', name: 's', lt: 10, ltv: 2, moq: 0, pack: 1 }];
      ws.products = [{ id: 'p', name: 'p', supplierId: 's', profileId: 'ramadan', sales: h.slice(-12), older: new Array(36 - hist).fill(null).concat(h).slice(0, 24), cost: 50, price: 100, onHand: 10, onOrder: 0, sl: 95 }];
      const now = Date.UTC(fy, 0, 5), res = Engine.compute(Engine.sanitize(ws, LIMITS, now).ws, now);
      e += acc(res.rows[0].fc12, real); n++;
      if (p === 0 && hist === 12 && mode === 'calendar' && fy === 2027) console.log('   example 2027 real    ', real.join(' '), '\n   example 2027 forecast', res.rows[0].fc12.map(Math.round).join(' '), '| source', res.rows[0].seasonSource, 'strength', res.rows[0].seasonStrength.toFixed(2));
    }
    out[mode] = (100 * e / n).toFixed(1);
  }
  console.log(`history ${hist} months, forecasting ${fy}: fixed shape ${out.fixed}%  calendar shape ${out.calendar}%`);
}
