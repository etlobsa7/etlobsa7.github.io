# Tests behind the numbers on the website

These scripts replay real store sales through the app's engine, week by week, and score every
prediction against what really happened. They are kept here so the proof can always be re-run.

## What you need

1. **The data**: the public Walmart M5 files `sales_train_evaluation.csv`, `sell_prices.csv` and
   `calendar.csv` (Makridakis, Spiliotis, Assimakopoulos; kaggle.com/c/m5-forecasting-accuracy).
   The sales file's SHA-256 is `4b4a47c44c38380d2a9168216fea8c9ff2f31b1ddb772f8a0995952a038b8aa0`.
2. **The engine**: the file `engine.js` from the server function `app`. It is not stored in this
   repository. Every test loads that exact file; the scripts only feed it a shop.
3. Node 20 or newer and Python 3.

## Run

```
python3 prep_m5.py <folder with the three M5 files> data/
ENGINE=/full/path/engine.js node smoke.mjs data WI_2 2015
ENGINE=/full/path/engine.js node run_tests.mjs data results.json 40 10 3
```

`run_tests.mjs` writes one JSON with: the two stores shown on the website (40 runs each), all 20
store-years (10 runs each), and the cash-short test.

## Method

- Each store-year uses 40 hobby and household products, picked at random with a fixed seed from
  those that sold in every month of the two learning years.
- The app sees only the two learning years. The test year is then played day by day. On the 1st of
  each month the owner starts a new month and types what last month sold. Every Sunday the owner
  opens the app and orders exactly what it says.
- The data has no suppliers or costs, so three suppliers are assumed (7, 14 and 21 days; cartons of
  1, 6 and 12; deliveries run a little late with random delays) and cost is 55% of shelf price.
- Customers buy the real quantities sold that day. A sale is lost when the shelf is empty.
- Accuracy means 100% minus the total gap between predicted and real, as a share of real.
- Runs differ only in the random delivery delays.
