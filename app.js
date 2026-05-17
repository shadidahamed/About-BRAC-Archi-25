/**
 * ARCHITECTURAL SINGLE PAGE APPLICATION ENGINE
 * High-Performance Control Script & Unified State Interface
 * Production Release Build v2.6.4
 */

// ========================================================================
// SYSTEM RECOGNITION REGISTRY (CENTRAL DATA DECOUPLING LAYER)
// ========================================================================
const ArchitectDashboardState = {
    authenticatedMeritUser: null, // Tracks active verified array position index
    profilesRegistry: Object.create(null) // Ultra-clean dictionary tracking optimization keys
};

// ========================================================================
// MODULE 1: CORE ENGINE (PRELOADER, NAVIGATION & HARDWARE INTERACTIONS)
// ========================================================================

/**
 * Manages viewport-blocking DOM entities safely after style initialization.
 */
const initializePreloaderLifecycle = () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("fade-out");
            document.body.classList.remove("loading");
        }, 800);
    }, { once: true });
};

/**
 * Controls fluid mouse elements with hardware acceleration.
 */
const initializeCursorEngine = () => {
    const cursor = document.getElementById("custom-cursor");
    const blur = document.getElementById("cursor-blur");
    if (!cursor || !blur) return;

    document.body.classList.add("custom-cursor-enabled");

    let animationFrameId = null;

    window.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Decouple mouse layout computation loops using requestAnimationFrame (60hz+ performance)
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            blur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }, { passive: true });

    // Dynamic Hover Scaling Interaction Pipelines via Delegation
    document.body.addEventListener("mouseenter", (e) => {
        if (e.target.matches?.("a, button, .btn, .nav-link, .architect-profile-card, .interactive-map-hotspot")) {
            blur.style.width = "70px";
            blur.style.height = "70px";
        }
    }, true);

    document.body.addEventListener("mouseleave", (e) => {
        if (e.target.matches?.("a, button, .btn, .nav-link, .architect-profile-card, .interactive-map-hotspot")) {
            blur.style.width = "34px";
            blur.style.height = "34px";
        }
    }, true);
};

/**
 * Operates Single Page Application active state toggles cleanly.
 */
const initializeSPARoutingEngine = () => {
    const navLinks = document.querySelectorAll("[data-target]");
    const sections = document.querySelectorAll(".spa-section");
    if (!navLinks.length || !sections.length) return;

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            const activeSection = document.getElementById(target);

            if (!activeSection) return;

            // Clear active routing representations
            sections.forEach((section) => section.classList.remove("active"));
            navLinks.forEach((btn) => btn.classList.remove("active"));

            // Inject structural activation states
            activeSection.classList.add("active");
            if (link.classList.contains("nav-link")) {
                link.classList.add("active");
            }

            // Smooth linear viewport tracking reset
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
};


// ========================================================================
// MODULE 2: HIGH-PERFORMANCE 3D CIRCULAR CAROUSEL DRIVER
// ========================================================================

const initialize3DCarousel = () => {
    const stage = document.getElementById("carousel3DStage");
    const panels = document.querySelectorAll(".carousel-3d-panel");
    const prevBtn = document.getElementById("prevCarouselBtn");
    const nextBtn = document.getElementById("nextCarouselBtn");

    if (!stage || !panels.length) return;

    const totalPanels = panels.length;
    const theta = 360 / totalPanels;
    
    let panelWidth = panels[0].offsetWidth;
    let radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / totalPanels));

    let currentRotationAngle = 0;
    let autoScrollTimer = null;
    let isDragging = false;
    let startX = 0;

    const setupPanelsGeometry = () => {
        panels.forEach((panel, i) => {
            const angle = theta * i;
            panel.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });
    };

    const updateStageTransform = () => {
        const depthZ = window.innerWidth < 768 ? -300 : -400;
        stage.style.transform = `translateZ(${depthZ}px) rotateY(${currentRotationAngle}deg)`;
    };

    const rotateNext = () => { currentRotationAngle -= theta; updateStageTransform(); };
    const rotatePrev = () => { currentRotationAngle += theta; updateStageTransform(); };

    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollTimer = setInterval(rotateNext, 2000);
    };

    const stopAutoScroll = () => {
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
    };

    if (nextBtn) {
        nextBtn.addEventListener("click", () => { stopAutoScroll(); rotateNext(); startAutoScroll(); });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => { stopAutoScroll(); rotatePrev(); startAutoScroll(); });
    }

    // Touch & Drag Tracking Interaction Matrices
    const handleDragStart = (clientX) => {
        isDragging = true;
        stopAutoScroll();
        startX = clientX;
        stage.style.transition = 'none';
    };

    const handleDragMove = (clientX) => {
        if (!isDragging) return;
        const deltaX = clientX - startX;
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
        
        if (Math.abs(deltaX) > 40) {
            if (deltaX > 0) currentRotationAngle += theta;
            else currentRotationAngle -= theta;
        }
        updateStageTransform();
        startAutoScroll();
    };

    // Desktop Hardware Maps
    stage.addEventListener("mousedown", (e) => handleDragStart(e.clientX));
    window.addEventListener("mousemove", (e) => handleDragMove(e.clientX));
    window.addEventListener("mouseup", (e) => handleDragEnd(e.clientX));

    // Touch-Optimized Hardware Maps
    stage.addEventListener("touchstart", (e) => handleDragStart(e.touches[0].clientX), { passive: true });
    stage.addEventListener("touchmove", (e) => handleDragMove(e.touches[0].clientX), { passive: true });
    stage.addEventListener("touchend", (e) => handleDragEnd(e.changedTouches[0].clientX), { passive: true });

    // Build Stage Layout Bounds
    setupPanelsGeometry();
    updateStageTransform();
    startAutoScroll();

    // Debounced Viewport Structural Adaptation
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            panelWidth = panels[0].offsetWidth;
            radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / totalPanels));
            setupPanelsGeometry();
            updateStageTransform();
        }, 100);
    }, { passive: true });
};


// ========================================================================
// MODULE 3: FUTURE ARCHITECTS STATE ENGINE & PRIVACY DRIVER
// ========================================================================

const initializeArchitectsStateEngine = () => {
    const gridContainer = document.getElementById("architectsMatrixGrid");
    if (!gridContainer) return;

    // Populating baseline data attributes safely without prototypes pollution risks
    for (let meritIndex = 1; meritIndex <= 225; meritIndex++) {
        ArchitectDashboardState.profilesRegistry[meritIndex] = {
            linksSharedAndVerified: meritIndex === 1, // Global Access Permission Default Settings (Position 1 Open)
            rollNumber: `26101${String(meritIndex).padStart(3, '0')}`,
            portfolioUrl: meritIndex === 1 ? "https://github.com/shadid-zombie-killer" : ""
        };
    }

    syncProfilePrivacyStates();
};

const syncProfilePrivacyStates = () => {
    const cards = document.querySelectorAll(".architect-profile-card");
    const activeUser = ArchitectDashboardState.authenticatedMeritUser;

    cards.forEach(card => {
        const meritId = parseInt(card.dataset.merit, 10);
        const profileData = ArchitectDashboardState.profilesRegistry[meritId];
        const lockIcon = card.querySelector(".lock-status-indicator");
        
        if (!profileData) return;

        // Internal Cryptographic Verification Verification Model
        const accessGranted = profileData.linksSharedAndVerified || (activeUser === meritId);

        if (accessGranted) {
            card.classList.remove("profile-links-locked");
            if (lockIcon) lockIcon.className = "fa-solid fa-lock-open lock-status-indicator";
            
            const portfolioAnchor = card.querySelector(".link-portfolio");
            if (portfolioAnchor && profileData.portfolioUrl) {
                portfolioAnchor.setAttribute("href", profileData.portfolioUrl);
            }
        } else {
            card.classList.add("profile-links-locked");
            if (lockIcon) lockIcon.className = "fa-solid fa-lock lock-status-indicator";
        }
    });
};

const handleFieldWorkNavigation = (meritId) => {
    const profileData = ArchitectDashboardState.profilesRegistry[meritId];
    const activeUser = ArchitectDashboardState.authenticatedMeritUser;
    
    if (!profileData) return;
    
    const isAllowed = profileData.linksSharedAndVerified || (activeUser === meritId);
    
    if (!isAllowed) {
        alert(`Security Access Violation: Field Work for Position Portfolio [Merit ${meritId}] is restricted. Authentication required.`);
        return;
    }

    alert(`Success: Loading encrypted field work workspace for Merit Position ${meritId}...`);
};


// ========================================================================
// MODULE 4: NEW ARCHITECT MODAL MANAGEMENT & ACCOUNT OVERLAY ENGINE
// ========================================================================

const initializeArchitectModalEngine = () => {
    const openModalBtn = document.getElementById("openPortalModalBtn");
    const closeModalBtn = document.getElementById("closePortalModalBtn");
    const modalOverlay = document.getElementById("portalModalOverlay");
    
    if (!modalOverlay) return;

    const authView = document.getElementById("portalAuthView");
    const dashboardView = document.getElementById("portalDashboardView");
    
    const loginBtn = document.getElementById("executeLoginBtn");
    const logoutBtn = document.getElementById("executeLogoutBtn");
    const saveChangesBtn = document.getElementById("saveProfileChangesBtn");

    const dismissModal = () => {
        modalOverlay.classList.remove("modal-active");
        document.body.style.overflow = "";
    };

    if (openModalBtn) {
        openModalBtn.addEventListener("click", () => {
            modalOverlay.classList.add("modal-active");
            document.body.style.overflow = "hidden"; // Retain absolute focus locks
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener("click", dismissModal);
    
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) dismissModal();
    });

    // Integrated Security Verification Pipeline
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const rollInput = document.getElementById("authRollInput").value.trim();
            const pinInput = document.getElementById("authPinInput").value.trim();

            if (rollInput === "26101001" && pinInput === "2026") {
                ArchitectDashboardState.authenticatedMeritUser = 1;
                
                authView.classList.add("hidden-workspace-layer");
                dashboardView.classList.remove("hidden-workspace-layer");

                syncProfilePrivacyStates();
                alert("Access Granted: Welcome back, Shadid.");
            } else {
                alert("Security Access Denied: Invalid cryptographic parameters.");
            }
        });
    }

    // Dynamic Session Cleansing
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            ArchitectDashboardState.authenticatedMeritUser = null;

            document.getElementById("authRollInput").value = "";
            document.getElementById("authPinInput").value = "";

            dashboardView.classList.add("hidden-workspace-layer");
            authView.classList.remove("hidden-workspace-layer");

            syncProfilePrivacyStates();
            alert("Session Ended: Secure variables purged safely.");
        });
    }

    // System Attribute State Commits
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener("click", () => {
            const activeUserId = ArchitectDashboardState.authenticatedMeritUser;
            if (!activeUserId) return;

            const updatedPortfolioUrl = document.getElementById("editPortfolioUrl").value.trim();
            const updatedPrivacyState = document.getElementById("editPrivacyToggle").checked;

            if (ArchitectDashboardState.profilesRegistry[activeUserId]) {
                ArchitectDashboardState.profilesRegistry[activeUserId].linksSharedAndVerified = updatedPrivacyState;
                if (updatedPortfolioUrl) {
                    ArchitectDashboardState.profilesRegistry[activeUserId].portfolioUrl = updatedPortfolioUrl;
                }
            }

            syncProfilePrivacyStates();
            alert("System Notification: Profile variables synchronized successfully.");
            dismissModal();
        });
    }
};


// ========================================================================
// MODULE 5: DEVELOPERS PROFILE COLUMN & GEOSPATIAL INFRASTRUCTURE
// ========================================================================

const initializeDevelopersEngine = () => {
    const contactForm = document.getElementById("developerContactForm");
    const mapContainer = document.getElementById("developerLiveMapContainer");
    const mapHotspots = document.querySelectorAll(".interactive-map-hotspot");

    // Secure Pipeline Form Parsing
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const senderName = document.getElementById("devContactName").value.trim();
            const senderEmail = document.getElementById("devContactEmail").value.trim();
            const messageBody = document.getElementById("devContactMessage").value.trim();

            if (!senderName || !senderEmail || !messageBody) {
                alert("Input Verification Failure: All communication parameters must be supplied.");
                return;
            }

            alert(`Transmission Successful: Thank you, ${senderName}. Your query has been successfully routed.`);
            contactForm.reset();
        });
    }

    // Dynamic Geospatial Infrastructure Controllers
    if (mapHotspots.length && mapContainer) {
        const iframeElement = mapContainer.querySelector("iframe");
        
        mapHotspots.forEach(hotspot => {
            hotspot.addEventListener("click", () => {
                const targetCoordinates = hotspot.dataset.coordinates;
                
                if (iframeElement && targetCoordinates) {
                    // Update layout frame cleanly with no runtime interruptions
                    iframeElement.src = `https://www.google.com/maps/embed?pb=${targetCoordinates}`;
                }
            });
        });
    }
};


// ========================================================================
// CORE BOOTSTRAP INITIALIZATION PIPELINE
// ========================================================================
(() => {
    initializePreloaderLifecycle();
    
    window.addEventListener("DOMContentLoaded", () => {
        initializeCursorEngine();
        initializeSPARoutingEngine();
        initialize3DCarousel();
        initializeArchitectsStateEngine();
        initializeArchitectModalEngine();
        initializeDevelopersEngine();
    });
})();
