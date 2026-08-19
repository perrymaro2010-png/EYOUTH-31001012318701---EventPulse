const {body, query, param, validationResult} = require('express-validator');
const AppError = require("../utils/AppError.js");

const validateIDinBody = [
    body('event')
    .notEmpty().withMessage('Event ID is required')
    .isMongoId().withMessage('Invalid Event ID'),
];

const validateIDinParam = [
    param('id')
    .notEmpty().withMessage('Event ID is required')
    .isMongoId().withMessage('Invalid Event ID')
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
    validateIDinBody,
    validateIDinParam,
    validator
};