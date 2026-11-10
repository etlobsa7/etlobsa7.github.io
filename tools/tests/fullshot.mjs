// Full-page screenshots of the website in slices, to review a redesign section by section.
import { serve, launch } from './rig.mjs';
const [root, out, lang = 'en', w = '1280', theme = 'light'] = process.argv.slice(2);
const s = serve(root), b = await launch();
const c = await b.newContext({ viewport: { width: +w, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
await c.addInitScript(l => { try { localStorage.setItem('etlob-site-lang', l); } catch (e) {} }, lang);
const p = await c.newPage(); await p.route('**/functions/v1/app', r => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"ready":true,"prices":{"basic":1295,"pro":2850,"store":5440},"yearMonths":10,"trialDays":{"basic":14,"pro":14,"store":5},"checkEGP":1,"foundingLeft":30,"foundingSpots":30}' }));
await p.goto(s.url + '/'); await p.waitForTimeout(900);
const H = await p.evaluate(() => document.documentElement.scrollHeight); let k = 0;
for (let y = 0; y < H; y += 1700) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(350); await p.setViewportSize({ width: +w, height: 1700 }); await p.screenshot({ path: `${out}/full_${lang}_${w}_${theme}_${String(k++).padStart(2, '0')}.png` }); }
console.log('height', H, 'slices', k); await b.close(); s.close();
