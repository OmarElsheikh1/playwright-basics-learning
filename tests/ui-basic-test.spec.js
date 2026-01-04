const { test, expect } = require("@playwright/test");

// Using { browser } to create a new context and page
test("First Playwright Test", async ({ browser }) => {
  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page in the browser context
  const page = await context.newPage();

  // Navigate to the example.com website
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Log the page title to the console
  console.log(await page.title());

  // Close the browser context
  await context.close();
});

// Using { page } directly in the test function
test("Page Playwright Test", async ({ page }) => {
  // Navigate to the Google website
  await page.goto("https://google.com");

  // Log the page title to the console
  console.log(await page.title());

  // Assert the page title
  await expect(page).toHaveTitle("Google");
});

test.only("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signInButton = page.locator("#signInBtn");
  
  await userName.type("rahulshettyacademy");
  await password.type("learning");
  await signInButton.click();
  console.log(await page.locator("[style*='block']").textContent());
});
