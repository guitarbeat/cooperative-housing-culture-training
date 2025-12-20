## 2024-10-25 - Initial Setup
**Learning:** Always check for .jules/bolt.md before starting work.
**Action:** Created this file to track future learnings.

## 2024-10-25 - Test Runner Fix
**Learning:** The existing puppeteer test runner was waiting for a non-existent selector `#qunit-test-output`. Standard QUnit creates `#qunit-testresult`.
**Action:** Fixed `run-policy-wizard-tests.js` to wait for the correct QUnit element.
