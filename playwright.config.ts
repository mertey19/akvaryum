import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  // The admin spec edits shared content, so spec files run one at a time.
  workers: 1,
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
    env: {
      ADMIN_PASSWORD: process.env.E2E_ADMIN_PASSWORD || "e2e-admin-password",
      CONTENT_STORE: "file",
      CONTENT_DATA_DIR: ".data/e2e",
    },
  },
});
