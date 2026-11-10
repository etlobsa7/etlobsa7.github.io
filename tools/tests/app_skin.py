#!/usr/bin/env python3
"""Adds the sky blue, pink and white skin (navy at night) to the app and the demo, and makes the light look
the default for people who have not chosen a theme. Usage: app_skin.py <repo dir>"""
import sys
root = sys.argv[1]
SKIN = """
/* ================= skin: sky blue, pink and white (navy at night) ================= */
:root{
  --bg:#071326;
  --paper:#0E2140; --wash:#0B1B33; --wash-2:#12284A;
  --line:#1B3558; --line-2:#152B4A; --line-3:#2D4D78;
  --ink:#F2F7FF; --body:#C9D8EC; --muted:#9FB4CF; --faint:#93A9C6;
  --accent:#7CC0FF; --accent-2:#A8D6FF; --accent-ink:#071326; --accent-bg:rgba(124,192,255,.13);
  --btn:#F2F7FF; --btn-2:#FFFFFF; --btn-ink:#0B2545;
  --g1:#7CC0FF; --g2:#FF7EB0;
  --s-none:#4E6E99; --s-nohist:#2D4D78; --field:#081A33;
  --shadow:0 1px 2px rgba(0,0,0,.4),0 12px 32px rgba(0,8,24,.45);
  --r:14px;
  --bar-bg:#0F3A78; --bar-grad:linear-gradient(100deg,#0A2E63 0%,#12509C 62%,#6A3F9C 100%); --bar-edge:rgba(255,255,255,.14);
  --card-grad:linear-gradient(120deg,#0A2E63 0%,#12509C 60%,#6A3F9C 125%);
  --glow-pink:rgba(255,112,168,.30); --glow-sky:rgba(108,196,255,.22); --glow-coral:rgba(255,164,120,.16);
  --box-front:#17335C;--box-side:#12284A;--box-side-2:#0D2040;--box-top:#1E3F6F;--box-tape:#FF7EB0;--box-bottom:#081730;--box-edge:rgba(255,255,255,.14);--box-alt:#1B3A66;
}
html[data-theme="light"]{
  --bg:#EEF6FF;
  --paper:#FFFFFF; --wash:#F5FAFF; --wash-2:#E6F1FC;
  --line:#D3E4F5; --line-2:#E3EEF9; --line-3:#B4CFEA;
  --ink:#0B2545; --body:#2B4564; --muted:#455D7A; --faint:#4F6783;
  --accent:#1466C0; --accent-2:#0F54A3; --accent-ink:#FFFFFF; --accent-bg:rgba(20,102,192,.09);
  --btn:#1466C0; --btn-2:#0F54A3; --btn-ink:#FFFFFF;
  --ok:#126C36;
  --g1:#1466C0; --g2:#D6336F;
  --s-none:#B4CFEA; --s-nohist:#D3E4F5; --field:#FFFFFF;
  --shadow:0 1px 2px rgba(11,37,69,.06),0 12px 32px rgba(20,102,192,.12);
  --bar-bg:#0F5FB8; --bar-grad:linear-gradient(100deg,#0B4FA3 0%,#1670C8 62%,#8A4FB5 100%); --bar-edge:rgba(11,37,69,.2);
  --card-grad:linear-gradient(120deg,#0B4FA3 0%,#1670C8 60%,#8A4FB5 125%);
  --glow-pink:rgba(255,112,168,.42); --glow-sky:rgba(108,196,255,.55); --glow-coral:rgba(255,164,120,.3);
  --box-front:#FFFFFF;--box-side:#DCEBFB;--box-side-2:#C5DCF5;--box-top:#F5FAFF;--box-tape:#FF7EB0;--box-bottom:#9DBFE3;--box-edge:rgba(11,37,69,.16);--box-alt:#EAF4FE;
}
/* the two bars: blue running into violet */
.side .nav-row{background-image:var(--bar-grad)}
/* the backdrop: a soft pink and sky glow with fluted-glass stripes */
.app-bg::before{top:-30%;inset-inline-end:-22%;width:82%;height:122%;filter:blur(42px);
  background:radial-gradient(34% 38% at 54% 44%,var(--glow-pink),transparent 72%),radial-gradient(26% 30% at 36% 62%,var(--glow-coral),transparent 72%),radial-gradient(60% 62% at 54% 46%,var(--glow-sky),transparent 78%)}
.app-bg::after{opacity:1;background-size:auto;background-image:repeating-linear-gradient(90deg,color-mix(in srgb,var(--ink) 3.5%,transparent) 0 1px,transparent 1px 20px)}
/* the dashboard's main card and the sign-in panel carry the brand blend */
.today,.login-brand{--ink:#FFFFFF;--body:rgba(255,255,255,.95);--muted:rgba(255,255,255,.9);--faint:rgba(255,255,255,.88);--line:rgba(255,255,255,.28);--line-3:rgba(255,255,255,.5);--accent:#FFFFFF;
  --btn:#FFFFFF;--btn-2:#EAF4FE;--btn-ink:#0B2545;background:var(--card-grad);color:var(--body);border-color:transparent}
.today :focus-visible,.login-brand :focus-visible{outline-color:#FFFFFF}
.panel,.today,.kpis,.tbl-wrap,.st-card{box-shadow:var(--shadow)}
.btn.primary{box-shadow:0 6px 18px color-mix(in srgb,var(--btn) 22%,transparent)}
"""
for f in ('app/index.html', 'demo/index.html'):
    p = root + '/' + f; s = open(p, encoding='utf8').read()
    assert 'skin: sky blue' not in s, f
    i = s.index('</style>'); s = s[:i] + SKIN + s[i:]
    n = s.count('?t:"dark"'); assert n == 1, (f, n)
    s = s.replace('?t:"dark"', '?t:"light"')
    s = s.replace('content=t==="light"?"#F8FAFC":"#0D0F13"', 'content=t==="light"?"#EEF6FF":"#071326"')
    s = s.replace("light ? '#F8FAFC' : '#0D0F13'", "light ? '#EEF6FF' : '#071326'").replace('<meta name="theme-color" content="#0D0F13">', '<meta name="theme-color" content="#EEF6FF">')
    open(p, 'w', encoding='utf8').write(s); print(f, 'skinned; old theme colours left:', s.count('#F8FAFC":"#0D0F13') + s.count("'#F8FAFC' : '#0D0F13'"))
