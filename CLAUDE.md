# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Install Playwright browsers (required once after npm install)
npx playwright install

# Run all tests (headless, all browsers)
npm test

# Run all tests in headed mode
npm run test:headed

# Run a specific test file
npx playwright test tests/stevemadden-account.spec.js

# Run a specific test file in headed mode
npx playwright test tests/stevemadden-account.spec.js --headed

# Run tests in a specific browser only
npx playwright test --project=chromium

# View the HTML report from the last run
npx playwright show-report
```

## Architecture

This is a Playwright end-to-end test project using ES module syntax (`import`). Tests live in `tests/` and are picked up automatically by `playwright.config.js`.

**Test configuration** (`playwright.config.js`): Runs tests across Chromium, Firefox, and WebKit in parallel. In CI, retries are set to 2 and workers to 1. Traces are captured on first retry. Reports are generated as HTML in `playwright-report/`.

**Credential handling**: The Steve Madden spec reads test credentials from environment variables (`STEVEMADDEN_TEST_EMAIL`, `STEVEMADDEN_TEST_PASSWORD`) with fallbacks to generated values. Set these env vars when running against a pre-existing account rather than creating a new one each run.

**Popup dismissal pattern**: Real-world sites render marketing overlays and iframes that block interactions. The `dismissPopup` helper in `stevemadden-account.spec.js` handles this via text-based button selectors, iframe-scoped locators, and direct DOM removal of known overlay elements (`#attentive_overlay`, `#attentive_creative`). Apply the same pattern when writing tests against other e-commerce sites.

**Serial test ordering**: The Steve Madden describe block uses `test.describe.serial` so account creation always runs before login (login depends on the account created in the first test). Shared state (the `account` object) is declared at module scope and read by both tests.

**Debug artifacts**: `debug_dom.txt` and `debug_login_dom.txt` at the repo root are captured DOM snapshots used during test development. They are not test inputs.
