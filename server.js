/**
 * ==========================================================================
 * BRACU ARCHI '26 - CORE BACKEND ENGINE
 * ==========================================================================
 * Characteristics:
 * - Express REST Routing: Exposes isolated user endpoints on Port 5000.
 * - Cryptographic Signatures: Validates passwords via adaptive bcrypt.js hashes.
 * - Dynamic State Modification: Handles live PUT operations securely.
 * - Socket.io Mesh Pipelines: Manages history caching and message broadcast relays.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const server = http.createServer(app);

// Cross-Origin Resource Sharing (CORS) configurations for complete integration
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// Main Dynamic State In-Memory Database Matrix Object Instantiation
let ProductionDatabase = {
    users: {},
    chatMessages: []
};

/* ==========================================================================
   01. SECURE DATABASE SEEDING ROUTINE
   ========================================================================== */
async function seedSecureDatabaseMatrix() {
    console.log("[BACKEND ENGINE]: Generating secure cryptographic password matrix hashes...");
    
    // Seed Student Accounts Matrix (225 Slots)
    for (let i = 1; i <= 225; i++) {
        const id = 'STU26' + String(i).padStart(3, '0');
        const salt = await bcrypt.genSalt(10);
        const hashedPrefixedPassword = await bcrypt.hash('pass' + id.toLowerCase(), salt);
        
        ProductionDatabase.users[id] = {
            uid: id,
            passwordHash: hashedPrefixedPassword,
            name: 'Graduate Student Architect ' + String(i).padStart(3, '0'),
            role: 'student',
            focus: 'Parametric Urbanism & Smart Housing Enclaves',
            meritRank: 'Merit Pool Position #' + i,
            imgUrl: '',
            links: { git: '', lnk: '', gmail: id.toLowerCase() + '@bracu.ac.bd', fb: '', wa: '' }
        };
    }

    // Seed Architect Mentor Accounts Matrix (25 Slots)
    for (let i = 1; i <= 25; i++) {
        const id = 'ARC26' + String(i).padStart(3, '0');
        const salt = await bcrypt.genSalt(10);
        const hashedPrefixedPassword = await bcrypt.hash('secure' + id.toLowerCase(), salt);
        
        ProductionDatabase.users[id] = {
            uid: id,
            passwordHash: hashedPrefixedPassword,
            name: 'Senior Project Architect Mentor ' + String(i).padStart(3, '0'),
            role: 'architect',
            focus: 'Advanced Structural Tectonics & Heritage Conservation',
            meritRank: 'Studio Master Grade Panel Area',
            imgUrl: '',
            links: { git: '', lnk: '', gmail: 'mentor.arc' + String(i).padStart(3, '0') + '@bracu.ac.bd', fb: '', wa: '' }
        };
    }
    
    console.log('[BACKEND ENGINE]: ' + Object.keys(ProductionDatabase.users).length + ' Isolated cryptographic matrix accounts seeded.');
}

/* ==========================================================================
   02. RESTful ENDPOINT ROUTING DEFINITIONS (HTTP FETCH API)
   ========================================================================== */

// Identity Handshake Endpoint (Login Authentication Interface validation rules)
app.post('/api/auth/login', async (req, res) => {
    const { uid, password } = req.body;
    
    const targetUser = ProductionDatabase.users[uid?.toUpperCase().trim()];
    if (!targetUser) {
        return res.status(401).json({ success: false, message: "Mismatch." });
    }

    const isMatch = await bcrypt.compare(password, targetUser.passwordHash);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Mismatch." });
    }

    // Strip out the password hash before sending back to client layers
    const profile = { ...targetUser };
    delete profile.passwordHash;

    res.status(200).json({ success: true, user: profile });
});

// Directory Matrix Access Pipeline Endpoint
app.get('/api/profiles', (req, res) => {
    const sanitizedProfiles = Object.values(ProductionDatabase.users).map(user => {
        const clone = { ...user };
        delete clone.passwordHash;
        return clone;
    });
    res.status(200).json(sanitizedProfiles);
});

// Dashboard Workbench Profile Update Target Writer Endpoint (PUT Modification logic)
app.put('/api/profiles/:uid', (req, res) => {
    const targetUid = req.params.uid.toUpperCase().trim();
    const updatedData = req.body;

    if (!ProductionDatabase.users[targetUid]) {
        return res.status(404).json({ success: false, message: "Target node identifier not found." });
    }

    // Securely patch current memory allocations keeping immutable indices intact
    ProductionDatabase.users[targetUid] = {
        ...ProductionDatabase.users[targetUid],
        name: updatedData.name || ProductionDatabase.users[targetUid].name,
        focus: updatedData.focus || ProductionDatabase.users[targetUid].focus,
        imgUrl: updatedData.imgUrl !== undefined ? updatedData.imgUrl : ProductionDatabase.users[targetUid].imgUrl,
        links: {
            ...ProductionDatabase.users[targetUid].links,
            ...updatedData.links
        }
    };

    console.log(`[DATABASE WRITE]: Context for tracking cell node '${targetUid}' updated.`);
    res.status(200).json({ success: true, message: "Matrix updated." });
});

/* ==========================================================================
   03. REAL-TIME CLIENT SYNC INTERFACE (SOCKET.IO NET MESH WEB CHANNELS)
   ========================================================================== */
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('[NETWORK SECURE MESH]: Connected client pipeline trace: ' + socket.id);

    // Pipe past conversational footprints to newly initialized client pipelines
    socket.emit('chat:history', ProductionDatabase.chatMessages);

    // Receive message data and broadcast back to listening mesh configurations
    socket.on('chat:transmit', (incomingPayload) => {
        const localTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const completedMessagePacket = {
            ...incomingPayload,
            timestamp: localTime
        };

        // Commit tracking packets into systemic caching structures arrays
        ProductionDatabase.chatMessages.push(completedMessagePacket);
        
        // Retain an upper memory floor boundary to minimize data weight leaks
        if (ProductionDatabase.chatMessages.length > 200) {
            ProductionDatabase.chatMessages.shift();
        }

        io.emit('chat:broadcast', completedMessagePacket);
    });

    socket.on('disconnect', () => {
        console.log('[NETWORK SECURE MESH]: Pipeline link trace closed: ' + socket.id);
    });
});

/* ==========================================================================
   04. RUNTIME SYSTEM ENGINES SPINDOWN SIGNALS
   ========================================================================== */
const PORT = 5000;
seedSecureDatabaseMatrix().then(() => {
    server.listen(PORT, () => {
        console.log('\n🚀 [BRACU ARCHI SECURE BACKEND UP]: System listening safely on channel port ' + PORT);
    });
});