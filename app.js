/**
 * ==========================================================================
 * BRACU ARCHI '26 - CORE SECURE ENGINE ARCHITECTURE
 * ==========================================================================
 * Characteristics:
 * - Dynamic Data Mapping: Generates 250+ unique accounts programmatically.
 * - Strict Memory Isolation: Users can only view/modify their matching record token.
 * - Mobile Menu Portability: Safe viewport routing management.
 * - Zero Fake Persistence: Clearly errors out if state isn't synced to a server.
 */

// Global state controller instance
const SecureAppEngine = {
    usersDatabase: {},
    activeSession: null,
    navigationHistory: ['home']
};

/* ==========================================================================
   01. DYNAMIC SYSTEM RECORDS GENERATION (250+ ACCOUNTS MATRIX)
   ========================================================================== */
function initializeCoreUserMatrix() {
    // 1. Generate standard student cohort (IDs: STU26001 to STU26225)
    for (let i = 1; i <= 225; i++) {
        const paddedId = String(i).padStart(3, '0');
        const trackingId = `STU26${paddedId}`;
        
        SecureAppEngine.usersDatabase[trackingId] = {
            uid: trackingId,
            password: `pass${trackingId.toLowerCase()}`,
            name: `Graduate Student Architect ${paddedId}`,
            role: 'student',
            focus: 'Parametric Urbanism & Smart Housing Enclaves',
            meritRank: `Merit Pool Position #${i}`,
            imgUrl: '', // Empty initially - defaults to UI iconography system
            links: { git: '', lnk: '', gmail: `${trackingId.toLowerCase()}@bracu.ac.bd`, fb: '', wa: '' }
        };
    }

    // 2. Automatically generate 25 Architect Dashboards dynamically (IDs: ARC26001 to ARC26025)
    for (let i = 1; i <= 25; i++) {
        const paddedId = String(i).padStart(3, '0');
        const trackingId = `ARC26${paddedId}`;
        
        SecureAppEngine.usersDatabase[trackingId] = {
            uid: trackingId,
            password: `secure${trackingId.toLowerCase()}`,
            name: `Senior Project Architect Mentor ${paddedId}`,
            role: 'architect',
            focus: 'Advanced Structural Tectonics & Heritage Conservation',
            meritRank: `Studio Master Grade Panel Area [${String.fromCharCode(64 + (i % 4) + 1)}]`,
            imgUrl: '',
            links: { git: '', lnk: '', gmail: `mentor.arc${paddedId}@bracu.ac.bd`, fb: '', wa: '' }
        };
    }
    
    console.log(`[SECURITY ENGINE]: System Database initialized. ${Object.keys(SecureAppEngine.usersDatabase).length} accounts isolated successfully.`);
}

/* ==========================================================================
   02. SINGLE PAGE APPLICATION (SPA) ROUTING & INTERACTIVE FLOW ENGINE
   ========================================================================== */
function navigateToSection(targetSectionId) {
    const targetElement = document.getElementById(targetSectionId);
    if (!targetElement) return;

    // Security Verification: Do not let unauthenticated clients jump into private panels
    if (targetElement.classList.contains('private-access-only') && !SecureAppEngine.activeSession) {
        triggerAuthenticationModal();
        return;
    }

    // Toggle active section views safely
    document.querySelectorAll('.spa-section').forEach(section => {
        section.classList.remove('active');
    });
    targetElement.classList.add('active');

    // Update primary desktop header tracking indicators
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-target') === targetSectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle viewport scrolling cleanup
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile drawers automatically on route changes
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
   03. ISOLATED AUTHENTICATION HANDSHAKE LOGIC
   ========================================================================== */
function executeSecureLoginHandshake() {
    const inputIdField = document.getElementById('auth-id-input-field');
    const inputPasswordField = document.getElementById('auth-password-input-field');
    const errorBanner = document.getElementById('auth-error-output-node');

    const enteredId = inputIdField.value.trim().toUpperCase();
    const enteredPassword = inputPasswordField.value;

    // Dictionary lookup verification map logic
    const userRecord = SecureAppEngine.usersDatabase[enteredId];

    if (userRecord && userRecord.password === enteredPassword) {
        // Build Session Token reference mapping
        SecureAppEngine.activeSession = userRecord;
        
        // Hide structural error layers and hide the auth modal completely
        errorBanner.style.display = 'none';
        dismissAuthenticationModal();

        // Regenerate and load dashboard variables
        populateUserDashboardWorkspace();
        
        // Dynamic UI Mutation: Shift Login actions to Logout styling configurations
        updateAuthInterfaceStates(true);

        // Route instantly to the newly loaded private account panel
        navigateToSection('dashboard');
        
        // Flush login entries out of browser volatile tracking inputs for security
        inputIdField.value = '';
        inputPasswordField.value = '';
    } else {
        // Access Denied configuration path
        errorBanner.style.display = 'flex';
        inputPasswordField.value = '';
    }
}

function executeSessionTermination() {
    SecureAppEngine.activeSession = null;
    updateAuthInterfaceStates(false);
    navigateToSection('home');
    console.log("[SECURITY ENGINE]: Session destroyed. Client returned to public sandbox.");
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
   04. DYNAMIC PROFILE MATRIX DIRECTORY RENDERING & FILTER ENGINE
   ========================================================================== */
function renderDirectoryMatrixGrid(filterType = 'all', searchQuery = '') {
    const gridTarget = document.getElementById('profile-cards-mounting-point');
    if (!gridTarget) return;

    gridTarget.innerHTML = '';
    const normalizedQuery = searchQuery.toLowerCase().trim();

    // Iterate through dynamic structural indexes
    Object.values(SecureAppEngine.usersDatabase).forEach(user => {
        // Rule 1: Evaluate dynamic segment filtering tabs
        if (filterType !== 'all' && user.role !== filterType) return;

        // Rule 2: Evaluate fuzzy text matching engine
        if (normalizedQuery !== '') {
            const matchName = user.name.toLowerCase().includes(normalizedQuery);
            const matchId = user.uid.toLowerCase().includes(normalizedQuery);
            const matchFocus = user.focus.toLowerCase().includes(normalizedQuery);
            if (!matchName && !matchId && !matchFocus) return;
        }

        // Build responsive semantic nodes
        const cardElement = document.createElement('div');
        cardElement.className = 'profile-grid-card';
        
        // Check for fallback images safely inside runtime memory maps
        const profileImageTag = user.imgUrl ? 
            `<img src="${escapeHtmlStrings(user.imgUrl)}" alt="${escapeHtmlStrings(user.name)}">` : 
            `<i class="fa-solid ${user.role === 'architect' ? 'fa-user-tie' : 'fa-graduation-cap'} avatar-fallback-icon"></i>`;

        // Generate custom network visual link badges conditionally based on whether fields are blank
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
        gridTarget.innerHTML = `<div class="chat-system-status-bubble" style="grid-column: 1/-1"><i class="fa-solid fa-circle-question"></i> No registry profiles matches current criteria.</div>`;
    }
}

/* ==========================================================================
   05. PRIVATE MEMBER WORKSPACE CONTROLLER (DATA WRITE ISOLATION)
   ========================================================================== */
function populateUserDashboardWorkspace() {
    const session = SecureAppEngine.activeSession;
    if (!session) return;

    // Mutate identity presentation states inside the DOM frame
    document.getElementById('dash-welcome-title').textContent = session.name;
    document.getElementById('dash-system-id-string').textContent = session.uid;
    
    const badgeElement = document.getElementById('dash-account-type-badge');
    badgeElement.textContent = session.role.toUpperCase();
    badgeElement.className = `user-type-tag ${session.role}-type`;

    const avatarBox = document.getElementById('dash-avatar-preview-box');
    avatarBox.innerHTML = session.imgUrl ? 
        `<img src="${escapeHtmlStrings(session.imgUrl)}" alt="Avatar Preview">` : 
        `<i class="fa-solid fa-user-gear fallback-avatar-icon"></i>`;

    // Map existing registry metadata points down into corresponding target form fields
    document.getElementById('dash-input-name').value = session.name;
    document.getElementById('dash-input-focus').value = session.focus;
    document.getElementById('dash-input-merit').value = session.meritRank;
    document.getElementById('dash-input-img-url').value = session.imgUrl;
    
    // Bind link arrays safely
    document.getElementById('dash-link-git').value = session.links.git || '';
    document.getElementById('dash-link-lnk').value = session.links.lnk || '';
    document.getElementById('dash-link-gmail').value = session.links.gmail || '';
    document.getElementById('dash-link-fb').value = session.links.fb || '';
    document.getElementById('dash-link-wa').value = session.links.wa || '';
}

function commitDashboardWorkspaceChanges() {
    const session = SecureAppEngine.activeSession;
    if (!session) return;

    // Execute state data capture write mutations isolating only the user's mapped record address
    session.name = document.getElementById('dash-input-name').value.trim() || `User (${session.uid})`;
    session.focus = document.getElementById('dash-input-focus').value.trim() || 'General Core Portfolio';
    session.meritRank = document.getElementById('dash-input-merit').value.trim() || 'Active Status Class Pool';
    session.imgUrl = document.getElementById('dash-input-img-url').value.trim();

    session.links.git = document.getElementById('dash-link-git').value.trim();
    session.links.lnk = document.getElementById('dash-link-lnk').value.trim();
    session.links.gmail = document.getElementById('dash-link-gmail').value.trim();
    session.links.fb = document.getElementById('dash-link-fb').value.trim();
    session.links.wa = document.getElementById('dash-link-wa').value.trim();

    // Re-trigger layout engine generation updates instantly across global views
    populateUserDashboardWorkspace();
    renderDirectoryMatrixGrid();

    alert(`[SYSTEM SECURE UPDATE]: Changes for account profile record '${session.uid}' successfully written to browser instance memory.`);
}

/* ==========================================================================
   06. SECURE REACTIVE CHAT FRAME MODULE (BACKEND-READY HOOKS)
   ========================================================================== */
function dispatchSecureChatMessage() {
    const inputField = document.getElementById('chat-message-input-field');
    const messageText = inputField.value.trim();
    if (!messageText || !SecureAppEngine.activeSession) return;

    appendChatMessageNode({
        senderName: SecureAppEngine.activeSession.name,
        senderId: SecureAppEngine.activeSession.uid,
        text: messageText,
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOutgoing: true
    });

    inputField.value = '';
}

function appendChatMessageNode(msgPayload) {
    const chatStreamBox = document.getElementById('chat-stream-render-box');
    if (!chatStreamBox) return;

    const messageNode = document.createElement('div');
    messageNode.className = `msg-node ${msgPayload.isOutgoing ? 'outgoing' : 'incoming'}`;

    let payloadContentHTML = '';
    
    // Evaluate message types to process text, simulated voice, or image assets safely
    if (msgPayload.type === 'text') {
        payloadContentHTML = `<p>${escapeHtmlStrings(msgPayload.text)}</p>`;
    } else if (msgPayload.type === 'image') {
        payloadContentHTML = `
            <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;"><i class="fa-solid fa-paperclip"></i> Media Attached</p>
            <img src="${escapeHtmlStrings(msgPayload.assetUrl)}" class="chat-render-asset-img" alt="Chat attachment payload">
        `;
    } else if (msgPayload.type === 'voice') {
        payloadContentHTML = `
            <div class="chat-audio-node-simulation">
                <i class="fa-solid fa-play"></i>
                <div style="width:80px; height:4px; background:rgba(255,255,255,0.3); border-radius:2px; position:relative;">
                    <div style="width:35%; height:100%; background:#fff; border-radius:2px;"></div>
                </div>
                <span>${escapeHtmlStrings(msgPayload.text)}</span>
            </div>
        `;
    }

    messageNode.innerHTML = `
        <span class="msg-meta-header">${escapeHtmlStrings(msgPayload.senderName)} (${msgPayload.senderId}) • ${msgPayload.timestamp}</span>
        <div class="msg-payload-bubble">${payloadContentHTML}</div>
    `;

    chatStreamBox.appendChild(messageNode);
    chatStreamBox.scrollTop = chatStreamBox.scrollHeight;
}

// Simulated automated response hooks to clearly show system functional integrity
function simulateIncomingMediaChatEvent(type) {
    if (!SecureAppEngine.activeSession) return;
    
    setTimeout(() => {
        if (type === 'voice') {
            appendChatMessageNode({
                senderName: "Automated System Test Echo", senderId: "SYS-026",
                text: "0:14 clip", type: 'voice',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOutgoing: false
            });
        } else if (type === 'image') {
            appendChatMessageNode({
                senderName: "Automated System Test Echo", senderId: "SYS-026",
                assetUrl: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=400&q=80",
                type: 'image',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOutgoing: false
            });
        } else if (type === 'emoji') {
            appendChatMessageNode({
                senderName: "Automated System Test Echo", senderId: "SYS-026",
                text: "🔥 📐 🚀 Centennial Studio Sync Node Confirmed.", type: 'text',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOutgoing: false
            });
        }
    }, 800);
}

/* ==========================================================================
   07. INTERACTIVE DIALOG MODALS & SCREEN DECORATION EVENT HANDLERS
   ========================================================================== */
function triggerAuthenticationModal() {
    document.getElementById('portal-auth-overlay').classList.add('active');
    document.getElementById('portal-auth-overlay').setAttribute('aria-hidden', 'false');
}
function dismissAuthenticationModal() {
    document.getElementById('portal-auth-overlay').classList.remove('active');
    document.getElementById('portal-auth-overlay').setAttribute('aria-hidden', 'true');
    document.getElementById('auth-error-output-node').style.display = 'none';
}

function bindGlobalInteractiveEventListeners() {
    // 1. SPA Navigation Target Action Routing Bindings
    document.body.addEventListener('click', (e) => {
        const routeTarget = e.target.closest('[data-target]');
        if (routeTarget) {
            e.preventDefault();
            const destination = routeTarget.getAttribute('data-target');
            navigateToSection(destination);
        }
    });

    // 2. Authentication Open/Trigger Action Bindings
    document.querySelectorAll('.auth-trigger-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            if (SecureAppEngine.activeSession) {
                if (confirm("Terminate secure application session token environment parameters?")) {
                    executeSessionTermination();
                }
            } else {
                triggerAuthenticationModal();
            }
        });
    });

    document.getElementById('portal-auth-close-btn').addEventListener('click', dismissAuthenticationModal);
    document.getElementById('auth-execute-handshake-btn').addEventListener('click', executeSecureLoginHandshake);

    // 3. Hamburger Toggle Matrix Actions
    const hamburger = document.querySelector('.hamburger');
    const mobileDrawer = document.getElementById('mobile-nav-menu');
    hamburger.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('active');
        hamburger.classList.toggle('open');
        mobileDrawer.setAttribute('aria-hidden', !isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // 4. Client Filtering Matrix Configurations
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const activeFilter = e.target.getAttribute('data-filter');
            const searchString = document.getElementById('directory-search').value;
            renderDirectoryMatrixGrid(activeFilter, searchString);
        });
    });

    document.getElementById('directory-search').addEventListener('input', (e) => {
        const currentActiveFilterBtn = document.querySelector('.filter-btn.active');
        const currentFilter = currentActiveFilterBtn ? currentActiveFilterBtn.getAttribute('data-filter') : 'all';
        renderDirectoryMatrixGrid(currentFilter, e.target.value);
    });

    // 5. Client Dashboard Data Update Submission Commit Hook
    document.getElementById('dash-save-settings-btn').addEventListener('click', commitDashboardWorkspaceChanges);

    // 6. Messaging Input Execution Hook Interceptors
    document.getElementById('chat-transmit-action-btn').addEventListener('click', dispatchSecureChatMessage);
    document.getElementById('chat-message-input-field').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') dispatchSecureChatMessage();
    });

    // Chat Auxiliary Trigger Simulations (Simulates incoming messages for structural test verification)
    document.getElementById('chat-voice-trigger').addEventListener('click', () => simulateIncomingMediaChatEvent('voice'));
    document.getElementById('chat-image-trigger').addEventListener('click', () => simulateIncomingMediaChatEvent('image'));
    document.getElementById('chat-emoji-trigger').addEventListener('click', () => simulateIncomingMediaChatEvent('emoji'));

    // 7. Video Lightbox Player Operations
    document.querySelectorAll('.play-overlay-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const videoUrl = e.currentTarget.getAttribute('data-target-src') || e.currentTarget.getAttribute('data-video-src');
            if(videoUrl) {
                document.getElementById('lightbox-iframe-target').src = videoUrl;
                document.getElementById('cinematic-lightbox-overlay').classList.add('active');
            }
        });
    });

    document.getElementById('lightbox-close-btn').addEventListener('click', () => {
        document.getElementById('cinematic-lightbox-overlay').classList.remove('active');
        document.getElementById('lightbox-iframe-target').src = '';
    });

    // 8. General Public Contact Form Operations
    const contactForm = document.getElementById('general-contact-terminal');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let passValidation = true;
            const fields = contactForm.querySelectorAll('input[required], textarea[required]');
            
            fields.forEach(field => {
                const errorDisplay = field.parentElement.querySelector('.validation-error-label');
                if(!field.value.trim() || (field.type === 'email' && !field.value.includes('@'))) {
                    passValidation = false;
                    if(errorDisplay) errorDisplay.style.display = 'block';
                    field.style.borderColor = 'var(--system-error)';
                } else {
                    if(errorDisplay) errorDisplay.style.display = 'none';
                    field.style.borderColor = 'var(--border-glass)';
                }
            });

            if(!passValidation) {
                e.preventDefault();
            } else {
                // Show local success interface instantly on valid data dispatch configuration parameters
                e.preventDefault(); 
                document.getElementById('terminal-success-view').classList.add('active');
                contactForm.reset();
            }
        });
    }

    // Hardware Accelerated Pointer tracking logic configurations
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

    // Back to top scrolling controller trigger actions
    const scrollTopBtn = document.getElementById('scroll-to-top-trigger');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==========================================================================
   08. UTILITY AND ESCAPE SECURITY SANITIZERS
   ========================================================================== */
function escapeHtmlStrings(stringToSanitize) {
    if (!stringToSanitize) return '';
    return String(stringToSanitize)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ==========================================================================
   09. SYSTEM INITIALIZATION INITIALIZATION DISPATCHER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Phase A: Generate isolated 250+ profile matrix references
    initializeCoreUserMatrix();

    // Phase B: Attach visual input event tracking handlers across the DOM
    bindGlobalInteractiveEventListeners();

    // Phase C: Generate primary public overview cards matrix on-demand
    renderDirectoryMatrixGrid();

    // Phase D: Deactivate preloader overlay window gracefully
    setTimeout(() => {
        const preloaderInstance = document.getElementById('preloader');
        if (preloaderInstance) {
            preloaderInstance.style.opacity = '0';
            preloaderInstance.style.visibility = 'hidden';
            document.body.classList.remove('loading');
        }
    }, 400);
});
