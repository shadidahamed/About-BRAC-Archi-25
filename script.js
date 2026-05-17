/**
 * ==========================================================================
 * BRAC UNIVERSITY ARCHITECTURE SHOWCASE PLATFORM
 * UPGRADED MAINFRAME JAVASCRIPT ENGINE
 * ==========================================================================
 * Preserves:
 * - Original theme
 * - Original colors
 * - Original structure
 * - Original animations
 * - Original portfolio style
 * - Original architecture showcase feeling
 * 
 * Improves:
 * - Cursor responsiveness
 * - Navigation routing
 * - Mobile drawer
 * - Modal system
 * - Search & filtering
 * - Ripple effects
 * - Smooth animations
 * - Stability
 * - Performance
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       01. DATABASE ENGINE
    ========================================================================== */

    const architectureCohortDatabase = [
        {
            id: "AS26-01",
            name: "Sadeed Ahmed",
            roll: "22101001",
            studio: "Studio X",
            focus: "Sustainable Climate Adaptations",
            merit: "1st Position",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
            git: "https://github.com",
            lnk: "https://linkedin.com",
            gmail: "sadeed@g.bracu.ac.bd",
            fb: "https://facebook.com",
            wa: "+8801700000000"
        },
        {
            id: "AS26-02",
            name: "Nabil Chowdhury",
            roll: "22101002",
            studio: "Studio IX",
            focus: "Parametric Fluid Urbanism",
            merit: "2nd Position",
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
            git: "https://github.com",
            lnk: "https://linkedin.com",
            gmail: "nabil@g.bracu.ac.bd",
            fb: "https://facebook.com",
            wa: "+8801800000000"
        },
        {
            id: "AS26-03",
            name: "Tahmid Rahman",
            roll: "22101003",
            studio: "Studio VIII",
            focus: "Deltaic Structural Integration",
            merit: "3rd Position",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
            git: "",
            lnk: "https://linkedin.com",
            gmail: "tahmid@g.bracu.ac.bd",
            fb: "",
            wa: ""
        },
        {
            id: "AS26-04",
            name: "Anika Bushra",
            roll: "22101004",
            studio: "Studio IX",
            focus: "High Density Resilient Modules",
            merit: "4th Position",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
            git: "https://github.com",
            lnk: "",
            gmail: "anika@g.bracu.ac.bd",
            fb: "https://facebook.com",
            wa: ""
        }
    ];

    /* ==========================================================================
       02. PRELOADER ENGINE
    ========================================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }

            document.body.classList.remove("loading");
        }, 700);
    });

    /* ==========================================================================
       03. CUSTOM CURSOR SYSTEM (FIXED)
    ========================================================================== */

    const cursor = document.getElementById("custom-cursor");
    const blur = document.getElementById("cursor-blur");

    let mouseX = 0;
    let mouseY = 0;

    let blurX = 0;
    let blurY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursor) {
            cursor.style.left = mouseX + "px";
            cursor.style.top = mouseY + "px";
        }
    });

    function animateBlurCursor() {

        blurX += (mouseX - blurX) * 0.12;
        blurY += (mouseY - blurY) * 0.12;

        if (blur) {
            blur.style.left = blurX + "px";
            blur.style.top = blurY + "px";
        }

        requestAnimationFrame(animateBlurCursor);
    }

    animateBlurCursor();

    /* ==========================================================================
       04. CURSOR HOVER EFFECTS
    ========================================================================== */

    function initializeCursorInteractions() {

        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, .profile-grid-card, .filter-btn"
        );

        interactiveElements.forEach((element) => {

            if (element.dataset.cursorReady) return;

            element.dataset.cursorReady = "true";

            element.addEventListener("mouseenter", () => {

                if (cursor) {
                    cursor.style.width = "18px";
                    cursor.style.height = "18px";
                }

                if (blur) {
                    blur.style.width = "120px";
                    blur.style.height = "120px";
                    blur.style.opacity = "0.9";
                }
            });

            element.addEventListener("mouseleave", () => {

                if (cursor) {
                    cursor.style.width = "8px";
                    cursor.style.height = "8px";
                }

                if (blur) {
                    blur.style.width = "300px";
                    blur.style.height = "300px";
                    blur.style.opacity = "1";
                }
            });

            element.addEventListener("click", function (e) {

                const ripple = document.createElement("span");

                ripple.className = "ripple-wave";

                const rect = this.getBoundingClientRect();

                ripple.style.left = `${e.clientX - rect.left}px`;
                ripple.style.top = `${e.clientY - rect.top}px`;

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 700);
            });
        });
    }

    initializeCursorInteractions();

    /* ==========================================================================
       05. SPA ROUTER SYSTEM
    ========================================================================== */

    const sections = document.querySelectorAll(".spa-section");
    const routeLinks = document.querySelectorAll("[data-target]");

    function activateSection(sectionId) {

        sections.forEach((section) => {
            section.classList.remove("active");
        });

        const target = document.getElementById(sectionId);

        if (target) {
            target.classList.add("active");
        }

        routeLinks.forEach((link) => {
            link.classList.remove("active");

            if (
                link.dataset.target === sectionId &&
                link.classList.contains("nav-link")
            ) {
                link.classList.add("active");
            }
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    document.addEventListener("click", (e) => {

        const trigger = e.target.closest("[data-target]");

        if (!trigger) return;

        e.preventDefault();

        const targetId = trigger.dataset.target;

        activateSection(targetId);

        history.pushState(null, "", `#${targetId}`);

        mobileDrawer?.classList.remove("active");
    });

    /* ==========================================================================
       06. MOBILE DRAWER
    ========================================================================== */

    const hamburger = document.getElementById("hamburger-trigger");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");

    hamburger?.addEventListener("click", () => {

        mobileDrawer?.classList.toggle("active");

        hamburger.classList.toggle("active");
    });

    /* ==========================================================================
       07. STUDENT GRID RENDERER
    ========================================================================== */

    const grid = document.getElementById("student-matrix-target");

    let currentStudioFilter = "all";
    let currentSearch = "";

    function renderStudents() {

        if (!grid) return;

        grid.innerHTML = "";

        const filtered = architectureCohortDatabase.filter((student) => {

            const studioMatch =
                currentStudioFilter === "all" ||
                student.studio === currentStudioFilter;

            const searchMatch =
                student.name.toLowerCase().includes(currentSearch) ||
                student.focus.toLowerCase().includes(currentSearch) ||
                student.roll.includes(currentSearch);

            return studioMatch && searchMatch;
        });

        if (filtered.length === 0) {

            grid.innerHTML = `
                <div class="glass-card" style="grid-column:1/-1;text-align:center;">
                    <h3>No Architect Profiles Found</h3>
                </div>
            `;

            return;
        }

        filtered.forEach((student, index) => {

            const card = document.createElement("div");

            card.className = "profile-grid-card";

            let socials = "";

            if (student.git) {
                socials += `
                    <a class="comms-anchor" href="${student.git}" target="_blank">
                        <i class="fa-brands fa-github"></i>
                    </a>
                `;
            }

            if (student.lnk) {
                socials += `
                    <a class="comms-anchor" href="${student.lnk}" target="_blank">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                `;
            }

            if (student.gmail) {
                socials += `
                    <a class="comms-anchor" href="mailto:${student.gmail}">
                        <i class="fa-solid fa-envelope"></i>
                    </a>
                `;
            }

            if (student.fb) {
                socials += `
                    <a class="comms-anchor" href="${student.fb}" target="_blank">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                `;
            }

            if (student.wa) {

                const cleanWA = student.wa.replace(/[^\d]/g, "");

                socials += `
                    <a class="comms-anchor" href="https://wa.me/${cleanWA}" target="_blank">
                        <i class="fa-brands fa-whatsapp"></i>
                    </a>
                `;
            }

            card.innerHTML = `
                <div class="card-media-shell">
                    <img src="${student.img}" alt="${student.name}">
                    <span class="role-badge-pill architect-type">
                        ${student.studio}
                    </span>
                </div>

                <div class="card-profile-data-deck">

                    <h3>${student.name}</h3>

                    <p class="studio-track-text">
                        ${student.focus}
                    </p>

                    <div class="merit-rank-tag">
                        ${student.merit}
                    </div>

                    <div class="profile-comms-drawer">
                        ${socials}
                    </div>
                </div>
            `;

            apply3DTilt(card);

            grid.appendChild(card);
        });

        initializeCursorInteractions();
    }

    renderStudents();

    /* ==========================================================================
       08. SEARCH ENGINE
    ========================================================================== */

    const searchInput = document.getElementById("student-search");

    searchInput?.addEventListener("input", (e) => {

        currentSearch = e.target.value.toLowerCase();

        renderStudents();
    });

    /* ==========================================================================
       09. FILTER ENGINE
    ========================================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentStudioFilter = button.dataset.filter;

            renderStudents();
        });
    });

    /* ==========================================================================
       10. 3D CARD PARALLAX
    ========================================================================== */

    function apply3DTilt(card) {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 18;
            const rotateY = (x - centerX) / 18;

            card.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
            `;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = `
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0px)
            `;
        });
    }

    /* ==========================================================================
       11. SCROLL TO TOP
    ========================================================================== */

    const scrollBtn = document.getElementById("scroll-to-top-action");

    scrollBtn?.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /* ==========================================================================
       12. HERO BUTTON ANIMATIONS
    ========================================================================== */

    const heroButtons = document.querySelectorAll(".btn");

    heroButtons.forEach((btn) => {

        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-3px)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translateY(0px)";
        });
    });

    /* ==========================================================================
       13. ACTIVE HASH ROUTER
    ========================================================================== */

    const currentHash = window.location.hash.replace("#", "");

    if (currentHash) {
        activateSection(currentHash);
    } else {
        activateSection("home");
    }

    /* ==========================================================================
       14. SMOOTH SECTION REVEAL
    ========================================================================== */

    const revealElements = document.querySelectorAll(
        ".glass-card, .profile-grid-card"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";
            }
        });

    }, {
        threshold: 0.1
    });

    revealElements.forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "all 0.7s ease";

        observer.observe(element);
    });

});
