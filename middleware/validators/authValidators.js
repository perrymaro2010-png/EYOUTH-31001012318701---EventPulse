const {body, validationResult} = require('express-validator');
const AppError = require("../../utils/AppError");

const validateRegistration = [
    body('name')
    .notEmpty().withMessage('Username is required.')
    .isString().withMessage('Username must be a string.')
    .isLength({min: 5}).withMessage('Username must be at least 5 characters')
    .trim(),

    body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email')
    .trim().toLowerCase(),

    body('password')
    .notEmpty().withMessage('Password is required')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .isLength({min: 8}).withMessage('Password must be 8 characters or more')
    .trim(),
];

const validateLogin = [
    body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email'),

    body('password')
    .notEmpty().withMessage('Password is required.')
    .isString().withMessage('Password must be a string.')
    .trim()
];

const validator = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const message = errors.array().map((e)=> e.msg).join(', ');
        return next(new AppError(message, 400))
    }
    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validator
};