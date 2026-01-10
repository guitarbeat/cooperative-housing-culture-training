# Bolt's Journal

## 2024-05-22 - [QUnit Test Isolation]
**Learning:** QUnit tests in this project reset the `#qunit-fixture` container between tests, removing event listeners. Interactive components must be re-initialized in `beforeEach` hooks.
**Action:** When adding or modifying tests for interactive components, ensure `initPolicyWizard()` (or equivalent) is called in `beforeEach` to bind events to the fresh DOM elements.

## 2024-05-22 - [Puppeteer Cache Location]
**Learning:** The project uses a `.puppeteerrc.cjs` file to configure the Puppeteer cache location to `.cache/puppeteer`. This is crucial for the CI/CD environment or local setups to avoid permission issues or re-downloading Chromium.
**Action:** Ensure `.cache/` is in `.gitignore` and respects this configuration when running tests.

## 2024-05-22 - [DOM Initialization Idempotency]
**Learning:** Functions like `initPolicyWizard` may be called multiple times (e.g., in tests).
**Action:** Add checks to prevent duplicate elements or event listeners if the initialization function is called on an already initialized container.

## 2024-05-22 - [Test Runner Asset Paths]
**Learning:** The custom test runner `run-policy-wizard-tests.js` needs to handle URL normalization carefully. It maps browser requests (which might come as `/web/...` or just `/...`) to the local file system.
**Action:** When debugging 404s in tests, check the `request.url()` normalization logic in the test server.

## 2024-05-22 - [JSDoc for Performance]
**Learning:** Adding JSDoc types not only helps with correctness but can help identifying implicit type conversions that might be performance killers in tight loops (though V8 is good at optimizing, explicit is better).
**Action:** Add JSDoc to complex data processing functions.

## 2024-05-22 - [Event Delegation]
**Learning:** Instead of attaching listeners to every element in a list, attach one to the parent.
**Action:** Look for `querySelectorAll().forEach(el => el.addEventListener)` patterns and replace with delegation where appropriate.
