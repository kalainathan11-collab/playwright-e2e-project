const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on-first-retry'
  },
  reporter: [['list'], ['html', { open: 'never' }]]
});
