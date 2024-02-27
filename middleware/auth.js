const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();

SEKRETKEY = 'cD#9F3h&W2vYqZ@*8aB5tLrU$pS!nJ' // Hard Code

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token invalid' });
    }

    jwt.verify(token, SEKRETKEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid' });
        }
        req.username = decoded.username;
        next();
    });
};

router.get('/protectedRoute', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Token invalid' });
});

module.exports = router;
