const express = require('express');
const router = express.Router();
const {
    requireAuth,
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

router.get('/my', requireAuth, getRegistration);
router.post('/', requireAuth, validateIDinBody, validator, reserve);
router.delete('/:id', requireAuth, validateIDinParam, validator, cancelRegistration);

module.exports = router;