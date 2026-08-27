const { body, param, query, validationResult } = require('express-validator');
const AppError = require("../utils/AppError");

// from authValidators.js
const validateRegistration = [
    body('name')
        .notEmpty().withMessage('Username is required.')
        .isString().withMessage('Username must be a string.')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters')
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
        .isLength({ min: 8 }).withMessage('Password must be 8 characters or more')
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

// from eventValidators.js
const validateAllBody = [
    body('title')
        .notEmpty().withMessage('The Event Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 5 }).withMessage('Name must be at least 5 characters')
        .trim(),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ min: 5 }).withMessage('Description must be at least 5 characters')
        .trim(),

    body('city')
        .notEmpty().withMessage('City is required')
        .isString().withMessage('City must be a string')
        .isLength({ min: 2 }).withMessage('City must be at least 2 characters')
        .trim(),

    body('venue')
        .notEmpty().withMessage('Venue is required')
        .isString().withMessage('Venue must be a string')
        .isLength({ min: 3 }).withMessage('Venue name must be at least 3 characters long')
        .trim(),

    body('capacity')
        .notEmpty().withMessage('Capacity is required')
        .isInt({min: 1}).withMessage('Capacity must be a positive number'),

    body('category')
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Invalid ID'),

    body('date')
        .notEmpty().withMessage('Date is required')
        .isString().withMessage('Must be a date')
        .toDate()
];

const validatePartialBody = [
    body('title')
        .optional()
        .isString().withMessage('Name must be a string')
        .isLength({ min: 5 }).withMessage('Name must be at least 5 characters')
        .trim(),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .isLength({ min: 5 }).withMessage('Description must be at least 5 characters')
        .trim(),

    body('city')
        .optional()
        .isString().withMessage('City must be a string')
        .isLength({ min: 2 }).withMessage('City must be at least 2 characters')
        .trim(),

    body('venue')
        .optional()
        .isString().withMessage('Venue must be a string')
        .isLength({ min: 3 }).withMessage('Venue name must be at least 3 characters long')
        .trim(),

    body('capacity')
        .optional()
        .isInt({ min: 1 }).withMessage('Capacity must be a positive number'),

    body('category')
        .optional()
        .isMongoId().withMessage('Invalid ID'),

    body('date')
        .optional()
        .isDate().withMessage('Must be a date')
];

const validateQuery = [
    query('category')
        .optional()
        .isMongoId().withMessage('Invalid ID'),

    query('city')
        .optional()
        .isString().withMessage('City must be a string')
        .isLength({ min: 2 }).withMessage('City must be at least 2 characters')
        .trim(),

    query('endDate')
        .optional()
        .isDate().withMessage('Must be a date'),

    query('startDate')
        .optional()
        .isDate().withMessage('Must be a date'),

    query('page')
        .optional()
        .isInt({ min: 1, max: 10 }).withMessage('Page must be a number between 1 and 10'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage('Limit must be a number between 1 and 50'),

    query('sortBy')
        .optional()
        .isIn(['date', 'registrations']).withMessage('sortBy must be a string, either date or registrations')
    ,

    query('order')
        .optional()
        .isIn(['asc', 'desc']).withMessage('Order must be either asc or desc')
];

// from messageValidators.js

const validateAnnouncement = [
    body('event')
        .notEmpty().withMessage('Event ID is required')
        .isMongoId().withMessage('Invalid event ID'),

    body('text')
        .notEmpty().withMessage('Announcement text is required')
        .isString().withMessage('Text must be a string')
        .isLength({ min: 3 }).withMessage('Text must be at least 3 characters')
        .trim()
];

const validateIDinBody = [
    body('eventID')
        .notEmpty().withMessage('Event ID is required')
        .isMongoId().withMessage('Invalid event ID')
]

// for event and message
const validateEventID = [
    param('eventID')
        .notEmpty().withMessage('Event ID is required')
        .isMongoId().withMessage('Invalid event ID')
];

const validateReservationID = [
    param('id')
    .notEmpty().withMessage('Reservation ID is required')
    .isMongoId().withMessage('Invalid reservation ID')
]

const validator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 'fail',
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
                location: err.location,
                value: err.value
            }))
        });
    }
    next();
};


module.exports = {
    validateRegistration,
    validateLogin,
    validateAllBody,
    validatePartialBody,
    validateQuery,
    validateAnnouncement,
    validateEventID,
    validateIDinBody,
    validateReservationID,
    validator
};
