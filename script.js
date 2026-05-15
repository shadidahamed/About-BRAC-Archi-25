/**
 * BRACU Architecture Summer '26 - Mainframe Core Framework Runtime Engine
 * Core Application Engine Engineered & Structured completely by Sadeed Ahmed
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 01. MANUAL COHORT DATABASE STRUCTURE (MANAGE RECORDS HERE)
    // ==========================================================================
    const architectureCohortDatabase = [
        { id: "AS26-01", name: "Architect Candidate Alpha", roll: "22101001", studio: "Studio X", focus: "Sustainable Climate Adaptations", git: "https://github.com", lnk: "https://linkedin.com", fb: "https://facebook.com", port: "#" },
        { id: "AS26-02", name: "Architect Candidate Beta", roll: "22101002", studio: "Studio IX", focus: "Parametric Fluid Urbanism", git: "https://github.com", lnk: "https://linkedin.com", fb: "https://facebook.com", port: "#" },
        { id: "AS26-03", name: "Architect Candidate Gamma", roll: "22101003", studio: "Studio X", focus: "Deltaic Structural Integration", git: "https://github.com", lnk: "https://linkedin.com", fb: "https://facebook.com", port: "#" },
        { id: "AS26-04", name: "Architect Candidate Delta", roll: "22101004", studio: "Studio IX", focus: "High-Density Resilient Modules", git: "https://github.com", lnk: "https://linkedin.com", fb: "https://facebook.com", port: "#" }
    ];

    /**
     * STAGE GENERATOR LOOP NOTE:
     * This block scales up the base records array using mock rows so you can view 
     * search and layout responsiveness immediately.
     * REMOVE OR COMMENT OUT THIS LOOP when adding true graduate records.
     */
    while(architectureCohortDatabase.length < 16) {
        let currentSize = architectureCohortDatabase.length;
        architectureCohortDatabase.push({
            id: `AS26-${currentSize + 1}`,
            name: `GRADUATE TEMPLATE CARD AS-${100 + currentSize}`,
            roll: `22101${100 + currentSize}`,
            studio: currentSize % 2 === 0 ? "Studio X" : "Studio IX",
            focus: ["Urban Systems Design", "Parametric Fluidity", "Ecological Mapping", "Tectonic Fabrication"][currentSize % 4],
            git: "https://github.com", lnk: "https://linkedin.com", fb: "https://facebook.com", port: "#"
        });
    }

    // ==========================================================================
    // 02. APPLICATION VIEW CONTROLLER SWITCH SYSTEM (SINGLE PAGE SPA ROUTING)
    // ==========================================================================
    const appSectionsList = document.querySelectorAll(".spa-section");
    const globalAppNavLinks = document.querySelectorAll("[data-target]");

    function switchApplicationActiveView(targetSectionId) {
        if (!document.getElementById(targetSectionId)) return;

        // Force viewport top coordination transition
        window.scrollTo({ top: 0, behavior: "instant" });

        appSectionsList.forEach(section => {
            section.classList.remove("active");
            if (section.id === targetSectionId) {
                section.classList.add("active");
            }
        });

        // Maintain synchronized navigation active highlight attributes
        globalAppNavLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-target") === targetSectionId && link.classList.contains("nav-link")) {
                link.classList.add("active");
            }
        });

        // Trigger dynamic metrics tracking engines if entering statistical views
        if (targetSectionId === "about") {
            triggerStatisticalCounterIncrements();
        }
    }

    // Connect standard programmatic tracking routes across active tags
    document.addEventListener("click", (event) => {
        const closestRouteTrigger = event.target.closest("[data-target]");
        if (closestRouteTrigger) {
            event.preventDefault();
            const targetRouteViewId = closestRouteTrigger.getAttribute("data-target");
            switchApplicationActiveView(targetRouteViewId);
            
            // Push location route into address state records implicitly
            history.pushState(null, null, `#${targetRouteViewId}`);
        }
    });

    // Handle deep navigation tracking patterns on system load operations
    const activeRouteHash = window.location.hash.substring(1);
    if (activeRouteHash && document.getElementById(activeRouteHash)) {
        switchApplicationActiveView(activeRouteHash);
    }

    // ==========================================================================
    // 03. PRELOADER INITIALIZATION CLOSURES
    // ==========================================================================
    const sitePreloaderElement = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (sitePreloaderElement) {
                sitePreloaderElement.classList.add("fade-out");
                document.body.classList.remove("loading");
            }
        }, 800);
    });

    // ==========================================================================
    // 04. PREMIUM INTERACTIVE MOUSE TRACKING ENGINE WITH CLICK RIPPLES
    // ==========================================================================
    const customCursorDot = document.getElementById("custom-cursor");
    const customCursorBlur = document.getElementById("cursor-blur");

    document.addEventListener("mousemove", (e) => {
        if(customCursorDot && customCursorBlur) {
            customCursorDot.style.left = `${e.clientX}px`;
            customCursorDot.style.top = `${e.clientY}px`;
            
            customCursorBlur.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 350, fill: "forwards" });
        }
    });

    // Apply scaling magnification across premium clickable elements automatically
    document.querySelectorAll("a, button, .filter-tab, .secure-student-shield, [data-target]").forEach(element => {
        element.addEventListener("mouseenter", () => {
            if (customCursorBlur) {
                customCursorBlur.style.width = "50px";
                customCursorBlur.style.height = "50px";
                customCursorBlur.style.background = "rgba(171, 34, 41, 0.04)";
                customCursorBlur.style.borderColor = "var(--primary-neon)";
            }
        });
        element.addEventListener("mouseleave", () => {
            if (customCursorBlur) {
                customCursorBlur.style.width = "34px";
                customCursorBlur.style.height = "34px";
                customCursorBlur.style.background = "transparent";
                customCursorBlur.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }
        });
        
        // Add ripple-wave processing securely on user interaction steps
        element.addEventListener("click", function(e) {
            let coordinateX = e.clientX - this.getBoundingClientRect().left;
            let coordinateY = e.clientY - this.getBoundingClientRect().top;
            
            let waveNode = document.createElement("span");
            waveNode.className = "ripple-wave";
            waveNode.style.left = `${coordinateX}px`;
            waveNode.style.top = `${coordinateY}px`;
            
            this.appendChild(waveNode);
            setTimeout(() => { waveNode.remove(); }, 600);
        });
    });

    // ==========================================================================
    // 05. AMBIENT AUDIO ENVIRONMENT INTERACTION
    // ==========================================================================
    const audioControlContainer = document.getElementById("audio-control");
    const audioLabelStringNode = audioControlContainer?.querySelector(".audio-text");
    let hardwareAudioEngineInstance = null;
    let isAudioEngineProcessingActive = false;

    if (audioControlContainer) {
        audioControlContainer.addEventListener("click", () => {
            if (!hardwareAudioEngineInstance) {
                hardwareAudioEngineInstance = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
                hardwareAudioEngineInstance.loop = true;
                hardwareAudioEngineInstance.volume = 0.1;
            }

            if (!isAudioEngineProcessingActive) {
                hardwareAudioEngineInstance.play().catch(() => console.log("Audio routing engine awaits interaction handshake codes."));
                audioControlContainer.classList.add("playing");
                if (audioLabelStringNode) audioLabelStringNode.textContent = "AUDIO: ACTIVE";
                isAudioEngineProcessingActive = true;
            } else {
                hardwareAudioEngineInstance.pause();
                audioControlContainer.classList.remove("playing");
                if (audioLabelStringNode) audioLabelStringNode.textContent = "AUDIO: OFF";
                isAudioEngineProcessingActive = false;
            }
        });
    }

    // ==========================================================================
    // 06. PROGRESSIVE STATISTICAL METRIC COUNTER LOGIC
    // ==========================================================================
    function triggerStatisticalCounterIncrements() {
        const structuralCountersArray = document.querySelectorAll(".counter");
        structuralCountersArray.forEach(counter => {
            const parsedTargetLimit = parseInt(counter.getAttribute("data-target"));
            let baseStepValue = 0;
            counter.textContent = "0";

            const stepActionRate = Math.max(Math.ceil(parsedTargetLimit / 50), 1);
            
            const processRunner = () => {
                baseStepValue += stepActionRate;
                if (baseStepValue < parsedTargetLimit) {
                    counter.textContent = baseStepValue;
                    setTimeout(processRunner, 20);
                } else {
                    counter.textContent = parsedTargetLimit;
                }
            };
            processRunner();
        });
    }

    // ==========================================================================
    // 07. STUDENT GRID RUNTIME ARCHITECTURE & PARALLAX FILTERS
    // ==========================================================================
    const targetStudentGridContainer = document.getElementById("student-matrix-target");
    const runtimeSearchQueryInputField = document.getElementById("student-search");
    const filterSelectionTabsList = document.querySelectorAll(".filter-tab");

    let directoryFilterStudioString = "all";
    let directorySearchQueryString = "";

    function executeCohortGridRenderProcess() {
        if (!targetStudentGridContainer) return;
        targetStudentGridContainer.innerHTML = "";

        const coordinatedFilteredList = architectureCohortDatabase.filter(student => {
            const parseStudioEvaluation = directoryFilterStudioString === "all" || student.studio === directoryFilterStudioString;
            const parseSearchEvaluation = student.name.toLowerCase().includes(directorySearchQueryString) ||
                                           student.focus.toLowerCase().includes(directorySearchQueryString) ||
                                           student.roll.includes(directorySearchQueryString);
            return parseStudioEvaluation && parseSearchEvaluation;
        });

        if (coordinatedFilteredList.length === 0) {
            targetStudentGridContainer.innerHTML = `
                <div style="grid-column: 1/-1; padding: 50px 20px; text-align: center; color: var(--text-muted-gray); font-size:0.9rem;" class="glass-card">
                   No graduate architect records match the specified search parameters.
                </div>
            `;
            return;
        }

        coordinatedFilteredList.forEach((student, processingIndex) => {
            const structuralShieldCardNode = document.createElement("div");
            structuralShieldCardNode.className = "secure-student-shield";
            structuralShieldCardNode.style.opacity = "0";
            
            // Apply quick systematic stagger loading animations natively
            setTimeout(() => {
                structuralShieldCardNode.style.opacity = "1";
            }, processingIndex * 40);

            // Using static deterministic abstract placeholder images based on processingIndex safely
            const computedAbstractImageId = (processingIndex * 13) % 100;
            const finalizedSecureImageUrl = `https://picsum.photos/id/${computedAbstractImageId}/600/500`;

            structuralShieldCardNode.innerHTML = `
                <div class="shield-img-frame">
                    <span class="studio-badge">${student.studio.toUpperCase()}</span>
                    <img src="${finalizedSecureImageUrl}" alt="${student.name}" loading="lazy">
                    <div class="encrypted-overlay-gfx"></div>
                </div>
                <div class="shield-meta-body">
                    <h3>${student.name}</h3>
                    <span class="dept-lbl">B.ARCH GRADUATE // ID: ${student.roll}</span>
                    <div class="skills-tags-cluster">
                        <span class="skill-tag">${student.focus}</span>
                        <span class="skill-tag">Summer '26</span>
                    </div>
                    <div class="shield-social-pipeline">
                        <div class="pipeline-links">
                            <a href="${student.fb}" target="_blank" aria-label="Facebook Profile Pipeline"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="${student.lnk}" target="_blank" aria-label="LinkedIn Professional Network"><i class="fa-brands fa-linkedin-in"></i></a>
                            <a href="${student.git}" target="_blank" aria-label="GitHub Repository Infrastructure"><i class="fa-brands fa-github"></i></a>
                        </div>
                        <button class="btn btn-primary btn-sm" style="padding: 8px 16px; font-size: 0.65rem;" data-target="contact">Connect</button>
                    </div>
                </div>
            `;

            attachAdvanced3DParallaxTiltActions(structuralShieldCardNode);
            targetStudentGridContainer.appendChild(structuralShieldCardNode);
        });
    }

    function attachAdvanced3DParallaxTiltActions(shieldElement) {
        shieldElement.addEventListener("mousemove", (event) => {
            const dynamicMetrics = shieldElement.getBoundingClientRect();
            const mouseX = event.clientX - dynamicMetrics.left;
            const mouseY = event.clientY - dynamicMetrics.top;
            
            const centralAxisX = dynamicMetrics.width / 2;
            const centralAxisY = dynamicMetrics.height / 2;
            
            const computeRotateAngleX = (centralAxisY - mouseY) / 14;
            const computeRotateAngleY = (mouseX - centralAxisX) / 14;

            shieldElement.style.transform = `perspective(1000px) rotateX(${computeRotateAngleX}deg) rotateY(${computeRotateAngleY}deg) translateY(-4px)`;
        });

        shieldElement.addEventListener("mouseleave", () => {
            shieldElement.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    }

    if (runtimeSearchQueryInputField) {
        runtimeSearchQueryInputField.addEventListener("input", (e) => {
            directorySearchQueryString = e.target.value.toLowerCase();
            executeCohortGridRenderProcess();
        });
    }

    filterSelectionTabsList.forEach(tab => {
        tab.addEventListener("click", () => {
            filterSelectionTabsList.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            directoryFilterStudioString = tab.getAttribute("data-filter");
            executeCohortGridRenderProcess();
        });
    });

    // Execute core directory grid generation directly on system ignition setup
    executeCohortGridRenderProcess();

    // ==========================================================================
    // 08. LIGHTBOX CINEMA CONTROLLERS (EXHIBITION VIDEO MODALS)
    // ==========================================================================
    const globalCinemaOverlayPopup = document.getElementById("cinema-modal");
    const targetVideoIframeNode = document.getElementById("modal-video-frame");
    const mediaCategoryTabs = document.querySelectorAll(".video-tab");
    const videoShowcaseCardNodes = document.querySelectorAll(".video-card-wrapper");

    document.addEventListener("click", (e) => {
        const triggeredPlayBtn = e.target.closest(".play-trigger-btn");
        if (triggeredPlayBtn && globalCinemaOverlayPopup && targetVideoIframeNode) {
            targetVideoIframeNode.src = triggeredPlayBtn.getAttribute("data-video-url");
            globalCinemaOverlayPopup.classList.add("open");
            document.body.classList.add("loading");
        }
    });

    function cleanAndCloseLightboxViewport() {
        if (globalCinemaOverlayPopup && targetVideoIframeNode) {
            globalCinemaOverlayPopup.classList.remove("open");
            targetVideoIframeNode.src = "";
            document.body.classList.remove("loading");
        }
    }

    globalCinemaOverlayPopup?.addEventListener("click", cleanAndCloseLightboxViewport);
    document.querySelector(".modal-close-trigger")?.addEventListener("click", cleanAndCloseLightboxViewport);

    mediaCategoryTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            mediaCategoryTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const structuralVcatFilterScope = tab.getAttribute("data-vcat");

            videoShowcaseCardNodes.forEach(card => {
                if (structuralVcatFilterScope === "all" || card.getAttribute("data-vcat") === structuralVcatFilterScope) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ==========================================================================
    // 09. REALISTIC FRONTEND TRANSMISSION CONTROL ENGINE (CONTACT VALIDATION)
    // ==========================================================================
    const userSynapsePortalForm = document.getElementById("synapse-terminal-form");
    const formPanelParentSideWrapper = document.querySelector(".contact-form-side");

    if (userSynapsePortalForm && formPanelParentSideWrapper) {
        userSynapsePortalForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            let validationPassStatus = true;
            const fieldsToVerifyList = userSynapsePortalForm.querySelectorAll("input[required], textarea[required]");

            fieldsToVerifyList.forEach(input => {
                const groupContainer = input.parentElement;
                if (!input.value.trim()) {
                    groupContainer.classList.add("invalid");
                    validationPassStatus = false;
                } else if (input.type === "email" && !verifyEmailPatternSignature(input.value)) {
                    groupContainer.classList.add("invalid");
                    validationPassStatus = false;
                } else {
                    groupContainer.classList.remove("invalid");
                }
            });

            if (validationPassStatus) {
                formPanelParentSideWrapper.classList.add("submitting");
                
                // FormSubmit integration routes submission asynchronously over production pipelines safely
                const structuredFormData = new FormData(userSynapsePortalForm);
                
                fetch(userSynapsePortalForm.action, {
                    method: "POST",
                    body: structuredFormData,
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    formPanelParentSideWrapper.classList.remove("submitting");
                    if (response.ok) {
                        formPanelParentSideWrapper.classList.add("success");
                        userSynapsePortalForm.reset();
                    } else {
                        alert("Network pipeline exception encountered. Please review form configurations.");
                    }
                })
                .catch(() => {
                    formPanelParentSideWrapper.classList.remove("submitting");
                    alert("Transmission routing runtime error. Check active network configurations.");
                });
            }
        });

        userSynapsePortalForm.querySelectorAll("input, textarea").forEach(element => {
            element.addEventListener("input", () => {
                const groupContainer = element.parentElement;
                if (element.value.trim()) {
                    groupContainer.classList.remove("invalid");
                }
            });
        });
    }

    function verifyEmailPatternSignature(emailValueString) {
        const parsingRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return parsingRegex.test(emailValueString);
    }

    // Connect standard programmatic baseline apex execution to scroll-to-top buttons
    document.getElementById("scroll-to-top-action")?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
