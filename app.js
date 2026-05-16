/**
 * BRACU ARCHI '26 - Production Frontend
 */

const API_BASE = 'http://localhost:5000/api';

const AppState = {
    currentUser: null,
    socket: null
};

// ====================== UTILITIES ======================
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}

// ====================== AUTH ======================
async function login() {
    const uid = document.getElementById('auth-id-input-field').value.trim().toUpperCase();
    const pass = document.getElementById('auth-password-input-field').value;

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid, password: pass })
        });

        const data = await res.json();
        if (data.success) {
            AppState.currentUser = data.user;
            dismissAuthModal();
            updateUIForLoggedIn();
            populateDashboard();
            navigateToSection('dashboard');
        } else {
            document.getElementById('auth-error-output-node').style.display = 'flex';
        }
    } catch (err) {
        console.error(err);
    }
}

// ====================== DIRECTORY ======================
async function loadArchitects(search = '') {
    try {
        const res = await fetch(`${API_BASE}/profiles`);
        const architects = await res.json();

        const container = document.getElementById('profile-cards-mounting-point');
        container.innerHTML = '';

        const filtered = architects.filter(a => 
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.uid.toLowerCase().includes(search.toLowerCase()) ||
            a.focus.toLowerCase().includes(search.toLowerCase())
        );

        filtered.forEach(arch => {
            const card = document.createElement('div');
            card.className = 'profile-grid-card';
            card.innerHTML = `
                <div class="card-media-shell">
                    <img src="${arch.imgUrl}" alt="${arch.name}" loading="lazy">
                    <span class="role-badge-pill architect-type">ARCHITECT</span>
                </div>
                <div class="card-profile-data-deck">
                    <h3>${escapeHtml(arch.name)}</h3>
                    <p class="studio-track-text">${escapeHtml(arch.focus)}</p>
                    <div class="merit-rank-tag">${arch.uid} • ${arch.meritRank}</div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        console.error(e);
    }
}

// ====================== DASHBOARD + UPLOAD ======================
function populateDashboard() {
    if (!AppState.currentUser) return;
    const u = AppState.currentUser;

    document.getElementById('dash-welcome-title').textContent = u.name;
    document.getElementById('dash-system-id-string').textContent = u.uid;
    document.getElementById('dash-input-name').value = u.name;
    document.getElementById('dash-input-focus').value = u.focus;
    document.getElementById('dash-input-merit').value = u.meritRank;
    document.getElementById('dash-link-git').value = u.links?.git || '';
    document.getElementById('dash-link-lnk').value = u.links?.lnk || '';
    document.getElementById('dash-link-gmail').value = u.links?.gmail || '';
    document.getElementById('dash-link-fb').value = u.links?.fb || '';
    document.getElementById('dash-link-wa').value = u.links?.wa || '';

    const avatarBox = document.getElementById('dash-avatar-preview-box');
    avatarBox.innerHTML = u.imgUrl ? 
        `<img src="${u.imgUrl}" alt="Profile">` : 
        `<i class="fa-solid fa-user-gear fallback-avatar-icon"></i>`;
}

document.getElementById('dash-image-upload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file || !AppState.currentUser) return;

    const status = document.getElementById('upload-status');
    status.textContent = 'Uploading...';

    const formData = new FormData();
    formData.append('image', file);

    try {
        const res = await fetch(`${API_BASE}/profiles/${AppState.currentUser.uid}/image`, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (data.success) {
            AppState.currentUser.imgUrl = data.imgUrl;
            populateDashboard();
            loadArchitects(document.getElementById('directory-search').value);
            status.textContent = '✓ Updated successfully';
        }
    } catch (err) {
        status.textContent = 'Upload failed';
    }
});

async function saveProfile() {
    if (!AppState.currentUser) return;

    const payload = {
        name: document.getElementById('dash-input-name').value,
        focus: document.getElementById('dash-input-focus').value,
        links: {
            git: document.getElementById('dash-link-git').value,
            lnk: document.getElementById('dash-link-lnk').value,
            gmail: document.getElementById('dash-link-gmail').value,
            fb: document.getElementById('dash-link-fb').value,
            wa: document.getElementById('dash-link-wa').value
        }
    };

    try {
        const res = await fetch(`${API_BASE}/profiles/${AppState.currentUser.uid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            AppState.currentUser = { ...AppState.currentUser, ...payload };
            alert('Profile updated successfully!');
            loadArchitects();
        }
    } catch (err) {
        alert('Failed to save profile');
    }
}

// ====================== SPA + OTHER FEATURES ======================
function navigateToSection(sectionId) {
    document.querySelectorAll('.spa-section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    if (sectionId === 'directory') loadArchitects();
}

// Auth Modal Helpers
function dismissAuthModal() {
    document.getElementById('portal-auth-overlay').classList.remove('active');
}
function updateUIForLoggedIn() {
    const btns = document.querySelectorAll('.dynamic-auth-btn .auth-btn-text');
    btns.forEach(b => b.textContent = `Logout (${AppState.currentUser.uid})`);
}

// Socket Chat (simplified)
function initSocket() {
    if (typeof io !== 'undefined') {
        AppState.socket = io('http://localhost:5000');
        // ... chat handlers
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Event bindings (same as your previous version + new upload)
    document.getElementById('auth-execute-handshake-btn').addEventListener('click', login);
    document.getElementById('dash-save-settings-btn').addEventListener('click', saveProfile);
    document.getElementById('directory-search').addEventListener('input', (e) => loadArchitects(e.target.value));

    loadArchitects();
    initSocket();

    // Preloader
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => document.body.classList.remove('loading'), 600);
    }, 800);
});