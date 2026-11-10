// Week-by-week replay of a real store-year through the app's engine.
// The engine file is the exact one the server runs; this wrapper only feeds it a shop
// and plays the real daily sales against the orders it asks for.
import fs from 'fs';

export const LIMITS = { products: 200, suppliers: 100, customProfiles: true, altSuppliers: true };
export const mulberry = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const gauss = r => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const DAY = 864e5, iso = t => new Date(t).toISOString().slice(0, 10);
const sum = a => a.reduce((x, y) => x + y, 0);

export function loadStore(dir, store) {
  const d = JSON.parse(fs.readFileSync(`${dir}/${store}.json`));
  const t0 = Date.parse(d.start + 'T00:00:00Z');
  d.t0 = t0;
  d.idx = date => Math.round((Date.parse(date + 'T00:00:00Z') - t0) / DAY);
  d.month = [];
  for (let k = 0; k < d.days; k++) { const t = new Date(t0 + k * DAY); d.month.push((t.getUTCFullYear() - 2012) * 12 + t.getUTCMonth()); }
  const nm = d.month[d.days - 1] + 1;
  for (const it of d.items) { it.m = new Array(nm).fill(0); it.daily.forEach((v, k) => { it.m[d.month[k]] += v; }); }
  return d;
}

// 40 products picked at random (fixed seed) from those that sold in every month of the two learning years.
export function pickProducts(d, year, n = 40, seed = 2015) {
  const m0 = (year - 2 - 2012) * 12;
  const ok = d.items.filter(it => it.m.slice(m0, m0 + 24).every(v => v > 0) && (it.price[year - 1] || it.price[year - 2]));
  const r = mulberry(hash(d.store + ':' + year + ':' + seed)), a = ok.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return { picked: a.slice(0, n), eligible: ok.length };
}

export const SUPPLIERS = [
  { id: 's7', name: 'Supplier 7d', lt: 7, ltv: 2, moq: 0, pack: 1, terms: 'Cash', depositPct: 0, balanceDays: 7 },
  { id: 's14', name: 'Supplier 14d', lt: 14, ltv: 3, moq: 12, pack: 6, terms: 'Net 14', depositPct: 0, balanceDays: 14 },
  { id: 's21', name: 'Supplier 21d', lt: 21, ltv: 4, moq: 24, pack: 12, terms: '50% upfront', depositPct: 50, balanceDays: 21 },
];
// Real deliveries run a little late on average: mean = typed days + half the typed spread.
export const trueLead = s => s.lt + 0.5 * s.ltv;
const drawLead = (s, r) => Math.max(1, Math.round(trueLead(s) + s.ltv * gauss(r)));

/**
 * opts: { year, run, policy: 'app' | 'plan' | 'urgent' | 'even', cashWeekly (for the three cash policies),
 *         products (from pickProducts), settings (overrides), detail (keep per-check records) }
 */
export function replay(Engine, d, opts) {
  const year = opts.year, items = opts.products, rr = mulberry(hash(`${d.store}:${year}:run${opts.run || 1}`)), rh = mulberry(hash(`${d.store}:${year}:hind${opts.run || 1}`));
  const m0 = (year - 2 - 2012) * 12, mT = (year - 2012) * 12;
  const dStart = d.idx(`${year}-01-01`), dEnd = d.idx(`${year}-12-31`);
  const ws = Engine.blankWorkspace();
  Object.assign(ws.settings, { orderCost: 20, holdRate: 25, lastMonth: 12, overstockDays: 120, budget: 0 }, opts.settings || {});
  ws.suppliers = SUPPLIERS.map(s => ({ ...s }));
  const sup = Object.fromEntries(SUPPLIERS.map(s => [s.id, s]));
  ws.products = items.map((it, i) => {
    const price = it.price[year - 1] || it.price[year - 2];
    return { id: 'p' + i, name: it.id, supplierId: SUPPLIERS[i % 3].id, profileId: 'flat', sales: it.m.slice(m0 + 12, m0 + 24), older: new Array(12).fill(null).concat(it.m.slice(m0, m0 + 12)), cost: Math.round(price * 55) / 100, price, onHand: 0, onOrder: 0, sl: 95, altSuppliers: [], fcHist: [] };
  });
  const N = items.length, st = items.map(() => ({ onHand: 0, pipe: [], served: 0, lost: 0, mServed: 0, stockDays: 0, cycles: 0, badCycles: 0, lostSinceArrival: 0 }));
  const compute = () => { ws.products.forEach((p, i) => { p.onHand = st[i].onHand; p.onOrder = sum(st[i].pipe.map(x => x.qty)); }); const c = Engine.sanitize(ws, LIMITS); return Engine.compute(c.ws); };
  const row = (res, i) => res.rows[i];
  const real = (i, m) => items[i].m[mT + m];           // real units sold in month m of the test year
  const realDay = (i, k) => items[i].daily[k] || 0;

  // Starting stock: the reorder point plus half an order, a neutral place in the cycle.
  let res = compute();
  st.forEach((s, i) => { const r = row(res, i); s.onHand = Math.max(0, r.rop + Math.ceil(r.oq / 2)); });
  res = compute();

  const out = {
    store: d.store, year, n: N, jan: null, monthStore: [], monthProd: [], healthy: { n: 0, ok: 0 }, verdict: {}, reorder: { near: [0, 0], far: [0, 0], near2: [0, 0] },
    cover: { e: 0, a: 0, n: 0 }, dead: { flags: 0, right: 0 }, over: { n: 0, ok: 0 }, risk: 0, riskReal: 0, lines: 0, orders: 0, spendWeek: [], spendMonth: new Array(12).fill(0), cashPlan: [], carton: { n: 0, ok: 0 }, cashFlowOk: true,
    weeks: 0,
  };
  const jan = res;
  out.jan = {
    path: jan.dash.fcPath.slice(), lo: jan.dash.fcLo.slice(), hi: jan.dash.fcHi.slice(), revenue: jan.dash.revenue, invCost: jan.dash.inventoryCost,
    abc: jan.rows.map(r => r.abc), xyz: jan.rows.map(r => r.xyz), trend: jan.rows.map(r => r.trend), annual: jan.rows.map(r => r.annual),
  };
  const pending = []; // reorder-week predictions waiting for the real week
  const deadSeen = new Set();
  let cash = 0, orderSeq = 0, lastRes = res;

  const forward = (i, from, days) => { // play real demand on current stock plus what is already on the way; true when nothing is lost
    let h = st[i].onHand; const pipe = st[i].pipe;
    for (let k = from; k < from + days && k < d.days; k++) { for (const x of pipe) if (x.arrive === k) h += x.qty; const dm = realDay(i, k); if (dm > h) return false; h -= dm; }
    return true;
  };
  const lostIfSkipped = (i, from, days) => { // units lost if no order is placed now and the next one waits a week
    let h = st[i].onHand, lost = 0; const pipe = st[i].pipe;
    for (let k = from; k < from + days && k < d.days; k++) { for (const x of pipe) if (x.arrive === k) h += x.qty; const dm = realDay(i, k), sv = Math.min(h, dm); h -= sv; lost += dm - sv; }
    return lost;
  };
  const lastsDays = (i, from) => { let h = st[i].onHand; for (let k = from; k < d.days; k++) { const dm = realDay(i, k); if (dm >= h) return dm > 0 ? (k - from) + h / dm : k - from; h -= dm; } return null; };

  for (let k = dStart; k <= dEnd; k++) {
    const date = new Date(d.t0 + k * DAY), mIdx = date.getUTCMonth(), dom = date.getUTCDate(), dow = date.getUTCDay();
    // 1. deliveries land
    st.forEach((s, i) => { const arr = s.pipe.filter(x => x.arrive === k); if (arr.length) { arr.forEach(x => { s.onHand += x.qty; const o = ws.orders.find(o => o.id === x.oid); if (o && o.status !== 'received') { o.status = 'received'; o.receivedAt = iso(d.t0 + k * DAY); } }); s.pipe = s.pipe.filter(x => x.arrive !== k); s.cycles++; if (s.lostSinceArrival > 0) s.badCycles++; s.lostSinceArrival = 0; } });
    // 2. first of the month: the owner starts a new month and types what last month sold
    if (dom === 1 && k > dStart) {
      ws.period = (ws.period || 0) + 1;
      ws.products.forEach((p, i) => { const r = row(lastRes, i); if (r && r.n > 0 && r.fc) p.fcHist = (p.fcHist || []).concat([{ k: ws.period, f: Math.round(r.fc[0] * 10) / 10 }]).slice(-24); p.older = p.older.slice(1).concat([p.sales[0]]); p.sales = p.sales.slice(1).concat([st[i].mServed]); st[i].mServed = 0; });
      ws.settings.lastMonth = ws.settings.lastMonth % 12 + 1;
    }
    // 3. first of the month (January included): score the month-ahead forecasts, days of cover and dead stock
    if (dom === 1) {
      res = compute(); lastRes = res;
      out.monthStore.push({ f: res.dash.fcPath[0], fsum: sum(res.rows.map(r => r.fc[0])), a: sum(items.map((_, i) => real(i, mIdx))), ly: sum(items.map(it => it.m[mT - 12 + mIdx])) });
      res.rows.forEach((r, i) => {
        out.monthProd.push({ f: r.fc[0], a: real(i, mIdx), avg3: (items[i].m[mT + mIdx - 1] + items[i].m[mT + mIdx - 2] + items[i].m[mT + mIdx - 3]) / 3 });
        if (r.cover != null && r.onHand > 0) { const a = lastsDays(i, k); if (a != null && a <= 365) { out.cover.e += Math.abs(Math.min(r.cover, 365) - a); out.cover.a += a; out.cover.n++; } }
        if (r.isDead && !deadSeen.has(i)) { deadSeen.add(i); const nx = [0, 1, 2].map(j => items[i].m[mT + mIdx + j]).filter(v => v != null); if (nx.length === 3) { out.dead.flags++; if (nx.every(v => v <= 0.2 * r.avgD)) out.dead.right++; } }
      });
      const cp = res.cashPlan; if (cp) out.cashPlan.push({ m: mIdx, spend: cp.spend.slice() });
    }
    // 4. Sunday: open the app and order what it says
    if (dow === 0) {
      res = compute(); lastRes = res; out.weeks++;
      const wk = out.weeks;
      // reorder-week predictions made earlier: did this week turn out to be the one?
      for (const p of pending) if (!p.done) { const r = row(res, p.i); if (r.decision === 'ORDER' || r.decision === 'CRITICAL') { p.done = true; p.actual = wk - p.made; } }
      let want = [];
      res.rows.forEach((r, i) => {
        const s = sup[r.supplierId], L = drawLead(s, rh);
        out.verdict[r.decision] = out.verdict[r.decision] || { n: 0, empty: 0 };
        const safe = forward(i, k, 7 + L);
        out.verdict[r.decision].n++; if (!safe) out.verdict[r.decision].empty++;
        if (r.decision === 'OK' || r.decision === 'OVER') { out.healthy.n++; if (safe) out.healthy.ok++; }
        if (r.decision === 'OVER') { const a = lastsDays(i, k); if (a != null || d.days - k > 120) { out.over.n++; if (a == null || a > 120) out.over.ok++; } }
        if ((r.decision === 'OK' || r.decision === 'OVER') && r.daysToReorder > 0) { const w = Math.ceil(r.daysToReorder / 7); if (w >= 1 && w <= 4) pending.push({ i, made: wk, w }); }
        if (r.qty > 0) { want.push({ i, r, qty: r.qty }); out.risk += r.risk.profit; out.riskReal += lostIfSkipped(i, k, 7 + L) * Math.max(0, r.price - r.cost); out.carton.n++; if (r.qty % r.pack === 0 && r.qty >= r.moq) out.carton.ok++; }
      });
      const flow = sum(res.cashFlow.lines.map(l => l.total)); if (Math.abs(flow - res.dash.orderValue) > 0.01) out.cashFlowOk = false;
      // cash-limited policies
      if (opts.policy && opts.policy !== 'app') {
        cash += opts.cashWeekly;
        const total = sum(want.map(w => w.qty * w.r.cost));
        if (total > cash + 1e-9) {
          if (opts.policy === 'plan') {
            ws.settings.budget = Math.max(0.01, cash); const r2 = compute(); ws.settings.budget = 0;
            const bp = r2.budgetPlan, by = {}; (bp ? bp.lines : []).forEach(l => { by[l.id] = l.qty; });
            want = want.map(w => ({ ...w, qty: bp ? (by[w.r.id] || 0) : w.qty }));
          } else if (opts.policy === 'urgent') {
            const O = { A: 0, B: 1, C: 2 }; let left = cash;
            want.sort((a, b) => (a.r.decision === b.r.decision ? 0 : a.r.decision === 'CRITICAL' ? -1 : 1) || O[a.r.abc] - O[b.r.abc] || b.r.orderValue - a.r.orderValue);
            want = want.map(w => { const c = w.qty * w.r.cost; if (c <= left + 1e-9) { left -= c; return w; } return { ...w, qty: 0 }; });
          } else if (opts.policy === 'even') {
            const share = cash / total;
            want = want.map(w => { const p = w.r.pack; let q = Math.floor(w.qty * share / p) * p; if (q < w.r.moq) q = 0; return { ...w, qty: q }; });
          }
        }
        cash -= sum(want.map(w => w.qty * w.r.cost));
      }
      want = want.filter(w => w.qty > 0);
      let spend = 0;
      const bySup = {};
      want.forEach(w => { (bySup[w.r.supplierId] = bySup[w.r.supplierId] || []).push(w); });
      Object.keys(bySup).forEach(sid => {
        const s = sup[sid], L = drawLead(s, rr), oid = 'o' + (++orderSeq);
        ws.orders.push({ id: oid, supplierId: sid, supplierName: s.name, status: 'sent', sentAt: iso(d.t0 + k * DAY), receivedAt: '', lines: bySup[sid].map(w => ({ productId: w.r.id, name: w.r.name, qty: w.qty, cost: w.r.cost })) });
        bySup[sid].forEach(w => { st[w.i].pipe.push({ arrive: k + L, qty: w.qty, oid }); spend += w.qty * w.r.cost; out.lines++; });
        out.orders++;
      });
      out.spendWeek.push(spend); out.spendMonth[mIdx] += spend;
    }
    // 5. customers buy the real quantities
    st.forEach((s, i) => { const dm = realDay(i, k), sv = Math.min(s.onHand, dm); s.onHand -= sv; s.served += sv; s.mServed += sv; s.lost += dm - sv; s.lostSinceArrival += dm - sv; s.stockDays += s.onHand; });
  }
  // reorder-week scoring
  for (const p of pending) {
    const horizonLeft = out.weeks - p.made;
    if (!p.done && horizonLeft < p.w + 2) continue; // year ended before it could be seen
    const hit1 = p.done && Math.abs(p.actual - p.w) <= 1, hit2 = p.done && Math.abs(p.actual - p.w) <= 2;
    const b = p.w <= 2 ? out.reorder.near : out.reorder.far; b[0]++; if (hit1) b[1]++;
    if (p.w <= 2) { out.reorder.near2[0]++; if (hit2) out.reorder.near2[1]++; }
  }
  const days = dEnd - dStart + 1, P = ws.products;
  const demand = sum(st.map(s => s.served + s.lost)), served = sum(st.map(s => s.served));
  out.fill = served / demand;
  out.units = demand;
  out.realMonths = [...Array(12).keys()].map(m => sum(items.map((_, i) => real(i, m))));
  out.revenueReal = sum(items.map((_, i) => sum(items[i].m.slice(mT, mT + 12)) * P[i].price));
  out.lostProfit = sum(st.map((s, i) => s.lost * (P[i].price - P[i].cost)));
  out.avgStockValue = sum(st.map((s, i) => s.stockDays / days * P[i].cost));
  out.costReal = out.lines * ws.settings.orderCost + out.avgStockValue * ws.settings.holdRate / 100;
  out.totalCost = out.costReal + out.lostProfit;
  out.cycles = sum(st.map(s => s.cycles)); out.badCycles = sum(st.map(s => s.badCycles));
  out.leads = (lastRes.dash.learn.leads || []).map(l => ({ id: l.id, learned: l.learned, typed: l.typed, real: trueLead(sup[l.id]), n: l.n }));
  // classes on the real year: the same engine, given the real year as its last twelve months
  const ws2 = Engine.blankWorkspace(); Object.assign(ws2.settings, ws.settings, { lastMonth: 12 }); ws2.suppliers = SUPPLIERS.map(s => ({ ...s }));
  ws2.products = items.map((it, i) => ({ ...P[i], sales: it.m.slice(mT, mT + 12), older: it.m.slice(m0, m0 + 24), fcHist: [] }));
  const realRes = Engine.compute(Engine.sanitize(ws2, LIMITS).ws);
  const revReal = items.map((it, i) => sum(it.m.slice(mT, mT + 12)) * P[i].price), totRev = sum(revReal);
  const abcReal = revReal.map(v => { const above = sum(revReal.filter(x => x > v)); const n = above / totRev; return n < 0.8 - 1e-9 ? 'A' : n < 0.95 - 1e-9 ? 'B' : 'C'; });
  out.abcRight = out.jan.abc.filter((c, i) => c === abcReal[i]).length / N;
  const X = { X: 0, Y: 1, Z: 2 }, xr = realRes.rows.map(r => r.xyz);
  out.xyzExact = out.jan.xyz.filter((c, i) => c === xr[i]).length / N;
  out.xyzNear = out.jan.xyz.filter((c, i) => Math.abs(X[c] - X[xr[i]]) <= 1).length / N;
  out.dirRight = out.jan.trend.filter((t, i) => (t > 0) === (sum(items[i].m.slice(mT, mT + 12)) > sum(items[i].m.slice(mT - 12, mT)))).length / N;
  return out;
}

// ---- scoring helpers shared by the runners ----
export const acc = (pairs, f = 'f') => { const a = sum(pairs.map(p => p.a)), e = sum(pairs.map(p => Math.abs(p[f] - p.a))); return a > 0 ? Math.max(0, 1 - e / a) : null; };
export const acc1 = (f, a) => (a > 0 ? Math.max(0, 1 - Math.abs(f - a) / a) : null);
export const mean = a => (a.length ? sum(a) / a.length : null);
export function score(o) {
  const yearF = sum(o.jan.path), inside = o.realMonths.filter((a, m) => a >= o.jan.lo[m] && a <= o.jan.hi[m]).length;
  return {
    yearForecast: acc1(yearF, o.units), yearF, units: o.units, monthStore: acc(o.monthStore), monthStoreLastYear: acc(o.monthStore, 'ly'),
    monthProd: acc(o.monthProd), monthProdAvg3: acc(o.monthProd, 'avg3'), fill: o.fill, healthy: o.healthy.n ? o.healthy.ok / o.healthy.n : null,
    reorderNear: o.reorder.near[0] ? o.reorder.near[1] / o.reorder.near[0] : null, reorderFar: o.reorder.far[0] ? o.reorder.far[1] / o.reorder.far[0] : null,
    reorderNear2: o.reorder.near2[0] ? o.reorder.near2[1] / o.reorder.near2[0] : null,
    cost: acc1(o.jan.invCost, o.costReal), costF: o.jan.invCost, costReal: o.costReal, risk: acc1(o.risk, o.riskReal), riskF: o.risk, riskReal: o.riskReal, lostProfit: o.lostProfit,
    leads: mean(o.leads.map(l => acc1(l.learned, l.real))), deadFlags: o.dead.flags, deadRight: o.dead.right, revenue: acc1(o.jan.revenue, o.revenueReal), revenueF: o.jan.revenue, revenueReal: o.revenueReal,
    cycles: o.cycles ? 1 - o.badCycles / o.cycles : null, carton: o.carton.n ? o.carton.ok / o.carton.n : null, cashFlowOk: o.cashFlowOk,
    abc: o.abcRight, xyzExact: o.xyzExact, xyzNear: o.xyzNear, cover: o.cover.a > 0 ? Math.max(0, 1 - o.cover.e / o.cover.a) : null, direction: o.dirRight, inside,
    overRight: o.over.n ? o.over.ok / o.over.n : null, overN: o.over.n, avgStockValue: o.avgStockValue, orders: o.orders, lines: o.lines, totalCost: o.totalCost,
  };
}
