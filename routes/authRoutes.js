const express = require('express');
const router = express.Router();
const {
    validateRegistration,
    validateLogin,
    validator
} = require('../middleware/validators/authValidators');
const {
    register,
    login
} = require('../controllers/authController');

router.post('/auth/register', validateRegistration, validator, register);
router.post('/auth/login', validateLogin, validator, login);
