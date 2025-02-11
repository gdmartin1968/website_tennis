import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS to allow frontend requests
const corsOptions = {
    origin: ["http://localhost:3000", "https://martintennisacademy.herokuapp.com", "https://www.martintennisacademy.com"],
    methods: "GET,POST",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to PostgreSQL (Ensure ENV variables are set correctly)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure this is set in Heroku
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// ✅ Route to Handle Form Submissions
app.post("/register", async (req, res) => {
    try {
        const { fullName, email, phone, lessonType, lessonDate, comments } = req.body;

        // ✅ Insert Data into PostgreSQL
        const query = `
            INSERT INTO registrations (full_name, email, phone, lesson_type, lesson_date, comments)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;

        const result = await pool.query(query, [fullName, email, phone, lessonType, lessonDate, comments]);

        console.log("New Registration:", result.rows[0]);
        res.status(201).json({ message: "Registration successful!", data: result.rows[0] });
    } catch (error) {
        console.error("Error registering:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Test Route
app.get("/", (_, res) => {
    res.send("Welcome to Martin Tennis Academy API!");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
