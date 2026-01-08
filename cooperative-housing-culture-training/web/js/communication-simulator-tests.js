QUnit.module('Communication Style Simulator', function(hooks) {
    hooks.beforeEach(function() {
      if (typeof initCommunicationSimulator === 'function') {
          // Mock necessary DOM elements if they don't exist in the fixture
          const fixture = document.getElementById('qunit-fixture');

          if (!document.getElementById('scenario-selector')) {
              fixture.innerHTML = `
                  <div id="simulation-container">
                      <select id="scenario-selector">
                          <option value="scenario1">Scenario 1</option>
                          <option value="scenario2">Scenario 2</option>
                          <option value="scenario3">Scenario 3</option>
                      </select>
                      <div id="scenario-description"></div>
                      <input type="range" id="assertiveness-slider" min="1" max="10" value="5">
                      <input type="range" id="cooperativeness-slider" min="1" max="10" value="5">
                      <button id="simulate-button">Simulate</button>
                      <div id="simulation-results"></div>
                      <div id="communication-style"></div>
                  </div>
              `;
          }

          initCommunicationSimulator();
      }
    });

    QUnit.test('Simulator initializes correctly', function(assert) {
      const scenarioSelector = document.getElementById('scenario-selector');
      assert.equal(scenarioSelector.value, 'scenario1', 'Initial scenario is scenario1');
      assert.notEqual(document.getElementById('scenario-description').innerHTML, '', 'Description is populated');
    });

    QUnit.test('Simulation generates result for competing style', function(assert) {
      document.getElementById('assertiveness-slider').value = 9;
      document.getElementById('cooperativeness-slider').value = 1;
      document.getElementById('simulate-button').click();

      const styleDiv = document.getElementById('communication-style');
      const resultsDiv = document.getElementById('simulation-results');

      assert.ok(styleDiv.innerHTML.includes('Competing'), 'Style identified as Competing');
      assert.ok(resultsDiv.innerHTML.includes('Outcome:'), 'Results generated');
    });

    QUnit.test('Simulation generates result for collaborating style', function(assert) {
        document.getElementById('assertiveness-slider').value = 9;
        document.getElementById('cooperativeness-slider').value = 9;
        document.getElementById('simulate-button').click();

        const styleDiv = document.getElementById('communication-style');

        assert.ok(styleDiv.innerHTML.includes('Collaborating'), 'Style identified as Collaborating');
      });
  });
