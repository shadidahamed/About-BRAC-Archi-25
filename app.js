/**
 * ==========================================================================
 * BRACU ARCHI SUMMER '26 — ULTRA SECURE FRONTEND ENGINE
 * ==========================================================================
 * FEATURES:
 * - Fully isolated user sessions
 * - Secure dashboard editing
 * - Real-time socket chat
 * - Advanced SPA navigation
 * - Clean animation systems
 * - Professional UI rendering
 * - Safer DOM injection
 * - Faster rendering pipelines
 * ==========================================================================
 */

/* ==========================================================================
   01. GLOBAL APPLICATION STATE
   ========================================================================== */

const SecureAppEngine = {
    API_URL: "http://localhost:5000/api",
    SOCKET_URL: "http://localhost:5000",

    socket: null,

    activeSession: null,

    cachedProfiles: [],

    ui: {
        currentSection: "home"
    }
};

/* ==========================================================================
   02. SAFE HTML ESCAPER
   ========================================================================== */

function escapeHTML(value) {
    if (!value) return "";

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* ==========================================================================
   03. APPLICATION INITIALIZATION
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    initializeGlobalEvents();

    initializeMobileMenu();

    initializeAuthenticationSystem();

    initializeDashboardSystem();

    initializeChatSystem();

    initializeContactForm();

    initializeScrollUtilities();

    initializeCursorSystem();

    initializeLightboxSystem();

    await syncProfilesFromBackend();

    connectRealtimeSocket();

    navigateToSection("home");

    hidePreloader();
});

/* ==========================================================================
   04. PRELOADER
   ========================================================================== */

function hidePreloader() {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        document.body.classList.remove("loading");

    }, 500);
}

/* ==========================================================================
   05. SPA NAVIGATION SYSTEM
   ========================================================================== */

function navigateToSection(sectionId) {

    const target = document.getElementById(sectionId);

    if (!target) return;

    const requiresAuth = target.classList.contains("private-access-only");

    if (requiresAuth && !SecureAppEngine.activeSession) {
        openAuthModal();
        return;
    }

    document.querySelectorAll(".spa-section").forEach(section => {
        section.classList.remove("active");
    });

    target.classList.add("active");

    document.querySelectorAll(".nav-link").forEach(link => {

        if (link.dataset.target === sectionId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    SecureAppEngine.ui.currentSection = sectionId;

    closeMobileMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* ==========================================================================
   06. GLOBAL EVENT BINDINGS
   ========================================================================== */

function initializeGlobalEvents() {

    document.body.addEventListener("click", (event) => {

        const route = event.target.closest("[data-target]");

        if (route) {

            event.preventDefault();

            navigateToSection(route.dataset.target);
        }
    });
}

/* ==========================================================================
   07. MOBILE MENU
   ========================================================================== */

function initializeMobileMenu() {

    const hamburger = document.querySelector(".hamburger");

    const mobileMenu = document.getElementById("mobile-nav-menu");

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("active");

        hamburger.classList.toggle("open");

        hamburger.setAttribute("aria-expanded", isOpen);
    });
}

function closeMobileMenu() {

    const mobileMenu = document.getElementById("mobile-nav-menu");

    const hamburger = document.querySelector(".hamburger");

    if (!mobileMenu || !hamburger) return;

    mobileMenu.classList.remove("active");

    hamburger.classList.remove("open");

    hamburger.setAttribute("aria-expanded", "false");
}

/* ==========================================================================
   08. AUTHENTICATION SYSTEM
   ========================================================================== */

function initializeAuthenticationSystem() {

    const loginButtons = document.querySelectorAll(".auth-trigger-modal");

    loginButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (SecureAppEngine.activeSession) {

                const shouldLogout = confirm(
                    "Do you want to logout securely?"
                );

                if (shouldLogout) {
                    terminateSession();
                }

            } else {

                openAuthModal();
            }
        });
    });

    const closeBtn = document.getElementById("portal-auth-close-btn");

    if (closeBtn) {
        closeBtn.addEventListener("click", closeAuthModal);
    }

    const loginBtn = document.getElementById("auth-execute-handshake-btn");

    if (loginBtn) {
        loginBtn.addEventListener("click", executeLogin);
    }
}

function openAuthModal() {

    const modal = document.getElementById("portal-auth-overlay");

    if (!modal) return;

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {

    const modal = document.getElementById("portal-auth-overlay");

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    const errorNode = document.getElementById("auth-error-output-node");

    if (errorNode) {
        errorNode.style.display = "none";
    }
}

async function executeLogin() {

    const uidInput = document.getElementById("auth-id-input-field");

    const passwordInput = document.getElementById("auth-password-input-field");

    const errorNode = document.getElementById("auth-error-output-node");

    const uid = uidInput.value.trim().toUpperCase();

    const password = passwordInput.value.trim();

    if (!uid || !password) {

        errorNode.style.display = "flex";

        return;
    }

    try {

        const response = await fetch(
            `${SecureAppEngine.API_URL}/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    uid,
                    password
                })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message);
        }

        SecureAppEngine.activeSession = result.user;

        updateAuthUI(true);

        populateDashboard();

        closeAuthModal();

        navigateToSection("dashboard");

        uidInput.value = "";
        passwordInput.value = "";

    } catch (error) {

        errorNode.style.display = "flex";

        passwordInput.value = "";
    }
}

function terminateSession() {

    SecureAppEngine.activeSession = null;

    updateAuthUI(false);

    navigateToSection("home");
}

function updateAuthUI(isLoggedIn) {

    const desktopText = document.querySelector(
        "#nav-login-btn .auth-btn-text"
    );

    const mobileText = document.querySelector(
        "#mobile-drawer-login-btn .auth-btn-text"
    );

    const icon = document.querySelector("#nav-login-btn i");

    if (isLoggedIn) {

        const text =
            `Logout (${SecureAppEngine.activeSession.uid})`;

        if (desktopText) desktopText.textContent = text;

        if (mobileText) mobileText.textContent = text;

        if (icon) {
            icon.className = "fa-solid fa-right-from-bracket";
        }

    } else {

        if (desktopText) {
            desktopText.textContent = "Portal Login";
        }

        if (mobileText) {
            mobileText.textContent = "Portal Login";
        }

        if (icon) {
            icon.className = "fa-solid fa-key";
        }
    }
}

/* ==========================================================================
   09. PROFILE SYNCHRONIZATION
   ========================================================================== */

async function syncProfilesFromBackend() {

    try {

        const response = await fetch(
            `${SecureAppEngine.API_URL}/profiles`
        );

        if (!response.ok) {
            throw new Error("Server error");
        }

        const profiles = await response.json();

        SecureAppEngine.cachedProfiles = profiles;

        renderProfileGrid(profiles);

    } catch (error) {

        console.error(error);

        const mount =
            document.getElementById(
                "profile-cards-mounting-point"
            );

        if (mount) {

            mount.innerHTML = `
                <div class="chat-system-status-bubble">
                    Connection failed.
                </div>
            `;
        }
    }
}

/* ==========================================================================
   10. PROFILE GRID RENDERER
   ========================================================================== */

function renderProfileGrid(profiles) {

    const grid =
        document.getElementById(
            "profile-cards-mounting-point"
        );

    if (!grid) return;

    grid.innerHTML = "";

    profiles.forEach(profile => {

        const card = document.createElement("div");

        card.className = "profile-grid-card";

        const avatar = profile.imgUrl
            ? `<img src="${escapeHTML(profile.imgUrl)}">`
            : `
                <i class="fa-solid fa-user avatar-fallback-icon"></i>
            `;

        card.innerHTML = `
            <div class="card-media-shell">

                ${avatar}

                <span class="role-badge-pill ${escapeHTML(profile.role)}-type">
                    ${escapeHTML(profile.role)}
                </span>

            </div>

            <div class="card-profile-data-deck">

                <h3>${escapeHTML(profile.name)}</h3>

                <p class="studio-track-text">
                    ${escapeHTML(profile.focus)}
                </p>

                <div class="merit-rank-tag">
                    ${escapeHTML(profile.uid)}
                </div>

            </div>
        `;

        grid.appendChild(card);
    });
}

/* ==========================================================================
   11. DASHBOARD SYSTEM
   ========================================================================== */

function initializeDashboardSystem() {

    const saveBtn =
        document.getElementById(
            "dash-save-settings-btn"
        );

    if (!saveBtn) return;

    saveBtn.addEventListener(
        "click",
        saveDashboardChanges
    );
}

function populateDashboard() {

    const session = SecureAppEngine.activeSession;

    if (!session) return;

    document.getElementById(
        "dash-welcome-title"
    ).textContent = session.name;

    document.getElementById(
        "dash-system-id-string"
    ).textContent = session.uid;

    document.getElementById(
        "dash-input-name"
    ).value = session.name;

    document.getElementById(
        "dash-input-focus"
    ).value = session.focus;

    document.getElementById(
        "dash-input-img-url"
    ).value = session.imgUrl || "";

    document.getElementById(
        "dash-link-gmail"
    ).value = session.links.gmail || "";
}

async function saveDashboardChanges() {

    const session = SecureAppEngine.activeSession;

    if (!session) return;

    const payload = {

        name: document
            .getElementById("dash-input-name")
            .value.trim(),

        focus: document
            .getElementById("dash-input-focus")
            .value.trim(),

        imgUrl: document
            .getElementById("dash-input-img-url")
            .value.trim(),

        links: {
            gmail: document
                .getElementById("dash-link-gmail")
                .value.trim()
        }
    };

    try {

        const response = await fetch(
            `${SecureAppEngine.API_URL}/profiles/${session.uid}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message);
        }

        SecureAppEngine.activeSession = {
            ...SecureAppEngine.activeSession,
            ...payload
        };

        await syncProfilesFromBackend();

        alert("Profile updated successfully.");

    } catch (error) {

        alert("Update failed.");
    }
}

/* ==========================================================================
   12. SOCKET CHAT SYSTEM
   ========================================================================== */

function initializeChatSystem() {

    const sendBtn =
        document.getElementById(
            "chat-transmit-action-btn"
        );

    const input =
        document.getElementById(
            "chat-message-input-field"
        );

    if (sendBtn) {
        sendBtn.addEventListener(
            "click",
            sendChatMessage
        );
    }

    if (input) {

        input.addEventListener("keypress", event => {

            if (event.key === "Enter") {
                sendChatMessage();
            }
        });
    }
}

function connectRealtimeSocket() {

    if (typeof io === "undefined") return;

    SecureAppEngine.socket = io(
        SecureAppEngine.SOCKET_URL
    );

    SecureAppEngine.socket.on(
        "chat:history",
        history => {

            const stream =
                document.getElementById(
                    "chat-stream-render-box"
                );

            if (!stream) return;

            stream.innerHTML = "";

            history.forEach(message => {
                appendMessage(message);
            });
        }
    );

    SecureAppEngine.socket.on(
        "chat:broadcast",
        message => {
            appendMessage(message);
        }
    );
}

function sendChatMessage() {

    const input =
        document.getElementById(
            "chat-message-input-field"
        );

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    if (!SecureAppEngine.activeSession) {
        openAuthModal();
        return;
    }

    SecureAppEngine.socket.emit(
        "chat:transmit",
        {
            senderName:
                SecureAppEngine.activeSession.name,

            senderId:
                SecureAppEngine.activeSession.uid,

            text,

            type: "text"
        }
    );

    input.value = "";
}

function appendMessage(message) {

    const stream =
        document.getElementById(
            "chat-stream-render-box"
        );

    if (!stream) return;

    const wrapper = document.createElement("div");

    const own =
        SecureAppEngine.activeSession &&
        message.senderId ===
            SecureAppEngine.activeSession.uid;

    wrapper.className =
        `msg-node ${own ? "outgoing" : "incoming"}`;

    wrapper.innerHTML = `
        <span class="msg-meta-header">

            ${escapeHTML(message.senderName)}

            (${escapeHTML(message.senderId)})

            •

            ${escapeHTML(message.timestamp)}

        </span>

        <div class="msg-payload-bubble">

            <p>${escapeHTML(message.text)}</p>

        </div>
    `;

    stream.appendChild(wrapper);

    stream.scrollTop = stream.scrollHeight;
}

/* ==========================================================================
   13. CONTACT FORM
   ========================================================================== */

function initializeContactForm() {

    const form =
        document.getElementById(
            "general-contact-terminal"
        );

    if (!form) return;

    form.addEventListener("submit", handleContact);
}

function handleContact(event) {

    event.preventDefault();

    const form = event.target;

    let valid = true;

    form.querySelectorAll("input, textarea")
        .forEach(field => {

            if (!field.value.trim()) {

                field.style.borderColor =
                    "var(--system-error)";

                valid = false;

            } else {

                field.style.borderColor =
                    "var(--border-glass)";
            }
        });

    if (!valid) return;

    const success =
        document.getElementById(
            "terminal-success-view"
        );

    if (success) {

        success.classList.add("active");

        setTimeout(() => {

            success.classList.remove("active");

            form.reset();

        }, 3000);
    }
}

/* ==========================================================================
   14. SCROLL UTILITIES
   ========================================================================== */

function initializeScrollUtilities() {

    const btn =
        document.getElementById(
            "scroll-to-top-trigger"
        );

    if (!btn) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            btn.style.opacity = "1";
        } else {
            btn.style.opacity = "0";
        }
    });

    btn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ==========================================================================
   15. CUSTOM CURSOR SYSTEM
   ========================================================================== */

function initializeCursorSystem() {

    const dot =
        document.getElementById("custom-cursor");

    const blur =
        document.getElementById("cursor-blur");

    if (!dot || !blur) return;

    document.addEventListener("mousemove", event => {

        dot.style.left = `${event.clientX}px`;

        dot.style.top = `${event.clientY}px`;

        blur.style.left = `${event.clientX}px`;

        blur.style.top = `${event.clientY}px`;
    });
}

/* ==========================================================================
   16. LIGHTBOX VIDEO ENGINE
   ========================================================================== */

function initializeLightboxSystem() {

    const overlay =
        document.getElementById(
            "cinematic-lightbox-overlay"
        );

    const iframe =
        document.getElementById(
            "lightbox-iframe-target"
        );

    const closeBtn =
        document.getElementById(
            "lightbox-close-btn"
        );

    if (!overlay || !iframe || !closeBtn) return;

    document.querySelectorAll(
        ".play-overlay-trigger"
    ).forEach(trigger => {

        trigger.addEventListener("click", () => {

            const src =
                trigger.dataset.videoSrc;

            iframe.src = src;

            overlay.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {

        overlay.classList.remove("active");

        iframe.src = "";
    });
}
