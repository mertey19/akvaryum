import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 2,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run start -- --port 3000",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
