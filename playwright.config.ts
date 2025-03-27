import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/specs/',

  timeout: 80000,
  fullyParallel: false,
 
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,
  
  reporter: [["line"], ["allure-playwright"]],

  use: {

    launchOptions: {
      args: ["--start-maximized"],
    },

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },


  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
