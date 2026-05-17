/**
 * BRAC ARCHI SUMMER 26 CORE INTERACTIVE RUNTIME
 * Preserving exact visual classes and functional behaviors
 */

const ArchitectDashboardState = {
    authenticatedMeritUser: null,
    profilesRegistry: Object.create(null)
};

// --- MODULE 1: HARDWARE INTERACTION ENGINES ---
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
            link.classList.add("active");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
};

// --- MODULE 2: 3D CYLINDRICAL PHYSICS CAROUSEL ---
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

// --- MODULE 3: STUDENT DATA MATRICES (1 TO 225) ---
const initializeStudentMatrix = () => {
    const grid = document.getElementById("architectsMatrixGrid");
    if (!grid) return;

    // Prefill memory stack parameters
    for (let i = 1; i <= 225; i++) {
        ArchitectDashboardState.profilesRegistry[i] = {
            linksVisible: i === 1,
            roll: `26101${String(i).padStart(3, '0')}`,
            portfolio: i === 1 ? "https://github.com/shadid-zombie-killer" : ""
        };
    }
    syncPrivacyLocks();
};

const syncPrivacyLocks = () => {
    const cards = document.querySelectorAll(".student-profile-card");
    const activeUser = ArchitectDashboardState.authenticatedMeritUser;

    cards.forEach(card => {
        const id = parseInt(card.dataset.merit, 10);
        const data = ArchitectDashboardState.profilesRegistry[id];
        const lock = card.querySelector(".privacy-lock-icon");
        if (!data) return;

        const isUnlocked = data.linksVisible || activeUser === id;
        if (isUnlocked) {
            card.classList.remove("profile-links-locked");
            if (lock) lock.className = "privacy-lock-icon fa-solid fa-lock-open";
        } else {
            card.classList.add("profile-links-locked");
            if (lock) lock.className = "privacy-lock-icon fa-solid fa-lock";
        }
    });
};

window.handleFieldWorkWorkspace = (id) => {
    const data = ArchitectDashboardState.profilesRegistry[id];
    if (data?.linksVisible || ArchitectDashboardState.authenticatedMeritUser === id) {
        alert(`Access Allowed: Spawning encrypted field sandbox window for tracking index allocation ID: #${id}.`);
    } else {
        alert("Restricted Access: Provide accurate verification values inside the Portal Access tab.");
    }
};

// --- MODULE 4: TERMINAL CONTROL PANELS ---
const initializePortalTerminal = () => {
    const authView = document.getElementById("portalAuthView");
    const dashboardView = document.getElementById("portalDashboardView");

    document.getElementById("executeLoginBtn")?.addEventListener("click", () => {
        const roll = document.getElementById("authRollInput").value.trim();
        const pin = document.getElementById("authPinInput").value.trim();

        if (roll === "26101001" && pin === "2026") {
            ArchitectDashboardState.authenticatedMeritUser = 1;
            authView.classList.add("hidden-panel-layer");
            dashboardView.classList.remove("hidden-panel-layer");
            syncPrivacyLocks();
        } else {
            alert("Verification Failed: Cryptographic parameters are invalid.");
        }
    });

    document.getElementById("executeLogoutBtn")?.addEventListener("click", () => {
        ArchitectDashboardState.authenticatedMeritUser = null;
        dashboardView.classList.add("hidden-panel-layer");
        authView.classList.remove("hidden-panel-layer");
        syncPrivacyLocks();
    });
};

// --- MODULE 5: GIS MAPPING HUB ---
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

// RUN INITIALIZATION BLOCKS
(() => {
    initializePreloader();
    window.addEventListener("DOMContentLoaded", () => {
        initializeCursors();
        initializeSPARouting();
        initialize3DCarousel();
        initializeStudentMatrix();
        initializePortalTerminal();
        initializeGISMap();
    });
})();
