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

router.get('/', protect, validateQuery, validator, listEvents);
router.get('/:id', protect, requireRole('admin', 'attendee'), validateID, validator, getEvent);
router.post('/', protect, requireRole('admin'), validateAllBody, validator, createEvent);
router.patch('/:id', protect, requireRole('admin'), validateID, validatePartialBody, validator, updateEvent);
router.delete('/:id', protect, requireRole('admin'), validateID, validator, deleteEvent);

module.exports = router;