const express = require('express');
const router = express.Router();
const {
    protect,
} = require('../middleware/requireAuth');
const {
    validateIDinBody,
    validateIDinParam,
    validator
} = require('../middleware/validators/bookingValidator');

const {
    reserve,
    listBookings,
    cancelBooking
} = require('../controllers/bookingController');

router.get('/me', protect, listBookings);
router.post('/', protect, validateIDinBody, validator, reserve);
router.delete('/:id', protect, validateIDinParam, validator, cancelBooking);

module.exports = router;