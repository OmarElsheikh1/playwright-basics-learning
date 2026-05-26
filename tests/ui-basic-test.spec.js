const { test, expect } = require("@playwright/test");
const { text } = require("stream/consumers");

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

test("Child windows handling 1", async ({ browser }) => {
  // Create a new isolated browser context (clean session), we can consider it as incognito window
  const context = await browser.newContext();

  // Open a new page (tab) inside this context
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Locate the link that opens a new browser window (or tab)
  const documentLink = page.locator('[href*="documents-request"]');

  /*
    Promise.all is used here to:
    1) Start listening for a new page to open
    2) Click the link that triggers the new page

    Both must happen together.
    If we click first and listen later, we may miss the event.
  */
  const [newPage] = await Promise.all([
    // Wait for a new page (child window) to be created
    context.waitForEvent("page"),

    // Click the link that opens the child window
    documentLink.click(),
  ]);

  newPage.locator(".red").textContent();

  // At this point, `newPage` represents the newly opened window

  // Close the browser context and all its pages
  await context.close();
});

test("Child windows handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator('[href*="documents-request"]');

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  console.log(text);

  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);

  await userName.fill(domain);

  await page.pause();

  console.log(await userName.inputValue());
});

test.only("Client App Login", async ({ page }) => {
  // Locating all product cars on the page
  const products = page.locator(".card .card-body");
  // Locating the titles of the products within the product cards
  const titles = page.locator(".card .card-body b");

  // The name of the product we want to interact with
  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("o.elsheikh@gmail.com");
  await page.locator("#userPassword").fill("Test@12345");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");

  // Logging the text content of all products to the console
  console.log(await titles.allTextContents());

  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // Add the product to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  // Stopping execution
  await page.pause();
});
