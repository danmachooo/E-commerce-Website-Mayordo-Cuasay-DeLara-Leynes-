const { pool } = require('../config/db'); // Adjust the path as necessary

const User = {
    create: async (name, email, password, verificationToken, tokenExpiry) => {
        await pool.query(
            'INSERT INTO users (name, email, password, verification_token, token_expiry) VALUES (?, ?, ?, ?, ?)', 
            [name, email, password, verificationToken, tokenExpiry]
        );
    },

    findByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]; // Return the user object if found
    },

    findByVerificationToken: async (token) => {
        const [rows] = await pool.query('SELECT * FROM users WHERE verification_token = ?', [token]);
        return rows[0]; // Return the user object if found
    },

    verifyUser: async (userId) => {
        await pool.query('UPDATE users SET verification_token = NULL, token_expiry = NULL, verified = 1 WHERE id = ?', [userId]);
    }
};

module.exports = User;
