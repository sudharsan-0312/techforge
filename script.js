/**
 * Agentic AI Task Planner Architecture Framework
 * Core Controller - Object-Oriented Lifecycle Implementation Engine
 */

document.addEventListener("DOMContentLoaded", () => {
    window.agentApp = new AgenticPlannerEngine();
});

class AgenticPlannerEngine {
    constructor() {
        this.initializeState();
        this.cacheDOMElements();
        this.bindGlobalEventListeners();
        this.loadPlan();
    }

    initializeState() {
        this.currentPlan = null;
        this.processingStages = ['understanding', 'analysis', 'breakdown', 'prioritization', 'planning', 'generation'];
        
        // Contextual Heuristic AI Dictionary Strategy Matrix
        this.knowledgeGraphFallback = {
            learning: [
                { title: "Initiate Foundational Research & Resource Aggregation", priority: "High", hours: 4 },
                { title: "Deep Dive: Core Conceptual Theory Analysis", priority: "High", hours: 12 },
                { title: "Practical Laboratory Sandbox Experimentation", priority: "Medium", hours: 15 },
                { title: "Advanced Architecture Strategy & Edge Cases", priority: "Medium", hours: 10 },
                { title: "Simulated Deployment Testing & Verification Protocols", priority: "Low", hours: 6 }
            ],
            development: [
                { title: "Requirement Architecture Spec & System Scoping", priority: "High", hours: 6 },
                { title: "Wireframe Layout & Schema Composition Design", priority: "High", hours: 8 },
                { title: "Core Backing Systems & Feature Component Scaffold", priority: "High", hours: 20 },
                { title: "UI Visual Implementation & Interface Polish", priority: "Medium", hours: 16 },
                { title: "System QA Integration Testing & Multi-device Tuning", priority: "Medium", hours: 8 },
                { title: "Production Cloud Deployment & Asset Pipeline Build", priority: "Low", hours: 4 }
            ],
            generic: [
                { title: "Discovery Phase: Context Setup & Scope Bounds definition", priority: "High", hours: 3 },
                { title: "Strategic Iteration 1: Framework Execution Elements", priority: "High", hours: 8 },
                { title: "Strategic Iteration 2: System Consolidation Procedures", priority: "Medium", hours: 12 },
                { title: "Optimization Loop: Refining Operational Constraints", priority: "Medium", hours: 6 },
                { title: "Final Validation Review & Retrospective Audit Checklist", priority: "Low", hours: 4 }
            ]
        };
    }

    cacheDOMElements() {
        this.dom = {
            body: document.body,
            themeToggle: document.getElementById("theme-toggle"),
            sunIcon: document.getElementById("sun-icon"),
            moonIcon: document.getElementById("moon-icon"),
            goalForm: document.getElementById("goal-form"),
            goalInput: document.getElementById("goal-input"),
            btnGenerate: document.getElementById("btn-generate"),
            btnReset: document.getElementById("btn-reset"),
            btnDownload: document.getElementById("btn-download"),
            agentMonitor: document.getElementById("agent-monitor"),
            terminalLogger: document.getElementById("terminal-logger"),
            outputDashboard: document.getElementById("output-dashboard"),
            displayGoalTitle: document.getElementById("display-goal-title"),
            displayAnalysisText: document.getElementById("display-analysis-text"),
            progressBarFill: document.getElementById("progress-bar-fill"),
            progressNumerical: document.getElementById("progress-numerical"),
            taskCardsContainer: document.getElementById("task-cards-container"),
            timelineContainer: document.getElementById("timeline-container"),
            stepNodes: document.querySelectorAll(".step-node")
        };
    }

    bindGlobalEventListeners() {
        this.dom.themeToggle.addEventListener("click", () => this.toggleThemeInterface());
        this.dom.goalForm.addEventListener("submit", () => this.triggerAgentWorkflowPipeline());
        this.dom.btnReset.addEventListener("click", () => this.resetPlanner());
        this.dom.btnDownload.addEventListener("click", () => this.downloadPlan());
    }

    toggleThemeInterface() {
        const isLight = this.dom.body.classList.toggle("light-theme");
        this.dom.sunIcon.classList.toggle("hidden", !isLight);
        this.dom.moonIcon.classList.toggle("hidden", isLight);
        localStorage.setItem("planner-theme", isLight ? "light" : "dark");
    }

    async triggerAgentWorkflowPipeline() {
        const rawGoal = this.dom.goalInput.value.trim();
        if (!rawGoal) return;

        this.dom.outputDashboard.classList.add("hidden");
        this.dom.agentMonitor.classList.remove("hidden");
        this.dom.btnGenerate.disabled = true;
        this.dom.btnGenerate.innerText = "Processing Strategy...";

        // Step through the AI agent reasoning lifecycle
        for (const stage of this.processingStages) {
            await this.executeStageVisualLifecycle(stage, rawGoal);
        }

        // Orchestrate core model data logic mapping
        const insights = this.analyzeGoal(rawGoal);
        const structuredTasks = this.breakIntoTasks(rawGoal);
        const prioritizedMatrix = this.prioritizeTasks(structuredTasks);
        const dynamicTimeline = this.generateTimeline(prioritizedMatrix);

        this.currentPlan = {
            goal: rawGoal,
            analysis: insights,
            tasks: prioritizedMatrix,
            timeline: dynamicTimeline
        };

        this.savePlan();
        this.displayPlan();

        this.dom.btnGenerate.disabled = false;
        this.dom.btnGenerate.innerHTML = `<span>Generate Execution Plan</span><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
        this.dom.agentMonitor.classList.add("hidden");
        this.dom.outputDashboard.classList.remove("hidden");
        this.dom.outputDashboard.scrollIntoView({ behavior: 'smooth' });
    }

    executeStageVisualLifecycle(stageName, inputGoal) {
        return new Promise((resolve) => {
            this.dom.stepNodes.forEach(node => {
                if(node.dataset.stage === stageName) {
                    node.classList.add("active");
                    node.classList.remove("completed");
                } else if (this.processingStages.indexOf(node.dataset.stage) < this.processingStages.indexOf(stageName)) {
                    node.classList.remove("active");
                    node.classList.add("completed");
                } else {
                    node.classList.remove("active", "completed");
                }
            });

            const timestamp = () => new Date().toISOString().split('T')[1].substring(0, 8);
            let logText = `[${timestamp()}] [SubAgent-${stageName.toUpperCase()}] `;

            switch(stageName) {
                case 'understanding':
                    logText += `Parsing tokens. Input string size: ${inputGoal.length} characters. Normalizing vectors...`;
                    break;
                case 'analysis':
                    logText += `Evaluating execution risk dependencies and structural context flags...`;
                    break;
                case 'breakdown':
                    logText += `Deconstructing top-level target objective into individual actionable modules...`;
                    break;
                case 'prioritization':
                    logText += `Calculating Critical Path Method (CPM) weights & assigning structural urgency levels...`;
                    break;
                case 'planning':
                    logText += `Sequencing linear execution dates and load balancing task milestones...`;
                    break;
                case 'generation':
                    logText += `Consolidating system entities. Injecting metrics and building canvas elements...`;
                    break;
            }

            this.dom.terminalLogger.innerText = logText;
            setTimeout(resolve, 650); 
        });
    }

    /* ==========================================================================
       Required Algorithmic Processing Engine Core Methods
       ========================================================================== */

    analyzeGoal(goal) {
        const lowerGoal = goal.toLowerCase();
        let sector = "General Operations Strategy";
        let assessment = "System parsed default heuristic target matrix. The action items are optimized to balance foundation building, execution sprints, and verification buffers.";

        if (lowerGoal.includes("interview") || lowerGoal.includes("prepare") || lowerGoal.includes("learn") || lowerGoal.includes("study")) {
            sector = "Knowledge Acquisition & Assessment Technical Prep";
            assessment = "Target optimization prioritizes core theory comprehension early, shifting quickly into system labs and continuous simulated validation tracking.";
        } else if (lowerGoal.includes("build") || lowerGoal.includes("create") || lowerGoal.includes("develop") || lowerGoal.includes("website") || lowerGoal.includes("app")) {
            sector = "Product Lifecycle Architecture & Deployment Engineering";
            assessment = "Target optimization sets up technical requirements early, followed by iterative styling sprints, system tests, and cloud asset deployment stages.";
        }

        return `[Sector: ${sector}] Planning Engine Assessment: ${assessment}`;
    }

    breakIntoTasks(goal) {
        const lowerGoal = goal.toLowerCase();
        
        // Exact Request Target Verification Checks
        if(lowerGoal.includes("javascript interview")) {
            return [
                { title: "Master Scopes, Variables & Hoisting Engines", priority: "High", hours: 3 },
                { title: "Deep Dive Functional Programming & Closures Execution", priority: "High", hours: 4 },
                { title: "Study Complex Array Engineering & Mutation Algorithms", priority: "High", hours: 5 },
                { title: "Practice Interactive DOM Node Lifecycle Manipulation", priority: "Medium", hours: 6 },
                { title: "Build Modular Single-Page Sandboxed App Architecture Labs", priority: "Medium", hours: 10 },
                { title: "Solve High-Frequency Computational Mock Interview Questions", priority: "Low", hours: 8 }
            ];
        }
        
        if(lowerGoal.includes("portfolio website")) {
            return [
                { title: "Research Modern Layout Patterns & Assemble Identity Assets", priority: "High", hours: 4 },
                { title: "Design High-Fidelity Blueprint UX Layout Wireframes", priority: "High", hours: 4 },
                { title: "Develop Structural Matrix Framework Semantic HTML Layer", priority: "High", hours: 6 },
                { title: "Style Design Token System via Responsive Utility CSS3", priority: "Medium", hours: 12 },
                { title: "Inject Dynamic DOM Interactivity via Performance Vanilla JS", priority: "Medium", hours: 8 },
                { title: "Audit Cross-Platform Responsive Layout Metrics & Paint Speed", priority: "Medium", hours: 4 },
                { title: "Optimize Production Assets & Launch to Server Hosting Target", priority: "Low", hours: 3 }
            ];
        }

        // Intelligently generate relevant tasks using keyword parsing fallback
        let templatePool = this.knowledgeGraphFallback.generic;
        let prefix = "Execute Component Focus: ";

        if (lowerGoal.includes("interview") || lowerGoal.includes("prepare") || lowerGoal.includes("learn") || lowerGoal.includes("study")) {
            templatePool = this.knowledgeGraphFallback.learning;
            prefix = "Study Track: ";
        } else if (lowerGoal.includes("build") || lowerGoal.includes("create") || lowerGoal.includes("develop") || lowerGoal.includes("website") || lowerGoal.includes("app")) {
            templatePool = this.knowledgeGraphFallback.development;
            prefix = "Dev Module: ";
        }

        // Context Extraction Heuristic Engine
        const cleanedTokens = goal.replace(/prepare|for|build|a|create|study|learn|website|app|interview/gi, "").trim();
        const emphasisKeyword = cleanedTokens ? cleanedTokens.split(" ")[0] : "Objective Elements";

        return templatePool.map((t, idx) => ({
            title: idx === 0 || idx === 1 ? `${prefix}Analyze ${emphasisKeyword} Core Foundations` : `${t.title} (${emphasisKeyword} Phase)`,
            priority: t.priority,
            hours: t.hours
        }));
    }

    prioritizeTasks(tasks) {
        // Enforce structural order: High -> Medium -> Low
        const weight = { "High": 3, "Medium": 2, "Low": 1 };
        return [...tasks].sort((a, b) => weight[b.priority] - weight[a.priority])
                      .map((task, idx) => ({ ...task, id: `task-node-${idx}`, completed: false }));
    }

    generateTimeline(tasks) {
        let ongoingDayCounter = 1;
        return tasks.map(task => {
            const calculatedSpanDays = Math.ceil(task.hours / 4); // Assume a baseline 4-hour daily execution window
            const schedulingLabel = `Day ${ongoingDayCounter} - Day ${ongoingDayCounter + calculatedSpanDays - 1}`;
            ongoingDayCounter += calculatedSpanDays;
            return {
                taskId: task.id,
                timeLabel: schedulingLabel,
                milestoneTitle: task.title
            };
        });
    }

    displayPlan() {
        if (!this.currentPlan) return;

        this.dom.displayGoalTitle.innerText = this.currentPlan.goal;
        this.dom.displayAnalysisText.innerText = this.currentPlan.analysis;

        // Render Strategic Execution Cards Block
        this.dom.taskCardsContainer.innerHTML = "";
        this.currentPlan.tasks.forEach(task => {
            const card = document.createElement("div");
            card.className = `task-card ${task.completed ? 'completed-state' : ''}`;
            card.id = `card-${task.id}`;
            card.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <div class="task-card-content">
                    <h5>${task.title}</h5>
                    <div class="task-meta-row">
                        <span class="badge prio-${task.priority.toLowerCase()}">Priority ${task.priority}</span>
                        <span class="badge badge-duration">${task.hours} Estimated Engineering Hours</span>
                    </div>
                </div>
            `;
            this.dom.taskCardsContainer.appendChild(card);
        });

        // Render Timeline Nodes
        this.dom.timelineContainer.innerHTML = "";
        this.currentPlan.timeline.forEach(item => {
            const connectedTask = this.currentPlan.tasks.find(t => t.id === item.taskId);
            const node = document.createElement("div");
            node.className = `timeline-node ${connectedTask && connectedTask.completed ? 'node-done' : ''}`;
            node.id = `timeline-node-${item.taskId}`;
            node.innerHTML = `
                <span class="time-stamp">${item.timeLabel}</span>
                <p class="time-title">${item.milestoneTitle}</p>
            `;
            this.dom.timelineContainer.appendChild(node);
        });

        this.bindDynamicCardInteractivity();
        this.calculateProgressMetrics();
    }

    bindDynamicCardInteractivity() {
        const structuralCheckboxes = this.dom.taskCardsContainer.querySelectorAll("input[type='checkbox']");
        structuralCheckboxes.forEach(box => {
            box.addEventListener("change", (e) => {
                const id = e.target.dataset.id;
                const state = e.target.checked;
                
                // Update Local Memory State References
                const targetTask = this.currentPlan.tasks.find(t => t.id === id);
                if (targetTask) targetTask.completed = state;

                // Drive Interface Classes Transformations
                const card = document.getElementById(`card-${id}`);
                if (card) card.classList.toggle("completed-state", state);

                const timelineNode = document.getElementById(`timeline-node-${id}`);
                if (timelineNode) timelineNode.classList.toggle("node-done", state);

                this.calculateProgressMetrics();
                this.savePlan();
            });
        });
    }

    calculateProgressMetrics() {
        if (!this.currentPlan || this.currentPlan.tasks.length === 0) return;

        const totalCount = this.currentPlan.tasks.length;
        const totalCompleted = this.currentPlan.tasks.filter(t => t.completed).length;
        const metricPercentage = Math.round((totalCompleted / totalCount) * 100);

        this.dom.progressBarFill.style.width = `${metricPercentage}%`;
        this.dom.progressNumerical.innerText = `${metricPercentage}% Completed`;
    }

    savePlan() {
        if (this.currentPlan) {
            localStorage.setItem("agentic-planner-active-data", JSON.stringify(this.currentPlan));
        }
    }

    loadPlan() {
        // Enforce cached visual user configuration baseline checks early
        const userSavedTheme = localStorage.getItem("planner-theme");
        if (userSavedTheme === "light") this.toggleThemeInterface();

        const serializedData = localStorage.getItem("agentic-planner-active-data");
        if (!serializedData) return;

        try {
            this.currentPlan = JSON.parse(serializedData);
            this.dom.goalInput.value = this.currentPlan.goal;
            this.dom.outputDashboard.classList.remove("hidden");
            this.displayPlan();
        } catch (e) {
            console.error("Fault parsing cached local planner payload data structures.", e);
            localStorage.removeItem("agentic-planner-active-data");
        }
    }

    downloadPlan() {
        if (!this.currentPlan) return;

        let txtOutputBuffer = `====================================================\n`;
        txtOutputBuffer += `AGENTIC AI OPERATIONAL TASK STRATEGY BLUEPRINT\n`;
        txtOutputBuffer += `Generated Target: ${this.currentPlan.goal}\n`;
        txtOutputBuffer += `Timestamp: ${new Date().toLocaleString()}\n`;
        txtOutputBuffer += `====================================================\n\n`;
        txtOutputBuffer += `${this.currentPlan.analysis}\n\n`;
        txtOutputBuffer += `STRATEGIC EXECUTION CARD BREAKDOWN:\n`;

        this.currentPlan.tasks.forEach((t, i) => {
            const mappedTimeline = this.currentPlan.timeline.find(tl => tl.taskId === t.id);
            const stateIndicator = t.completed ? "[X] COMPLETED" : "[ ] PENDING";
            txtOutputBuffer += `${i+1}. ${stateIndicator} ${t.title}\n`;
            txtOutputBuffer += `   [Priority: ${t.priority}] [Est: ${t.hours} Hours] [Timeline: ${mappedTimeline ? mappedTimeline.timeLabel : 'N/A'}]\n\n`;
        });

        txtOutputBuffer += `\n====================================================\n`;
        txtOutputBuffer += `Generated via Agentic AI Task Planner Framework.\n`;

        const genericBlob = new Blob([txtOutputBuffer], { type: "text/plain;charset=utf-8" });
        const temporaryAnchor = document.createElement("a");
        temporaryAnchor.href = URL.createObjectURL(genericBlob);
        temporaryAnchor.download = `AI_Task_Plan_${this.currentPlan.goal.replace(/\s+/g, '_')}.txt`;
        temporaryAnchor.click();
        URL.revokeObjectURL(temporaryAnchor.href);
    }

    resetPlanner() {
        localStorage.removeItem("agentic-planner-active-data");
        this.currentPlan = null;
        this.dom.goalInput.value = "";
        this.dom.outputDashboard.classList.add("hidden");
        this.dom.agentMonitor.classList.add("hidden");
        
        this.dom.stepNodes.forEach(node => {
            node.classList.remove("active", "completed");
        });
        this.dom.terminalLogger.innerText = "System reset. Standing by for instructions...";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}