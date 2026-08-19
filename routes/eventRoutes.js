const express = require('express');
const router = express.Router();
const {
    requireAuth,
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
router.post('/', requireAuth, requireRole('admin'), validateAllBody, validator, createEvent);
router.patch('/:id', requireAuth, requireRole('admin'), validateID, validatePartialBody, validator, updateEvent);
router.delete('/:id', requireAuth, requireRole('admin'), validateID, validator, deleteEvent);


// message handling
router.get('/:id/messages', requireAuth, validateID, validator, listMessages);

module.exports = router;