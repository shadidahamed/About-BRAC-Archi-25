/* ==========================================================================
   BRACU ARCHI SUMMER '26
   ULTRA MODERN CINEMATIC UI SYSTEM
   ========================================================================== */

/* ==========================================================================
   01. ROOT VARIABLES
   ========================================================================== */

:root {

    --bg-main:
        #05070a;

    --bg-secondary:
        #0d1117;

    --bg-card:
        rgba(255,255,255,0.04);

    --bg-card-solid:
        #11161d;

    --border-glass:
        rgba(255,255,255,0.08);

    --text-main:
        #ffffff;

    --text-muted:
        #98a2b3;

    --accent-orange:
        #ff6a00;

    --accent-orange-dark:
        #d95600;

    --success:
        #00d26a;

    --error:
        #ff4444;

    --shadow-main:
        0 20px 60px rgba(0,0,0,0.45);

    --transition-main:
        0.35s cubic-bezier(0.25,0.8,0.25,1);

    --blur-main:
        blur(18px);
}

/* ==========================================================================
   02. GLOBAL RESET
   ========================================================================== */

* {

    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {

    scroll-behavior: smooth;
}

body {

    background:
        radial-gradient(
            circle at top left,
            rgba(255,106,0,0.08),
            transparent 30%
        ),
        radial-gradient(
            circle at bottom right,
            rgba(255,255,255,0.03),
            transparent 30%
        ),
        var(--bg-main);

    color: var(--text-main);

    font-family: 'Inter', sans-serif;

    overflow-x: hidden;

    min-height: 100vh;
}

body.loading {

    overflow: hidden;
}

a {

    text-decoration: none;
    color: inherit;
}

button,
input,
textarea {

    font-family: inherit;
    border: none;
    outline: none;
}

/* ==========================================================================
   03. CUSTOM CURSOR
   ========================================================================== */

#custom-cursor {

    width: 12px;
    height: 12px;

    background: var(--accent-orange);

    border-radius: 50%;

    position: fixed;

    top: 0;
    left: 0;

    transform:
        translate(-50%, -50%);

    z-index: 9999;

    pointer-events: none;
}

#cursor-blur {

    width: 220px;
    height: 220px;

    background:
        rgba(255,106,0,0.12);

    border-radius: 50%;

    position: fixed;

    top: 0;
    left: 0;

    transform:
        translate(-50%, -50%);

    filter: blur(70px);

    z-index: 9998;

    pointer-events: none;
}

/* ==========================================================================
   04. PRELOADER
   ========================================================================== */

#preloader {

    position: fixed;

    inset: 0;

    background: var(--bg-main);

    z-index: 10000;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.5s ease;
}

.preloader-wrapper {

    width: 320px;

    text-align: center;
}

.preloader-logo {

    font-size: 2rem;
    font-weight: 800;

    letter-spacing: 2px;

    margin-bottom: 28px;
}

.preloader-bar-shell {

    width: 100%;
    height: 8px;

    background:
        rgba(255,255,255,0.08);

    border-radius: 999px;

    overflow: hidden;

    margin-bottom: 16px;
}

.preloader-bar-fill {

    width: 100%;
    height: 100%;

    background: var(--accent-orange);

    animation:
        preload 1.2s infinite linear;
}

@keyframes preload {

    0% {

        transform:
            translateX(-100%);
    }

    100% {

        transform:
            translateX(100%);
    }
}

/* ==========================================================================
   05. NAVBAR
   ========================================================================== */

.main-navbar-shell {

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;

    z-index: 1000;

    backdrop-filter:
        var(--blur-main);

    -webkit-backdrop-filter:
        var(--blur-main);

    background:
        rgba(5,7,10,0.7);

    border-bottom:
        1px solid var(--border-glass);
}

.navbar-container {

    max-width: 1400px;

    margin: auto;

    padding:
        18px 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.brand-logo-block {

    display: flex;
    align-items: center;
    gap: 14px;
}

.brand-icon {

    width: 48px;
    height: 48px;

    border-radius: 12px;

    background:
        linear-gradient(
            135deg,
            var(--accent-orange),
            #ff9f43
        );

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
}

.brand-text h2 {

    font-size: 1rem;
    font-weight: 800;
}

.brand-text span {

    font-size: 0.75rem;

    color: var(--text-muted);
}

.desktop-navigation-links {

    display: flex;
    align-items: center;
    gap: 30px;
}

.nav-link {

    color: var(--text-muted);

    position: relative;

    transition: var(--transition-main);
}

.nav-link:hover,
.nav-link.active {

    color: var(--text-main);
}

.nav-link::after {

    content: '';

    position: absolute;

    bottom: -6px;
    left: 0;

    width: 0%;
    height: 2px;

    background: var(--accent-orange);

    transition: var(--transition-main);
}

.nav-link:hover::after,
.nav-link.active::after {

    width: 100%;
}

/* ==========================================================================
   06. BUTTONS
   ========================================================================== */

.primary-glow-btn {

    background:
        linear-gradient(
            135deg,
            var(--accent-orange),
            #ff944d
        );

    color: white;

    padding:
        14px 22px;

    border-radius: 12px;

    cursor: pointer;

    font-weight: 700;

    transition: var(--transition-main);

    box-shadow:
        0 10px 30px rgba(255,106,0,0.28);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.primary-glow-btn:hover {

    transform:
        translateY(-3px);

    box-shadow:
        0 20px 45px rgba(255,106,0,0.35);
}

.secondary-outline-btn {

    border:
        1px solid var(--border-glass);

    background:
        transparent;

    color: var(--text-main);

    padding:
        14px 22px;

    border-radius: 12px;

    cursor: pointer;

    transition: var(--transition-main);
}

.secondary-outline-btn:hover {

    border-color:
        var(--accent-orange);

    color:
        var(--accent-orange);
}

/* ==========================================================================
   07. HAMBURGER
   ========================================================================== */

.hamburger {

    display: none;

    flex-direction: column;

    gap: 5px;

    background: transparent;

    cursor: pointer;
}

.hamburger span {

    width: 28px;
    height: 3px;

    background: white;

    border-radius: 999px;

    transition: var(--transition-main);
}

/* ==========================================================================
   08. MOBILE MENU
   ========================================================================== */

#mobile-nav-menu {

    position: fixed;

    top: 80px;
    right: -100%;

    width: 280px;
    height: calc(100vh - 80px);

    background:
        rgba(10,12,16,0.95);

    backdrop-filter:
        blur(20px);

    z-index: 999;

    display: flex;
    flex-direction: column;

    padding: 30px;

    gap: 24px;

    transition: var(--transition-main);
}

#mobile-nav-menu.active {

    right: 0;
}

/* ==========================================================================
   09. MAIN APP
   ========================================================================== */

.spa-application-wrapper {

    padding-top: 120px;

    max-width: 1400px;

    margin: auto;

    padding-inline: 30px;
}

.spa-section {

    display: none;

    min-height: calc(100vh - 120px);

    padding-bottom: 100px;

    animation:
        fadeUp 0.5s ease;
}

.spa-section.active {

    display: block;
}

@keyframes fadeUp {

    from {

        opacity: 0;

        transform:
            translateY(30px);
    }

    to {

        opacity: 1;

        transform:
            translateY(0);
    }
}

/* ==========================================================================
   10. HERO
   ========================================================================== */

.hero-layout-wrapper {

    display: grid;

    grid-template-columns:
        1fr 1fr;

    align-items: center;

    gap: 80px;

    min-height: 80vh;
}

.mini-tag {

    display: inline-block;

    padding:
        8px 14px;

    border-radius: 999px;

    background:
        rgba(255,106,0,0.1);

    color:
        var(--accent-orange);

    margin-bottom: 22px;
}

.hero-left-content h1 {

    font-size: 5rem;

    line-height: 1;

    margin-bottom: 22px;
}

.hero-left-content h1 span {

    color:
        var(--accent-orange);
}

.hero-left-content p {

    font-size: 1.1rem;

    color:
        var(--text-muted);

    line-height: 1.7;

    margin-bottom: 32px;
}

.hero-action-row {

    display: flex;
    gap: 18px;

    flex-wrap: wrap;
}

.hero-glass-card {

    background:
        rgba(255,255,255,0.05);

    border:
        1px solid var(--border-glass);

    border-radius: 24px;

    padding: 40px;

    backdrop-filter:
        blur(20px);

    display: grid;

    grid-template-columns:
        repeat(3,1fr);

    gap: 20px;

    box-shadow:
        var(--shadow-main);
}

.hero-stat-node {

    text-align: center;
}

.hero-stat-node h2 {

    font-size: 2rem;

    color:
        var(--accent-orange);

    margin-bottom: 10px;
}

.hero-stat-node span {

    color:
        var(--text-muted);
}

/* ==========================================================================
   11. SECTION HEADER
   ========================================================================== */

.section-header-block {

    margin-bottom: 40px;
}

.section-header-block h2 {

    font-size: 2.5rem;

    margin-bottom: 10px;
}

.section-header-block p {

    color:
        var(--text-muted);
}

/* ==========================================================================
   12. DIRECTORY
   ========================================================================== */

.directory-controls-row {

    display: flex;
    justify-content: space-between;
    gap: 20px;

    margin-bottom: 40px;

    flex-wrap: wrap;
}

.directory-filter-group {

    display: flex;
    gap: 14px;

    flex-wrap: wrap;
}

.filter-btn {

    padding:
        12px 18px;

    border-radius: 10px;

    background:
        var(--bg-card);

    color:
        var(--text-main);

    border:
        1px solid var(--border-glass);

    cursor: pointer;

    transition: var(--transition-main);
}

.filter-btn.active,
.filter-btn:hover {

    background:
        var(--accent-orange);

    border-color:
        transparent;
}

#directory-search {

    flex: 1;

    min-width: 260px;

    padding:
        14px 18px;

    border-radius: 12px;

    background:
        var(--bg-card);

    border:
        1px solid var(--border-glass);

    color:
        white;
}

.profile-grid-layout {

    display: grid;

    grid-template-columns:
        repeat(auto-fill,minmax(320px,1fr));

    gap: 28px;
}

.profile-grid-card {

    background:
        rgba(255,255,255,0.04);

    border:
        1px solid var(--border-glass);

    border-radius: 22px;

    overflow: hidden;

    transition: var(--transition-main);

    backdrop-filter:
        blur(18px);
}

.profile-grid-card:hover {

    transform:
        translateY(-8px);

    border-color:
        rgba(255,106,0,0.4);
}

.card-media-shell {

    height: 240px;

    background:
        linear-gradient(
            135deg,
            rgba(255,106,0,0.18),
            rgba(255,255,255,0.04)
        );

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
}

.card-media-shell img {

    width: 100%;
    height: 100%;

    object-fit: cover;
}

.avatar-fallback-icon {

    font-size: 4rem;

    color:
        rgba(255,255,255,0.6);
}

.role-badge-pill {

    position: absolute;

    top: 16px;
    right: 16px;

    padding:
        8px 14px;

    border-radius: 999px;

    font-size: 0.75rem;

    text-transform: uppercase;

    font-weight: 700;
}

.student-type {

    background:
        rgba(0,210,106,0.15);

    color:
        #00d26a;
}

.architect-type {

    background:
        rgba(255,106,0,0.15);

    color:
        var(--accent-orange);
}

.card-profile-data-deck {

    padding: 24px;
}

.card-profile-data-deck h3 {

    margin-bottom: 10px;
}

.studio-track-text {

    color:
        var(--text-muted);

    margin-bottom: 18px;

    line-height: 1.6;
}

.merit-rank-tag {

    display: inline-flex;
    align-items: center;
    gap: 10px;

    font-size: 0.85rem;

    color:
        var(--accent-orange);

    margin-bottom: 18px;
}

.profile-comms-drawer {

    display: flex;
    gap: 14px;
}

.comms-anchor {

    width: 42px;
    height: 42px;

    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
        rgba(255,255,255,0.05);

    transition: var(--transition-main);
}

.comms-anchor:hover {

    background:
        var(--accent-orange);

    transform:
        translateY(-3px);
}

/* ==========================================================================
   13. CHAT
   ========================================================================== */

.chat-main-shell {

    background:
        rgba(255,255,255,0.03);

    border:
        1px solid var(--border-glass);

    border-radius: 24px;

    overflow: hidden;

    height: 80vh;

    display: flex;
    flex-direction: column;
}

.chat-stream-render-box {

    flex: 1;

    overflow-y: auto;

    padding: 30px;

    display: flex;
    flex-direction: column;
    gap: 20px;
}

.msg-node {

    max-width: 70%;
}

.msg-node.outgoing {

    align-self: flex-end;
}

.msg-meta-header {

    display: block;

    margin-bottom: 8px;

    font-size: 0.75rem;

    color:
        var(--text-muted);
}

.msg-payload-bubble {

    padding:
        16px 18px;

    border-radius: 18px;

    background:
        rgba(255,255,255,0.05);

    line-height: 1.6;
}

.msg-node.outgoing .msg-payload-bubble {

    background:
        var(--accent-orange);
}

.chat-messaging-input-dock-footer {

    border-top:
        1px solid var(--border-glass);

    padding: 20px;

    display: flex;
    align-items: center;
    gap: 14px;
}

.chat-action-mini-btn {

    width: 46px;
    height: 46px;

    border-radius: 12px;

    background:
        rgba(255,255,255,0.05);

    color:
        white;

    cursor: pointer;

    transition: var(--transition-main);
}

.chat-action-mini-btn:hover {

    background:
        var(--accent-orange);
}

.chat-messaging-input-dock-footer input {

    flex: 1;

    background:
        rgba(255,255,255,0.04);

    border:
        1px solid var(--border-glass);

    padding:
        16px 18px;

    border-radius: 12px;

    color:
        white;
}

.chat-send-btn-node {

    width: 52px;
    height: 52px;

    border-radius: 14px;

    background:
        var(--accent-orange);

    color:
        white;

    cursor: pointer;

    transition: var(--transition-main);
}

.chat-send-btn-node:hover {

    transform:
        scale(1.05);
}

/* ==========================================================================
   14. DASHBOARD
   ========================================================================== */

.dashboard-layout-grid {

    display: grid;

    grid-template-columns:
        350px 1fr;

    gap: 40px;
}

.dashboard-profile-preview-card,
.dashboard-edit-panel {

    background:
        rgba(255,255,255,0.04);

    border:
        1px solid var(--border-glass);

    border-radius: 24px;

    padding: 32px;

    backdrop-filter:
        blur(18px);
}

.dashboard-profile-preview-card {

    text-align: center;
}

.dashboard-avatar-box {

    width: 140px;
    height: 140px;

    border-radius: 50%;

    overflow: hidden;

    background:
        rgba(255,255,255,0.06);

    margin:
        0 auto 22px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 3rem;
}

.dashboard-avatar-box img {

    width: 100%;
    height: 100%;

    object-fit: cover;
}

.user-type-tag {

    display: inline-block;

    margin-top: 18px;

    padding:
        10px 18px;

    border-radius: 999px;

    font-weight: 700;
}

.dashboard-input-grid,
.dashboard-social-links-grid {

    display: grid;

    gap: 18px;

    margin-bottom: 24px;
}

.dashboard-input-grid input,
.dashboard-social-links-grid input {

    padding:
        16px 18px;

    border-radius: 12px;

    background:
        rgba(255,255,255,0.04);

    border:
        1px solid var(--border-glass);

    color:
        white;
}

.full-width-btn {

    width: 100%;
}

/* ==========================================================================
   15. CONTACT
   ========================================================================== */

.contact-terminal-layout-wrapper {

    max-width: 700px;

    margin: auto;
}

.contact-terminal-form-card {

    background:
        rgba(255,255,255,0.04);

    border:
        1px solid var(--border-glass);

    border-radius: 24px;

    padding: 40px;

    position: relative;

    overflow: hidden;
}

.terminal-form-node {

    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-field-unit input,
.form-field-unit textarea {

    width: 100%;

    padding:
        18px 20px;

    border-radius: 14px;

    background:
        rgba(255,255,255,0.05);

    border:
        1px solid var(--border-glass);

    color:
        white;

    resize: none;
}

.validation-error-label {

    color:
        var(--error);

    margin-top: 8px;

    display: none;

    font-size: 0.8rem;
}

.success-state-overlay-card {

    position: absolute;

    inset: 0;

    background:
        rgba(10,12,16,0.96);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    text-align: center;

    opacity: 0;

    pointer-events: none;

    transition: var(--transition-main);
}

.success-state-overlay-card.active {

    opacity: 1;

    pointer-events: auto;
}

.success-icon-animation-node {

    font-size: 5rem;

    color:
        var(--success);

    margin-bottom: 20px;
}

/* ==========================================================================
   16. AUTH MODAL
   ========================================================================== */

.modal-gating-scaffold-overlay {

    position: fixed;

    inset: 0;

    background:
        rgba(0,0,0,0.7);

    backdrop-filter:
        blur(12px);

    z-index: 3000;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0;

    pointer-events: none;

    transition: var(--transition-main);
}

.modal-gating-scaffold-overlay.active {

    opacity: 1;

    pointer-events: auto;
}

.modal-authentication-window-card {

    width: 100%;
    max-width: 460px;

    background:
        rgba(255,255,255,0.05);

    border:
        1px solid var(--border-glass);

    border-radius: 28px;

    padding: 40px;

    position: relative;

    transform:
        translateY(40px);

    transition: var(--transition-main);
}

.modal-gating-scaffold-overlay.active
.modal-authentication-window-card {

    transform:
        translateY(0);
}

.modal-dismiss-close-icon {

    position: absolute;

    top: 24px;
    right: 24px;

    cursor: pointer;

    color:
        var(--text-muted);
}

.auth-window-header-block {

    text-align: center;

    margin-bottom: 30px;
}

.security-shield-icon-node {

    font-size: 3rem;

    color:
        var(--accent-orange);

    margin-bottom: 18px;
}

.auth-modal-form-inputs-deck {

    display: flex;
    flex-direction: column;
    gap: 20px;
}

.auth-modal-form-inputs-deck input {

    padding:
        18px 20px;

    border-radius: 14px;

    background:
        rgba(255,255,255,0.04);

    border:
        1px solid var(--border-glass);

    color:
        white;
}

.auth-processing-error-notification-bubble {

    display: none;

    align-items: center;
    gap: 10px;

    padding:
        14px 18px;

    border-radius: 12px;

    background:
        rgba(255,68,68,0.1);

    border:
        1px solid rgba(255,68,68,0.2);

    color:
        var(--error);
}

/* ==========================================================================
   17. LIGHTBOX
   ========================================================================== */

.lightbox-player-scaffold-overlay {

    position: fixed;

    inset: 0;

    background:
        rgba(0,0,0,0.96);

    z-index: 4000;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0;

    pointer-events: none;

    transition: var(--transition-main);
}

.lightbox-player-scaffold-overlay.active {

    opacity: 1;

    pointer-events: auto;
}

.lightbox-dismiss-action-node {

    position: absolute;

    top: 30px;
    right: 30px;

    color:
        white;

    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 10px;
}

.lightbox-iframe-media-container-shell {

    width: 90%;
    max-width: 1200px;

    aspect-ratio: 16/9;
}

.lightbox-iframe-media-container-shell iframe {

    width: 100%;
    height: 100%;

    border: none;

    border-radius: 18px;
}

/* ==========================================================================
   18. SCROLL TOP
   ========================================================================== */

#scroll-to-top-trigger {

    position: fixed;

    bottom: 30px;
    right: 30px;

    width: 54px;
    height: 54px;

    border-radius: 50%;

    background:
        var(--accent-orange);

    color:
        white;

    cursor: pointer;

    z-index: 1200;

    opacity: 0;

    transition: var(--transition-main);
}

/* ==========================================================================
   19. RESPONSIVE
   ========================================================================== */

@media (max-width: 1100px) {

    .hero-layout-wrapper,
    .dashboard-layout-grid {

        grid-template-columns:
            1fr;
    }

    .hero-left-content h1 {

        font-size: 4rem;
    }
}

@media (max-width: 850px) {

    .desktop-navigation-links {

        display: none;
    }

    .hamburger {

        display: flex;
    }

    .hero-left-content h1 {

        font-size: 3rem;
    }

    .hero-glass-card {

        grid-template-columns:
            1fr;
    }

    .msg-node {

        max-width: 90%;
    }
}

@media (max-width: 600px) {

    .spa-application-wrapper {

        padding-inline: 16px;
    }

    .navbar-container {

        padding-inline: 16px;
    }

    .chat-messaging-input-dock-footer {

        flex-wrap: wrap;
    }

    .chat-messaging-input-dock-footer input {

        width: 100%;
    }

    .modal-authentication-window-card {

        margin: 20px;
    }

    .hero-left-content h1 {

        font-size: 2.4rem;
    }

    .section-header-block h2 {

        font-size: 2rem;
    }
}
