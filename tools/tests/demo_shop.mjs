// The sample shop shown in the website's demo (demo/index.html). It is richer than the practice shop inside the
// app so that every feature on every plan has something real to show:
//   Basic: purchase plan, order decisions, forecasts, upcoming orders, learned delivery times, accuracy, health check
//   Pro:   a custom season shape, a supplier comparison, the scorecard, the cash flow forecast, the Sunday email
//   Store: profit at risk, demand graphs, a dead product, the budget plan, the 3-month cash plan
// Sales are made from calendar seasons (winter, summer, back to school, Ramadan and Eid on their real dates),
// so the months line up with the date the demo is built. The forecast history behind the accuracy page is
// not invented: it replays the last 6 month-starts and keeps what the engine really forecast each time.
// Usage: import { demoWorkspace } from './demo_shop.mjs'; const ws = demoWorkspace(Engine, new Date());

// Ramadan start, Eid al-Fitr and Eid al-Adha (approximate civil dates; moon sighting can move each a day)
const HOLY = {
  2023: ['2023-03-23', '2023-04-21', '2023-06-28'], 2024: ['2024-03-11', '2024-04-10', '2024-06-16'],
  2025: ['2025-03-01', '2025-03-30', '2025-06-06'], 2026: ['2026-02-18', '2026-03-20', '2026-05-27'],
  2027: ['2027-02-08', '2027-03-10', '2027-05-16'],
};
const D = s => new Date(s + 'T00:00:00Z');
const DAY = 864e5;

// Gift-box demand by day: busy through Ramadan and busiest in its last two weeks, a smaller lift before Eid al-Adha
function giftFactor(y, m) {               // m = 1..12, returns the month's average daily weight
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate(); let s = 0;
  for (let d = 1; d <= days; d++) {
    const t = Date.UTC(y, m - 1, d); let w = 1;
    for (const yy of [y - 1, y, y + 1]) {
      const h = HOLY[yy]; if (!h) continue;
      const r0 = D(h[0]).getTime(), eid = D(h[1]).getTime(), adha = D(h[2]).getTime();
      if (t >= r0 && t < eid) w = t >= eid - 14 * DAY ? 3.4 : 2.1;
      else if (t >= adha - 7 * DAY && t < adha) w = Math.max(w, 1.5);
    }
    s += w;
  }
  return s / days;
}

const SHAPES = {
  flat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  winter: [1.55, 1.35, 1, 0.7, 0.5, 0.4, 0.4, 0.55, 0.9, 1.25, 1.6, 1.8],
  summer: [0.45, 0.5, 0.85, 1.6, 2.05, 1.85, 1.15, 0.6, 0.4, 0.35, 0.4, 0.75],
  school: [0.8, 0.9, 0.7, 0.6, 0.5, 0.5, 0.8, 1.6, 2.4, 1.7, 0.7, 0.8],
};
export const SCHOOL = { id: 'school', name: 'Back to school', nameAr: 'دخول المدارس', builtin: false, f: SHAPES.school.slice() };

// small fixed wobble so months are not perfectly smooth (same numbers on every build)
function wobble(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

/** 36 calendar months of sales ending at (endY, endM), oldest first. */
function series(spec, endY, endM) {
  const out = [], rnd = wobble(spec.seed);
  for (let i = 35; i >= 0; i--) {
    let y = endY, m = endM - i; while (m < 1) { m += 12; y--; }
    const ago = i / 12;                                   // years before the newest month
    const season = spec.shape === 'ramadan' ? giftFactor(y, m) / 1.25 : SHAPES[spec.shape][m - 1];
    let v = spec.base * season * Math.pow(1 + (spec.growth || 0), -ago) * (1 + (spec.noise || 0.08) * (rnd() * 2 - 1));
    if (spec.override && spec.override[i] !== undefined) v = spec.override[i];
    out.push(i >= (spec.months || 36) ? null : Math.max(0, Math.round(v)));
  }
  return out;
}

const SUPPLIERS = [
  { id: 'supcairo', name: 'Cairo Knit Co.', lt: 21, ltv: 4, moq: 24, pack: 12, terms: '50% upfront', depositPct: 50, balanceDays: 21 },
  { id: 'supalex', name: 'Alex Leather', lt: 14, ltv: 2, moq: 10, pack: 5, terms: 'Cash on delivery', depositPct: 0, balanceDays: 14 },
  { id: 'supprint', name: 'Nasr City Print', lt: 7, ltv: 3, moq: 0, pack: 1, terms: 'Net 15', depositPct: 0, balanceDays: 15 },
  { id: 'supmahalla', name: 'Mahalla Mills', lt: 30, ltv: 6, moq: 60, pack: 20, terms: '30% upfront', depositPct: 30, balanceDays: 30 },
];

// shape, monthly base, growth a year, history length, cost and price (EGP), stock today
const PRODUCTS = [
  { id: 'p1', name: 'Wool scarf', sup: 'supcairo', prof: 'winter', shape: 'winter', base: 34, growth: 0.1, seed: 11, cost: 180, price: 390, onHand: 30, sl: 95 },
  { id: 'p2', name: 'Cotton tee', sup: 'supcairo', prof: 'summer', shape: 'summer', base: 70, growth: 0.12, seed: 12, cost: 140, price: 320, onHand: 64, sl: 97, alt: [{ supplierId: 'supmahalla', cost: 124 }] },
  { id: 'p3', name: 'Leather wallet', sup: 'supalex', prof: 'flat', shape: 'flat', base: 38, growth: 0.14, seed: 13, cost: 220, price: 480, onHand: 24, sl: 95 },
  { id: 'p4', name: 'Leather belt', sup: 'supalex', prof: 'flat', shape: 'flat', base: 15, noise: 0.55, seed: 14, cost: 160, price: 290, onHand: 40, sl: 90 },
  { id: 'p5', name: 'Eid gift box', sup: 'supprint', prof: 'ramadan', shape: 'ramadan', base: 26, growth: 0.08, seed: 15, cost: 60, price: 150, onHand: 34, sl: 95 },
  { id: 'p6', name: 'Tote bag', sup: 'supprint', prof: 'flat', shape: 'flat', base: 11, growth: 0.5, seed: 16, months: 8, cost: 45, price: 140, onHand: 3, sl: 90 },
  { id: 'p7', name: 'Linen shirt', sup: 'supmahalla', prof: 'summer', shape: 'summer', base: 32, growth: 0.05, seed: 17, cost: 170, price: 360, onHand: 150, sl: 95 },
  // sold steadily for two and a half years, then stopped in the last five months: the dead-stock example
  { id: 'p8', name: 'Printed mug', sup: 'supprint', prof: 'flat', shape: 'flat', base: 14, seed: 18, months: 30, cost: 40, price: 110, onHand: 60, sl: 90, override: { 4: 1, 3: 0, 2: 1, 1: 0, 0: 0 } },
  { id: 'p9', name: 'Canvas backpack', sup: 'supcairo', prof: 'school', shape: 'school', base: 22, growth: 0.1, seed: 19, cost: 210, price: 450, onHand: 26, sl: 95 },
  // steady seller whose shelf ran empty: the last two months are a stockout, not a fall in demand
  { id: 'p10', name: 'Phone case', sup: 'supprint', prof: 'flat', shape: 'flat', base: 30, growth: 0.06, seed: 20, cost: 35, price: 120, onHand: 0, sl: 95, override: { 1: 5, 0: 1 } },
  // the supplier raised the cost and the shelf price was never updated: the health check's red example
  { id: 'p11', name: 'Silk scarf', sup: 'supcairo', prof: 'winter', shape: 'winter', base: 12, seed: 21, cost: 265, price: 250, onHand: 44, sl: 90 },
];

const iso = t => new Date(t).toISOString().slice(0, 10);

function build(endY, endM, today) {
  const ws = { v: 1, rev: 0, period: 0, settings: { orderCost: 350, holdRate: 25, lastMonth: endM, seasonOn: true, trendOn: true, overstockDays: 120, budget: 25000, daysPerMonth: 30 },
    profiles: null, suppliers: SUPPLIERS.map(s => ({ ...s })), products: [], orders: [] };
  for (const p of PRODUCTS) {
    const s = series(p, endY, endM);
    ws.products.push({ id: p.id, name: p.name, supplierId: p.sup, profileId: p.prof, sales: s.slice(24), older: s.slice(0, 24),
      cost: p.cost, price: p.price, onHand: p.onHand, onOrder: 0, sl: p.sl, altSuppliers: (p.alt || []).map(a => ({ ...a })), fcHist: [] });
  }
  return ws;
}

export function demoWorkspace(Engine, now = new Date()) {
  // the newest full month of sales is last month
  let endY = now.getUTCFullYear(), endM = now.getUTCMonth(); if (endM === 0) { endM = 12; endY--; }
  const base = Engine.sampleWorkspace();
  const profiles = base.profiles.map(p => ({ ...p, f: p.f.slice() })).concat([{ ...SCHOOL, f: SCHOOL.f.slice() }]);
  const lim = { products: 200, suppliers: 100, customProfiles: true, altSuppliers: true };
  // Replay the last 6 month-starts: what the engine forecast for each month before it happened.
  const fc = {};
  for (let k = 1; k <= 6; k++) {
    let y = endY, m = endM - (7 - k); while (m < 1) { m += 12; y--; }          // history then ended here
    const past = build(y, m); past.profiles = profiles.map(p => ({ ...p, f: p.f.slice() }));
    const at = new Date(Date.UTC(y, m, 20));                                    // the 20th of the next month
    const c = Engine.sanitize(past, lim, at.getTime()); const res = Engine.compute(c.ws, at.getTime());
    for (const r of res.rows) if (r.n > 0 && r.fc) (fc[r.id] = fc[r.id] || []).push({ k, f: Math.round(r.fc[0] * 10) / 10 });
  }
  const ws = build(endY, endM);
  ws.profiles = profiles; ws.period = 6;
  ws.products.forEach(p => { p.fcHist = fc[p.id] || []; });
  const day = n => iso(now.getTime() - n * DAY), line = (id, qty) => { const p = ws.products.find(x => x.id === id); return { productId: id, name: p.name, qty, cost: p.cost }; };
  const sup = id => SUPPLIERS.find(s => s.id === id).name;
  const order = (id, s, status, sent, got, lines) => ({ id, supplierId: s, supplierName: sup(s), status, sentAt: day(sent), ...(got != null ? { receivedAt: day(got) } : {}), lines });
  ws.orders = [
    order('o1', 'supcairo', 'sent', 8, null, [line('p1', 36), line('p9', 12)]),
    order('o2', 'supprint', 'sent', 3, null, [line('p5', 40)]),
    order('o3', 'supcairo', 'received', 150, 126, [line('p2', 120)]),
    order('o4', 'supcairo', 'received', 64, 40, [line('p9', 48)]),
    order('o5', 'supalex', 'received', 118, 104, [line('p3', 40)]),
    order('o6', 'supalex', 'received', 70, 53, [line('p4', 30)]),
    order('o7', 'supprint', 'received', 95, 88, [line('p10', 60)]),
    order('o8', 'supprint', 'received', 46, 38, [line('p6', 20)]),
    order('o9', 'supmahalla', 'received', 200, 162, [line('p7', 160)]),
  ];
  for (const o of ws.orders) if (o.status === 'sent') for (const l of o.lines) ws.products.find(p => p.id === l.productId).onOrder += l.qty;
  return ws;
}
