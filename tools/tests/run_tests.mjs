// Runs every Walmart test and writes one JSON of results.
// Usage: ENGINE=/path/to/engine.js node run_tests.mjs <data dir> <out.json> [runsSite=40] [runsAll=10] [runsCash=3]
import fs from 'fs';
import { loadStore, pickProducts, replay, score, mean } from './sim.mjs';
const { Engine } = await import(process.env.ENGINE);
const [dir, outFile] = [process.argv[2], process.argv[3]];
const RS = +(process.argv[4] || 40), RA = +(process.argv[5] || 10), RC = +(process.argv[6] || 3);
const STORES = ['CA_1', 'CA_2', 'CA_3', 'CA_4', 'TX_1', 'TX_2', 'TX_3', 'WI_1', 'WI_2', 'WI_3'], YEARS = [2014, 2015];
const sum = a => a.reduce((x, y) => x + y, 0);
const avgScores = list => { const o = {}; Object.keys(list[0]).forEach(k => { const v = list.map(s => s[k]).filter(x => typeof x === 'number'); if (v.length) o[k] = mean(v); }); return o; };
const cashAcc = o => { // the cash plan made on the 1st of each month against what the orders really cost
  const P = o.cashPlan, R = o.spendMonth, e = [0, 0, 0, 0], a = [0, 0, 0, 0];
  P.forEach(p => { for (let j = 0; j < 3; j++) if (p.m + j < 12) { e[j] += Math.abs(p.spend[j] - R[p.m + j]); a[j] += R[p.m + j]; } if (p.m + 2 < 12) { const f = sum(p.spend), r = R[p.m] + R[p.m + 1] + R[p.m + 2]; e[3] += Math.abs(f - r); a[3] += r; } });
  return e.map((x, j) => (a[j] > 0 ? Math.max(0, 1 - x / a[j]) : null));
};
const res = { engine: process.env.ENGINE_LABEL || '', made: new Date().toISOString().slice(0, 10), site: {}, all: {}, cash: {} };
const cache = {};
for (const store of STORES) { cache[store] = loadStore(dir, store); }

function runSet(store, year, runs) {
  const d = cache[store], pk = pickProducts(d, year), outs = [];
  for (let r = 1; r <= runs; r++) outs.push(replay(Engine, d, { year, run: r, products: pk.picked }));
  const sc = outs.map(score), o0 = outs[0];
  const verdict = {}; outs.forEach(o => Object.entries(o.verdict).forEach(([k, v]) => { verdict[k] = verdict[k] || { n: 0, empty: 0 }; verdict[k].n += v.n; verdict[k].empty += v.empty; }));
  return {
    eligible: pk.eligible, runs, avg: avgScores(sc), verdict, cash: avgScores(outs.map(o => { const c = cashAcc(o); return { m1: c[0], m2: c[1], m3: c[2], q: c[3] }; })),
    dead: { flags: sum(outs.map(o => o.dead.flags)), right: sum(outs.map(o => o.dead.right)) },
    chart: { real: o0.realMonths, year: o0.jan.path, lo: o0.jan.lo, hi: o0.jan.hi, month: o0.monthStore.map(m => m.f), lastYear: o0.monthStore.map(m => m.ly) },
    spendWeekMean: mean(outs.map(o => mean(o.spendWeek))),
  };
}
for (const store of ['WI_2', 'CA_3']) { res.site[store] = runSet(store, 2015, RS); console.error('site', store); }
for (const store of STORES) for (const year of YEARS) { res.all[store + ':' + year] = runSet(store, year, RA); console.error('all', store, year); }
res.allAvg = avgScores(Object.values(res.all).map(x => x.avg));
res.allWorst = (() => { const o = {}; const L = Object.values(res.all).map(x => x.avg); Object.keys(L[0]).forEach(k => { o[k] = Math.min(...L.map(s => s[k]).filter(x => typeof x === 'number')); }); return o; })();
res.allVerdict = (() => { const v = {}; Object.values(res.all).forEach(x => Object.entries(x.verdict).forEach(([k, y]) => { v[k] = v[k] || { n: 0, empty: 0 }; v[k].n += y.n; v[k].empty += y.empty; })); return v; })();
res.allDead = { flags: sum(Object.values(res.all).map(x => x.dead.flags)), right: sum(Object.values(res.all).map(x => x.dead.right)) };
res.allCash = avgScores(Object.values(res.all).map(x => x.cash));

// cash-short test: each Sunday the shop gets a share of its normal weekly spend; unspent cash carries over
function cashTest(store, year, share, runs) {
  const d = cache[store], pk = pickProducts(d, year), t = { plan: [], urgent: [], even: [], free: [] };
  for (let r = 1; r <= runs; r++) {
    const free = replay(Engine, d, { year, run: r, products: pk.picked }), cw = share * mean(free.spendWeek);
    t.free.push({ lost: free.lostProfit, fill: free.fill });
    for (const policy of ['plan', 'urgent', 'even']) { const o = replay(Engine, d, { year, run: r, products: pk.picked, policy, cashWeekly: cw }); t[policy].push({ lost: o.lostProfit, fill: o.fill }); }
  }
  const o = {}; Object.keys(t).forEach(k => { o[k] = { lost: mean(t[k].map(x => x.lost)), fill: mean(t[k].map(x => x.fill)) }; }); return o;
}
for (const share of [0.8, 0.7, 0.5]) {
  const key = String(share); res.cash[key] = { site: {}, all: {} };
  for (const store of ['WI_2', 'CA_3']) res.cash[key].site[store] = cashTest(store, 2015, share, Math.max(RC, 10));
  const L = []; for (const store of STORES) for (const year of YEARS) L.push(cashTest(store, year, share, RC));
  const o = {}; ['plan', 'urgent', 'even', 'free'].forEach(k => { o[k] = { lost: mean(L.map(x => x[k].lost)), fill: mean(L.map(x => x[k].fill)) }; }); res.cash[key].all = o;
  console.error('cash', share);
}
fs.writeFileSync(outFile, JSON.stringify(res, (k, v) => (typeof v === 'number' ? Math.round(v * 1e5) / 1e5 : v), 1));
console.log('wrote', outFile);
