// Hard cases: a second business with one year of history, slow sellers, products with gaps, new products.
// Usage: ENGINE=/path/engine.js node run_hard.mjs <data dir> <out.json> [runs=3]
import fs from 'fs';
import { loadStore, pickProducts, replay, score, mean } from './sim.mjs';
const { Engine } = await import(process.env.ENGINE);
const [dir, outFile] = [process.argv[2], process.argv[3]], RUNS = +(process.argv[4] || 3);
const STORES = ['CA_1', 'CA_2', 'CA_3', 'CA_4', 'TX_1', 'TX_2', 'TX_3', 'WI_1', 'WI_2', 'WI_3'];
const sum = a => a.reduce((x, y) => x + y, 0);
const avg = list => { const o = {}; Object.keys(list[0]).forEach(k => { const v = list.map(s => s[k]).filter(x => typeof x === 'number'); if (v.length) o[k] = mean(v); }); return o; };
const res = { engine: process.env.ENGINE_LABEL || '', sets: {} };
function runSet(name, jobs) {
  if (process.env.ONLY && !new RegExp(process.env.ONLY).test(name)) return;
  const sc = [], dead = { flags: 0, right: 0 }, verdict = {};
  for (const j of jobs) for (let r = 1; r <= RUNS; r++) {
    const o = replay(Engine, j.d, { ...j.opts, run: r, products: j.products });
    sc.push(score(o)); dead.flags += o.dead.flags; dead.right += o.dead.right;
    Object.entries(o.verdict).forEach(([k, v]) => { verdict[k] = verdict[k] || { n: 0, empty: 0 }; verdict[k].n += v.n; verdict[k].empty += v.empty; });
  }
  res.sets[name] = { jobs: jobs.length, avg: avg(sc), dead, verdict }; console.error(name);
}
// UK online gift retailer: products sold in at least 20 of the 24 months, four groups of 40 by sales rank
const uk = loadStore(dir, 'UK');
const ukOk = uk.items.filter(it => it.m.slice(11, 35).filter(v => v > 0).length >= 20).sort((a, b) => sum(b.m) - sum(a.m));
const bands = { top: ukOk.slice(0, 40), upper: ukOk.slice(Math.floor(ukOk.length / 4), Math.floor(ukOk.length / 4) + 40), middle: ukOk.slice(Math.floor(ukOk.length / 2), Math.floor(ukOk.length / 2) + 40), slow: ukOk.slice(-40) };
res.ukEligible = ukOk.length;
runSet('UK one year of history', Object.values(bands).map(products => ({ d: uk, products, opts: { year: 2011, start: '2010-12-01', learn: 12 } })));
const cache = {}; STORES.forEach(s => { cache[s] = loadStore(dir, s); });
runSet('Walmart slow sellers', STORES.map(s => ({ d: cache[s], products: pickProducts(cache[s], 2015, 40, 2015, 'slow').picked, opts: { year: 2015 } })));
runSet('Walmart products with gaps', STORES.map(s => ({ d: cache[s], products: pickProducts(cache[s], 2015, 40, 2015, 'gappy').picked, opts: { year: 2015 } })));
runSet('Walmart new products, 6 months', STORES.map(s => ({ d: cache[s], products: pickProducts(cache[s], 2015).picked, opts: { year: 2015, keep: 6 } })));
runSet('Walmart new products, 9 months', STORES.map(s => ({ d: cache[s], products: pickProducts(cache[s], 2015).picked, opts: { year: 2015, keep: 9 } })));
runSet('Walmart half the products are 8 months old', STORES.map(s => ({ d: cache[s], products: pickProducts(cache[s], 2015).picked, opts: { year: 2015, keep: i => (i % 2 ? 8 : 0) } })));
runSet('Walmart a quarter of products out of stock for 2 months', STORES.map(s => ({ d: cache[s], products: pickProducts(cache[s], 2015).picked, opts: { year: 2015, stockout: { every: 4, months: 2 } } })));
runSet('Walmart one year of history', STORES.map(s => ({ d: cache[s], products: pickProducts(cache[s], 2015).picked, opts: { year: 2015, keep: 12 } })));
fs.writeFileSync(outFile, JSON.stringify(res, (k, v) => (typeof v === 'number' ? Math.round(v * 1e5) / 1e5 : v), 1));
