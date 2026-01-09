QUnit.module('Policy Development Wizard', function(hooks) {
  hooks.beforeEach(function() {
    // Re-initialize the wizard for the new DOM elements (QUnit resets #qunit-fixture)
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
