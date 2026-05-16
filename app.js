// PRELOADER
window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("fade-out");

        document.body.classList.remove("loading");

    }, 800);

});

// CURSOR ENGINE
const cursor =
    document.getElementById("custom-cursor");

const blur =
    document.getElementById("cursor-blur");

if (cursor && blur) {

    document.body.classList.add(
        "custom-cursor-enabled"
    );

    window.addEventListener(
        "mousemove",
        (e) => {

            const x = e.clientX;
            const y = e.clientY;

            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;

            blur.style.left = `${x}px`;
            blur.style.top = `${y}px`;
        }
    );

    const hoverTargets =
        document.querySelectorAll(
            "a, button, .btn, .nav-link"
        );

    hoverTargets.forEach((item) => {

        item.addEventListener(
            "mouseenter",
            () => {

                blur.style.width = "70px";
                blur.style.height = "70px";
            }
        );

        item.addEventListener(
            "mouseleave",
            () => {

                blur.style.width = "34px";
                blur.style.height = "34px";
            }
        );
    });
}

// SPA NAVIGATION
const navLinks =
    document.querySelectorAll("[data-target]");

const sections =
    document.querySelectorAll(".spa-section");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const target =
            link.dataset.target;

        sections.forEach((section) => {
            section.classList.remove("active");
        });

        navLinks.forEach((btn) => {
            btn.classList.remove("active");
        });

        const activeSection =
            document.getElementById(target);

        if (activeSection) {

            activeSection.classList.add("active");
        }

        if (link.classList.contains("nav-link")) {

            link.classList.add("active");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

// ========================================================================
// MODULE 2: HIGH-PERFORMANCE 3D CIRCULAR CAROUSEL DRIVER
// ========================================================================

const initialize3DCarousel = () => {
    const stage = document.getElementById("carousel3DStage");
    const panels = document.querySelectorAll(".carousel-3d-panel");
    const prevBtn = document.getElementById("prevCarouselBtn");
    const nextBtn = document.getElementById("nextCarouselBtn");

    if (!stage || panels.length === 0) return;

    const totalPanels = panels.length;
    const theta = 360 / totalPanels;
    
    // Programmatically calculate dynamic spatial radius based on component widths
    const panelWidth = panels[0].offsetWidth;
    // High premium geometry formula: Radius = (width / 2) / tan(PI / totalPanels)
    const radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / totalPanels));

    let currentRotationAngle = 0;
    let autoScrollTimer = null;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    // Apply calculated 3D geometric layout positioning matrices to panels
    const setupPanelsGeometry = () => {
        panels.forEach((panel, i) => {
            const angle = theta * i;
            panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });
    };

    const updateStageTransform = () => {
        // Enforce mobile-first depth responsiveness inside translation layer
        const depthZ = window.innerWidth < 768 ? -300 : -400;
        stage.style.transform = `translateZ(${depthZ}px) rotateY(${currentRotationAngle}deg)`;
    };

    const rotateNext = () => {
        currentRotationAngle -= theta;
        updateStageTransform();
    };

    const rotatePrev = () => {
        currentRotationAngle += theta;
        updateStageTransform();
    };

    // Auto-Scroll Interval configuration with absolute 2-second delay logic
    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollTimer = setInterval(() => {
            rotateNext();
        }, 2000);
    };

    const stopAutoScroll = () => {
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
    };

    // UI Click Event Bindings
    nextBtn.addEventListener("click", () => {
        stopAutoScroll();
        rotateNext();
        startAutoScroll();
    });

    prevBtn.addEventListener("click", () => {
        stopAutoScroll();
        rotatePrev();
        startAutoScroll();
    });

    // High Performance Touch/Drag Hardware Mapping
    const handleDragStart = (clientX) => {
        isDragging = true;
        stopAutoScroll();
        startX = clientX;
        stage.style.transition = 'none'; // Temporarily bypass interpolation for real-time tracking
    };

    const handleDragMove = (clientX) => {
        if (!isDragging) return;
        currentX = clientX;
        const deltaX = currentX - startX;
        // Transform pixel tracking distance to fine angular parameters
        const trackingFactor = 0.25; 
        const temporaryRotation = currentRotationAngle + (deltaX * trackingFactor);
        const depthZ = window.innerWidth < 768 ? -300 : -400;
        stage.style.transform = `translateZ(${depthZ}px) rotateY(${temporaryRotation}deg)`;
    };

    const handleDragEnd = (clientX) => {
        if (!isDragging) return;
        isDragging = false;
        stage.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        const deltaX = clientX - startX;
        
        // Snap configuration logic to closest angular step if threshold crossed
        if (Math.abs(deltaX) > 40) {
            if (deltaX > 0) {
                currentRotationAngle += theta;
            } else {
                currentRotationAngle -= theta;
            }
        }
        updateStageTransform();
        startAutoScroll();
    };

    // Event Listeners for Desktop Devices
    stage.addEventListener("mousedown", (e) => handleDragStart(e.clientX));
    window.addEventListener("mousemove", (e) => handleDragMove(e.clientX));
    window.addEventListener("mouseup", (e) => handleDragEnd(e.clientX));

    // Event Listeners for Mobile Devices (Touch Optimized)
    stage.addEventListener("touchstart", (e) => handleDragStart(e.touches[0].clientX), { passive: true });
    stage.addEventListener("touchmove", (e) => handleDragMove(e.touches[0].clientX), { passive: true });
    stage.addEventListener("touchend", (e) => handleDragEnd(e.changedTouches[0].clientX), { passive: true });

    // Initialize Layout Assets
    setupPanelsGeometry();
    updateStageTransform();
    startAutoScroll();

    // Recalculate dimensions dynamically on viewport shift
    window.addEventListener("resize", () => {
        const newWidth = panels[0].offsetWidth;
        const newRadius = Math.round((newWidth / 2) / Math.tan(Math.PI / totalPanels));
        panels.forEach((panel, i) => {
            const angle = theta * i;
            panel.style.transform = `rotateY(${angle}deg) translateZ(${newRadius}px)`;
        });
        updateStageTransform();
    });
};

// Hook into existing window load flow to ensure zero render blocks
window.addEventListener("DOMContentLoaded", () => {
    initialize3DCarousel();
});

// ========================================================================
// MODULE 3: FUTURE ARCHITECTS STATE ENGINE & PRIVACY DRIVER
// ========================================================================

// High-Performance State Registry representing live dashboard profile structures
const ArchitectDashboardState = {
    // Shared global state tracking authenticated user keys
    authenticatedMeritUser: null, // Stores active Merit position index when logged in
    
    // In-memory mock mapping illustrating which keys have actively shared links
    // Set up as a boolean map index to track author sharing states cleanly
    profilesRegistry: {}
};

// Programmatically generate runtime configuration frameworks for positions 1 to 225
const initializeArchitectsStateEngine = () => {
    const gridContainer = document.getElementById("architectsMatrixGrid");
    if (!gridContainer) return;

    // Pre-populate data parameters tracking author interaction sharing permissions
    for (let meritIndex = 1; meritIndex <= 225; meritIndex++) {
        // Sample validation mapping: profile 1 is shared by default, others require verification
        ArchitectDashboardState.profilesRegistry[meritIndex] = {
            linksSharedAndVerified: meritIndex === 1, // Only merit position 1 starts with open access
            rollNumber: `26101${String(meritIndex).padStart(3, '0')}`
        };
    }

    // Refresh layout view rendering tokens based on privacy rules
    syncProfilePrivacyStates();
};

// System function parsing permission variables and toggling visual states
const syncProfilePrivacyStates = () => {
    const cards = document.querySelectorAll(".architect-profile-card");
    const activeUser = ArchitectDashboardState.authenticatedMeritUser;

    cards.forEach(card => {
        const meritId = parseInt(card.dataset.merit, 10);
        const profileData = ArchitectDashboardState.profilesRegistry[meritId];
        const lockIcon = card.querySelector(".lock-status-indicator");
        
        if (!profileData) return;

        // Privacy Validation Policy Ruleset:
        // Links open up if the author has verified sharing OR if they match the active user login session
        const accessGranted = profileData.linksSharedAndVerified || (activeUser === meritId);

        if (accessGranted) {
            card.classList.remove("profile-links-locked");
            if (lockIcon) {
                lockIcon.className = "fa-solid fa-lock-open lock-status-indicator";
            }
        } else {
            // Restrict views across components if data is flagged private by default
            card.classList.add("profile-links-locked");
            if (lockIcon) {
                lockIcon.className = "fa-solid fa-lock lock-status-indicator";
            }
        }
    });
};

// Action controller route handling view navigation events smoothly
const handleFieldWorkNavigation = (meritId) => {
    const profileData = ArchitectDashboardState.profilesRegistry[meritId];
    const activeUser = ArchitectDashboardState.authenticatedMeritUser;
    
    if (!profileData) return;
    
    const isAllowed = profileData.linksSharedAndVerified || (activeUser === meritId);
    
    if (!isAllowed) {
        alert(`Security Access Violation: Field Work for Position Portfolio [Merit ${meritId}] is restricted. Authentication required.`);
        return;
    }

    // Standard path redirect if access criteria met smoothly
    console.log(`Dispatched field tracking view execution pipeline route for architect merit position: ${meritId}`);
    alert(`Success: Loading encrypted field work workspace for Merit Position ${meritId}...`);
};

// Safe bootstrap assignment hanging on DOM ready processes
window.addEventListener("DOMContentLoaded", () => {
    initializeArchitectsStateEngine();
});

// ========================================================================
// MODULE 4: ARCHITECT SECURE PORTAL CONTROLLER LOGIC
// ========================================================================

const initializeSecurePortalEngine = () => {
    const loginBtn = document.getElementById("executeLoginBtn");
    const logoutBtn = document.getElementById("executeLogoutBtn");
    const saveChangesBtn = document.getElementById("saveProfileChangesBtn");
    
    if (!loginBtn || !logoutBtn || !saveChangesBtn) return;

    // UI Panel Pointers
    const authView = document.getElementById("portalAuthView");
    const dashboardView = document.getElementById("portalDashboardView");

    // Login Action Verification Controller
    loginBtn.addEventListener("click", () => {
        const rollInput = document.getElementById("authRollInput").value.trim();
        const pinInput = document.getElementById("authPinInput").value.trim();

        // Security Credentials Check (Demo Parameters)
        if (rollInput === "26101001" && pinInput === "2026") {
            // Set session authorization identity
            ArchitectDashboardState.authenticatedMeritUser = 1; 
            
            // Toggle Visibility States across Portal panels
            authView.classList.add("hidden-workspace-layer");
            dashboardView.classList.remove("hidden-workspace-layer");

            // Update state sync triggers across Module 3
            if (typeof syncProfilePrivacyStates === "function") {
                syncProfilePrivacyStates();
            }

            alert("Access Granted: Security credentials confirmed. Welcome back, Shadid.");
        } else {
            alert("Security Access Denied: Invalid Roll Number or Pin combination. Please check the fallback info.");
        }
    });

    // Session Termination Controller
    logoutBtn.addEventListener("click", () => {
        // Purge session variables
        ArchitectDashboardState.authenticatedMeritUser = null;

        // Clear sensitive security entry form views
        document.getElementById("authRollInput").value = "";
        document.getElementById("authPinInput").value = "";

        // Reset workspace panel layers
        dashboardView.classList.add("hidden-workspace-layer");
        authView.classList.remove("hidden-workspace-layer");

        // Sync privacy block limits back down to directory matrix profiles
        if (typeof syncProfilePrivacyStates === "function") {
            syncProfilePrivacyStates();
        }

        alert("Session Ended: Secure connection closed successfully.");
    });

    // Dashboard Form Update Controller
    saveChangesBtn.addEventListener("click", () => {
        const activeUserId = ArchitectDashboardState.authenticatedMeritUser;
        if (!activeUserId) return;

        const updatedPortfolioUrl = document.getElementById("editPortfolioUrl").value.trim();
        const updatedPrivacyState = document.getElementById("editPrivacyToggle").checked;

        // Save updated input structures back into memory storage registry
        if (ArchitectDashboardState.profilesRegistry[activeUserId]) {
            ArchitectDashboardState.profilesRegistry[activeUserId].linksSharedAndVerified = updatedPrivacyState;
        }

        // Apply visual updates to link anchors across Module 3
        const targetCard = document.querySelector(`.architect-profile-card[data-merit="${activeUserId}"]`);
        if (targetCard) {
            const portfolioAnchor = targetCard.querySelector(".link-portfolio");
            if (portfolioAnchor && updatedPortfolioUrl) {
                portfolioAnchor.setAttribute("href", updatedPortfolioUrl);
            }
        }

        // Run visibility sync to apply privacy layout updates live
        if (typeof syncProfilePrivacyStates === "function") {
            syncProfilePrivacyStates();
        }

        alert("System Notification: Profile settings updated and deployed to the dynamic roster registry.");
    });
};

// Bind portal functions safely into DOM execution tree
window.addEventListener("DOMContentLoaded", () => {
    initializeSecurePortalEngine();
});
