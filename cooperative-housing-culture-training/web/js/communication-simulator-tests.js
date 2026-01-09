QUnit.module('Communication Simulator', function(hooks) {
    hooks.beforeEach(function() {
        const fixture = document.getElementById('qunit-fixture');
        fixture.innerHTML = `
            <div>
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
        // Re-initialize the simulator for the new DOM elements
        // This function is global in interactive.js
        if (typeof initCommunicationSimulator === 'function') {
            initCommunicationSimulator();
        }
    });

    QUnit.test('Simulate Competing style in Scenario 1', function(assert) {
        const scenarioSelector = document.getElementById('scenario-selector');
        scenarioSelector.value = 'scenario1';
        // Trigger change event just in case logic depends on it, though currently it just updates description
        scenarioSelector.dispatchEvent(new Event('change'));

        document.getElementById('assertiveness-slider').value = '8'; // High assertiveness
        document.getElementById('cooperativeness-slider').value = '2'; // Low cooperativeness

        document.getElementById('simulate-button').click();

        const results = document.getElementById('simulation-results').innerHTML;
        const style = document.getElementById('communication-style').innerText;

        assert.ok(results.includes('My priority is a functional faucet'), 'Results contain expected text for Competing/Scenario1');
        assert.ok(style.includes('Competing'), 'Style is identified as Competing');
    });

    QUnit.test('Simulate Accommodating style in Scenario 1', function(assert) {
        document.getElementById('scenario-selector').value = 'scenario1';
        document.getElementById('assertiveness-slider').value = '2'; // Low assertiveness
        document.getElementById('cooperativeness-slider').value = '8'; // High cooperativeness

        document.getElementById('simulate-button').click();

        const results = document.getElementById('simulation-results').innerHTML;
        const style = document.getElementById('communication-style').innerText;

        assert.ok(results.includes('I apologize for reiterating this'), 'Results contain expected text for Accommodating/Scenario1');
        assert.ok(style.includes('Accommodating'), 'Style is identified as Accommodating');
    });

    QUnit.test('Simulate Collaborating style in Scenario 2', function(assert) {
        document.getElementById('scenario-selector').value = 'scenario2';
        document.getElementById('assertiveness-slider').value = '8';
        document.getElementById('cooperativeness-slider').value = '8';

        document.getElementById('simulate-button').click();

        const results = document.getElementById('simulation-results').innerHTML;
        const style = document.getElementById('communication-style').innerText;

        assert.ok(results.includes('Could we explore alternative spaces'), 'Results contain expected text for Collaborating/Scenario2');
        assert.ok(style.includes('Collaborating'), 'Style is identified as Collaborating');
    });
});
