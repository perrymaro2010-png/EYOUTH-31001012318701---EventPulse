const {body, query, param, validationResult} = require('express-validator');
const AppError = require("../utils/AppError.js");

const validateAllBody = [
    body('title')
    .notEmpty().withMessage('The Event Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({min: 5}).withMessage('Name must be at least 5 characters')
    .trim(),

    body('organizer')
    .notEmpty().withMessage('The Event Organizer is required')
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

    body('venue')
    .notEmpty().withMessage('Venue is required')
    .isString().withMessage('Venue must be a string')
    .isLength({min: 3}).withMessage('Venue name must be at least 3 characters long')
    .trim(),

    body('capacity')
    .notEmpty().withMessage('Capacity is required')
    .isInt().withMessage('Capacity must be a number'),

    body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid ID'),

    body('date')
    .notEmpty().withMessage('Date is required')
    .isDate().withMessage('Must be a date')
];

const validatePartialBody = [
    body('title')
    .optional()
    .isString().withMessage('Name must be a string')
    .isLength({min: 5}).withMessage('Name must be at least 5 characters')
    .trim(),

    body('organizer')
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

    body('venue')
    .optional()
    .isString().withMessage('Venue must be a string')
    .isLength({min: 3}).withMessage('Venue name must be at least 3 characters long')
    .trim(),

    body('capacity')
    .optional()
    .isInt({min: 1}).withMessage('Capacity must be a number'),

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

    query('endDate')
    .optional()
    .isDate().withMessage('Must be a date'),
    
    query('startDate')
    .optional()
    .isDate().withMessage('Must be a date'),
    
    query('page')
    .optional()
    .isInt({min: 1, max: 10}).withMessage('Page must be a number between 1 and 10'),

    query('limit')
    .optional()
    .isInt({min:1, max: 50}).withMessage('Limit must be a number between 1 and 50'),

    query('sortBy')
    .optional()
    .isIn(['date', 'registrations']).withMessage('sortBy must be a string')
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