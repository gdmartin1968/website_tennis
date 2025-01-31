require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files (to allow direct access to schedule.html)
app.use(express.static(path.join(__dirname, "../../frontend/public")));
// Function to log form data to a file
const logFormData = (data) => {
    const logFilePath = path.join(__dirname, "form_data.log");
    const logEntry = `${new Date().toISOString()} - ${JSON.stringify(data)}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error("Failed to log form data:", err);
        }
    });
};

// Modify the /register route to log form data
app.post("/register", (req, res) => {
    const formData = req.body;
    console.log("Received Registration Form:", formData);

    fs.appendFile("registrations.log", JSON.stringify(formData) + "\n", (err) => {
        if (err) {
            console.error("Error saving registration:", err);
        }
    });

    res.status(200).json({ message: "Registration submitted successfully!" });
});

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to Martin Tennis Academy API!");
});

// API Route to Handle Form Submission
app.post("/register", (req, res) => {
    const formData = req.body;
    console.log("Received Registration Form:", formData);
    res.status(200).json({ message: "Registration submitted successfully!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
