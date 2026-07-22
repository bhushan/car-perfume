import { chromium } from "playwright";

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

const shots = [
  { name: "desktop-hero", w: 1440, h: 900, scroll: 0, wait: 6000 },
  { name: "desktop-story", w: 1440, h: 900, rm: 1, scroll: 1400, wait: 6500 },
  { name: "desktop-collection", w: 1440, h: 900, rm: 1, scroll: 2600, wait: 6500 },
  { name: "desktop-scent", w: 1440, h: 900, rm: 1, scroll: 3900, wait: 6500 },
  { name: "desktop-why", w: 1440, h: 900, rm: 1, scroll: 5000, wait: 6500 },
  { name: "desktop-lifestyle", w: 1440, h: 900, rm: 1, scroll: 6200, wait: 7000 },
  { name: "desktop-testimonials", w: 1440, h: 900, rm: 1, scroll: 8600, wait: 7000 },
  { name: "desktop-comparison", w: 1440, h: 900, rm: 1, scroll: 9800, wait: 7000 },
  { name: "desktop-insta", w: 1440, h: 900, rm: 1, scroll: 11200, wait: 7000 },
  { name: "desktop-faq-news", w: 1440, h: 900, rm: 1, scroll: 12800, wait: 7000 },
  { name: "desktop-footer", w: 1440, h: 900, rm: 1, scroll: 99999, wait: 7000 },
  { name: "mobile-hero", w: 390, h: 844, scroll: 0, wait: 6000, rm: 1 },
  { name: "mobile-collection", w: 390, h: 844, rm: 1, scroll: 2900, wait: 6500 },
  { name: "mobile-footer", w: 390, h: 844, rm: 1, scroll: 99999, wait: 7000 },
];

const errors = [];
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h }, reducedMotion: s.rm ? "reduce" : "no-preference" });
  page.on("pageerror", (e) => errors.push(`${s.name}: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`${s.name} console: ${m.text()}`));
  page.on("response", (r) => r.status() >= 400 && errors.push(`${s.name} HTTP ${r.status()}: ${r.url()}`));
  await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
  await page.waitForTimeout(3200); // preloader
  if (s.scroll > 0) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), s.scroll);
    await page.waitForTimeout(6000);
  }
  await page.screenshot({ path: `/tmp/shots/${s.name}.png` });
  await page.close();
}

console.log("errors:", errors.length ? errors.slice(0, 12) : "none");
await browser.close();
