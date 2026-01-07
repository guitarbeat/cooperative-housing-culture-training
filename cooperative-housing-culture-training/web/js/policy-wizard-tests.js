QUnit.module('Policy Development Wizard', function(hooks) {
  hooks.beforeEach(function() {
    // The `initPolicyWizard` function is called when the DOM is ready.
    // However, QUnit resets the #qunit-fixture before each test, wiping event listeners.
    // We must re-initialize the component.
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

  QUnit.test('Conflict Flowchart Initialization', function(assert) {
    // initConflictFlowchart is called on DOMContentLoaded, so it should have run.
    // However, in the fixture reset, the elements are recreated, but the function is not re-run.
    // We need to manually call it or check if it ran.
    // Since QUnit resets #qunit-fixture, we need to re-run initConflictFlowchart.

    // Clear any previous state if necessary
    const container = document.querySelector('.flowchart-container');
    container.innerHTML = '';

    // Call the function
    if (typeof initConflictFlowchart === 'function') {
        initConflictFlowchart();
    } else {
        assert.ok(false, 'initConflictFlowchart is not defined');
    }

    const svg = container.querySelector('svg');
    assert.ok(svg, 'SVG element created');

    if (svg) {
        assert.ok(svg.querySelectorAll('.step').length > 0, 'Steps rendered');
        assert.ok(svg.querySelectorAll('path').length > 0, 'Connections rendered');
    }
  });
});
