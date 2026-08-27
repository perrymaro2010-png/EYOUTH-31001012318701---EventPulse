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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Registration and login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new attendee
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Jane Doe" }
 *               email: { type: string, example: "jane@example.com" }
 *               password: { type: string, example: "SecurePass1" }
 *     responses:
 *       201:
 *         description: User registered, returns JWT
 *       409:
 *         description: Email already registered
 *       422:
 *         description: Validation failed
 */
router.post('/register', validateRegistration, validator, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "jane@example.com" }
 *               password: { type: string, example: "SecurePass1" }
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 *       401:
 *         description: Invalid credentials
 *       422:
 *         description: Validation failed
 */
router.post('/login', validateLogin, validator, login);

module.exports = router;