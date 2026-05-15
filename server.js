/* =========================================================
   BRACU ARCHI '25 — EXECUTIVE ARCHIVE SYSTEM
   Fully Manual Student Database Structure
========================================================= */

/* =========================================================
   MANUAL STUDENT DATABASE
   Owner will manually add every student here.
========================================================= */

const studentsDatabase = [

    {
        id: 1,

        name: "Shadid Ahamed",
        roll: "20101045",
        merit: "Batch Top 01",

        studio: "Studio VII",

        focus: "Digital Fabrication & UX",

        image: "https://picsum.photos/id/64/600/600",

        email: "shadid.ahamed@g.bracu.ac.bd",

        bio: "Focused on computational architecture, interactive spatial systems, and adaptive fabrication methodologies.",

        skills: [
            "Rhino",
            "Grasshopper",
            "Blender",
            "UI Systems"
        ],

        social: {
            whatsapp: "https://wa.me/8801700000000",
            linkedin: "https://linkedin.com/",
            facebook: "https://facebook.com/"
        }
    },

    {
        id: 2,

        name: "Tasnim Alam Chowdhury",
        roll: "20101046",
        merit: "Design Excellence",

        studio: "Studio VI",

        focus: "Urban Housing Frameworks",

        image: "https://picsum.photos/id/65/600/600",

        email: "tasnim.alam@g.bracu.ac.bd",

        bio: "Researching resilient urban housing systems and high-density social infrastructure for deltaic cities.",

        skills: [
            "Urban Mapping",
            "AutoCAD",
            "Research",
            "Climate Systems"
        ],

        social: {
            linkedin: "https://linkedin.com/"
        }
    },

    {
        id: 3,

        name: "Nabila Rahman",
        roll: "20101047",
        merit: "Research Mention",

        studio: "Studio VII",

        focus: "Sustainability Lead",

        image: "https://picsum.photos/id/91/600/600",

        email: "nabila.rahman@g.bracu.ac.bd",

        bio: "Working with ecological material systems and passive cooling strategies for tropical architecture.",

        skills: [
            "Sustainability",
            "Material Logic",
            "Environmental Analysis"
        ],

        social: {
            facebook: "https://facebook.com/"
        }
    }

];

/* =========================================================
   GLOBAL FILTER STATE
========================================================= */

let activeFilter = "ALL";

/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(id, element) {

    /* Desktop nav active */
    document
        .querySelectorAll('.nav-item')
        .forEach(item => item.classList.remove('active'));

    if (element) {
        element.classList.add('active');
    }

    /* Mobile nav active */
    document
        .querySelectorAll('.mobile-nav-row')
        .forEach(row => {

            row.classList.remove('active');

            const route = row.getAttribute('onclick');

            if (route.includes(id)) {
                row.classList.add('active');
            }
        });

    /* Section switch */
    document
        .querySelectorAll('section')
        .forEach(section => section.classList.remove('active'));

    document
        .getElementById(id)
        .classList.add('active');

    document
        .getElementById('main-scroll')
        .scrollTo({
            top: 0,
            behavior: 'smooth'
        });
}

/* =========================================================
   THEME TOGGLE
========================================================= */

function toggleTheme() {

    const body = document.body;

    if (body.hasAttribute('data-theme')) {

        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');

    } else {

        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

/* =========================================================
   LOAD SAVED THEME
========================================================= */

function loadTheme() {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
}

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMobileNavPanel() {

    const panel = document.getElementById('m-nav-overlay');

    panel.classList.toggle('open');
}

function triggerMobileRoute(id) {

    showSection(id, null);

    toggleMobileNavPanel();
}

/* =========================================================
   FILTER SYSTEM
========================================================= */

function setFilter(filterType, element) {

    activeFilter = filterType;

    document
        .querySelectorAll('.filter-btn')
        .forEach(btn => btn.classList.remove('active'));

    element.classList.add('active');

    renderArchiveCards();
}

function filterStudents() {
    renderArchiveCards();
}

/* =========================================================
   RENDER STUDENT CARDS
========================================================= */

function renderArchiveCards() {

    const grid = document.getElementById('student-cards-target');

    if (!grid) return;

    const searchInput = document
        .getElementById('student-search')
        .value
        .toLowerCase();

    grid.innerHTML = "";

    const filteredStudents = studentsDatabase.filter(student => {

        const searchMatch =

            student.name.toLowerCase().includes(searchInput) ||

            student.focus.toLowerCase().includes(searchInput) ||

            student.roll.toLowerCase().includes(searchInput) ||

            student.studio.toLowerCase().includes(searchInput);

        if (activeFilter === "ALL") {
            return searchMatch;
        }

        if (
            activeFilter === "Studio VII" ||
            activeFilter === "Studio VI"
        ) {

            return (
                searchMatch &&
                student.studio === activeFilter
            );
        }

        return (
            searchMatch &&
            student.focus.toLowerCase().includes(
                activeFilter.toLowerCase()
            )
        );
    });

    if (filteredStudents.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">
                <h3>No Architect Found</h3>
                <p>Try another keyword or filter.</p>
            </div>
        `;

        return;
    }

    filteredStudents.forEach(student => {

        const card = document.createElement('div');

        card.className = "student-card";

        card.innerHTML = `

            <div class="student-img-container">

                <div class="student-rank">
                    ${student.merit}
                </div>

                <img
                    src="${student.image}"
                    alt="${student.name}"
                    loading="lazy"
                >

            </div>

            <div class="student-meta">

                <span class="studio-tag">
                    ${student.studio}
                </span>

                <h3>
                    ${student.name}
                </h3>

                <span class="focus-tag">
                    ${student.focus}
                </span>

                <div class="student-metrics">

                    <span class="metric-chip">
                        Roll ${student.roll}
                    </span>

                </div>

                <button
                    class="btn-repository"
                    style="
                        width:100%;
                        margin-top:18px;
                        padding:12px;
                    "
                    onclick="openProfileModal(${student.id})"
                >
                    View Profile
                </button>

            </div>
        `;

        grid.appendChild(card);
    });
}

/* =========================================================
   MODAL PROFILE SYSTEM
========================================================= */

function openProfileModal(studentId) {

    const student = studentsDatabase.find(
        s => s.id === studentId
    );

    if (!student) return;

    /* Basic Info */
    document.getElementById('m-name').textContent = student.name;

    document.getElementById('m-studio').textContent = student.studio;

    document.getElementById('m-roll').textContent = student.roll;

    document.getElementById('m-focus').textContent = student.focus;

    document.getElementById('m-email').textContent = student.email;

    document.getElementById('m-img').src = student.image;

    /* Social Links */
    const socialContainer = document.querySelector('.modal-social-links');

    socialContainer.innerHTML = "";

    /* WhatsApp */
    if (
        student.social &&
        student.social.whatsapp
    ) {

        socialContainer.innerHTML += `
            <a
                href="${student.social.whatsapp}"
                class="social-icon-btn"
                target="_blank"
            >
                WhatsApp
            </a>
        `;
    }

    /* LinkedIn */
    if (
        student.social &&
        student.social.linkedin
    ) {

        socialContainer.innerHTML += `
            <a
                href="${student.social.linkedin}"
                class="social-icon-btn"
                target="_blank"
            >
                LinkedIn
            </a>
        `;
    }

    /* Facebook */
    if (
        student.social &&
        student.social.facebook
    ) {

        socialContainer.innerHTML += `
            <a
                href="${student.social.facebook}"
                class="social-icon-btn"
                target="_blank"
            >
                Facebook
            </a>
        `;
    }

    /* If no links */
    if (socialContainer.innerHTML.trim() === "") {

        socialContainer.innerHTML = `
            <p style="
                width:100%;
                text-align:center;
                color:var(--secondary);
                font-size:.8rem;
            ">
                No public social links shared.
            </p>
        `;
    }

    /* Open modal */
    document.getElementById('detail-modal').style.display = "flex";
}

/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProfileModal(event) {

    const overlay = document.getElementById('detail-modal');

    if (
        !event ||
        event.target === overlay
    ) {

        overlay.style.display = "none";
    }
}

/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(imageURL) {

    document.getElementById('lightbox-target-img').src = imageURL;

    document.getElementById('lightbox-container').style.display = "flex";
}

function closeLightbox() {

    document.getElementById('lightbox-container').style.display = "none";
}

/* =========================================================
   ASCII BACKGROUND SYSTEM
========================================================= */

function generateAsciiBackground() {

    const halftone = document.getElementById('halftone-bg-target');

    if (halftone) {

        let pattern = "";

        for (let i = 0; i < 26; i++) {

            pattern += ".".repeat(120) + "\n";
        }

        halftone.textContent = pattern;
    }

    const asciiCar = document.getElementById('ascii-car-target');

    if (asciiCar) {

        asciiCar.textContent = `

..........................................................
.....................111111111111.........................
...............1111111111111111111111.....................
............1111111..............111111...................
........111111........................11111................
.....111111111111111111111111111111111111111..............
....111111111111111111111111111111111111111111............
....111....1111111111111111111111111111111....111.........
..........................................................

        `;
    }
}

/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener('keydown', function(event) {

    /* ESC closes modal */
    if (event.key === "Escape") {

        closeProfileModal(null);
        closeLightbox();
    }
});

/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

window.onload = () => {

    loadTheme();

    generateAsciiBackground();

    renderArchiveCards();
};
