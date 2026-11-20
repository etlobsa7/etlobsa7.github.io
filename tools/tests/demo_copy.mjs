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
// Written so a 16-year-old with no business background can follow it: short bullets, plain words,
// **bold** for the key words and *italics* for the words to notice (whyBlocks turns them into tags).
// does: what the page does for the shop. diff: what is different from the usual way. proof: a measured
// result from the Walmart tests (tools/tests/results/walmart_v35.json). plans: B, P or S.
// Rules: every claim true. "Most stock apps" means the usual approach (an alert at a number you set
// yourself), never a named company. Proof lines are test results, not promises.
export const WHY = {
  en: {
    eyebrow: 'What this page does for you', diff: 'What is different', tested: 'Tested on real sales', inPlans: 'Included in',
    plans: { B: 'every plan, Basic included', P: 'Pro and Store', S: 'Store' },
    pages: {
      dash: { plans: 'B', h: 'See where your money is, at a glance',
        does: ['Shows **what to order now**.', 'Shows how much **cash is sitting on your shelves**, and how much of it is stock you *don\'t need*.', 'Shows what the app has **learned about your shop** so far.'],
        diff: ['Most stock apps only tell you *what you have*. This tells you *what to do*: **order**, **wait**, or **stop buying**.', '*Profit at risk* and the Store tools come with the **Store** plan.'] },
      plan: { plans: 'B', h: 'This week\'s orders, ready to send',
        does: ['Lists **every product you need to order**, grouped by supplier.', 'Amounts already fit **full cartons** and each supplier\'s **smallest order**.', '**One tap** sends the order on WhatsApp.'],
        diff: ['Most stock apps warn you when stock is low, then leave *"how much?"* to you. Here the **amount is worked out for you**.', 'Short on cash? The **budget plan** (*Store*) picks what to buy first.'],
        proof: ['On real Walmart sales, **99.7%** of what customers wanted was **on the shelf**.', 'With **20% less cash**, the budget plan lost **96% less profit** than buying the most urgent items first.'] },
      orders: { plans: 'B', h: 'One clear answer for every product',
        does: ['Each product gets one verdict: **order today**, **order this week**, **all good**, or **too much stock**.', 'Next to it is the **reason**: how many days your stock will last and *when a delivery can arrive*.'],
        diff: ['No guessing what a colour means. You can **check the reason** and decide with confidence.'],
        proof: ['*"All good"* was **right 99.7%** of the time on real Walmart sales.'] },
      demand: { plans: 'B', h: 'See your next busy season coming',
        does: ['Shows how much each product will likely sell in **each of the next 12 months**.', 'Gives a **low and a high**, so you see the likely range, not just one number.', 'Learns from **your own sales**: your seasons, and whether a product is *growing*.'],
        diff: ['Copying last year misses growth, and **Ramadan comes about 11 days earlier every year**. This forecast follows both.'],
        proof: ['For the whole store, next month was **91.8% right**. Copying last year scored *80.9%*.'] },
      trends: { plans: 'S', h: 'Every product\'s story on one chart',
        does: ['Draws each product\'s **past sales**, its **forecast**, and **when to reorder**.', 'Shows at a glance if a product is **speeding up** or **slowing down**.'],
        diff: ['Most reports only look **back**. These charts also look **ahead**.'] },
      incoming: { plans: 'B', h: 'Know what is coming, and who is late',
        does: ['Lists everything **on its way**, with the **expected arrival date**.', 'Each time you mark an order *received*, the app learns how long that supplier **really** takes.'],
        diff: ['Most apps trust the delivery time a supplier *promised*. This uses the time they **actually take**.'],
        proof: ['Learned delivery times were **96% accurate**.'] },
      score: { plans: 'P', h: 'See what a late supplier really costs you',
        does: ['Shows each supplier\'s **real delivery time** and how often they are **on time**.', 'Shows how much of **your cash** sits in their stock.', 'Shows, in money, the **extra stock you keep** only because they are *unreliable*.'],
        diff: ['Suppliers are usually judged on **price only**. Here you see the **full cost**, a number you can use when you **negotiate**.'] },
      dead: { plans: 'S', h: 'Find the money stuck on your shelves',
        does: ['Lists products that have **stopped selling**, and how much **cash is stuck** in them.', 'Helps you decide what to **put on discount** or **stop buying**.'],
        diff: ['Each product is compared with **its own past**, so a *slow but steady* product, or a winter coat in summer, is **not wrongly flagged**.'] },
      cash: { plans: 'P', h: 'No surprise bills from your suppliers',
        does: ['Shows **when** the money for this week\'s orders must be paid: the **deposit now**, **the rest later**.', 'On *Store*: what your stock will cost **each month for the next 3 months**.'],
        diff: ['Most stock apps say **what** to buy, not **when you pay** for it. Here buying and cash planning go **together**.'],
        proof: ['The 3-month estimate was **86% to 88% right**.'] },
      accuracy: { plans: 'B', h: 'Check the app\'s guesses yourself',
        does: ['Every month the app **writes down its guess** for each product.', 'When you type what really sold, this page shows **guess and real side by side**.'],
        diff: ['Most forecasts ask you to *just trust them*. This one **keeps score** in front of you.'] },
      health: { plans: 'B', h: 'Catch typing mistakes before they cost you',
        does: ['Checks what you typed for problems like a **price below cost**, a **missing supplier**, or a month with an **extra zero**.', '**Red** means *fix it now* (it could cause a wrong order). **Amber** means *have a look*.'],
        diff: ['A spreadsheet happily **multiplies a typo**. This **flags it first**: in this sample shop it caught a silk scarf **priced below its cost**.'] },
      products: { plans: 'B', h: 'Start with the numbers you already have',
        does: ['Type, paste or import each product\'s **monthly sales** once.', 'Then each month, add **last month\'s sales** and **today\'s stock count**.', 'With *Pro*: **compare suppliers** by their **full yearly cost**, not just the price.'],
        diff: ['**No barcode scanner**, no till system, no setup project. A notebook or Excel sheet is **enough to start**.'] },
      ordered: { plans: 'B', h: 'Never order the same stock twice',
        does: ['Write down each order **when you send it**. The app counts it as *on the way*, so it **won\'t suggest it again**.', 'When it arrives, **one click** adds it to your stock.'],
        diff: ['This is how the app learns each supplier\'s **real** delivery time, not the *promised* one.'] },
      suppliers: { plans: 'B', h: 'Your suppliers\' rules, built into every order',
        does: ['Enter each supplier\'s **delivery time**, **smallest order**, **carton size** and **payment terms** once.', 'Every suggested amount **follows these rules** by itself.'],
        diff: ['A *"low stock"* alert doesn\'t round to cartons or minimums, so **the maths is still on you**. Here the order is **ready to send**.'] },
      seasons: { plans: 'B', h: 'Ready before the rush: Ramadan, winter, back to school',
        does: ['Each product follows a **season**: winter, summer, and Ramadan and Eid are **built in**.', 'With **two years of sales**, the app **learns your own season**.', 'With *Pro*, **draw your own**, like back to school.'],
        diff: ['**Ramadan moves about 11 days earlier every year.** Copying last year misses it; this shape **moves by itself**.'] },
      settings: { plans: 'B', h: 'Set it once. Rough numbers are fine.',
        does: ['A few numbers for the **whole shop**, like what one order costs you and the **cash you have this week**.', 'With *Pro*: a **Sunday email** tells you what to order before the week starts.'],
        diff: ['**Your data stays yours**: download your products as a spreadsheet, or your whole shop as a backup, in **one click**.'] },
      plans: { plans: 'B', h: 'Pick the plan that fits your shop today',
        does: ['**Basic**: the full engine that tells you **what, how much and when** to order.', '**Pro**: adds **supplier tools**, **your own seasons**, **cash flow** and the **Sunday email**.', '**Store**: adds tools for when **cash is tight**.'],
        diff: ['Every plan starts with a **free trial**. The plan price is charged **only when the trial ends**.'] },
    },
  },
  ar: {
    eyebrow: 'الصفحة دي بتعملك إيه', diff: 'الفرق إيه', tested: 'اتجربت على مبيعات حقيقية', inPlans: 'موجودة في',
    plans: { B: 'كل الباقات، حتى الأساسية', P: 'Pro وStore', S: 'Store' },
    pages: {
      dash: { plans: 'B', h: 'شوف فلوسك فين، بنظرة واحدة',
        does: ['بتوريك **تطلب إيه دلوقتي**.', 'بتوريك قد إيه **فلوس واقفة على الرفوف**، وقد إيه منهم في بضاعة *مش محتاجها*.', 'بتوريك البرنامج **اتعلم إيه عن محلك** لحد دلوقتي.'],
        diff: ['أغلب برامج المخزون بتقولك *عندك إيه* بس. ده بيقولك *تعمل إيه*: **تطلب**، **تستنى**، ولا **توقف شرا**.', '*الربح المعرض للخطر* وأدوات Store موجودين في باقة **Store**.'] },
      plan: { plans: 'B', h: 'طلبيات الأسبوع ده، جاهزة تتبعت',
        does: ['بتعرض **كل منتج محتاج يتطلب**، متقسم على الموردين.', 'الكميات متقربة لـ **كراتين كاملة** ولـ **أقل طلبية** عند كل مورد.', '**ضغطة واحدة** وتبعت الطلبية على واتساب.'],
        diff: ['أغلب برامج المخزون بتنبهك لما البضاعة تقل، وبتسيب *"أطلب كام؟"* عليك. هنا **الكمية محسوبة لك**.', 'الكاش قليل؟ **خطة الميزانية** (*Store*) بتختار تشتري إيه الأول.'],
        proof: ['على مبيعات حقيقية من وول مارت، **99.7%** من اللي الزباين طلبوه كان **موجود على الرف**.', 'وبكاش **أقل بـ 20%**، خطة الميزانية ضيعت ربح **أقل بـ 96%** من شراء الأكثر استعجالا الأول.'] },
      orders: { plans: 'B', h: 'إجابة واضحة لكل منتج',
        does: ['كل منتج ليه حكم واحد: **اطلب النهارده**، **اطلب الأسبوع ده**، **تمام**، أو **بضاعة زيادة**.', 'وجنبه **السبب**: البضاعة هتكفي كام يوم، و*الطلبية ممكن توصل إمتى*.'],
        diff: ['مفيش ألوان تفك شفرتها. تقدر **تراجع السبب** وتقرر وإنت مطمن.'],
        proof: ['حكم *"تمام"* طلع **صح 99.7%** من المرات على مبيعات وول مارت الحقيقية.'] },
      demand: { plans: 'B', h: 'شوف موسمك الجاي قبلها بشهور',
        does: ['بتوريك كل منتج غالبا هيتباع قد إيه في **كل شهر من الـ 12 شهر الجايين**.', 'بتديك **أقل وأعلى رقم**، فتشوف المدى المتوقع، مش رقم واحد بس.', 'بتتعلم من **مبيعاتك إنت**: مواسمك، وهل المنتج *بيزيد*.'],
        diff: ['نقل أرقام السنة اللي فاتت بيفوّت الزيادة، و**رمضان بييجي بدري حوالي 11 يوم كل سنة**. التوقع ده بيمشي مع الاتنين.'],
        proof: ['على مستوى المحل كله، الشهر الجاي طلع **صح 91.8%**. وتكرار السنة اللي فاتت جاب *80.9%*.'] },
      trends: { plans: 'S', h: 'حكاية كل منتج في رسمة واحدة',
        does: ['بترسم لكل منتج **مبيعاته اللي فاتت**، و**توقعه**، و**إمتى تطلب تاني**.', 'بتوريك بنظرة لو المنتج **بيسرّع** أو **بيهدى**.'],
        diff: ['أغلب التقارير بتبص **لورا** بس. الرسوم دي بتبص **لقدام** كمان.'] },
      incoming: { plans: 'B', h: 'اعرف إيه اللي جاي، ومين اللي بيتأخر',
        does: ['بتعرض كل حاجة **في الطريق**، و**ميعاد الوصول المتوقع**.', 'وكل ما تعلّم على طلبية إنها *وصلت*، البرنامج بيتعلم المورد ده بياخد قد إيه **بجد**.'],
        diff: ['أغلب البرامج بتصدق مدة التوريد اللي المورد *وعد بيها*. ده بيستخدم المدة اللي **بياخدها فعلا**.'],
        proof: ['مدد التوريد اللي البرنامج اتعلمها طلعت **دقيقة 96%**.'] },
      score: { plans: 'P', h: 'شوف المورد اللي بيتأخر بيكلفك كام',
        does: ['بتوريك **مدة التوريد الحقيقية** لكل مورد، وبيلتزم **بالميعاد** قد إيه.', 'بتوريك قد إيه من **فلوسك** في بضاعته.', 'وبتوريك بالفلوس **البضاعة الزيادة اللي شايلها** بس علشان هو *مش ملتزم*.'],
        diff: ['الموردين عادة بيتقيموا **بالسعر بس**. هنا بتشوف **التكلفة كاملة**، رقم تقدر تستخدمه وإنت **بتتفاوض**.'] },
      dead: { plans: 'S', h: 'لاقي الفلوس الواقفة على رفوفك',
        does: ['بتعرض المنتجات اللي **وقفت عن البيع**، وقد إيه **فلوس واقفة** فيها.', 'بتساعدك تقرر تعمل **خصم** على إيه أو **توقف شرا** إيه.'],
        diff: ['كل منتج بيتقارن **بماضيه هو**، فالمنتج *البطيء بس الثابت*، أو جاكيت الشتا في الصيف، **مبيطلعش غلط** في القايمة.'] },
      cash: { plans: 'P', h: 'مفيش فواتير موردين بتفاجئك',
        does: ['بتوريك **إمتى** لازم تدفع فلوس طلبيات الأسبوع ده: **المقدم دلوقتي** و**الباقي بعدين**.', 'وفي *Store*: البضاعة هتكلفك كام **كل شهر في الـ 3 شهور الجاية**.'],
        diff: ['أغلب برامج المخزون بتقولك تشتري **إيه**، مش **هتدفع إمتى**. هنا الشرا وتخطيط الكاش **مع بعض**.'],
        proof: ['تقدير الـ 3 شهور طلع **صح 86% لـ 88%**.'] },
      accuracy: { plans: 'B', h: 'راجع توقعات البرنامج بنفسك',
        does: ['كل شهر البرنامج **بيكتب توقعه** لكل منتج.', 'ولما تكتب اللي اتباع فعلا، الصفحة دي بتحط **التوقع والحقيقي جنب بعض**.'],
        diff: ['أغلب التوقعات عايزاك *تصدقها وخلاص*. ده **بيعرض النتيجة** قدامك.'] },
      health: { plans: 'B', h: 'امسك غلطات الكتابة قبل ما تكلفك',
        does: ['بيراجع اللي كتبته ويدور على مشاكل زي **سعر أقل من التكلفة**، أو **مورد ناقص**، أو شهر عليه **صفر زيادة**.', '**الأحمر** معناه *صلّحها دلوقتي* (ممكن تطلّع طلبية غلط). **الأصفر** معناه *بص عليها*.'],
        diff: ['الإكسيل بيكمل عادي **ويضرب الغلطة**. ده **بينبهك الأول**: في المحل التجريبي مسك سكارف حرير **متسعّر أقل من تكلفته**.'] },
      products: { plans: 'B', h: 'ابدأ بالأرقام اللي معاك أصلا',
        does: ['اكتب أو الصق أو استورد **المبيعات الشهرية** لكل منتج مرة واحدة.', 'وبعدها كل شهر، ضيف **مبيعات الشهر اللي فات** و**عدد البضاعة النهارده**.', 'ومع *Pro*: **قارن الموردين** بـ **التكلفة الكاملة في السنة**، مش بالسعر بس.'],
        diff: ['**من غير باركود**، ولا سيستم كاشير، ولا مشروع تجهيز. الكشكول أو ملف الإكسيل **كفاية تبدأ**.'] },
      ordered: { plans: 'B', h: 'عمرك ما هتطلب نفس البضاعة مرتين',
        does: ['سجّل كل طلبية **أول ما تبعتها**. البرنامج بيحسبها *في الطريق*، فـ **مش هيقترحها تاني**.', 'ولما توصل، **ضغطة واحدة** بتضيفها لمخزونك.'],
        diff: ['كده البرنامج بيتعلم مدة توريد كل مورد **الحقيقية**، مش اللي *وعد بيها*.'] },
      suppliers: { plans: 'B', h: 'شروط مورديك جوه كل طلبية',
        does: ['اكتب لكل مورد مرة واحدة: **مدة التوريد**، و**أقل طلبية**، و**حجم الكرتونة**، و**شروط الدفع**.', 'وكل كمية مقترحة **بتمشي على الشروط دي** لوحدها.'],
        diff: ['تنبيه *"البضاعة قربت تخلص"* مبيقربش للكرتونة ولا لأقل طلبية، فـ **الحسبة لسه عليك**. هنا الطلبية **جاهزة تتبعت**.'] },
      seasons: { plans: 'B', h: 'جاهز قبل الزحمة: رمضان، الشتا، دخول المدارس',
        does: ['كل منتج ماشي على **موسم**: الشتا والصيف ورمضان والعيد **جاهزين**.', 'ولو عندك **سنتين مبيعات**، البرنامج **بيتعلم موسمك إنت**.', 'ومع *Pro*، **ارسم موسمك بنفسك**، زي دخول المدارس.'],
        diff: ['**رمضان بييجي بدري حوالي 11 يوم كل سنة.** نقل السنة اللي فاتت بيفوّته؛ الشكل ده **بيتحرك لوحده**.'] },
      settings: { plans: 'B', h: 'اظبطها مرة. والتقريب كفاية.',
        does: ['شوية أرقام للمحل **كله**، زي الطلبية الواحدة بتكلفك كام و**الكاش اللي معاك الأسبوع ده**.', 'ومع *Pro*: **إيميل كل يوم أحد** بيقولك تطلب إيه قبل الأسبوع ما يبدأ.'],
        diff: ['**بياناتك بتاعتك**: نزّل منتجاتك كملف إكسيل، أو محلك كله كنسخة احتياطية، **بضغطة واحدة**.'] },
      plans: { plans: 'B', h: 'اختار الباقة اللي على مقاس محلك النهارده',
        does: ['**الأساسية**: المحرك كامل اللي بيقولك تطلب **إيه، وقد إيه، وإمتى**.', '**Pro**: بتزود **أدوات الموردين**، و**مواسمك الخاصة**، و**التدفق النقدي**، و**إيميل الأحد**.', '**Store**: بتزود أدوات لوقت ما **الكاش يبقى قليل**.'],
        diff: ['كل باقة بتبدأ **بتجربة مجانية**، وسعر الباقة **مبيتخصمش غير لما التجربة تخلص**.'] },
    },
  },
};

// **bold** and *italics* in the copy become <strong> and <em>, after escaping
const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
const ul = (items, cls) => '<ul class="' + cls + '">' + items.map(x => '<li>' + fmt(x) + '</li>').join('') + '</ul>';

/** The explainer blocks for every page, in both languages (shown one at a time by the demo's script). */
export function whyBlocks() {
  const out = [];
  for (const lang of ['en', 'ar']) {
    const W = WHY[lang];
    for (const [v, x] of Object.entries(W.pages)) {
      out.push('<section class="why-card" data-lang="' + lang + '" data-v="' + v + '" hidden><div class="why-main"><p class="why-eyebrow">' + esc(W.eyebrow) + '</p><h2>' + esc(x.h) + '</h2>' + ul(x.does, 'why-does') + '</div>' +
        '<div class="why-side"><div class="why-diff"><p class="why-k">' + esc(W.diff) + '</p>' + ul(x.diff, 'why-list') + '</div>' +
        (x.proof ? '<div class="why-proof"><p class="why-k">' + esc(W.tested) + '</p>' + ul(x.proof, 'why-list') + '</div>' : '') +
        '<p class="why-plans">' + esc(W.inPlans) + ': <strong>' + esc(W.plans[x.plans]) + '</strong></p></div></section>');
    }
  }
  return out.join('\n');
}
