// Words the demo adds on top of the app's own screens. build_demo.mjs puts them into demo/index.html.
// Every claim here must stay true: each feature listed is in the plan shown, and the comparisons with
// "most stock apps" describe the usual approach (a minimum you set yourself), not any one company.

// Every feature, the plans it is in (B = Basic, P = Pro, S = Store) and the demo page that shows it.
export const FEATURES = [
  // every plan
  { p: 'B', v: 'plan', en: ['Purchase plan', 'What to order this week, grouped by supplier, already rounded to cartons and minimum orders, with the order message ready for WhatsApp.'], ar: ['خطة الشراء', 'تطلب إيه الأسبوع ده، متقسم على الموردين، ومتقرب للكرتونة وأقل طلبية، والرسالة جاهزة تتبعت على واتساب.'] },
  { p: 'B', v: 'orders', en: ['Order decisions', 'Every product gets a verdict (order today, this week, healthy or overstocked) with the reason in plain words.'], ar: ['قرارات الطلب', 'كل منتج ليه حكم (اطلب النهارده، الأسبوع ده، تمام، أو زيادة عن اللازم) والسبب مكتوب بكلام بسيط.'] },
  { p: 'B', v: 'demand', en: ['Demand forecast', 'The next 12 months for each product, with the likely range, learned from your own sales.'], ar: ['توقع الطلب', 'الـ 12 شهر الجايين لكل منتج، مع المدى المتوقع، متعلم من مبيعاتك إنت.'] },
  { p: 'B', v: 'seasons', en: ['Seasons', 'Winter, summer and Ramadan and Eid shapes built in (Ramadan moves with the calendar each year), and seasons learned from two years of your sales.'], ar: ['المواسم', 'أشكال الشتا والصيف ورمضان والعيد جاهزة (ورمضان بيتحرك مع التقويم كل سنة)، والمواسم بتتعلم من سنتين من مبيعاتك.'] },
  { p: 'B', v: 'incoming', en: ['Upcoming orders and real delivery times', 'What is on its way and when it lands, and how many days each supplier really takes.'], ar: ['الطلبيات الجاية ومدد التوريد الحقيقية', 'إيه اللي جاي في الطريق وهيوصل إمتى، وكل مورد بياخد كام يوم بجد.'] },
  { p: 'B', v: 'accuracy', en: ['Forecast accuracy', 'What the app expected each month next to what you really sold, so you know how far to trust it.'], ar: ['دقة التوقع', 'البرنامج كان متوقع إيه كل شهر جنب اللي اتباع فعلا، علشان تعرف تثق فيه قد إيه.'] },
  { p: 'B', v: 'health', en: ['Health check', 'Catches typing mistakes and odd numbers (a price below cost, a missing supplier, a month with an extra zero) before they turn into a wrong order.'], ar: ['فحص البيانات', 'بيمسك أخطاء الكتابة والأرقام الغريبة (سعر أقل من التكلفة، مورد ناقص، شهر عليه صفر زيادة) قبل ما تتحول لطلبية غلط.'] },
  { p: 'B', v: 'dash', en: ['Dashboard', 'Cash sitting in stock, cash locked in overstock, what to order now, and what the app has learned about your shop.'], ar: ['لوحة المتابعة', 'الفلوس اللي في البضاعة، والفلوس المحبوسة في بضاعة زيادة، تطلب إيه دلوقتي، والبرنامج اتعلم إيه عن محلك.'] },
  { p: 'B', v: 'products', en: ['Import and download', 'Bring your products in from Excel or CSV; download them, or a full backup, any time from Settings.'], ar: ['استيراد وتحميل', 'دخّل منتجاتك من Excel أو CSV، ونزّلها أو نزّل نسخة احتياطية كاملة في أي وقت من الإعدادات.'] },
  { p: 'B', v: 'settings', en: ['Arabic and English, guided walkthrough', 'The whole app in Egyptian Arabic or English, light or dark, with a practice shop and a guided walkthrough.'], ar: ['عربي وإنجليزي، ودليل إرشادي', 'البرنامج كله بالعربي المصري أو الإنجليزي، فاتح أو غامق، ومعاه محل للتجربة ودليل خطوة بخطوة.'] },
  // Pro and Store
  { p: 'P', v: 'seasons', en: ['Custom season shapes', 'Draw your own busy months, such as back to school or wedding season, and give them to any product.'], ar: ['أشكال موسم مخصصة', 'ارسم شهورك المزدحمة بنفسك، زي دخول المدارس أو موسم الأفراح، وحطها على أي منتج.'] },
  { p: 'P', v: 'products', en: ['Compare suppliers', 'The full yearly cost of buying a product from each supplier: price, delivery time, minimum order and the stock you must hold.'], ar: ['قارن الموردين', 'التكلفة الكاملة في السنة لو اشتريت المنتج من كل مورد: السعر، ومدة التوريد، وأقل طلبية، والبضاعة اللي لازم تشيلها.'] },
  { p: 'P', v: 'score', en: ['Supplier scorecard', 'Real delivery times, on-time rate, and the cash each supplier\'s lateness ties up in extra stock.'], ar: ['تقييم الموردين', 'مدد التوريد الحقيقية، ونسبة الالتزام بالميعاد، والفلوس اللي تأخير كل مورد بيحبسها في بضاعة زيادة.'] },
  { p: 'P', v: 'cash', en: ['Cash flow forecast', 'When the money for this week\'s orders will really leave, from each supplier\'s deposit and payment days.'], ar: ['توقع التدفق النقدي', 'فلوس طلبيات الأسبوع ده هتطلع إمتى بالظبط، حسب المقدم وأيام الدفع عند كل مورد.'] },
  { p: 'P', v: 'settings', en: ['Sunday summary email', 'Every Sunday morning: what to order this week, what is coming up, and what the app has learned.'], ar: ['ملخص يوم الأحد على الإيميل', 'كل يوم أحد الصبح: تطلب إيه الأسبوع ده، وإيه اللي جاي، والبرنامج اتعلم إيه.'] },
  // Store
  { p: 'S', v: 'plan', en: ['Budget plan', 'When cash is short, exactly what to buy with the cash you have, so each pound protects the most profit.'], ar: ['خطة الميزانية', 'لما الكاش يقل، تشتري إيه بالظبط بالفلوس اللي معاك، علشان كل جنيه يحمي أكبر ربح.'] },
  { p: 'S', v: 'cash', en: ['Cash needed, next 3 months', 'What your orders will cost each month for the next three months, by supplier.'], ar: ['فلوس البضاعة للـ 3 شهور الجاية', 'طلبياتك هتكلف كام كل شهر في الـ 3 شهور الجاية، متقسمة على الموردين.'] },
  { p: 'S', v: 'dash', en: ['Profit at risk', 'The profit you would likely lose to empty shelves if this week\'s orders are not placed.'], ar: ['الربح المعرض للخطر', 'الربح اللي غالبا هيضيع عليك من الرفوف الفاضية لو طلبيات الأسبوع ده متعملتش.'] },
  { p: 'S', v: 'trends', en: ['Demand graphs', 'Each product\'s sales, forecast range and reorder timeline on one chart.'], ar: ['رسوم الطلب', 'مبيعات كل منتج، والمدى المتوقع، ومواعيد إعادة الطلب في رسمة واحدة.'] },
  { p: 'S', v: 'dead', en: ['Dead stock report', 'Products that have stopped selling by their own history, and the cash stuck in them.'], ar: ['تقرير البضاعة الراكدة', 'المنتجات اللي وقفت عن البيع مقارنة بتاريخها هي، والفلوس اللي واقفة فيها.'] },
];

export const PLANS_TX = {
  en: {
    title: 'Every feature, by plan', lede: 'What each plan includes, and the page in this demo that shows it working on the sample shop.',
    feature: 'Feature', what: 'What it does', see: 'See it', yes: 'Included', no: 'Not included',
    limits: ['Products', 'Suppliers'], lim: { B: ['15', '10'], P: ['50', '100'], S: ['200', '100'] },
    price: 'Price a month', prices: { B: '1,295 EGP', P: '2,850 EGP', S: '5,440 EGP' },
    names: { B: 'Basic', P: 'Pro', S: 'Store' },
    foot: 'Every plan has a free trial: 14 days on Basic and Pro, 5 days on Store. A yearly plan saves 17%.',
    open: 'See every feature by plan', inPlans: 'In:', groups: ['On every plan, Basic included', 'Pro and Store', 'Store only'],
  },
  ar: {
    title: 'كل المميزات، حسب الباقة', lede: 'كل باقة فيها إيه، والصفحة في المعاينة دي اللي بتوريك الميزة شغالة على المحل التجريبي.',
    feature: 'الميزة', what: 'بتعمل إيه', see: 'شوفها', yes: 'موجودة', no: 'مش موجودة',
    limits: ['المنتجات', 'الموردين'], lim: { B: ['15', '10'], P: ['50', '100'], S: ['200', '100'] },
    price: 'السعر في الشهر', prices: { B: '1,295 جنيه', P: '2,850 جنيه', S: '5,440 جنيه' },
    names: { B: 'الأساسية', P: 'Pro', S: 'Store' },
    foot: 'كل باقة ليها تجربة مجانية: 14 يوم على الأساسية وPro، و5 أيام على Store. الباقة السنوية بتوفر 17%.',
    open: 'شوف كل المميزات حسب الباقة', inPlans: 'موجودة في:', groups: ['في كل الباقات، حتى الأساسية', 'في Pro وStore', 'في Store بس'],
  },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const TAG = { P: '<span class="plantag">Pro</span>', S: '<span class="plantag store">Store</span>' };
const IN = { B: ['B', 'P', 'S'], P: ['P', 'S'], S: ['S'] };

/** The demo-only page that lists every feature with the plans it is in. */
export function plansPage(lang) {
  const T = PLANS_TX[lang], P = ['B', 'P', 'S'];
  const tick = on => on ? '<span class="pl-yes" aria-label="' + esc(T.yes) + '">&#10003;</span>' : '<span class="pl-no" aria-label="' + esc(T.no) + '">&ndash;</span>';
  const head = '<tr><th>' + esc(T.feature) + '</th>' + P.map(k => '<th class="num">' + esc(T.names[k]) + '</th>').join('') + '<th></th></tr>';
  const top = '<tr class="pl-top"><td>' + esc(T.price) + '</td>' + P.map(k => '<td class="num"><b>' + esc(T.prices[k]) + '</b></td>').join('') + '<td></td></tr>' +
    T.limits.map((l, i) => '<tr class="pl-top"><td>' + esc(l) + '</td>' + P.map(k => '<td class="num">' + esc(T.lim[k][i]) + '</td>').join('') + '<td></td></tr>').join('');
  const group = { B: T.groups[0], P: T.groups[1], S: T.groups[2] };
  let last = '';
  const rows = FEATURES.map(f => {
    const g = f.p !== last ? '<tr class="pl-group"><td colspan="5">' + esc(group[f.p]) + '</td></tr>' : ''; last = f.p;
    const [name, what] = f[lang];
    return g + '<tr><td><b>' + esc(name) + '</b>' + (TAG[f.p] || '') + '<div class="small muted">' + esc(what) + '</div>' +
      '<div class="small pl-in">' + esc(T.inPlans) + ' ' + IN[f.p].map(k => esc(T.names[k])).join(' · ') + '</div></td>' +
      P.map(k => '<td class="num">' + tick(IN[f.p].includes(k)) + '</td>').join('') +
      '<td><button type="button" class="btn small" data-goto="' + f.v + '">' + esc(T.see) + '</button></td></tr>';
  }).join('');
  const sum = '<p class="small pl-sum">' + P.map(k => '<b>' + esc(T.names[k]) + '</b> ' + esc(T.prices[k]) + ', ' + esc(T.lim[k][0]) + ' ' + esc(T.limits[0])).join(' &middot; ') + '</p>';
  return '<div class="page-head"><div><h1>' + esc(T.title) + '</h1><p>' + esc(T.lede) + '</p></div></div>' + sum +
    '<div class="tbl-wrap plans-wrap" tabindex="0" role="region" aria-label="' + esc(T.title) + '"><table class="t plans-t"><thead>' + head + '</thead><tbody>' + top + rows + '</tbody></table></div>' +
    '<p class="small muted" style="margin-top:12px">' + esc(T.foot) + '</p>';
}
