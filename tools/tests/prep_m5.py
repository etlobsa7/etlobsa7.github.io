#!/usr/bin/env python3
"""Turn the public Walmart M5 files into one small JSON per store.
Usage: prep_m5.py <m5 dir with sales_train_evaluation.csv, sell_prices.csv, calendar.csv> <out dir>
Keeps hobby and household items only, daily units 2012-01-01..2016-05-22, and the mean shelf price per year."""
import csv, json, sys, os, datetime as dt
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
cal = list(csv.DictReader(open(os.path.join(src, 'calendar.csv'))))
d2date = {r['d']: r['date'] for r in cal}
wk2year = {}
for r in cal: wk2year.setdefault(r['wm_yr_wk'], int(r['date'][:4]))
D0, D1 = dt.date(2012, 1, 1), dt.date(2016, 5, 22)
prices = {}
with open(os.path.join(src, 'sell_prices.csv')) as f:
    rd = csv.reader(f); next(rd)
    for store, item, wk, p in rd:
        if not (item.startswith('HOBBIES') or item.startswith('HOUSEHOLD')): continue
        y = wk2year.get(wk)
        if y is None or y < 2012 or y > 2016: continue
        a = prices.setdefault((store, item), {}).setdefault(y, [0.0, 0])
        a[0] += float(p); a[1] += 1
stores = {}
with open(os.path.join(src, 'sales_train_evaluation.csv')) as f:
    rd = csv.reader(f); head = next(rd)
    cols = [(i, d2date[h]) for i, h in enumerate(head) if h.startswith('d_')]
    keep = [i for i, d in cols if D0 <= dt.date.fromisoformat(d) <= D1]
    for row in rd:
        item, store = row[1], row[4]
        if not (item.startswith('HOBBIES') or item.startswith('HOUSEHOLD')): continue
        pr = prices.get((store, item), {})
        stores.setdefault(store, []).append({
            'id': item, 'daily': [int(row[i]) for i in keep],
            'price': {str(y): round(v[0] / v[1], 4) for y, v in pr.items()}})
for store, items in stores.items():
    json.dump({'store': store, 'start': '2012-01-01', 'days': len(items[0]['daily']), 'items': items},
              open(os.path.join(out, store + '.json'), 'w'), separators=(',', ':'))
    print(store, len(items))
