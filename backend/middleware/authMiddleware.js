const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new Error('Not authorized. No token provided'));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return next(new Error('The user belonging to this token does no longer exist.'));
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'Invalid token'
        });
    }
})

module.exports = { protect }