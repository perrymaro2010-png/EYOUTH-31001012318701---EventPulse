const { body, param, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

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

const validateEventID = [
    param('eventID')
    .notEmpty().withMessage('Event ID is required')
    .isMongoId().withMessage('Invalid event ID')
];

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array().map((e) => e.msg).join(', ');
        return next(new AppError(message, 400));
    }
    next();
};

module.exports = { validateAnnouncement, validateEventID, validator };