const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const BASE_URL = process.env.APP_URL || "http://127.0.0.1:5173";
const OUT_DIR = path.join(__dirname, "..", "screenshots");

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true }).catch(() => {});
}

async function run() {
  await ensureDir(OUT_DIR);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 800 });

  // Login page
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(OUT_DIR, "login.png") });

  // Fill and sign in as SUPER_ADMIN
  await page.type("#login-email", "coolboy@app.com");
  await page.type("#login-password", "coolboy123");
  await Promise.all([
    page.click("#login-submit"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  // Dashboard
  await page.waitForSelector(".page-header", { timeout: 5000 }).catch(() => {});
  await page.screenshot({ path: path.join(OUT_DIR, "dashboard_super_admin.png") });

  // Users page
  await page.goto(`${BASE_URL}/users`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(OUT_DIR, "users_super_admin.png") });

  // Profile page
  await page.goto(`${BASE_URL}/profile`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(OUT_DIR, "profile_super_admin.png") });

  await browser.close();
  console.log(`Screenshots saved to: ${OUT_DIR}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
