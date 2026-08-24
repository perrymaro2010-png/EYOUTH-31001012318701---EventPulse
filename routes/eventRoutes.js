const express = require('express');
const router = express.Router();
const {
    requireAuth,
    requireRole
} = require('../middleware/requireAuth');
const {
    validateAllBody,
    validatePartialBody,
    validateQuery,
    validateEventID,
    validator
} = require('../middleware/validate');

const {
    listEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

// event handling
router.get('/', validateQuery, validator, listEvents);
router.get('/:eventID', validateEventID, validator, getEvent);
router.post('/', requireAuth, requireRole('admin'), validateAllBody, validator, createEvent);
router.patch('/:eventID', requireAuth, requireRole('admin'), validateEventID, validatePartialBody, validator, updateEvent);
router.delete('/:eventID', requireAuth, requireRole('admin'), validateEventID, validator, deleteEvent);

module.exports = router;