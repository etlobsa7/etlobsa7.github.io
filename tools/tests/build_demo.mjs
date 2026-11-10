// Rebuilds the demo's pages from the real app: opens the app with the sample shop on the Store plan and
// copies each page, in English and Arabic, into demo/index.html. The demo shell (bars, texts, styles) is left alone.
// The copy is made view-only: controls are taken out of the tab order and their actions removed, tables that
// scroll get a label, and the plan labels already on the demo's headings are carried over.
// Usage: ENGINE=/path/engine.js node build_demo.mjs <repo dir> [--check]   (--check reports text differences only)
import fs from 'fs';
import { serve, launch, openApp, goTab } from './rig.mjs';
const { Engine } = await import(process.env.ENGINE);
const root = process.argv[2], check = process.argv.includes('--check'), file = root + '/demo/index.html';
let html = fs.readFileSync(file, 'utf8');
const s = serve(root), b = await launch(); let changed = 0, n = 0;
for (const lang of ['en', 'ar']) {
  const { page, ctx, errors } = await openApp(b, s.url, Engine, { plan: 'store', lang, width: 1280, still: true });
  const re = new RegExp('(<section class="view demo-view" data-lang="' + lang + '" data-v="([a-z]+)" data-title=")([^"]*)(" hidden>)(.*)(</section>)', 'g');
  for (const m of [...html.matchAll(re)]) {
    await goTab(page, m[2]);
    await page.evaluate(async () => { for (let y = 0; y <= document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    await page.waitForTimeout(250);
    // the demo shows Ordered stock under Products, and leaves the account sections out of Settings
    const extra = m[2] === 'products' ? await page.evaluate(() => VIEWS.ordered()) : '';
    const got = await page.evaluate(([old, title, extra]) => {
      const v = document.querySelector('#view').cloneNode(true), prev = document.createElement('div'); prev.innerHTML = old;
      if (extra) v.insertAdjacentHTML('beforeend', extra);
      v.querySelectorAll('#billing,#emails,.gchips-hint').forEach(e => e.remove());
      v.querySelectorAll('.ani').forEach(e => e.classList.remove('ani'));
      v.querySelectorAll('[style]').forEach(e => { e.style.removeProperty('--r'); e.style.removeProperty('--i'); e.style.removeProperty('content-visibility'); if (!e.getAttribute('style')) e.removeAttribute('style'); });
      v.querySelectorAll('button,a,input,select,textarea').forEach(e => { e.setAttribute('tabindex', '-1'); ['data-act', 'data-tab', 'data-plan'].forEach(a => e.removeAttribute(a)); if (e.tagName === 'A') e.removeAttribute('href'); });
      v.querySelectorAll('.tbl-wrap').forEach(e => { let h = e.previousElementSibling; while (h && !/^H[1-4]$/.test(h.tagName)) h = h.previousElementSibling; const sec = e.closest('.section'); const hh = h || (sec && sec.querySelector('h2,h3')); e.setAttribute('tabindex', '0'); e.setAttribute('role', 'region'); e.setAttribute('aria-label', (hh ? hh.firstChild.textContent : title).trim()); });
      const own = e => [...e.childNodes].filter(x => x.nodeType === 3).map(x => x.textContent).join('').trim();
      prev.querySelectorAll('.plantag').forEach(tag => { const p = tag.parentElement, key = own(p); if (!key) return; const t = [...v.querySelectorAll(p.tagName)].find(e => own(e) === key && !e.querySelector(':scope > .plantag')); if (t) t.appendChild(tag.cloneNode(true)); });
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
if (!check) fs.writeFileSync(file, html);
console.log(`${n} demo pages, ${changed} with different text or labels` + (check ? '' : ' (written)'));
await b.close(); s.close();
