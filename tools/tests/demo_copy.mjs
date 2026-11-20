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

// ---------- The explainer under the "Run this on your own shop" box, one per demo page ----------
// h: the benefit, p: what the page does and how it helps, d: what is different from the usual way,
// proof: a measured result from the Walmart tests (tools/tests/results/walmart_v35.json), plans: B, P or S.
// Rules: short, plain, true. "Most stock apps" means the usual approach (an alert at a minimum you set
// yourself), never a named company. Proof lines are test results, not promises.
export const WHY = {
  en: {
    eyebrow: 'What this page does for you', diff: 'What is different', tested: 'Tested', inPlans: 'Included in',
    plans: { B: 'every plan, Basic included', P: 'Pro and Store', S: 'Store' },
    pages: {
      dash: { plans: 'B', h: 'Know where your money is before you spend more of it',
        p: 'One screen shows what to order now, how much cash sits on your shelves, how much is frozen in stock you do not need, and what the app has learned about your shop. It replaces the notebook, the calculator and the guess.',
        d: 'Most stock apps show what you have. This shows what to do about it: order, wait, or stop buying. Profit at risk and the Store tools are in the Store plan.' },
      plan: { plans: 'B', h: 'This week\'s orders, ready to send',
        p: 'Every product that needs ordering, grouped by supplier and already rounded to full cartons and each supplier\'s minimum order. One tap sends the order on WhatsApp. When cash is short, the budget plan (Store) picks the units that protect the most profit.',
        d: 'Most stock apps warn you when stock drops below a number you set yourself, then leave "how much?" to you. Here the quantity is worked out from each product\'s own sales, season and supplier.',
        proof: 'On 20 real Walmart store-years, following these orders kept 99.7% of demand served from stock. With 20% less cash, the budget plan lost 96% less profit than buying the most urgent orders first.' },
      orders: { plans: 'B', h: 'A clear answer for every product: order, wait or stop',
        p: 'Each product gets one verdict (order today, order this week, stock is healthy, or overstocked) with the reason in plain words: days of stock left, when a delivery can land, and the buffer it keeps.',
        d: 'No colours to decode. Every verdict shows its reason, so you can check it and decide with confidence.',
        proof: '"Stock is healthy" calls were right 99.7% of the time on 20 real Walmart store-years.' },
      demand: { plans: 'B', h: 'See the next season coming, months ahead',
        p: 'The next 12 months for every product, with a likely low and high, learned from your own sales: its season, its recent trend and how steady it is.',
        d: 'Copying last year misses growth, and Ramadan moves about 11 days earlier every year. This forecast follows both.',
        proof: 'Whole-store sales one month ahead were 91.8% accurate across 20 real Walmart store-years, against 80.9% for repeating last year.' },
      trends: { plans: 'S', h: 'Every product\'s story on one chart',
        p: 'Past sales, the forecast and its range, and the dates you should reorder, drawn for each product. Spot a product speeding up or slowing down before it costs you.',
        d: 'Most reports stop at past sales. These graphs carry on into the coming months and show when to act.' },
      incoming: { plans: 'B', h: 'Know what is coming, and which supplier is really late',
        p: 'Everything you have ordered, in the order it should arrive, with the expected date. Each delivery you mark received teaches the app how long that supplier really takes.',
        d: 'Most apps keep the delivery time you typed once and never check it. Here real times replace promised ones, so your safety stock fits how each supplier really behaves.',
        proof: 'Learned delivery times were 96% accurate in the Walmart tests.' },
      score: { plans: 'P', h: 'Put a price on a late supplier',
        p: 'For each supplier: real delivery time, on-time rate, how much of your cash sits in their stock, and how much extra stock you carry only because their timing swings.',
        d: 'Suppliers are usually judged on price alone. This shows what unreliability costs you in cash, a number you can take into your next negotiation.' },
      dead: { plans: 'S', h: 'Find the cash stuck on your shelves',
        p: 'Products that have stopped selling by their own history, and how much money is frozen in them. Clear them with a discount and put the cash back into what sells.',
        d: 'Each product is compared with its own past and its season, so a slow but steady seller, or a winter product in summer, is not flagged just for being quiet.' },
      cash: { plans: 'P', h: 'No surprise bills from your suppliers',
        p: 'See when the money for this week\'s orders really leaves, deposit now and balance later, from each supplier\'s own terms. On Store, see what stock will cost you each month for the next three months.',
        d: 'Most stock apps tell you what to buy, not when you will pay for it. Here buying and cash planning are one decision.',
        proof: 'The 3-month cash estimate was 86% to 88% right on real Walmart years.' },
      accuracy: { plans: 'B', h: 'Trust the numbers because you can check them',
        p: 'Every month the app writes down what it expects each product to sell. When you type what really sold, this page puts the two side by side.',
        d: 'Forecasts are usually taken on faith. This one keeps score in front of you, product by product.' },
      health: { plans: 'B', h: 'Catch the typo before it becomes an order',
        p: 'It checks what you typed: a price below cost, a missing supplier, a month with an extra zero, too little history. Red rows can produce a wrong order, and each one tells you what to fix.',
        d: 'A spreadsheet will happily multiply a typo. This flags it first: in this sample shop it caught a silk scarf priced below its cost.' },
      products: { plans: 'B', h: 'Start from the numbers you already have',
        p: 'Type, paste or import each product\'s monthly sales once. After that, each month you add last month\'s sales and today\'s stock count. With Pro, compare suppliers on the full yearly cost, not just the price.',
        d: 'No barcode scanner, no till system, no setup project. Monthly sales from your notebook or Excel are enough to start.' },
      ordered: { plans: 'B', h: 'Never order the same stock twice',
        p: 'Note each order you place. Its quantities count as on order, so the app will not ask for them again, and when it arrives one click adds it to stock and records the real delivery time.',
        d: 'This is how the app learns each supplier\'s real timing, instead of trusting the date they promised.' },
      suppliers: { plans: 'B', h: 'Your suppliers\' rules, built into every order',
        p: 'Enter each supplier\'s usual delivery time, how much it swings, minimum order, carton size and payment terms once. Every suggested quantity follows them.',
        d: 'A low-stock alert does not round to cartons or minimum orders, so the maths is still yours. Here the order is already in units your supplier accepts.' },
      seasons: { plans: 'B', h: 'Ramadan, winter, back to school: ready before the rush',
        p: 'Each product follows a season: winter, summer, and Ramadan and Eid are built in, or one is learned from two years of your own sales. With Pro, draw your own, like back to school.',
        d: 'Ramadan moves about 11 days earlier every year. Forecasts that repeat last year month by month miss it; this shape moves with the calendar on its own.' },
      settings: { plans: 'B', h: 'Set it once. Rough is fine.',
        p: 'A few shop-wide numbers, such as what placing an order costs you and the cash you have this week. With Pro, a Sunday email tells you what to order before the week starts.',
        d: 'Your numbers stay yours: one click downloads your products as a spreadsheet, or your whole shop as a backup.' },
      plans: { plans: 'B', h: 'Pick the plan that fits your shop today',
        p: 'Basic has the full forecasting and ordering engine. Pro adds supplier comparison, the scorecard, custom seasons, cash flow and the Sunday email. Store adds the tools for when cash is the limit.',
        d: 'Every plan starts with a free trial, and the plan price is charged only when the trial ends.' },
    },
  },
  ar: {
    eyebrow: 'الصفحة دي بتعملك إيه', diff: 'الفرق إيه', tested: 'اتجربت', inPlans: 'موجودة في',
    plans: { B: 'كل الباقات، حتى الأساسية', P: 'Pro وStore', S: 'Store' },
    pages: {
      dash: { plans: 'B', h: 'اعرف فلوسك فين قبل ما تصرف أكتر',
        p: 'شاشة واحدة بتوريك تطلب إيه دلوقتي، وقد إيه فلوس واقفة على الرفوف، وقد إيه محبوس في بضاعة مش محتاجها، والبرنامج اتعلم إيه عن محلك. بدل الكشكول والآلة الحاسبة والتخمين.',
        d: 'أغلب برامج المخزون بتقولك عندك إيه. ده بيقولك تعمل إيه: تطلب، تستنى، ولا توقف شرا. الربح المعرض للخطر وأدوات Store موجودين في باقة Store.' },
      plan: { plans: 'B', h: 'طلبيات الأسبوع ده، جاهزة تتبعت',
        p: 'كل منتج محتاج يتطلب، متقسم على الموردين، ومتقرب لكراتين كاملة ولأقل طلبية عند كل مورد. ضغطة واحدة وتبعت الطلبية على واتساب. ولما الكاش يقل، خطة الميزانية (Store) بتختار القطع اللي بتحمي أكبر ربح.',
        d: 'أغلب برامج المخزون بتنبهك لما البضاعة تنزل تحت رقم إنت اللي حاطه، وبتسيب "أطلب كام؟" عليك. هنا الكمية محسوبة من مبيعات كل منتج وموسمه ومورده.',
        proof: 'على 20 سنة فرع حقيقية من وول مارت، الطلبات دي لبّت 99.7% من الطلب من المخزون. وبكاش أقل بـ 20%، خطة الميزانية ضيعت ربح أقل بـ 96% من شراء الأكثر استعجالا الأول.' },
      orders: { plans: 'B', h: 'إجابة واضحة لكل منتج: اطلب، استنى، ولا وقّف',
        p: 'كل منتج ليه حكم واحد (اطلب النهارده، اطلب الأسبوع ده، تمام، أو زيادة عن اللازم) والسبب بكلام بسيط: البضاعة هتكفي كام يوم، الطلبية ممكن توصل إمتى، والاحتياطي اللي بيسيبه.',
        d: 'مفيش ألوان تفك شفرتها. كل حكم معاه سببه، فتقدر تراجعه وتقرر وإنت مطمن.',
        proof: 'حكم "تمام" طلع صح 99.7% من المرات على 20 سنة فرع حقيقية من وول مارت.' },
      demand: { plans: 'B', h: 'شوف الموسم الجاي قبلها بشهور',
        p: 'الـ 12 شهر الجايين لكل منتج، مع أقل وأعلى متوقع، متعلمين من مبيعاتك إنت: موسمه، واتجاهه الأخير، وثباته قد إيه.',
        d: 'نقل أرقام السنة اللي فاتت بيفوّت النمو، ورمضان بييجي بدري 11 يوم تقريبا كل سنة. التوقع ده بيمشي مع الاتنين.',
        proof: 'مبيعات المحل كله للشهر الجاي طلعت دقيقة بنسبة 91.8% على 20 سنة فرع حقيقية من وول مارت، قصاد 80.9% لتكرار السنة اللي فاتت.' },
      trends: { plans: 'S', h: 'حكاية كل منتج في رسمة واحدة',
        p: 'المبيعات اللي فاتت، والتوقع ومداه، ومواعيد إعادة الطلب، مرسومين لكل منتج. اكتشف المنتج اللي بيسرّع أو بيهدى قبل ما يكلفك.',
        d: 'أغلب التقارير بتقف عند المبيعات اللي فاتت. الرسوم دي بتكمّل للشهور الجاية وبتقولك تتحرك إمتى.' },
      incoming: { plans: 'B', h: 'اعرف إيه اللي جاي، ومين المورد اللي بيتأخر بجد',
        p: 'كل اللي طلبته، بالترتيب اللي المفروض يوصل بيه، والميعاد المتوقع. وكل طلبية تعلّم عليها إنها وصلت بتعلّم البرنامج المورد ده بياخد قد إيه فعلا.',
        d: 'أغلب البرامج بتفضل على مدة التوريد اللي كتبتها مرة ومبتراجعهاش. هنا المدد الحقيقية بتحل محل اللي اتوعدت بيها، فالاحتياطي بيبقى على مقاس كل مورد.',
        proof: 'مدد التوريد اللي البرنامج اتعلمها طلعت دقيقة بنسبة 96% في تجارب وول مارت.' },
      score: { plans: 'P', h: 'حط سعر للمورد اللي بيتأخر',
        p: 'لكل مورد: مدة التوريد الحقيقية، ونسبة الالتزام بالميعاد، وقد إيه من فلوسك في بضاعته، وقد إيه بضاعة زيادة شايلها بس علشان مواعيده مش ثابتة.',
        d: 'الموردين عادة بيتقيموا بالسعر بس. ده بيوريك عدم الالتزام بيكلفك كام كاش، رقم تقدر تدخل بيه التفاوض الجاي.' },
      dead: { plans: 'S', h: 'لاقي الفلوس الواقفة على رفوفك',
        p: 'المنتجات اللي وقفت عن البيع مقارنة بتاريخها هي، وقد إيه فلوس محبوسة فيها. صفّيها بخصم ورجّع الكاش للحاجة اللي بتتباع.',
        d: 'كل منتج بيتقارن بماضيه هو وموسمه، فالمنتج البطيء بس الثابت، أو منتج الشتا في الصيف، مبيطلعش في القايمة لمجرد إنه هادي.' },
      cash: { plans: 'P', h: 'مفيش فواتير موردين بتفاجئك',
        p: 'شوف فلوس طلبيات الأسبوع ده هتطلع إمتى بالظبط، مقدم دلوقتي والباقي بعدين، حسب شروط كل مورد. وفي Store، شوف البضاعة هتكلفك كام كل شهر في الـ 3 شهور الجاية.',
        d: 'أغلب برامج المخزون بتقولك تشتري إيه، مش هتدفع إمتى. هنا الشرا وتخطيط الكاش قرار واحد.',
        proof: 'تقدير فلوس الـ 3 شهور طلع صح بنسبة 86% لـ 88% على سنين حقيقية من وول مارت.' },
      accuracy: { plans: 'B', h: 'ثق في الأرقام لأنك تقدر تراجعها',
        p: 'كل شهر البرنامج بيكتب هو متوقع كل منتج يتباع قد إيه. ولما تكتب اللي اتباع فعلا، الصفحة دي بتحط الاتنين جنب بعض.',
        d: 'التوقعات عادة بتتصدق وخلاص. ده بيعرض النتيجة قدامك، منتج منتج.' },
      health: { plans: 'B', h: 'امسك غلطة الكتابة قبل ما تبقى طلبية',
        p: 'بيراجع اللي كتبته: سعر أقل من التكلفة، مورد ناقص، شهر عليه صفر زيادة، تاريخ قليل. الصفوف الحمرا ممكن تطلّع طلبية غلط، وكل واحد فيهم بيقولك تصلح إيه.',
        d: 'الإكسيل هيضرب الغلطة ويكمل عادي. ده بينبهك الأول: في المحل التجريبي ده مسك سكارف حرير متسعّر أقل من تكلفته.' },
      products: { plans: 'B', h: 'ابدأ من الأرقام اللي معاك أصلا',
        p: 'اكتب أو الصق أو استورد مبيعات كل منتج الشهرية مرة واحدة. وبعدها كل شهر تضيف مبيعات الشهر اللي فات وعدد البضاعة اللي عندك النهارده. ومع Pro، قارن الموردين بالتكلفة الكاملة في السنة، مش بالسعر بس.',
        d: 'من غير باركود، ولا سيستم كاشير، ولا مشروع تجهيز. مبيعاتك الشهرية من الكشكول أو الإكسيل كفاية تبدأ.' },
      ordered: { plans: 'B', h: 'عمرك ما هتطلب نفس البضاعة مرتين',
        p: 'سجّل كل طلبية بتعملها. كمياتها بتتحسب "مطلوبة"، فالبرنامج مش هيطلبها تاني، ولما توصل ضغطة واحدة بتضيفها للمخزون وبتسجل مدة التوريد الحقيقية.',
        d: 'كده البرنامج بيتعلم مواعيد كل مورد الحقيقية، بدل ما يصدق الميعاد اللي وعد بيه.' },
      suppliers: { plans: 'B', h: 'شروط مورديك جوه كل طلبية',
        p: 'اكتب لكل مورد مرة واحدة: مدة التوريد المعتادة، وبتتغير قد إيه، وأقل طلبية، وحجم الكرتونة، وشروط الدفع. وكل كمية مقترحة بتمشي عليهم.',
        d: 'تنبيه "البضاعة قربت تخلص" مبيقربش للكرتونة ولا لأقل طلبية، فالحسبة لسه عليك. هنا الطلبية جاهزة بوحدات المورد بيقبلها.' },
      seasons: { plans: 'B', h: 'رمضان، الشتا، دخول المدارس: جاهز قبل الزحمة',
        p: 'كل منتج ماشي على موسم: الشتا والصيف ورمضان والعيد جاهزين، أو موسم متعلم من سنتين من مبيعاتك. ومع Pro، ارسم موسمك بنفسك، زي دخول المدارس.',
        d: 'رمضان بييجي بدري 11 يوم تقريبا كل سنة. التوقعات اللي بتكرر السنة اللي فاتت شهر بشهر بتفوّته؛ الشكل ده بيتحرك مع التقويم لوحده.' },
      settings: { plans: 'B', h: 'اظبطها مرة. والتقريب كفاية.',
        p: 'شوية أرقام للمحل كله، زي الطلبية بتكلفك كام، والكاش اللي معاك الأسبوع ده. ومع Pro، إيميل كل يوم أحد بيقولك تطلب إيه قبل الأسبوع ما يبدأ.',
        d: 'أرقامك بتاعتك: ضغطة واحدة بتنزّل منتجاتك كملف إكسيل، أو محلك كله كنسخة احتياطية.' },
      plans: { plans: 'B', h: 'اختار الباقة اللي على مقاس محلك النهارده',
        p: 'الأساسية فيها محرك التوقع والطلب كامل. Pro بتزود مقارنة الموردين، وتقييمهم، والمواسم المخصصة، والتدفق النقدي، وإيميل الأحد. وStore بتزود أدوات وقت ما الكاش يبقى هو الحد.',
        d: 'كل باقة بتبدأ بتجربة مجانية، وسعر الباقة مبيتخصمش غير لما التجربة تخلص.' },
    },
  },
};

/** The explainer blocks for every page, in both languages (shown one at a time by the demo's script). */
export function whyBlocks() {
  const out = [];
  for (const lang of ['en', 'ar']) {
    const W = WHY[lang];
    for (const [v, x] of Object.entries(W.pages)) {
      out.push('<section class="why-card" data-lang="' + lang + '" data-v="' + v + '" hidden><div class="why-main"><p class="why-eyebrow">' + esc(W.eyebrow) + '</p><h2>' + esc(x.h) + '</h2><p>' + esc(x.p) + '</p></div>' +
        '<div class="why-side"><p class="why-diff"><b>' + esc(W.diff) + '</b>' + esc(x.d) + '</p>' +
        (x.proof ? '<p class="why-proof"><b>' + esc(W.tested) + '</b>' + esc(x.proof) + '</p>' : '') +
        '<p class="why-plans">' + esc(W.inPlans) + ': ' + esc(W.plans[x.plans]) + '</p></div></section>');
    }
  }
  return out.join('\n');
}
