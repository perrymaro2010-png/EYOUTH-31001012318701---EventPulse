const express = require('express');
const router = express.Router();
const {
    requireAuth,
    requireRole
} = require('../middleware/requireAuth');
const {
    validateAnnouncement,
    validateEventID,
    validator
} = require('../middleware/validate');

const { 
    listMessages,
    announce
} = require('../controllers/messageController');

// message handling
router.get('/:eventID', validateEventID, validator, listMessages);
router.post('/', requireAuth, requireRole('admin'), validateAnnouncement, validator, announce);

module.exports = router;