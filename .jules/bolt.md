## 2025-01-08 - QUnit Test Runner Fixes
**Learning:** The custom QUnit test runner (`run-policy-wizard-tests.js`) was fragile. It expected a selector `#qunit-test-output` which didn't exist in standard QUnit, causing timeouts. It also lacked proper 404 handling for static assets.
**Action:** When working with custom test runners, verify they align with the actual library behavior (e.g., QUnit classes/IDs). Ensure test fixtures are properly reset or re-initialized if the test runner relies on DOM state that QUnit wipes between tests.
