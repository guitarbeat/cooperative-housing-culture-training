QUnit.module('Policy Development Wizard', function(hooks) {
  hooks.beforeEach(function() {
    // The `initPolicyWizard` function is called when the DOM is ready,
    // which QUnit handles for us.
    // However, QUnit resets the fixture between tests, which removes event listeners
    // and dynamically added elements. We need to re-initialize the wizard.
    if (typeof initPolicyWizard === 'function') {
      initPolicyWizard();
    }
  });

  QUnit.test('"Generate Policy" button visibility', function(assert) {
    const policySelector = document.getElementById('policy-type-selector');
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
});
