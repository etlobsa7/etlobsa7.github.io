// Health check on correct data: all 800 Walmart test products loaded as shops at the end of their learning years,
// stocked at a normal level. Counts how many get a red or amber mark although nothing is wrong with what was typed.
// Usage: ENGINE=/path/engine.js node health_test.mjs <data dir>
import { loadStore, pickProducts, LIMITS, SUPPLIERS } from './sim.mjs';
const { Engine } = await import(process.env.ENGINE);
let n = 0, red = 0, amber = 0; const why = {};
for (const st of ['CA_1', 'CA_2', 'CA_3', 'CA_4', 'TX_1', 'TX_2', 'TX_3', 'WI_1', 'WI_2', 'WI_3']) for (const year of [2014, 2015]) {
  const d = loadStore(process.argv[2], st), pk = pickProducts(d, year).picked, m0 = (year - 2 - d.y0) * 12;
  const mk = stock => { const ws = Engine.blankWorkspace(); Object.assign(ws.settings, { orderCost: 20, holdRate: 25, lastMonth: 12 }); ws.suppliers = SUPPLIERS.map(s => ({ ...s }));
    ws.products = pk.map((it, i) => { const price = it.price[year - 1] || it.price[year - 2]; return { id: 'p' + i, name: it.id, supplierId: SUPPLIERS[i % 3].id, profileId: 'flat', sales: it.m.slice(m0 + 12, m0 + 24), older: new Array(12).fill(null).concat(it.m.slice(m0, m0 + 12)), cost: Math.round(price * 55) / 100, price, onHand: stock ? stock[i] : 0, onOrder: 0, sl: 95 }; });
    return Engine.compute(Engine.sanitize(ws, LIMITS).ws); };
  const first = mk(null), res = mk(first.rows.map(r => r.rop + Math.ceil(r.oq / 2)));
  res.rows.forEach(r => { n++; if (r.health.overall === 'FIX') red++; else if (r.health.overall === 'REVIEW') { amber++; r.health.checks.filter(c => c.level === 'warn').forEach(c => { why[c.code] = (why[c.code] || 0) + 1; }); } });
}
console.log(`${n} correct products: red ${red} (${(100 * red / n).toFixed(1)}%), amber ${amber} (${(100 * amber / n).toFixed(1)}%)`, JSON.stringify(why));
