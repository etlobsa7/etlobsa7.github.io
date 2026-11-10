#!/usr/bin/env python3
"""Turn the UCI "Online Retail II" file (a UK online gift retailer, Dec 2009 to Dec 2011) into the
same JSON shape the replay reads. Usage: prep_uci.py online_retail_II.csv <out dir>
Cancellations, returns, postage, fees and manual lines are removed. The file is two yearly sheets
joined, and 1 to 9 December 2010 is in both, so identical lines in those days are counted once."""
import csv, json, sys, os, re, datetime as dt
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
D0, D1 = dt.date(2009, 12, 1), dt.date(2011, 11, 30)
days = (D1 - D0).days + 1
items, lines, kept, seen = {}, 0, 0, {}
O0, O1 = dt.date(2010, 12, 1), dt.date(2010, 12, 9)
with open(src, encoding='utf-8', errors='replace') as f:
    for r in csv.DictReader(f):
        lines += 1
        code = r['StockCode'].strip().upper()
        if r['Invoice'].startswith('C') or not re.match(r'^\d{5}[A-Z]{0,2}$', code): continue
        try: q, p = int(r['Quantity']), float(r['Price'])
        except ValueError: continue
        if q <= 0 or p <= 0: continue
        d = dt.date.fromisoformat(r['InvoiceDate'][:10])
        if d < D0 or d > D1: continue
        if O0 <= d <= O1:
            key = tuple(r.values()); seen[key] = seen.get(key, 0) + 1
            if seen[key] % 2 == 0: continue
        kept += 1
        it = items.setdefault(code, {'id': code, 'name': r['Description'].strip(), 'daily': [0] * days, 'rev': 0.0, 'u': 0})
        it['daily'][(d - D0).days] += q; it['rev'] += q * p; it['u'] += q
res = []
for it in items.values():
    res.append({'id': it['id'], 'name': it['name'], 'daily': it['daily'], 'price': {'all': round(it['rev'] / it['u'], 4)}})
json.dump({'store': 'UK', 'start': '2009-12-01', 'days': days, 'items': res}, open(os.path.join(out, 'UK.json'), 'w'), separators=(',', ':'))
print('lines', lines, 'sales kept', kept, 'products', len(res))
