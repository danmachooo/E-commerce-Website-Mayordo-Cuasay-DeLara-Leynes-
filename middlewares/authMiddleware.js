// middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (!req.session.userId) { // Check if the session userId is set
        return res.redirect('/login'); // Redirect to the login page if not
    }
    next(); 
};

module.exports = authMiddleware;
