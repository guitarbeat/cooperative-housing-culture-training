## 2025-02-18 - Unused CDN Dependencies
**Learning:** Large libraries like Chart.js might be included in the HTML via CDN but never used in the actual JavaScript code. This happens often when templates are copied or requirements change.
**Action:** Always grep the codebase for library names (e.g., "Chart", "d3") to confirm they are actually used before accepting them as necessary dependencies. Removing them is a high-value, low-risk optimization.
