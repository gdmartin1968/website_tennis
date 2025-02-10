import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // Ensure this is on LINE ONE!!! Ensures it looks in the correct location
console.log("DB_USER:", process.env.DB_USER); // Add these two lines here
console.log("EMAIL_USER:", process.env.EMAIL_USER);;
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// ✅ Fix CORS Issues
const corsOptions = {
    origin: "http://localhost:3000", // Frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
    credentials: true, // If using cookies or sessions
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, "../../frontend/public")));

// PostgreSQL database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // classroom.connector@gmail.com
        pass: process.env.EMAIL_PASS   // JGsd5jg4vrwg!jO0iT
    }
});

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

// API Route to handle form submission
app.post("/api/schedule", async (req, res) => {
    const { fullName, email, phone, lessonType, lessonDate, comments } = req.body;

    try {
        // Store in PostgreSQL
        const query = "INSERT INTO schedules (full_name, email, phone, lesson_type, lesson_date, comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        await pool.query(query, [fullName, email, phone, lessonType, lessonDate, comments]);

        // Send email notification
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "classroom.connector@gmail.com",  // Replace with your email
            subject: "New Registration or Service Request",
            text: `New Registration:
            Name: ${fullName}
            Email: ${email}
            Phone: ${phone}
            Lesson Type: ${lessonType}
            Lesson Date: ${lessonDate}
            Comments: ${comments}`
        });

        res.status(200).json({ message: "Form submitted and notification sent!" });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Submission failed. Please try again." });
    }
});

// Test Route
app.get("/", (_, res) => {
    res.send("Welcome to Martin Tennis Academy API!");
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:5000");
});
