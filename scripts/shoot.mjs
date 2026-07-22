import { chromium } from "playwright";
import http from "http";
import handler from "serve-handler";
import { mkdirSync } from "fs";

const root = new URL("..", import.meta.url).pathname;
mkdirSync(`${root}public/images`, { recursive: true });

const server = http.createServer((req, res) => handler(req, res, { public: root }));
await new Promise((r) => server.listen(4173, r));

const shots = [
  // product renders (transparent)
  { url: "/scripts/render/?variant=noir&mode=product&w=900&h=1200", out: "product-noir.png", w: 900, h: 1200, alpha: true },
  { url: "/scripts/render/?variant=santal&mode=product&w=900&h=1200", out: "product-santal.png", w: 900, h: 1200, alpha: true },
  { url: "/scripts/render/?variant=ambre&mode=product&w=900&h=1200", out: "product-ambre.png", w: 900, h: 1200, alpha: true },
  // story scene
  { url: "/scripts/render/?variant=noir&mode=story&w=1200&h=1500", out: "story.png", w: 1200, h: 1500 },
  // lifestyle 2D scenes
  { url: "/scripts/render/?scene2d=lifestyle-1&w=1600&h=1000", out: "lifestyle-1.png", w: 1600, h: 1000 },
  { url: "/scripts/render/?scene2d=lifestyle-2&w=1600&h=1000", out: "lifestyle-2.png", w: 1600, h: 1000 },
  { url: "/scripts/render/?scene2d=lifestyle-3&w=1600&h=1000", out: "lifestyle-3.png", w: 1600, h: 1000 },
  { url: "/scripts/render/?scene2d=lifestyle-4&w=1600&h=1000", out: "lifestyle-4.png", w: 1600, h: 1000 },
  // instagram
  { url: "/scripts/render/?variant=noir&mode=closeup&w=900&h=1200", out: "insta-1.png", w: 900, h: 1200 },
  { url: "/scripts/render/?scene2d=insta-abstract-1&w=1000&h=1000", out: "insta-2.png", w: 1000, h: 1000 },
  { url: "/scripts/render/?scene2d=lifestyle-3&w=1000&h=1000", out: "insta-3.png", w: 1000, h: 1000 },
  { url: "/scripts/render/?variant=ambre&mode=closeup&w=900&h=1200", out: "insta-4.png", w: 900, h: 1200 },
  { url: "/scripts/render/?scene2d=insta-abstract-2&w=1000&h=1000", out: "insta-5.png", w: 1000, h: 1000 },
  { url: "/scripts/render/?scene2d=insta-abstract-3&w=1000&h=1000", out: "insta-6.png", w: 1000, h: 1000 },
];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  await page.goto(`http://localhost:4173${s.url}`);
  await page.waitForFunction("window.__done === true", { timeout: 20000 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${root}public/images/${s.out}`, omitBackground: !!s.alpha });
  await page.close();
  console.log("rendered", s.out);
}

await browser.close();
server.close();
