import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
await page.waitForTimeout(5000);
// add to cart
await page.evaluate(() => document.getElementById("collection").scrollIntoView());
await page.waitForTimeout(3000);
await page.getByRole("button", { name: "Add to Cart" }).first().click();
await page.waitForTimeout(1500);
await page.screenshot({ path: "/tmp/shots/cart-drawer.png" });
// close cart, open quick view
await page.keyboard.press("Escape");
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /Quick view Santal Route/ }).click();
await page.waitForTimeout(1500);
await page.screenshot({ path: "/tmp/shots/quick-view.png" });
await page.keyboard.press("Escape");
await page.waitForTimeout(800);
console.log("errors:", errors.length ? errors : "none");
await browser.close();
