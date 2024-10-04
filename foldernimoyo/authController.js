const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user');
const emailService = require('../services/emailService');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Basic server-side validation
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        await User.create(name, email, hashedPassword, verificationToken, tokenExpiry);
        await emailService.sendVerificationEmail(email, verificationToken);

        // Respond with success
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Basic server-side validation
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const user = await User.findByEmail(email);
        if (!user || !user.verified) {
            return res.status(400).json({ success: false, message: 'Invalid email or your email is not verified.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: 'Invalid password.' });
        }

        // Set session data (you'll need to implement session management)
        req.session.userId = user.id;

        // Respond with success
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
};

module.exports = { register, login };
