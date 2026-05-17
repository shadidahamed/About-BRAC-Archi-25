/**
 * BRAC ARCHI SUMMER 26 RUNTIME ARCHITECTURE
 * Engineered for high-performance responsive operations
 */

// --- MODULE 1: HARDWARE & CURSOR TRACKS ---
const initializePreloader = () => {
    const loader = document.getElementById("preloader");
    if (!loader) return;
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("fade-out");
            document.body.classList.remove("loading");
        }, 500);
    }, { once: true });
};

const initializeAdaptiveCursors = () => {
    const cursor = document.getElementById("custom-cursor");
    const blur = document.getElementById("cursor-blur");
    if (!cursor || !blur) return;

    // Direct Check: Safely strip hardware overhead on touch/mobile devices
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

// --- MODULE 2: INTERACTIVE MENU AND ROUTING CHANNELS ---
const initializeSPARoutingAndMobileMenu = () => {
    const trigger = document.getElementById("mobileMenuTrigger");
    const menu = document.getElementById("navLinksMenu");
    const links = document.querySelectorAll("[data-target]");
    const sections = document.querySelectorAll(".spa-section");

    // Close Mobile Menu Interface
    const closeMobileMenu = () => {
        trigger?.classList.remove("active");
        menu?.classList.remove("open");
    };

    // Toggle 3-Bash State Menu
    trigger?.addEventListener("click", (e) => {
        e.stopPropagation();
        trigger.classList.toggle("active");
        menu.classList.toggle("open");
    });

    // Close on outer container baseline clicks
    document.addEventListener("click", () => closeMobileMenu());

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = link.dataset.target;
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            sections.forEach(s => s.classList.remove("active"));
            
            // Sync all active links mapping to this path
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

// --- MODULE 3: SCREENSHOT MATCHED 15-PANEL AUTOMATIC CYLINDER CAROUSEL ---
const initializeCampus15Carousel = () => {
    const stage = document.getElementById("campus15Stage3D");
    const panels = stage?.querySelectorAll(".screenshot-panel-card");
    if (!stage || !panels?.length) return;

    const totalNodes = panels.length; // 15 Panels
    const theta = 360 / totalNodes;
    
    const layoutRecompute = () => {
        // Automatically determine radius baseline depth calculations depending on actual element widths
        const panelWidth = panels[0].offsetWidth;
        let radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / totalNodes));
        
        // Manual scaling checks for absolute layout control constraints
        if (window.innerWidth <= 1024) radius = window.innerWidth <= 480 ? 235 : 320;

        panels.forEach((p, i) => {
            p.style.transform = `rotateY(${theta * i}deg) translateZ(${radius}px)`;
        });
    };

    layoutRecompute();
    window.addEventListener("resize", layoutRecompute, { passive: true });

    let rotationIndex = 0;
    const triggerRotationStep = () => {
        rotationIndex -= theta;
        // Keep perspective view perfectly consistent with the uploaded design snippet
        stage.style.transform = `translateZ(-750px) rotateX(-4deg) rotateY(${rotationIndex}deg)`;
    };

    // Smooth automatic rotation progression
    let intervalId = setInterval(triggerRotationStep, 3000);

    // Pause logic on active interface touch/mouse interaction states
    stage.addEventListener("mouseenter", () => clearInterval(intervalId));
    stage.addEventListener("touchstart", () => clearInterval(intervalId), { passive: true });
    stage.addEventListener("mouseleave", () => { intervalId = setInterval(triggerRotationStep, 3000); });
};

// --- MODULE 4: MOUSE ORIENTATION LOGO ENGAGEMENT MATRIX ---
const initializeLogoCardInteraction = () => {
    const card = document.getElementById("interactiveLogoCard");
    if (!card) return;

    // Bypass orientation math calculations on basic mobile setups for execution stability
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotX = ((y / rect.height) - 0.5) * -20;
        const rotY = ((x / rect.width) - 0.5) * 20;

        card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `rotateX(8deg) rotateY(-8deg) scale3d(1, 1, 1)`;
    });
};

// --- MODULE 5: UNRESTRICTED AUTOMATIC 360° ACHIEVEMENTS ENGINE ---
const initializeAchievementsCarousel = () => {
    const stage = document.getElementById("achievements3DStage");
    const panels = stage?.querySelectorAll(".achievement-panel");
    if (!stage || !panels?.length) return;

    const total = panels.length;
    const theta = 360 / total;

    const recomputeRadius = () => {
        let radius = Math.round((panels[0].offsetWidth / 2) / Math.tan(Math.PI / total));
        if (window.innerWidth <= 768) radius = window.innerWidth <= 480 ? 150 : 200;

        panels.forEach((p, i) => {
            p.style.transform = `rotateY(${theta * i}deg) translateZ(${radius}px)`;
        });
    };

    recomputeRadius();
    window.addEventListener("resize", recomputeRadius, { passive: true });

    let rotation = 0;
    let loopId = setInterval(() => {
        rotation -= theta;
        stage.style.transform = `translateZ(-500px) rotateY(${rotation}deg)`;
    }, 3500);

    stage.addEventListener("mouseenter", () => clearInterval(loopId));
    stage.addEventListener("touchstart", () => clearInterval(loopId), { passive: true });
    stage.addEventListener("mouseleave", () => {
        loopId = setInterval(() => {
            rotation -= theta;
            stage.style.transform = `translateZ(-500px) rotateY(${rotation}deg)`;
        }, 3500);
    });
};

// MASTER MATRIX EXECUTION PIPELINE
(() => {
    initializePreloader();
    window.addEventListener("DOMContentLoaded", () => {
        initializeAdaptiveCursors();
        initializeSPARoutingAndMobileMenu();
        initializeCampus15Carousel();
        initializeLogoCardInteraction();
        initializeAchievementsCarousel();
    });
})();
