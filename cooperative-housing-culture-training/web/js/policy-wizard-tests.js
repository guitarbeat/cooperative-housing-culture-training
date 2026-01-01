QUnit.module('Policy Development Wizard', function(hooks) {
  hooks.beforeEach(function() {
    // The `initPolicyWizard` function is called when the DOM is ready,
    // which QUnit handles for us.
    // However, QUnit resets the fixture, so we need to re-initialize.
    if (typeof initPolicyWizard === 'function') {
        initPolicyWizard();
    }
  });

  QUnit.test('"Generate Policy" button visibility', function(assert) {
    const policySelector = document.getElementById('policy-type-selector');
    // The button is dynamically created by initPolicyWizard
    const generateButton = document.getElementById('generate-policy');

    // 1. Check that the button is hidden on initial load.
    assert.ok(generateButton.classList.contains('hidden'), 'Button is hidden initially');

    // 2. Simulate selecting a policy type.
    policySelector.value = 'conflict';
    policySelector.dispatchEvent(new Event('change'));

    // 3. Check that the button is now visible.
    assert.notOk(generateButton.classList.contains('hidden'), 'Button is visible after selecting a policy');

    // 4. Simulate deselecting the policy type.
    policySelector.value = '';
    policySelector.dispatchEvent(new Event('change'));

    // 5. Check that the button is hidden again.
    assert.ok(generateButton.classList.contains('hidden'), 'Button is hidden after deselecting');
  });

  QUnit.test('Communication Simulator Logic', function(assert) {
      // Setup elements if they don't exist (qunit fixture resets them but let's be safe)
      // Note: In QUnit, elements in #qunit-fixture are reset after each test.
      // But interactive.js binds events on DOMContentLoaded.
      // We might need to re-init if the elements are replaced.
      // Or we can just manually trigger the events.

      // Since interactive.js runs once on load, and fixture resets, the event listeners might be lost if attached to elements inside fixture.
      // Let's re-run initCommunicationSimulator to re-attach listeners to the fresh fixture elements.

      initCommunicationSimulator();

      const scenarioSelector = document.getElementById('scenario-selector');
      const assertivenessSlider = document.getElementById('assertiveness-slider');
      const cooperativenessSlider = document.getElementById('cooperativeness-slider');
      const simulateButton = document.getElementById('simulate-button');
      const simulationResults = document.getElementById('simulation-results');

      // Scenario 1: Competing
      scenarioSelector.value = 'scenario1';
      assertivenessSlider.value = 8;
      cooperativenessSlider.value = 2;
      simulateButton.click();

      assert.ok(simulationResults.innerHTML.includes('Outcome:</strong> The maintenance coordinator becomes defensive'), 'Scenario 1 Competing outcome correct');

      // Scenario 2: Collaborating
      scenarioSelector.value = 'scenario2';
      assertivenessSlider.value = 8;
      cooperativenessSlider.value = 8;
      simulateButton.click();

      assert.ok(simulationResults.innerHTML.includes('Outcome:</strong> Through open dialogue, you identify a creative solution'), 'Scenario 2 Collaborating outcome correct');
  });
});
