const {body, query, param, validationResult} = require('express-validator');
const AppError = require("../utils/AppError.js");

const validateAllBody = [
    body('name')
    .notEmpty().withMessage('The Event Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({min: 5}).withMessage('Name must be at least 5 characters')
    .trim(),

    body('organiser')
    .notEmpty().withMessage('The Event Organiser is required')
    .isMongoId().withMessage('Invalid ID'),

    body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .isLength({min: 5}).withMessage('Description must be at least 5 characters')
    .trim(),

    body('city')
    .notEmpty().withMessage('City is required')
    .isString().withMessage('City must be a string')
    .isLength({min: 2}).withMessage('City must be at least 2 characters')
    .trim(),

    body('capacity')
    .notEmpty().withMessage('Capacity is required')
    .isInt().withMessage('Capacity must be a number')
    .isLength({min: 50}).withMessage('Capacity k'),

    body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid ID'),

    body('date')
    .notEmpty().withMessage('Date is required')
    .isDate().withMessage('Must be a date')
];

const validatePartialBody = [
    body('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .isLength({min: 5}).withMessage('Name must be at least 5 characters')
    .trim(),

    body('organiser')
    .optional()
    .isMongoId().withMessage('Invalid ID'),

    body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({min: 5}).withMessage('Description must be at least 5 characters')
    .trim(),

    body('city')
    .optional()
    .isString().withMessage('City must be a string')
    .isLength({min: 2}).withMessage('City must be at least 2 characters')
    .trim(),

    body('capacity')
    .optional()
    .isInt({min: 50}).withMessage('Capacity must be a number'),

    body('category')
    .optional()
    .isMongoId().withMessage('Invalid ID'),

    body('date')
    .optional()
    .isDate().withMessage('Must be a date')
];

const validateID = [
    param('id')
    .notEmpty().withMessage('Event ID is required')
    .isMongoId().withMessage('Invalid ID')
];

const validateQuery = [
    query('category')
    .optional()
    .isMongoId().withMessage('Invalid ID'),

    query('city')
    .optional()
    .isString().withMessage('City must be a string')
    .isLength({min: 2}).withMessage('City must be at least 2 characters')
    .trim(),

    query('dateTo')
    .optional()
    .isDate().withMessage('Must be a date'),
    
    query('dateFrom')
    .optional()
    .isDate().withMessage('Must be a date'),
    
    query('page')
    .optional()
    .isInt({min: 1}).withMessage('Page must be a number between 1 and 10'),

    query('limit')
    .optional()
    .isInt({min:1, max: 50}).withMessage('Limit must be a number between 1 and 50'),

    query('sortBy')
    .optional()
    .isIn(['date', 'popular']).withMessage('sortBy must be a string')
,

    query('order')
    .optional()
    .isIn(['asc', 'desc']).withMessage('Order must be either asc or desc')
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
    validateAllBody,
    validatePartialBody,
    validateID,
    validateQuery,
    validator
};