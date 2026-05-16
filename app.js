/**
 * ==========================================================================
 * BRACU ARCHI '26 - CORE APP ENGINE (CONNECTED BUILD)
 * ==========================================================================
 * Characteristics:
 * - RESTful Database Synchronization: Fetches records directly from Node.js port 5000.
 * - Cryptographic Session Management: Authenticates signatures against live bcrypt hashes.
 * - Live Web Mesh: Synchronizes chat nodes instantaneously via Socket.io channels.
 */

// Global state controller instance (Synchronized with Backend server maps)
const SecureAppEngine = {
    API_URL: 'http://localhost:5000/api',
    socket: null,
    activeSession: null
};

/* ==========================================================================
   01. NETWORK DATA SYNCHRONIZATION ENGINE
   ========================================================================== */
async function syncRegistryFromBackend(filterType = 'all', searchQuery = '') {
    try {
        const response = await fetch(`${SecureAppEngine.API_URL}/profiles`);
        if (!response.ok) throw new Error("Database pipeline network disruption.");
        
        const databaseProfiles = await response.json();
        renderDirectoryMatrixGrid(databaseProfiles, filterType, searchQuery);
    } catch (err) {
        console.error("[NETWORK ERROR]: Sync failure. ", err);
        const gridTarget = document.getElementById('profile-cards-mounting-point');
        if (gridTarget) {
            gridTarget.innerHTML = `<div class="chat-system-status-bubble" style="grid-column: 1/-1"><i class="fa-solid fa-triangle-exclamation" style="color:var(--system-error)"></i> Connection error. Please verify backend engine status on port 5000.</div>`;
        }
    }
}

/* ==========================================================================
   02. SINGLE PAGE APPLICATION (SPA) ROUTING FRAME
   ========================================================================== */
function navigateToSection(targetSectionId) {
    const targetElement = document.getElementById(targetSectionId);
    if (!targetElement) return;

    // Security Verification: Gating private viewports from unauthenticated sessions
    if (targetElement.classList.contains('private-access-only') && !SecureAppEngine.activeSession) {
        triggerAuthenticationModal();
        return;
    }

    // Toggle active section views safely
    document.querySelectorAll('.spa-section').forEach(section => {
        section.classList.remove('active');
    });
    targetElement.classList.add('active');

    // Update primary navigation tracking indicator highlights
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-target') === targetSectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileDrawerSystem();
}

function closeMobileDrawerSystem() {
    const drawer = document.getElementById('mobile-nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (drawer && drawer.classList.contains('active')) {
        drawer.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

/* ==========================================================================
   03. ISOLATED AUTHENTICATION HANDSHAKE LOGIC (LIVE FETCH)
   ========================================================================== */
async function executeSecureLoginHandshake() {
    const inputIdField = document.getElementById('auth-id-input-field');
    const inputPasswordField = document.getElementById('auth-password-input-field');
    const errorBanner = document.getElementById('auth-error-output-node');

    const enteredId = inputIdField.value.trim().toUpperCase();
    const enteredPassword = inputPasswordField.value;

    try {
        const response = await fetch(`${SecureAppEngine.API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: enteredId, password: enteredPassword })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            SecureAppEngine.activeSession = result.user;
            
            errorBanner.style.display = 'none';
            dismissAuthenticationModal();

            // Populate workspace interfaces and shift lock status icons
            populateUserDashboardWorkspace();
            updateAuthInterfaceStates(true);
            navigateToSection('dashboard');
            
            inputIdField.value = '';
            inputPasswordField.value = '';
        } else {
            throw new Error(result.message || "Unauthorized handshake.");
        }
    } catch (err) {
        errorBanner.style.display = 'flex';
        inputPasswordField.value = '';
    }
}

function executeSessionTermination() {
    SecureAppEngine.activeSession = null;
    updateAuthInterfaceStates(false);
    navigateToSection('home');
    console.log("[SECURITY ENGINE]: Network Session closed.");
}

function updateAuthInterfaceStates(isAuthenticated) {
    const desktopBtnText = document.querySelector('#nav-login-btn .auth-btn-text');
    const desktopBtnIcon = document.querySelector('#nav-login-btn i');
    const mobileBtnText = document.querySelector('#mobile-drawer-login-btn .auth-btn-text');

    if (isAuthenticated) {
        const text = `Logout (${SecureAppEngine.activeSession.uid})`;
        desktopBtnText.textContent = text;
        mobileBtnText.textContent = text;
        desktopBtnIcon.className = "fa-solid fa-power-off";
    } else {
        const text = "Portal Login";
        desktopBtnText.textContent = text;
        mobileBtnText.textContent = text;
        desktopBtnIcon.className = "fa-solid fa-key";
    }
}

/* ==========================================================================
   04. DYNAMIC PROFILE MATRIX DIRECTORY RENDERING
   ========================================================================== */
function renderDirectoryMatrixGrid(profilesArray, filterType = 'all', searchQuery = '') {
    const gridTarget = document.getElementById('profile-cards-mounting-point');
    if (!gridTarget) return;

    gridTarget.innerHTML = '';
    const normalizedQuery = searchQuery.toLowerCase().trim();

    profilesArray.forEach(user => {
        if (filterType !== 'all' && user.role !== filterType) return;

        if (normalizedQuery !== '') {
            const matchName = user.name.toLowerCase().includes(normalizedQuery);
            const matchId = user.uid.toLowerCase().includes(normalizedQuery);
            const matchFocus = user.focus.toLowerCase().includes(normalizedQuery);
            if (!matchName && !matchId && !matchFocus) return;
        }

        const cardElement = document.createElement('div');
        cardElement.className = 'profile-grid-card';
        
        const profileImageTag = user.imgUrl ? 
            `<img src="${escapeHtmlStrings(user.imgUrl)}" alt="${escapeHtmlStrings(user.name)}">` : 
            `<i class="fa-solid ${user.role === 'architect' ? 'fa-user-tie' : 'fa-graduation-cap'} avatar-fallback-icon"></i>`;

        let operationalBadgesHTML = '';
        if (user.links.git) operationalBadgesHTML += `<a href="${escapeHtmlStrings(user.links.git)}" target="_blank" class="comms-anchor"><i class="fa-brands fa-github"></i></a>`;
        if (user.links.lnk) operationalBadgesHTML += `<a href="${escapeHtmlStrings(user.links.lnk)}" target="_blank" class="comms-anchor"><i class="fa-brands fa-linkedin-in"></i></a>`;
        if (user.links.gmail) operationalBadgesHTML += `<a href="mailto:${escapeHtmlStrings(user.links.gmail)}" class="comms-anchor"><i class="fa-solid fa-envelope"></i></a>`;
        if (user.links.fb) operationalBadgesHTML += `<a href="${escapeHtmlStrings(user.links.fb)}" target="_blank" class="comms-anchor"><i class="fa-brands fa-facebook-f"></i></a>`;
        if (user.links.wa) operationalBadgesHTML += `<a href="https://wa.me/${escapeHtmlStrings(user.links.wa)}" target="_blank" class="comms-anchor"><i class="fa-brands fa-whatsapp"></i></a>`;

        cardElement.innerHTML = `
            <div class="card-media-shell">
                ${profileImageTag}
                <span class="role-badge-pill ${user.role}-type">${user.role}</span>
            </div>
            <div class="card-profile-data-deck">
                <h3>${escapeHtmlStrings(user.name)}</h3>
                <p class="studio-track-text">${escapeHtmlStrings(user.focus)}</p>
                <div class="merit-rank-tag"><i class="fa-solid fa-fingerprint"></i> ${user.uid} • ${escapeHtmlStrings(user.meritRank)}</div>
                ${operationalBadgesHTML ? `<div class="profile-comms-drawer">${operationalBadgesHTML}</div>` : ''}
            </div>
        `;
        
        gridTarget.appendChild(cardElement);
    });

    if (gridTarget.children.length === 0) {
        gridTarget.innerHTML = `<div class="chat-system-status-bubble" style="grid-column: 1/-1"><i class="fa-solid fa-circle-question"></i> No registry profiles match the criteria.</div>`;
    }
}

/* ==========================================================================
   05. PRIVATE MEMBER WORKSPACE CONTROLLER (HTTP PUT WRITES)
   ========================================================================== */
function populateUserDashboardWorkspace() {
    const session = SecureAppEngine.activeSession;
    if (!session) return;

    document.getElementById('dash-welcome-title').textContent = session.name;
    document.getElementById('dash-system-id-string').textContent = session.uid;
    
    const badgeElement = document.getElementById('dash-account-type-badge');
    badgeElement.textContent = session.role.toUpperCase();
    badgeElement.className = `user-type-tag ${session.role}-type`;

    const avatarBox = document.getElementById('dash-avatar-preview-box');
    avatarBox.innerHTML = session.imgUrl ? 
        `<img src="${escapeHtmlStrings(session.imgUrl)}" alt="Avatar Preview">` : 
        `<i class="fa-solid fa-user-gear fallback-avatar-icon"></i>`;

    document.getElementById('dash-input-name').value = session.name;
    document.getElementById('dash-input-focus').value = session.focus;
    document.getElementById('dash-input-merit').value = session.meritRank;
    document.getElementById('dash-input-img-url').value = session.imgUrl || '';
    
    document.getElementById('dash-link-git').value = session.links.git || '';
    document.getElementById('dash-link-lnk').value = session.links.lnk || '';
    document.getElementById('dash-link-gmail').value = session.links.gmail || '';
    document.getElementById('dash-link-fb').value = session.links.fb || '';
    document.getElementById('dash-link-wa').value = session.links.wa || '';
}

async function commitDashboardWorkspaceChanges() {
    const session = SecureAppEngine.activeSession;
    if (!session) return;

    const updatedPayload = {
        name: document.getElementById('dash-input-name').value.trim(),
        focus: document.getElementById('dash-input-focus').value.trim(),
        meritRank: document.getElementById('dash-input-merit').value.trim(),
        imgUrl: document.getElementById('dash-input-img-url').value.trim(),
        links: {
            git: document.getElementById('dash-link-git').value.trim(),
            lnk: document.getElementById('dash-link-lnk').value.trim(),
            gmail: document.getElementById('dash-link-gmail').value.trim(),
            fb: document.getElementById('dash-link-fb').value.trim(),
            wa: document.getElementById('dash-link-wa').value.trim()
        }
    };

    try {
        const response = await fetch(`${SecureAppEngine.API_URL}/profiles/${session.uid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPayload)
        });

        if (!response.ok) throw new Error("Profile write rejection.");

        SecureAppEngine.activeSession = { ...session, ...updatedPayload };
        populateUserDashboardWorkspace();
        syncRegistryFromBackend();

        alert(`[SYSTEM UPDATE]: Changes for profile '${session.uid}' successfully saved to the server.`);
    } catch (err) {
        alert("[SYSTEM ERROR]: Failed to update profile data matrix on the server.");
    }
}

/* ==========================================================================
   06. SECURE REAL-TIME CHAT INTERFACE (SOCKET.IO HOOKS)
   ========================================================================== */
function connectRealTimeChatMesh() {
    if (typeof io === 'undefined') {
        console.warn("[WEBSOCKET CORE]: Socket.io client script missing from index structure. Real-time mesh disabled.");
        return;
    }

    SecureAppEngine.socket = io('http://localhost:5000');

    SecureAppEngine.socket.on('chat:history', (historicalMessages) => {
        const chatStreamBox = document.getElementById('chat-stream-render-box');
        if (chatStreamBox) chatStreamBox.innerHTML = '';
        historicalMessages.forEach(msg => appendChatMessageNode(msg));
    });

    SecureAppEngine.socket.on('chat:broadcast', (liveMessagePacket) => {
        appendChatMessageNode(liveMessagePacket);
    });
}

function dispatchSecureChatMessage() {
    const inputField = document.getElementById('chat-message-input-field');
    const messageText = inputField.value.trim();
    if (!messageText || !SecureAppEngine.activeSession || !SecureAppEngine.socket) return;

    SecureAppEngine.socket.emit('chat:transmit', {
        senderName: SecureAppEngine.activeSession.name,
        senderId: SecureAppEngine.activeSession.uid,
        text: messageText,
        type: 'text'
    });

    inputField.value = '';
}

function appendChatMessageNode(msgPayload) {
    const chatStreamBox = document.getElementById('chat-stream-render-box');
    if (!chatStreamBox) return;

    const messageNode = document.createElement('div');
    const currentUserId = SecureAppEngine.activeSession ? SecureAppEngine.activeSession.uid : null;
    const isOutgoing = msgPayload.senderId === currentUserId;
    
    messageNode.className = `msg-node ${isOutgoing ? 'outgoing' : 'incoming'}`;

    let payloadContentHTML = '';
    if (msgPayload.type === 'text') {
        payloadContentHTML = `<p>${escapeHtmlStrings(msgPayload.text)}</p>`;
    } else if (msgPayload.type === 'image') {
        payloadContentHTML = `<img src="${escapeHtmlStrings(msgPayload.assetUrl)}" class="chat-render-asset-img" alt="Attached Media">`;
    } else if (msgPayload.type === 'voice') {
        payloadContentHTML = `
            <div class="chat-audio-node-simulation">
                <i class="fa-solid fa-play"></i>
                <div style="width:80px; height:4px; background:rgba(255,255,255,0.3); border-radius:2px;"><div style="width:40%; height:100%; background:#fff;"></div></div>
                <span>${escapeHtmlStrings(msgPayload.text)}</span>
            </div>`;
    }

    messageNode.innerHTML = `
        <span class="msg-meta-header">${escapeHtmlStrings(msgPayload.senderName)} (${msgPayload.senderId}) • ${msgPayload.timestamp}</span>
        <div class="msg-payload-bubble">${payloadContentHTML}</div>
    `;

    chatStreamBox.appendChild(messageNode);
    chatStreamBox.scrollTop = chatStreamBox.scrollHeight;
}

/* ==========================================================================
   07. SIMULATION ENGINES & COMPONENT LIGHTBOXES
   ========================================================================== */
function setupTestSimulationSuite() {
    document.getElementById('chat-voice-trigger').addEventListener('click', () => {
        if (!SecureAppEngine.socket || !SecureAppEngine.activeSession) return;
        SecureAppEngine.socket.emit('chat:transmit', {
            senderName: "Automated Simulator Hub",
            senderId: "SYS-SIM",
            text: "0:12 Sec Voice Clip Node",
            type: 'voice'
        });
    });

    document.getElementById('chat-image-trigger').addEventListener('click', () => {
        if (!SecureAppEngine.socket || !SecureAppEngine.activeSession) return;
        SecureAppEngine.socket.emit('chat:transmit', {
            senderName: "Automated Simulator Hub",
            senderId: "SYS-SIM",
            assetUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
            type: 'image'
        });
    });

    document.getElementById('chat-emoji-trigger').addEventListener('click', () => {
        const field = document.getElementById('chat-message-input-field');
        field.value += " 🔥🏛️📐 ";
        field.focus();
    });

    // Lightbox Modal Video Viewport Logic Elements
    const lightbox = document.getElementById('cinematic-lightbox-overlay');
    const lightboxIframe = document.getElementById('lightbox-iframe-target');
    
    document.querySelectorAll('.play-overlay-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const videoUrl = trigger.getAttribute('data-video-src');
            lightboxIframe.src = videoUrl;
            lightbox.classList.add('active');
        });
    });

    document.getElementById('lightbox-close-btn').addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightboxIframe.src = '';
    });
}

function runContactTerminalValidation(e) {
    e.preventDefault();
    const form = e.target;
    let isFormValid = true;

    form.querySelectorAll('.form-field-unit').forEach(unit => {
        const input = unit.querySelector('input, textarea');
        const errorLabel = unit.querySelector('.validation-error-label');
        
        if (!input.value.trim() || (input.type === 'email' && !input.value.includes('@'))) {
            errorLabel.style.display = 'block';
            input.style.borderColor = 'var(--system-error)';
            isFormValid = false;
        } else {
            errorLabel.style.display = 'none';
            input.style.borderColor = 'var(--border-glass)';
        }
    });

    if (isFormValid) {
        document.getElementById('terminal-success-view').classList.add('active');
        setTimeout(() => {
            form.reset();
            document.getElementById('terminal-success-view').classList.remove('active');
        }, 3000);
    }
}

/* ==========================================================================
   08. INTERACTIVE EVENT BINDINGS & SYSTEM INITIALIZATION
   ========================================================================== */
function bindGlobalInteractiveEventListeners() {
    document.body.addEventListener('click', (e) => {
        const routeTarget = e.target.closest('[data-target]');
        if (routeTarget) {
            e.preventDefault();
            navigateToSection(routeTarget.getAttribute('data-target'));
        }
    });

    document.querySelectorAll('.auth-trigger-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            if (SecureAppEngine.activeSession) {
                if (confirm("Terminate secure application session token environmental parameters?")) {
                    executeSessionTermination();
                }
            } else {
                triggerAuthenticationModal();
            }
        });
    });

    document.getElementById('portal-auth-close-btn').addEventListener('click', dismissAuthenticationModal);
    document.getElementById('auth-execute-handshake-btn').addEventListener('click', executeSecureLoginHandshake);

    const hamburger = document.querySelector('.hamburger');
    const mobileDrawer = document.getElementById('mobile-nav-menu');
    hamburger.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('active');
        hamburger.classList.toggle('open');
        mobileDrawer.setAttribute('aria-hidden', !isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            syncRegistryFromBackend(e.target.getAttribute('data-filter'), document.getElementById('directory-search').value);
        });
    });

    document.getElementById('directory-search').addEventListener('input', (e) => {
        const currentActiveFilterBtn = document.querySelector('.filter-btn.active');
        const currentFilter = currentActiveFilterBtn ? currentActiveFilterBtn.getAttribute('data-filter') : 'all';
        syncRegistryFromBackend(currentFilter, e.target.value);
    });

    document.getElementById('dash-save-settings-btn').addEventListener('click', commitDashboardWorkspaceChanges);
    document.getElementById('chat-transmit-action-btn').addEventListener('click', dispatchSecureChatMessage);
    document.getElementById('chat-message-input-field').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') dispatchSecureChatMessage();
    });

    document.getElementById('general-contact-terminal').addEventListener('submit', runContactTerminalValidation);

    // Hardware Accelerated Pointer tracking logic
    document.addEventListener('mousemove', (e) => {
        const cursorDot = document.getElementById('custom-cursor');
        const cursorBlur = document.getElementById('cursor-blur');
        if (cursorDot && cursorBlur) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorBlur.style.left = `${e.clientX}px`;
            cursorBlur.style.top = `${e.clientY}px`;
        }
    });

    const scrollTopBtn = document.getElementById('scroll-to-top-trigger');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) scrollTopBtn.style.opacity = '1';
        else scrollTopBtn.style.opacity = '0';
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function triggerAuthenticationModal() {
    document.getElementById('portal-auth-overlay').classList.add('active');
    document.getElementById('portal-auth-overlay').setAttribute('aria-hidden', 'false');
}
function dismissAuthenticationModal() {
    document.getElementById('portal-auth-overlay').classList.remove('active');
    document.getElementById('portal-auth-overlay').setAttribute('aria-hidden', 'true');
    document.getElementById('auth-error-output-node').style.display = 'none';
}

function escapeHtmlStrings(stringToSanitize) {
    if (!stringToSanitize) return '';
    return String(stringToSanitize)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
    bindGlobalInteractiveEventListeners();
    setupTestSimulationSuite();
    
    syncRegistryFromBackend();
    connectRealTimeChatMesh();

    setTimeout(() => {
        const preloaderInstance = document.getElementById('preloader');
        if (preloaderInstance) {
            preloaderInstance.style.opacity = '0';
            preloaderInstance.style.visibility = 'hidden';
            document.body.classList.remove('loading');
        }
    }, 400);
});
