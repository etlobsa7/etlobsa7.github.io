import { loadStore, pickProducts, replay, score } from './sim.mjs';
const { Engine } = await import(process.env.ENGINE);
const [dir, store, year] = [process.argv[2], process.argv[3] || 'WI_2', +(process.argv[4] || 2015)];
const d = loadStore(dir, store), pk = pickProducts(d, year);
const t = Date.now(), o = replay(Engine, d, { year, run: 1, products: pk.picked });
console.log('eligible', pk.eligible, 'ms', Date.now() - t);
console.log(JSON.stringify(score(o), (k, v) => typeof v === 'number' ? Math.round(v * 10000) / 10000 : v, 1));
console.log(o.verdict, o.reorder, o.leads, o.weeks);
