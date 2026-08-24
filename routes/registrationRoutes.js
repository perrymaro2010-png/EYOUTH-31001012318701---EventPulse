const express = require('express');
const router = express.Router();
const {
    requireAuth,
} = require('../middleware/requireAuth');
const {
    validateReservationID,
    validateIDinBody,
    validator
} = require('../middleware/validate');

const {
    reserve,
    getRegistration,
    cancelRegistration
} = require('../controllers/registrationController');

router.get('/my', requireAuth, getRegistration);
router.post('/', requireAuth, validateIDinBody, validator, reserve);
router.delete('/:id', requireAuth, validateReservationID, validator, cancelRegistration);

module.exports = router;