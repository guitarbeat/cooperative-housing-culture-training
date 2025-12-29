# Bolt's Journal

## 2024-05-22 - Static Data Hoisting and Optimization
**Learning:** The application defines large static data structures inside function scopes (`initConflictFlowchart`, `initCommunicationSimulator`, `initPolicyWizard`). This causes re-allocation and garbage collection overhead if these functions are ever called multiple times (though currently they are called once on load). Additionally, `initConflictFlowchart` uses an O(N) lookup inside a loop to build connections.
**Action:** Move static data to module scope to improve memory usage and potential reuse. Optimize the connection building algorithm to use a Map for O(1) lookups.
