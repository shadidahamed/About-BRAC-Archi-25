/**
 * ==========================================================================
 * BRACU Architecture Summer '26
 * Elite Interactive Runtime Engine
 * Fully Polished Production Script
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       01. CORE DATABASE
    ========================================================================== */

    const architectureCohortDatabase = [
        {
            id: "AS26-01",
            name: "Sadeed Ahmed",
            roll: "22101001",
            studio: "Studio X",
            focus: "Sustainable Climate Adaptations",
            merit: "1st Position",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
            git: "https://github.com",
            lnk: "https://linkedin.com",
            gmail: "sadeed.ahmed@g.bracu.ac.bd",
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
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
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
            studio: "Studio X",
            focus: "Deltaic Structural Integration",
            merit: "3rd Position",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
            git: "",
            lnk: "https://linkedin.com",
            gmail: "tahmid@bracu.ac.bd",
            fb: "",
            wa: ""
        },

        {
            id: "AS26-04",
            name: "Anika Bushra",
            roll: "22101004",
            studio: "Studio IX",
            focus: "High-Density Resilient Modules",
            merit: "4th Position",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
            git: "https://github.com",
            lnk: "",
            gmail: "anika@bracu.ac.bd",
            fb: "https://facebook.com",
            wa: ""
        }
    ];

    /* ==========================================================================
       02. PRELOADER
    ========================================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader?.classList.add("fade-out");
        }, 700);
    });

    /* ==========================================================================
       03. CUSTOM CURSOR
    ========================================================================== */

    const cursor = document.getElementById("custom-cursor");
    const blur = document.getElementById("cursor-blur");

    if (window.innerWidth > 768) {

        document.addEventListener("mousemove", (e) => {

            if (!cursor || !blur) return;

            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            blur.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, {
                duration: 250,
                fill: "forwards"
            });

        });

    }

    function initializeCursorInteractions() {

        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, .filter-tab"
        );

        interactiveElements.forEach((element) => {

            if (element.classList.contains("cursor-ready")) return;

            element.classList.add("cursor-ready");

            element.addEventListener("mouseenter", () => {

                if (!cursor || !blur) return;

                cursor.style.transform = "translate(-50%, -50%) scale(1.8)";

                blur.style.width = "90px";
                blur.style.height = "90px";

            });

            element.addEventListener("mouseleave", () => {

                if (!cursor || !blur) return;

                cursor.style.transform = "translate(-50%, -50%) scale(1)";

                blur.style.width = "320px";
                blur.style.height = "320px";

            });

            element.addEventListener("click", createRippleEffect);

        });

    }

    /* ==========================================================================
       04. RIPPLE EFFECT
    ========================================================================== */

    function createRippleEffect(event) {

        const button = event.currentTarget;

        const ripple = document.createElement("span");

        ripple.className = "ripple-wave";

        const rect = button.getBoundingClientRect();

        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    }

    /* ==========================================================================
       05. SPA NAVIGATION
    ========================================================================== */

    const sections = document.querySelectorAll(".spa-section");
    const routeLinks = document.querySelectorAll("[data-target]");

    function switchSection(sectionId) {

        sections.forEach((section) => {
            section.classList.remove("active");
        });

        routeLinks.forEach((link) => {
            link.classList.remove("active");
        });

        const activeSection = document.getElementById(sectionId);

        if (activeSection) {
            activeSection.classList.add("active");
        }

        document
            .querySelectorAll(`[data-target="${sectionId}"]`)
            .forEach((link) => {
                link.classList.add("active");
            });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    document.addEventListener("click", (event) => {

        const trigger = event.target.closest("[data-target]");

        if (!trigger) return;

        event.preventDefault();

        const target = trigger.getAttribute("data-target");

        switchSection(target);

    });

    /* ==========================================================================
       06. SEARCH + FILTER
    ========================================================================== */

    const studentGrid = document.getElementById("student-matrix-target");
    const searchInput = document.getElementById("student-search");
    const filterTabs = document.querySelectorAll(".filter-tab");

    let currentStudioFilter = "all";
    let currentSearch = "";

    function renderStudentCards() {

        if (!studentGrid) return;

        studentGrid.innerHTML = "";

        const filteredStudents = architectureCohortDatabase.filter((student) => {

            const studioMatch =
                currentStudioFilter === "all" ||
                student.studio === currentStudioFilter;

            const searchMatch =
                student.name.toLowerCase().includes(currentSearch) ||
                student.focus.toLowerCase().includes(currentSearch) ||
                student.roll.includes(currentSearch);

            return studioMatch && searchMatch;

        });

        if (filteredStudents.length === 0) {

            studentGrid.innerHTML = `
                <div class="glass-card" style="
                    padding:50px;
                    text-align:center;
                    grid-column:1/-1;
                ">
                    <h3 style="margin-bottom:10px;">No Results Found</h3>
                    <p style="color:var(--text-secondary);">
                        No architecture profile matched your search query.
                    </p>
                </div>
            `;

            return;

        }

        filteredStudents.forEach((student, index) => {

            let socialLinks = "";

            if (student.git) {
                socialLinks += `
                    <a href="${student.git}" target="_blank">
                        <i class="fa-brands fa-github"></i>
                    </a>
                `;
            }

            if (student.lnk) {
                socialLinks += `
                    <a href="${student.lnk}" target="_blank">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                `;
            }

            if (student.gmail) {
                socialLinks += `
                    <a href="mailto:${student.gmail}">
                        <i class="fa-solid fa-envelope"></i>
                    </a>
                `;
            }

            if (student.fb) {
                socialLinks += `
                    <a href="${student.fb}" target="_blank">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                `;
            }

            if (student.wa) {

                const cleaned = student.wa.replace(/[^\d]/g, "");

                socialLinks += `
                    <a href="https://wa.me/${cleaned}" target="_blank">
                        <i class="fa-brands fa-whatsapp"></i>
                    </a>
                `;
            }

            const card = document.createElement("div");

            card.className = "secure-student-shield";

            card.innerHTML = `
                <div class="shield-img-frame">

                    <span class="studio-badge">
                        ${student.studio}
                    </span>

                    <span class="merit-ranking-badge">
                        <i class="fa-solid fa-crown"></i>
                        ${student.merit}
                    </span>

                    <img src="${student.img}" alt="${student.name}">

                    <div class="encrypted-overlay-gfx"></div>

                </div>

                <div class="shield-meta-body">

                    <h3>${student.name}</h3>

                    <span class="dept-lbl">
                        B.ARCH GRADUATE // ID: ${student.roll}
                    </span>

                    <div class="skills-tags-cluster">
                        <span class="skill-tag">
                            ${student.focus}
                        </span>
                    </div>

                    <div class="shield-social-pipeline">

                        <div class="pipeline-links">
                            ${socialLinks}
                        </div>

                        <button
                            class="btn btn-primary btn-sm structural-comms-trigger"
                            data-name="${student.name}"
                            data-email="${student.gmail}"
                        >
                            Connect
                            <i class="fa-solid fa-paper-plane"></i>
                        </button>

                    </div>

                </div>

                <div class="admin-card-action-bar">

                    <button
                        class="btn-admin-action edit-profile-trigger"
                        data-index="${index}"
                    >
                        <i class="fa-solid fa-user-pen"></i>
                        Edit Profile
                    </button>

                </div>
            `;

            initialize3DTilt(card);

            studentGrid.appendChild(card);

        });

        initializeCursorInteractions();

    }

    /* ==========================================================================
       07. SEARCH EVENTS
    ========================================================================== */

    searchInput?.addEventListener("input", (e) => {

        currentSearch = e.target.value.toLowerCase();

        renderStudentCards();

    });

    filterTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            filterTabs.forEach((item) => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            currentStudioFilter = tab.dataset.filter;

            renderStudentCards();

        });

    });

    /* ==========================================================================
       08. 3D CARD TILT
    ========================================================================== */

    function initialize3DTilt(card) {

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
                translateY(-6px)
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
       09. EMAIL CONNECT SYSTEM
    ========================================================================== */

    document.addEventListener("click", (event) => {

        const trigger = event.target.closest(".structural-comms-trigger");

        if (!trigger) return;

        const email = trigger.dataset.email;
        const name = trigger.dataset.name;

        const subject = encodeURIComponent(
            "BRACU Architecture Summer '26 Platform Outreach"
        );

        const body = encodeURIComponent(
`Hello ${name},

I reviewed your architecture portfolio and would love to connect regarding your work and research.

Best Regards,
[Your Name]`
        );

        window.location.href =
            `mailto:${email}?subject=${subject}&body=${body}`;

    });

    /* ==========================================================================
       10. ADMIN AUTHENTICATION
    ========================================================================== */

    const AUTH_ID = "WEAREARCHITECTS";
    const AUTH_PASS = "WEAREBUILDERS";

    let adminLoggedIn = false;

    const authButton = document.getElementById("global-auth-btn");
    const authModal = document.getElementById("auth-modal");
    const closeAuthBtn = document.getElementById("close-auth-trigger");
    const executeAuthBtn = document.getElementById("execute-auth-action");

    authButton?.addEventListener("click", () => {

        if (adminLoggedIn) {

            adminLoggedIn = false;

            document.body.classList.remove("admin-mode");

            authButton.innerHTML = `
                <i class="fa-solid fa-lock"></i>
                Portal Login
            `;

            return;

        }

        authModal?.classList.add("open");

    });

    closeAuthBtn?.addEventListener("click", () => {
        authModal?.classList.remove("open");
    });

    executeAuthBtn?.addEventListener("click", () => {

        const id =
            document.getElementById("auth-id-input").value.trim();

        const pass =
            document.getElementById("auth-pass-input").value.trim();

        if (id === AUTH_ID && pass === AUTH_PASS) {

            adminLoggedIn = true;

            document.body.classList.add("admin-mode");

            authButton.innerHTML = `
                <i class="fa-solid fa-unlock-keyhole"></i>
                Exit Session
            `;

            authModal?.classList.remove("open");

            document.getElementById("auth-id-input").value = "";
            document.getElementById("auth-pass-input").value = "";

        } else {

            alert("Invalid credentials.");

        }

    });

    /* ==========================================================================
       11. EDIT PROFILE WORKBENCH
    ========================================================================== */

    const editorModal =
        document.getElementById("editor-workbench-modal");

    const closeWorkbenchBtn =
        document.getElementById("close-workbench-trigger");

    const saveWorkbenchBtn =
        document.getElementById("commit-workbench-changes");

    document.addEventListener("click", (event) => {

        const editTrigger =
            event.target.closest(".edit-profile-trigger");

        if (!editTrigger) return;

        const index = parseInt(editTrigger.dataset.index);

        const student = architectureCohortDatabase[index];

        document.getElementById("edit-index-target").value = index;
        document.getElementById("edit-name").value = student.name;
        document.getElementById("edit-focus").value = student.focus;
        document.getElementById("edit-img").value = student.img;
        document.getElementById("link-git").value = student.git;
        document.getElementById("link-lnk").value = student.lnk;
        document.getElementById("link-gmail").value = student.gmail;
        document.getElementById("link-fb").value = student.fb;
        document.getElementById("link-wa").value = student.wa;

        editorModal?.classList.add("open");

    });

    closeWorkbenchBtn?.addEventListener("click", () => {
        editorModal?.classList.remove("open");
    });

    saveWorkbenchBtn?.addEventListener("click", () => {

        const index = parseInt(
            document.getElementById("edit-index-target").value
        );

        architectureCohortDatabase[index].name =
            document.getElementById("edit-name").value;

        architectureCohortDatabase[index].focus =
            document.getElementById("edit-focus").value;

        architectureCohortDatabase[index].img =
            document.getElementById("edit-img").value;

        architectureCohortDatabase[index].git =
            document.getElementById("link-git").value;

        architectureCohortDatabase[index].lnk =
            document.getElementById("link-lnk").value;

        architectureCohortDatabase[index].gmail =
            document.getElementById("link-gmail").value;

        architectureCohortDatabase[index].fb =
            document.getElementById("link-fb").value;

        architectureCohortDatabase[index].wa =
            document.getElementById("link-wa").value;

        editorModal?.classList.remove("open");

        renderStudentCards();

    });

    /* ==========================================================================
       12. SCROLL TO TOP
    ========================================================================== */

    document
        .getElementById("scroll-to-top-action")
        ?.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    /* ==========================================================================
       13. INITIALIZE
    ========================================================================== */

    renderStudentCards();

    initializeCursorInteractions();

});
