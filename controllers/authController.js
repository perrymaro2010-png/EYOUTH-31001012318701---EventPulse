const bcrypt = require('bcrypt');

const { asyncHandler, ok } = require("../utils/asyncHandler.js");
const AppError = require("../utils/AppError.js");
const generateToken = require('../utils/generateToken.js');
const User = require("../models/userModel.js");

// POST - /auth/register
const register = asyncHandler(async (req, res)=>{
    const {name, email, password} = req.body;
    const existingEmail = await User.findOne({email});
    if(existingEmail)
        throw new AppError('Email already exists', 409);
    const newUser = await User.create({
        name,
        email,
        password
    });
    const token = generateToken(newUser._id, newUser.role);
    newUser.password = undefined;
    ok(res, {user: newUser, token}, 'Registration Complete', 201);
});

//POST - /auth/login
const login = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    const existingUser = await User.findOne({email}).select('+password');
    if(!existingUser)
        throw new AppError('Invalid credentials', 401);
    const isMatch = await existingUser.comparePassword(password);
    if(!existingUser)
        throw new AppError('Invalid credentials', 401);
    const token = generateToken(existingUser._id, existingUser.role);
    existingUser.password = undefined;
    ok(res, {user: existingUser, token}, 'Login Successful', 200);
});

module.exports = {
    register,
    login
};