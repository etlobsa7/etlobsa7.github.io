// Prints a results JSON as a short table; with two files, shows them side by side.
import fs from 'fs';
const files = process.argv.slice(2), R = files.map(f => JSON.parse(fs.readFileSync(f)));
const pct = v => (v == null ? '  -  ' : (v * 100).toFixed(1).padStart(5));
const KEYS = ['yearForecast', 'monthStore', 'monthStoreLastYear', 'monthProd', 'monthProdAvg3', 'fill', 'healthy', 'cycles', 'reorderNear', 'reorderNear2', 'reorderFar', 'cost', 'risk', 'leads', 'revenue', 'abc', 'xyzExact', 'xyzNear', 'cover', 'direction', 'overRight', 'carton'];
const row = (name, get) => console.log(name.padEnd(22), ...R.map(r => { try { return get(r); } catch (e) { return '  ?  '; } }));
for (const [title, sel] of [['WI_2 2015', r => r.site.WI_2.avg], ['CA_3 2015', r => r.site.CA_3.avg], ['20 store-years avg', r => r.allAvg], ['20 store-years worst', r => r.allWorst]]) {
  console.log('\n== ' + title + '   ' + R.map(r => r.engine).join('   '));
  KEYS.forEach(k => row(k, r => pct(sel(r)[k])));
  if (title.includes('201')) { row('inside (of 12)', r => String(sel(r).inside).padStart(5)); row('units real', r => String(Math.round(sel(r).units)).padStart(6)); row('year fc units', r => String(Math.round(sel(r).yearF)).padStart(6)); row('stock value', r => String(Math.round(sel(r).avgStockValue)).padStart(6)); row('total cost', r => String(Math.round(sel(r).totalCost)).padStart(6)); row('risk pred/real', r => Math.round(sel(r).riskF) + '/' + Math.round(sel(r).riskReal)); }
  else if (title.includes('avg')) { row('stock value', r => String(Math.round(sel(r).avgStockValue)).padStart(6)); row('total cost', r => String(Math.round(sel(r).totalCost)).padStart(6)); row('lost profit', r => String(Math.round(sel(r).lostProfit)).padStart(6)); row('orders', r => String(Math.round(sel(r).orders)).padStart(6)); row('inside', r => sel(r).inside.toFixed(1)); }
}
console.log('\n== verdicts, all store-years (share where waiting a week emptied the shelf)');
['CRITICAL', 'ORDER', 'OK', 'OVER'].forEach(k => row(k, r => { const v = r.allVerdict[k]; return v ? `${v.n} ${(100 * v.empty / v.n).toFixed(1)}%` : '-'; }));
row('dead flags right', r => r.allDead.right + '/' + r.allDead.flags);
row('cash m1 m2 m3 3m', r => ['m1', 'm2', 'm3', 'q'].map(k => pct(r.allCash[k])).join(' '));
row('  WI_2', r => ['m1', 'm2', 'm3', 'q'].map(k => pct(r.site.WI_2.cash[k])).join(' ')); row('  CA_3', r => ['m1', 'm2', 'm3', 'q'].map(k => pct(r.site.CA_3.cash[k])).join(' '));
console.log('\n== cash short: profit lost (demand served)');
for (const share of Object.keys(R[0].cash)) for (const k of ['free', 'plan', 'even', 'urgent']) row(`${share} ${k}`, r => { const c = r.cash[share]; return `all ${Math.round(c.all[k].lost)} (${pct(c.all[k].fill)})  WI ${Math.round(c.site.WI_2[k].lost)}  CA ${Math.round(c.site.CA_3[k].lost)}`; });
