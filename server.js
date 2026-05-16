/**
 * BRACU ARCHI '26 - Production Backend
 * 225 Graduate Architects Platform
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT"] }));
app.use(express.json({ limit: '10mb' }));

// Serve uploaded images statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// Multer configuration for profile pictures
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `arch-${req.params.uid}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only images allowed'), false);
    }
});

// In-memory Database
let architectsDB = {};

// Seed 225 Architects
async function seedArchitects() {
    architectsDB = {};
    for (let i = 1; i <= 225; i++) {
        const uid = `ARC26${String(i).padStart(3, '0')}`;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(`arch${i}`, salt);

        architectsDB[uid] = {
            uid,
            name: `Architect ${String(i).padStart(3, '0')}`,
            focus: "Sustainable Urban Design & Parametric Architecture",
            meritRank: i <= 10 ? `Top ${i}` : "Merit List",
            imgUrl: `/uploads/default-arch.jpg`, // fallback
            links: {
                git: "",
                lnk: "",
                gmail: `${uid.toLowerCase()}@bracu.ac.bd`,
                fb: "",
                wa: ""
            },
            passwordHash: hash,
            role: "architect"
        };
    }
    console.log(`✅ 225 Architects seeded successfully`);
}

// ====================== API ROUTES ======================

// Login
app.post('/api/auth/login', async (req, res) => {
    const { uid, password } = req.body;
    const architect = architectsDB[uid?.toUpperCase()];

    if (!architect || !(await bcrypt.compare(password, architect.passwordHash))) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const { passwordHash, ...safeProfile } = architect;
    res.json({ success: true, user: safeProfile });
});

// Get all architects
app.get('/api/profiles', (req, res) => {
    const profiles = Object.values(architectsDB).map(({ passwordHash, ...p }) => p);
    res.json(profiles);
});

// Update profile
app.put('/api/profiles/:uid', (req, res) => {
    const uid = req.params.uid.toUpperCase();
    if (!architectsDB[uid]) return res.status(404).json({ success: false });

    architectsDB[uid] = { ...architectsDB[uid], ...req.body };
    res.json({ success: true, user: architectsDB[uid] });
});

// Upload Profile Picture
app.post('/api/profiles/:uid/image', upload.single('image'), (req, res) => {
    const uid = req.params.uid.toUpperCase();
    if (!architectsDB[uid] || !req.file) {
        return res.status(400).json({ success: false, message: "Upload failed" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    architectsDB[uid].imgUrl = imageUrl;

    res.json({ success: true, imgUrl });
});

// ====================== SOCKET.IO ======================
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.emit('chat:history', []); // extend with DB if needed

    socket.on('chat:transmit', (msg) => {
        io.emit('chat:broadcast', { ...msg, timestamp: new Date().toLocaleTimeString() });
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

// Start Server
const PORT = 5000;
seedArchitects().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 BRACU ARCHI '26 Backend running on http://localhost:${PORT}`);
    });
});
