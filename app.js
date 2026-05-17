/**
 * BRAC ARCHI SUMMER 26 RUNTIME ARCHITECTURE
 * Fully Optimized for Smooth 360 Rotation, Zoom Lightbox & Mobile Scroll Safety Lock
 */

// --- MODULE 1: HARDWARE LAYER PRELOADER & ADAPTIVE CURSOR ---
const initializePreloader = () => {
    const loader = document.getElementById("preloader");
    if (!loader) return;
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("fade-out");
            document.body.classList.remove("loading");
        }, 400);
    }, { once: true });
};

const initializeAdaptiveCursors = () => {
    const cursor = document.getElementById("custom-cursor");
    const blur = document.getElementById("cursor-blur");
    if (!cursor || !blur) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        blur.style.display = 'none';
        return;
    }

    document.body.classList.add("custom-cursor-enabled");
    let frameId = null;

    window.addEventListener("mousemove", (e) => {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            blur.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    }, { passive: true });
};

// --- MODULE 2: NAVIGATION CHANNELS WITH MOBILE BACKGROUND SCROLL LOCK ---
const initializeSPARoutingAndMobileMenu = () => {
    const trigger = document.getElementById("mobileMenuTrigger");
    const menu = document.getElementById("navLinksMenu");
    const links = document.querySelectorAll("[data-target]");
    const sections = document.querySelectorAll(".spa-section");

    const closeMobileMenu = () => {
        trigger?.classList.remove("active");
        menu?.classList.remove("open");
        // Remove scroll lock to restore native user interaction
        document.body.classList.remove("menu-open-locked");
    };

    trigger?.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menu?.classList.toggle("open");
        trigger.classList.toggle("active");
        
        // FLAWLESS FIX: Prevent background context moving if mobile navigation menu layer is open
        if (isOpen) {
            document.body.classList.add("menu-open-locked");
        } else {
            document.body.classList.remove("menu-open-locked");
        }
    });

    document.addEventListener("click", () => closeMobileMenu());

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = link.dataset.target;
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            sections.forEach(s => s.classList.remove("active"));
            
            document.querySelectorAll("[data-target]").forEach(l => {
                if (l.dataset.target === targetId) l.classList.add("active");
                else l.classList.remove("active");
            });

            targetSection.classList.add("active");
            closeMobileMenu();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
};

// --- MODULE 3: 360 DEGREE ROTATION CYLINDER PORTAL ENGINE (15 PANELS) ---
const initializeCampus15Carousel = () => {
    const stage = document.getElementById("campus15Stage3D");
    const panels = stage?.querySelectorAll(".screenshot-panel-card");
    const lightbox = document.getElementById("lightboxOverlay");
    const lightboxText = document.getElementById("lightboxText");
    if (!stage || !panels?.length) return;

    const totalNodes = panels.length; // Exactly 15 Items
    const theta = 360 / totalNodes;   // 24 Degrees separation mapping
    let currentIndex = 0;             // Track current element facing front
    let autoRotationInterval = null;

    // Computational Radius formulation to eliminate overlap completely
    const computeLayoutDimensions = () => {
        const cardWidth = panels[0].offsetWidth;
        // Core mathematical formula to keep objects equidistant in space: r = w / (2 * tan(PI / n))
        let radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / totalNodes));
        
        // Manual scaling check buffer safeguards for compact device screen layers
        if (window.innerWidth <= 1024) radius = window.innerWidth <= 480 ? 220 : 310;

        panels.forEach((panel, i) => {
            panel.style.transform = `rotateY(${theta * i}deg) translateZ(${radius}px)`;
        });
        
        syncCenterNodeHighlight();
    };

    // Highlight and scale the single node currently presented in front
    const syncCenterNodeHighlight = () => {
        // Calculate the positive normalized node index facing the front viewport coordinates
        let visualFrontIndex = Math.round(-currentIndex % totalNodes);
        if (visualFrontIndex < 0) visualFrontIndex += totalNodes;

        panels.forEach((p, idx) => {
            if (idx === visualFrontIndex) {
                p.classList.add("active-center-node");
            } else {
                p.classList.remove("active-center-node");
            }
        });
    };

    const updateStageRotation = () => {
        const angle = theta * currentIndex;
        // Keep precise fixed screenshot perspective pitch while updating dynamic yaw values
        stage.style.transform = `translateZ(-850px) rotateX(-5deg) rotateY(${angle}deg)`;
        syncCenterNodeHighlight();
    };

    // SPEED DECREASED BY 1 SECOND (Runs auto rotation tracking every 2000ms safely)
    const runAutoCycleEngine = () => {
        autoRotationInterval = setInterval(() => {
            currentIndex--; // Step smoothly counter-clockwise
            updateStageRotation();
        }, 2000);
    };

    const killAutoCycleEngine = () => {
        if (autoRotationInterval) clearInterval(autoRotationInterval);
    };

    // Click To Zoom Portal Logic Implementation
    panels.forEach(panel => {
        panel.addEventListener("click", (e) => {
            e.stopPropagation();
            killAutoCycleEngine();

            // Populate text parameters inside the dynamic glass overlay frame structure
            if (lightbox && lightboxText) {
                lightboxText.textContent = panel.querySelector("span")?.textContent || "Campus View";
                lightbox.classList.add("active");
                document.body.classList.add("menu-open-locked"); // Frame lock for absolute stability
            }
        });
    });

    // Dismiss zoom state and return elements to native positions gracefully
    lightbox?.addEventListener("click", () => {
        lightbox.classList.remove("active");
        document.body.classList.remove("menu-open-locked");
        killAutoCycleEngine();
        runAutoCycleEngine();
    });

    // Layout events
    computeLayoutDimensions();
    window.addEventListener("resize", computeLayoutDimensions, { passive: true });
    
    // Core engine activation
    runAutoCycleEngine();

    // Interaction stability configurations
    stage.addEventListener("mouseenter", killAutoCycleEngine);
    stage.addEventListener("touchstart", killAutoCycleEngine, { passive: true });
    stage.addEventListener("mouseleave", () => {
        if (!lightbox?.classList.contains("active")) runAutoCycleEngine();
    });
};

// --- MODULE 4: BRAND PROFILE IDENTITY ENGAGEMENT MOUSE MATHS ---
const initializeLogoCardInteraction = () => {
    const card = document.getElementById("interactiveLogoCard");
    if (!card || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rX = ((y / rect.height) - 0.5) * -15;
        const rY = ((x / rect.width) - 0.5) * 15;
        card.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
};

// MASTER ENGINE BOOTSTRAP INITIALIZATION
(() => {
    initializePreloader();
    window.addEventListener("DOMContentLoaded", () => {
        initializeAdaptiveCursors();
        initializeSPARoutingAndMobileMenu();
        initializeCampus15Carousel();
        initializeLogoCardInteraction();
    });
})();
