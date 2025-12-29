// Cooperative Housing Culture & Conflict Resolution Training
// Interactive Components JavaScript

// Hoist static data to top-level scope to avoid re-allocation
const FLOWCHART_STEPS = [
    {
        id: 'step1',
        title: 'Acknowledge Conflict',
        description: 'Recognize that a conflict exists and requires attention.',
        details: 'Effective conflict resolution begins with acknowledging the presence of a dispute. This involves recognizing indicators such as increased tension, avoidance behaviors, or direct complaints. Approach the situation with an objective and curious mindset, rather than a judgmental one. Understand that conflict is an inherent aspect of communal living and, when managed effectively, can foster positive growth and strengthen cooperative bonds.',
        x: 100,
        y: 50,
        next: ['step2']
    },
    {
        id: 'step2',
        title: 'Gather Information',
        description: 'Collect comprehensive facts and diverse perspectives from all involved parties.',
        details: 'Before attempting resolution, it is crucial to acquire a complete understanding of the situation. Conduct separate discussions with each party to ascertain their individual perspectives. Employ open-ended questions, such as "What transpired?" and "How did this affect you?" Document pertinent details objectively, refraining from assigning blame. Seek verifiable information to clarify the circumstances.',
        x: 100,
        y: 150,
        next: ['step3']
    },
    {
        id: 'step3',
        title: 'Identify Core Interests',
        description: 'Move beyond stated positions to understand underlying needs and motivations.',
        details: 'Distinguish between \'positions\' (what individuals explicitly state they desire) and \'interests\' (the fundamental reasons behind those desires). For instance, a position might be "I require extended quiet hours," whereas the underlying interest is "I need uninterrupted rest." Identifying these core interests often reveals multiple viable solutions that can satisfy the essential needs of all parties. Ask "Why is this significant to you?" to uncover these deeper motivations.',
        x: 100,
        y: 250,
        next: ['step4']
    },
    {
        id: 'step4',
        title: 'Generate Solutions',
        description: 'Brainstorm a range of options that address the identified core interests.',
        details: 'Foster a collaborative environment where all participants contribute ideas freely. During this phase, prioritize the generation of numerous potential solutions without immediate evaluation or criticism. Encourage innovative thinking and the development of ideas based on previous suggestions. Consider successful approaches from similar past situations. The objective is to maximize the quantity of ideas before assessing their quality.',
        x: 300,
        y: 250,
        next: ['step5']
    },
    {
        id: 'step5',
        title: 'Evaluate & Select Solutions',
        description: 'Choose the most effective options that align with shared needs and cooperative values.',
        details: 'Assess each proposed solution against objective criteria, including fairness, practicality, and adherence to cooperative principles. Consider both immediate and long-term implications. Prioritize solutions that address the most critical interests of all stakeholders. Formalize the agreed-upon solution with precise details regarding its implementation.',
        x: 300,
        y: 150,
        next: ['step6']
    },
    {
        id: 'step6',
        title: 'Implement & Follow Up',
        description: 'Execute the chosen solutions and monitor their effectiveness.',
        details: 'Develop a clear implementation plan that includes specific actions, assigned responsibilities, and defined timelines. Schedule regular check-ins to evaluate the efficacy of the solution and make necessary adjustments. Acknowledge and celebrate successful resolutions, recognizing the contributions of all participants. Document lessons learned to inform future conflict resolution processes.',
        x: 300,
        y: 50,
        next: []
    }
];

const COMMUNICATION_SCENARIOS = {
    scenario1: {
        title: "Maintenance Request Resolution",
        description: "A member has repeatedly submitted maintenance requests for a persistent faucet leak, yet repairs remain incomplete. They confront the maintenance coordinator at a community event, expressing significant frustration."
    },
    scenario2: {
        title: "Common Space Scheduling Conflict",
        description: "Two members seek to use the community room concurrently for distinct events. One member made an informal reservation weeks prior but failed to complete the official booking procedure. The other member submitted the proper reservation form yesterday."
    },
    scenario3: {
        title: "Noise Disturbance Discussion",
        description: "A member addresses a neighbor regarding excessive noise from late-night gatherings. This marks the third such discussion within two months, with previous agreements to mitigate noise having been disregarded."
    }
};

const POLICY_TYPES = {
    conflict: {
        title: "Conflict Resolution Policy",
        questions: `
            <h3 class="text-xl font-semibold mb-3">Conflict Resolution Process</h3>
            <div class="mb-4">
                <label class="block mb-2">What is the preferred process for resolving conflicts?</label>
                <div class="flex items-center mb-2">
                    <input type="radio" id="process-mediation" name="conflict-process" value="Mediation by a neutral third party." class="mr-2">
                    <label for="process-mediation">Mediation by a neutral third party</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="radio" id="process-board" name="conflict-process" value="Direct resolution facilitated by the cooperative board." class="mr-2">
                    <label for="process-board">Direct resolution facilitated by the cooperative board</label>
                </div>
                <div class="flex items-center">
                    <input type="radio" id="process-member" name="conflict-process" value="Member-to-member discussion with optional board oversight." class="mr-2">
                    <label for="process-member">Member-to-member discussion with optional board oversight</label>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-3">Mediator Selection</h3>
            <div class="mb-4">
                <label class="block mb-2">Who can serve as mediators?</label>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="mediator-internal" name="conflict-mediators" value="Trained internal cooperative members." class="mr-2">
                    <label for="mediator-internal">Trained internal cooperative members</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="mediator-external" name="conflict-mediators" value="External professional mediators." class="mr-2">
                    <label for="mediator-external">External professional mediators</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="mediator-board" name="conflict-mediators" value="Designated board members." class="mr-2">
                    <label for="mediator-board">Designated board members</label>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-3">Resolution Timeline</h3>
            <div class="mb-4">
                <label class="block mb-2" for="conflict-timeline">What is the expected timeline for conflict resolution (e.g., 30 days)?</label>
                <input type="text" id="conflict-timeline" class="w-full p-2 border border-gray-300 rounded" placeholder="e.g., 30 days">
            </div>
        `
    },
    communication: {
        title: "Communication Policy",
        questions: `
            <h3 class="text-xl font-semibold mb-3">Communication Channels</h3>
            <div class="mb-4">
                <label class="block mb-2">Which communication channels will be primarily utilized?</label>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="channel-email" name="comm-channels" value="Email (official announcements, newsletters)." class="mr-2">
                    <label for="channel-email">Email (official announcements, newsletters)</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="channel-board" name="comm-channels" value="Physical notice board (for general information)." class="mr-2">
                    <label for="channel-board">Physical notice board (for general information)</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="channel-online" name="comm-channels" value="Online forum/messaging platform (for member discussions)." class="mr-2">
                    <label for="channel-online">Online forum/messaging platform (for member discussions)</label>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-3">Communication Frequency</h3>
            <div class="mb-4">
                <label class="block mb-2">What is the desired frequency of official communications?</label>
                <div class="flex items-center mb-2">
                    <input type="radio" id="frequency-weekly" name="comm-frequency" value="Weekly." class="mr-2">
                    <label for="frequency-weekly">Weekly</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="radio" id="frequency-biweekly" name="comm-frequency" value="Bi-weekly." class="mr-2">
                    <label for="frequency-biweekly">Bi-weekly</label>
                </div>
                <div class="flex items-center">
                    <input type="radio" id="frequency-monthly" name="comm-frequency" value="Monthly." class="mr-2">
                    <label for="frequency-monthly">Monthly</label>
                </div>
            </div>
        `
    },
    participation: {
        title: "Member Participation Policy",
        questions: `
            <h3 class="text-xl font-semibold mb-3">Participation Expectations</h3>
            <div class="mb-4">
                <label class="block mb-2">What are the expectations for member participation?</label>
                <div class="flex items-center mb-2">
                    <input type="radio" id="participation-mandatory" name="participation-level" value="Mandatory attendance at general meetings and committees." class="mr-2">
                    <label for="participation-mandatory">Mandatory attendance at general meetings and committees</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="radio" id="participation-encouraged" name="participation-level" value="Encouraged participation in cooperative activities and decision-making." class="mr-2">
                    <label for="participation-encouraged">Encouraged participation in cooperative activities and decision-making</label>
                </div>
                <div class="flex items-center">
                    <input type="radio" id="participation-voluntary" name="participation-level" value="Voluntary engagement in cooperative initiatives." class="mr-2">
                    <label for="participation-voluntary">Voluntary engagement in cooperative initiatives</label>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-3">Contribution Areas</h3>
            <div class="mb-4">
                <label class="block mb-2">In which areas are member contributions particularly valued?</label>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="contribution-governance" name="contribution-areas" value="Governance and policy development." class="mr-2">
                    <label for="contribution-governance">Governance and policy development</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="contribution-maintenance" name="contribution-areas" value="Maintenance and upkeep of common areas." class="mr-2">
                    <label for="contribution-maintenance">Maintenance and upkeep of common areas</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="contribution-social" name="contribution-areas" value="Organizing social events and community building activities." class="mr-2">
                    <label for="contribution-social">Organizing social events and community building activities</label>
                </div>
            </div>
        `
    },
    'common-space': {
        title: "Common Space Usage Policy",
        questions: `
            <h3 class="text-xl font-semibold mb-3">Booking Procedure</h3>
            <div class="mb-4">
                <label class="block mb-2">What is the procedure for booking common spaces?</label>
                <div class="flex items-center mb-2">
                    <input type="radio" id="booking-online" name="booking-procedure" value="Online booking system with calendar." class="mr-2">
                    <label for="booking-online">Online booking system with calendar</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="radio" id="booking-physical" name="booking-procedure" value="Physical sign-up sheet at the common space." class="mr-2">
                    <label for="booking-physical">Physical sign-up sheet at the common space</label>
                </div>
                <div class="flex items-center">
                    <input type="radio" id="booking-contact" name="booking-procedure" value="Contacting a designated board member or committee." class="mr-2">
                    <label for="booking-contact">Contacting a designated board member or committee</label>
                </div>
            </div>

            <h3 class="text-xl font-semibold mb-3">Usage Guidelines</h3>
            <div class="mb-4">
                <label class="block mb-2">What are the key guidelines for using common spaces?</label>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="guideline-cleanliness" name="usage-guidelines" value="Users are responsible for cleaning the space after use." class="mr-2">
                    <label for="guideline-cleanliness">Users are responsible for cleaning the space after use</label>
                </div>
                <div class="flex items-center mb-2">
                    <input type="checkbox" id="guideline-noise" name="usage-guidelines" value="Noise levels must be kept to a minimum during specified hours." class="mr-2">
                    <label for="guideline-noise">Noise levels must be kept to a minimum during specified hours</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="guideline-damage" name="usage-guidelines" value="Any damage to the space or its contents must be reported immediately." class="mr-2">
                    <label for="guideline-damage">Any damage to the space or its contents must be reported immediately</label>
                </div>
            </div>
        `
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initConflictFlowchart();
    initCommunicationSimulator();
    initPolicyWizard();
});

// ===== Conflict Resolution Flowchart =====
function initConflictFlowchart() {
    const flowchartContainer = document.querySelector('.flowchart-container');
    const stepDetails = document.getElementById('step-details');
    
    if (!flowchartContainer) return;
    
    // Clear loading message
    flowchartContainer.innerHTML = '';
    
    // Create SVG element for the flowchart
    const svg = d3.select('.flowchart-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 500 300');
    
    // Create a Map for O(1) step lookup
    const stepsMap = new Map(FLOWCHART_STEPS.map(step => [step.id, step]));

    // Draw connections between steps
    const connections = [];
    FLOWCHART_STEPS.forEach(step => {
        step.next.forEach(nextId => {
            const nextStep = stepsMap.get(nextId);
            if (nextStep) {
                connections.push({
                    source: step,
                    target: nextStep
                });
            }
        });
    });
    
    svg.selectAll('path')
        .data(connections)
        .enter()
        .append('path')
        .attr('d', d => {
            return `M${d.source.x + 75},${d.source.y + 25} L${d.target.x},${d.target.y + 25}`;
        })
        .attr('stroke', '#4299E1')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrow)');
    
    // Add arrow marker for the connections
    svg.append('defs').append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 8)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#4299E1');
    
    // Draw step boxes
    const stepGroups = svg.selectAll('g')
        .data(FLOWCHART_STEPS)
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .attr('class', 'step')
        .style('cursor', 'pointer')
        .on('click', function(event, d) {
            // Update step details when clicked
            stepDetails.innerHTML = `
                <h4 class="font-semibold text-lg mb-2">${d.title}</h4>
                <p class="mb-3">${d.description}</p>
                <div class="bg-white p-3 rounded border border-blue-200">
                    <p>${d.details}</p>
                </div>
            `;
            
            // Highlight the selected step
            svg.selectAll('rect').attr('fill', '#EBF8FF');
            d3.select(this).select('rect').attr('fill', '#BEE3F8');
        });
    
    // Add rectangles for each step
    stepGroups.append('rect')
        .attr('width', 150)
        .attr('height', 50)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', '#EBF8FF')
        .attr('stroke', '#4299E1')
        .attr('stroke-width', 1);
    
    // Add text labels for each step
    stepGroups.append('text')
        .attr('x', 75)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('fill', '#2C5282')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .text(d => d.title);
    
    // Initialize with the first step selected
    stepDetails.innerHTML = `
        <h4 class="font-semibold text-lg mb-2">${FLOWCHART_STEPS[0].title}</h4>
        <p class="mb-3">${FLOWCHART_STEPS[0].description}</p>
        <div class="bg-white p-3 rounded border border-blue-200">
            <p>${FLOWCHART_STEPS[0].details}</p>
        </div>
    `;
    
    // Highlight the first step
    svg.select('.step rect').attr('fill', '#BEE3F8');
}

// ===== Communication Style Simulator =====
function initCommunicationSimulator() {
    const scenarioSelector = document.getElementById('scenario-selector');
    const scenarioDescription = document.getElementById('scenario-description');
    const assertivenessSlider = document.getElementById('assertiveness-slider');
    const cooperativenessSlider = document.getElementById('cooperativeness-slider');
    const simulateButton = document.getElementById('simulate-button');
    const simulationResults = document.getElementById('simulation-results');
    const communicationStyle = document.getElementById('communication-style');
    
    if (!scenarioSelector || !simulateButton) return;
    
    // Update scenario description when selection changes
    scenarioSelector.addEventListener('change', function() {
        const selectedScenario = COMMUNICATION_SCENARIOS[this.value];
        if (selectedScenario) {
            scenarioDescription.innerHTML = `
                <h4 class="font-semibold mb-2">${selectedScenario.title}</h4>
                <p>${selectedScenario.description}</p>
            `;
        }
    });
    
    // Initialize with the first scenario
    scenarioSelector.value = 'scenario1';
    scenarioDescription.innerHTML = `
        <h4 class="font-semibold mb-2">${COMMUNICATION_SCENARIOS.scenario1.title}</h4>
        <p>${COMMUNICATION_SCENARIOS.scenario1.description}</p>
    `;
    
    // Simulate conversation when button is clicked
    simulateButton.addEventListener('click', function() {
        const assertiveness = parseInt(assertivenessSlider.value);
        const cooperativeness = parseInt(cooperativenessSlider.value);
        const scenarioKey = scenarioSelector.value;
        
        // Determine communication style based on sliders
        let style = '';
        if (assertiveness >= 7 && cooperativeness <= 3) {
            style = 'Competing';
        } else if (assertiveness <= 3 && cooperativeness >= 7) {
            style = 'Accommodating';
        } else if (assertiveness <= 3 && cooperativeness <= 3) {
            style = 'Avoiding';
        } else if (assertiveness >= 4 && assertiveness <= 6 && cooperativeness >= 4 && cooperativeness <= 6) {
            style = 'Compromising';
        } else if (assertiveness >= 7 && cooperativeness >= 7) {
            style = 'Collaborating';
        } else {
            style = 'Mixed';
        }
        
        // Generate simulation results based on scenario and communication style
        let results = '';
        
        if (scenarioKey === 'scenario1') {
            if (style === 'Competing') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "This is unacceptable. I have submitted three requests, and the issue remains unresolved. I expect immediate action, or I will escalate this to the board."</p>
                    <p class="mb-2"><strong>Maintenance Coordinator:</strong> "I understand your frustration, but adherence to established procedures is necessary. Your aggressive tone is counterproductive."</p>
                    <p class="mb-2"><strong>You:</strong> "My priority is a functional faucet, not bureaucratic processes. This must be addressed immediately."</p>
                    <p class="mb-4"><strong>Outcome:</strong> The maintenance coordinator becomes defensive, and the professional relationship is strained. While the repair may be expedited, it comes at the cost of goodwill and future cooperation.</p>
                `;
            } else if (style === 'Accommodating') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I apologize for reiterating this, but my faucet continues to leak. I understand you are busy."</p>
                    <p class="mb-2"><strong>Maintenance Coordinator:</strong> "Yes, I recall. Several urgent repairs currently take precedence."</p>
                    <p class="mb-2"><strong>You:</strong> "Understood. I am prepared to wait as necessary."</p>
                    <p class="mb-4"><strong>Outcome:</strong> The relationship remains amicable, but your needs are not met. The repair remains a low priority, potentially delaying resolution for an extended period.</p>
                `;
            } else if (style === 'Avoiding') {
                results = `
                    <p class="mb-2"><strong>You:</strong> *Observes the maintenance coordinator but elects not to address the issue.*</p>
                    <p class="mb-2"><strong>Maintenance Coordinator:</strong> "Hello! Are you enjoying the community event?"</p>
                    <p class="mb-2"><strong>You:</strong> "Yes, it's pleasant. I should attend to something else now..."</p>
                    <p class="mb-4"><strong>Outcome:</strong> Direct conflict is averted, but the underlying problem persists. Your frustration escalates, potentially diminishing your satisfaction with the cooperative environment.</p>
                `;
            } else if (style === 'Compromising') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I am following up on my faucet repair. It has been a month since my initial request."</p>
                    <p class="mb-2"><strong>Maintenance Coordinator:</strong> "I acknowledge the delay. We have prioritized several emergency repairs."</p>
                    <p class="mb-2"><strong>You:</strong> "I understand emergencies take precedence. Can we establish a definitive date for my repair to manage expectations?"</p>
                    <p class="mb-4"><strong>Outcome:</strong> An agreement is reached for the repair to be completed within the next week. While not immediate, a clear timeline mitigates your frustration.</p>
                `;
            } else if (style === 'Collaborating') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I wish to discuss my faucet repair. My concern is the ongoing water waste and potential structural damage."</p>
                    <p class="mb-2"><strong>Maintenance Coordinator:</strong> "I appreciate you raising this. We are currently managing a high volume of requests. Could you elaborate on the issue?"</p>
                    <p class="mb-2"><strong>You:</strong> "The leak is worsening, and I am concerned about mold development. I possess basic plumbing knowledge; would my assistance expedite the repair process?"</p>
                    <p class="mb-4"><strong>Outcome:</strong> A mutually beneficial plan is developed, addressing both your need for a timely repair and the coordinator's resource constraints. The coordinator agrees to prioritize your repair and provide materials if you can assist.</p>
                `;
            }
        } else if (scenarioKey === 'scenario2') {
            if (style === 'Competing') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I verbally reserved this room weeks ago. The formal process is merely a bureaucratic formality."</p>
                    <p class="mb-2"><strong>Other Member:</strong> "I adhered to the established procedure and submitted the required form. The regulations clearly define the reservation protocol."</p>
                    <p class="mb-2"><strong>You:</strong> "My event is of greater importance, and I announced it first. I will not alter my plans."</p>
                    <p class="mb-4"><strong>Outcome:</strong> The conflict escalates, potentially necessitating intervention by the board. Community cohesion is compromised, and neither party perceives their concerns as respected.</p>
                `;
            } else if (style === 'Accommodating') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I understand I did not complete the official form. You may proceed with your event."</p>
                    <p class="mb-2"><strong>Other Member:</strong> "Thank you for your understanding. I appreciate your flexibility."</p>
                    <p class="mb-4"><strong>Outcome:</strong> You concede the room, maintaining a harmonious relationship but sacrificing your event. This may lead to future resentment if your needs are consistently deprioritized.</p>
                `;
            } else if (style === 'Avoiding') {
                results = `
                    <p class="mb-2"><strong>You:</strong> *Notices the other member setting up in the community room but avoids confrontation.*</p>
                    <p class="mb-2"><strong>Other Member:</strong> "(To a third party) Glad I got the form in on time!"</p>
                    <p class="mb-4"><strong>Outcome:</strong> The conflict is unaddressed, and the other member uses the room. Your event is cancelled, and you may feel unheard or undervalued within the cooperative.</p>
                `;
            } else if (style === 'Compromising') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "It appears we have a scheduling overlap. I informally reserved the room, but I acknowledge you completed the official process."</p>
                    <p class="mb-2"><strong>Other Member:</strong> "Yes, I followed the procedure. Is there a way we can both use the space, perhaps at different times?"</p>
                    <p class="mb-2"><strong>You:</strong> "Perhaps we could split the time, or I could use it for a shorter duration if you need the majority of the time."</p>
                    <p class="mb-4"><strong>Outcome:</strong> You agree to share the room or adjust your schedules, allowing both events to proceed, albeit with some modifications. This demonstrates flexibility and a willingness to find common ground.</p>
                `;
            } else if (style === 'Collaborating') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "We have a conflict regarding the community room. My objective is to host my event, and I understand you also have a need for the space."</p>
                    <p class="mb-2"><strong>Other Member:</strong> "Indeed. I followed the formal process, but I am open to finding a solution that works for both of us."</p>
                    <p class="mb-2"><strong>You:</strong> "Could we explore alternative spaces, or perhaps adjust the timing of our events to allow both to occur without conflict? My event could be shorter if necessary."</p>
                    <p class="mb-4"><strong>Outcome:</strong> Through open dialogue, you identify a creative solution, such as using an alternative space, rescheduling one event, or co-hosting. Both parties achieve their objectives, and the cooperative benefits from a strengthened problem-solving culture.</p>
                `;
            }
        } else if (scenarioKey === 'scenario3') {
            if (style === 'Competing') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "Your late-night noise is disruptive and unacceptable. This is the third time I've addressed this, and it needs to stop immediately."</p>
                    <p class="mb-2"><strong>Neighbor:</strong> "I'm entitled to host guests. You're being overly sensitive."</p>
                    <p class="mb-2"><strong>You:</strong> "I will report this to the board if it continues. Your actions violate community guidelines."</p>
                    <p class="mb-4"><strong>Outcome:</strong> The interaction escalates into an adversarial exchange, potentially leading to formal complaints and further deterioration of neighborly relations.</p>
                `;
            } else if (style === 'Accommodating') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I apologize for mentioning this again, but the noise has been quite loud recently. I understand you enjoy entertaining."</p>
                    <p class="mb-2"><strong>Neighbor:</strong> "Yes, we do. We try to be mindful, but sometimes it gets late."</p>
                    <p class="mb-2"><strong>You:</strong> "That's perfectly fine. I just wanted to bring it to your attention."</p>
                    <p class="mb-4"><strong>Outcome:</strong> You prioritize maintaining a pleasant relationship, but the noise issue remains unresolved. Your discomfort persists, and the neighbor may not perceive the issue as significant.</p>
                `;
            } else if (style === 'Avoiding') {
                results = `
                    <p class="mb-2"><strong>You:</strong> *Hears loud noise from the neighbor's unit but decides not to engage, instead using earplugs.*</p>
                    <p class="mb-4"><strong>Outcome:</strong> The noise continues, and your discomfort is unaddressed. You may feel increasingly resentful and isolated, avoiding interaction with the neighbor.</p>
                `;
            } else if (style === 'Compromising') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I need to discuss the noise levels. While I appreciate your right to entertain, the late-night volume is impacting my ability to rest."</p>
                    <p class="mb-2"><strong>Neighbor:</strong> "I understand. We enjoy hosting, but I recognize the need for quiet hours."</p>
                    <p class="mb-2"><strong>You:</strong> "Could we agree on a specific time, say 11 PM, after which noise levels are significantly reduced?"</p>
                    <p class="mb-4"><strong>Outcome:</strong> You reach a compromise where the neighbor agrees to reduce noise after a certain hour. While not ideal for either party, it provides a workable solution that respects both needs.</p>
                `;
            } else if (style === 'Collaborating') {
                results = `
                    <p class="mb-2"><strong>You:</strong> "I want to find a solution regarding the late-night noise. My concern is the impact on my sleep, and I value our cooperative living environment."</p>
                    <p class="mb-2"><strong>Neighbor:</strong> "I understand your concern. We enjoy socializing, and I want to ensure we are good neighbors."</p>
                    <p class="mb-2"><strong>You:</strong> "Could we explore options such as improving sound insulation, shifting social gatherings to earlier times, or utilizing common spaces for louder activities? I am open to suggestions."</p>
                    <p class="mb-4"><strong>Outcome:</strong> Through collaborative discussion, you identify mutually beneficial strategies, such as adjusting gathering times, utilizing sound-dampening solutions, or designating specific areas for louder activities. This strengthens the neighborly relationship and fosters a more harmonious living environment.</p>
                `;
            }
        }
        
        simulationResults.innerHTML = results;
        communicationStyle.innerHTML = `<p><strong>Style:</strong> ${style}</p>`;
    });
}

// ===== Policy Development Wizard =====
function initPolicyWizard() {
    const policyTypeSelector = document.getElementById('policy-type-selector');
    const policyQuestions = document.getElementById('policy-questions');
    const policyPreview = document.getElementById('policy-preview');
    const policyContent = document.getElementById('policy-content');
    const downloadPolicy = document.getElementById('download-policy');

    if (!policyTypeSelector) return;

    // Add a button to generate the policy, initially hidden
    const generateButton = document.createElement('button');
    generateButton.id = 'generate-policy';
    generateButton.className = 'bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 hidden';
    generateButton.textContent = 'Generate Policy';
    policyQuestions.parentNode.insertBefore(generateButton, policyQuestions.nextSibling);

    policyTypeSelector.addEventListener('change', function() {
        const selectedType = this.value;
        if (selectedType && POLICY_TYPES[selectedType]) {
            policyQuestions.innerHTML = POLICY_TYPES[selectedType].questions;
            policyQuestions.classList.remove('hidden');
            generateButton.classList.remove('hidden');
            policyPreview.classList.add('hidden'); // Hide preview when questions change
        } else {
            policyQuestions.innerHTML = '';
            policyQuestions.classList.add('hidden');
            generateButton.classList.add('hidden');
            policyPreview.classList.add('hidden');
        }
    });

    generateButton.addEventListener('click', function() {
        generatePolicy(policyTypeSelector.value);
    });

    // Generate policy based on form inputs
    function generatePolicy(policyType) {
        const selectedPolicy = POLICY_TYPES[policyType];
        if (!selectedPolicy) return;
        
        const purposeDescriptions = {
            conflict: 'resolving conflicts',
            communication: 'effective communication',
            participation: 'supporting active participation',
            'common-space': 'using shared common spaces'
        };

        const purposeText = purposeDescriptions[policyType] || 'supporting our cooperative community';

        let policyHTML = `
            <h1 class="text-2xl font-bold mb-4">${selectedPolicy.title}</h1>
            <p class="mb-4">For [Cooperative Name]</p>

            <h2 class="text-xl font-semibold mb-2">Purpose</h2>
            <p class="mb-4">This policy establishes guidelines for ${purposeText} within our cooperative community.</p>

            <h2 class="text-xl font-semibold mb-2">Scope</h2>
            <p class="mb-4">This policy applies to all members of the cooperative.</p>
        `;
        
        if (policyType === 'conflict') {
            // Get form values
            const processValue = getRadioValue('conflict-process');
            const mediators = getCheckboxValues('conflict-mediators');
            const timeline = document.getElementById('conflict-timeline').value;
            
            policyHTML += `
                <h2 class="text-xl font-semibold mb-2">Conflict Resolution Process</h2>
                <p class="mb-4">${processValue || 'The cooperative will utilize a structured process for conflict resolution.'}</p>
                
                <h2 class="text-xl font-semibold mb-2">Mediators</h2>
                <p class="mb-4">The following individuals are authorized to serve as mediators:</p>
                <ul class="list-disc pl-5 mb-4">
                    ${mediators.map(m => `<li>${m}</li>`).join('') || '<li>To be determined by the board</li>'}
                </ul>
                
                <h2 class="text-xl font-semibold mb-2">Resolution Timeline</h2>
                <p class="mb-4">${timeline || 'A timeline will be established on a case-by-case basis.'}</p>
            `;
        } else if (policyType === 'communication') {
            // Get form values
            const channels = getCheckboxValues('comm-channels');
            const frequency = getRadioValue('comm-frequency');
            
            policyHTML += `
                <h2 class="text-xl font-semibold mb-2">Communication Channels</h2>
                <p class="mb-4">The cooperative will employ the following communication channels:</p>
                <ul class="list-disc pl-5 mb-4">
                    ${channels.map(c => `<li>${c}</li>`).join('') || '<li>To be determined by the board</li>'}
                </ul>
                
                <h2 class="text-xl font-semibold mb-2">Communication Frequency</h2>
                <p class="mb-4">${frequency || 'Communication frequency will be determined based on cooperative requirements.'}</p>
            `;
        } else if (policyType === 'participation') {
            const participationLevel = getRadioValue('participation-level');
            const contributionAreas = getCheckboxValues('contribution-areas');

            policyHTML += `
                <h2 class="text-xl font-semibold mb-2">Member Participation Expectations</h2>
                <p class="mb-4">${participationLevel || 'Expectations for member participation will be defined.'}</p>
                
                <h2 class="text-xl font-semibold mb-2">Valued Contribution Areas</h2>
                <p class="mb-4">Member contributions are particularly valued in the following areas:</p>
                <ul class="list-disc pl-5 mb-4">
                    ${contributionAreas.map(a => `<li>${a}</li>`).join('') || '<li>To be determined by the board</li>'}
                </ul>
            `;
        } else if (policyType === 'common-space') {
            const bookingProcedure = getRadioValue('booking-procedure');
            const usageGuidelines = getCheckboxValues('usage-guidelines');

            policyHTML += `
                <h2 class="text-xl font-semibold mb-2">Common Space Booking Procedure</h2>
                <p class="mb-4">${bookingProcedure || 'A procedure for booking common spaces will be established.'}</p>
                
                <h2 class="text-xl font-semibold mb-2">Common Space Usage Guidelines</h2>
                <p class="mb-4">Key guidelines for common space usage include:</p>
                <ul class="list-disc pl-5 mb-4">
                    ${usageGuidelines.map(g => `<li>${g}</li>`).join('') || '<li>To be determined by the board</li>'}
                </ul>
            `;
        }
        
        policyHTML += `
            <h2 class="text-xl font-semibold mb-2">Review Protocol</h2>
            <p class="mb-4">This policy will undergo an annual review by the board of directors.</p>
            
            <p class="mt-8">Adopted: [Date]</p>
            <p>Last Reviewed: [Date]</p>
        `;
        
        // Display the generated policy
        policyContent.innerHTML = policyHTML;
        policyPreview.classList.remove('hidden');
    }
    
    // Helper function to get radio button value
    function getRadioValue(name) {
        const radios = document.getElementsByName(name);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return '';
    }
    
    // Helper function to get checkbox values
    function getCheckboxValues(name) {
        const checkboxes = document.getElementsByName(name);
        const values = [];
        
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                values.push(checkboxes[i].value);
            }
        }
        
        return values;
    }
    
    // Download policy as text file
    downloadPolicy.addEventListener('click', function() {
        const policyText = policyContent.innerText;
        const policyType = policyTypeSelector.options[policyTypeSelector.selectedIndex].text;
        const filename = policyType.replace(/\s+/g, '-').toLowerCase() + '.txt';
        
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(policyText));
        element.setAttribute('download', filename);
        
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();
        
        document.body.removeChild(element);
    });
}
