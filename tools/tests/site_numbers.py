#!/usr/bin/env python3
"""Puts the re-measured test numbers into the website (index.html), in English and Arabic, and redraws the
three proof charts from the results file. Usage: site_numbers.py <repo dir> <results json>"""
import json, re, sys
root, res = sys.argv[1], json.load(open(sys.argv[2]))
p = root + '/index.html'; s = open(p, encoding='utf8').read()
lines = s.split('\n')
def key_lines(k):
    return [i for i, l in enumerate(lines) if l.startswith('  ' + k + ':')]
def swap(k, pairs, ar_pairs=None):
    idx = key_lines(k); assert len(idx) == 2, (k, idx)
    for n, i in enumerate(idx):
        for a, b in (pairs if n == 0 or ar_pairs is None else ar_pairs):
            assert a in lines[i], (k, n, a)
            lines[i] = lines[i].replace(a, b)
def setk(k, en, ar):
    idx = key_lines(k); assert len(idx) == 2, (k, idx)
    q = lambda t: "'" + t.replace("\\", "\\\\").replace("'", "\\'") + "',"
    lines[idx[0]] = '  ' + k + ': ' + q(en); lines[idx[1]] = '  ' + k + ': ' + q(ar)
# ---------- test 2: California CA_3 ----------
swap('t474', [('40,773', '22,321'), ('42,782', '19,339'), ('95.3', '84.6')])
swap('t475', [('92.2', '93.1'), ('93.4', '76.2')])
swap('t477', [('99.2', '99.6')])
swap('t478', [('96.1', '89.0'), ('86.0', '71.2')])
swap('t479', [('5,900', '4,500'), ('6,000', '4,200'), ('98.6', '92.8')])
swap('t480', [('783', '217'), ('858', '238'), ('80.9', '73.5')])
swap('t482', [('96.5', '96.1')])
swap('t484', [('144,400', '92,200'), ('156,600', '77,000'), ('92.2', '80.3')])
swap('t485', [('65,000', '41,500'), ('70,500', '34,700'), ('92.2', '80.3')])
swap('t486', [('96.9', '96.6')])
swap('t488', [('80.3', '72.7'), ('79.0', '72.8')])
swap('t489', [('82.5', '67.5')])
swap('t490', [('72.5', '62.5'), ('100%', '92.5%')])
swap('t491', [('83.3', '70.3')])
swap('t492', [('57.5', '50.0')])
swap('t644', [('10 of 12', '9 of 12'), ('83.3', '75.0')], [('10 من 12', '9 من 12'), ('83.3', '75.0')])
# ---------- test 1: Wisconsin WI_2 ----------
swap('t567', [('94.5', '92.8'), ('93.8', '88.1')])
swap('t569', [('99.1', '99.7')])
swap('t571', [('96.5', '96.0')])
swap('t573', [('4,600', '3,200'), ('98.7', '99.5')])
swap('t575', [('95.8', '97.7')])
swap('t576', [('40.0', '47.5'), ('100%', '95%')])
swap('t577', [('85%', '80%'), ('85.0', '80.0')])
swap('t578', [('24,838', '15,412'), ('27,009', '14,646'), ('92.0', '94.8')])
swap('t579', [('80.9', '70.1'), ('79.9', '67.2')])
swap('t580', [('93.6', '89.8'), ('76.1', '62.0')])
swap('t581', [('83.5', '68.6')])
swap('t582', [('92,700', '47,700'), ('91,000', '45,100'), ('98.1', '94.1')])
swap('t655', [('41,700', '21,500'), ('40,900', '20,300'), ('98.1', '94.1')])
swap('t654', [('272', '179'), ('311', '138'), ('87.7', '45.6'), ('class="pacc"', 'class="pacc lo"')])
swap('t645', [('11 of 12', '10 of 12'), ('91.7', '83.3')], [('11 من 12', '10 من 12'), ('91.7', '83.3')])
setk('t570', '<td class="pf">Dead stock flags</td><td>Product has stopped selling</td><td>One product went quiet for five months and was flagged in about half the runs; it then started selling again</td><td class="pacc lo"><b>1 false alarm</b><span class="pbar"><i style="--w:0%"></i></span></td>',
     '<td class="pf">تنبيه البضاعة الراكدة</td><td>المنتج وقف بيع</td><td>منتج واحد هدي خمس شهور واتنبه عليه في حوالي نص المرات؛ وبعدها رجع يتباع</td><td class="pacc lo"><b>إنذار كاذب واحد</b><span class="pbar"><i style="--w:0%"></i></span></td>')
swap('t524', [('94.5', '92.8')])
swap('t525', [('11 of 12', '10 of 12')], [('11 من 12', '10 من 12')])
swap('t530', [('11 of 12', '10 of 12'), ('94.5', '92.8')], [('11 من 12', '10 من 12'), ('94.5', '92.8')])
swap('t621', [('94.5', '92.8')])
setk('t624', '93.1% monthly forecast accuracy', 'دقة التوقع الشهري 93.1%')
setk('t562', '<b>93.1%</b><span>Walmart store, California, 2015: forecast month by month</span>', '<b>93.1%</b><span>فرع وول مارت، كاليفورنيا، 2015: التوقع شهر بشهر</span>')
setk('t554', "<b>93.1%</b><span>How close the app's forecast came to what the store really sold, each month of 2015</span>", '<b>93.1%</b><span>قد إيه توقع الأداة قرب من اللي المحل باعه فعلا، كل شهر في 2015</span>')
setk('t472', "<strong>Plainly:</strong> three results stay under 80%: each product month by month (70.1%, a little better than a three month average at 67.2%, because single products sell in lumps), the predictability class (47.5% exact, 95% within one class) and growing or shrinking (62.5%). This store's sales fell 9.3% from 2013 to 2014, then fell another 10.6% in 2015. The app expected the fall to slow, so its whole year forecast came in 5.2% over the real year; 10 of 12 months still landed inside its range and 99.8% of real demand was served from stock. Profit at risk is a small amount here (about 140 USD a year), so the estimate is often off by a large share: 45.6% right. One product was flagged as dead stock in about half the runs and then started selling again.",
     '<strong>بصراحة:</strong> تلات نتايج لسه تحت 80%: كل منتج شهر بشهر (70.1%، أحسن شوية من متوسط تلات شهور 67.2%، لأن المنتج الواحد بيتباع على دفعات)، وفئة الثبات (47.5% بالظبط، و95% في حدود فئة واحدة)، وبيكبر ولا بيقل (62.5%). مبيعات الفرع ده نزلت 9.3% من 2013 لـ 2014، وبعدين نزلت كمان 10.6% في 2015. الأداة توقعت إن النزول هيهدى، فتوقع السنة كلها طلع أعلى من الحقيقي بـ 5.2%؛ ومع كده 10 من 12 شهر فضلوا جوه المدى بتاعها، و99.8% من الطلب الحقيقي اتلبى من المخزون. الربح المعرض للخطر مبلغ صغير هنا (حوالي 140 دولار في السنة)، فالتقدير بيبعد بنسبة كبيرة: صح بنسبة 45.6%. ومنتج واحد اتنبه عليه كبضاعة راكدة في حوالي نص المرات وبعدها رجع يتباع.')
setk('t646', "<strong>Why the year line sits above the real one.</strong> This store's sales fell 2.8% from 2013 to 2014, then dropped 19.3% in 2015, a fall nothing in its own history foretold. The whole-year forecast made in December came in 15.4% over the real year, and 9 of 12 real months landed inside its range. The monthly forecast corrected itself as each month's sales came in: month by month it was 93.1% right, and 99.8% of real demand was served from stock. Prices barely moved, and the data does not record promotions, events or weather. In a shop whose busy months repeat, such as Ramadan, Eid, school season or winter, the app learns that pattern and follows it.",
     '<strong>ليه خط السنة أعلى من الحقيقي.</strong> مبيعات الفرع ده نزلت 2.8% من 2013 لـ 2014، وبعدين وقعت 19.3% في 2015، ومفيش حاجة في تاريخه كانت بتقول كده. توقع السنة كلها اللي اتعمل في ديسمبر طلع أعلى من الحقيقي بـ 15.4%، و9 من 12 شهر حقيقي وقعوا جوه المدى بتاعها. التوقع الشهري صحح نفسه مع كل شهر مبيعات جديد: شهر بشهر كان صح بنسبة 93.1%، و99.8% من الطلب الحقيقي اتلبى من المخزون. الأسعار تقريبا متغيرتش، والبيانات مفيهاش العروض ولا المناسبات ولا الجو. وفي محل شهوره المزدحمة بتتكرر كل سنة، زي رمضان والعيد والمدارس والشتا، الأداة بتتعلم الشكل ده وبتمشي عليه.')
setk('t558', "<strong>Where it falls short.</strong> Five results stay under 80%: the whole-year forecast is not one of them at 84.6%, but it is the weakest headline here. Under 80%: profit at risk (73.5%), each product month by month (72.7%, the same as a three month average at 72.8%, because single products sell in lumps), days of cover (70.3%), revenue ranking (67.5%), the predictability class (62.5% exact, 92.5% within one class) and whether a product grows or shrinks next year (50%, a coin toss, so the app shows it as last year's direction, not a promise). For the whole store month by month the app beat repeating last year here (93.1% against 76.2%), in Wisconsin (92.8% against 88.1%), and across all 20 store-years (91.8% against 80.9%).",
     '<strong>فين بتقصر.</strong> توقع السنة كلها 84.6%، وهو أضعف رقم كبير هنا. والنتايج اللي تحت 80%: الربح المعرض للخطر (73.5%)، وكل منتج شهر بشهر (72.7%، زي متوسط تلات شهور 72.8%، لأن المنتج الواحد بيتباع على دفعات)، وأيام التغطية (70.3%)، وترتيب الإيراد (67.5%)، وفئة الثبات (62.5% بالظبط، و92.5% في حدود فئة واحدة)، وهل المنتج هيكبر ولا هيقل السنة الجاية (50%، زي رمي العملة، فالأداة بتعرضه كاتجاه السنة اللي فاتت مش كوعد). وعلى مستوى المحل كله شهر بشهر، الأداة كانت أحسن من تكرار السنة اللي فاتت هنا (93.1% قصاد 76.2%)، وفي ويسكونسن (92.8% قصاد 88.1%)، وعلى الـ 20 سنة فرع كلها (91.8% قصاد 80.9%).')
# ---------- test 3: cash short ----------
swap('t689', [('75% to 82%', '95% to 97%')], [('<bdi>75%</bdi>', '<bdi>95%</bdi>'), ('<bdi>82%</bdi>', '<bdi>97%</bdi>')])
swap('t691', [('88% to 92%', '86% to 88%')], [('<bdi>88%</bdi>', '<bdi>86%</bdi>'), ('<bdi>92%</bdi>', '<bdi>88%</bdi>')])
setk('t693', "<strong>Plainly:</strong> with cash short, cutting every order by the same share also does far better than buying the most urgent first. Against that, the budget plan lost 59% less profit in California and about the same in Wisconsin. Across all 20 store-years it lost 96% less profit than most urgent first and 56% less than cutting evenly. It is not magic: with 80% of the cash some sales are still lost (with full cash the app served 99.8% in both stores). The cash plan is strongest for the 3-month total and next month (82% right in Wisconsin, 87% in California); months 2 and 3 on their own were 70% and 66% right in Wisconsin, 67% and 68% in California.",
     '<strong>بصراحة:</strong> لما الكاش يقل، تقليل كل طلب بنفس النسبة كمان أحسن بكتير من شراء الأكثر استعجالا الأول. وقصاد التقليل بالتساوي، خطة الميزانية ضيعت ربح أقل بـ 59% في كاليفورنيا، وتقريبا نفس النتيجة في ويسكونسن. وعلى الـ 20 سنة فرع كلها، ضيعت ربح أقل بـ 96% من الأكثر استعجالا الأول، وأقل بـ 56% من التقليل بالتساوي. ده مش سحر: بـ 80% من الكاش لسه في مبيعات بتضيع (بالكاش كامل الأداة لبت 99.8% في الفرعين). خطة الكاش أقوى في إجمالي الـ 3 شهور والشهر الجاي (صح بنسبة 82% في ويسكونسن و87% في كاليفورنيا)؛ الشهر التاني والتالت لوحدهم طلعوا صح بنسبة 70% و66% في ويسكونسن، و67% و68% في كاليفورنيا.')
s = '\n'.join(lines)
# rows that were not re-measured are taken out (cheaper supplier pick)
for k in ('t481', 't572'):
    s, n = re.subn(r'<tr data-t-html=\s*"' + k + r'"></tr>\n?', '', s); assert n == 1, (k, n)
# ---------- charts ----------
def path(vals, lo, hi, x0, x1, ytop, ybot):
    n = len(vals); return ' '.join(('M' if i == 0 else 'L') + '%.1f %.1f' % (x0 + (x1 - x0) * i / (n - 1), ybot - (v - lo) / (hi - lo) * (ybot - ytop)) for i, v in enumerate(vals))
def band(lo_v, hi_v, *a):
    up = path(lo_v, *a); n = len(hi_v); x0, x1 = a[2], a[3]
    back = ' '.join('L%.1f %.1f' % (x0 + (x1 - x0) * i / (n - 1), a[5] - (hi_v[i] - a[0]) / (a[1] - a[0]) * (a[5] - a[4])) for i in range(n - 1, -1, -1))
    return up + ' ' + back + ' Z'
def big(svg, c, lo, step):
    hi = lo + 3 * step; A = (lo, hi, 70.0, 760.0, 30.0, 250.0)
    ticks = re.findall(r'(<text class="rc-y"[^>]*>)[^<]*(</text>)', svg); assert len(ticks) == 4
    it = iter(['{:,}'.format(lo + k * step) for k in range(4)])
    svg = re.sub(r'(<text class="rc-y"[^>]*>)[^<]*(</text>)', lambda m: m.group(1) + next(it) + m.group(2), svg)
    for cls, d in (('rc-band', band(c['lo'], c['hi'], *A)), ('rc-l rc-act', path(c['real'], *A)), ('rc-l rc-year', path(c['year'], *A)), ('rc-l rc-mon', path(c['month'], *A))):
        svg, n = re.subn(r'(<path class="' + cls + r'" d=")[^"]*(")', lambda m: m.group(1) + d + m.group(2), svg); assert n == 1, cls
    for cls, vals in (('rc-d-act', c['real']), ('rc-d-mon', c['month'])):
        it2 = iter(vals); n = [0]
        def dot(m, it2=it2, n=n):
            v = next(it2); i = n[0]; n[0] += 1
            return '<circle class="%s" cx="%.1f" cy="%.1f" r="3.4"/>' % (cls, 70 + 690 * i / 11, 250 - (v - lo) / (hi - lo) * 220)
        svg, k = re.subn(r'<circle class="' + cls + r'"[^>]*/>', dot, svg); assert k == 12, (cls, k)
    return svg
figs = list(re.finditer(r'<figure class="realchart[^"]*">.*?</figure>', s, flags=re.S)); assert len(figs) == 2
new2 = big(figs[1].group(0), res['site']['CA_3']['chart'], 1200, 400)
s = s[:figs[1].start()] + new2 + s[figs[1].end():]
figs = list(re.finditer(r'<figure class="realchart[^"]*">.*?</figure>', s, flags=re.S))
s = s[:figs[0].start()] + big(figs[0].group(0), res['site']['WI_2']['chart'], 900, 250) + s[figs[0].end():]
c = res['site']['WI_2']['chart']; M = (900, 1650, 8.0, 352.0, 16.0, 124.0)
for cls, d in (('rx-band', band(c['lo'], c['hi'], *M)), ('rx-act', path(c['real'], *M)), ('rx-fc', path(c['month'], *M))):
    s, n = re.subn(r'(<path class="' + cls + r'" d=")[^"]*(")', lambda m: m.group(1) + d + m.group(2), s); assert n == 1, cls
s, n = re.subn(r'(<span class="rx-big">)94\.5%(</span>)', r'\g<1>92.8%\2', s); assert n == 1
open(p, 'w', encoding='utf8').write(s); print('website numbers updated')
