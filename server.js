const express = require('express');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("✅ Connected to Heroku Postgres!"))
    .catch(err => console.error("❌ Database connection error:", err));

app.get('/', (req, res) => {
    res.send("Hello, Martin Tennis Academy!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
