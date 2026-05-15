// ======================================================
// BRACU ARCHI '25 — PREMIUM ARCHIVE SYSTEM
// Advanced UI Controller / Clean Manual Database Engine
// ======================================================

// ------------------------------------------------------
// MANUAL STUDENT DATABASE
// Owner can manually add/remove/update students here
// ------------------------------------------------------

const studentsDatabase = [
    {
        id: 1,
        name: "Shadid Ahamed",
        roll: "20101045",
        merit: "01",
        studio: "Studio VII",
        focus: "Digital Fabrication & UX",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
        email: "shadid@g.bracu.ac.bd",

        whatsapp: "https://wa.me/8801700000000",
        linkedin: "https://linkedin.com/",
        facebook: "https://facebook.com/"
    },

    {
        id: 2,
        name: "Tasnim Alam",
        roll: "20101046",
        merit: "02",
        studio: "Studio VI",
        focus: "Urban Housing Systems",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
        email: "tasnim@g.bracu.ac.bd",

        linkedin: "https://linkedin.com/"
    },

    {
        id: 3,
        name: "Zainab Faruqui",
        roll: "20101047",
        merit: "03",
        studio: "Studio VII",
        focus: "Sustainability & Climate",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
        email: "zainab@g.bracu.ac.bd",

        facebook: "https://facebook.com/"
    },

    {
        id: 4,
        name: "Abrar Khan",
        roll: "20101048",
        merit: "04",
        studio: "Studio VI",
        focus: "Parametric Systems",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
        email: "abrar@g.bracu.ac.bd"
    }
];

// ------------------------------------------------------
// GLOBAL STATES
// ------------------------------------------------------

let activeFilter = "ALL";

// ------------------------------------------------------
// DESKTOP + MOBILE NAVIGATION
// ------------------------------------------------------

function showSection(id, element = null) {

    // Sections
    document.querySelectorAll("section").forEach(section => {
        section.classList.remove("active");
    });

    const targetSection = document.getElementById(id);

    if (targetSection) {
        targetSection.classList.add("active");
    }

    // Desktop Nav
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

    // Mobile Nav Sync
    document.querySelectorAll(".mobile-nav-row").forEach(row => {

        row.classList.remove("active");

        const clickData = row.getAttribute("onclick");

        if (clickData && clickData.includes(id)) {
            row.classList.add("active");
        }
    });

    // Scroll Reset
    const main = document.getElementById("main-scroll");

    if (main) {
        main.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

// ------------------------------------------------------
// MOBILE MENU
// ------------------------------------------------------

function toggleMobileNavPanel() {

    const panel = document.getElementById("m-nav-overlay");

    if (!panel) return;

    panel.classList.toggle("open");
}

function triggerMobileRoute(id) {

    showSection(id);

    toggleMobileNavPanel();
}

// ------------------------------------------------------
// DARK MODE ENGINE
// ------------------------------------------------------

function toggleTheme() {

    const body = document.body;

    if (body.hasAttribute("data-theme")) {

        body.removeAttribute("data-theme");

        localStorage.setItem("theme", "light");

    } else {

        body.setAttribute("data-theme", "dark");

        localStorage.setItem("theme", "dark");
    }
}

// Restore theme
function initializeTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.setAttribute("data-theme", "dark");
    }
}

// ------------------------------------------------------
// STUDENT FILTER ENGINE
// ------------------------------------------------------

function setFilter(filterName, button) {

    activeFilter = filterName;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    renderArchiveCards();
}

function filterStudents() {

    renderArchiveCards();
}

// ------------------------------------------------------
// STUDENT CARD RENDER SYSTEM
// ------------------------------------------------------

function renderArchiveCards() {

    const target = document.getElementById("student-cards-target");

    if (!target) return;

    const searchInput = document.getElementById("student-search");

    const searchValue = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    target.innerHTML = "";

    // Filtering
    const filteredStudents = studentsDatabase.filter(student => {

        const matchesSearch =
            student.name.toLowerCase().includes(searchValue) ||
            student.focus.toLowerCase().includes(searchValue) ||
            student.roll.includes(searchValue);

        if (activeFilter === "ALL") {

            return matchesSearch;
        }

        if (
            activeFilter === "Studio VII" ||
            activeFilter === "Studio VI"
        ) {

            return matchesSearch &&
                student.studio === activeFilter;
        }

        return (
            matchesSearch &&
            student.focus.toLowerCase().includes(
                activeFilter.toLowerCase()
            )
        );
    });

    // Empty State
    if (filteredStudents.length === 0) {

        target.innerHTML = `
            <div class="empty-state">
                <h3>No Architect Found</h3>
                <p>Try another keyword or filter.</p>
            </div>
        `;

        return;
    }

    // Render Cards
    filteredStudents.forEach(student => {

        const card = document.createElement("div");

        card.className = "student-card";

        card.innerHTML = `
            <div class="student-img-container">
                <img src="${student.photo}" alt="${student.name}" loading="lazy">
            </div>

            <div class="student-meta">

                <div>
                    <span class="studio-tag">${student.studio}</span>

                    <h3>${student.name}</h3>

                    <span class="focus-tag">${student.focus}</span>

                    <div class="student-metrics">
                        <span>ROLL: ${student.roll}</span>
                        <span>MERIT: ${student.merit}</span>
                    </div>
                </div>

                <button 
                    class="info-trigger-btn"
                    onclick="openProfileModal(${student.id})"
                >

                    <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>

                </button>

            </div>
        `;

        target.appendChild(card);
    });
}

// ------------------------------------------------------
// PROFILE MODAL
// ------------------------------------------------------

function openProfileModal(studentId) {

    const student = studentsDatabase.find(
        item => item.id === studentId
    );

    if (!student) return;

    // Basic Data
    document.getElementById("m-name").textContent =
        student.name;

    document.getElementById("m-studio").textContent =
        student.studio;

    document.getElementById("m-roll").textContent =
        student.roll;

    document.getElementById("m-focus").textContent =
        student.focus;

    document.getElementById("m-email").textContent =
        student.email;

    document.getElementById("m-img").src =
        student.photo;

    // Social Links Wrapper
    const socialContainer =
        document.querySelector(".modal-social-links");

    socialContainer.innerHTML = "";

    // WhatsApp
    if (student.whatsapp) {

        socialContainer.innerHTML += `
            <a 
                href="${student.whatsapp}" 
                class="social-icon-btn"
                target="_blank"
            >
                WhatsApp
            </a>
        `;
    }

    // LinkedIn
    if (student.linkedin) {

        socialContainer.innerHTML += `
            <a 
                href="${student.linkedin}" 
                class="social-icon-btn"
                target="_blank"
            >
                LinkedIn
            </a>
        `;
    }

    // Facebook
    if (student.facebook) {

        socialContainer.innerHTML += `
            <a 
                href="${student.facebook}" 
                class="social-icon-btn"
                target="_blank"
            >
                Facebook
            </a>
        `;
    }

    // Hide container if empty
    if (
        !student.whatsapp &&
        !student.linkedin &&
        !student.facebook
    ) {

        socialContainer.style.display = "none";

    } else {

        socialContainer.style.display = "flex";
    }

    // Open Modal
    document.getElementById("detail-modal").style.display =
        "flex";
}

function closeProfileModal(event) {

    const modal = document.getElementById("detail-modal");

    if (
        !event ||
        event.target === modal
    ) {

        modal.style.display = "none";
    }
}

// ------------------------------------------------------
// LIGHTBOX
// ------------------------------------------------------

function openLightbox(imageURL) {

    const container =
        document.getElementById("lightbox-container");

    const targetImage =
        document.getElementById("lightbox-target-img");

    targetImage.src = imageURL;

    container.style.display = "flex";
}

function closeLightbox() {

    document.getElementById("lightbox-container").style.display =
        "none";
}

// ------------------------------------------------------
// GALLERY AUTO ROTATION
// ------------------------------------------------------

function initializeGalleryRotation() {

    const track = document.querySelector(".carousel-track");

    if (!track) return;

    let rotation = 0;

    setInterval(() => {

        rotation -= 72;

        track.style.transform =
            `rotateY(${rotation}deg)`;

    }, 2000);
}

// ------------------------------------------------------
// KEYBOARD SHORTCUTS
// ------------------------------------------------------

document.addEventListener("keydown", event => {

    // ESC closes overlays
    if (event.key === "Escape") {

        closeProfileModal(null);

        closeLightbox();

        const mobilePanel =
            document.getElementById("m-nav-overlay");

        if (
            mobilePanel &&
            mobilePanel.classList.contains("open")
        ) {

            toggleMobileNavPanel();
        }
    }
});

// ------------------------------------------------------
// WINDOW LOAD BOOT ENGINE
// ------------------------------------------------------

window.onload = () => {

    initializeTheme();

    renderArchiveCards();

    initializeGalleryRotation();

    // ASCII Background
    const asciiTarget =
        document.getElementById("ascii-car-target");

    if (asciiTarget) {

        asciiTarget.textContent = `
....................................................
...............11111111111111.......................
..........11111111111111111111111...................
.......111111..................11111................
....111111........................1111..............
..11111111111111111111111111111111111111...........
....................................................
        `;
    }

    // Halftone Pattern
    const halfTone =
        document.getElementById("halftone-bg-target");

    if (halfTone) {

        let pattern = "";

        for (let i = 0; i < 25; i++) {

            pattern += ". ".repeat(120) + "\n";
        }

        halfTone.textContent = pattern;
    }
};

// ------------------------------------------------------
// SMOOTH SECTION REVEAL ANIMATION
// ------------------------------------------------------

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("reveal-visible");
        }
    });

}, {
    threshold: 0.1
});

window.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".reveal").forEach(item => {

        observer.observe(item);
    });
});
