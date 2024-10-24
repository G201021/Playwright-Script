// @ts-check

const { test, expect } = require("@playwright/test");

test("Validate Orange HRM Website title", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/");
  await expect(page).toHaveURL(/.*orangehrmlive/);
});
