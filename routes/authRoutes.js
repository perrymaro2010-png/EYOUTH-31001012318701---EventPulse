const express = require('express');
const router = express.Router();
const {
    validateRegistration,
    validateLogin,
    validator
} = require('../middleware/validate');
const {
    register,
    login
} = require('../controllers/authController');

router.post('/register', validateRegistration, validator, register);
router.post('/login', validateLogin, validator, login);

module.exports = router;