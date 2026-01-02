QUnit.module('Conflict Resolution Flowchart', function(hooks) {
  hooks.beforeEach(function() {
    // Reset the fixture
    const flowchartContainer = document.querySelector('.flowchart-container');
    flowchartContainer.innerHTML = '';

    // Ensure the fixture elements exist
    if (!document.getElementById('step-details')) {
      const stepDetails = document.createElement('div');
      stepDetails.id = 'step-details';
      document.getElementById('qunit-fixture').appendChild(stepDetails);
    }

    // Call the init function
    // Note: initConflictFlowchart relies on d3 being available and the container existing
    initConflictFlowchart();
  });

  QUnit.test('Flowchart initialization', function(assert) {
    const svg = document.querySelector('.flowchart-container svg');
    assert.ok(svg, 'SVG element should be created');

    const steps = svg.querySelectorAll('g.step');
    assert.equal(steps.length, 6, 'Should render 6 steps');

    assert.ok(steps.length > 0, 'Steps should be rendered');
  });

  QUnit.test('Step interaction', function(assert) {
    const firstStep = document.querySelector('.flowchart-container g.step');
    assert.ok(firstStep, 'First step found');

    // Trigger click
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    firstStep.dispatchEvent(event);

    const stepDetails = document.getElementById('step-details');
    assert.ok(stepDetails.innerHTML.includes('Acknowledge Conflict'), 'Step details should update on click');
  });
});
