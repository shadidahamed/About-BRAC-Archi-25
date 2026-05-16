const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

const PUBLIC_DIRECTORY = path.join(__dirname, "public");

app.use(express.static(PUBLIC_DIRECTORY));

app.get("/", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIRECTORY, "index.html"));
});

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

app.listen(PORT, () => {

    console.clear();

    console.log(`
========================================
 BRAC ARCHI SUMMER 26 ONLINE
========================================
 Server Running:
 http://localhost:${PORT}
========================================
    `);

});
