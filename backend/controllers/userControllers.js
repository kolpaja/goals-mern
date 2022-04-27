const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc register new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);

    if (!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('Please enter all fields');
    }
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create(({ firstName, lastName, email, password: hashedPassword }));
    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    } else {
        res.status(500).json({
            message: 'Invalid user datas'
        });
    }
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400)
        throw new Error('Invalid Credentials');
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials');
    }
    //create token
})

//@desc get user profile data
//@route GET /api/users/me
//@access Private
const getME = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: 'User profile data'
    })
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

module.exports = {
    registerUser,
    loginUser,
    getME
}