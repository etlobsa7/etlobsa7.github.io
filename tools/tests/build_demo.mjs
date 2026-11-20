// Rebuilds the demo's pages from the real app: opens the app with the demo shop (demo_shop.mjs) on the Store plan
// and copies each page, in English and Arabic, into demo/index.html. The demo shell (bars, texts, styles) is left alone,
// except the counts on the menu, which follow the shop.
// The copy is made view-only: controls are taken out of the tab order and their actions removed, tables that
// scroll get a label, and the plan labels already on the demo's headings are carried over.
// Demo-only additions: Ordered stock as its own page, a supplier comparison under Products, a preview of the
// Sunday email under Settings, and a page listing every feature by plan (demo_copy.mjs).
// Usage: ENGINE=/path/engine.js node build_demo.mjs <repo dir> [--check]   (--check reports text differences only)
//        DEMO_DATE=2026-11-20 fixes the date the shop is built for (default: today).
import fs from 'fs';
import { serve, launch, openApp, goTab } from './rig.mjs';
import { demoWorkspace } from './demo_shop.mjs';
import { plansPage, whyBlocks } from './demo_copy.mjs';
const { Engine } = await import(process.env.ENGINE);
const root = process.argv[2], check = process.argv.includes('--check'), file = root + '/demo/index.html';
const NOW = process.env.DEMO_DATE ? new Date(process.env.DEMO_DATE + 'T09:00:00Z') : new Date();
let html = fs.readFileSync(file, 'utf8');

// page order in the demo; 'plans' is the demo's own page
const ORDER = ['dash', 'plan', 'orders', 'demand', 'trends', 'incoming', 'score', 'dead', 'cash', 'accuracy', 'health', 'products', 'ordered', 'suppliers', 'seasons', 'settings', 'plans'];
const secRe = (lang, v) => new RegExp('<section class="view demo-view" data-lang="' + lang + '" data-v="' + v + '" data-title="[^"]*" hidden>.*?</section>');
function ensure(lang, v, title) {         // adds an empty page after the one before it, if the demo lacks it
  if (secRe(lang, v).test(html)) return;
  const at = ORDER.indexOf(v); let prev = null;
  for (let i = at - 1; i >= 0 && !prev; i--) { const m = html.match(secRe(lang, ORDER[i])); if (m) prev = m[0]; }
  const sec = '<section class="view demo-view" data-lang="' + lang + '" data-v="' + v + '" data-title="' + title + '" hidden></section>';
  html = prev ? html.replace(prev, () => prev + '\n' + sec) : html.replace('<div class="demo-end">', () => sec + '\n    <div class="demo-end">');
}

// The Sunday email, worded exactly as the server writes it (supabase function "app", digestMail)
function sundayMail(res, ws, ar) {
  const n0 = v => Math.round(v || 0).toLocaleString(ar ? 'ar-EG' : 'en-US'), money = v => n0(v) + (ar ? ' جنيه' : ' EGP');
  const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rows = res.rows || [], d = res.dash || {}, L = d.learn || {};
  const now = rows.filter(r => r.decision === 'CRITICAL' || r.decision === 'ORDER').sort((x, y) => (x.decision === 'CRITICAL' ? 0 : 1) - (y.decision === 'CRITICAL' ? 0 : 1));
  const soon = rows.filter(r => r.decision === 'OK' && r.daysToReorder > 0 && r.daysToReorder <= 14);
  const p = (h, muted) => '<p' + (muted ? ' class="small muted"' : '') + '>' + h + '</p>';
  let h = p('<b>' + (ar ? 'محلك الأسبوع ده' : 'Your shop this week') + '</b>');
  if (now.length) {
    h += p((ar ? 'اطلب دلوقتي (' : 'Order now (') + now.length + '):') + '<ul>' +
      now.slice(0, 8).map(r => '<li>' + e(r.name || '-') + ': ' + n0(r.qty) + (ar ? ' قطعة' : ' units') + (r.supplierName ? (ar ? ' من ' : ' from ') + e(r.supplierName) : '') + (r.decision === 'CRITICAL' ? (ar ? ' (عاجل)' : ' (urgent)') : '') + '</li>').join('') +
      (now.length > 8 ? '<li>' + (ar ? 'و' + (now.length - 8) + ' كمان في البرنامج' : 'and ' + (now.length - 8) + ' more in the app') + '</li>' : '') + '</ul>' +
      p((ar ? 'إجمالي الطلبات دي: ' : 'These orders come to ') + '<b>' + money(now.reduce((s, r) => s + (r.orderValue || 0), 0)) + '</b>');
  } else h += p(ar ? 'مفيش حاجة محتاجة تتطلب الأسبوع ده.' : 'Nothing needs ordering this week.');
  if (soon.length) h += p((ar ? 'هتحتاج تطلب خلال أسبوعين: ' : 'Coming up in the next 2 weeks: ') + soon.slice(0, 6).map(r => e(r.name || '-')).join(ar ? '، ' : ', ') + (soon.length > 6 ? (ar ? ' وغيرهم' : ' and more') : ''));
  if (d.overstockValue > 0) h += p((ar ? 'فلوس محبوسة في مخزون زيادة عن اللازم: ' : 'Cash tied up in more stock than you need: ') + '<b>' + money(d.overstockValue) + '</b>');
  if (d.deadCount > 0) h += p((ar ? 'بضاعة راكدة: ' : 'Dead stock: ') + d.deadCount + (ar ? ' منتج، ' : ' products, ') + '<b>' + money(d.deadValue) + '</b>');
  const cp = res.cashPlan;
  if (cp && cp.spend) h += p((ar ? 'فلوس الشراء المتوقعة: الشهر الجاي ' : 'Cash for stock: next month ') + '<b>' + money(Math.round(cp.spend[0] / 100) * 100) + '</b>' + (ar ? '، والـ 3 شهور الجاية ' : ', the next 3 months ') + '<b>' + money(Math.round((cp.spend[0] + cp.spend[1] + cp.spend[2]) / 100) * 100) + '</b>');
  const bp = res.budgetPlan;
  if (bp) h += p(ar ? 'طلبات الأسبوع ده ' + money(bp.total) + ' أعلى من الكاش المتاح ' + money(bp.budget) + '. خطة الميزانية في صفحة خطة الشراء بتقولك تشتري إيه.' : "This week's orders come to " + money(bp.total) + ', above your ' + money(bp.budget) + ' of cash. The budget plan on the Purchase plan page shows what to buy.');
  const sup = (ws.suppliers || []).length, learned = (L.leads || []).length;
  h += p((ar ? 'اللي اتعلمه عن محلك: ' : 'What it has learned about your shop: ') +
    (ar ? n0(L.months) + ' شهر من مبيعاتك (المواسم من 24 شهر)' : n0(L.months) + ' months of your sales (seasons from 24)') +
    (sup ? (ar ? '، مدة توريد ' + learned + ' من ' + sup + ' موردين' : ', delivery times for ' + learned + ' of ' + sup + ' suppliers') : '') +
    (d.accuracyN ? (ar ? '، ودقة التوقع لحد دلوقتي ' + Math.round(d.accuracy * 100) + '%' : ', forecast accuracy so far ' + Math.round(d.accuracy * 100) + '%') : '') + '.', true);
  h += '<p><span class="btn primary small" aria-hidden="true">' + (ar ? 'افتح البرنامج' : 'Open the app') + '</span></p>';
  h += p((ar ? 'بيوصلك كل يوم أحد من بياناتك المحفوظة. ' : 'This comes every Sunday from your saved data. ') + '<u>' + (ar ? 'وقف الإيميلات دي' : 'Stop these emails') + '</u>', true);
  const T = ar
    ? { h: 'ملخص يوم الأحد', p: 'ده الإيميل اللي بيوصلك كل يوم أحد الصبح، معمول من بيانات المحل التجريبي.', from: 'من', subj: 'الموضوع', s: 'محلك الأسبوع ده: Etlob Sa7' }
    : { h: 'Sunday summary email', p: 'This is the email that arrives every Sunday morning, made from the sample shop\'s data.', from: 'From', subj: 'Subject', s: 'Etlob Sa7: your shop this week' };
  return '<div class="section demo-mail"><h2>' + T.h + '<span class="plantag">Pro</span></h2><p class="small muted">' + T.p + '</p>' +
    '<div class="mail"' + (ar ? ' dir="rtl"' : '') + '><div class="mail-head"><span><b>' + T.from + ':</b> Etlob Sa7</span><span><b>' + T.subj + ':</b> ' + T.s + '</span></div><div class="mail-body">' + h + '</div></div></div>';
}

const s = serve(root), b = await launch(); let changed = 0, n = 0;
const ws = demoWorkspace(Engine, NOW);
for (const lang of ['en', 'ar']) {
  const { page, ctx, errors } = await openApp(b, s.url, Engine, { plan: 'store', lang, width: 1280, still: true, ws: JSON.parse(JSON.stringify(ws)) });
  // titles for pages the demo may not have yet, and the menu counts
  const meta = await page.evaluate(() => ({ titles: { ordered: t('nav.ordered') }, badges: [...document.querySelectorAll('#nav [data-tab]')].map(x => [x.dataset.tab, (x.querySelector('.badge') || {}).outerHTML || '']) }));
  ensure(lang, 'ordered', meta.titles.ordered);
  ensure(lang, 'plans', lang === 'ar' ? 'كل المميزات حسب الباقة' : 'Every feature, by plan');
  // menu counts follow the shop
  html = html.replace(new RegExp('(<nav class="nav" data-lang="' + lang + '"[^>]*>)([\\s\\S]*?)(</nav>)'), (all, a, body, z) => {
    for (const [tab, badge] of meta.badges) body = body.replace(new RegExp('(<button type="button" data-v="' + tab + '">)([\\s\\S]*?)(</button>)'), (x, o, inner, c) => o + inner.replace(/<span class="badge[^"]*">\d+<\/span>/, '') + badge + c);
    return a + body + z;
  });
  const re = new RegExp('(<section class="view demo-view" data-lang="' + lang + '" data-v="([a-z]+)" data-title=")([^"]*)(" hidden>)(.*?)(</section>)', 'g');
  for (const m of [...html.matchAll(re)]) {
    let extra = '';
    if (m[2] === 'plans') { extra = null; }
    else {
      await goTab(page, m[2]);
      await page.evaluate(async () => { for (let y = 0; y <= document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
      await page.waitForTimeout(250);
    }
    if (m[2] === 'products') {
      // the comparison the app opens from "Compare suppliers", for the product that has a second supplier
      extra = await page.evaluate(() => {
        const p = S.ws.products.find(x => (x.altSuppliers || []).length); if (!p) return '';
        CMP_STATE.productId = p.id; renderCompare();
        const d = document.querySelector('#overlay .dialog').cloneNode(true);
        document.querySelector('#overlay').hidden = true; document.querySelector('#overlay').innerHTML = ''; CMP_STATE.productId = null;
        d.querySelectorAll('.cmp-add,.actions').forEach(e => e.remove());
        d.querySelectorAll('button').forEach(e => { if (e.dataset.act === 'removeAltSupplier') e.closest('div').remove(); });
        [...d.querySelectorAll('p')].filter(e => e.textContent === t('cmp.addHelp') || e.textContent === t('cmp.allUsed')).forEach(e => e.remove());
        const h = d.querySelector('h2'); h.insertAdjacentHTML('beforeend', '<span class="plantag">Pro</span>');
        return '<div class="section demo-compare">' + d.innerHTML + '</div>';
      });
    }
    if (m[2] === 'settings') extra = sundayMail(...await page.evaluate(() => [S.res, S.ws]), lang === 'ar');
    let got;
    if (extra === null) {
      const inner = plansPage(lang);
      got = { inner, text: inner, oldText: m[5], tags: 0, oldTags: 0 };
    } else got = await page.evaluate(([old, title, extra]) => {
      const v = document.querySelector('#view').cloneNode(true), prev = document.createElement('div'); prev.innerHTML = old;
      if (extra) v.insertAdjacentHTML('beforeend', extra);
      v.querySelectorAll('#billing,#emails,.gchips-hint,.pagehelp').forEach(e => e.remove());   // the demo has its own explainer
      v.querySelectorAll('.ani').forEach(e => e.classList.remove('ani'));
      v.querySelectorAll('[style]').forEach(e => { e.style.removeProperty('--r'); e.style.removeProperty('--i'); e.style.removeProperty('content-visibility'); if (!e.getAttribute('style')) e.removeAttribute('style'); });
      v.querySelectorAll('button,a,input,select,textarea').forEach(e => { e.setAttribute('tabindex', '-1'); ['data-act', 'data-tab', 'data-plan'].forEach(a => e.removeAttribute(a)); if (e.tagName === 'A') e.removeAttribute('href'); });
      v.querySelectorAll('input[type=file]').forEach(e => e.remove());
      v.querySelectorAll('.prof-head > input').forEach(e => e.insertAdjacentHTML('afterend', '<span class="plantag">Pro</span>'));   // a shape the owner made
      v.querySelectorAll('.tbl-wrap').forEach(e => { let h = e.previousElementSibling; while (h && !/^H[1-4]$/.test(h.tagName)) h = h.previousElementSibling; const sec = e.closest('.section'); const hh = h || (sec && sec.querySelector('h2,h3')); e.setAttribute('tabindex', '0'); e.setAttribute('role', 'region'); e.setAttribute('aria-label', (hh ? hh.firstChild.textContent : title).trim()); });
      const own = e => [...e.childNodes].filter(x => x.nodeType === 3).map(x => x.textContent).join('').trim();
      // every element with the same own text as a labelled one in the old demo gets the same label
      prev.querySelectorAll('.plantag').forEach(tag => { const p = tag.parentElement, key = own(p); if (!key) return; [...v.querySelectorAll(p.tagName)].filter(e => own(e) === key && !e.querySelector(':scope > .plantag')).forEach(t => t.appendChild(tag.cloneNode(true))); });
      const text = el => el.innerText === undefined ? el.textContent : el.textContent.replace(/\s+/g, ' ').trim();
      return { inner: v.innerHTML.replace(/\n/g, ' '), text: text(v), oldText: text(prev), tags: v.querySelectorAll('.plantag').length, oldTags: prev.querySelectorAll('.plantag').length };
    }, [m[5], m[3], extra]);
    n++;
    if (got.text !== got.oldText || got.tags !== got.oldTags) { changed++; if (check) { let i = 0; while (i < got.text.length && got.text[i] === got.oldText[i]) i++; console.log(lang, m[2], 'tags', got.oldTags, '->', got.tags, '| text differs at', i, '\n   demo:', got.oldText.slice(Math.max(0, i - 50), i + 110), '\n   app: ', got.text.slice(Math.max(0, i - 50), i + 110)); } }
    html = html.replace(m[0], () => m[1] + m[3] + m[4] + got.inner + m[6]);
  }
  if (errors.length) console.log('script errors', errors.slice(0, 3));
  await ctx.close();
}
// the explainer under the "Run this on your own shop" box, one per page and language (demo_copy.mjs)
const why = '<div class="demo-why" aria-live="polite">\n' + whyBlocks() + '\n    </div><!-- /demo-why -->';
if (/<div class="demo-why"[\s\S]*?<\/div><!-- \/demo-why -->/.test(html)) html = html.replace(/<div class="demo-why"[\s\S]*?<\/div><!-- \/demo-why -->/, () => why);
else html = html.replace(/(<div class="demo-end">[\s\S]*?<\/ul>\n    <\/div>)/, (m) => m + '\n    ' + why);
if (!check) fs.writeFileSync(file, html);
console.log(`${n} demo pages, ${changed} with different text or labels` + (check ? '' : ' (written)'));
await b.close(); s.close();
