const express = require('express');
const router = express.Router();
const {
    protect,
    requireRole
} = require('../middleware/requireAuth');
const {
    validateAllBody,
    validatePartialBody,
    validateID,
    validateQuery,
    validator
} = require('../middleware/validators/eventValidators');

const {
    listEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

const { listMessages } = require('../controllers/messageController');

// event handling
router.get('/', validateQuery, validator, listEvents);
router.get('/:id', validateID, validator, getEvent);
router.post('/', protect, requireRole('admin'), validateAllBody, validator, createEvent);
router.patch('/:id', protect, requireRole('admin'), validateID, validatePartialBody, validator, updateEvent);
router.delete('/:id', protect, requireRole('admin'), validateID, validator, deleteEvent);


// message handling
router.get('/:id/messages', protect, validateID, validator, listMessages);

module.exports = router;