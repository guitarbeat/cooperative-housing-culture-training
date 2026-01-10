QUnit.module('Policy Development Wizard', function(hooks) {
  hooks.beforeEach(function() {
    // Re-initialize the component because QUnit resets the fixture
    // and the original event listeners are lost.
    initPolicyWizard();
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
    // Setup: Create container
    const container = document.createElement('div');
    container.className = 'flowchart-container';
    // Must attach to fixture so D3 can find it if it uses document.querySelector,
    // or if the test assumes it's in the DOM.
    // QUnit cleans up #qunit-fixture.
    document.getElementById('qunit-fixture').appendChild(container);

    // Setup: Create step-details
    const details = document.createElement('div');
    details.id = 'step-details';
    document.getElementById('qunit-fixture').appendChild(details);

    // Init
    initConflictFlowchart();

    // Verify: Check if SVG was created
    const svg = container.querySelector('svg');
    assert.ok(svg, 'SVG element created');

    // Verify: Check connections
    const paths = svg.querySelectorAll('path');
    assert.ok(paths.length > 0, 'Paths (connections) drawn');

    // Verify: Check steps
    const steps = svg.querySelectorAll('g.step');
    assert.ok(steps.length > 0, 'Step groups created');
  });
});
