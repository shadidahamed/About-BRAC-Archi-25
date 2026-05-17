// =============================================
// BRAC ARCHI SUMMER 26 - Full JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ================== PRELOADER ==================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1800);
    }

    // ================== CUSTOM CURSOR ==================
    const cursor = document.getElementById('custom-cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    if (cursor && cursorBlur) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursorBlur.style.left = `${e.clientX}px`;
            cursorBlur.style.top = `${e.clientY}px`;
        });
    }

    // ================== MOBILE MENU ==================
    const mobileTrigger = document.getElementById('mobileMenuTrigger');
    const navLinks = document.getElementById('navLinksMenu');

    if (mobileTrigger && navLinks) {
        mobileTrigger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileTrigger.classList.toggle('active');
        });
    }

    // ================== SPA NAVIGATION ==================
    const navLinksAll = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.spa-section');

    function switchSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });
    }

    navLinksAll.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchSection(target);
            
            // Close mobile menu
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // ================== TIRE CAROUSEL (360° Rotating Images) ==================
    function initTireCarousel() {
        const tireRing = document.getElementById('tireRing');
        if (!tireRing) return;

        // Replace these with your actual campus image URLs
        const campusImages = [
            "https://via.placeholder.com/600x400/2A4A8C/ffffff?text=Main+Gate",
            "https://via.placeholder.com/600x400/C44A2F/ffffff?text=Central+Atrium",
            "https://via.placeholder.com/600x400/2E5A3F/ffffff?text=Eco+Garden",
            "https://via.placeholder.com/600x400/E8D9C0/000000?text=Library+Hub",
            "https://via.placeholder.com/600x400/4A4A4A/ffffff?text=Design+Studio",
            "https://via.placeholder.com/600x400/2A4A8C/ffffff?text=Auditorium",
            // Add more images here (recommended 8-12)
        ];

        tireRing.innerHTML = ''; // Clear existing

        campusImages.forEach((src, index) => {
            const angle = (index * 360) / campusImages.length;
            const img = document.createElement('img');
            
            img.src = src;
            img.alt = `Campus View ${index + 1}`;
            img.className = 'tire-image';
            
            // Position image on the edge of the tire
            img.style.transform = `rotate(${angle}deg) translateX(175px) rotate(-${angle}deg)`;
            
            tireRing.appendChild(img);
        });
    }

    // ================== STUDENT DASHBOARDS ==================
    function createStudentCard(student) {
        return `
            <div class="glass-card student-dashboard">
                <div class="student-avatar-frame">
                    <img src="${student.photo}" alt="${student.name}">
                </div>
                <h3>${student.name}</h3>
                <p style="margin:8px 0 16px; color:#ccc;">
                    <strong>Merit: ${student.merit}</strong> | 
                    Roll: ${student.roll} <br>
                    ${student.department}
                </p>
                <div class="student-comms-matrix-deck">
                    ${student.whatsapp ? `<a href="${student.whatsapp}" class="comms-pill-link" target="_blank"><i class="fab fa-whatsapp"></i></a>` : ''}
                    ${student.facebook ? `<a href="${student.facebook}" class="comms-pill-link" target="_blank"><i class="fab fa-facebook-f"></i></a>` : ''}
                    ${student.instagram ? `<a href="${student.instagram}" class="comms-pill-link" target="_blank"><i class="fab fa-instagram"></i></a>` : ''}
                    ${student.linkedin ? `<a href="${student.linkedin}" class="comms-pill-link" target="_blank"><i class="fab fa-linkedin-in"></i></a>` : ''}
                    ${student.email ? `<a href="mailto:${student.email}" class="comms-pill-link"><i class="fas fa-envelope"></i></a>` : ''}
                </div>
            </div>
        `;
    }

    function loadSampleStudents() {
        const grid = document.getElementById('studentsGrid') || document.getElementById('architectsMatrixGrid');
        if (!grid) return;

        const students = [
            {
                name: "Shadid Islam",
                merit: "01",
                roll: "231-15-XXX",
                department: "Department of Architecture",
                photo: "https://via.placeholder.com/300x300/2A4A8C/fff?text=Shadid",
                whatsapp: "https://wa.me/88017XXXXXXXX",
                facebook: "#",
                instagram: "#",
                linkedin: "#",
                email: "shadid@example.com"
            },
            // Add more students here
        ];

        grid.innerHTML = students.map(student => createStudentCard(student)).join('');
    }

    // ================== ACHIEVEMENTS HOVER ENHANCEMENT ==================
    function enhanceAchievements() {
        const cards = document.querySelectorAll('.achievement-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                card.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 18}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // ================== INITIALIZE EVERYTHING ==================
    function init() {
        initTireCarousel();
        loadSampleStudents();
        enhanceAchievements();

        // Activate home section by default
        const homeSection = document.getElementById('home');
        if (homeSection) homeSection.classList.add('active');

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
                e.preventDefault();
                const search = prompt("Go to section (home, institution, logo-info, students, achievements):");
                if (search) {
                    const sectionId = search.trim().toLowerCase();
                    const targetSection = document.getElementById(sectionId);
                    if (targetSection) {
                        switchSection(sectionId);
                    }
                }
            }
        });

        console.log('%cBRAC ARCHI SUMMER 26 - Website Initialized Successfully ✅', 'color:#C44A2F; font-size:14px; font-weight:bold');
    }

    // Run initialization
    init();
});
