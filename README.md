# AI Automation Project

This is a Playwright project for automation testing.

## What it includes

- End-to-end browser automation using Playwright
- Structured test architecture for account creation and login flows
- Headed and headless execution support
- Popup and overlay handling for real-world sites
- HTML report generation
- AI-assisted workflow support

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Run the Steve Madden account flow in headed mode:
   ```bash
   npx playwright test tests/stevemadden-account.spec.js --headed
   ```

5. Show report:
   ```bash
   npx playwright show-report
   ```

## Project Structure

- `.github/copilot-instructions.md` - Workspace guidance for Copilot and project flow
- `tests/` - Test files
- `playwright.config.js` - Playwright configuration
- `package.json` - Project dependencies and scripts
- `README.md` - Project documentation
