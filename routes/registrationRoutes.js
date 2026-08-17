const express = require('express');
const router = express.Router();
const {
    protect,
} = require('../middleware/requireAuth');
const {
    validateIDinBody,
    validateIDinParam,
    validator
} = require('../middleware/validators/registrationValidators');

const {
    reserve,
    getRegistration,
    cancelRegistration
} = require('../controllers/registrationController');

router.get('/me', protect, getRegistration);
router.post('/', protect, validateIDinBody, validator, reserve);
router.delete('/:id', protect, validateIDinParam, validator, cancelRegistration);

module.exports = router;