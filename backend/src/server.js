const express = require('express'); // ✅ Import Express
const app = express(); // ✅ Define 'app' before using it

app.get("/", (req, res) => {
    res.send("✅ Backend is running! Welcome to Martin Tennis Academy API.");
});

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

// ✅ Import JWT middleware
const authenticateToken = require('./middlewares/authMiddleware');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.use(express.json()); // ✅ Required to parse JSON requests

// ✅ User Registration Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered. Please use a different email." });
        }

        if (!password) {
            return res.status(400).json({ error: "Password is required." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered!', user: result.rows[0] });
    } catch (error) {
        console.error("🔥 Registration Error:", error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

// ✅ User Login Route with JWT
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ Protected Route: Get User Profile
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [req.user.id]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error("🔥 Profile Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Define the PORT and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
