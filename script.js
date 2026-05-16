/**
 * BRACU Architecture Summer '26 - Mainframe Core Framework Runtime Engine
 * Client-Side State Controller, Custom Cursor Matrix & Authentication Portal
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 01. STUDENT DATABASE (DYNAMICALLY EDITABLE VIA LOCAL APPLICATION RAM MEMORY)
    // ==========================================================================
    const architectureCohortDatabase = [
        { id: "AS26-01", name: "Sadeed Ahmed", roll: "22101001", studio: "Studio X", focus: "Sustainable Climate Adaptations", merit: "1st Position", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80", git: "https://github.com", lnk: "https://linkedin.com", gmail: "sadeed.ahmed@g.bracu.ac.bd", fb: "https://facebook.com", wa: "+8801700000000" },
        { id: "AS26-02", name: "Nabil Chowdhury", roll: "22101002", studio: "Studio IX", focus: "Parametric Fluid Urbanism", merit: "2nd Position", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80", git: "https://github.com", lnk: "https://linkedin.com", gmail: "", fb: "https://facebook.com", wa: "" },
        { id: "AS26-03", name: "Tahmid Rahman", roll: "22101003", studio: "Studio X", focus: "Deltaic Structural Integration", merit: "3rd Position", img: "", git: "", lnk: "https://linkedin.com", gmail: "tahmid@bracu.ac.bd", fb: "", wa: "" },
        { id: "AS26-04", name: "Anika Bushra", roll: "22101004", studio: "Studio IX", focus: "High-Density Resilient Modules", merit: "4th Position", img: "", git: "https://github.com", lnk: "", gmail: "anika@bracu.ac.bd", fb: "https://facebook.com", wa: "" }
    ];

    // ==========================================================================
    // 02. EXCLUSIVE CUSTOM CURSOR INTERACTIVE DRIVER
    // ==========================================================================
    const customCursorDot = document.getElementById("custom-cursor");
    const customCursorBlur = document.getElementById("cursor-blur");

    document.addEventListener("mousemove", (e) => {
        if (customCursorDot && customCursorBlur) {
            customCursorDot.style.left = `${e.clientX}px`;
            customCursorDot.style.top = `${e.clientY}px`;
            
            customCursorBlur.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 250, fill: "forwards" });
        }
    });

    function registerCursorHoverScaleInteractions() {
        document.querySelectorAll("a, button, .filter-tab, .secure-student-shield, [data-target], input, textarea").forEach(element => {
            // Guard clause to ensure interaction events don't pile up redundantly
            if (element.classList.contains('cursor-mapped')) return;
            element.classList.add('cursor-mapped');

            element.addEventListener("mouseenter", () => {
                if (customCursorBlur) {
                    customCursorBlur.style.width = "55px";
                    customCursorBlur.style.height = "55px";
                    customCursorBlur.style.background = "rgba(171, 34, 41, 0.05)";
                    customCursorBlur.style.borderColor = "var(--primary-neon)";
                }
            });
            element.addEventListener("mouseleave", () => {
                if (customCursorBlur) {
                    customCursorBlur.style.width = "34px";
                    customCursorBlur.style.height = "34px";
                    customCursorBlur.style.background = "rgba(171, 34, 41, 0.02)";
                    customCursorBlur.style.borderColor = "rgba(171, 34, 41, 0.3)";
                }
            });
            
            element.addEventListener("click", function(e) {
                let rect = this.getBoundingClientRect();
                let coordinateX = e.clientX - rect.left;
                let coordinateY = e.clientY - rect.top;
                
                let waveNode = document.createElement("span");
                waveNode.className = "ripple-wave";
                waveNode.style.left = `${coordinateX}px`;
                waveNode.style.top = `${coordinateY}px`;
                
                this.appendChild(waveNode);
                setTimeout(() => { waveNode.remove(); }, 600);
            });
        });
    }

    // ==========================================================================
    // 03. SPA VIEW MANAGEMENT ROUTER ENGINE
    // ==========================================================================
    const appSectionsList = document.querySelectorAll(".spa-section");
    const globalAppNavLinks = document.querySelectorAll("[data-target]");

    function switchApplicationActiveView(targetSectionId) {
        if (!document.getElementById(targetSectionId)) return;
        window.scrollTo({ top: 0, behavior: "instant" });

        appSectionsList.forEach(section => {
            section.classList.remove("active");
            if (section.id === targetSectionId) section.classList.add("active");
        });

        globalAppNavLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-target") === targetSectionId && link.classList.contains("nav-link")) {
                link.classList.add("active");
            }
        });

        if (targetSectionId === "about") triggerStatisticalCounterIncrements();
    }

    document.addEventListener("click", (event) => {
        const closestRouteTrigger = event.target.closest("[data-target]");
        if (closestRouteTrigger && !closestRouteTrigger.classList.contains('btn-sm') && !closestRouteTrigger.classList.contains('nav-logo')) {
            event.preventDefault();
            const targetRouteViewId = closestRouteTrigger.getAttribute("data-target");
            switchApplicationActiveView(targetRouteViewId);
            history.pushState(null, null, `#${targetRouteViewId}`);
        }
    });

    // ==========================================================================
    // 04. AUTHENTICATION PROTECTION SUBSYSTEM (GATEWAY ACCESS CONTROLS)
    // ==========================================================================
    const AUTH_ID_VAL = "WEAREARCHITECTS";
    const AUTH_PASS_VAL = "WEAREBUILDERS";
    let platformAdminSessionActive = false;

    const globalAuthToggleBtn = document.getElementById("global-auth-btn");
    const authOverlayModalFrame = document.getElementById("auth-modal");
    const closeAuthModalBtn = document.getElementById("close-auth-trigger");
    const executeAuthSubmissionBtn = document.getElementById("execute-auth-action");
    const authErrorTerminalPanel = document.getElementById("auth-error-output");

    globalAuthToggleBtn?.addEventListener("click", () => {
        if (platformAdminSessionActive) {
            // Log out workflow sequence
            platformAdminSessionActive = false;
            document.body.classList.remove("admin-mode");
            globalAuthToggleBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Portal Login`;
            globalAuthToggleBtn.classList.remove("logged-in");
            executeCohortGridRenderProcess();
        } else {
            authOverlayModalFrame?.classList.add("open");
        }
    });

    closeAuthModalBtn?.addEventListener("click", () => {
        authOverlayModalFrame?.classList.remove("open");
        authErrorTerminalPanel?.classList.remove("visible");
    });

    executeAuthSubmissionBtn?.addEventListener("click", () => {
        const providedId = document.getElementById("auth-id-input").value;
        const providedPass = document.getElementById("auth-pass-input").value;

        if (providedId === AUTH_ID_VAL && providedPass === AUTH_PASS_VAL) {
            platformAdminSessionActive = true;
            document.body.classList.add("admin-mode");
            globalAuthToggleBtn.innerHTML = `<i class="fa-solid fa-unlock-keyhole"></i> Exit Session`;
            globalAuthToggleBtn.classList.add("logged-in");
            
            // Wipe internal authentication layout fields for safety
            document.getElementById("auth-id-input").value = "";
            document.getElementById("auth-pass-input").value = "";
            authOverlayModalFrame?.classList.remove("open");
            authErrorTerminalPanel?.classList.remove("visible");
            
            executeCohortGridRenderProcess();
        } else {
            authErrorTerminalPanel?.classList.add("visible");
        }
    });

    // ==========================================================================
    // 05. DIRECTORY MATRIX CORE COMPILER & LINK FILTER CONDITIONAL badgeS
    // ==========================================================================
    const targetStudentGridContainer = document.getElementById("student-matrix-target");
    const runtimeSearchQueryInputField = document.getElementById("student-search");
    const filterSelectionTabsList = document.querySelectorAll(".filter-tab");

    let directoryFilterStudioString = "all";
    let directorySearchQueryString = "";

    function executeCohortGridRenderProcess() {
        if (!targetStudentGridContainer) return;
        targetStudentGridContainer.innerHTML = "";

        const coordinatedFilteredList = architectureCohortDatabase.filter((student, index) => {
            student.originalIndex = index; // Map memory slot pointer reference
            const parseStudioEvaluation = directoryFilterStudioString === "all" || student.studio === directoryFilterStudioString;
            const parseSearchEvaluation = student.name.toLowerCase().includes(directorySearchQueryString) ||
                                           student.focus.toLowerCase().includes(directorySearchQueryString) ||
                                           student.roll.includes(directorySearchQueryString);
            return parseStudioEvaluation && parseSearchEvaluation;
        });

        if (coordinatedFilteredList.length === 0) {
            targetStudentGridContainer.innerHTML = `
                <div style="grid-column:1/-1; padding:50px; text-align:center; color:var(--text-muted-gray);" class="glass-card">
                   No graduate architect records match the specified execution parameters.
                </div>
            `;
            return;
        }

        coordinatedFilteredList.forEach((student) => {
            const shieldCardNode = document.createElement("div");
            shieldCardNode.className = "secure-student-shield";

            // Establish fallbacks if images are missing or empty strings
            const avatarDisplaySrc = student.img ? student.img : `https://picsum.photos/id/${(student.originalIndex * 7) % 90 + 10}/600/500`;
            const displayMeritNode = student.merit ? `<span class="merit-ranking-badge"><i class="fa-solid fa-crown"></i> ${student.merit}</span>` : '';

            // Generate conditional social linkage icons array elements based directly on string presence
            let contextualPipelineLinksGfx = '';
            if (student.git) contextualPipelineLinksGfx += `<a href="${student.git}" target="_blank" title="GitHub"><i class="fa-brands fa-github"></i></a>`;
            if (student.lnk) contextualPipelineLinksGfx += `<a href="${student.lnk}" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>`;
            if (student.gmail) contextualPipelineLinksGfx += `<a href="mailto:${student.gmail}" target="_blank" title="Gmail"><i class="fa-solid fa-envelope"></i></a>`;
            if (student.fb) contextualPipelineLinksGfx += `<a href="${student.fb}" target="_blank" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>`;
            if (student.wa) {
                // Ensure international schema formatting rules are maintained safely
                const numericalSanitizedString = student.wa.replace(/[^\d+]/g, '');
                contextualPipelineLinksGfx += `<a href="https://wa.me/${numericalSanitizedString}" target="_blank" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`;
            }

            shieldCardNode.innerHTML = `
                <div class="shield-img-frame">
                    <span class="studio-badge">${student.studio.toUpperCase()}</span>
                    ${displayMeritNode}
                    <img src="${avatarDisplaySrc}" alt="${student.name}" loading="lazy">
                    <div class="encrypted-overlay-gfx"></div>
                </div>
                <div class="shield-meta-body">
                    <h3>${student.name}</h3>
                    <span class="dept-lbl">B.ARCH GRADUATE // ID: ${student.roll}</span>
                    <div class="skills-tags-cluster">
                        <span class="skill-tag">${student.focus}</span>
                    </div>
                    <div class="shield-social-pipeline">
                        <div class="pipeline-links">${contextualPipelineLinksGfx}</div>
                        <button class="btn btn-primary btn-sm structural-comms-trigger" data-email="${student.gmail || 'archisummer26@bracu.ac.bd'}" data-name="${student.name}">
                            Connect <i class="fa-solid fa-paper-plane" style="font-size:0.6rem;"></i>
                        </button>
                    </div>
                </div>
                <div class="admin-card-action-bar">
                    <button class="btn-admin-action edit-profile-trigger" data-index="${student.originalIndex}"><i class="fa-solid fa-user-pen"></i> Edit Profile</button>
                </div>
            `;

            attachAdvanced3DParallaxTiltActions(shieldCardNode);
            targetStudentGridContainer.appendChild(shieldCardNode);
        });

        registerCursorHoverScaleInteractions();
    }

    // ==========================================================================
    // 06. DYNAMIC PROFILE WORKBENCH EDITOR FRAME CONTROLS
    // ==========================================================================
    const workbenchModalOverlayFrame = document.getElementById("editor-workbench-modal");
    const saveWorkbenchChangesBtn = document.getElementById("commit-workbench-changes");

    document.addEventListener("click", (e) => {
        const targetEditBtn = e.target.closest(".edit-profile-trigger");
        if (targetEditBtn) {
            const memoryIndexPointer = parseInt(targetEditBtn.getAttribute("data-index"));
            const dataRecordInstance = architectureCohortDatabase[memoryIndexPointer];

            document.getElementById("edit-index-target").value = memoryIndexPointer;
            document.getElementById("edit-name").value = dataRecordInstance.name;
            document.getElementById("edit-focus").value = dataRecordInstance.focus;
            document.getElementById("edit-img").value = dataRecordInstance.img;
            document.getElementById("link-git").value = dataRecordInstance.git;
            document.getElementById("link-lnk").value = dataRecordInstance.lnk;
            document.getElementById("link-gmail").value = dataRecordInstance.gmail;
            document.getElementById("link-fb").value = dataRecordInstance.fb;
            document.getElementById("link-wa").value = dataRecordInstance.wa;

            // Trigger dynamic input floating labels on injection updates
            workbenchModalOverlayFrame?.querySelectorAll(".input-glow-group input").forEach(input => {
                if(input.value.trim()) input.placeholder = " ";
            });

            workbenchModalOverlayFrame?.classList.add("open");
        }
    });

    document.getElementById("close-workbench-trigger")?.addEventListener("click", () => {
        workbenchModalOverlayFrame?.classList.remove("open");
    });

    saveWorkbenchChangesBtn?.addEventListener("click", () => {
        const targetingIndexId = parseInt(document.getElementById("edit-index-target").value);
        
        // Write changes directly back into internal memory allocation array
        architectureCohortDatabase[targetingIndexId].name = document.getElementById("edit-name").value.trim();
        architectureCohortDatabase[targetingIndexId].focus = document.getElementById("edit-focus").value.trim();
        architectureCohortDatabase[targetingIndexId].img = document.getElementById("edit-img").value.trim();
        architectureCohortDatabase[targetingIndexId].git = document.getElementById("link-git").value.trim();
        architectureCohortDatabase[targetingIndexId].lnk = document.getElementById("link-lnk").value.trim();
        architectureCohortDatabase[targetingIndexId].gmail = document.getElementById("link-gmail").value.trim();
        architectureCohortDatabase[targetingIndexId].fb = document.getElementById("link-fb").value.trim();
        architectureCohortDatabase[targetingIndexId].wa = document.getElementById("link-wa").value.trim();

        workbenchModalOverlayFrame?.classList.remove("open");
        executeCohortGridRenderProcess();
    });

    // ==========================================================================
    // 07. PROFILE EMAIL INITIATOR PATHFLOW LINKAGE
    // ==========================================================================
    document.addEventListener("click", (e) => {
        const commsTriggerNode = e.target.closest(".structural-comms-trigger");
        if (commsTriggerNode) {
            const targetedAddress = commsTriggerNode.getAttribute("data-email");
            const targetedStudentName = commsTriggerNode.getAttribute("data-name");
            
            const structuredSubjectLine = encodeURIComponent(`BRACU Archi Summer '26 Platform Outreach Communication`);
            const structuredBodyBlueprint = encodeURIComponent(`Hello ${targetedStudentName},\n\nI reviewed your graduate profile architectural portfolio details on the showcase archive and would like to connect to discuss your work.\n\nBest regards,\n[Your Name Here]`);

            // Execute client mail agent handshakes
            window.location.href = `mailto:${targetedAddress}?subject=${structuredSubjectLine}&body=${structuredBodyBlueprint}`;
        }
    });

    // ==========================================================================
    // 08. ADDITIONAL SYSTEM UTILITIES & LIGHTBOX AUXILIARIES
    // ==========================================================================
    function attachAdvanced3DParallaxTiltActions(shieldElement) {
        shieldElement.addEventListener("mousemove", (event) => {
            const metrics = shieldElement.getBoundingClientRect();
            const mouseX = event.clientX - metrics.left;
            const mouseY = event.clientY - metrics.top;
            const centralAxisX = metrics.width / 2;
            const centralAxisY = metrics.height / 2;
            const rotateX = (centralAxisY - mouseY) / 14;
            const rotateY = (mouseX - centralAxisX) / 14;

            shieldElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
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

    const globalCinemaOverlayPopup = document.getElementById("cinema-modal");
    const targetVideoIframeNode = document.getElementById("modal-video-frame");
    document.querySelector(".modal-close-trigger")?.addEventListener("click", () => {
        if(globalCinemaOverlayPopup && targetVideoIframeNode) {
            globalCinemaOverlayPopup.classList.remove("open");
            targetVideoIframeNode.src = "";
            document.body.classList.remove("loading");
        }
    });

    const sitePreloaderElement = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (sitePreloaderElement) {
                sitePreloaderElement.classList.add("fade-out");
                document.body.classList.remove("loading");
            }
        }, 800);
    });

    function triggerStatisticalCounterIncrements() {
        document.querySelectorAll(".counter").forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"));
            let step = 0;
            const rate = Math.max(Math.ceil(target / 50), 1);
            const run = () => {
                step += rate;
                if (step < target) {
                    counter.textContent = step;
                    setTimeout(run, 20);
                } else {
                    counter.textContent = target;
                }
            };
            run();
        });
    }

    document.getElementById("scroll-to-top-action")?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Execute core baseline renders directly on compilation initialization steps
    executeCohortGridRenderProcess();
});
