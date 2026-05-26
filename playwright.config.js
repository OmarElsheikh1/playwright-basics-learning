// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  // Where Playwright should look for test files
  testDir: "./tests",

  // Maximum time a single test is allowed to run
  timeout: 30_000, // 30 seconds

  // Maximum time Playwright waits for any expect() assertion
  expect: {
    timeout: 5_000, // 5 seconds
  },

  // Generate an HTML report after the test run
  reporter: "html",

  // Default settings used for every test
  use: {
    // Which browser the tests should run on
    browserName: "webkit",

    // Whether to run tests in headless mode or not
    headless: false,

    // You can enable tracing here if you want to record runs
    // trace: 'on-first-retry'
  },
};

module.exports = config;
