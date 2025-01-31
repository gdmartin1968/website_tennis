const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // ✅ Get the token from the Authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // ✅ Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user data to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
