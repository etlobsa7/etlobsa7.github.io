import fs from 'fs';
const R = process.argv.slice(2).map(f => JSON.parse(fs.readFileSync(f)));
const pct = v => (v == null ? '  -  ' : (v * 100).toFixed(1).padStart(5));
const K = ['fill', 'healthy', 'cycles', 'yearForecast', 'revenue', 'monthStore', 'monthStoreLastYear', 'monthProd', 'monthProdAvg3', 'cover', 'reorderNear', 'overRight', 'risk'];
for (const name of Object.keys(R[0].sets)) {
  console.log('\n== ' + name + '   ' + R.map(r => r.engine).join('   '));
  K.forEach(k => console.log(k.padEnd(20), ...R.map(r => pct(r.sets[name].avg[k]))));
  console.log('stock value'.padEnd(20), ...R.map(r => String(Math.round(r.sets[name].avg.avgStockValue)).padStart(6)));
  console.log('total cost'.padEnd(20), ...R.map(r => String(Math.round(r.sets[name].avg.totalCost)).padStart(6)));
  console.log('lost profit'.padEnd(20), ...R.map(r => String(Math.round(r.sets[name].avg.lostProfit)).padStart(6)));
  console.log('dead right/flags'.padEnd(20), ...R.map(r => r.sets[name].dead.right + '/' + r.sets[name].dead.flags));
  console.log('verdict empty%'.padEnd(20), ...R.map(r => ['CRITICAL', 'ORDER', 'OK', 'OVER', 'NODEMAND', 'NOHIST'].map(k => { const v = r.sets[name].verdict[k]; return v ? k[0] + k[1] + ':' + (100 * v.empty / v.n).toFixed(1) + '/' + v.n : ''; }).join(' ')));
}
