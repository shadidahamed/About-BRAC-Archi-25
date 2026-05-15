// =========================================================
// BRACU ARCHI '25 — EXECUTIVE ARCHIVE SYSTEM
// Manual Student Database Version
// =========================================================


// =========================================================
// MANUAL STUDENT DATABASE
// Owner manually controls everything here
// =========================================================

const studentsDatabase = [

    {
        id: 1,
        name: "Shadid Ahamed",
        roll: "20101045",
        merit: "01",
        studio: "Studio VII",
        focus: "Digital Fabrication & UX",
        photo: "https://picsum.photos/id/64/600/600",
        email: "shadid.ahamed@g.bracu.ac.bd",

        // Optional Social Links
        whatsapp: "https://wa.me/8801700000000",
        linkedin: "https://linkedin.com/in/shadid",
        facebook: "https://facebook.com/shadid"
    },

    {
        id: 2,
        name: "Tasnim Alam Chowdhury",
        roll: "20101046",
        merit: "02",
        studio: "Studio VI",
        focus: "Urban Housing Frameworks",
        photo: "https://picsum.photos/id/65/600/600",
        email: "tasnim@g.bracu.ac.bd",

        whatsapp: "",
        linkedin: "https://linkedin.com/in/tasnim",
        facebook: ""
    },

    {
        id: 3,
        name: "Nabila Hassan",
        roll: "20101047",
        merit: "03",
        studio: "Studio VII",
        focus: "Climate Responsive Architecture",
        photo: "https://picsum.photos/id/91/600/600",
        email: "nabila@g.bracu.ac.bd",

        whatsapp: "",
        linkedin: "",
        facebook: ""
    }

];


// =========================================================
// ACTIVE FILTER
// =========================================================

let dynamicActiveFilter = "ALL";


// =========================================================
// NAVIGATION SYSTEM
// =========================================================

function showSection(id, element) {

    // Desktop Nav Active State
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    if (element) {
        element.classList.add('active');
    }

    // Mobile Nav Active State
    document.querySelectorAll('.mobile-nav-row').forEach(row => {

        row.classList.remove('active');

        if (row.getAttribute('onclick').includes(id)) {
            row.classList.add('active');
        }
    });

    // Sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(id).classList.add('active');

    // Scroll Top
    document.getElementById('main-scroll').scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================================
// THEME SYSTEM
// =========================================================

function toggleTheme() {

    const body = document.body;

    if (body.hasAttribute('data-theme')) {

        body.removeAttribute('data-theme');

    } else {

        body.setAttribute('data-theme', 'dark');
    }
}


// =========================================================
// MOBILE NAVIGATION
// =========================================================

function toggleMobileNavPanel() {

    const panel = document.getElementById('m-nav-overlay');

    panel.classList.toggle('open');
}


function triggerMobileRoute(id) {

    showSection(id, null);

    toggleMobileNavPanel();
}


// =========================================================
// STUDENT CARD RENDER ENGINE
// =========================================================

function renderArchiveCards() {

    const targetGrid = document.getElementById('student-cards-target');

    if (!targetGrid) return;

    const searchInput = document.getElementById('student-search');

    const searchValue = searchInput.value.toLowerCase();

    targetGrid.innerHTML = "";



    // =============================
    // FILTER SYSTEM
    // =============================

    const filteredList = studentsDatabase.filter(student => {

        const matchesSearch =

            student.name.toLowerCase().includes(searchValue) ||
            student.focus.toLowerCase().includes(searchValue) ||
            student.roll.includes(searchValue) ||
            student.studio.toLowerCase().includes(searchValue);

        // ALL
        if (dynamicActiveFilter === "ALL") {

            return matchesSearch;
        }

        // Studio VII / VI
        if (
            dynamicActiveFilter === "Studio VII" ||
            dynamicActiveFilter === "Studio VI"
        ) {

            return matchesSearch &&
                   student.studio === dynamicActiveFilter;
        }

        // Other Filters
        return (
            matchesSearch &&
            student.focus
                .toLowerCase()
                .includes(dynamicActiveFilter.toLowerCase())
        );

    });



    // =============================
    // EMPTY MESSAGE
    // =============================

    if (filteredList.length === 0) {

        targetGrid.innerHTML = `
            <div class="empty-state">
                <h3>No Architect Found</h3>
                <p>Try another search query.</p>
            </div>
        `;

        return;
    }



    // =============================
    // CARD GENERATION
    // =============================

    filteredList.forEach(student => {

        const card = document.createElement('div');

        card.className = "student-card";

        card.innerHTML = `

            <div class="student-img-container">

                <img 
                    src="${student.photo}" 
                    alt="${student.name}" 
                    loading="lazy"
                >

            </div>

            <div class="student-meta">

                <div>

                    <span class="studio-tag">
                        ${student.studio}
                    </span>

                    <h3>
                        ${student.name}
                    </h3>

                    <span class="focus-tag">
                        ${student.focus}
                    </span>

                </div>

                <div class="student-metrics">

                    <span>ID: ${student.roll}</span>

                    <span>Merit: ${student.merit}</span>

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

        targetGrid.appendChild(card);

    });

}


// =========================================================
// FILTER BUTTON SYSTEM
// =========================================================

function setFilter(filterType, element) {

    document.querySelectorAll('.filter-btn').forEach(btn => {

        btn.classList.remove('active');

    });

    element.classList.add('active');

    dynamicActiveFilter = filterType;

    renderArchiveCards();
}


// =========================================================
// SEARCH SYSTEM
// =========================================================

function filterStudents() {

    renderArchiveCards();
}


// =========================================================
// PROFILE MODAL SYSTEM
// =========================================================

function openProfileModal(studentId) {

    const student = studentsDatabase.find(s => s.id === studentId);

    if (!student) return;



    // =============================
    // BASIC INFO
    // =============================

    document.getElementById('m-name').textContent = student.name;

    document.getElementById('m-studio').textContent = student.studio;

    document.getElementById('m-roll').textContent = student.roll;

    document.getElementById('m-focus').textContent = student.focus;

    document.getElementById('m-email').textContent = student.email;

    document.getElementById('m-img').src = student.photo;



    // =============================
    // SOCIAL LINKS
    // Only show if exists
    // =============================

    const whatsappBtn = document.getElementById('link-wa');

    const linkedinBtn = document.getElementById('link-li');

    const facebookBtn = document.getElementById('link-fb');



    // WhatsApp
    if (student.whatsapp && student.whatsapp.trim() !== "") {

        whatsappBtn.style.display = "flex";

        whatsappBtn.href = student.whatsapp;

    } else {

        whatsappBtn.style.display = "none";
    }



    // LinkedIn
    if (student.linkedin && student.linkedin.trim() !== "") {

        linkedinBtn.style.display = "flex";

        linkedinBtn.href = student.linkedin;

    } else {

        linkedinBtn.style.display = "none";
    }



    // Facebook
    if (student.facebook && student.facebook.trim() !== "") {

        facebookBtn.style.display = "flex";

        facebookBtn.href = student.facebook;

    } else {

        facebookBtn.style.display = "none";
    }



    // =============================
    // SHOW MODAL
    // =============================

    document.getElementById('detail-modal').style.display = "flex";
}


// =========================================================
// CLOSE PROFILE MODAL
// =========================================================

function closeProfileModal(event) {

    const modal = document.getElementById('detail-modal');

    if (!event || event.target === modal) {

        modal.style.display = "none";
    }
}


// =========================================================
// LIGHTBOX SYSTEM
// =========================================================

function openLightbox(imgUrl) {

    const lightbox = document.getElementById('lightbox-container');

    const img = document.getElementById('lightbox-target-img');

    img.src = imgUrl;

    lightbox.style.display = "flex";
}


function closeLightbox() {

    document.getElementById('lightbox-container').style.display = "none";
}


// =========================================================
// ASCII BACKGROUND SYSTEM
// =========================================================

function generateAsciiBackgrounds() {

    // Halftone Pattern
    const patternTarget = document.getElementById('halftone-bg-target');

    if (patternTarget) {

        let block = "";

        for (let i = 0; i < 25; i++) {

            block += ".".repeat(100) + "\n";
        }

        patternTarget.textContent = block;
    }



    // ASCII Architecture Graphic
    const asciiCarTarget = document.getElementById('ascii-car-target');

    if (asciiCarTarget) {

        asciiCarTarget.textContent = `

.......................................................
......................1111111111.......................
.................11111111111111111111..................
...............111111.........11111111.................
............111111...............111111................
.......1111111111111111111111111111111111111...........
.....11111111111111111111111111111111111111111.........
....1111...11111111111111111111111111111...1111........
.......................................................

        `;
    }
}


// =========================================================
// ESC KEY SUPPORT
// =========================================================

document.addEventListener('keydown', function(event) {

    // Close Modals on ESC
    if (event.key === "Escape") {

        closeProfileModal(null);

        closeLightbox();

        document.getElementById('m-nav-overlay')
            .classList.remove('open');
    }
});


// =========================================================
// INITIALIZATION
// =========================================================

window.onload = () => {

    generateAsciiBackgrounds();

    renderArchiveCards();
};
