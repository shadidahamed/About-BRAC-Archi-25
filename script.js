// =============================================
// BRAC ARCHI SUMMER 26 - Final Cinematic JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.spa-section');
    const navButtons = document.querySelectorAll('.nav-icon-btn, .dock-icon');
    const preloader = document.getElementById('preloader');

    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 900);
        }, 1100);
    });

    // SPA Navigation
    function switchSection(targetId) {
        sections.forEach(section => {
            section.classList.toggle('active', section.id === targetId);
        });
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
        });
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target) switchSection(target);
        });
    });

    document.querySelectorAll('.nav-logo').forEach(logo => {
        logo.addEventListener('click', () => switchSection('home'));
    });

    // Dark / Light Mode Toggle
    function initThemeToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.className = 'nav-icon-btn';
        toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        document.getElementById('desktopNav').appendChild(toggle);

        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';

        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
        });
    }

    // Image Loading States
    function initImageLoading() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.parentElement.classList.contains('image-loader')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'image-loader';
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            }
            img.setAttribute('loading', 'lazy');
            img.addEventListener('load', () => img.classList.add('loaded'));
        });
    }

    // Orbital System
    function initOrbital() {
        const stage = document.getElementById('campusOrbital');
        if (!stage) return;
        let angle = 0;
        const items = stage.querySelectorAll('.orbital-item');
        const radius = 185;

        function animate() {
            items.forEach((item, i) => {
                const itemAngle = angle + (i * (360 / items.length));
                const rad = (itemAngle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const z = Math.sin(rad) * (radius * 0.65);
                const y = Math.sin(rad * 1.8) * 18;

                item.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${itemAngle}deg)`;
                item.style.opacity = Math.max(0.4, (z + radius) / (radius * 2.2));
            });
            angle += 0.14;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Tilt Effect
    function initTilt() {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                card.style.transform = `perspective(1200px) rotateX(${(y-0.5)*-18}deg) rotateY(${(x-0.5)*22}deg) translateZ(35px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Initialize Everything
    function init() {
        switchSection('home');
        initThemeToggle();
        initImageLoading();
        initOrbital();
        initTilt();

        console.log('%cBRAC ARCHI SUMMER 26 — Polished & Upgraded Successfully ✨', 'color:#C44A2F; font-size:14px; font-family:Space Grotesk');
    }

    init();
});
