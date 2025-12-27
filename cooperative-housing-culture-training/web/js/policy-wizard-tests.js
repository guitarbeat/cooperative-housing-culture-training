QUnit.module('Policy Development Wizard', function(hooks) {
  hooks.beforeEach(function() {
    // The `initPolicyWizard` function is called when the DOM is ready,
    // which QUnit handles for us.
    // However, since we are re-running tests, we might need to re-initialize or clean up.
    // In this specific test setup, the fixture is reset by QUnit, but the JS logic attaches event listeners on DOMContentLoaded.
    // Since DOMContentLoaded happened long ago, we need to manually trigger the initialization for the new fixture.

    // Check if initPolicyWizard is available (it should be global)
    if (typeof initPolicyWizard === 'function') {
        initPolicyWizard();
    }
  });

  QUnit.test('"Generate Policy" button visibility', function(assert) {
    const policySelector = document.getElementById('policy-type-selector');

    // initPolicyWizard creates the button dynamically
    let generateButton = document.getElementById('generate-policy');

    // 1. Check that the button is hidden on initial load.
    // When created, it has class 'hidden'.
    assert.ok(generateButton && generateButton.classList.contains('hidden'), 'Button is hidden initially');

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
});
