/**
 * BRAC ARCHI SUMMER 26 ENGINE RUNTIME
 * Fully responsive, password-free architecture
 */

// --- MODULE 1: INTERACTIVE HARDWARE ENGINE SETUP ---
const initializePreloader = () => {
    const loader = document.getElementById("preloader");
    if (!loader) return;
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("fade-out");
            document.body.classList.remove("loading");
        }, 600);
    }, { once: true });
};

const initializeCursors = () => {
    const cursor = document.getElementById("custom-cursor");
    const blur = document.getElementById("cursor-blur");
    if (!cursor || !blur) return;

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

const initializeSPARouting = () => {
    const links = document.querySelectorAll("[data-target]");
    const sections = document.querySelectorAll(".spa-section");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSection = document.getElementById(link.dataset.target);
            if (!targetSection) return;

            sections.forEach(s => s.classList.remove("active"));
            links.forEach(l => l.classList.remove("active"));

            targetSection.classList.add("active");
            
            // Sync all duplicate navigation mapping selectors if present
            document.querySelectorAll(`[data-target="${link.dataset.target}"]`).forEach(activeLink => {
                activeLink.classList.add("active");
            });

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
};

// --- MODULE 2: CAMPUS ECOSYSTEM 3D ROTATION ---
const initialize3DCarousel = () => {
    const stage = document.getElementById("carousel3DStage");
    const panels = stage?.querySelectorAll(".carousel-3d-panel");
    if (!stage || !panels?.length) return;

    const total = panels.length;
    const theta = 360 / total;
    let radius = Math.round((panels[0].offsetWidth / 2) / Math.tan(Math.PI / total));
    let rotation = 0;

    panels.forEach((p, i) => {
        p.style.transform = `rotateY(${theta * i}deg) translateZ(${radius}px)`;
    });

    const updateStage = () => {
        stage.style.transform = `translateZ(-400px) rotateY(${rotation}deg)`;
    };

    document.getElementById("nextCarouselBtn")?.addEventListener("click", () => { rotation -= theta; updateStage(); });
    document.getElementById("prevCarouselBtn")?.addEventListener("click", () => { rotation += theta; updateStage(); });
    
    updateStage();
};

// --- MODULE 3: INTERACTIVE CURSOR ORIENTATION ENGINE (OUR LOGO CARD) ---
const initializeInteractiveLogoCard = () => {
    const card = document.getElementById("interactiveLogoCard");
    if (!card) return;

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        
        // Compute percentage deviations
        const rotateX = ((y / rect.height) - 0.5) * -25; // max tilt 25deg
        const rotateY = ((x / rect.width) - 0.5) * 25;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        // Smoothly restore default stylistic perspective layout rules
        card.style.transform = `rotateX(10deg) rotateY(-10deg) scale3d(1, 1, 1)`;
    });
};

// --- MODULE 4: UNRESTRICTED AUTOMATIC 360° ACHIEVEMENTS CAROUSEL ---
const initializeAchievementsEngine = () => {
    const stage = document.getElementById("achievements3DStage");
    const panels = stage?.querySelectorAll(".achievement-panel");
    if (!stage || !panels?.length) return;

    const total = panels.length;
    const theta = 360 / total;
    let radius = Math.round((panels[0].offsetWidth / 2) / Math.tan(Math.PI / total));
    
    // Scale tracking fallback adjustment rules for packed modular viewports
    if (window.innerWidth < 600) radius = 240;

    panels.forEach((p, i) => {
        p.style.transform = `rotateY(${theta * i}deg) translateZ(${radius}px)`;
    });

    let currentRotation = 0;
    const runAutomaticLoop = () => {
        currentRotation -= theta;
        stage.style.transform = `translateZ(-500px) rotateY(${currentRotation}deg)`;
    };

    // Spin matrix automatically every 3.5 seconds
    let systemLoopId = setInterval(runAutomaticLoop, 3500);

    stage.addEventListener("mouseenter", () => clearInterval(systemLoopId));
    stage.addEventListener("mouseleave", () => {
        systemLoopId = setInterval(runAutomaticLoop, 3500);
    });
};

// --- MODULE 5: GIS GEOSPATIAL MAP LINKERS ---
const initializeGISMap = () => {
    const hotspots = document.querySelectorAll(".interactive-map-hotspot");
    const iframe = document.querySelector("#developerLiveMapContainer iframe");

    hotspots.forEach(spot => {
        spot.addEventListener("click", () => {
            hotspots.forEach(h => h.classList.remove("active"));
            spot.classList.add("active");
            if (iframe && spot.dataset.coordinates) {
                iframe.src = `https://www.google.com/maps/embed?pb=${spot.dataset.coordinates}`;
            }
        });
    });
};

// INITIALIZE PLATFORM STACK ELEMENTS
(() => {
    initializePreloader();
    window.addEventListener("DOMContentLoaded", () => {
        initializeCursors();
        initializeSPARouting();
        initialize3DCarousel();
        initializeInteractiveLogoCard();
        initializeAchievementsEngine();
        initializeGISMap();
    });
})();
