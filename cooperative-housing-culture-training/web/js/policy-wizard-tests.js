QUnit.module('Policy Development Wizard', function(hooks) {
  hooks.beforeEach(function() {
    // Re-initialize the wizard because QUnit resets the fixture
    initPolicyWizard();
  });

  QUnit.test('"Generate Policy" button visibility', function(assert) {
    const policySelector = document.getElementById('policy-type-selector');

    // The generate button is created dynamically by initPolicyWizard
    let generateButton = document.getElementById('generate-policy');

    if (!generateButton) {
        assert.ok(false, "Generate button not found in DOM");
        return;
    }

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
