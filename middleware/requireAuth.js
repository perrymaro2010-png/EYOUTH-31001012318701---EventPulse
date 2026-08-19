const jwt = require('jsonwebtoken');
const {asyncHandler} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const config = require('../config/config');

const requireAuth = asyncHandler(async (req, res, next)=> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new AppError('No token provided', 401);

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) throw new AppError('User not found', 404);
    req.user = user;

    next();

});

const requireRole = (...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role))
            throw new AppError('You are not allowed to perform this action', 403);
        next();
    } 
};
module.exports = {requireAuth, requireRole};