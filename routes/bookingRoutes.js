const express = require('express');
const router = express.Router();
const {
    protect,
} = require('../middleware/requireAuth');
const {
    validateIDinBody,
    validateIDinParam,
    validator
} = require('../middleware/validators/bookingValidators');

const {
    reserve,
    listBookings,
    getBooking,
    cancelBooking
} = require('../controllers/bookingController');
const { validateID } = require('../middleware/validators/eventValidators');

router.get('/me', protect, listBookings);
router.get('/:id', protect, validateIDinParam, validator, getBooking);
router.post('/', protect, validateIDinBody, validator, reserve);
router.delete('/:id', protect, validateIDinParam, validator, cancelBooking);