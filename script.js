/**
 * BRACU Architecture '25 Executive ArchiveMainframe Core Runtime Engine
 * Architecture Logic Written & Built by Sadeed Ahmed
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 01. STATIC ENCRYPTED PROFILE MATRIX DATA STRUCTURE
    // ==========================================================================
    const architectureCohortDatabase = [
        { id: "AR25-001", name: "Placeholder Alpha", roll: "20101001", studio: "Studio VII", focus: "Climate Resilience Architecture", git: "#", lnk: "#", fb: "#", port: "#", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" },
        { id: "AR25-002", name: "Placeholder Beta", roll: "20101002", studio: "Studio VI", focus: "Parametric Algorithmic Tectonics", git: "#", lnk: "#", fb: "#", port: "#", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
        { id: "AR25-003", name: "Placeholder Gamma", roll: "20101003", studio: "Studio VII", focus: "Digital Fabrication Systems", git: "#", lnk: "#", fb: "#", port: "#", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
        { id: "AR25-004", name: "Placeholder Delta", roll: "20101004", studio: "Studio VI", focus: "Deltaic Micro-Urbanisms", git: "#", lnk: "#", fb: "#", port: "#", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80" },
        { id: "AR25-005", name: "Placeholder Epsilon", roll: "20101005", studio: "Studio VII", focus: "Sustainable Vernacular Forms", git: "#", lnk: "#", fb: "#", port: "#", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80" },
        { id: "AR25-006", name: "Placeholder Zeta", roll: "20101006", studio: "Studio VI", focus: "High-Density Tectonic Formulations", git: "#", lnk: "#", fb: "#", port: "#", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" }
    ];

    // Expand template matrices to scale dynamically to fulfill structural blocks smoothly
    while(architectureCohortDatabase.length < 24) {
        let currentLen = architectureCohortDatabase.length;
        architectureCohortDatabase.push({
            id: `AR25-0${currentLen+1}`,
            name: `ARCHITECT RECORD TEMPLATE AR-${1000 + currentLen}`,
            roll: `2010${1000 + currentLen}`,
            studio: currentLen % 2 === 0 ? "Studio VII" : "Studio VI",
            focus: ["Urban Systems Integration", "Parametric Logic Design", "Digital Prototyping Labs", "Deltaic Geographies"][currentLen % 4],
            git: "#", lnk: "#", fb: "#", port: "#",
            img: `https://picsum.photos/id/${(currentLen * 7) % 150}/600/600`
        });
    }

    // ==========================================================================
    // 02. PRELOADER & INITIALIZATION ENGINE CONTROLLERS
    // ==========================================================================
    const preloaderElement = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            preloaderElement.classList.add("fade-out");
            document.body.classList.remove("loading");
            executeScrollRevealEngine();
            initializeCountersEngine();
        }, 1000);
    });

    // ==========================================================================
    // 03. AMBIENT AUDIO SYSTEM CONTROLLER MODULE
    // ==========================================================================
    const audioControlWidget = document.getElementById("audio-control");
    const audioToggleText = audioControlWidget.querySelector(".audio-text");
    let syntheticAmbientAudioEngine = null;
    let isAmbientSoundActive = false;

    audioControlWidget.addEventListener("click", () => {
        if (!syntheticAmbientAudioEngine) {
            syntheticAmbientAudioEngine = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
            syntheticAmbientAudioEngine.loop = true;
            syntheticAmbientAudioEngine.volume = 0.15;
        }
        
        if (!isAmbientSoundActive) {
            syntheticAmbientAudioEngine.play().catch(e => console.log("Audio pipeline requires manual trigger authorization codes."));
            audioControlWidget.classList.add("playing");
            audioToggleText.textContent = "AMBIENT: ACTIVE";
            isAmbientSoundActive = true;
        } else {
            syntheticAmbientAudioEngine.pause();
            audioControlWidget.classList.remove("playing");
            audioToggleText.textContent = "AMBIENT: OFF";
            isAmbientSoundActive = false;
        }
    });

    // ==========================================================================
    // 04. PREMIUM MOUSE TRAILING CURSOR ENGINE
    // ==========================================================================
    const operationalCursorDot = document.getElementById("custom-cursor");
    const operationalCursorBlur = document.getElementById("cursor-blur");

    document.addEventListener("mousemove", (event) => {
        operationalCursorDot.style.left = `${event.clientX}px`;
        operationalCursorDot.style.top = `${event.clientY}px`;
        
        // Add subtle interpolation delay logic to surrounding blur ring asset
        operationalCursorBlur.animate({
            left: `${event.clientX}px`,
            top: `${event.clientY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // Handle button scale magnification triggers automatically
    document.querySelectorAll("a, button, .filter-tab, .secure-student-shield").forEach(element => {
        element.addEventListener("mouseenter", () => {
            operationalCursorBlur.style.width = "60px";
            operationalCursorBlur.style.height = "60px";
            operationalCursorBlur.style.borderColor = "var(--primary-neon)";
            operationalCursorBlur.style.background = "rgba(255, 51, 68, 0.05)";
        });
        element.addEventListener("mouseleave", () => {
            operationalCursorBlur.style.width = "40px";
            operationalCursorBlur.style.height = "40px";
            operationalCursorBlur.style.borderColor = "var(--primary-neon)";
            operationalCursorBlur.style.background = "transparent";
        });
    });

    // ==========================================================================
    // 05. SCROLL ACTION REVEAL & STICKY NAVBAR HIGH-LIGHTER TRACKER
    // ==========================================================================
    const mainNavigationWrapperElement = document.querySelector(".navbar-wrapper");
    const staticViewSections = document.querySelectorAll("section");
    const operationalNavLinks = document.querySelectorAll(".nav-link, .mobile-nav-row");

    function executeScrollRevealEngine() {
        const structuralRevealTargets = document.querySelectorAll(".scroll-reveal");
        
        const scrollObserverConfig = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                }
            });
        }, { threshold: 0.15 });

        structuralRevealTargets.forEach(target => scrollObserverConfig.observe(target));
    }

    window.addEventListener("scroll", () => {
        // Sticky dynamic glass styling mutation switch
        if (window.scrollY > 50) {
            mainNavigationWrapperElement.classList.add("scrolled");
        } else {
            mainNavigationWrapperElement.classList.remove("scrolled");
        }

        // Active link tracking updates
        let operationalActiveId = "";
        staticViewSections.forEach(section => {
            const coordinateY = section.offsetTop - 120;
            if (window.scrollY >= coordinateY) {
                operationalActiveId = section.getAttribute("id");
            }
        });

        operationalNavLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${operationalActiveId}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================================================
    // 06. RESPONSIVE MOBILE NAVIGATION PANEL INTERFACE CONTROLLER
    // ==========================================================================
    const hamburgerMenuTriggerBtn = document.querySelector(".hamburger");
    let mobileRouteOverlayContainer = document.getElementById("mobileNavMenu");

    if(!mobileRouteOverlayContainer) {
        // Build mobile matrix system row structural elements dynamically if missing from raw layouts
        mobileRouteOverlayContainer = document.createElement("div");
        mobileRouteOverlayContainer.id = "mobileNavMenu";
        mobileRouteOverlayContainer.className = "mobile-nav-overlay";
        mobileRouteOverlayContainer.innerHTML = `
            <div class="mobile-nav-modal">
                <a href="#home" class="mobile-nav-row active">Main Deck</a>
                <a href="#about" class="mobile-nav-row">Core Manifesto</a>
                <a href="#students" class="mobile-nav-row">Architect Directory</a>
                <a href="#videos" class="mobile-nav-row">Tectonic Reels</a>
                <a href="#developers" class="mobile-nav-row">Platform Engineers</a>
                <a href="#designers" class="mobile-nav-row">Identity Lab</a>
                <a href="#contact" class="mobile-nav-row">Synapse Terminal</a>
            </div>
        `;
        document.body.appendChild(mobileRouteOverlayContainer);
    }

    const compiledMobileActionRows = mobileRouteOverlayContainer.querySelectorAll(".mobile-nav-row");

    function toggleMobileNavigationOverlayMenu() {
        mobileRouteOverlayContainer.classList.toggle("open");
        hamburgerMenuTriggerBtn.classList.toggle("active");
    }

    hamburgerMenuTriggerBtn.addEventListener("click", toggleMobileNavigationOverlayMenu);
    mobileRouteOverlayContainer.addEventListener("click", toggleMobileNavigationOverlayMenu);
    compiledMobileActionRows.forEach(row => {
        row.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMobileNavigationOverlayMenu();
            const localTargetRoute = row.getAttribute("href");
            document.querySelector(localTargetRoute).scrollIntoView({ behavior: "smooth" });
        });
    });

    // ==========================================================================
    // 07. NUMERICAL METRIC COUNTER INCREMENT PIPELINES
    // ==========================================================================
    function initializeCountersEngine() {
        const statisticalCountersArray = document.querySelectorAll(".counter");
        
        statisticalCountersArray.forEach(counter => {
            const numericLimitTarget = parseInt(counter.getAttribute("data-target"));
            const speedIndexStep = numericLimitTarget / 100;
            let initializedValue = 0;

            const incrementRunner = () => {
                initializedValue += speedIndexStep;
                if (initializedValue < numericLimitTarget) {
                    counter.textContent = Math.ceil(initializedValue);
                    setTimeout(incrementRunner, 15);
                } else {
                    counter.textContent = numericLimitTarget;
                }
            };
            
            // Trigger loop processing automatically
            incrementRunner();
        });
    }

    // ==========================================================================
    // 08. STUDIO DIRECTORY FILTRATION & MATRIX INJECTION RENDER ENGINE
    // ==========================================================================
    const studentMatrixTargetContainer = document.getElementById("student-matrix-target");
    const structuralQueryFilterInputField = document.getElementById("student-search");
    const programmaticFilterTabActionButtons = document.querySelectorAll(".filter-tab");

    let currentSystemStudioFilterScope = "all";
    let currentSystemSearchQueryScope = "";

    function renderArchitectShieldMatrixGrid() {
        if(!studentMatrixTargetContainer) return;
        studentMatrixTargetContainer.innerHTML = "";

        const processedFilteredRecordsList = architectureCohortDatabase.filter(student => {
            const validationStudioMatch = currentSystemStudioFilterScope === "all" || student.studio === currentSystemStudioFilterScope;
            const validationSearchMatch = student.name.toLowerCase().includes(currentSystemSearchQueryScope) || 
                                           student.focus.toLowerCase().includes(currentSystemSearchQueryScope) ||
                                           student.roll.includes(currentSystemSearchQueryScope);
            return validationStudioMatch && validationSearchMatch;
        });

        if (processedFilteredRecordsList.length === 0) {
            studentMatrixTargetContainer.innerHTML = `
                <div class="glass-card" style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-muted-gray);">
                    NO ENCRYPTED ARCHITECT SHIELDS MATCH CURRENT QUERY STRUCTURES
                </div>
            `;
            return;
        }

        processedFilteredRecordsList.forEach((student, index) => {
            const cardShieldElement = document.createElement("div");
            cardShieldElement.className = "secure-student-shield";
            cardShieldElement.setAttribute("data-studio", student.studio);
            cardShieldElement.style.animation = `revealEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.05}s`;
            
            cardShieldElement.innerHTML = `
                <div class="shield-img-frame">
                    <span class="studio-badge">${student.studio.toUpperCase()}</span>
                    <img src="${student.img}" alt="${student.name}" loading="lazy">
                    <div class="encrypted-overlay-gfx"></div>
                </div>
                <div class="shield-meta-body">
                    <h3>${student.name}</h3>
                    <span class="dept-lbl">DEPT OF ARCHITECTURE // ID ${student.roll}</span>
                    <div class="skills-tags-cluster">
                        <span class="skill-tag">${student.focus}</span>
                        <span class="skill-tag">B.Arch '25</span>
                    </div>
                    <div class="shield-social-pipeline">
                        <div class="pipeline-links">
                            <a href="${student.fb}" target="_blank" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                            <a href="${student.lnk}" target="_blank" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                            <a href="${student.git}" target="_blank" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
                        </div>
                        <a href="#contact" class="btn btn-primary btn-sm" style="padding: 8px 16px; font-size: 0.65rem;">CONNECT</a>
                    </div>
                </div>
            `;
            
            // Attach interactive directional 3D parallax tilt effects securely
            apply3DTiltInteractionsToShieldElement(cardShieldElement);
            studentMatrixTargetContainer.appendChild(cardShieldElement);
        });
    }

    function apply3DTiltInteractionsToShieldElement(shieldItem) {
        shieldItem.addEventListener("mousemove", (event) => {
            const boundingMetrics = shieldItem.getBoundingClientRect();
            const coordinateX = event.clientX - boundingMetrics.left;
            const coordinateY = event.clientY - boundingMetrics.top;
            
            const middlePointX = boundingMetrics.width / 2;
            const middlePointY = boundingMetrics.height / 2;
            
            const calculationTiltAngleX = (middlePointY - coordinateY) / 12;
            const calculationTiltAngleY = (coordinateX - middlePointX) / 12;

            shieldItem.style.transform = `perspective(1000px) rotateX(${calculationTiltAngleX}deg) rotateY(${calculationTiltAngleY}deg) translateY(-5px)`;
        });

        shieldItem.addEventListener("mouseleave", () => {
            shieldItem.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    }

    if (structuralQueryFilterInputField) {
        structuralQueryFilterInputField.addEventListener("input", (e) => {
            currentSystemSearchQueryScope = e.target.value.toLowerCase();
            renderArchitectShieldMatrixGrid();
        });
    }

    programmaticFilterTabActionButtons.forEach(tab => {
        tab.addEventListener("click", () => {
            programmaticFilterTabActionButtons.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");
            currentSystemStudioFilterScope = tab.getAttribute("data-filter");
            renderArchitectShieldMatrixGrid();
        });
    });

    // Run layout render process immediately on script load execution
    renderArchitectShieldMatrixGrid();

    // ==========================================================================
    // 09. CINEMA VIDEO VIEWPORTS & CATEGORIES LIGHTBOX CORE
    // ==========================================================================
    const operationalCinemaPopupModal = document.getElementById("cinema-modal");
    const interactiveVideoFrameSource = document.getElementById("modal-video-frame");
    const compilationCloseTriggerElement = document.querySelector(".modal-close-trigger");
    const videoCategoryActionTabs = document.querySelectorAll(".video-tab");
    const functionalVideoShowcaseCards = document.querySelectorAll(".video-card-wrapper");

    document.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("play-trigger-btn")) {
            const structuralEmbedLink = event.target.getAttribute("data-video-url");
            if (interactiveVideoFrameSource && operationalCinemaPopupModal) {
                interactiveVideoFrameSource.src = structuralEmbedLink;
                operationalCinemaPopupModal.classList.add("open");
                document.body.classList.add("loading");
            }
        }
    });

    function closeCinemaLightboxWindow() {
        if (operationalCinemaPopupModal && interactiveVideoFrameSource) {
            operationalCinemaPopupModal.classList.remove("open");
            interactiveVideoFrameSource.src = "";
            document.body.classList.remove("loading");
        }
    }

    if (compilationCloseTriggerElement) {
        compilationCloseTriggerElement.addEventListener("click", closeCinemaLightboxWindow);
    }
    if (operationalCinemaPopupModal) {
        operationalCinemaPopupModal.addEventListener("click", closeCinemaLightboxWindow);
    }

    videoCategoryActionTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            videoCategoryActionTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const targetCategoryScope = tab.getAttribute("data-vcat");

            functionalVideoShowcaseCards.forEach(card => {
                if (targetCategoryScope === "all" || card.getAttribute("data-vcat") === targetCategoryScope) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ==========================================================================
    // 10. SYNAPSE CONTACT TRANSMISSION VALIDATION MACHINE
    // ==========================================================================
    const mainframeContactPipelineForm = document.getElementById("synapse-terminal-form");
    const pipelineFormWrapperBlock = document.querySelector(".contact-form-side");

    if (mainframeContactPipelineForm) {
        mainframeContactPipelineForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            let structuralValidationUptimeStatus = true;
            const collectionRequiredFormInputs = mainframeContactPipelineForm.querySelectorAll("input[required], textarea[required]");

            collectionRequiredFormInputs.forEach(input => {
                const structuralInputGroupWrapper = input.parentElement;
                if (!input.value.trim()) {
                    structuralInputGroupWrapper.classList.add("invalid");
                    structuralValidationUptimeStatus = false;
                } else if (input.type === "email" && !validateEmailFormatSignature(input.value)) {
                    structuralInputGroupWrapper.classList.add("invalid");
                    structuralValidationUptimeStatus = false;
                } else {
                    structuralInputGroupWrapper.classList.remove("invalid");
                }
            });

            if (structuralValidationUptimeStatus) {
                pipelineFormWrapperBlock.classList.add("submitting");
                
                // Emulate high-end network packet validation routing sequences
                setTimeout(() => {
                    pipelineFormWrapperBlock.classList.remove("submitting");
                    pipelineFormWrapperBlock.classList.add("success");
                    mainframeContactPipelineForm.reset();
                }, 2000);
            }
        });

        mainframeContactPipelineForm.querySelectorAll("input, textarea").forEach(field => {
            field.addEventListener("input", () => {
                const structuralInputGroupWrapper = field.parentElement;
                if (field.value.trim()) {
                    structuralInputGroupWrapper.classList.remove("invalid");
                }
            });
        });
    }

    function validateEmailFormatSignature(emailString) {
        const structuralRegexParser = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return structuralRegexParser.test(emailString);
    }
});
