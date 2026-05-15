// ======================================================
// BRACU ARCHITECTURE '25 — EXECUTIVE ARCHIVE
// Final Polished JavaScript - Fully Compatible
// ======================================================

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

// ====================== SHOW SECTION ======================
function showSection(id, element = null) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    const targetSection = document.getElementById(id);
    if (targetSection) {
        targetSection.classList.add("active");
    }

    // Highlight active nav link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    if (element) {
        element.classList.add("active");
    }

    // Close mobile menu on navigation
    if (window.innerWidth <= 992) {
        toggleMobileMenu(true);
    }
}

// ====================== MOBILE MENU ======================
function toggleMobileMenu(forceClose = false) {
    const overlay = document.getElementById("mobileOverlay");
    if (!overlay) return;

    if (forceClose || overlay.style.display === "block") {
        overlay.style.display = "none";
        document.body.style.overflow = "";
    } else {
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

// ====================== THEME TOGGLE ======================
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

function initializeTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.setAttribute("data-theme", "dark");
    }
}

// ====================== RENDER STUDENTS ======================
function renderStudents() {
    const container = document.getElementById("studentGrid");
    if (!container) return;

    container.innerHTML = "";

    studentsDatabase.forEach(student => {
        const card = document.createElement("div");
        card.className = "student-card glass-panel";
        card.innerHTML = `
            <div class="student-img-container">
                <img src="${student.photo}" alt="${student.name}" loading="lazy">
            </div>
            <div class="student-meta">
                <span class="studio-tag">${student.studio}</span>
                <h3>${student.name}</h3>
                <span class="focus-tag">${student.focus}</span>
                <div class="student-metrics">
                    <span>ROLL ${student.roll}</span>
                    <span>MERIT ${student.merit}</span>
                </div>
                <button class="info-trigger-btn" onclick="openProfileModal(${student.id})">
                    ↗
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ====================== PROFILE MODAL ======================
function openProfileModal(id) {
    const student = studentsDatabase.find(s => s.id === id);
    if (!student) return;

    document.getElementById("modalImage").src = student.photo;
    document.getElementById("modalName").textContent = student.name;
    document.getElementById("modalStudio").textContent = student.studio;
    document.getElementById("modalRoll").textContent = student.roll;
    document.getElementById("modalEmail").textContent = student.email || "—";
    document.getElementById("modalFocus").textContent = student.focus;

    const socialContainer = document.getElementById("profileSocials");
    socialContainer.innerHTML = "";

    if (student.whatsapp) {
        socialContainer.innerHTML += `<a href="${student.whatsapp}" target="_blank" class="social-btn">WhatsApp</a>`;
    }
    if (student.linkedin) {
        socialContainer.innerHTML += `<a href="${student.linkedin}" target="_blank" class="social-btn">LinkedIn</a>`;
    }
    if (student.facebook) {
        socialContainer.innerHTML += `<a href="${student.facebook}" target="_blank" class="social-btn">Facebook</a>`;
    }

    document.getElementById("profileModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("profileModal").style.display = "none";
}

// ====================== GALLERY AUTO ROTATION ======================
function initializeGallery() {
    const carousel = document.getElementById("galleryCarousel");
    if (!carousel) return;

    let rotation = 0;
    setInterval(() => {
        rotation -= 60;
        carousel.style.transform = `rotateY(${rotation}deg)`;
    }, 3000);
}

// ====================== KEYBOARD SUPPORT ======================
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById("profileModal");
        if (modal.style.display === "flex") closeModal();
        toggleMobileMenu(true);
    }
});

// ====================== INITIALIZE ======================
window.onload = function () {
    initializeTheme();
    renderStudents();
    initializeGallery();

    // Console Signature
    console.log("%cBRACU Architecture '25 Executive Archive Loaded Successfully", 
        "color:#ab2229; font-family:Space Grotesk; font-size:13px; font-weight:700;");
};
