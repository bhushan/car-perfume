import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
await page.waitForTimeout(6000);
const info = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  if (!h1) return { h1: null };
  const r = h1.getBoundingClientRect();
  const spans = [...h1.querySelectorAll(".mask-line > span")].map((s) => {
    const cs = getComputedStyle(s);
    return { text: s.textContent.slice(0, 30), transform: cs.transform, opacity: cs.opacity, display: cs.display };
  });
  const cs1 = getComputedStyle(h1);
  return { h1: { rect: r.toJSON(), fontSize: cs1.fontSize, color: cs1.color, opacity: cs1.opacity }, spans };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
